
function randomlink(){
    randomlinks = document.getElementsByClassName("game")
    window.location=randomlinks[Math.floor(Math.random()*randomlinks.length)]
    }