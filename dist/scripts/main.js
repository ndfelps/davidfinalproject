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
var Guide = require('./components/uGuidepage');


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
            'post': 'post',
            'guide/:id': 'guide'
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
        	React.render(<Post/>, document.querySelector('#container'));
        },
        guide: function() {
        	logArea();
        	React.render(<Guide/>, document.querySelector('#container'));
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
		Ahri: 'http://img06.deviantart.net/7d80/i/2012/027/5/b/league_of_legends_ahri_1920x1080_sl_wallpaper_by_ruledragon-d4nr5oz.png',
		Akali: '',
		Alistar: '',
		Amumu: '',
		Anivia: '',
		Annie: '',
		Ashe: '',
		Azir: 'http://lolwp.com/wp-content/uploads/2014/08/Azir-wallpaper.jpg',
		Bard: 'http://lolwp.com/wp-content/uploads/2015/02/Bard-Classic-wallpaper.jpg',
		Blitzcrank: '',
		Brand: 'http://lolwp.com/wp-content/uploads/Brand-Classic.jpg',
		Braum: 'http://na.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/b-splash.jpg?itok=2T_9VFCS',
		Caitlyn: '',
		Cassiopeia: '',
		ChoGath: '',
		Corki: 'http://www.leagueoflegendswallpapers.com/wp-content/uploads/2015/01/leagueoflegendwallpapers.com-corki.jpg',
		Darius: 'http://lolwp.com/wp-content/uploads/Darius-Classic.jpg',
		Diana: 'http://lolwp.com/wp-content/uploads/Diana-Classic-Splash.jpg',
		DrMundo: 'http://lolwp.com/wp-content/uploads/Dr-Mundo-Original-Skin-Reworked.jpg',
		Draven: '',
		Ekko: '',
		Elise: '',
		Evelynn: 'http://www.hdwallpapersbucket.com/wp-content/uploads/2014/09/Evelynn-League-Of-Legends-Wallpaper-1.jpg',
		Ezreal: 'http://lolwp.com/wp-content/uploads/ezreal.jpg',
		FiddleSticks: 'http://lolwp.com/wp-content/uploads/Fiddlesticks_Splash_10.jpg',
		Fiora: '',
		Fizz: 'http://lolwp.com/wp-content/uploads/Fizz_splash_0.jpg',
		Galio: '',
		Gangplank: 'http://lolwp.com/wp-content/uploads/Gangplank_Splash_0.jpg',
		Garen: '',
		Gnar: '',
		Gragas: 'http://lolwp.com/wp-content/uploads/Gragas_Splash_0.jpg',
		Graves: 'http://lolwp.com/wp-content/uploads/Graves_Splash_0.jpg',
		Hecarim: '',
		Heimerdinger: '',
		Irelia: '',
		Janna: 'http://images7.alphacoders.com/327/327160.jpg',
		JarvanIV: '',
		Jax: '',
		Jayce: '',
		Jinx: '',
		Kalista: 'http://images7.alphacoders.com/553/553194.jpg',
		Karma: '',
		Karthus: '',
		Kassadin: 'http://lolwp.com/wp-content/uploads/Kassadin-Classic-Wallpaper.jpg',
		Katarina: '',
		Kayle: 'http://lolwp.com/wp-content/uploads/Kayle-Classic-Updated.jpg',
		Kennen: '',
		KhaZix: '',
		KogMaw: 'http://lolwp.com/wp-content/uploads/KogMaw_Splash_0.jpg',
		LeBlanc: '',
		LeeSin: '',
		Leona: '',
		Lissandra: '',
		Lucian: '',
		Lulu: '',
		Lux: '',
		Malphite: 'http://wfiles.brothersoft.com/l/league-of-legends-malphite_101807-1400x1050.jpg',
		Malzahar: '',
		Maokai: '',
		MasterYi: '',
		MissFortune: 'http://lolwp.com/wp-content/uploads/Miss-Fortune-Classic-Reworked.jpg',
		Mordekaiser: '',
		Morgana: '',
		Nami: 'http://lolwp.com/wp-content/uploads/Nami-Classic.jpg',
		Nasus: '',
		Nautilus: 'http://lolwp.com/wp-content/uploads/nautilus.jpg',
		Nidalee: '',
		Nocturne: '',
		Nunu: 'http://lolwp.com/wp-content/uploads/Yeti_Splash_0.jpg',
		Olaf: '',
		Orianna: '',
		Pantheon: '',
		Poppy: '',
		Quinn: 'http://lolwp.com/wp-content/uploads/2013/02/Quinn-Classic.jpg',
		Rammus: 'http://lolwp.com/wp-content/uploads/rammus.jpg',
		RekSai: '',
		Renekton: '',
		Rengar: '',
		Riven: 'http://lolwp.com/wp-content/uploads/2013/06/Riven-Classic.jpg',
		Rumble: 'http://lolwp.com/wp-content/uploads/rumble-splash.jpg',
		Ryze: 'http://lolwp.com/wp-content/uploads/Ryze_Splash_01.jpg',
		Sejuani: '',
		Shaco: '',
		Shen: '',
		Shyvana: '',
		Singed: '',
		Sion: '',
		Sivir: '',
		Skarner: '',
		Sona: 'http://na.leagueoflegends.com/sites/default/files/upload/art/bg_champion_sona_1920x1080_0.jpg',
		Soraka: 'http://img1.wikia.nocookie.net/__cb20121002162226/leagueoflegends/images/6/66/Soraka_OriginalSkin.jpg',
		Swain: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Swain_0.jpg',
		Syndra: '',
		TahmKench: 'http://news.cdn.leagueoflegends.com/public/images/pages/2015/tk/img/TK_Splash_WP.jpg',
		Talon: '',
		Taric: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_0.jpg',
		Teemo: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg',
		Thresh: 'http://lolwp.com/wp-content/uploads/Thresh-Classic.jpg',
		Tristana: '',
		Trundle: '',
		Tryndamere: '',
		TwistedFate: 'http://lolwp.com/wp-content/uploads/Twisted-Fate-Splash-Updated.jpg',
		Twitch: '',
		Udyr: '',
		Urgot: 'http://lolwp.com/wp-content/uploads/Urgot_splash.jpg',
		Varus: 'http://lolwp.com/wp-content/uploads/Varus.jpg',
		Vayne: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg',
		Veigar: '',
		Velkoz: 'http://lolwp.com/wp-content/uploads/2014/02/VelKoz.jpg',
		Vi: '',
		Viktor: 'http://lolwp.com/wp-content/uploads/viktor1.jpg',
		Vladimir: '',
		Volibear: '',
		Warwick: 'http://lolwp.com/wp-content/uploads/Wolfman_Splash_0.jpg',
		Wukong: '',
		Xerath: '',
		XinZhao: '',
		Yasuo: '',
		Yorick: '',
		Zac: 'http://lolwp.com/wp-content/uploads/2013/03/Zac-Classic.jpg',
		Zed: '',
		Ziggs: '',
		Zilean: '',
		Zyra: ''
	};
	function logArea() {
		if(authData === null) {
			$('.loginLink').show();
		    $('#logOut').hide();
			
		} else {
			$('.loginLink').hide();
		    $('#logOut').show();
			 React.render(<Logout/>, document.querySelector('#logOut'));
		}
	}
}

	