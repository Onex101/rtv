import Vector from "./Vector.js"
import Ray from "./Ray.js";
import Sphere from "./Sphere.js";
import Hitable_List from "./Hitable.js";

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
    let imageData = context.getImageData(0, 0, nx, ny);

    let lower_left_corner   = new Vector(-2.0, -1.0, -1.0);
    let horizontal          = new Vector(4.0, 0.0, 0.0);
    let vertical            = new Vector(0.0, 2.0, 0.0);
    let origin              = new Vector(0.0, 0.0, 0.0);

    let list = [];
    list[0] = new Sphere(new Vector(0, 0, -1), 0.5);
    list[1] = new Sphere(new Vector(0, -100.5, -1), 100);

    let world = new Hitable_List(list, list.length);

    let nn = 2;
    for (let y = ny - 1; y >= 0; y--) {
        for (let x = 0; x < nx; x++) {

            let u = x / parseFloat(nx);
            let v = y / parseFloat(ny);
        
            let ray = new Ray(origin, lower_left_corner.add(horizontal.mul(u)).add(vertical.mul(v)));
            let col = colour(ray, world);
            // if (x == 1 && y == 1)
            col.x =((col.x * 255.99));
            col.y = ((col.y * 255.99));
            col.z = ((col.z * 255.99));
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

function colour(ray, world){
    let record = {t: 0.0 , p: new Vector() , n: 0.0};
    let tmp = world.hit(ray, 0.0, Number.MAX_VALUE, record);
    if (tmp.hit_anything){
        // console.log(tmp)
        return new Vector(tmp.hit_record.n.x + 1, 
                          tmp.hit_record.n.y + 1, 
                          tmp.hit_record.n.z +1).mul(0.5);
    }
    let unit_direction = ray.direction().unit_vector();
    let t = 0.5 * (unit_direction.y + 1.0);
    return (new Vector(1.0, 1.0, 1.0)).mul(1.0 - t).add((new Vector(0.5, 0.7, 1.0)).mul(t));
}