class PaymentProcessor {
    constructor(options) {
        this.payments = {};

        this.options = {
            types: ['service', 'product', 'other'],
            precision: 2
        };

        if(options !== undefined) {
            this.setOptions(options);
        }
    }

    registerPayment(id, name, type, value) {
        if (typeof id !== 'string') {
            throw new Error('Id must be a string!');
        }

        if (id === '') {
            throw new RangeError("Payment 'ID' must be non-empty string!")
        }

        if (typeof name !== 'string') {
            throw new Error('Name must be a string!');
        }

        if (name === '') {
            throw new RangeError("Payment 'name' must be non-empty string!")
        }

        if (typeof type !== 'string') {
            throw new Error('Type must be a string!');
        }

        if (typeof value !== 'number') {
            throw new Error('Value must be a number!');
        }

        if (this.payments.hasOwnProperty(id)) {
            throw new Error('Id already exists!');
        }

        if (this.options.types.indexOf(type) === -1) {
            throw new Error('Invalid type!');
        }

        this.payments[id] = {
            name,
            type,
            value
        }
    }

    setOptions(options) {
        const option = Object.getOwnPropertyNames(options)[0];
        this.options[option] = options[option];
    }

    get(id) {
        if (typeof id !== 'string') {
            throw new Error('Id must be a string!');
        }

        if (!this.payments.hasOwnProperty(id)) {
            throw new Error('Invalid id!');
        }

        const payment = this.payments[id];

        return `Details about payment ID: ${id}\n- Name: ${payment.name}\n- Type: ${payment.type}\n- Value: ${payment.value.toFixed(this.options.precision)}`
    }

    deletePayment(id) {
        if (typeof id !== 'string') {
            throw new Error('Id must be a string!');
        }

        if (!this.payments.hasOwnProperty(id)) {
            throw new Error('Invalid id!');
        }

        delete this.payments[id];
    }

    toString() {
        let balance = 0;

        for (const payment in this.payments) {
            balance += this.payments[payment]['value'];
        }

        return `Summary:\n- Payments: ${Object.getOwnPropertyNames(this.payments).length}\n- Balance: ${balance.toFixed(this.options.precision)}`
    }
}


const generalPayments = new PaymentProcessor();
console.log(generalPayments + '');


