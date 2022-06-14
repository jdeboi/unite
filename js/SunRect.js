class SunRect {

    constructor(x, y, w, h, cir, num) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cir = cir;
        this.num = num;
    }

    display(pg) {
        pg.rect(this.x, this.y, this.w, this.h);
    }

    displayCircle(pg, cir) {
        if (cir == this.cir) {
            pg.rect(this.x, this.y, this.w, this.h);

            // pg.fill(255);
            // pg.noStroke();
            // pg.text(this.num, this.x, this.y);
        }
    }

    display

}