import Ray from "./Ray.js";
import Vector from "./Vector.js"

class Camera {
    constructor (lower_left_corner, horizontal, vertical, origin) {
        this.lower_left_corner   = lower_left_corner || new Vector(-2.0, -1.0, -1.0);
        this.horizontal          = horizontal || new Vector(4.0, 0.0, 0.0);
        this.vertical            = vertical || new Vector(0.0, 2.0, 0.0);
        this.origin              = origin || new Vector(0.0, 0.0, 0.0);
    }

    get_ray(u, v) {
        return new Ray(this.origin, 
                       this.lower_left_corner.add(
                       this.horizontal.mul(u)).add(
                       this.vertical.mul(v)).sub(
                       this.origin));

    }
}

export default Camera;