$(function() {
    //paintingerasing or not
    var paint = false;
    var paint_erase = "paint";

    //get canvas and context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");

    //get canvas container
    var container = $("#container");

    //mouse position
    var mouse = {x: 0, y: 0};

    //load saved work from local storage
    if(localStorage.getItem("imgCanvas") != null) {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };

    //set drawing parameters
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //click inside container
    container.mousedown(function(e) {
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });

    //move mouse while holding mouse key
    container.mousemove(function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true) {
            if(paint_erase == "paint") {
                ctx.strokeStyle = $("#paintColor").val();
            } else {
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });

    //mouse up for not paintingerasing anymore
    container.mouseup(function() {
        paint = false;
    });

    // if we leave container, not paintingerasing anymore
    container.mouseleave(function() {
        paint = false;
    });

    //click on the reset button
    $("#reset").click(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });

    //click on the save button
    $("#save").click(function() {
        if(typeof(localStorage) != null) {
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        } else {
            window.alert("Your browser does not support local storage!");
        }
    });

    //click on the erase button
    $("#erase").click(function() {
        if(paint_erase == "paint") {
            paint_erase = "erase";
        } else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //change color input
    $("#paintColor").change(function() {
        $("#circle").css("background-color", $(this).val());
    });

    //change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

});