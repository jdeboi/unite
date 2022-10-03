class SunLine {

    constructor(id, sunRectID) {
        this.id = id;
        this.sunRectID = sunRectID;

        // const factor = 1.2;
        // this.lineMap = lineMap;
        // this.strokeWeight = factor * strokeW;
        // this.lineMap.lineW = factor * strokeW;;
        // const { x, y, w, h } = sunRects[sunRectID];
        // let lineMap = pMapper.createLineMap(x, y, x + w, y);

        const { x, y, w, h } = sunRects[sunRectID];
        // TODO - some issue here with width being negative...
        this.quadMap = pMapper.createQuadMap(w, abs(h));
        this.quadMap.y = y;
        this.quadMap.x = x;
    }

    getFill() {
        return sunRects[this.sunRectID].getColors()[0];
    }

    // setColor() {
    //     let col = this.getFill();
    //     this.quadMap.fill(c);
    //     this.quadMap
    // }

    display() {
        if (mode == SUNSET_VID) {
            this.displaySunsetVid();
        }
        else {
            // this.lineMap.display(this.getFill());
            this.quadMap.clear();
            this.quadMap.background(this.getFill());
        }

    }

    displayCalibrating() {
        colorMode(HSB, 100);
        // lerpColor(c1, c2, map(this.id, 0, sunLines.length-1, 0, 1));
        let c3 = color(map(this.id, 0, sunLines.length - 1, 0, 100), 100, 100);
        colorMode(RGB, 255);
        this.quadMap.clear();
        this.quadMap.background(c3);
    }

    displayID() {
        fill(255);
        text(this.id, this.quadMap.x, this.quadMap.y);
    }

    displaySunsetVid() {
        const { x, y } = sunRects[this.sunRectID];
        let w = IMG_WIDTH * (16 / 9);
        let dx = IMG_WIDTH / 2 - w / 2 + 20 - map(vid.time(), 0, vid.duration(), 0, 17);
        let dy = -7 - map(vid.time(), 0, vid.duration(), 0, 17);

        this.quadMap.clear();
        this.quadMap.push();
        this.quadMap.translate(-this.quadMap.width / 2, -this.quadMap.height / 2);
        let yy = -y - IMG_HEIGHT/2 + dy;
        let xx = -x+dx - IMG_WIDTH/2;
        this.quadMap.image(vid, xx, yy, w, IMG_WIDTH);

        this.quadMap.fill(this.getFill())
        this.quadMap.rect(0, 0, this.quadMap.width, this.quadMap.height);

        this.quadMap.pop();
        
        
    }
}

