import Vector from "./Vector.js";

class Sphere{
	constructor(center, radius){
		this.center = center || new Vector ();
		this.radius = radius || 1;
	}

	is_hit(ray, tmin, tmax, callback){
		let oc = ray.origin().sub(this.center);
		let a = ray.direction().dot(ray.direction());
		let b = oc.dot(ray.direction());
		let c = oc.dot(oc) - Math.pow(this.radius, 2);
		let discriminant = b*b - a*c;
		let record = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false};
		if (discriminant > 0){
			let temp = (-b - Math.sqrt(discriminant))/a;
			if (temp < tmax && temp > tmin){
				record.t = temp;
				record.p = ray.point_at_parameter(temp);
				record.n = record.p.sub(this.center).div(this.radius);
				record.hit = true;
			}
			temp = (-b + Math.sqrt(discriminant))/a;
			if (temp < tmax && temp > tmin){
				record.t = temp;
				record.p = ray.point_at_parameter(temp);
				record.n = record.p.sub(this.center).div(this.radius);
				record.hit = true;
			}
		}
		return record;
			
	}


}

export default Sphere