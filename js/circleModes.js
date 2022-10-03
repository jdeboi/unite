function displayCalibrationMode(pg) {
    pg.fill('white');
    pg.stroke('white');

    displayCircle(pg, 0);
    displayCircle(pg, 1);
    displayCircle(pg, 2);
    displaySunEllipse(pg);
}


function displayPulseOut(pg, c0, c1) {
    let percent = pMapper.getOscillator(3, 0);

    let col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    setCurrentColors(col, col);
    displayCircle(pg, 0);

    percent = pMapper.getOscillator(3, PI / 4);
    col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    setCurrentColors(col, col);
    displayCircle(pg, 1);

    percent = pMapper.getOscillator(3, PI / 2);
    col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    setCurrentColors(col, col);
    displayCircle(pg, 2);

    // percent = pMapper.getOscillator(3, PI);
    // col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    setCurrentColors(col, col);
    displaySunEllipse(pg);
}



function cycleFullBars(pg, c0, c1, isUp) {
    for (let i = 0; i < 18; i++) {
        let percent = pMapper.getOscillator(3, i / 18 * 2 * PI);
        
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        setCurrentColors(col, col);
        if (isUp)
            displayFullBar(pg, 17 - i);
        else
            displayFullBar(pg, i);
    }
    displaySunEllipse(pg);
}

function gradientFullBars(pg, c0, c1, isUp) {
    for (let i = 0; i < 18; i++) {
        let percent = i / 17;
        
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        setCurrentColors(col, col);
        if (isUp)
            displayFullBar(pg, 18 - i);
        else
            displayFullBar(pg, i);
    }
    displaySunEllipse(pg);
}

function cycleCircles(pg, c0, c1) {
    let percent = (millis() / 1000) % 1;
    let percent2 = pMapper.getOscillator(3, 0);
    let col = lerpColor(c0, c1, percent2);
    pg.fill(col);
    pg.stroke(col);
    setCurrentColors(col, col);
    if (percent < .25) {
        displayCircle(pg, 2);
    }
    else if (percent < .5) {
        displayCircle(pg, 1);
    }
    else if (percent < .75) {
        displayCircle(pg, 0);
    }
    displaySunEllipse(pg);
}


function cycleCircle(pg, c0, c1) {
    for (let i = 0; i < 18; i++) {
        let percent = pMapper.getOscillator(3, i / 18 * 2 * PI);
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        setCurrentColors(col, col);
        if (isUp)
            displayFullBar(pg, 18 - i);
        else
            displayFullBar(pg, i);
    }
    displaySunEllipse(pg);
    displayBarLevel(pg, cir, level)
}

function displayWaterRipples(pg, c0, c1, al = 255) {
    let skies = [
        {c0:[0,141,168], c1:[255, 0, 139]},
        {c0:[169, 0, 38], c1:[255, 32, 0]},
        {c0:[190, 127, 0], c1:[0, 249, 255]},
        {c0:[235, 152, 0], c1:[255, 5, 0]},
        {c0:[ 0, 117, 128], c1:[0, 255, 147]},
    ];

    let sky = skies[floor(frameCount/(60*TIME_CHANGE_COLOR))%skies.length]
    let sky0 = color(sky.c0[0],sky.c0[1],sky.c0[2]);
    let sky1 = color(sky.c1[0],sky.c1[1],sky.c1[2]);
    cycleFullBars(pg, sky0, sky1, true);

    let sunC = color(255, 200, 0, al);
    pg.fill(sunC);
    pg.stroke(sunC);
    displaySunEllipse(pg);

    let water0 = color(0, 50, 255, al);
    let water1 = color(30, 0, 150, al);
    
    for (const s of sunRects) {
        
        // setCurrentColors(water0, water0);
        s.displayWater(pg, water0, water1);
    }
}

function expandBars1(pg, c0, c1) {
    let percent = pMapper.getOscillator(3);
    for (const s of sunRects) {
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        setCurrentColors(col, col);
        s.displayPortion(pg, percent);
    }

    displaySunEllipse(pg);
}

// function expandBars2(pg, c0, c1) {
//     let percent = pMapper.getOscillator(3);
//     for (let i = 0; i < 10; i++) {
//         let s = sunRects[i];
//         let col = lerpColor(c0, c1, percent);
//         pg.fill(col);
//         pg.stroke(col);
//         s.displayPortion(pg, percent);
//     }
//     drawSun(pg);
// }

function expandBars(pg, c0, c1, mode) {
    let i = 0;

    for (const s of sunRects) {
        let percent = pMapper.getOscillator(3, i++ / 50 * PI);
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        setCurrentColors(col, col);
        s.displayPortion(pg, percent, floor(frameCount/(60*8))%3);
    }

    displaySunEllipse(pg);
}


// function displayWaterSunset() {
//     pG.clear();
//     pG.push();
//     pG.translate(pG.width / 2, pG.height / 2);
//     pG.fill(0);
//     for (const s of sunRects) {
//         s.display(pG);
//     }
//     displaySunEllipse(pG);
//     pG.pop();

//     let w = IMG_WIDTH * (16 / 9);
//     sourceImage.image(vid, 0, 0, w, IMG_WIDTH);
//     (masked = sourceImage.get()).mask(pG);

//     quadMap.stroke(255);
//     quadMap.fill(255);
//     quadMap.push();
//     quadMap.translate(-quadMap.width / 2, -quadMap.height / 2);
//     quadMap.image(masked, 0, 0);
//     quadMap.pop();

//     // let c0 = color(245, 93, 66, 150);
//     // let c1 = color(255, 0, 255, 100);
//     let c0 = color(red(col0), green(col0), blue(col0), 150);
//     let c1 = color(red(col1), green(col1), blue(col1), 100);
//     // displayPulseOut(quadMap,c0, c1);
//     cycleFullBars(quadMap, c0, c1, false);
//     // displayWaterRipples(quadMap, c0, c1, 50);

//     // quadMap.stroke(c1);
//     // quadMap.fill(c1);
//     // quadMap.ellipse(0, 0, 90 * factor);
// }


function displaySunsetVid() {
    pG.clear();
    pG.push();
    pG.translate(pG.width / 2, pG.height / 2);
    pG.fill(0);
    for (const s of sunRects) {
        s.display(pG);
    }
    displaySunEllipse(pG);
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

    // let c0 = color(255, 0, 255, 50);
    // let c1 = color(155, 50, 155, 0);
    //  let c0 = color(0, 0, 255, 100);
    // let c1 = color(100, 0, 255, 50);

    let c0 = getAlphaColor(col0, 0);
    let c1 = getAlphaColor(col1, 0);

    // green + red
    // let c0 = color(0, 252, 142, 100);
    // let c1 = color(132, 0, 255, 50);

    cycleFullBars(quadMap, c0, c1, false);

    quadMap.stroke(c1);
    quadMap.fill(c1);
    displaySunEllipse(quadMap);

}

function getAlphaColor(col, alpha) {
    return color(red(col), green(col), blue(col), alpha);
}
