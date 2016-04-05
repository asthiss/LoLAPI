var BASEREF = new Firebase("https://amber-fire-2204.firebaseio.com/");


function lolApiUrl(name, callback) {

    $.ajax({
        dataType: "json",
        url: "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + name + "?api_key=5cb5da5b-1fbe-4aa4-aebe-78adb9aa6579",
        success: function(data) {
            callback(data);
        }
    });
}

function ViewModel() {



    (function init() {

        BASEREF.child("settings").child("apikey").once("value", function(data){
            self.apikey(data.val());
        });

    })();

    self.searchSummoner = function (d, e) {
        if (e.keyCode == 13) {
            //e.target.blur();
            lolApiUrl(self.summonerSearchQuery(), self.searchSummonerCallback);
        }
    };

    self.searchSummonerCallback = function(data) {
        var input = self.summonerSearchQuery();
        console.log(data[input]);
        self.searchHistory.push(data[input]);
    };
}

var VM = new ViewModel();
ko.applyBindings(VM);

lolService.getChampions();
