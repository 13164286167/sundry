interface Person {
  name: string;
  age: number
}

function printName (person: Person){
  console.log(person.name)
}

let tom = {
  name: "tom",
  age: 10
}
let lili = {
  name: "lili",
  age: 20,
  phone: 123456
}

printName(tom)
printName(lili)