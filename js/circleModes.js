
function displayPulseOut(pg, c0, c1) {
    let percent = pMapper.getOscillator(3, 0);

    let col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    displayCircle(pg, 0);

    percent = pMapper.getOscillator(3, PI / 4);
    col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    displayCircle(pg, 1);

    percent = pMapper.getOscillator(3, PI / 2);
    col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    displayCircle(pg, 2);

    // percent = pMapper.getOscillator(3, PI);
    // col = lerpColor(c0, c1, percent);
    pg.fill(col);
    pg.stroke(col);
    pg.ellipse(0, 0, 90 * factor);
}



function cycleFullBars(pg, c0, c1, isUp) {
    for (let i = 0; i < 18; i++) {
        let percent = pMapper.getOscillator(3, i / 18 * 2 * PI);
        
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        if (isUp)
            displayFullBar(pg, 18 - i);
        else
            displayFullBar(pg, i);
    }
    pg.ellipse(0, 0, 90 * factor);
}


function cycleCircles(pg, c0, c1) {
    let percent = (millis() / 1000) % 1;
    let percent2 = pMapper.getOscillator(3, 0);
    let col = lerpColor(c0, c1, percent2);
    pg.fill(col);
    pg.stroke(col);
    if (percent < .25) {
        displayCircle(pg, 2);
    }
    else if (percent < .5) {
        displayCircle(pg, 1);
    }
    else if (percent < .75) {
        displayCircle(pg, 0);
    }
    pg.ellipse(0, 0, 90 * factor);
}


function cycleCircle(pg, c0, c1) {
    for (let i = 0; i < 18; i++) {
        let percent = pMapper.getOscillator(3, i / 18 * 2 * PI);
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        if (isUp)
            displayFullBar(pg, 18 - i);
        else
            displayFullBar(pg, i);
    }
    pg.ellipse(0, 0, 90 * factor);
    displayBarLevel(pg, cir, level)
}

function displayWaterRipples(pg, c0, c1) {
    // let skies = [
    //     {c0:[0,141,168], c1:[255, 0, 139]},
    //     {c0:[169, 0, 38], c1:[255, 32, 0]},
    //     {c0:[190, 127, 0], c1:[0, 249, 255]},
    //     {c0:[235, 152, 0], c1:[255, 5, 0]},
    //     {c0:[ 0, 117, 128], c1:[0, 255, 147]},
    // ];

    // let sky = skies[floor(frameCount/(60*8))%skies.length]
    // let sky0 = color(sky.c0[0],sky.c0[1],sky.c0[2]);
    // let sky1 = color(sky.c1[0],sky.c1[1],sky.c1[2]);
    // cycleFullBars(pg, sky0, sky1, true);

    cycleFullBars(pg, c0, c1, false);
    // cycleCircles(pg, c0, c1)
    // displayPulseOut(pg, c0, c1)

    let sunC = color(255, 200, 0);
    pg.fill(sunC);
    pg.stroke(sunC);
    pg.ellipse(0, 0, 90 * factor);

    let water0 = color(0, 0, 255);
    let water1 = color(30, 0, 150);
    for (const s of sunRects) {
        s.displayWater(pg, water0, water1);
    }
}

function expandBars1(pg, c0, c1) {
    let percent = pMapper.getOscillator(3);
    for (const s of sunRects) {
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        s.displayPortion(pg, percent);
    }

    pg.ellipse(0, 0, 90 * factor);
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
//     pg.ellipse(0, 0, 90 * factor);
// }

function expandBars(pg, c0, c1, mode) {
    let i = 0;

    for (const s of sunRects) {
        let percent = pMapper.getOscillator(3, i++ / 50 * PI);
        let col = lerpColor(c0, c1, percent);
        pg.fill(col);
        pg.stroke(col);
        s.displayPortion(pg, percent, floor(frameCount/(60*8))%3);
    }

    pg.ellipse(0, 0, 90 * factor);
}