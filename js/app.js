

function ViewModel() {
    var self = this;

    //self.user = ko.observable();
    self.searchHistory = ko.observableArray([]);
    self.summonerSearchQuery = ko.observable();
    self.selectedSummoner = ko.observable();
    self.selectedRunes = ko.observableArray([]);


    (function init() {

    })();

    self.searchSummoner = function (d, e) {
        if (e.keyCode == 13 || e.type=="click") {
            e.target.blur();
            var summonerName = self.summonerSearchQuery().replace(" ", "").toLowerCase();
            firebaseService.getSummoner(summonerName, self.searchSummonerCallback);
        }
    };

    self.searchSummonerCallback = function(data) {
        var summonerName = self.summonerSearchQuery().replace(" ", "").toLowerCase();
        self.searchHistory.push(data[summonerName]);
    };

    self.selectSummoner = function(summoner) {
      //lolService.getSummoner(name);
      self.selectedSummoner(summoner);
      console.log($('.main-content').length);
      $('.main-content').removeClass('hidden');
    };

    self.selectRunes = function (summoner) {
        // "runes".child("salmin")
        // "pages" array with objects
        firebaseService.getSummonerRunes(summoner.name.replace(" ", "").toLowerCase(), self.selectRunesCallback);


    };

    self.selectRunesCallback = function (data) {
        self.selectedRunes(data.pages);
    };

}

var VM = new ViewModel();
ko.applyBindings(VM);
