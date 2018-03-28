var firstSketch = function(sketch) {

    sketch.setup = () => {
        sketch.createCanvas(100, 100);
        sketch.background(255, 0, 200);
    };

    sketch.draw = () => {
        sketch.ellipse(50, 50, 80, 80);
    };
};

var renderOne = new p5(firstSketch, 'first-sketch');