var BASEREF = new Firebase("https://amber-fire-2204.firebaseio.com/");

function checkCache(method, name, callback) {

    var trimmedName = name.replace(" ", "");
    var ref = BASEREF.child(method).child(trimmedName);

    ref.on("value", function(snapshot) {
        var summonerExists = snapshot.child(trimmedName).exists();

        if (!summonerExists) {
            console.log("Didn't find him, Gonna use the api!");
            lolService.getSummoner(name);
        } else {
            console.log("Found him in the firebase, lets get him!");
            getFromFireBase(method, trimmedName, callback);
            ref.off();
        }
    });
}

function getFromFireBase(method, name, callback) {
    BASEREF.child(method).child(name).on("value", function(snapshot) {
            var summoner = snapshot.child(name).val();
        callback(summoner);
    });
}

function ViewModel() {
    var self = this;

    //self.user = ko.observable();
    self.searchHistory = ko.observableArray([]);
    self.summonerSearchQuery = ko.observable();


    (function init() {

    })();

    self.searchSummoner = function (d, e) {
        if (e.keyCode == 13) {
            //e.target.blur();

            checkCache("summoners", self.summonerSearchQuery(), self.searchSummonerCallback);
            //getFromLolApi(self.summonerSearchQuery(), self.searchSummonerCallback);
        }
    };

    self.searchSummonerCallback = function(data) {
        self.searchHistory.push(data);
    };

    self.getRunesForName = function(name) {
      return ["test", "test2"];
    };
}

var VM = new ViewModel();
ko.applyBindings(VM);
