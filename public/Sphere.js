import Vector from "./Vector.js";

class Sphere{
	constructor(center, radius){
		this.center = center || new Vector ();
		this.radius = radius || 1;
	}

	is_hit(ray, tmin, tmax, callback){
		let oc = ray.origin().sub(this.center);
		let a = ray.direction().dot(ray.direction());
		let b = 2.0 * oc.dot(ray.direction());
		let c = oc.dot(oc) - Math.pow(this.radius, 2);
		let discriminant = b*b - 4*a*c;
		let record = {};
		if (discriminant < 0){
			let temp = (-b - Math.sqrt(b*b-a*c))/a;
			if (temp < tmax && temp > tmin){
				record.t = temp;
				record.p = ray.point_at_parameter(temp);
				record.n = record.p.sub(this.center).div(this.radius);
				record.hit = true;
				callback(record);
			}
			temp = (-b + Math.sqrt(b*b-a*c))/a;
			if (temp < tmax && temp > tmin){
				record.t = temp;
				record.p = ray.point_at_parameter(temp);
				record.n = record.p.sub(this.center).div(this.radius);
				record.hit = true;
				callback(record);
			}
		}
		else{
			record.hit = false;
			callback(record);
		}
			
	}


}

export default Sphere