import Vector from "./Vector.js"
import Sphere from "./Sphere.js";
import Hitable_List from "./Hitable.js";
import Camera from "./Camera.js";
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
    const ns = ny;
    let imageData = context.getImageData(0, 0, nx, ny);

    let list = [];
    list[0] = new Sphere(new Vector(0, 0, -1), 0.5);
    list[1] = new Sphere(new Vector(0, -100.5, -1), 100);

    let world = new Hitable_List(list, list.length);
    let cam = new Camera();
    let nn = 2;
    for (let y = ny - 1; y >= 0; y--) {
        for (let x = 0; x < nx; x++) {

            let col = new Vector();

            for (let s = 0; s < ns; s++) {
                let u = (x + Math.random()) / nx;
                let v = (y + Math.random()) / ny;
                let r = cam.get_ray(u, v);
                let p = r.point_at_parameter(2.0);
                col = col.add(get_colour(r, world));
            }
            col = col.div(ns).mul(255.99);
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

function get_colour(ray, world){
    let rec = world.hit(ray, 0.001, Number.MAX_VALUE);
    if (rec.hit){
        let target = rec.p.add(rec.n).add(random_in_unit_sphere());
        return get_colour(new Ray(rec.p, target.sub(rec.p)), world).mul(0.8);
    }
    else{
        let unit_direction = ray.direction().unit_vector();
        let t = 0.5 * (unit_direction.y + 1.0);
        return ((new Vector(1.0, 1.0, 1.0)).mul(1.0 - t).add((new Vector(0.5, 0.7, 1.0)).mul(t)));
    }
}

function random_in_unit_sphere() {
    let p;
    do {
        p = (new Vector(Math.random(), Math.random(), Math.random()).mul(2.0)).sub(1.0);
    }
    while (p.squared_length() >= 1.0);
    return p;
}