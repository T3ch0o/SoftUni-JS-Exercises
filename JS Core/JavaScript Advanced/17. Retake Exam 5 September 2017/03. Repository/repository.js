class Repository {
    constructor(object) {
        this.object = object;
        this.data = new Map();
        this.id = 0;
    }

    add(entity) {
        this.check(entity);

        this.data.set(this.id, entity);
        this.id++;

        return this.id - 1;
    }

    get(id) {
        if (id < 0 || this.id <= id) {
            throw new Error('Id out of range!')
        }

        return this.data.get(id);
    }

    update(id, newEntity) {
        if (id < 0 || this.id <= id) {
            throw new Error('Id out of range!')
        }

        this.check(newEntity);

        this.data.set(id, newEntity);
    }

    del(id) {
        if (id < 0 || this.id <= id) {
            throw new Error('Id out of range!')
        }

        this.data.delete(id);
    }

    get count() {
        return this.data.size;
    }

    check(entity) {
        let classObjectKeys = Object.keys(this.object);
        let currentObjectKeys = Object.keys(entity);

        for (let key of currentObjectKeys) {
            if (!classObjectKeys.includes(key)) {
                throw new Error('Object does not that property');
            }
        }

        for (let key of currentObjectKeys) {
            if (this.object[key] !== typeof entity[key]) {
                throw new TypeError('Invalid format on property');
            }
        }
    }
}


// Initialize props object
let properties = {
    name: "string",
    age: "number",
    birthday: "object"
};
//Initialize the repository
let repository = new Repository(properties);
// Add two entities
let entity = {
    name: "Kiril",
    age: 19,
    birthday: new Date(1998, 0, 7)
};
repository.add(entity); // Returns 0
repository.add(entity); // Returns 1
console.log(repository.get(0));
// {"name":"Kiril","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
console.log(repository.get(1));
// {"name":"Kiril","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
//Update an entity
entity = {
    name: 'Valio',
    age: 19,
    birthday: new Date(1998, 0, 7)
};
repository.update(1, entity);
console.log(repository.get(1));
// {"name":"Valio","age":19,"birthday":"1998-01-06T22:00:00.000Z"}
// Delete an entity
repository.del(0);
console.log(repository.count); // Returns 1
let anotherEntity = {
    name1: 'Nakov',
    age: 26,
    birthday: new Date(1991, 0, 21)
};
repository.add(anotherEntity); // should throw an Error
anotherEntity = {
    name: 'Nakov',
    age: 26,
    birthday: 1991
};
repository.add(anotherEntity); // should throw a TypeError
repository.del(-1); // should throw Error for invalid id
