class SunRect {

    constructor(x, y, w, h, cir, num, isOne = false) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cir = cir;
        this.num = num;
        this.isOne = isOne;
    }

    display(pg) {
        pg.push();
        pg.translate(0, 0, .4 * this.cir);
        pg.rect(this.x, this.y, this.w, this.h);
        pg.pop();
        // this.displayID(pg);
    }

    displayPortion(pg, percent, mode) {
        let w = percent * this.w;
        pg.push();
        pg.translate(0, 0, .4 * this.cir);

        if (mode == 0) {
            // center all
            percent = (1 - percent);
            w = percent * this.w;
            pg.rect(this.x + this.w / 2 - w / 2, this.y, w, this.h);
        }
        else if (mode == 1) {
            if (this.isOne) {
                percent = (1 - percent);
                w = percent * this.w;
                pg.rect(this.x + this.w / 2 - w / 2, this.y, w, this.h);
            }
            else {
                pg.rect(this.x + this.w, this.y, -this.w + w, this.h);
            }
        }
        else {
            if (this.isOne) {
                pg.rect(this.x + this.w / 2 - w / 2, this.y, w, this.h);
            }
            else {
                pg.rect(this.x, this.y, w, this.h);
            }
        }
        pg.pop();

    }

    displayPortion2(pg, percent) {
        let w = percent * this.w;
        pg.push();
        pg.translate(0, 0, .4 * this.cir);
        if (this.isOne) {
            pg.rect(this.x + this.w / 2 - w / 2, this.y, w, this.h);
        }
        else {
            pg.rect(this.x, this.y, w, this.h);
        }
        pg.pop();

    }


    displayWater(pg, c0, c1) {
        let maxLev = .5 * PI;
        let levels = [
            [0, 2, 0],
            [1 / maxLev, 1, 2],
            [2 / maxLev, 0, 3],
            [2.4 / maxLev, 1, 1],
            [3 / maxLev, 0, 2],
            [3.4 / maxLev, 1, 0],
            [4 / maxLev, 0, 1],
            [5 / maxLev, 0, 0],
        ]
        for (const l of levels) {
            // let start = l[0];
            // let a = 0;
            // let dLev = 3 / maxLev;
            // if (percent < start + dLev / 2) {
            //     a = map(percent, start, start + dLev / 2, 0, 155);
            // }
            // else {
            //     a = map(percent, start + dLev / 2, start + dLev, 155, 0);
            // }
            // a = constrain(a, 0, 255);
            // TODO - different version of p5?? floor(a/255*30)
            // let col = color(255, floor(a)); 
            // let col = color(l[1]*60, 0, 255);

            let per = .5 + .5 * sin(millis() / 500 - l[0]);
            let col = lerpColor(c0, c1, per);
            pg.fill(col);
            pg.stroke(0, 0, col);
            displayBarLevel(pg, l[1], l[2]);
        }

    }

    displayID(pg) {
        pg.fill(255);
        pg.noStroke();
        pg.text(this.cir + "," + this.num, this.x, this.y);
    }
}