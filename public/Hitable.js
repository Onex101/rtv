import Sphere from './Sphere.js'
import Vector from './Vector.js';

class Hitable_List {
	constructor(list, size){
		this.list = list;
		this.size = size;
	}

	hit(ray, tmin, tmax){
		let closest = tmax;
		let rec = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false};
		for (var i = 0; i < this.size; i++){
			let tmp_hit = this.list[i].is_hit(ray, tmin, closest);
			if (tmp_hit.hit){
				closest = tmp_hit.t;
				rec = tmp_hit;
			}
			
		}
		return (rec)
	}
}

export default Hitable_List;