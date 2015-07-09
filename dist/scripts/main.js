var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var Profile = require('./components/profilePage');
var Home = require('./components/homePage');
var Search = require('./components/searchPage');
var Settings = require('./components/settingsPage');
var Login = require('./components/loginPage');
var Registration = require('./components/registrationPage')


var ref = new Firebase("https://lolresource.firebaseio.com");
var allChampions = new Firebase("https://lolresource.firebaseio.com/allchampions")
var freeChampions = new Firebase("https://lolresource.firebaseio.com/freechamps")
var freeChampionsByName = new Firebase("https://lolresource.firebaseio.com/freechampsbyname")

$(document).on('ready', start)

function start(e) {
    //might need this for something

    //
    //initializes and starts router
    var App = Backbone.Router.extend({
        routes: {
            'edit': 'home',
            '': 'home',
            'home': 'home',
            'settings': 'settings',
            'forums': 'forums',
            'login': 'login',
            'registration': 'registration',
        },
        profile: function() {
             $('.page').hide();
             $('#container').show();
            React.render(<Profile/>, document.querySelector('#container'));
        },
        home: function() {
            $('.page').hide();
            $('#container').show();
            React.render(<Home/>, document.querySelector('#container'));
        },
        search: function() {
            $('.page').hide();
            $('#container').show();
            React.render(<Search/>, document.querySelector('#container'));
        },
        login: function() {
            $('.page').hide();
            $('#container').show();
            React.render(<Login/>, document.querySelector('#container'));
        },
        registration: function() {
            React.render(<Registration/>, document.querySelector('#container'));
        },
        settings: function() {
        	$('#container').hide();
            $('.page').show();
            React.render(<Settings/>, document.querySelector('#container'));
        }
    });
    var app = new App();
    Backbone.history.start();

    $('.logButton').click(logIn);
    $('.userBox').keyup(logInPush);
    $('.passBox').keyup(logInPush);
    $('.signButton').click(signIn);
    $('.firstName').keyup(signInPush);
    $('.lastName').keyup(signInPush);
    $('.email').keyup(signInPush);
    $('.password').keyup(signInPush);
    $('.username').keyup(signInPush);
    // $('#closed').click(showClosed);
    // $('#all').click(showAll);
    // $('.commentButton').on('click', addComment)
    //
    //Log in and sign in functions
    $('.signUpSuccess').hide();

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
    	Zec: '',
    	Ziggs: '',
    	Zilean: '',
    	Zyra: ''


    }

    function logIn (e) {
        e.preventDefault();
        console.log('??');
        var username = $('.userBox').val();
        var password = $('.passBox').val();
        if(username === "" && password === "") {

        } else {
            ref.authWithPassword({
				  email    : username,
				  password : password
				}, function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				    window.location.hash = 'home';
				  }
			}); 
        }
    };

    function logInPush (e) {
        e.preventDefault();
        console.log('??');
        var username = $('.userBox').val();
        var password = $('.passBox').val();
        if(event.keycode === 13) {
            ref.authWithPassword({
				  email    : username,
				  password : password
				}, function(error, authData) {
				  if (error) {
				    console.log("Login Failed!", error);
				  } else {
				    console.log("Authenticated successfully with payload:", authData);
				    window.location.hash = 'home';
				  }
			}, function(error, authData) {
				remember: 'sessionOnly'
			});        
        }
    };

    function signIn (e) {
        e.preventDefault();
        var firstName = $('.firstName').val();
        var lastName = $('.lastName').val();
        var email = $('.email').val();
        var password = $('.password').val();
        var username = $('.username').val();
        //Data validations
        var f = false;
        var l = false;
        var p = false;
        var u = false;
        if (firstName === "") {
            $('.firstError').show();
        } else {
            $('.firstError').hide();
            f = true;
        }
        if (lastName === "") {
            $('.lastError').show();
        } else {
            $('.lastError').hide();
            l = true;
        }
        if (password === "") {
            $('.passError').show();
        } else {
            $('.passError').hide();
            p = true;
        }
        if (username === "") {
            console.log('???');
            $('.signError').show();
            u = false;
        } else {
            $('.signError').hide();
            u = true;
        }
        var atSym = false;
        var eDotCom = false;
        if ('@' in email.split('')) {
            atSym = true;
        }
        if (atSym === false) {
            $('.emailError').show();
        } else {
            $('.emailError').hide();
            atSym = true;
        }
        if (email.substring(email.length-4) === ".com") {
            eDotCom = true;
        }
        if (eDotCom === false) {
            $('.emailError').show();
        } else {
            $('.emailError').hide();
        }
        atSym = true;
        if(atSym && eDotCom && p && f && l) {
            ref.createUser({
				  email    : email,
				  password : password,
				  firstName: firstName,
				  lastName: lastName,
				  username: username
				}, function(error, userData) {
				  if (error) {
				    console.log("Error creating user:", error);
				  } else {
				    console.log("Successfully created user account with uid:", userData.uid);
				  }
			}, function(error, authData) {
				remember: 'sessionOnly'
			});
            $('#container').show();
            $('.login-signup').hide();
            $('.signUpSuccess').show();
        }
    };

    function signInPush (e) {
        e.preventDefault();
        var newUser = {};
        var firstName = $('.firstName').val();
        var lastName = $('.lastName').val();
        var email = $('.email').val();
        var password = $('.password').val();
        var username = $('.username').val();
        var f = false;
        var l = false;
        var p = false;
        var u = false;
        if(event.keycode === 13) {
            if (firstName === "") {
                $('.firstError').show();
            } else {
                $('.firstError').hide();
                f = true;
            }
            if (lastName === "") {
                $('.lastError').show();
            } else {
                $('.lastError').hide();
                l = true;
            }
            if (password === "") {
                $('.passError').show();
            } else {
                $('.passError').hide();
                p = true;
            }
            if (username === "") {
                $('.signError').show();
                u = false;
            } else {
                $('.signError').hide();
                u = true;
            }
            var atSym = false;
            var eDotCom = false;
            if ('@' in email.split('')) {
                atSym = true;
            }
            if (atSym === false) {
                $('.emailError').show();
            } else {
                $('.emailError').hide();
            }
            if (email.substring(email.length-4) === ".com") {
                eDotCom = true;
            }
            if (eDotCom === false) {
                $('.emailError').show();
            } else {
                $('.emailError').hide();
            }
            console.log(atSym);
            console.log(eDotCom);
            console.log(p);
            console.log(f);
            console.log(l);
            console.log(u);
            if(atSym && eDotCom && p && f && l && u) {
                ref.createUser({
				  email    : email,
				  password : password,
				  firstName: firstName,
				  lastName: lastName,
				  username: username
				}, function(error, userData) {
				  if (error) {
				    console.log("Error creating user:", error);
				  } else {
				    console.log("Successfully created user account with uid:", userData.uid);
				  }
			});
            $('#container').show();
            $('.login-signup').hide();
            $('.signUpSuccess').show();
            }
        }
    };
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
    function getByChampID(val) {

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

}