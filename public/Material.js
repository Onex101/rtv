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

class Lambertian extends Material{
    constructor(a) {
        super();
        this.albedo = a;
    }

    scatter(rayIn, hitRec, attenuation, rayScattered)
    {
        let target = hitRec.p.add(hitRec.n).add(random_in_unit_sphere());
        rayScattered.overwrite(new Ray(hitRec.p, target.sub(hitRec.p)));
        attenuation.overwrite(this.albedo);
        return true;
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
        let reflected = this.reflect(rayIn.direction().unit(), hitRec.n);
        rayScattered.overwrite(new Ray(hitRec.p, reflected.add(random_in_unit_sphere().mul(this.fuzz))));
        attenuation.overwrite(this.albedo);
        return rayScattered.direction().dot(hitRec.n) > 0;
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
    
    refract (v, n, niOverNt, refracted) {
        let uv = v.unit();
        let dt = uv.dot(n);
        let discriminant = 1.0 - niOverNt*niOverNt*(1 - dt*dt);
        if (discriminant > 0) {
            refracted.overwrite( uv.sub(n.mul(dt)).mul(niOverNt).sub( n.mul(Math.sqrt(discriminant)) ) );
            return true;
        } else {
            return false;
        }
    }

    schlick (cosine, refIndex) {
        let r0 = (1 - refIndex) / (1 + refIndex);
        r0 *= r0;
        return r0 + (1 - r0)*Math.pow(1-cosine, 5);
    }

    scatter (rayIn, hitRec, attenuation, rayScattered) {
        let outwardNormal = new Vector();
        let reflected = this.reflect(rayIn.direction(), hitRec.n);
        let niOverNt = 0;
        attenuation.overwrite(new Vector(1.0, 1.0, 1.0));

        let refracted = new Vector();
        let reflectProb = 0;
        let cosine = 0;

        if (rayIn.direction().dot(hitRec.n) > 0) {
            outwardNormal = hitRec.n.negative();
            niOverNt = this.refractiveIndex;
            cosine = this.refractiveIndex * rayIn.direction().dot(hitRec.n) / rayIn.direction().length();
        } else {
            outwardNormal.overwrite(hitRec.n);
            niOverNt = 1.0 / this.refractiveIndex;
            cosine = -(rayIn.direction().dot(hitRec.n)) / rayIn.direction().length();
        }

        if (this.refract(rayIn.direction(), outwardNormal, niOverNt, refracted)) {
            reflectProb = this.schlick(cosine, this.refractiveIndex);
        } else {
            rayScattered.overwrite( new Ray(hitRec.p, reflected) );
            reflectProb = 1.0;
        }

        if (Math.random() < reflectProb) {
            rayScattered.overwrite( new Ray(hitRec.p, reflected) );
        } else {
            rayScattered.overwrite( new Ray(hitRec.p, refracted) );
        }
        return true;
    }
}

export default {
    Dielectric,
    Metal,
    Lambertian
}