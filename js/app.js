var BASEREF = new Firebase("https://amber-fire-2204.firebaseio.com/");


function getFromLolApi(name, callback) {

    $.ajax({
        dataType: "json",
        url: "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + name + "?api_key=5cb5da5b-1fbe-4aa4-aebe-78adb9aa6579",
        success: function(data) {
            callback(data[name]);
        }
    });
}

function checkCache(method, name, callback) {
    BASEREF.child(method).once("value", function(snapshot) {
        var summonerExists = snapshot.child(name).exists();

        if (!summonerExists) {
            console.log("Didn't find him, Gonna use the api!");
            getFromLolApi(name, callback);
        } else {
            console.log("Found him in the firebase, lets get him!");
            getFromFireBase(method, name, callback)
        }
    });
}

function getFromFireBase(method, name, callback) {
    BASEREF.child(method).once("value", function(snapshot) {
        var summoner = snapshot.child(name).val();
        callback(summoner);
    });
}

function ViewModel() {
    var self = this;
    self.apikey = ko.observable();
    //self.user = ko.observable();
    self.searchHistory = ko.observableArray([]);
    self.summonerSearchQuery = ko.observable();


    (function init() {

        BASEREF.child("settings").child("apikey").once("value", function(data){
            self.apikey(data.val());
        });

    })();

    self.searchSummoner = function (d, e) {
        if (e.keyCode == 13) {
            //e.target.blur();

            checkCache("summoners", self.summonerSearchQuery(), self.searchSummonerCallback);
            //getFromLolApi(self.summonerSearchQuery(), self.searchSummonerCallback);
        }
    };

    self.searchSummonerCallback = function(data) {
        console.log(data);
        self.searchHistory.push(data);
    };
}

var VM = new ViewModel();
ko.applyBindings(VM);