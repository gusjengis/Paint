document.getElementById("UI").onclick = function(){
    if(document.getElementById("c1").classList.contains("darkMode")){
        document.getElementById("c1").classList.remove("darkMode");
        darkMode = false;
        setStrokeStyle();
        drawStrokes();
    } else {
        document.getElementById("c1").classList.add("darkMode");
        darkMode = true;
        setStrokeStyle();
        drawStrokes();
    }
    console.log(darkMode);

}