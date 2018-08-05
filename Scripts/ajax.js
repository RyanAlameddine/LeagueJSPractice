function getRequest(link, callback)
{
    let request = new XMLHttpRequest();
    request.open("GET", "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com" + link + "?api_key=RGAPI-fb50e5c7-3b85-4ab1-bdac-f11474f9068e");
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