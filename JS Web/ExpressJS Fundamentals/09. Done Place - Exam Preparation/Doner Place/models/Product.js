const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    category: {
        type: "String",
        required: true
    },
    size: {
        type: "Number",
        required: true,
        min: [17, "Size must be between 17 and 24"],
        max: [24, "Size must be between 17 and 24"]
    },
    imageUrl: {
        type: "String",
        required: true
    },
    toppings: [{
        type: "String"
    }],
    user: {
        type: 'ObjectId',
        required: true,
        ref: 'User'
    }
});

const Prodcut = mongoose.model('Product', productSchema);

module.exports = Prodcut;