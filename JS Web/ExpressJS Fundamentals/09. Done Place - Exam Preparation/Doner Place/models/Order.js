const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    creator: {
        type: 'ObjectId',
        required: true
    },
    product: {
        type: 'ObjectId',
        required: true,
        ref: 'Product'
    },
    date: {
        type: 'Date',
        default: Date.now()
    },
    toppings: [{
        type: 'String'
    }],
    status: {
        type: 'String',
        default: 'pending'
    }
});

module.exports = mongoose.model("Order", orderSchema);

function formatDate() {

}