import Vector from "./Vector.js";

class Sphere{
	constructor(center, radius){
		this.center = center || new Vector ();
		this.radius = radius || 1;
	}

	is_hit(ray, tmin, tmax, hit_record){
		console.log("IS IT HIT?")
		let oc = ray.origin().sub(this.center);
		let a = ray.direction().dot(ray.direction());
		let b = 2.0 * oc.dot(ray.direction());
		let c = oc.dot(oc) - Math.pow(this.radius, 2);
		let discriminant = b*b - 4*a*c;
		if (discriminant < 0){
			let temp = (-b - Math.sqrt(b*b-a*c))/a;
			if (temp < tmax && temp > tmin){
				hit_record.t = temp;
				hit_record.p = ray.point_at_parameter(temp);
				hit_record.n = hit_record.p.sub(this.center).div(this.radius);
				return {hit_record: hit_record, hit: true};
			}
			temp = (-b + Math.sqrt(b*b-a*c))/a;
			if (temp < tmax && temp > tmin){
				hit_record.t = temp;
				hit_record.p = ray.point_at_parameter(temp);
				hit_record.n = hit_record.p.sub(this.center).div(this.radius);
				return {hit_record: hit_record, hit: true};
			}
		}
		else
			return ({hit:false});
	}


}

export default Sphere