

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
        if (!self.summonerSearchQuery())
            return;
     
        if (e.type=="click") {
            e.target.blur();            
            var summonerName = self.summonerSearchQuery().replace(" ", "").toLowerCase();
            firebaseService.getSummoner(summonerName, self.searchSummonerCallback);
        }
    };

    self.searchSummonerCallback = function(data) {
        var summonerName = self.summonerSearchQuery().replace(" ", "").toLowerCase();  
         
        self.searchHistory.push(data[summonerName]);
        self.selectSummoner(data[summonerName]);
        self.selectRunes(data[summonerName]);
    };

    self.selectSummoner = function(summoner) {
        
      self.selectedSummoner(summoner);
      
            
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
