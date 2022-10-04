

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
    let { minX, maxX, minY, maxY } = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
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
                if (x0< 0) {
                    x0 *= -1;
                }
                let pts = [
                    -x0, y - h / 2,
                    x0, y - h / 2,
                    x0, y + h / 2,
                    -x0, y + h / 2,
                ];
                sunRects.push(new SunRect(pts, x0 * 2, h, id, n, true));
            } else {
                let temp = x0;
                if (x0 > x1) {
                    x0 = x1;
                    x1 = temp;
                }
                let w = abs(x1-x0);
                let pts = [
                    x0, y - h / 2,
                    x0+w, y - h / 2,
                    x0+w, y + h / 2,
                    x0, y + h / 2
                ];
                sunRects.push(new SunRect(pts, w, h, id, n));
                // temp = x0;
                // if (x0 < x1) {
                //     x0 = x1;
                //     x1 = temp;
                // }
                pts = [
                    -x1, y - h / 2,
                    -x0, y - h / 2,
                    -x0, y + h / 2,
                    -x1, y + h / 2,
                ];
                sunRects.push(new SunRect(pts, w, h, id, n));
            }

            let xx = abs(x0);
            if (-xx < minX) {
                minX = -xx;
            }
            if (xx > maxX) {
                maxX = xx;
            }
            if (y - h / 2 < minY) {
                minY = y - h / 2;
            }
            if (y - h / 2 > maxY) {
                maxY = y - h / 2;
            }

            n++;
        }

        y -= spacing;
    }
    // console.log({ minX, maxX, minY, maxY });
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

function initSunLines() {
    for (let i = 0; i < quadsOff.length; i++) {
        let sunRectID = quadsOff[i];
        sunLines.push(new SunLine(i, sunRectID));
        // sunLines.push(lineMap);
        sunRects[sunRectID].lineMapNum = i;
    }
}

function initSunQuads() {
    for (let i = 0; i < quadsOff.length; i++) {
        let sunRectID = quadsOff[i];
        sunQuads.push(new SunQuad(i, sunRectID));
        sunRects[sunRectID].lineMapNum = i;
    }
}