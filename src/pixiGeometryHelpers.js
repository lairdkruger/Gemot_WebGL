//background
function backgroundColor(color) {
    renderer.backgroundColor = color;
}


//lines
var line_width = 1;
var line_color = 0xffffff;
var line = new PIXI.Graphics();

function drawLine(x1, y1, x2, y2) {
    line.lineStyle(line_width, line_color);
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
    stage.addChild(line);
}

function clearLines() {
    line.clear();
}

function updateLineWidth(width) {
    line_width = width;
}

function updateLineColor(color) {
    line_color = color;
}


//colors
function randomColour(){
    var r = randomInt(255);
    var g = randomInt(255);
    var b = randomInt(255);
    return rgb(r,g,b);
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


//mathematics
function radians(deg) {return deg*Math.PI/180;};

function degrees(rad) {return rad*180/Math.PI;};

function degreesToPoint(deg, diameter) {
    var rad = Math.PI * deg / 180;
    var r = diameter / 2;
    return {x: r * Math.cos(rad), y: r * Math.sin(rad)};
}

function distributeAngles(me, total) {
    return me/total * 360;
}

function halfDistributeAngles(me, total) {
    return me/total * 180;
}


function map(value, min1, max1, min2, max2, clampResult) {
    var returnvalue = ((value-min1) / (max1 - min1) * (max2-min2)) + min2;
    if(clampResult) {
        return clamp(returnvalue, min2, max2);
    } else { 
        return returnvalue; 
    }
}

function clamp(value, min, max){
    return Math.min(Math.max(value, Math.min(min, max)),Math.max(min, max));
}

function inRange(value){
    return value >= Math.min(min, max) && value <= Math.max(min, max);
}

function dist(x1, y1, x2, y2) {
    x2-=x1; y2-=y1;
    return Math.sqrt((x2*x2) + (y2*y2));
}

function random(min, max) {
    if(min===undefined) {
        min = 0;
        max = 1;
    } else if(max=== undefined) {
        max = min;
        min = 0;
    }
    return (Math.random() * (max-min)) + min;
}


function randomP(min, max) {
    if(min===undefined) {
        min = 0.1;
        max = 1;
    } else if (max=== undefined) {
        max = min;
        min = 0.1;
    }
    return (Math.random() * (max-min)) + min;
}


function randomInt(min, max) {
    if(max===undefined) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max+1-min)) +min;
}


function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360);
    if (theta == 360) theta = 0;
    return theta;
}

function bounce(num, min, max, sz) {
    if (sz === undefined) {
        sz = 0;
    }
    if (num >= max - sz/2 || num - sz/2 <= min ) {
        return 1;
    } else {
        return 0;
    }
    //return num > max ? -1 : num < min ? -1 : 1
}