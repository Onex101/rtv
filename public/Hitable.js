import Sphere from './Sphere.js'

class Hitable_List {
	constructor(list, size){
		this.list = list;
		this.size = size;
	}

	hit(ray, tmin, tmax, callback){
		let closest = tmax;
		for (let i = 0; i < this.size; i++){
			if (this.list[i] instanceof Sphere){
				this.list[i].is_hit(ray, tmin, closest, (record) => {
					if (record.hit){
						callback(true, record)
					}
					else{
						callback(false, record)
					}
				});
			}
			// if (temp_record.hit){
			// 	hit_anything = true;
			// 	closest = temp_record.hit_record.t;
			// 	hit_record = temp_record.hit_record;
			// }
		}
		// return {hit_anything: hit_anything, hit_record: hit_record}
	}
}

export default Hitable_List;