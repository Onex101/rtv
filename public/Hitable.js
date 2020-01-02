import Sphere from './Sphere.js'
import Vector from './Vector.js';
import Material from './Material.js';


class Hit_Record {
	constructor(t, p, n, hit, m){
		this.t = t || 0.0;
		this.p = p || new Vector(0.0, 0.0, 0.0); 
		this.n = n || new Vector(0.0, 0.0, 0.0); 
		this.hit = hit || false;
		this.m = m;
	}
}

class Hitable_List {
	constructor(list, size){
		this.list = list;
		this.size = size;
	}

	hit(ray, tmin, tmax){
		let closest = tmax;
		let rec = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false};
		for (var i = 0; i < this.size; i++){
			let record = this.list[i].is_hit(ray, tmin, closest);
			if (record.hit){
				closest = record.t;
				rec.t = record.t;
				rec.p = record.p;
				rec.n = record.n;
				// console.log({N_in_Hitable: record.n})
				rec.hit = record.hit;
			}
		}
		return (rec)
	}
}

export default Hitable_List;