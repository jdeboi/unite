/*
* p5.mapper
* projection mapping with lines for staircase
* 
* Jenna deBoisblanc
* jdeboi.com
* 
*/

const quadsOff = [25, 44, 6, 7, 28, 4, 5, 27, 2, 3, 26, 1, 0];
// const quadsOff = [];

const factor = 2;
const TIME_CHANGE = 4;//16;
const TIME_CHANGE_COLOR = TIME_CHANGE/2;
// TODO - BUG IN LIBRARY; should be 20 cells, not 19... ????
const IMG_WIDTH = 286 * 2 * (20 / 19) * factor / 1.3;
const IMG_HEIGHT = 563 * (20 / 19) * factor / 1.3;
let currentFill, currentStroke;

////////////////////////
// MODES
const WATER_RIPPLES = 0;
const PULSE_OUT = 1;
const CYCLE_BARS_DOWN = 2;
const CYCLE_BARS_UP = 3;
const NUM_MODES = 4;
const EXPAND_BARS = 44;
const SUNSET_VID = 54; // make sure to click
let mode = 3;

let col0, col1;
////////////////////////


// projection mapping objects
let myFont;
let pMapper;
let quadMap;
let pG, sourceImage;
let waterImg;
// let cloudsVid;
let vid;
let isVideoPlaying = false;
const sunRects = [];
const sunLines = [];
const sunQuads = [];
let ellipseSunQuad;
let sunColor;

function preload() {
    // waterImg = loadImage("assets/water.jpeg");
    myFont = loadFont('assets/Roboto.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    vid = createVideo(['assets/lake.mp4']);
    vid.hide();


    pMapper = createProjectionMapper(this);
    quadMap = pMapper.createQuadMap(IMG_WIDTH, IMG_HEIGHT);
    quadMap.textFont(myFont);

    ellipseSunQuad = pMapper.createQuadMap(90*factor, 90*factor);
    // pMapper.load("maps/map.json");


    pG = createGraphics(IMG_WIDTH, IMG_HEIGHT);
    sourceImage = createGraphics(IMG_WIDTH, IMG_HEIGHT);

    currentFill = color(0);
    currentStroke = color(0);
    sunColor = color(0);

    setRandomColors();

    initSunRects(2);
    // initSunLines();
    initSunQuads();
    // initPerfectRects();
}


function draw() {
    background(0);

    quadMap.clear();
    quadMap.background(0);

    quadMap.translate(-quadMap.width / 19 / 2, -quadMap.height / 19 / 2); // TODO ----> BUG IN LIBRARY

    quadMap.push();


    if (isCalibratingMapper()) {
        displayCalibrationMode(quadMap);
    }
    else {
        // quadMap.fill(0, 255, 255, 30);
        // quadMap.ellipse(0, 0, IMG_WIDTH, IMG_HEIGHT);

        displayMode();
        changeMode(TIME_CHANGE);
        changeColorMode(TIME_CHANGE_COLOR);
    }


    quadMap.pop();

    // displaySunLines();
    displayEllipseSunQuad();
    displaySunQuads();

    // hideHalf();

}

function displaySunLines() {
    for (let i = 0; i < sunLines.length; i++) {
        // sunLines[i].displayCalibrating();
        sunLines[i].display();
    }
}

function displaySunQuads() {
    for (let i = 0; i < sunQuads.length; i++) {
        // sunQuads[i].displayCalibrating();
        sunQuads[i].display();
    }
}

function hideHalf() {
    quadMap.push();
    quadMap.translate(0, 0, 1);
    quadMap.fill(0);
    quadMap.rect(0, -height / 2, width / 2, height);

    // crosshairs
    // quadMap.stroke('red');
    // quadMap.line(-width/2, 0, width/2, 0);
    // quadMap.line(0, -height/2, 0, height);

    quadMap.pop();
}
function displayMode() {
    switch (mode) {
        case WATER_RIPPLES:
            displayWaterRipples(quadMap, col0, col1);
            break;
        case PULSE_OUT:
            displayPulseOut(quadMap, col0, col1);
            break;
        case CYCLE_BARS_DOWN:
            cycleFullBars(quadMap, col0, col1, false);
            break;
        case CYCLE_BARS_UP:
            cycleFullBars(quadMap, col0, col1, true);
            break;
        // case EXPAND_BARS:
        //     expandBars(quadMap, col0, col1, 0);
        //     break;
        case SUNSET_VID:
            displaySunsetVid();
            break;
        default:
            cycleFullBars(quadMap, col0, col1, true);
            break;
    }
}

function changeMode(numSeconds) {
    if (frameCount % (numSeconds * 60) == 0) {
        setRandomColors();
        mode++;
        mode %= NUM_MODES;
    }
}

function changeColorMode(numSeconds) {
    if (frameCount % (numSeconds * 60) == 0) {
        setRandomColors();
    }
}

function displaySunEllipse(pg) {
    sunColor = currentFill;
    // let w = 90 * factor;
    // pg.ellipse(0, 0, w, w, 40);
}
function displayEllipseSunQuad() {
    ellipseSunQuad.clear();
    ellipseSunQuad.push();
    ellipseSunQuad.background(0);
    // ellipseSunQuad.translate(-ellipseSunQuad.width/2, -ellipseSunQuad/height/2);
    ellipseSunQuad.fill(sunColor);
    ellipseSunQuad.stroke(sunColor);
    ellipseSunQuad.ellipse(0, 0, ellipseSunQuad.width*.9, ellipseSunQuad.width*.9, 40);
    ellipseSunQuad.pop();
}

function keyPressed() {
    switch (key) {
        case 'c':
            pMapper.toggleCalibration();
            break;
        case 'f':
            let fs = fullscreen();
            document.getElementById("header").style.display = "none";
            fullscreen(!fs);
            break;
        case 'l':
            pMapper.load("maps/map.json");
            break;

        case 's':
            pMapper.save("map.json");
            break;
    }
}


function mousePressed() {
    isVideoPlaying = true;
    vid.speed(0.7);
    vid.loop();

    setRandomColors();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function setRandomColors() {
    colorMode(HSB, 100);
    col0 = color(random(100), 100, random(100));
    col1 = color(random(100), 100, 100);
    colorMode(RGB, 255);

    // console.log(col0, col1)
}

function setCurrentColors(fc, sc) {
    currentFill = fc;
    currentStroke = sc;
}