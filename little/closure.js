function count(){
  var arr = [];
  for(var i =0; i<=3; i++){
    arr.push((function(i){
      return function(){
        return i*i;
      }
    })(i))
  }
  return arr; 
}
var arrList = count();
console.log(arrList[0]())
console.log(arrList[1]())
console.log(arrList[2]())
console.log(arrList[3]())