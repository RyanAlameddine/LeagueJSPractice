class Summoner{
    constructor(name, func){
        this.func = func;
        this.processSummonerInfo = this.processSummonerInfo.bind(this);
        getRequest("/lol/summoner/v3/summoners/by-name/" + name, this.processSummonerInfo);        
    }

    processSummonerInfo(response) {
        this.profileIconId = response.profileIconId;
        this.name = response.name;
        this.summonerLevel = response.summonerLevel;
        this.id = response.id;
        this.accountId = response.accountId;
        this.func();
    }
}

function loadPage(name){
    //load summoner info
    let summoner = new Summoner(name, () => {
        //set summoner name
        document.getElementById("summonerName").textContent = name;
        document.getElementById('gameStat').setAttribute('src', "match.html?id=" + summoner.id);
        //get version
        getDragonRequest("/api/versions.json", (versions) => {
            let version = versions[0];
            //set summoner icon
            document.getElementById("summonerIcon").setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`);
            //get champion masteries
            getRequest(`/lol/champion-mastery/v3/champion-masteries/by-summoner/${summoner.id}`, (champMasteries) =>{
                //get champion with highest mastery
                let bestChamp = champMasteries[0];
                let champId = bestChamp.championId;
                let masteryLevel = bestChamp.championLevel;
                //get DDragon champion json
                getDragonRequest(`/cdn/${version}/data/en_US/champion.json`, (championJson) => {
                    //get champion name
                    let data = championJson.data;
                    let champName;
                    for (let champObj in data) {
                        if(data[champObj].key == champId){
                            champName = champObj;
                            break;
                        }
                    }
                    //get champion specific data from DDragon
                    getDragonRequest(`/cdn/${version}/data/en_US/champion/${champName}.json`, (champData) => {
                        //get random skin of champ
                        let skinCount = champData.data[champName].skins.length;
                        
                        document.getElementById("championSplashParallax").setAttribute("style", `${document.getElementById("championSplashParallax").getAttribute('style')} background-image: url('/Images/Mastery/mastery${masteryLevel}.png'), url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${champData.data[champName].skins[Math.floor(Math.random() * skinCount)].num}.jpg');`);

                    });
                });
            });
        });
    });
}





function scrollFooter(scrollY, heightFooter)
{
    if(scrollY >= heightFooter){
        $('footer').css({
            'bottom' : '0px'
        });
    }else{
        scrollYfromBottom = scrollY + $(window).height();

        $('footer').css({
            //scrolly is top left corner
            'bottom' : scrollYfromBottom - $(window).height() - heightFooter + 'px'
        });
    }
    /*
    if(scrollY >= heightFooter)
    {
        $('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        $('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }*/
}

$(window).load(function(){
    loadPage(getParamFromUrl('Name'));
    var windowHeight        = $(window).height(),
        footerHeight        = $('footer').height(),
        heightDocument      = (windowHeight) + ($('.content').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px',
        'margin-bottom' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function(){
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top' : '-' + scroll + 'px'
        });
        
        $('header').css({
            'background-position-y' : (0 + (scroll * 20 / heightDocument)) + 'px, ' + (50 - (scroll * 100 / heightDocument)) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});
