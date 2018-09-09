class Match{
    
    constructor(response){
        this.bannedChampions = response.bannedChampions;
        this.gameId = response.gameId;
        this.participants = response.participants;
    }
}

window.onload = function(){
    id = getParamFromUrl('id');
    getDragonRequest("/api/versions.json", (versions) => {
        let version = versions[0];
        getDragonRequest(`/cdn/${version}/data/en_US/champion.json`, (championJson) => {
            getRequest("/lol/spectator/v3/active-games/by-summoner/" + id, (response) => {
                match = new Match(response);
                team100 = 0;
                team200 = 0;
                for(participant of response.participants){
                    champName = getChampName(participant.championId, championJson);
                    if(participant.teamId === 100){
                        this.document.getElementById(`champ100-${team100}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`);
                        team100++;
                    }else{
                        this.document.getElementById(`champ200-${team200}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`);
                        team200++;
                    }
                }
            });
        });
    });
          
}

function getChampName(id, championJson){
    let data = championJson.data;
    for (let champObj in data) {
        if(data[champObj].key == id){
            return champObj;
        }
    }
}