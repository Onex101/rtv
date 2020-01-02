import Vector from "./Vector.js";
import Material from "./Material.js"

class Sphere{
	constructor(center, radius, material){
		this.center = center || new Vector ();
		this.radius = radius || 1;
		this.material = material;
	}

	is_hit(ray, tmin, tmax){
		
		let oc = ray.origin().sub(this.center);
		let a = ray.direction().dot(ray.direction());
		let b = 2.0 * ray.direction().dot(oc);
		let c = oc.dot(oc) - (this.radius*this.radius);
		let discriminant = b*b - 4*a*c;
		let record = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false, m: this.material};
		if (discriminant > 0){
			// console.log({oc, a, b, c, discriminant})
			let temp1 = (-b - Math.sqrt(discriminant) ) / (2.0*a);
			let temp2 = (-b + Math.sqrt(discriminant) ) / (2.0*a);
			let temp3 = temp1 < temp2 ? temp1 : temp2;
			if (temp3 < tmax && temp3 > tmin){
				record.t = temp3;
				record.p = ray.point_at_parameter(temp3);
				record.n = new Vector().unit_vector(record.p.sub(this.center));
				record.m = this.material;
				record.hit = true;
			}
		}
		return record;
			
	}


}

export default Sphere