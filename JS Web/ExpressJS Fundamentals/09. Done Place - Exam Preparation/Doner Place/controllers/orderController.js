const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');


module.exports.orderGet = function(req, res) {
    const id = req.params.id;

    Product.findById(id).then(function(product) {
        res.render('order/customize-order', { product } )
    });
};

module.exports.orderPost = function(req, res) {
    const orderObj = Object.keys(req.body);
    const userId = req.user._id;
    const productId = req.params.id;
    const order = {
        creator: userId,
        product: productId,
        toppings: orderObj
    };

    Order.create(order).then(function(order) {
        order.save().then(function(order) {
            User.findById(userId).then(function(user) {
                user.orders.push(order._id);
                user.save();
                res.redirect(`/order/details/${order._id}`);
            });
        });
    });
};

module.exports.orderDetails = function(req, res) {
    const id = req.params.id;
    const status = {
        pending: '',
        inProgress: '',
        inTransit: '',
        delivered: ''
    };

    Order.findById(id).populate('product').then(function(order) {
        status[order.status] = 'true';
        order.currentDate = order.date.toLocaleString();
        res.render('order/details', { order, status });
    });
};

module.exports.orderStatus = function(req, res) {
    Order.find({ creator: req.user._id }).populate('product').then(function(orders) {
        orders = formatDate(orders);

        res.render('order/order-status',  { orders });
    });
};

module.exports.orderStatusAdminGet = function(req, res) {
    Order.find().populate('product').then(function(orders) {
        orders = formatDate(orders);

        for (const order of orders) {
            const status = {
                pending: '',
                inProgress: '',
                inTransit: '',
                delivered: ''
            };

            status[order.status] = 'true';
            order.orderStatus = status;
        }

        res.render('order/order-status-admin',  { orders });
    });
};

module.exports.orderStatusAdminPost = function(req, res) {
    for (let orderId in req.body) {
        Order.findById(orderId).then(order => {
            if (req.body[orderId] !== order.status) {
                order.status = req.body[orderId];
                order.save();
            }
        })
    }
    res.redirect('/order-status/admin');
};

function formatDate(orders) {
    for (const order of orders) {
        order.currentDate = order.date.toLocaleString();
    }
    return orders;
}