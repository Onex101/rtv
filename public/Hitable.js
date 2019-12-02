import Sphere from './Sphere.js'
import Vector from './Vector.js';

class Hitable_List {
	constructor(list, size){
		this.list = list;
		this.size = size;
	}

	hit(ray, tmin, tmax, callback){
		let closest = tmax;
		let rec = {t: 0.0, p: new Vector(0.0, 0.0, 0.0), n: new Vector(0.0, 0.0, 0.0), hit: false};
		for (var i = 0; i < this.size; i++){
			if (this.list[i] instanceof Sphere){
				let tmp_hit = this.list[i].is_hit(ray, tmin, closest, (record) => {
					if (record.hit){
						
						callback(true, record)
					}
					else{
						callback(false, record)
					}
				});
				if (tmp_hit.hit){
					closest = tmp_hit.t;
					rec = tmp_hit;
				}
					
					//console.log({rec, i})
				// closest = rec.t;
			}
		}
		return (rec)
		// return {hit_anything: hit_anything, hit_record: hit_record}
	}
}

export default Hitable_List;