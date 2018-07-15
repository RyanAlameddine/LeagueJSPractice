function getRequest(link, callback)
{
    let request = new XMLHttpRequest();
    request.open("GET", "https://na1.api.riotgames.com/" + link + "?api_key=RGAPI-ed9129d6-462a-436c-81c7-01c45419e6d7");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () =>{
        if(request.readyState == 4 && request.status >= 200 && request.status < 300){
            callback(JSON.parse(request.responseText));
        }
    };
    request.send();
}