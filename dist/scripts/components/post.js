var React = require('react');
var $ = require('jquery');

var ref = new Firebase("https://lolresource.firebaseio.com");
var guides = new Firebase("https://lolresource.firebaseio.com/guides");
var authData = ref.getAuth();

module.exports = React.createClass ({
    render: function() {
        return(
        	<section>
        		<form onSubmit = {this.postGuide}>
                    <div className = 'champSelect'>
                        Choose your champion... <br />
                        <select name = 'select' className = 'champion'>
                            <option value='Aatrox'>Aatrox</option>
                            <option value='Ahri'>Ahri</option>
                            <option value='Akali'>Akali</option>
                            <option value='Alistar'>Alistar</option>
                            <option value='Anivia'>Anivia</option>
                            <option value='Annie'>Annie</option>
                            <option value='Ashe'>Ashe</option>
                            <option value='Azir'>Azir</option>
                            <option value='Bard'>Bard</option>
                            <option value='Blitzcrank'>Blitzcrank</option>
                            <option value='Brand'>Brand</option>
                            <option value='Braum'>Braum</option>
                            <option value='Caitlyn'>Caitlyn</option>
                            <option value='Cassiopeia'>Cassiopeia</option>
                            <option value='Chogath'>Cho'Gath</option>
                            <option value='Corki'>Corki</option>
                            <option value='Darius'>Darius</option>
                            <option value='Diana'>Diana</option>
                            <option value='DrMundo'>Dr. Mundo</option>
                            <option value='Draven'>Draven</option>
                            <option value='Ekko'>Ekko</option>
                            <option value='Elise'>Elise</option>
                            <option value='Evelynn'>Evelynn</option>
                            <option value='Ezreal'>Ezreal</option>
                            <option value='Fiddlesticks'>Fiddlesticks</option>
                            <option value='Fiora'>Fiora</option>
                            <option value='Fizz'>Fizz</option>
                            <option value='Galio'>Galio</option>
                            <option value='Gangplank'>Gangplank</option>
                            <option value='Garen'>Garen</option>
                            <option value='Gnar'>Gnar</option>
                            <option value='Gragas'>Gragas</option>
                            <option value='Graves'>Graves</option>
                            <option value='Hecarim'>Hecarim</option>
                            <option value='Heimerdinger'>Heimerdinger</option>
                            <option value='Irelia'>Irelia</option>
                            <option value='Janna'>Janna</option>
                            <option value='JarvanIV'>Jarvan IV</option>
                            <option value='Jax'>Jax</option>
                            <option value='Jayce'>Jayce</option>
                            <option value='Jinx'>Jinx</option>
                            <option value='Kalista'>Kalista</option>
                            <option value='Karma'>Karma</option>
                            <option value='Karthus'>Karthus</option>
                            <option value='Kassadin'>Kassadin</option>
                            <option value='Katarina'>Katarina</option>
                            <option value='Kayle'>Kayle</option>
                            <option value='Kennen'>Kennen</option>
                            <option value='Khazix'>Kha'zix</option>
                            <option value='KogMaw'>Kog'Maw</option>
                            <option value='LeBlanc'>LeBlanc</option>
                            <option value='LeeSin'>Lee Sin</option>
                            <option value='Leona'>Leona</option>
                            <option value='Lissandra'>Lissandra</option>
                            <option value='Lucian'>Lucian</option>
                            <option value='Lulu'>Lulu</option>
                            <option value='Lux'>Lux</option>
                            <option value='Malphite'>Malphite</option>
                            <option value='Maokai'>Maokai</option>
                            <option value='MasterYi'>Master Yi</option>
                            <option value='MissFortune'>Miss Fortune</option>
                            <option value='Mordekaiser'>Mordekaiser</option>
                            <option value='Morgana'>Morgana</option>
                            <option value='Nami'>Nami</option>
                            <option value='Nasus'>Nasus</option>
                            <option value='Nautilus'>Nautilus</option>
                            <option value='Nidalee'>Nidalee</option>
                            <option value='Nocturne'>Nocturne</option>
                            <option value='Nunu'>Nunu</option>
                            <option value='Olaf'>Olaf</option>
                            <option value='Orianna'>Orianna</option>
                            <option value='Pantheon'>Pantheon</option>
                            <option value='Poppy'>Poppy</option>
                            <option value='Quinn'>Quinn</option>
                            <option value='Rammus'>Rammus</option>
                            <option value='Reksai'>Rek'sai</option>
                            <option value='Renekton'>Renekton</option>
                            <option value='Rengar'>Rengar</option>
                            <option value='Riven'>Riven</option>
                            <option value='Rumble'>Rumble</option>
                            <option value='Ryze'>Ryze</option>
                            <option value='Sejuani'>Sejuani</option>
                            <option value='Shaco'>Shaco</option>
                            <option value='Shen'>Shen</option>
                            <option value='Shyvana'>Shyvana</option>
                            <option value='Singed'>Singed</option>
                            <option value='Sion'>Sion</option>
                            <option value='Sivir'>Sivir</option>
                            <option value='Skarner'>Skarner</option>
                            <option value='Sona'>Sona</option>
                            <option value='Soraka'>Soraka</option>
                            <option value='Swain'>Swain</option>
                            <option value='Syndra'>Syndra</option>
                            <option value='Talon'>Talon</option>
                            <option value='Taric'>Taric</option>
                            <option value='Teemo'>Teemo</option>
                            <option value='Thresh'>Thresh</option>
                            <option value='Tristana'>Tristana</option>
                            <option value='Trundle'>Trundle</option>
                            <option value='Tryndamere'>Tryndamere</option>
                            <option value='TwistedFate'>Twisted Fate</option>
                            <option value='Twitch'>Twitch</option>
                            <option value='Udyr'>Udyr</option>
                            <option value='Urgot'>Urgot</option>
                            <option value='Varus'>Varus</option>
                            <option value='Vayne'>Vayne</option>
                            <option value='Veigar'>Veigar</option>
                            <option value='Velkoz'>Velkoz</option>
                            <option value='Vi'>Vi</option>
                            <option value='Viktor'>Viktor</option>
                            <option value='Vladimir'>Vladimir</option>
                            <option value='Volibear'>Volibear</option>
                            <option value='Warwick'>Warwick</option>
                            <option value='Wukong'>Wukong</option>
                            <option value='Xerath'>Xerath</option>
                            <option value='XinZhao'>Xin Zhao</option>
                            <option value='Yasuo'>Yasuo</option>
                            <option value='Yorick'>Yorick</option>
                            <option value='Zac'>Zac</option>
                            <option value='Zed'>Zed</option>
                            <option value='Ziggs'>Ziggs</option>
                            <option value='Zilean'>Zilean</option>
                            <option value='Zyra'>Zyra</option>
                        </select><br/>
                        Choose your role... <br/>
                        <select name = 'select' className = 'role'>
                            <option value = 'Top'>Top</option>
                            <option value = 'Jungle'>Jungle</option>
                            <option value = 'Mid'>Mid</option>
                            <option value = 'Dps'>DPS</option>
                            <option value = 'Support'>Support</option>
                        </select><br/>
                    </div>
                    Title: <br/>
                    <input type = 'text' className = 'guideName' /><br/>
                    Body:<br/>
                    <textarea wrap = 'on' rows = '4' cols = '50' className = "body" type = "text"></textarea><br/>
                    <button className = "signButton">Submit</button>
                </form>
        	</section>
        );
    },
    postGuide: function(e) {
        e.preventDefault();
        if(authData === null) {
            window.location.hash = 'login';
        } else {
            console.log($('.guideName').val());
            var champion = $('.champion').val();
            var role = $('.role').val();
            var guideName = $('.guideName').val();
            var body = $('.body').val();
            var count = 1;
            guides.on("value", function(snapshot) {
                var guideCount = snapshot.val();
                var type = 'champion'; //until general guides are implemented
                for (var key in guideCount) {
                    count++;
                }
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            var user = authData["password"].email;
            var newGuide = {
                champion: champion,
                role: role,
                title: guideName,
                body: body,
                user: user,
                id: 'champion' + count,
                rating: 0,
                comments: null
            }
            guides.push(newGuide);
            window.location.hash = 'home';
        }
    }
});





