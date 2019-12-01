import Sphere from './Sphere.js'

class Hitable_List {
	constructor(list, size){
		this.list = list;
		this.size = size;
	}

	hit(ray, tmin, tmax, hit_record){
		let temp_record;
		let hit_anything = false;
		let closest = tmax;

		for (let i = 0; i < this.size; i++){
			temp_record = this.list[i].is_hit(ray, tmin, closest, hit_record);
			{console.log(this.list[i].is_hit(ray, tmin, closest, hit_record))}
			if (temp_record.hit){
				hit_anything = true;
				closest = temp_record.hit_record.t;
				hit_record = temp_record.hit_record;
			}
		}
		return {hit_anything: hit_anything, hit_record: hit_record}
	}
}

export default Hitable_List;