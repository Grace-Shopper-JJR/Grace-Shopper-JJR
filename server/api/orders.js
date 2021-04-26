const ordersRouter = require('express').Router();
const { createOrder, getUserOrdersByUserId, updateUserOrderByOrderId, getUserOrdersByUsername, createOrderItem, deleteItemByOrderId, deleteOrderByOrderId, getActiveOrderForUser, findOrCreateActiveOrderByUserId } = require('../db');
const { requireUser } = require('./utils');
const { compareSync } = require('bcrypt');

ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /orders');
    next();
});

ordersRouter.post('/cart', requireUser, async (req, res, next) => {

    const user = req.user;
    const { message } = req.body;

    console.log('Entered POST /cart with:', user.user_id);

    try {
        const orders = await getActiveOrderForUser(user.user_id);

        if (orders) {
            res.send({
                message: 'Successfully retrieved orders',
                status: true,
                orders
            });
        } else {
            next({
                error: 'FailedToRetrieveOrdersByUserNameError',
                message: `Unable to retrieve Active orders`,
                status: false
            });
        }
    } catch ({ error, message }) {
        next({ error, message })
    };

    // }
});


ordersRouter.post('/', requireUser, async (req, res, next) => {
    const { merchId, quantity, price } = req.body;

    const user = req.user;
    console.log('Inside POST /orders with user:', user);

    try {

        console.log('Creating new order!', user.user_id);

        const order = await findOrCreateActiveOrderByUserId(user.user_id);

        console.log('api Creating order item');
        const orderItem = await createOrderItem(order.orderId, {
            merchId,
            quantity,
            price
        });

        console.log('Item Created: ', orderItem)

        if (orderItem) {
            res.send({
                message: 'successfully created new order',
                status: true,
                orderItem
            });
        } else {
            next({
                error: 'FailedToCreateOrderError',
                message: 'Unable to create new order'
            });
        }

    } catch ({ error, message }) {
        next({ error, message });
    }
}
);

ordersRouter.get('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;

    if (user && user.user_id === Number(userId)) {
        try {
            const orders = await getUserOrdersByUserId(userId);

            if (orders) {
                res.send({
                    message: 'Successfully retrieved orders',
                    status: true,
                    orders
                });
            } else {
                next({
                    error: 'FailedToRetrieveOrdersByUserIdError',
                    message: `Unable to retrieve orders by id:${userId}`
                });
            }
        } catch ({ error, message }) {
            next({ error, message })
        }
    }
});

ordersRouter.delete('/cart/:itemId', requireUser, async (req, res, next) => {
    const user = req.user;
    const { itemId } = req.params;

    const orderId = req.body.order;
    console.log('from api: OrderId:', req.body.order);
    try {
        const deletedItem = await deleteItemByOrderId(itemId, orderId);

        if (deletedItem) {
            res.send({
                message: 'successfully removed item from cart',
                data: deletedItem
            })
        } else {
            next({
                message: 'Unable to remove item from cart',
                error: 'FailedToDeleteItemError'
            });
        }

    } catch ({ error, message }) {
        next({ error, message })
    }




})


ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    console.log('Entered DELETE /orderID to DELETE ENTIRE ORDER')
    const { orderId } = req.params;
    const user = req.user;

    {
        try {
            const cart = await deleteOrderByOrderId(orderId);

            if (cart) {
                res.send({
                    message: 'successfully deleted order',
                    data: cart,
                    status: true
                })
            } else {
                next({
                    message: 'Unable to remove all items from cart.',
                    error: 'FailedToDeleteOrderError'
                })
            }
        } catch ({ message, error }) {
            next({ message, error })
        }
    }
})

ordersRouter.patch('/cart', requireUser, async (req, res, next) => {
    console.log(' api PATCH /cart');
    try {
        const { orderId, status } = req.body;
        const user = req.user;
        let fields = {};
        console.log('api orderid: ', orderId, 'status:', status);
        if (status != null || status != 'undefined') {
            console.log('adding status to fields');
            fields.status = status;
        }

        const cart = await updateUserOrderByOrderId(orderId, fields)

        res.send({
            message: 'successfully punched out!',
            data: cart,
            status: true
        })
    } catch (error) {
        throw error;
    }

})

module.exports = ordersRouter;