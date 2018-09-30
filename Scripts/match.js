class Match{
    
    constructor(response){
        this.bannedChampions = response.bannedChampions;
        this.gameId = response.gameId;
        this.participants = response.participants;
    }
}

window.onload = function(){
    id = getParamFromUrl('id');
    //get version
    getDragonRequest("/api/versions.json", (versions) => {
        let version = versions[0];
        //get champion List
        getDragonRequest(`/cdn/${version}/data/en_US/champion.json`, (championJson) => {
            //get Active Match
            getRequest("/lol/spectator/v3/active-games/by-summoner/" + id, (response) => {
                match = new Match(response);
                let team100 = 0;
                let team200 = 0;
                //champSplash
                for(participant of response.participants){
                    champName = getNameFromId(participant.championId, championJson);
                    if(participant.teamId === 100){
                        this.document.getElementById(`champ100-${team100}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`);
                        this.document.getElementById(`champName100-${team100}`).innerText = championJson.data[champName].name;
                        team100++;
                    }else{
                        this.document.getElementById(`champ200-${team200}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`);
                        this.document.getElementById(`champName200-${team200}`).innerText = championJson.data[champName].name;
                        team200++;
                    }
                }
                //perks
                getDragonRequest(`/cdn/${version}/data/en_US/runesReforged.json`, (runesReforged) => {
                    let team100 = 0;
                    let team200 = 0;
                    for(participant of response.participants){
                        runeIcon = getRuneFromId(participant.perks.perkStyle, participant.perks.perkIds[0], runesReforged);
                        let subRuneCat;
                        //getSubRune
                        for(let runeCat of runesReforged){
                            if(runeCat.id == participant.perks.perkSubStyle){
                                subRuneCat = runeCat.icon;
                            }
                        }
                        if(participant.teamId === 100){
                            this.document.getElementById(`rune2100-${team100}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/${runeIcon}`);
                            this.document.getElementById(`rune1100-${team100}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/${subRuneCat}`);
                            team100++;
                        }else{
                            this.document.getElementById(`rune2200-${team200}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/${runeIcon}`);
                            this.document.getElementById(`rune1200-${team200}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/img/${subRuneCat}`);
                            team200++;
                        }
                    }
                });
                //spells
                getDragonRequest(`/cdn/${version}/data/en_US/summoner.json`, (summonerSpells) => {
                    spellteam100 = 0;
                    spellteam200 = 0;
                    for(participant of response.participants){
                        let spell1Name = getNameFromId(participant.spell1Id, summonerSpells);
                        let spell2Name = getNameFromId(participant.spell2Id, summonerSpells);
                        if(spell2Name == "SummonerFlash"){
                            spell2Name = spell1Name;
                            spell1Name = "SummonerFlash";
                        }
                        if(participant.teamId === 100){
                            this.document.getElementById(`spell1100-${spellteam100}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1Name}.png`);
                            this.document.getElementById(`spell2100-${spellteam100}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2Name}.png`);
                            spellteam100++;
                        }else{
                            this.document.getElementById(`spell1200-${spellteam200}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1Name}.png`);
                            this.document.getElementById(`spell2200-${spellteam200}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2Name}.png`);
                            spellteam200++;
                        }
                    }
                });
                summonerteam100 = 0;
                summonerteam200 = 0;
                //Summoners
                for(participant of response.participants){
                    let localParticipant = participant;
                    let currentVal = summonerteam100;
                    if(localParticipant.teamId === 200){
                        currentVal = summonerteam200;
                        summonerteam200++;
                    }else{
                        summonerteam100++;
                    }
                    getRequest(`/lol/summoner/v3/summoners/by-name/${localParticipant.summonerName}`, (accountData, currentTeamId) =>{
                        let level = getLevel(accountData.summonerLevel);
                        if(localParticipant.teamId === 100){
                            this.document.getElementById(`summoner100-${currentTeamId}`).setAttribute("src", `/Images/Icon/${level}.png`);
                            this.document.getElementById(`level100-${currentTeamId}`).innerText = padLeft(accountData.summonerLevel, 3, ' ');
                            this.document.getElementById(`summonerName100-${currentTeamId}`).innerText = localParticipant.summonerName;
                            this.document.getElementById(`summonerIcon100-${currentTeamId}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${localParticipant.profileIconId}.png`);
                        }else{
                            this.document.getElementById(`summoner200-${currentTeamId}`).setAttribute("src", `/Images/Icon/${level}.png`);
                            this.document.getElementById(`level200-${currentTeamId}`).innerText = padLeft(accountData.summonerLevel, 3, ' ');
                            this.document.getElementById(`summonerName200-${currentTeamId}`).innerText = localParticipant.summonerName;
                            this.document.getElementById(`summonerIcon200-${currentTeamId}`).setAttribute("src", `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${localParticipant.profileIconId}.png`);
                        }
                    }, currentVal);
                }
            });
        });
    });
          
}

function getNameFromId(id, specifiedJson){
    let data = specifiedJson.data;
    for (let champObj in data) {
        if(data[champObj].key == id){
            return champObj;
        }
    }
}

function getRuneFromId(catId, id, runesReforged){
    for(let runeCat of runesReforged){
        if(runeCat.id == catId){
            for(let rune of runeCat.slots[0].runes){
                if(rune.id == id){
                    return rune.icon;
                }
            }
        }
    }
}

function getLevel(level){
    let levels = [1, 30, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];
    for(i = 0; i < levels.length; i++){
        if(level < levels[i]){
            return levels[i - 1];
        }
    }
    return 500;
}

function padLeft(string, count, char){
    while(string.toString().length < count){
        string = char + string;
    }
    return string;
}

