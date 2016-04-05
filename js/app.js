var REF = new Firebase("https://amber-fire-2204.firebaseio.com/");

function ViewModel() {
    this.buyer = { name: 'Franklin', credits: 250 };
    this.seller = { name: 'Mario', credits: 5800 };
}

var VM = new ViewModel();
ko.applyBindings(VM);