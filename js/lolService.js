var lolService = {
    APIKEY: "b2f8a7fd-8688-47f5-9b16-1c4828661299",
    BASEURL: "https://euw.api.pvp.net",
    getChampion: function(id) {
        this.doRequest("/api/lol/euw/v1.2/champion" + id + "?api_key=" + this.APIKEY, function(data) {
            console.log("getChampion success!");
        });
    },
    getChampions: function() {
        this.doRequest("/api/lol/euw/v1.2/champion?api_key=" + this.APIKEY, function(data) {
            console.log("getChampions success!");
        });
    },
    doRequest: function(url, callback) {
        $.getJSON(url, function(data){
            callback(data)
        });
    }
}
