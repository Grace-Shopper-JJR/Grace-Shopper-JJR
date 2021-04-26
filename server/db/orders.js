const db = require('./database');

async function findOrCreateActiveOrderByUserId(userId) {
    console.log('db createOrder with userID:', userId);
    try {
        const { rows: [activeCart] } = await db.query(`
            SELECT * FROM orders
            WHERE "userId"=$1 AND status = true;
        `, [userId]);

        if (activeCart) {
            console.log('Cart Retrieved:', activeCart);
            return activeCart;
        }

        const { rows: [newCart] } = await db.query(`
        INSERT INTO orders("userId")
        VALUES($1)
        RETURNING *;
    `, [userId]);

        console.log('Successfully created db new cart:', newCart);
        return newCart;
    } catch (error) {
        throw error;
    }
}

async function createOrderItem(orderId, { merchId, quantity, price }) {
    console.log('in Db createOrderItem with order ID:', orderId, 'with items: ', merchId, quantity, price);
    try {
        const { rows: [orderItem] } = await db.query(`
        INSERT INTO orderItem("merchId", quantity, price, "orderId")
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `, [merchId, quantity, price, orderId]);

        console.log('New Item created for order: ', orderId, ':', orderItem);
        return orderItem
    } catch (error) {
        throw error;
    }
}

//getUserOrdersByUsername(username)

async function getUserOrdersByUsername(userName) {
    try {
        const { rows: [orders] } = await db.query(`
        SELECT * FROM orders
        WHERE username=$1;
    `, [userName]);

        return orders;
    } catch (error) {
        throw error;
    }
};

//getUserOrdersByUserId(userId)

async function getUserOrdersByUserId(userId) {
    try {
        const { rows: [orders] } = await db.query(`
        SELECT * FROM orders
        WHERE id=$1;
    `, [userId]);

        return orders;
    } catch (error) {
        throw error;
    }
};

//updateUserOrderByOrderId(orderId)

async function updateUserOrderByOrderId(orderId, fields = {}) {

    console.log('db updateUserOrder', orderId, fields);

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [order] } = await db.query(`
            UPDATE orders
            SET ${ setString}
            WHERE "orderId"=${ orderId}
            RETURNING *;
        `, Object.values(fields));

        console.log('db successfully updated order:', order);
        return order;
    } catch (error) {
        throw error;
    };
};

async function deleteOrderByOrderId(orderId) {
    try {
        const { rows: [orderItems] } = await db.query(`
    DELETE FROM orderItem
    WHERE "orderId"=${orderId}
    RETURNING *;
    `);


        const { rows: [order] } = await db.query(`
    DELETE FROM orders
    WHERE id=${orderId}
    RETURNING *;
    `);

        order.items = orderItems;
        return order;
    } catch (error) {
        throw error;
    }

}

async function deleteItemByOrderId(item_Id, orderId) {
    console.log('Entered db deleteItemByOrderId');
    console.log('OrderId:', orderId, ' itemId:', item_Id)
    try {
        const { rows: [item] } = await db.query(`
        DELETE from orderItem
        WHERE "orderId" = $1 AND
        item_id = $2
        RETURNING *;
        `, [orderId, item_Id]);

        console.log('Successfully deleted item: ', item);
        return item;

    } catch (error) {
        throw error;
    }

}

async function getActiveOrderForUser(userId) {
    console.log('Entered db getActiveOrderForUser with userId:', userId);

    try {
        const { rows: [order] } = await db.query(`
        SELECT * FROM orders
        WHERE orders."userId" = $1
        AND status = true;
    `, [userId]);

        if (!order) {
            console.log('no active orders')
            return;
        }

        const orderId = order.orderId;
        console.log('order retrieved!:', orderId)
        const { rows: items } = await db.query(`
        SELECT * FROM "orderitem"
        WHERE "orderId" = $1;
    `, [orderId])

        order.items = items
        console.log('Successfully retrieved active order:', order);
        return order;

    } catch (error) {
        throw error;
    }


}

module.exports = {
    getUserOrdersByUsername,
    getUserOrdersByUserId,
    updateUserOrderByOrderId,
    createOrderItem,
    deleteItemByOrderId,
    deleteOrderByOrderId,
    findOrCreateActiveOrderByUserId,
    getActiveOrderForUser
}