let summoner;

function loadSummoner(){
    let name = document.getElementsByName("summonerName")[0].value;
    window.location.href = "summoner.html?Name=" + name;
}

var getParamFromUrl = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}