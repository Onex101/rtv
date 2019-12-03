class Vector {
    constructor (x , y , z ){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    length () {
       return Math.sqrt(this.squared_length()); 
    }

    squared_length(){
        return Math.pow(this.x * 1.0, 2) + Math.pow(this.y * 1.0, 2) + Math.pow(this.z * 1.0, 2);
    }

    add(v){
        if (v instanceof Vector)
            return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        else
            return new Vector(this.x + v, this.y + v, this.z + v);
    }

    sub(v){
        if (v instanceof Vector)
            return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        else
            return new Vector(this.x - v, this.y - v, this.z - v);
    }

    mul(v) {
        if (v instanceof Vector)
            return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
        else 
            return new Vector(this.x * v, this.y * v, this.z * v);
    }

    div(v) {
        if (v instanceof Vector) 
            return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
        else
            return new Vector(this.x / v, this.y / v, this.z / v);
    }

    equals(v) {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return new Vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    unit_vector(){
        return this.div(this.length());
    }

    make_unit_vector() {
        let k = 1.0 / this.length();
        return new Vector(this.x * k, this.y *= k, this.z *= k);
    }

    sqrt(){
        return new Vector(Math.sqrt(this.x), Math.sqrt(this.y), Math.sqrt(this.z))
    }

    floor(){
        return new Vector(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }
}

export default Vector