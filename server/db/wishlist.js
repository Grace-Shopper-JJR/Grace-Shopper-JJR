const db = require('./database');

const { getUserByUserId } = require('./users');

async function createWishListByUserId({ merchId, title, userId }) {

    try {
        const { rows: result } = await db.query(`
        INSERT INTO wishlist ("merchId", title, "userId")
        VALUES ($1, $2, $3)
        ON CONFLICT ("userId", "merchId") DO NOTHING
        RETURNING *;
        `, [merchId, title, userId]);
        console.log('New wishlist item: ', result)

        return result;
    } catch (e) {
        console.log("Error creating wishlist item. ", e);
    };
};

async function updateWishListByUserId(userId, fields = {}) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    console.log(fields)
    try {
        const { rows: result } = await db.query(`
        UPDATE wishlist
        SET ${ setString}
        WHERE "userId" = ${ userId}
        RETURNING *;
        `, Object.values(fields));

        return result;
    } catch (e) {
        console.error(e);
    };
};

async function getWishListByUserId(userId) {

    try {
        const { rows } = await db.query(`
        SELECT *
        FROM wishlist
        JOIN merchandise ON wishlist."merchId" = merchandise.merch_id
        WHERE "userId" = $1;
        `, [userId]);

        return rows;
    } catch (e) {
        console.error(e);
    };
};

async function getWishlistItemByWishId(wishId) {

    try {
        const { rows: wishlistItem } = db.query(`
            SELECT *
            FROM wishlist
            WHERE "wish_id"=$1;
        `, [wishId]);

        return wishlistItem;
    } catch (e) {
        console.error('Error getting wishlist item by wishId', e);
    };
};

async function deleteWishListItem(wishId) {

    try {
        await db.query(`
        DELETE FROM wishlist
        WHERE wish_id=${ wishId}
        `, [wishId]);

    } catch (e) {
        console.error("must be logged in to remove wishlist", e);
    };
};

module.exports = {
    createWishListByUserId,
    updateWishListByUserId,
    getWishlistItemByWishId,
    getWishListByUserId,
    deleteWishListItem,
};