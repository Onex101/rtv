import Vector from "./Vector.js";

class Ray {
    constructor (v1 , v2){
        if (v1 instanceof Vector)
            this.v1 = v1;
        else
            this.v1 = new Vector();
        if (v2 instanceof Vector)
            this.v2 = v2;
        else
            this.v2 = new Vector();
    }

    origin(){
        return this.v1;
    }

    direction(){
        return this.v2;
    }

    point_at_parameter(t){
        return this.v1.add(this.v2.mul(t));
    }

}

export default Ray;