
////////////////////////////////////////////////////////////////////////////
// CIRCLE UTILITIES
////////////////////////////////////////////////////////////////////////////

const CIR_LENS = [26, 18, 12];

function displayBar(pg, cir, num) {
    if (num < 0 || cir < 0)
        return;
    if (cir < CIR_LENS.length && num < CIR_LENS[cir]) {
        let n = 0;
        for (let i = 0; i < cir; i++) {
            n += CIR_LENS[i];
        }
        sunRects[n + num].setColor(currentFill, currentStroke);
        sunRects[n + num].display(pg);
    }

}

function displayBarLevel(pg, cir, level) {
    if (cir < 0 || level < 0)
        return;
    if (cir == 2) {
        if (level == 0) {
            displayBar(pg, cir, 0);
        }
        else if (level > 0) {
            displayBar(pg, cir, (level - 1) * 2 + 1);
            displayBar(pg, cir, level * 2);
        }
    }
    else if (cir == 1) {
        if (level < 3) {
            displayBar(pg, cir, level);
        }
        else if (level < 9) {
            displayBar(pg, cir, (level - 1) * 2 - 1);
            displayBar(pg, cir, (level - 1) * 2);
        }
        else {
            displayBar(pg, cir, 15 + (level - 9));
        }
    }
    else if (cir == 0) {
        if (level < 2) {
            displayBar(pg, cir, level);
        }
        else if (level < 13) {
            displayBar(pg, cir, (level - 1) * 2);
            displayBar(pg, cir, (level - 1) * 2 + 1);
        }
        else {
            displayBar(pg, cir, 24 + (level - 13));
        }
    }
}

function displayFullBar(pg, barLev) {
    displayBarLevel(pg, 0, barLev);
    displayBarLevel(pg, 1, barLev - 2);
    displayBarLevel(pg, 2, barLev - 5);
}

function displayCircle(pg, cir) {
    for (let i = 0; i < CIR_LENS[cir]; i++) {
        displayBar(pg, cir, i);
    }
}

////////////////////////////////////////////////////////////////////////////
