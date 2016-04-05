var BASEREF = new Firebase("https://amber-fire-2204.firebaseio.com/");

function ViewModel() {
    var self = this;
    self.apikey = ko.observable();
    self.user = ko.observable();


    (function init() {

        BASEREF.child("settings").child("apikey").once("value", function(data){
            self.apikey(data.val());
        });

    })();
}

var VM = new ViewModel();
ko.applyBindings(VM);