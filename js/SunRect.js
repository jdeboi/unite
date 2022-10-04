
let id = 0;
class SunRect {

    // constructor(x, y, w, h, cir, num, isOne = false) {
    constructor(pts, w, h, cir, num, isOne = false) {
        this.id = id++;
        let fac = 1;
        this.x = pts[0];
        this.y = pts[1]; //y+(1-fac)*h/2;
        this.pts = pts;
        this.w = w;
        this.h = h * fac;

        this.cir = cir;
        this.num = num;
        this.isOne = isOne;

        this.fillCol = color(0);
        this.strokeCol = color(0);

        this.lineMapNum = -1;
        this.quadMapNum = -1;
        
        this.alph = 255;
        // if (cir == 0 && num == 0) {
        //     console.log("bot", y+h)
        // }
        // else if (cir == 0 && num == 14) {
        //     console.log("top", y)
        // }
        // else if (cir == 0 && num == 7) {
        //     console.log("left", x, w);
        // }

        // if (this.id == 25) {
        //     console.log(this.x, this.y, this.w, this.h);
            // -164.73008225579207 -429.5 329.46016451158414 43
        // }
    }


    setColor(fc = currentFill, sc = currentStroke, al = 255) {
        this.fillCol = fc;
        this.strokeCol = sc;
        this.alph = al;
    }

    getColors() {
        return [this.fillCol, this.strokeCol];
    }

    displayShape(pg) {
        pg.beginShape();
        for (let i = 0; i < this.pts.length; i += 2) {
            pg.vertex(this.pts[i], this.pts[i + 1]);
        }
        pg.endShape();
    }

    display(pg) {
        if (!isCalibratingMapper() && this.lineMapNum > -1)
            return;

        // if ((this.cir == 0 &&this.num > 11) || (this.cir == 1 && this.num > 9)) {
        pg.push();
        pg.translate(0, 0, .4 * this.cir);

        // pg.rect(this.x, this.y, this.w, this.h);
        this.displayShape(pg);

        pg.pop();
        // }
        // this.displayID(pg);
    }

    displayOverUnderLine(pg) {
        pg.stroke(0);
        pg.strokeWeight(4);
        // underline
        pg.line(this.x, this.y + this.h, this.x + this.w, this.y + this.h)
        // overline
        if (this.cir == 0) {
            pg.line(this.x, this.y, this.x + this.w, this.y)
        }
    }

    displayPortion(pg, percent, mode) {
        if (this.lineMapNum > -1)
            return;

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
        if (this.lineMapNum > -1)
            return;

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


    displayWater(pg, c0, c1, al) {
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
            pg.stroke(col);
            
            setCurrentColors(col, col);

            if (this.lineMapNum > -1)
                return;
            displayBarLevel(pg, l[1], l[2]);
        }

    }

    displayID(pg) {
        pg.fill(255);
        pg.noStroke();
        // pg.text(this.cir + "," + this.num, this.x, this.y);
        pg.text(this.id, this.x, this.y);
    }
}