var lolService = {
    APIKEY: "b2f8a7fd-8688-47f5-9b16-1c4828661299",
    BASEURL: "https://euw.api.pvp.net",
    // Retrieve champion by ID.
    // data: ChampionListDto
    getChampion: function(id) {
        this.doRequest("/api/lol/euw/v1.2/champion" + id + "?api_key=" + this.APIKEY, function(data) {
            console.log("getChampion success!");
        });
    },
    // Retrieve all champions.
    // data: ChampionDto
    getChampions: function() {
        this.doRequest("/api/lol/euw/v1.2/champion?api_key=" + this.APIKEY, function(data) {
            console.log("getChampions success!");
        });
    },
    // Get a champion mastery by player id and champion id. Response code 204 means there were no masteries found for given player id or player id and champion id combination.
    // data: ChampionMasteryDTO
    getChampionMastery: function(playerId, championId)
    {
        this.doRequest("/championmastery/location/euw1/player/" + playerId + "/champion/" + championId + "?api_key=" + this.APIKEY, function(data)
        {
            
        });
    },
    // Get all champion mastery entries sorted by number of champion points descending
    // data: List[ChampionMasteryDTO]
    getChampionsMastery: function(playerId)
    {
        this.doRequest("/championmastery/location/euw1/player/" + playerId + "/champions?api_key=" + this.APIKEY, function(data)
        {
            
        });
    },
    // Get a player's total champion mastery score, which is sum of individual champion mastery levels
    // data: int
    getChampionsMasteryScore: function(playerId)
    {
        this.doRequest("/championmastery/location/euw1/player/" + playerId + "/score?api_key=" + this.APIKEY, function(data)
        {
            
        });
    },
    // Get specified number of top champion mastery entries sorted by number of champion points descending
    // data: List[ChampionMasteryDTO]
    getChampionsMasteryTopChampions: function(playerId)
    {
        this.doRequest("/championmastery/location/euw1/player/" + playerId + "/topchampions?api_key=" + this.APIKEY, function(data)
        {
            
        });
    }, 

    // Get summoner objects mapped by standardized summoner name for a given list of summoner names. (REST)
    // data: Map[string, SummonerDto]
    getSummoner: function(summonerName)
    {
        this.doRequest("/api/lol/euw/v1.4/summoner/by-name/" + summonerName + "?api_key=" + this.APIKEY, function(data)
        {
            summonerName = summonerName.replace(" ", "");

            BASEREF.child("summoners/" + summonerName).set(data);

            lolService.getSummonerRunes(data[summonerName].id, summonerName);
        });
    },

    // This object contains rune pages information.
    // Map[string, RunePagesDto]
    getSummonerRunes: function(id, summonerName)
    {
        this.doRequest("/api/lol/euw/v1.4/summoner/" + id + "/runes?api_key=" + this.APIKEY, function(data)
        {
            //console.log(data);

            BASEREF.child("runes/" + summonerName).set(data[id]);
        });
    },


    doRequest: function(url, callback) {
        $.getJSON(this.BASEURL + url, function(data){
            callback(data)
        });
    }
}
