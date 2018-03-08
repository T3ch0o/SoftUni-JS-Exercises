class List {
    constructor() {
        this.arr = [];
        this.size = 0;
    }

    add(element) {
        this.arr.push(element);
        this.arr.sort((a, b) => a - b);
        this.size++;
    };

    remove(index) {
        if(index >= 0 && index < this.arr.length) {
            this.arr.splice(index, 1);
            this.arr.sort((a, b) => a - b);
            this.size--;
        }
    };

    get(index) {
        if(index >= 0 && index< this.arr.length){
            return this.arr[index];
        }
    };
}

let myList = new List();

myList.add(5);
myList.add(3);
console.log(myList.get(0));
myList.remove(0);
console.log(myList.size);