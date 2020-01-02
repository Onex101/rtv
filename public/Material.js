import Ray from "./Ray.js";
import Vector from "./Vector.js"

class Material{
    constructor(){

    }
    scatter (ray, tMin, tMax, hitRec) {
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

function refract (vec, norm, niOverNt, refracted){
    let uv = new Vector().unit_vector(vec);
    let dt = norm.dot(uv);
    let discriminant = 1.0 - niOverNt*niOverNt*(1-dt*dt);
    if (discriminant > 0) {
        refracted =   norm.mul(dt).sub(uv).mul(niOverNt).sub(norm.mul(Math.sqrt(discriminant)));
        return {refracted: refracted, doesRefract: true};
    }
    else
        return {doesRefract: false}; 
}



class Lambertian extends Material{
    constructor(a) {
        super();
        this.albedo = a;
    }

    scatter(rayIn, hitRec, attenuation, rayScattered)
    {
        let target = hitRec.p.add(hitRec.n).add(random_in_unit_sphere());
        return ({scattered: new Ray(hitRec.p, target.sub(hitRec.p)), attenuation: this.albedo, doesMat: true })
    }
}

class Metal extends Material{
    constructor(a, fuzz) {
        super();
        this.albedo = a;
        this.fuzz = fuzz > 1.0 ? 1.0 : fuzz;
    }

    reflect (v, n) {
        return v.sub( n.mul(2.0 * v.dot(n)) );
    }

    scatter (rayIn, hitRec, attenuation, rayScattered) {
        let reflected = this.reflect(rayIn.direction().unit_vector(rayIn.direction()), hitRec.n);
        // let scattered = new Ray(hitRec.p, reflected);
        let scattered = new Ray(hitRec.p, reflected.add(random_in_unit_sphere().mul(this.fuzz)));
        let doesScatt = scattered.direction().dot(hitRec.n) > 0;
        return ({scattered: scattered, attenuation: this.albedo, doesMat: doesScatt})
    }
}

class Dielectric extends Material{
    constructor(ri) {
        super();
        this.refractiveIndex = ri;
    }

    reflect (v, n) {
        return v.sub( n.mul(2.0 * v.dot(n)) );
    }
    
    // refract (v, n, niOverNt, refracted) {
    //     let uv = v.unit();
    //     let dt = uv.dot(n);
    //     let discriminant = 1.0 - niOverNt*niOverNt*(1 - dt*dt);
    //     if (discriminant > 0) {
    //         refracted.overwrite( uv.sub(n.mul(dt)).mul(niOverNt).sub( n.mul(Math.sqrt(discriminant)) ) );
    //         return ({scattered: uv.sub(n.mul(dt)).mul(niOverNt).sub( n.mul(Math.sqrt(discriminant)) ), doesMat: true})
    //     } else {
    //         return ({doesMat: false});
    //     }
    // }

    schlick (cosine, refIndex) {
        let r0 = (1 - refIndex) / (1 + refIndex);
        r0 *= r0;
        return r0 + (1 - r0)*Math.pow(1-cosine, 5);
    }

    scatter (rayIn, hitRec, attenuation, rayScattered) {
        let outwardNormal = new Vector();
        let reflected = this.reflect(rayIn.direction(), hitRec.n);
        let niOverNt = 0.0;
        let retAttenuation = (new Vector(1.0, 1.0, 1.0));
        let retScattered = new Ray();
        let refracted = new Vector();
        let reflectProb = 0;
        let cosine = 0;
        let doesMat = true;

        if (rayIn.direction().dot(hitRec.n) > 0) {
            outwardNormal = hitRec.n.mul(-1);
            niOverNt = this.refractiveIndex;
            // cosine = this.refractiveIndex * rayIn.direction().dot(hitRec.n) / rayIn.direction().length();
        } else {
            outwardNormal = (hitRec.n);
            niOverNt = 1.0 / this.refractiveIndex;
            // cosine = -(rayIn.direction().dot(hitRec.n)) / rayIn.direction().length();
        }

        let ref = refract(rayIn.direction(), outwardNormal, niOverNt, refracted);
        if (ref.doesRefract) {
            retScattered = new Ray(hitRec.p, ref.refracted);
        }
        else{
            retScattered = new Ray(hitRec.p, reflected);
        }

        // if (Math.random() < reflectProb) {
        //     retScattered = ( new Ray(hitRec.p, reflected) );
        // } else {
        //     retScattered = ( new Ray(hitRec.p, refracted) );
        //     doesMat = false;
        // }
        return {doesMat: doesMat, scattered: retScattered, attenuation: retAttenuation};
    }
}

export default Material

export {
    Dielectric,
    Metal,
    Lambertian,
}