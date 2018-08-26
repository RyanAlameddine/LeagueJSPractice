class Match{
    constructor(response){
        
    }
}

window.onload = function(){
    id = getParamFromUrl('id');
    getRequest("/lol/spectator/v3/active-games/by-summoner/" + id, (response) => {
        match = new Match(response);
    });      
}