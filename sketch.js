/*
* p5.mapper
* projection mapping with lines for staircase
* 
* Jenna deBoisblanc
* jdeboi.com
* 
*/
let mode = 2;
const WATER_RIPPLES = 0;
const PULSE_OUT = 1;
const CYCLE_BARS_DOWN = 2;
const CYCLE_BARS_UP = 3;
const EXPAND_BARS = 4;
const NUM_MODES = 5;

let col0, col1;

// projection mapping objects
const factor = 1.3;
const IMG_WIDTH = 700;
let myFont;
let pMapper;
let quadMap;
let pG, sourceImage;
let waterImg;
// let cloudsVid;
let vid;
let isVideoPlaying = false;
const sunRects = [];

function preload() {
    // waterImg = loadImage("assets/water.jpeg");
    myFont = loadFont('assets/Roboto.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);



    vid = createVideo(['assets/venice.mp4']);
    vid.hide();



    pMapper = createProjectionMapper(this);
    quadMap = pMapper.createQuadMap(IMG_WIDTH, IMG_WIDTH);
    quadMap.textFont(myFont);
    pMapper.load("maps/map.json");


    pG = createGraphics(IMG_WIDTH, IMG_WIDTH);
    sourceImage = createGraphics(IMG_WIDTH, IMG_WIDTH);

    initSunRects();
    setRandomColors();
    console.log(col0, col1);
    // initPerfectRects();
}


function draw() {
    background(0);

    quadMap.clear();
    quadMap.background(0);
    quadMap.push();

    // displaySun();

    // cycleCircles(quadMap, col0, col1)
    displayMode();

    // displayWaterRipples(quadMap, col0, col1);
   

    changeMode(4);



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
        case EXPAND_BARS:
            expandBars(quadMap, col0, col1, 0);
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


function displayWaterSunset() {
    pG.clear();
    pG.push();
    pG.translate(pG.width / 2, pG.height / 2);
    pG.fill(0);
    for (const s of sunRects) {
        s.display(pG);
    }
    pG.ellipse(0, 0, 90 * factor);
    pG.pop();

    let w = IMG_WIDTH * (16 / 9);
    sourceImage.image(vid, 0, 0, w, IMG_WIDTH);
    (masked = sourceImage.get()).mask(pG);

    quadMap.stroke(255);
    quadMap.fill(255);
    quadMap.push();
    quadMap.translate(-quadMap.width / 2, -quadMap.height / 2);
    quadMap.image(masked, 0, 0);
    quadMap.pop();

    let c0 = color(245, 93, 66, 150);
    let c1 = color(255, 0, 255, 100);
    displayPulseAround(0, 0, c0, c1);
    displayPulseAround(1, 1, c0, c1);
    displayPulseAround(2, 2, c0, c1);

    // quadMap.stroke(c1);
    // quadMap.fill(c1);
    // quadMap.ellipse(0, 0, 90 * factor);
}


function displaySun() {
    pG.clear();
    pG.push();
    pG.translate(pG.width / 2, pG.height / 2);
    pG.fill(0);
    for (const s of sunRects) {
        s.display(pG);
    }
    pG.ellipse(0, 0, 90 * factor);
    pG.pop();

    let w = IMG_WIDTH * (16 / 9);
    let dx = IMG_WIDTH / 2 - w / 2 + 20 - map(vid.time(), 0, vid.duration(), 0, 17);
    let dy = -7 - map(vid.time(), 0, vid.duration(), 0, 17);
    sourceImage.image(vid, dx, dy, w, IMG_WIDTH);
    (masked = sourceImage.get()).mask(pG);

    quadMap.stroke(255);
    quadMap.fill(255);
    quadMap.push();
    quadMap.translate(-quadMap.width / 2, -quadMap.height / 2);
    quadMap.image(masked, 0, 0);
    quadMap.pop();

    // let c0 = color(255, 0, 255, 255);
    // let c1 = color(255, 150, 255, 50);
    // displayPulseAround(0, 0, c0, c1);
    // displayPulseAround(1, 1, c0, c1);
    // displayPulseAround(2, 2, c0, c1);

    // quadMap.stroke(c1);
    // quadMap.fill(c1);
    // quadMap.ellipse(0, 0, 90 * factor);




}


function initSunRects() {
    let thickness = 15 * factor;
    let spacing = thickness * 2;
    initSunRect(0, 220 * factor, 160 * factor, spacing, 4 * factor, (n) => n * 1.25 * factor + 4 * factor);
    initSunRect(1, 170 * factor, 100 * factor, spacing, 4 * factor, (n) => n * 1.25 * factor + 4 * factor);
    initSunRect(2, 110 * factor, 70 * factor, spacing, -4 * factor, (n) => n * 1.25 * factor + 4 * factor);
}

function initPerfectRects() {
    let thickness = 15 * factor;
    let spacing = thickness * 2;

    fill(0);
    stroke(0);
    let start = 4 * factor;
    let radBig = ((start * 2) + 14 * spacing) / 2;
    let radMed = ((start * 2) + 11 * spacing) / 2;
    let radSmall = ((start * 2) + 8 * spacing) / 2;
    initSunRect(0, radBig, radBig - 60 * factor, spacing, start, (n) => thickness * .6);
    initSunRect(1, radMed, radMed - 60 * factor, spacing, start, (n) => thickness * .6);
    initSunRect(2, radSmall, radSmall - 60 * factor, spacing, start, (n) => thickness * .6);
}

function initSunRect(id,
    outerRad,
    innerRad,
    spacing,
    offset,
    getThickness,
    dx = 0) {
    let y = outerRad - offset;
    let n = 0;
    while (y > -outerRad) {
        let h = getThickness(n);
        let ang0 = asin(y / outerRad);
        let x0 = -outerRad * cos(ang0) - dx;
        let ang1 = asin(y / innerRad);
        let x1 = -innerRad * cos(ang1);

        // circle lines all the way across
        if (!isNaN(x0)) {
            if (abs(y) >= innerRad) {
                sunRects.push(new SunRect(-x0, y - h / 2, x0 * 2, h, id, n, true));
            } else {
                sunRects.push(new SunRect(x0, y - h / 2, -x0 + x1, h, id, n));
                sunRects.push(new SunRect(-x0, y - h / 2, x0 - x1, h, id, n));
            }
            n++;
        }
        y -= spacing;
    }
}


function circleLinesSp(
    pg,
    outerRad,
    innerRad,
    spacing,
    offset,
    getThickness,
    dx = 0
) {
    pg.push();
    let y = outerRad - offset;
    let n = 0;
    while (y > -outerRad) {
        let h = getThickness(n++);
        let ang0 = asin(y / outerRad);
        let x0 = -outerRad * cos(ang0) - dx;
        let ang1 = asin(y / innerRad);
        let x1 = -innerRad * cos(ang1);

        // circle lines all the way across
        if (abs(y) >= innerRad) {
            pg.rect(-x0, y - h / 2, x0 * 2, h);
        } else {
            pg.rect(x0, y - h / 2, -x0 + x1, h);
            pg.rect(-x0, y - h / 2, x0 - x1, h);
        }
        y -= spacing;
    }
    pg.pop();
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
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function setRandomColors() {
    colorMode(HSB, 100);
    col0 = color(random(100), 100, random(100));
    col1 = color(random(100), 100, 100);
    colorMode(RGB, 255);
}