function sumNumbers(minAge, firstName, firstAge, secondName, secondAge) {
    let obj1 = {name:firstName, age: firstAge};
    let obj2 = {name:secondName, age: secondAge};

    if (obj1.age >= minAge) {
        console.log(obj1);
    }
    if (obj2.age >= minAge) {
        console.log(obj2);
    }
}