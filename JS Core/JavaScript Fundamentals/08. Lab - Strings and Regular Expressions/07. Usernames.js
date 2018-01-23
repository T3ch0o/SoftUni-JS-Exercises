function usernames(input) {
    let result = [];

    for (let i = 0; i < input.length; i++) {
        let [user, domain] = input[i].split('@');

        let username = user + '.';
        let domainParts = domain.split('.');

        domainParts.forEach(e => username += e[0]);

        result.push(username);
    }

    console.log(result.join(', '));
}

usernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);