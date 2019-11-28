import Vector from "./Vector.js"
import Ray from "./Ray.js";

let canvas;
let context;


window.onload = function() {
    canvas = document.getElementById( "my_canvas" );
    context = canvas.getContext("2d");
    main()
};

function main (){
    const nx = canvas.width;
    const ny = canvas.height;

    let lower_left_corner   = new Vector(-2.0, -1.0, -1.0);
    let horizontal          = new Vector(4.0, 0.0, 0.0);
    let vertical            = new Vector(0.0, 2.0, 0.0);
    let origin              = new Vector(0.0, 0.0, 0.0);

    let imageData = context.getImageData(0, 0, nx, ny);
    let nn = 5;
    for (let y = 0; y < ny; y++) {
        for (let x = 0; x < nx; x++) {

            let u = x / parseFloat(nx);
            let v = y / parseFloat(ny);
        
            let ray = new Ray(origin, lower_left_corner.add(horizontal.mul(u)).add(vertical.mul(v)));
            let col = colour(ray);
            // if (x == 1 && y == 1)
            col = col.div(nn);
            // col.x = Math.sqrt(col.x);
            // col.y = Math.sqrt(col.y);
            // col.z = Math.sqrt(col.z);
            // console.log(col)

            setPixel(imageData.data, nx, x, ny - y, col.x, col.y, col.z);
        }
    }
    context.putImageData(imageData, 0, 0);
}

function setPixel(data, width, x, y, r, g, b) {
    const p = (y * width + x) * 4;
    data[p] = r;
    data[p + 1] = g;
    data[p + 2] = b;
    data[p + 3] = 255;
}

function colour(ray){
    let unit_direction = ray.direction().unit_vector();
    let t = 0.5 * (unit_direction.y + 1.0);
    return (new Vector(1.0, 1.0, 1.0)).mul(1.0 - t).add((new Vector(0.5, 0.7, 1.0)).mul(t));
}