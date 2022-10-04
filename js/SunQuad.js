class SunQuad {

    constructor(id, sunRectID) {
        this.id = id;
        this.sunRectID = sunRectID;

        const { x, y, w, h } = sunRects[sunRectID];
        // TODO - some issue here with width being negative...
        this.quadMap = pMapper.createMaskMap(4);
        this.quadMap.setPoints([{x, y},{x: x+w, y}, {x: x+w, y: y+h}, {x, y: y+h}])
        // this.quadMap.y = y;
        // this.quadMap.x = x;
    }

    getFill() {
        return sunRects[this.sunRectID].getColors()[0];
    }

    display() {
        if (mode == SUNSET_VID) {
            // this.displaySunsetVid();
        }
        else {
            this.quadMap.display(this.getFill());
        }

    }

    displayCalibrating() {
        colorMode(HSB, 100);
        // lerpColor(c1, c2, map(this.id, 0, sunLines.length-1, 0, 1));
        let c3 = color(map(this.id, 0, sunLines.length - 1, 0, 100), 100, 100);
        colorMode(RGB, 255);
        this.quadMap.display(c3);
    }

    displayID() {
        fill(255);
        text(this.id, this.quadMap.x, this.quadMap.y);
    }

    displaySunsetVid() {
      
    }
}

