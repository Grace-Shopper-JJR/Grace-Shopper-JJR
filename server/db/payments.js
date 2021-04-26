const db = require('./database');

async function createPayment({userId, name, number, cardType, cid, expiration}) {

    try {
        const { rows: [payment] } = await db.query(`
        INSERT INTO payments("userId", name, number, cardType, cid, expiration)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `, [userId, name, number, cardType, cid, expiration]);

        return payment;
    } catch (error) {
        throw error;
    }
}

async function getPaymentsByUserId(userId) {
    try {
        const { rows: payments } = await db.query(`
        SELECT * 
        FROM payments
        WHERE "userId"=$1;
    `, [userId]);

        return payments;
    } catch (error) {
        throw error;
    }
};


async function deletePayment(paymentId) {
    try {
        const { rows } = await db.query(`
        DELETE FROM payments
        WHERE payment_id=$1
        RETURNING *;
        `, [paymentId]);

        return rows;

    } catch (error) {
        throw error;
    }
}


async function updatePayments(paymentId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [payment] } = await client.query(`
            UPDATE payments
            SET ${ setString}
            WHERE id=${ paymentId}
            RETURNING *;
        `, Object.values(fields));

        return payment;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createPayment,
    getPaymentsByUserId,
    deletePayment,
    updatePayments
}