class Summoner{
    Summoner(name){
        getRequest("/lol/summoner/v3/summoners/by-name/" + name, this.processSummonerInfo);
    }

    processSummonerInfo(response){
        this.profileIconId = response.profileIconId;
        this.name = response.name;
        this.summonerLevel = response.summonerLevel;
        this.id = response.id;
        this.accountId = response.accountId;
    }
}