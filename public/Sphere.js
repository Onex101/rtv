import Vector from "./Vector.js";
import Material from "./Material.js"

class Sphere{
	constructor(center, radius, material){
		this.center = center || new Vector ();
		this.radius = radius || 1;
		this.material = material;
	}

	is_hit(center, radius, ray){
		let oc = ray.origin().sub(center);
		let a = ray.direction().dot(ray.direction());
		let b = oc.dot(ray.direction()) * 2.0;
		let c = oc.dot(oc) - radius * radius;
		let discriminant = b*b - 4*a*c;
		if (discriminant < 0) {
			return -1.0;
		}
		else {
			return ((b*-1) - Math.sqrt(discriminant) ) / (2.0*a);
		}
			
	}

	// is_hit(ray, tmin, tmax){
	// 	let oc = ray.origin().sub(this.center);
	// 	let a = ray.direction().dot(ray.direction());
	// 	let b = oc.dot(ray.direction());
	// 	let c = oc.dot(oc) - this.radius * this.radius;
	// 	let discriminant = b*b - a*c;
	// 	let record = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false, m: this.material};
	// 	if (discriminant > 0){
	// 		let temp = (-b - Math.sqrt(discriminant))/a;
	// 		if (temp < tmax && temp > tmin){
	// 			record.t = temp;
	// 			record.p = ray.point_at_parameter(temp);
	// 			record.n = record.p.sub(this.center).div(this.radius);
	// 			record.m = this.material;
	// 			record.hit = true;
	// 		}
	// 		temp = (-b + Math.sqrt(discriminant))/a;
	// 		if (temp < tmax && temp > tmin){
	// 			record.t = temp;
	// 			record.p = ray.point_at_parameter(temp);
	// 			record.n = record.p.sub(this.center).div(this.radius);
	// 			record.m = this.material;
	// 			record.hit = true;
	// 		}
	// 	}
	// 	return record;
			
	// }


}

export default Sphere