import Vector from "./Vector.js"
import Sphere from "./Sphere.js";
import Hitable_List from "./Hitable.js";
import Camera from "./Camera.js";
import Ray from "./Ray.js";
// import { Lambertian, Metal } from "./Material.js";

let canvas;
let context;


window.onload = function() {
    canvas = document.getElementById( "my_canvas" );
    context = canvas.getContext("2d");
    main()
};

function main (){
    console.log("Raytracing...")
    const nx = canvas.width;
    const ny = canvas.height;
    const ns = ny;
    let imageData = context.getImageData(0, 0, nx, ny);

    let list = [];
    list[0] = new Sphere(new Vector(0, 0, -1), 0.5);
    list[1] = new Sphere(new Vector(0, -100.5, -1), 100);
    // list[0] = new Sphere(new Vector(0,0,-1), 0.5, new Lambertian(new Vector(0.8, 0.3, 0.3)));
    // list[1] = new Sphere(new Vector(0,-100.5,-1), 100, new Lambertian(new Vector(0.8, 0.8, 0.0)));
    // list[2] = new Sphere(new Vector(1,0,-1), 0.5, new Metal(new Vector(0.8, 0.6, 0.2)));
    // list[3] = new Sphere(new Vector(-1,0,-1), 0.5, new Metal(new Vector(0.8, 0.8, 0.8)));

    let world = new Hitable_List(list, list.length);
    let cam = new Camera();

    let lower_left_corner = new Vector(-2.0, -1.0, -1.0);
    let horizontal = new Vector(4.0, 0.0, 0.0);
    let vertical = new Vector(0.0, 2.0, 0.0);
    let origin = new Vector(0.0, 0.0, 0.0);

    for (let j = ny - 1; j >= 0; j--) {
        for (let i = 0; i < nx; i++) {
            let u = (i*1.0) / (nx);
            let v = (j*1.0) / (ny);
            let col = new Vector();
            for (let s = 0; s < ns; s++) {
                let u = (i + get_rand_float(-1, 1)) / nx;
                let v = (j + get_rand_float(-1, 1)) / ny;
                let r = cam.get_ray(u, v);
                col = col.add(get_colour(r, world));
            }
            col = col.div(ns).mul(255);
            setPixel(imageData.data, nx, i, ny - j, col.x, col.y, col.z);
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
        return get_colour(new Ray(rec.p, target.sub(rec.p)), world).mul(0.5);
    }
    else{
        let unit_direction = new Vector().unit_vector(ray.direction());
        let t = 0.5 * (unit_direction.y + 1.0);
        return ((new Vector(1.0, 1.0, 1.0)).mul(1.0 - t).add((new Vector(0.5, 0.7, 1.0)).mul(t)));
    }
    //     let scattered = new Ray();
    //     let attenuation = new Vector();
    //     if (depth < 50 && rec.material.scatter(ray, rec, attenuation, scattered)){
            // let target = rec.p.add(rec.n).add(random_in_unit_sphere());
    //         // return get_colour(new Ray(rec.p, target.sub(rec.p)), world, depth + 1).mul(0.5);
    //         return attenuation.mul(get_colour(scattered, world, depth+1))
    //     }
    //     else{
    //         return new Vector();
    //     }
        
    // }
    // else{
    //     let unit_direction = ray.direction().unit_vector();
    //     let t = 0.5 * (unit_direction.y + 1.0);
    //     return ((new Vector(1.0, 1.0, 1.0)).mul(1.0 - t).add((new Vector(0.5, 0.7, 1.0)).mul(t)));
    // }
}

function random_in_unit_sphere() {
    let p;
    do {
        p = (new Vector(Math.random(), Math.random(), Math.random()).mul(2.0)).sub(1.0);
    }
    while (p.squared_length() >= 1.0);
    return p;
}

function get_rand_float(min, max) {
    return (Math.random() * (max - min)) + min;
}