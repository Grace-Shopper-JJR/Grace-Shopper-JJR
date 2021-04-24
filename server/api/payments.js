const paymentsRouter = require('express').Router();
const { createPayment, deletePayment, getPaymentsByUserId, updatePayments } = require('../db');
const { requireUser } = require('./utils');

paymentsRouter.use((req, res, next) => {
    console.log('A request is being made to /payments');
    next();
});

paymentsRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    try {
        const payments = await getPaymentsByUserId(userId);
        console.log("backend payments:", payments);

        if (payments) {
            res.send({
                message: 'Successfully retrieved payments',
                status: true,
                payments
            });
        } else {
            next({
                error: 'FailedToRetrievePaymentsByUserIdError',
                message: `Unable to retrieve payments by id:${userId}`
            });
        }
    } catch ({ error, message }) {
        next({ error, message })
    }
});

paymentsRouter.post('/', requireUser, async (req, res, next) => {
    try {
        console.log('Inside Payment orders post!')
        const user = req.user;
        const userId = user.user_id;
        const { name, number, cardType, cid, expiration } = req.body;
        console.log('userId from payments:', userId);
        const paymentData = { userId, name, number, cardType, cid, expiration };

        const payment = await createPayment(paymentData);

        if (payment) {
            res.send({
                message: 'successfully created new payment',
                status: true,
                payment
            });
        } else {
            next({
                error: 'FailedToCreatePaymentError',
                message: 'Unable to create new payment'
            });
        }
    } catch ({ error, message }) {
        next({ error, message });
    }
});

paymentsRouter.patch('/:paymentId', requireUser, async (req, res, next) => {
    const { paymentId } = req.params;
    const { name, number, cid, expiration } = req.body;
    const updateFields = {};

    if (name) {
        updateFields.name = name;
    }

    if (number) {
        updateFields.number = number;
    }

    if (cid) {
        updateFields.cid = cid;
    }

    if (expiration) {
        updateFields.expiration = expiration;
    }

    try {
        const updatedPayment = await updatePayments(paymentId, updateFields);

        if (updatedPayment) {
            res.send({
                message: 'Successfully updated payment',
                status: true,
                payment: updatedPayment
            });
        } else {
            next({
                error: 'FailedToUpdatePaymentError',
                message: 'Unable to update payment'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

paymentsRouter.delete('/:paymentId', async (req, res, next) => {
    const { paymentId } = req.params;
    console.log('payment id: ', paymentId);

    try {
        await deletePayment(paymentId);

        if (deletePayment) {
            res.send({
                message: 'Successfully deleted payment',
                status: true,
            });
        } else {
            next({
                error: 'FailedToDeletePaymentError',
                message: 'Unable to delete payment'
            });
        }
    } catch ({ error, message }) {
        next({ error, message });
    }
});

module.exports = paymentsRouter;