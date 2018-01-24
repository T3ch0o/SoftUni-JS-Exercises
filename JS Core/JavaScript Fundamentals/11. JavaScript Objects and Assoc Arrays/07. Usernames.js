function usernames(input) {
    let users = new Set();

    input.forEach(e => users.add(e));

    [...users].sort(function (a, b) {
       if (a.length < b.length)
           return -1;
       if (a.length > b.length)
           return 1;

       return a.localeCompare(b);
    }).forEach(e => console.log(e));
}

usernames(["Denise","Ignatius","Iris","Isacc","Indie","Dean","Donatello",
    "Enfuego","Benjamin","Biser","Bounty","Renard","Rot"]);