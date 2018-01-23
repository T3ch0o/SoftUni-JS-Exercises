function fruitOrVegetable(input) {
    switch(input){
        case "banana":
        case "apple":
        case "kiwi":
        case "cherry":
        case "lemon":
        case "grapes":
        case "peach":
            console.log("fruit");
            return;

        case "tomato":
        case "cucumber":
        case "pepper":
        case "onion":
        case "garlic":
        case "parsley":
            console.log("vegetable");
            return;
        default:
            console.log("unknown");
            return;
    }
}

console.log(fruitOrVegetable('banana'));