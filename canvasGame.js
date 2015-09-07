document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {
    document.getElementById("canvas").click();
    (function() {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        width = 1000,
        height = window.innerHeight,
        player = {
            x: 492.5,
            y: -10,
            width: 15,
            height: 15,
            speed: 3,
            velX: 0,
            velY: 0,
            jumping: false,
            grounded: false
        },
        keys = [],
        friction = 0.9,
        gravity = 0.3;
    var boxes = [];
    //boxes
    boxes.push({
        x: -10,
        y: 0,
        width: 10,
        height: height
    });
    boxes.push({
        x: width,
        y: 0,
        width: 200,
        height: height
    });
    boxes.push({
        x: 50,
        y: 400,
        width: 50,
        height: 5
    });
    boxes.push({
        x: 200,
        y: 400,
        width: 100,
        height: 5
    });
    boxes.push({
        x: 400,
        y: 400,
        width: 100,
        height: 5
    });
    boxes.push({
        x: 500,
        y: 400,
        width: 100,
        height: 5
    });
    boxes.push({
        x: 700,
        y: 400,
        width: 100,
        height: 5
    });
    boxes.push({
        x: 900,
        y: 400,
        width: 55,
        height: 5
    });
    boxes.push({
        x: 467.5,
        y: 395,
        width: 65,
        height: 5
    });
    boxes.push({
        x: 100,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 200,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 300,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 400,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 600,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 700,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 800,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 900,
        y: 400,
        width: 5,
        height: 150
    });
    boxes.push({
        x: 0,
        y: 325,
        width: 50,
        height: 5
    });
    boxes.push({
        x: 50,
        y: 325,
        width: 5,
        height: 75,
    });
    boxes.push({
        x: 950,
        y: 325,
        width: 50,
        height: 5
    });
    boxes.push({
        x: 950,
        y: 325,
        width: 5,
        height: 75,
    });
    canvas.width = width;
    canvas.height = height;

    function update() {
        // check keys
        if (keys[38]) {
            // jump - space, up or w
            if (!player.jumping && player.grounded) {
                player.jumping = true;
                player.grounded = false;
                player.velY = -player.speed * 2.5;
            }
        }
        if (keys[39]) {
            // move right - d or right arrow
            if (player.velX < player.speed) {
                player.velX++;
            }
        }
        if (keys[37]) {
            // move left - a or left arrow
            if (player.velX > -player.speed) {
                player.velX--;
            }
        }
        //redirects
        if (linked == 0) {
            if (player.y > 600) {
                if (player.x > 100 && player.x < 200) {
					link1();
                    linked = 1;
                }
                if (player.x > 300 && player.x < 400) {
					link2();
                    linked = 1;
                }
                if (player.x > 600 && player.x < 700) {
					link3();
                    linked = 1;
                }
                if (player.x > 800 && player.x < 900) {
					link4();
                    linked = 1;
                }
            }
        }
        player.velX *= friction;
        player.velY += gravity;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "white";
		
		var img = document.getElementById("icon1");
		ctx.drawImage(icon1, 115, 220, 75, 75);
		
		var img = document.getElementById("icon2");
		ctx.drawImage(icon2, 315, 220, 75, 75);
		
		//var img = document.getElementById("gravityicon");
		//ctx.drawImage(gravityicon, 115, 220, 75, 75);
		
		//var img = document.getElementById("gravityicon");
		//ctx.drawImage(gravityicon, 115, 220, 75, 75);
		
        ctx.beginPath();
        player.grounded = false;
        for (var i = 0; i < boxes.length; i++) {
            ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
            var dir = colCheck(player, boxes[i]);
            if (dir === "l" || dir === "r") {
                player.velX = 0;
                player.jumping = false;
            } else if (dir === "b") {
                player.grounded = true;
                player.jumping = false;
            } else if (dir === "t") {
                player.velY *= -1;
            }
        }
        if (player.grounded) {
            player.velY = 0;
        }
        player.x += player.velX;
        player.y += player.velY;
        ctx.fill();
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        requestAnimationFrame(update);
    }

    function colCheck(shapeA, shapeB) {
        // calculating vector things for the box
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width /
                2)),
            vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB
                .height / 2)),
            // add the half widths and half heights of the boxes
            hWidths = (shapeA.width / 2) + (shapeB.width / 2),
            hHeights = (shapeA.height / 2) + (shapeB.height / 2),
            colDir = null;
        // if the vector things are smaller it is a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            // which side of the box it's touching
            var oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    shapeA.y += oY;
                } else {
                    colDir = "b";
                    shapeA.y -= oY;
                }
            } else {
                if (vX > 0) {
                    colDir = "l";
                    shapeA.x += oX;
                } else {
                    colDir = "r";
                    shapeA.x -= oX;
                }
            }
        }
        return colDir;
    }
    document.body.addEventListener("keydown", function(e) {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
    window.addEventListener("load", function() {
        update();
    });
}
