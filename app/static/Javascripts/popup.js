function popup(name, destination){


    document.getElementById("modal-text").innerHTML = '<span style="color: #FE980F;">' +  name.toUpperCase() + '</span>' + " HAS BEEN ADDED TO YOUR " + destination.toUpperCase() + "";

    document.getElementById("myModal").style.display = "block";
    setTimeout(hide, 2000);

    function hide(){
        document.getElementById("myModal").style.display = "none"
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        }
    }
}