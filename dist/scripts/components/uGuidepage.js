var React = require('react');
var guides = new Firebase("https://lolresource.firebaseio.com/guides");
var ref = new Firebase("https://lolresource.firebaseio.com");
var $ = require('jquery');
var comments = new Firebase("https://lolresource.firebaseio.com/comments");
var users = new Firebase("https://lolresource.firebaseio.com/users");
var authData = ref.getAuth();

var guideID = window.location.hash;
var renderedGuide;
var currentKey;
guideID = guideID.substring(7);

guides.on("value", function(snapshot) {
    var guideList = snapshot.val();
    for (var key in guideList) {
        if (guideID === guideList[key].id) {
            currentKey = key;
            renderedGuide = guideList[key];
            var role = renderedGuide.role;
            role = role.substring(0, 1).toUpperCase() + role.substring(1);
            var champion = renderedGuide.champion;
            if (champion === "KogMaw") {
                champion = "Kog'Maw";
            } else if (champion === "Chogath") {
                champion = "Cho'gath";
            } else if (champion === "Reksai") {
                champion = "Rek'Sai";
            } else if (champion === "Khazix") {
                champion = "Kha'zix";
            } else if (champion === "LeeSin") {
                champion = "Lee Sin";
            } else if (champion === "TwistedFate") {
                champion = "Twisted Fate"
            } else if (champion === "DrMundo") {
                champion = "Dr. Mundo";
            } else if (champion === "Xin Zhao") {
                champion = "Xin Zhao";
            } else if (champion === "Tahm Kench") {
                champion = "Tahm Kench";
            }
            $('.guideTitle').html(renderedGuide.title);
            $('.guideBody').html(renderedGuide.body);
            $('.guideRole').html("Role: " + role);
            $('.guideUser').html('by ' + renderedGuide.user);
            $('.count').html(renderedGuide.score);
            break;
        }
    }
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});
loadComments();

module.exports = React.createClass ({
    render: function() {
        return(
            <section className = 'renderedGuide'>
                <section className = 'tabLinks'>
                    <div className = 'tabLink'><span onClick = {this.showGuide}>Guide</span></div>
                    <div className = 'tabLink'><span onClick = {this.showComments}>Comments</span></div>
                </section>
                <section className = 'fullGuide page'>
                    <div className = "voteButton">
                        <div onClick = {this.voteUp} className = "vote up"></div>
                        <div onClick = {this.voteDown} className = "vote down"></div>
                        <div className = "count"></div>
                    </div>
                    <section className = 'guideArea'>
                        <div>
                            <h2 className = 'guideTitle'>
                            </h2>
                            <div className = 'guideUser'>
                            </div>
                        </div>
                        <div className = 'champLogo'>
                        </div>
                        <div className = 'guideRole'>
                        </div>
                        <div className = 'guideBody'>
                        </div>
                    </section>
                </section>

                <section className = 'commentArea page'>
                    <h3>Comments</h3>
                    <div className = 'commentSection'>
                    </div>
                    <form onSubmit = {this.postComment} className = 'commentForm'>
                        <textarea type = 'text' className = 'commentText' /><br />
                        <button className = 'commentButton'>Submit</button>
                    </form>
                </section>
            </section>
        );
    },
    postComment: function(e) {
        var user = authData["password"].email;
        var avatar;
        users.on("value", function(snapshot) {
            var userList = snapshot.val();
            for (var key in userList) {
                if (userList[key].email === user) {
                    user = userList[key].username;
                    avatar = userList[key].avatar;
                }
            }

        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        })

        var now = new Date();
        var text = $('.commentText').val();
        var id = guideID;
        if (text.length > 3) {
            var newComment =  {
                text: text,
                user: user,
                date: now,
                id: id,
                avatar: avatar
            }
            comments.push(newComment);
            
            loadComments();
        }
        $('.commentText').val('');
    },
    voteDown: function(e) {
        var newScore = new Firebase("https://lolresource.firebaseio.com/guides/" + currentKey + "/score");
        newScore.transaction(function (current_value) {
            return (current_value || 0) - 1;
        });
    },
    voteUp: function(e) {
        var newScore = new Firebase("https://lolresource.firebaseio.com/guides/" + currentKey + "/score");
        newScore.transaction(function (current_value) {
            return (current_value || 0) + 1;
        });
    },
    showComments: function(e) {
        $('.page').hide();
        $('.commentArea').show();
    },
    showGuide: function(e) {
        $('.page').hide();
        $('.fullGuide').show();
    }
});

