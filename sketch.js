/*
* p5.mapper
* projection mapping with lines for staircase
* 
* Jenna deBoisblanc
* jdeboi.com
* 
*/

// projection mapping objects
const factor = 1.3;
let myFont;
let pMapper;
let quadMap;
let pg, sourceImage;
let waterImg;
let cloudsVid;
const sunRects = [];

function preload() {
    waterImg = loadImage("assets/water.jpeg");
    myFont = loadFont('assets/Roboto.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);



    cloudsVid = createVideo(['assets/clouds3d.mp4']);
    cloudsVid.hide();

    const w = 700;

    pMapper = createProjectionMapper(this);
    quadMap = pMapper.createQuadMap(w, w);
    quadMap.textFont(myFont);
    pMapper.load("maps/map.json");


    pg = createGraphics(w, w);
    sourceImage = createGraphics(w, w);

    initSunRects();
    // initPerfectRects();
}

function draw() {
    background(0);

    quadMap.clear();
    quadMap.background(0);
    quadMap.push();

    // displayWaterSunset();
    displayPulseOut(color(0, 255, 255), color(100, 255, 0));
    // displayPulseAround(0, 0, color(255, 0, 255), color(255, 255, 0))
    // displayPulseAround(1, 1, color(255, 0, 255), color(255, 255, 0))
    // displayPulseAround(2, 2, color(255, 0, 255), color(255, 255, 0))

    quadMap.ellipse(0, 0, 90 * factor);

    quadMap.pop();
}

function displayPulseOut(c0, c1) {
    let percent = pMapper.getOscillator(3, 0);

    quadMap.fill(lerpColor(c0, c1, percent));
    quadMap.noStroke();
    displayCircle(0);

    percent = pMapper.getOscillator(3, PI / 4);
    quadMap.fill(lerpColor(c0, c1, percent));
    displayCircle(1);

    percent = pMapper.getOscillator(3, PI / 2);
    quadMap.fill(lerpColor(c0, c1, percent));
    displayCircle(2);

    // percent = pMapper.getOscillator(3, PI);
    quadMap.fill(lerpColor(c0, c1, percent));
    quadMap.ellipse(0, 0, 90 * factor);
}

function displayPulseAround(cir, offset, c0, c1) {
    for (const s of sunRects) {
        let percent = pMapper.getOscillator(3, offset + s.num * .5);
        quadMap.fill(lerpColor(c0, c1, percent));
        quadMap.noStroke();
        s.displayCircle(quadMap, cir);
    }
}

function displayCircle(cir) {
    // quadMap.translate(-quadMap.width / 2, -quadMap.height / 2);
    for (const s of sunRects) {
        s.displayCircle(quadMap, cir);
    }
}

function displayWaterSunset() {
    pg.clear();
    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);
    pg.fill(0);
    for (const s of sunRects) {
        s.display(pg);
    }
    pg.ellipse(0, 0, 90 * factor);
    pg.pop();

    sourceImage.image(cloudsVid, 0, 0);
    (masked = sourceImage.get()).mask(pg);

    quadMap.stroke(255);
    quadMap.fill(255);
    quadMap.push();
    quadMap.translate(-quadMap.width / 2, -quadMap.height / 2);
    quadMap.image(masked, 0, 0);
    quadMap.pop();
}


function initSunRects() {
    let thickness = 15 * factor;
    let spacing = thickness * 2;
    initSunRect(0, 220 * factor, 160 * factor, spacing, 4 * factor, (n) => n * 1.25 * factor + 4 * factor);
    initSunRect(1, 170 * factor, 100 * factor, spacing, 4 * factor, (n) => n * 1.25 * factor + 4 * factor);
    initSunRect(2, 110 * factor, 70 * factor, spacing, -4 * factor, (n) => n * 1.25 * factor + 4 * factor);
}

function initPerfectRects() {
    let thickness = 15*factor;
    let spacing = thickness * 2;

    fill(0);
    stroke(0);
    let start = 4*factor;
    let radBig = ((start * 2) + 14 * spacing) / 2;
    let radMed = ((start * 2) + 11 * spacing) / 2;
    let radSmall = ((start * 2) + 8 * spacing) / 2;
    initSunRect(0, radBig, radBig - 60*factor, spacing, start, (n) => thickness * .6);
    initSunRect(1, radMed, radMed - 60*factor, spacing, start, (n) => thickness * .6);
    initSunRect(2, radSmall, radSmall - 60*factor, spacing, start, (n) => thickness * .6);
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
        let h = getThickness(n++);
        let ang0 = asin(y / outerRad);
        let x0 = -outerRad * cos(ang0) - dx;
        let ang1 = asin(y / innerRad);
        let x1 = -innerRad * cos(ang1);

        // circle lines all the way across
        if (abs(y) >= innerRad) {
            sunRects.push(new SunRect(-x0, y - h / 2, x0 * 2, h, id, n));
        } else {
            sunRects.push(new SunRect(x0, y - h / 2, -x0 + x1, h, id, n));
            sunRects.push(new SunRect(-x0, y - h / 2, x0 - x1, h, id, n));
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
    cloudsVid.loop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

