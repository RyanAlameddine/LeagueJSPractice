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
                //set champion mastery flag
                let masteryLevel = bestChamp.championLevel;
                document.getElementById("championMastery").setAttribute("src", `/Images/Mastery/mastery${masteryLevel}.png`);
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
                        document.getElementById("championSplash").setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${champData.data[champName].skins[Math.floor(Math.random() * skinCount)].num}.jpg`);
                        
                    });
                });
            });
        });
    });
}