function loadComments() {
    $('.commentSection').html('');
    comments.on('value', function(snapshot) {
        var allComments = snapshot.val();
        for (var key in allComments) {
            if (allComments[key].id === guideID) {
                var current = allComments[key];
                $('.commentSection').append("<div class = 'comment'><div class = 'commentBody'>" + current.text + "</div><div class = 'commentUserSec'><img class = 'commentUser' src = '" + current.avatar + "''></img><br><div class = 'commentName'>" + current.user +"</div></div></div>")
            }
        }
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
}
setInterval(checkLoad, 2000);

function checkLoad() {
    var linkToCheck = window.location.hash;
    linkToCheck = linkToCheck.slice(7, 10);
    var toCheck = $('.guideTitle').html();
    if (linkToCheck === 'cha' && !toCheck) {
        setInterval(toReload, 1000);
    }
}

function toReload() {
    location.reload();
}

var icons = {
    Aatrox: 'http://img1.wikia.nocookie.net/__cb20150402215200/leagueoflegends/images/c/cc/AatroxSquare.png',
    Ahri: 'http://img2.wikia.nocookie.net/__cb20150402215212/leagueoflegends/images/1/18/AhriSquare.png',
    Akali: 'http://img1.wikia.nocookie.net/__cb20150402215220/leagueoflegends/images/a/a5/AkaliSquare.png',
    Alistar: 'http://img3.wikia.nocookie.net/__cb20150402215238/leagueoflegends/images/3/34/AlistarSquare.png',
    Amumu: 'http://img2.wikia.nocookie.net/__cb20150402215322/leagueoflegends/images/2/26/AmumuSquare.png',
    Anivia: 'http://img3.wikia.nocookie.net/__cb20150610012501/leagueoflegends/images/0/01/AniviaSquare.png',
    Annie: 'http://img3.wikia.nocookie.net/__cb20150404100758/leagueoflegends/images/6/6f/AnnieSquare.png',
    Ashe: 'http://img2.wikia.nocookie.net/__cb20150402215403/leagueoflegends/images/4/4a/AsheSquare.png',
    Azir: 'http://img3.wikia.nocookie.net/__cb20150402215409/leagueoflegends/images/f/f7/AzirSquare.png',
    Bard: 'http://img1.wikia.nocookie.net/__cb20150402215420/leagueoflegends/images/6/69/BardSquare.png',
    Blitzcrank: 'http://img4.wikia.nocookie.net/__cb20150402215457/leagueoflegends/images/5/5b/BlitzcrankSquare.png',
    Brand: 'http://img1.wikia.nocookie.net/__cb20150402215533/leagueoflegends/images/a/ab/BrandSquare.png',
    Braum: 'http://img1.wikia.nocookie.net/__cb20150402215539/leagueoflegends/images/b/b6/BraumSquare.png',
    Caitlyn: 'http://img3.wikia.nocookie.net/__cb20150402215548/leagueoflegends/images/e/e6/CaitlynSquare.png',
    Cassiopeia: 'http://img4.wikia.nocookie.net/__cb20150402215553/leagueoflegends/images/c/ca/CassiopeiaSquare.png',
    ChoGath: 'http://leagueoflegends.wikia.com/wiki/File:ChoGathSquare.png',
    Corki: 'http://img2.wikia.nocookie.net/__cb20150402215731/leagueoflegends/images/3/3d/CorkiSquare.png',
    Darius: 'http://img3.wikia.nocookie.net/__cb20150402215740/leagueoflegends/images/5/54/DariusSquare.png',
    Diana: 'http://img2.wikia.nocookie.net/__cb20150402215746/leagueoflegends/images/9/90/DianaSquare.png',
    DrMundo: 'http://img1.wikia.nocookie.net/__cb20150402215903/leagueoflegends/images/b/b0/DrMundoSquare.png',
    Draven: 'http://img2.wikia.nocookie.net/__cb20150402215825/leagueoflegends/images/d/d7/DravenSquare.png',
    Ekko: 'http://img3.wikia.nocookie.net/__cb20150623233832/leagueoflegends/images/e/ef/EkkoSquare.png',
    Elise: 'http://img2.wikia.nocookie.net/__cb20150402215852/leagueoflegends/images/9/91/EliseSquare.png',
    Evelynn: 'http://img1.wikia.nocookie.net/__cb20150402215919/leagueoflegends/images/5/5b/EvelynnSquare.png',
    Ezreal: 'http://img3.wikia.nocookie.net/__cb20150402220010/leagueoflegends/images/c/c3/EzrealSquare.png',
    FiddleSticks: 'http://img4.wikia.nocookie.net/__cb20150402220011/leagueoflegends/images/7/7c/FiddlesticksSquare.png',
    Fiora: 'http://img3.wikia.nocookie.net/__cb20150402220013/leagueoflegends/images/d/d2/FioraSquare.png',
    Fizz: 'http://img1.wikia.nocookie.net/__cb20150402220015/leagueoflegends/images/d/db/FizzSquare.png',
    Galio: 'http://img4.wikia.nocookie.net/__cb20150402220045/leagueoflegends/images/4/40/GalioSquare.png',
    Gangplank: 'http://img2.wikia.nocookie.net/__cb20150708114418/leagueoflegends/images/f/fe/GangplankSquare.png',
    Garen: 'http://img3.wikia.nocookie.net/__cb20150402220048/leagueoflegends/images/e/ea/GarenSquare.png',
    Gnar: 'http://img3.wikia.nocookie.net/__cb20150402220050/leagueoflegends/images/6/6b/GnarSquare.png',
    Gragas: 'http://img1.wikia.nocookie.net/__cb20150402220132/leagueoflegends/images/6/67/GragasSquare.png',
    Graves: 'http://img2.wikia.nocookie.net/__cb20150402220130/leagueoflegends/images/2/26/GravesSquare.png',
    Hecarim: 'http://img1.wikia.nocookie.net/__cb20150402220129/leagueoflegends/images/4/4c/HecarimSquare.png',
    Heimerdinger: 'http://img4.wikia.nocookie.net/__cb20150402220126/leagueoflegends/images/5/58/HeimerdingerSquare.png',
    Irelia: 'http://img1.wikia.nocookie.net/__cb20150402220206/leagueoflegends/images/7/72/IreliaSquare.png',
    Janna: 'http://img3.wikia.nocookie.net/__cb20150402220208/leagueoflegends/images/3/3f/JannaSquare.png',
    JarvanIV: 'http://img2.wikia.nocookie.net/__cb20150402220210/leagueoflegends/images/7/72/JarvanIVSquare.png',
    Jax: 'http://img4.wikia.nocookie.net/__cb20150402220202/leagueoflegends/images/0/0f/JaxSquare.png',
    Jayce: 'http://img3.wikia.nocookie.net/__cb20150402220244/leagueoflegends/images/a/aa/JayceSquare.png',
    Jinx: 'http://img3.wikia.nocookie.net/__cb20150402220247/leagueoflegends/images/e/e2/JinxSquare.png',
    Kalista: 'http://img2.wikia.nocookie.net/__cb20150402220249/leagueoflegends/images/a/aa/KalistaSquare.png',
    Karma: 'http://img2.wikia.nocookie.net/__cb20150402220251/leagueoflegends/images/4/4f/KarmaSquare.png',
    Karthus: 'http://img1.wikia.nocookie.net/__cb20150402220327/leagueoflegends/images/e/e1/KarthusSquare.png',
    Kassadin: 'http://img3.wikia.nocookie.net/__cb20150402220329/leagueoflegends/images/5/57/KassadinSquare.png',
    Katarina: 'http://img3.wikia.nocookie.net/__cb20150402220331/leagueoflegends/images/a/ae/KatarinaSquare.png',
    Kayle: 'http://img4.wikia.nocookie.net/__cb20150402220333/leagueoflegends/images/b/bd/KayleSquare.png',
    Kennen: 'http://img3.wikia.nocookie.net/__cb20150402220412/leagueoflegends/images/6/69/KennenSquare.png',
    KhaZix: 'http://img1.wikia.nocookie.net/__cb20120921042418/leagueoflegends/images/b/b5/KhaZixSquare.png',
    KogMaw: 'http://img4.wikia.nocookie.net/__cb20150402220409/leagueoflegends/images/e/ed/KogMawSquare.png',
    LeBlanc: 'http://img4.wikia.nocookie.net/__cb20150402220417/leagueoflegends/images/f/f1/LeBlancSquare.png',
    LeeSin: 'http://img3.wikia.nocookie.net/__cb20150413051029/leagueoflegends/images/b/bf/LeeSinSquare.png',
    Leona: 'http://img4.wikia.nocookie.net/__cb20150402220518/leagueoflegends/images/5/54/LeonaSquare.png',
    Lissandra: 'http://img4.wikia.nocookie.net/__cb20150402220524/leagueoflegends/images/3/36/LissandraSquare.png',
    Lucian: 'http://img2.wikia.nocookie.net/__cb20150402220529/leagueoflegends/images/1/1e/LucianSquare.png',
    Lulu: 'http://img2.wikia.nocookie.net/__cb20150402220550/leagueoflegends/images/9/91/LuluSquare.png',
    Lux: 'http://img3.wikia.nocookie.net/__cb20150402220552/leagueoflegends/images/0/01/LuxSquare.png',
    Malphite: 'http://img1.wikia.nocookie.net/__cb20150402220554/leagueoflegends/images/6/6f/MalphiteSquare.png',
    Malzahar: 'http://img1.wikia.nocookie.net/__cb20150402220555/leagueoflegends/images/a/a7/MalzaharSquare.png',
    Maokai: 'http://img2.wikia.nocookie.net/__cb20150402220612/leagueoflegends/images/6/64/MaokaiSquare.png',
    MasterYi: 'http://img2.wikia.nocookie.net/__cb20150402220630/leagueoflegends/images/f/fc/MasterYiSquare.png',
    MissFortune: 'http://img3.wikia.nocookie.net/__cb20150402220633/leagueoflegends/images/9/9d/MissFortuneSquare.png',
    Mordekaiser: 'http://img4.wikia.nocookie.net/__cb20150402220635/leagueoflegends/images/4/4d/MordekaiserSquare.png',
    Morgana: 'http://img4.wikia.nocookie.net/__cb20150402220702/leagueoflegends/images/d/d8/MorganaSquare.png',
    Nami: 'http://img4.wikia.nocookie.net/__cb20150402220700/leagueoflegends/images/d/d2/NamiSquare.png',
    Nasus: 'http://img2.wikia.nocookie.net/__cb20150402220659/leagueoflegends/images/5/58/NasusSquare.png',
    Nautilus: 'http://img3.wikia.nocookie.net/__cb20150402220732/leagueoflegends/images/b/b5/NautilusSquare.png',
    Nidalee: 'http://img2.wikia.nocookie.net/__cb20150402220734/leagueoflegends/images/7/7c/NidaleeSquare.png',
    Nocturne: 'http://img2.wikia.nocookie.net/__cb20150402220735/leagueoflegends/images/6/65/NocturneSquare.png',
    Nunu: 'http://img3.wikia.nocookie.net/__cb20150402220737/leagueoflegends/images/e/ef/NunuSquare.png',
    Olaf: 'http://img4.wikia.nocookie.net/__cb20150402220802/leagueoflegends/images/2/2b/OlafSquare.png',
    Orianna: 'http://img3.wikia.nocookie.net/__cb20150402220803/leagueoflegends/images/b/b0/OriannaSquare.png',
    Pantheon: 'http://img1.wikia.nocookie.net/__cb20150402220805/leagueoflegends/images/9/9b/PantheonSquare.png',
    Poppy: 'http://img4.wikia.nocookie.net/__cb20150402220832/leagueoflegends/images/e/e3/PoppySquare.png',
    Quinn: 'http://img4.wikia.nocookie.net/__cb20150402220833/leagueoflegends/images/7/7c/QuinnSquare.png',
    Rammus: 'http://img2.wikia.nocookie.net/__cb20150402220835/leagueoflegends/images/7/7c/RammusSquare.png',
    RekSai: 'http://img2.wikia.nocookie.net/__cb20150402220837/leagueoflegends/images/3/3e/Rek%27SaiSquare.png',
    Renekton: 'http://img3.wikia.nocookie.net/__cb20150402220903/leagueoflegends/images/f/fc/RenektonSquare.png',
    Rengar: 'http://img1.wikia.nocookie.net/__cb20150402220904/leagueoflegends/images/f/f1/RengarSquare.png',
    Riven: 'http://img3.wikia.nocookie.net/__cb20150402220906/leagueoflegends/images/4/46/RivenSquare.png',
    Rumble: 'http://img1.wikia.nocookie.net/__cb20150402220909/leagueoflegends/images/1/13/RumbleSquare.png',
    Ryze: 'http://img2.wikia.nocookie.net/__cb20150402220940/leagueoflegends/images/2/28/RyzeSquare.png',
    Sejuani: 'http://img1.wikia.nocookie.net/__cb20150402220939/leagueoflegends/images/9/93/SejuaniSquare.png',
    Shaco: 'http://img2.wikia.nocookie.net/__cb20150402220937/leagueoflegends/images/9/93/ShacoSquare.png',
    Shen: 'http://img2.wikia.nocookie.net/__cb20150402220936/leagueoflegends/images/d/d3/ShenSquare.png',
    Shyvana: 'http://img1.wikia.nocookie.net/__cb20150402221059/leagueoflegends/images/f/f6/ShyvanaSquare.png',
    Singed: 'http://img3.wikia.nocookie.net/__cb20150402221057/leagueoflegends/images/9/96/SingedSquare.png',
    Sion: 'http://img3.wikia.nocookie.net/__cb20150402221054/leagueoflegends/images/6/61/SionSquare.png',
    Sivir: 'http://img1.wikia.nocookie.net/__cb20150402221110/leagueoflegends/images/e/e1/SivirSquare.png',
    Skarner: 'http://img1.wikia.nocookie.net/__cb20150402221137/leagueoflegends/images/8/80/SkarnerSquare.png',
    Sona: 'http://img2.wikia.nocookie.net/__cb20150402221141/leagueoflegends/images/5/56/SonaSquare.png',
    Soraka: 'http://img4.wikia.nocookie.net/__cb20150402221143/leagueoflegends/images/8/8d/SorakaSquare.png',
    Swain: 'http://img2.wikia.nocookie.net/__cb20150402221211/leagueoflegends/images/8/8c/SwainSquare.png',
    Syndra: 'http://img4.wikia.nocookie.net/__cb20150402221209/leagueoflegends/images/6/65/SyndraSquare.png',
    TahmKench: 'http://static-img.kassad.in/champion/TahmKench.png',
    Talon: 'http://img1.wikia.nocookie.net/__cb20150402221208/leagueoflegends/images/f/f9/TalonSquare.png',
    Taric: 'http://img1.wikia.nocookie.net/__cb20150402221207/leagueoflegends/images/c/c4/TaricSquare.png',
    Teemo: 'http://img3.wikia.nocookie.net/__cb20150402221254/leagueoflegends/images/0/04/TeemoSquare.png',
    Thresh: 'http://img4.wikia.nocookie.net/__cb20150402221302/leagueoflegends/images/7/7b/ThreshSquare.png',
    Tristana: 'http://img4.wikia.nocookie.net/__cb20150402221501/leagueoflegends/images/0/06/TristanaSquare.png',
    Trundle: 'http://leagueoflegends.wikia.com/wiki/File:TrundleSquare.png',
    Tryndamere: 'http://leagueoflegends.wikia.com/wiki/File:TryndamereSquare.png',
    TwistedFate: 'http://img4.wikia.nocookie.net/__cb20150402221634/leagueoflegends/images/1/1f/TwistedFateSquare.png',
    Twitch: 'http://img3.wikia.nocookie.net/__cb20150402221633/leagueoflegends/images/7/79/TwitchSquare.png',
    Udyr: 'http://img1.wikia.nocookie.net/__cb20150402221631/leagueoflegends/images/d/d1/UdyrSquare.png',
    Urgot: 'http://img4.wikia.nocookie.net/__cb20150402222256/leagueoflegends/images/8/88/UrgotSquare.png',
    Varus: 'http://img4.wikia.nocookie.net/__cb20150402222306/leagueoflegends/images/c/c2/VarusSquare.png',
    Vayne: 'http://img2.wikia.nocookie.net/__cb20150402222338/leagueoflegends/images/9/95/VayneSquare.png',
    Veigar: 'http://img2.wikia.nocookie.net/__cb20150402222337/leagueoflegends/images/8/8f/VeigarSquare.png',
    Velkoz: 'http://img1.wikia.nocookie.net/__cb20150402222335/leagueoflegends/images/0/05/Vel%27KozSquare.png',
    Vi: 'http://img3.wikia.nocookie.net/__cb20150402222421/leagueoflegends/images/c/c0/ViSquare.png',
    Viktor: 'http://img2.wikia.nocookie.net/__cb20150402222333/leagueoflegends/images/a/a3/ViktorSquare.png',
    Vladimir: 'http://img4.wikia.nocookie.net/__cb20150402222423/leagueoflegends/images/7/75/VladimirSquare.png',
    Volibear: 'http://img1.wikia.nocookie.net/__cb20150402222425/leagueoflegends/images/f/f9/VolibearSquare.png',
    Warwick: 'http://img2.wikia.nocookie.net/__cb20150402222427/leagueoflegends/images/4/42/WarwickSquare.png',
    Wukong: 'http://img2.wikia.nocookie.net/__cb20150402222522/leagueoflegends/images/6/6d/WukongSquare.png',
    Xerath: 'http://img1.wikia.nocookie.net/__cb20150402222520/leagueoflegends/images/7/7a/XerathSquare.png',
    XinZhao: 'http://img2.wikia.nocookie.net/__cb20150402222519/leagueoflegends/images/b/bf/XinZhaoSquare.png',
    Yasuo: 'http://img3.wikia.nocookie.net/__cb20150402222545/leagueoflegends/images/c/c0/YasuoSquare.png',
    Yorick: 'http://img2.wikia.nocookie.net/__cb20150402222622/leagueoflegends/images/d/d8/YorickSquare.png',
    Zac: 'http://img1.wikia.nocookie.net/__cb20150402222620/leagueoflegends/images/8/81/ZacSquare.png',
    Zed: 'http://img4.wikia.nocookie.net/__cb20150402222617/leagueoflegends/images/b/bb/ZedSquare.png',
    Ziggs: 'http://img1.wikia.nocookie.net/__cb20150402222616/leagueoflegends/images/5/55/ZiggsSquare.png',
    Zilean: 'http://img2.wikia.nocookie.net/__cb20150402222614/leagueoflegends/images/a/ac/ZileanSquare.png',
    Zyra: 'http://img2.wikia.nocookie.net/__cb20150402222613/leagueoflegends/images/1/1a/ZyraSquare.png'
};