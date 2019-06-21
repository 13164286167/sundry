/**
 * 这个数组是所有的数据
 */
let AllArr=[{
	"id": 19,
	"title": "IT技术研发",
	"description": "IT技术研发",
	"level": 1,
	"parent_id": 10
}, {
	"id": 20,
	"title": "产品运营",
	"description": "产品运营",
	"level": 1,
	"parent_id": 10
}, {
	"id": 21,
	"title": "产品设计",
	"description": "产品设计",
	"level": 1,
	"parent_id": 10
}]
/**
 * 这个数组是已经选择的数据 
 */
let selectArr=[{
	"id": 19,
	"title": "IT技术研发",
	"description": "IT技术研发",
	"level": 1,
	"parent_id": 10
}, {
	"id": 20,
	"title": "产品运营",
	"description": "产品运营",
	"level": 1,
	"parent_id": 10
}]


//怎么做到  在所有的数据中排除掉已选择的数据，留下未选择过的数据，也就是id=21的那个数据呢？

function screeningData(val1,val2){
	let hash = {} , arr= [...val1,...val2];
	let newArr = arr.reduceRight((item, next) => {
		console.log(item,next)
		hash[next.id] ? item.splice(next, 1) : hash[next.id] = true && item.push(next);
		return item
	}, []);
	return newArr;
};
let arr = screeningData(AllArr,selectArr);

console.log(arr)
