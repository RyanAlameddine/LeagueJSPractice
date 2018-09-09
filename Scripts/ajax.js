function getRequest(link, callback)
{
    let request = new XMLHttpRequest();
    request.open("GET", "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com" + link + "?api_key=RGAPI-f81b7561-3333-4af9-aa35-6bfa255759c9");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () =>{
        if(request.readyState == 4 && request.status >= 200 && request.status < 300){
            callback(JSON.parse(request.responseText));
        }
    };
    request.send();
}

function getDragonRequest(link, callback)
{
    let request = new XMLHttpRequest();
    request.open("GET", "https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com" + link);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () =>{
        if(request.readyState == 4 && request.status >= 200 && request.status < 300){
            callback(JSON.parse(request.responseText));
        }
    };
    request.send();
}