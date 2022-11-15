const loadingScreen = $("#loading-screen");
const progress = $("#progress");
const percentage = $("#percentage");
const loadingText = $("#loading-title");
const startBtn = $('.start-btn');
const startPage = $('.start-screen');


// !!!!!
let num = 0;
function imgLoad(img) {
    progress.show();
	var img_length = document.images.length;	
    
    setTimeout (function(){ 
        loadingText.hide();
        percentage.text(Math.ceil((num)/(img_length)*100));
        num ++;
        if(num < img_length){
            imgLoad(document.images[num]);	}
        else{
            percentage.text(100);
            loadingScreen.fadeOut(1000);
            setTimeout(() => startPage.fadeIn(1000), 1000);
        }	
	  },100)
	}
// !!!!!

imgLoad(document.images[num]);

// Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

//collisions
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i));    
}

// info zones
const infoZonesMap = [];
for (let i = 0; i < infoZonesData.length; i += 160) {
    infoZonesMap.push(infoZonesData.slice(i, 160 + i));    
}




const offset = {
    x: -1400,
    y: -2230
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {   
            boundaries.push(
                new Boundary({
                    position: {
                x: j * Boundary.width + offset.x ,
                y: i * Boundary.height + offset.y
            }}));
        }
    });
});


const infoZones = [];

infoZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {   
            infoZones.push(
                new Boundary({
                    position: {
                x: j * Boundary.width + offset.x ,
                y: i * Boundary.height + offset.y
            }}));
        }
    });
});





// map
const image = new Image();
image.src = './img/map2.png';

// map
const image2 = new Image();
image2.src = './img/map.png';

//player
const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';

// foreground
const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';

const playerImageWidth = 192;
const playerImageHeight = 68;



const player = new Sprite({
    position: {
        x: canvas.width / 2 - (playerImageWidth / 4) / 2, // x pos of cropped image (where image is placed on x-axis)
        y: screen.height / 2 - playerImageHeight / 2, // y pos of cropped image (where image is placed on y-axis) 
    }, 
    image: playerDownImage,
    frames: {max: 4},
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
});

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const keys = {
    'ArrowUp': {
        pressed: false
    },
    'ArrowDown': {
        pressed: false
    },
    'ArrowLeft': {
        pressed: false
    },
    'ArrowRight': {
        pressed: false
    },
    'space': {
        pressed: false
    }
}


const movables = [background, ...boundaries, foreground, ...infoZones];

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
        );
}
let modalId = 0;
let modals = $(".modal");
function showModal() {
    if (modalId === modals.length) modalId = 0;
    modals.hide();
    console.log( modals.eq(0));
    modals.eq(modalId).show();
    modalId++;
}


startBtn.click( () => startBtn.attr('clicked', 'true'));

let backgroundMap = new Sprite({
    position: {
        x: offset.x + 700,
        y: offset.y + 700
    },
    image: image2
});


const textImage = new Image();
textImage.src = './img/textImage.png';
const text = new Sprite({
    position: {
        x: canvas.width / 2 ,
        y: screen.height / 2 
    },
    image: textImage
});

const textImage2 = new Image();
textImage2.src = './img/textImage2.png';
const text2 = new Sprite({
    position: {
        x: canvas.width / 2 ,
        y: screen.height / 2 
    },
    image: textImage2
});

let flag = false;
let flag2 = false;

const menuBtn = $('#menuBtn');
const exitMenu = $('#exitMenu');
const menu = $('.menu');
menuBtn.click(() => {
    menu.show();
});
exitMenu.click(() => {
    menu.hide();
});

function startScreen() {   
    let requestId = window.requestAnimationFrame(startScreen);
    backgroundMap.position.x -= 0.3;
    backgroundMap.position.y -= 0.3;
    backgroundMap.draw();
    if (startBtn.attr('clicked') === 'true') {
            startPage.hide(500);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.cancelAnimationFrame(requestId);
            setTimeout(() => {
                flag = true;
                setTimeout(() => {
                    flag = false;
                    flag2 = true;
                    setTimeout(() => {
                        flag2 = false;
                    }, 7000);
                }, 9000);
            }, 3000);           
            menuBtn.fadeIn(3000);
            animate();
    }
}

startScreen();


function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    infoZones.forEach(zone => {
        zone.draw();
    });
    player.draw();
    foreground.draw();
    text.position.x = player.position.x + 10;
    text.position.y = player.position.y - 70;
    if (flag) text.draw();
    if (flag2) {
        text2.position.x = player.position.x + 10;
        text2.position.y = player.position.y - 70;
        text2.draw();
    }

    let moving = true;
    player.moving = false;


    if (keys.space.pressed) {

        for (let i = 0; i < infoZones.length; i++) {
            const zone = infoZones[i];
            if (
                rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                    ...zone,
                     position: {
                    x: zone.position.x,
                    y: zone.position.y + 3
                   }} 
                })   
               ) {
                   console.log('info zone');
                   showModal();
                   keys.space.pressed = false;
                   break;
                }
        };
    }

    
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                    ...boundary,
                     position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                   }} 
                })   
               ) {
                   console.log('coliding');
                   moving = false;
                   break;
               }
        }
        if (moving) movables.forEach(movable => movable.position.y += 3);
    }
    else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                    ...boundary,
                     position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y
                   }} 
                })   
               ) {
                   console.log('coliding');
                   moving = false;
                   break;
               }
        }
        if (moving) movables.forEach(movable => movable.position.x += 3);
    }
    else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                    ...boundary,
                     position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                   }} 
                })   
               ) {
                   console.log('coliding');
                   moving = false;
                   break;
               }
        }
        if (moving) movables.forEach(movable => movable.position.y -= 3);
    }
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                   rectangle1: player,
                   rectangle2: {
                    ...boundary,
                     position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y
                   }} 
                })   
               ) {
                   console.log('coliding');
                   moving = false;
                   break;
               }
        }
        if (moving) movables.forEach(movable => movable.position.x -= 3);
    }

}


let lastKey = '';
window.addEventListener('keydown' , (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            lastKey = 'ArrowUp';
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            lastKey = 'ArrowDown';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight';
            break;
        case ' ':
            keys.space.pressed = true;
            break;
    }
})

window.addEventListener('keyup' , (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
    }
})

$('.close-btn').click( (e) => {
    let clickedModal = e.currentTarget.parentElement.parentElement.id;
    $(`#${clickedModal}`).hide();
});