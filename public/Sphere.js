import Vector from "./Vector.js";
import Material from "./Material.js"

class Sphere{
	constructor(center, radius, material){
		this.center = center || new Vector ();
		this.radius = radius || 1;
		this.material = material;
	}

	is_hit(ray, tmin, tmax){
		let oc;
		try{
			oc = ray.origin().sub(this.center);
		}
		catch (e){
			console.log({ray, tmin, tmax})
		}
		let a = ray.direction().dot(ray.direction());
		let b = 2.0 * ray.direction().dot(oc);
		let c = oc.dot(oc) - (this.radius*this.radius);
		let discriminant = b*b - 4*a*c;
		let record = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false, m: this.material};
		if (discriminant > 0){
			// console.log({oc, a, b, c, discriminant})
			let temp = (-b - Math.sqrt(discriminant) ) / (2.0*a);
			if (temp < tmax && temp > tmin){
				record.t = temp;
				record.p = ray.point_at_parameter(temp);
				record.n = new Vector().unit_vector(record.p.sub(this.center));
				record.m = this.material;
				record.hit = true;
				return record;
			}
			temp = (-b + Math.sqrt(discriminant) ) / (2.0*a);
			if (temp < tmax && temp > tmin){
				record.t = temp;
				record.p = ray.point_at_parameter(temp);
				record.n = new Vector().unit_vector(record.p.sub(this.center));
				record.m = this.material;
				record.hit = true;
				return record;
			}
		}
		return record;
			
	}


}

export default Sphere