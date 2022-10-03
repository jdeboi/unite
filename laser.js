/*
* p5.mapper
* projection mapping with lines for staircase
* 
* Jenna deBoisblanc
* jdeboi.com
* 
*/

// 602.10 = width in pixels
// 90*1.3 = 117 width in pixels of sun (?)
// 43.54 = inches of wood

// 602.10x = 43.54 in
// x = 43.54 / 602.10 = 0.0723
// 117 x = 8.46 in
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

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);
}


function draw() {
    translate(width/2, height/2);
    initSunRectsSVG();
    ellipse(0, 0, 90 * factor);
    noLoop();
    save();
}


function initSunRectsSVG() {
    let thickness = 15 * factor;
    let spacing = thickness * 2;
    initSunRectSVG(0, 220 * factor, 160 * factor, spacing, 4 * factor, (n) => n * 1.25 * factor + 4 * factor);
    initSunRectSVG(1, 170 * factor, 100 * factor, spacing, 4 * factor, (n) => n * 1.25 * factor + 4 * factor);
    initSunRectSVG(2, 110 * factor, 70 * factor, spacing, -4 * factor, (n) => n * 1.25 * factor + 4 * factor);
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

function initSunRectSVG(id,
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
                // sunRects.push(new SunRect(-x0, y - h / 2, x0 * 2, h, id, n, true));
                rect(-x0, y - h / 2, x0 * 2, h);
            } else {
                // sunRects.push(new SunRect(x0, y - h / 2, -x0 + x1, h, id, n));
                // sunRects.push(new SunRect(-x0, y - h / 2, x0 - x1, h, id, n));
                rect(x0, y - h / 2, -x0 + x1, h);
                rect(-x0, y - h / 2, x0 - x1, h);
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

