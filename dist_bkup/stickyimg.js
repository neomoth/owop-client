function stickyimg(path,w,h) {
    if (OWOP.spawnbanner) {
        return;
    }
    OWOP.spawnbanner = true;

    var elem = document.createElement('div');
    var shown = false;
    var ismag = false;
    elem.style.position = 'fixed';
    elem.style.transformOrigin = 'left top 0px';
    elem.style.overflow = 'hidden';
    elem.style.width = `${w}`;
    elem.style.height = `${h}`;
    elem.style.backgroundImage = `url("${path}")`;
    var move = function() {
        var sc = OWOP.camera.zoom / 16;
        var tx = ((-OWOP.camera.x - 29) * OWOP.camera.zoom);
        var ty = ((-OWOP.camera.y - 25) * OWOP.camera.zoom);
        if (tx > -512 * sc && ty > -512 * sc && tx < window.innerWidth && ty < window.innerHeight) {
            if (sc > 1.0 && !ismag) {
                ismag = true;
                elem.style.imageRendering = 'pixelated';
            } else if (sc <= 1.0 && ismag) {
                ismag = false;
                elem.style.imageRendering = 'auto';
            }

            elem.style.transform = 'matrix(' + sc + ',0,0,' + sc + ',' + Math.round(tx) + ',' + Math.round(ty) + ')';
            if (!shown) {
                OWOP.elements.viewport.appendChild(elem);
                shown = true;
            }
        } else {
            if (shown) {
                elem.remove();
                shown = false;
            }
        }
    };
    if (OWOP.events.camMoved) {
        OWOP.on(OWOP.events.camMoved, move);
        move();
    }
}

console.log("applied stickyimg.js")
