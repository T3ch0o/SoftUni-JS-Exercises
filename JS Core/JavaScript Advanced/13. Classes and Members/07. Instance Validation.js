class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get clientId() {
        return this._clientId;
    }
    set clientId(id) {
        let regex = /^\d{6}$/;

        if (!regex.test(id)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }

        this._clientId = id;
    }

    get email() {
        return this._email;
    }
    set email(email) {
        let emailPattern = /[A-z\-.]+@[a-z]+\.[a-z]+/;

        if (!emailPattern.test(email)) {
            throw new TypeError('Invalid e-mail');
        }

        this._email = email;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        let usernamePattern = /^[A-Za-z]+$/;

        if (firstName.length < 3 || 20 < firstName.length) {
            throw new TypeError('First name must be between 3 and 20 characters long');
        }

        if (!usernamePattern.test(firstName)) {
            throw new TypeError('First name must contain only Latin characters');
        }

        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        let usernamePattern = /^[A-Za-z]+$/;

        if (lastName.length < 3 || 20 < lastName.length) {
            throw new TypeError('Last name must be between 3 and 20 characters long');
        }

        if (!usernamePattern.test(lastName)) {
            throw new TypeError('Last name must contain only Latin characters');
        }

        this._lastName = lastName;
    }
}

let acc = new CheckingAccount('423414', 'petkan@another.co.uk', 'Petkan', 'D');
console.log(acc);