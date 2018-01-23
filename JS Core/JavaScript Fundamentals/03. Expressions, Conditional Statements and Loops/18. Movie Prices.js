function moviePrice([movie, day]) {
    movie = movie.toLowerCase();
    day = day.toLowerCase();
    if (movie === "the godfather") {
        switch (day) {
            case 'monday':
                return console.log(12);
            case 'tuesday':
                return console.log(10);
            case 'wednesday':
                return console.log(15);
            case 'thursday':
                return console.log(12.50);
            case 'friday':
                return console.log(15);
            case 'saturday':
                return console.log(25);
            case 'sunday':
                return console.log(30);
            default: return "error"
        }
    } else if (movie === "schindler's list") {
        switch (day) {
            case 'monday':
                return console.log(8.50);
            case 'tuesday':
                return console.log(8.50);
            case 'wednesday':
                return console.log(8.50);
            case 'thursday':
                return console.log(8.50);
            case 'friday':
                return console.log(8.50);
            case 'saturday':
                return console.log(15);
            case 'sunday':
                return console.log(15);
            default: return "error"
        }
    } else if (movie === "casablanca") {
        switch (day) {
            case 'monday':
                return console.log(8);
            case 'tuesday':
                return console.log(8);
            case 'wednesday':
                return console.log(8);
            case 'thursday':
                return console.log(8);
            case 'friday':
                return console.log(8);
            case 'saturday':
                return console.log(10);
            case 'sunday':
                return console.log(10);
            default: return "error"
        }
    } else if (movie === "the wizard of oz") {
        switch (day) {
            case 'monday':
                return console.log(10);
            case 'tuesday':
                return console.log(10);
            case 'wednesday':
                return console.log(10);
            case 'thursday':
                return console.log(10);
            case 'friday':
                return console.log(10);
            case 'saturday':
                return console.log(15);
            case 'sunday':
                return console.log(15);
            default: return "error"
        }
    } else {
        console.log("error");
    }
}

moviePrice(["The Godfather", "Monday"]);