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
    let summoner = new Summoner(name, () => {
        document.getElementById("summonerName").textContent = name;
        getDragonRequest("/api/versions.json", (versions) => {
            let version = versions[0];
            document.getElementById("summonerIcon").setAttribute("src", "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/profileicon/" + summoner.profileIconId + ".png");
            getRequest("/lol/champion-mastery/v3/champion-masteries/by-summoner/" + summoner.id, (champMasteries) =>{
                let bestChamp = champMasteries[0];
                let champId = bestChamp.championId;
                getRequest("/lol/platform/v3/champions/" + champId, ())
                getDragonRequest("/cdn/img/champion/splash/" + )
            });
        });
    });
}

