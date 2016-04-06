var ref = new Firebase("https://amber-fire-2204.firebaseio.com/");
var summonersRef = ref.child("summoners");
var runesRef = ref.child("runes");

var firebaseService = {

    // "summoners"-node
    // data: name: object-name
    getSummoner: function(summonerName, callback) {
        var LolApiService = lolService;
        LolApiService.method = LolApiService.getSummoner;

        this.checkCache(summonersRef, summonerName, callback, LolApiService, function(data) {
            console.log("here?");
        });
    },

    // "summoners"-node
    // data: name: object-name
    getSummonerRunes: function(summonerName, callback) {
        var LolApiService = lolService;
        LolApiService.method = LolApiService.getSummoner;

        this.checkCache(runesRef, summonerName, callback, LolApiService, function(data) {
            console.log("here?");
        });
    },

    // fetch from firebase
    fetch: function(baseRef, summonerName, callback) {
        baseRef.child(summonerName).on("value", function(snapshot) {
            callback(snapshot.val());
        });
    },


    // Checks firebase and binds on the value
    //
    checkCache: function(baseRef, name, callback, LolApiService) {

        baseRef.on("value", function(snapshot) {
            var dataExists = snapshot.child(name).exists();

            if (!dataExists) {
                console.log("Didn't find him, Gonna use the api!");
                LolApiService.method(name);
            } else {
                console.log("Found him in the firebase, lets get him!");
                firebaseService.fetch(baseRef, name, callback);
                baseRef.off();
            }
        });

    }

};