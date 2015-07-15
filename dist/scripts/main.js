var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var Profile = require('./components/profilePage');
var Home = require('./components/homePage');
var Search = require('./components/searchPage');
var Settings = require('./components/settingsPage');
var Login = require('./components/loginPage');
var Registration = require('./components/registrationPage');
var Post = require('./components/post');
var Logout = require('./components/logout');


var ref = new Firebase("https://lolresource.firebaseio.com");
var allChampions = new Firebase("https://lolresource.firebaseio.com/allchampions");
var freeChampions = new Firebase("https://lolresource.firebaseio.com/freechamps");
var freeChampionsByName = new Firebase("https://lolresource.firebaseio.com/freechampsbyname");
var authData = ref.getAuth();

$(document).on('ready', start)

function start(e) {
    //
    //initializes and starts router
    var routerConfig = {
        routes: {
            // 'edit': 'home',
            '': 'home',
            'home': 'home',
            'settings': 'settings',
            'forums': 'forums',
            'login': 'login',
            'registration': 'registration',
            'profile': 'profile',
            'search': 'search',
            'post': 'post'
        },
        profile: function() {
        	logArea();
            React.render(<Profile/>, document.querySelector('#container'));
        },
        home: function() {
        	logArea();
			React.render(<Home/>, document.querySelector('#container'));
        },
        search: function() {
        	logArea();
            React.render(<Search/>, document.querySelector('#container'));
        },
        login: function() {
        	logArea();
            React.render(<Login/>, document.querySelector('#container'));
        },
        registration: function() {
        	logArea();
            React.render(<Registration/>, document.querySelector('#container'));
        },
        settings: function() {
        	logArea();
            React.render(<Settings/>, document.querySelector('#container'));
        },
        post: function() {
        	logArea();
        	React.render(<Post/>, document.querySelector('#container'))
        }
    };
    var app = Backbone.Router.extend(routerConfig);
	var myRouter = new app();
	Backbone.history.start();

    function getAllChamps() {
    	$.get(
    		'https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=b2e96d04-1205-4644-967c-ae0fdd0690a5',
    		storeChamps,
    		'json'
    	)
    }
    function storeChamps(val) {
    	allChampions.remove();
    	allChampions.set(val.champions);
    }
    function getTopChamps() {

    }
    function everyHour() {
    	setInterval(getAllChamps, 1000*60*60)
    }
    function freeChamps() {
    	freeChampions.remove();
    	allChampions.on("value", function(snapshot) {
			var champs = snapshot.val();
			console.log(champs.length);
			for(var i = 0; i<champs.length; i++) {
				if (champs[i].freeToPlay === true) {
					freeChampions.push(champs[i]);
				}
			}
		});
    }
    function freeChampNames() {
    	freeChampionsByName.remove();
    	freeChampions.on("value", function(snapshot) {
    		var free = snapshot.val();
    		for(var key in free) {
    			console.log(free[key].id);
    			$.get(
    				'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+ free[key].id +'?champData=image&api_key=b2e96d04-1205-4644-967c-ae0fdd0690a5',
    				storeFreeChampsByName,
    				'json'
    			)
    		}
    	})
    }
    function storeFreeChampsByName(val) {
    	console.log(val);
    	freeChampionsByName.push(val);
    }
    function renderFreeChamps() {
    	$('.freeChamps').val('');
    	var i = 1;
    	freeChampionsByName.on("value", function(snapshot) {
    		var named = snapshot.val();
    		for (var key in named) {
    			var ch = named[key].key;
    			$('.freeChamps').append("<div class = 'free' id = '" + i + "'>" + "<span class = 'freeText'>" + named[key].name + "</span>" + "<br>" + "<div class = 'title'>" + "<span class = 'freeText'>" + named[key].title + "</span>" + "</div>" + "</div>");
    			$('#' + i).css("background-image", "url(" + charPictures[ch] + ")");
    			i++;
    		}
     	})
    }


	renderFreeChamps();
  var charPictures = {
		Aatrox: '',
		Ahri: '',
		Akali: '',
		Alistar: '',
		Amumu: '',
		Anivia: '',
		Annie: '',
		Ashe: '',
		Azir: 'http://lolwp.com/wp-content/uploads/2014/08/Azir-wallpaper.jpg',
		Bard: '',
		Blitzcrank: '',
		Brand: '',
		Braum: '',
		Caitlyn: '',
		Cassiopeia: '',
		ChoGath: '',
		Corki: '',
		Darius: '',
		Diana: '',
		DrMundo: 'http://lolwp.com/wp-content/uploads/Dr-Mundo-Original-Skin-Reworked.jpg',
		Draven: '',
		Ekko: '',
		Elise: '',
		Evelynn: '',
		Ezreal: '',
		FiddleSticks: 'http://lolwp.com/wp-content/uploads/Fiddlesticks_Splash_10.jpg',
		Fiora: '',
		Fizz: '',
		Galio: '',
		Gangplank: '',
		Garen: '',
		Gnar: '',
		Gragas: 'http://lolwp.com/wp-content/uploads/Gragas_Splash_0.jpg',
		Graves: '',
		Hecarim: '',
		Heimerdinger: '',
		Irelia: '',
		Janna: 'http://images7.alphacoders.com/327/327160.jpg',
		JarvanIV: '',
		Jax: '',
		Jayce: '',
		Jinx: '',
		Kalista: '',
		Karma: '',
		Karthus: '',
		Kassadin: '',
		Katarina: '',
		Kayle: '',
		Kennen: '',
		KhaZix: '',
		KogMaw: '',
		LeBlanc: '',
		LeeSin: '',
		Leona: '',
		Lissandra: '',
		Lucian: '',
		Lulu: '',
		Lux: '',
		Malphite: '',
		Malzahar: '',
		Maokai: '',
		MasterYi: '',
		MissFortune: '',
		Mordekaiser: '',
		Morgana: '',
		Nami: '',
		Nasus: '',
		Nautilus: '',
		Nidalee: '',
		Nocturne: '',
		Nunu: '',
		Olaf: '',
		Orianna: '',
		Pantheon: '',
		Poppy: '',
		Quinn: '',
		Rammus: '',
		RekSai: '',
		Renekton: '',
		Rengar: '',
		Riven: '',
		Rumble: '',
		Ryze: 'http://lolwp.com/wp-content/uploads/Ryze_Splash_01.jpg',
		Sejuani: '',
		Shaco: '',
		Shen: '',
		Shyvana: '',
		Singed: '',
		Sion: '',
		Sivir: '',
		Skarner: '',
		Sona: '',
		Soraka: '',
		Swain: '',
		Syndra: '',
		Talon: '',
		Taric: '',
		Teemo: '',
		Thresh: 'http://lolwp.com/wp-content/uploads/Thresh-Classic.jpg',
		Tristana: '',
		Trundle: '',
		Tryndamere: '',
		TwistedFate: '',
		Twitch: '',
		Udyr: '',
		Urgot: 'http://lolwp.com/wp-content/uploads/Urgot_splash.jpg',
		Varus: 'http://lolwp.com/wp-content/uploads/Varus.jpg',
		Vayne: '',
		Veigar: '',
		Velkoz: 'http://lolwp.com/wp-content/uploads/2014/02/VelKoz.jpg',
		Vi: '',
		Viktor: '',
		Vladimir: '',
		Volibear: '',
		Warwick: '',
		Wukong: '',
		Xerath: '',
		XinZhao: '',
		Yasuo: '',
		Yorick: '',
		Zac: '',
		Zed: '',
		Ziggs: '',
		Zilean: '',
		Zyra: ''
	};
	function logArea() {
		if(authData === null) {
			$('.loginLink').show();
		    $('.logout').hide();
			
		} else {
			$('.loginLink').hide();
		    $('.logout').show();
			 React.render(<Logout/>, document.querySelector('.logoutCon'));
		}
	}
}

	