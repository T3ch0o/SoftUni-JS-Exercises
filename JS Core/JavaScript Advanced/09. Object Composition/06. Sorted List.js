function sortedList() {
    let obj = (() => {
        let arr = [];
        let sorting = (a,b) => a - b;

        let add = function (element) {
            arr.push(element);
            arr.sort(sorting);
            this.size++;
        };

        let remove = function (index) {
            if(index >= 0 && index < arr.length) {
                arr.splice(index, 1);
                arr.sort(sorting);
                this.size--;
            }
        };

        let get = function (index) {
            if(index >= 0 && index< arr.length){
                return arr[index];
            }
        };

        let size = 0;
        return {add, remove, get, size}
    })();

    return obj;
}

let myList = sortedList();

myList.add(5);
myList.add(3);
console.log(myList.get(0));
myList.remove(0);
console.log(myList.size);