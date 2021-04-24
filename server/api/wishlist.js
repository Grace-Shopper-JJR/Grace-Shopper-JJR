const wishlistRouter = require('express').Router();

const {
    createWishListByUserId,
    updateWishListByUserId,
    getWishListByUserId,
    deleteWishListItem,
} = require('../db');

const { requireUser } = require('./utils');

wishlistRouter.use((req, res, next) => {
    console.log('A request is being made to /wishlist');
    next();
});

wishlistRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    console.log('Entering get wishlist item by userId route...', userId);

    try {
        const wishlistItem = await getWishListByUserId(userId);
        console.log('Retrieved wishlist item: ', wishlistItem);
        if (wishlistItem) {
            console.log('Begin res.send in wishlist...');
            res.send({
                message: 'Successfully retrieved user wishlist item.',
                wishlistItem,
                status: true
            });
        } else {
            next({
                name: "WishListItemRetrievalError",
                message: "Cannot find wishlist item."
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

wishlistRouter.post('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId);
    console.log('Req.user: ', req.user);
    console.log("Req.user.id: ", req.user.user_id);

    const { title, merchId } = req.body;
    const wishlistData = {
        title,
        merchId,
        userId
    };

    try {
        if (user && user.user_id === Number(userId)) {
            const wishlistItem = await createWishListByUserId(wishlistData);

            res.send({
                message: 'Successfully updated user wishlist item.',
                wishlistItem,
                status: true
            });
            console.log("Wishlist item log: ", wishlistItem);
        } else {
            next({
                name: "CreateWishListItemError",
                message: "Must be logged in to create wishlist items."
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

wishlistRouter.patch('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    const { title, merchId } = req.body;
    console.log("UserId: ", userId);
    console.log('Req.user: ', req.user);
    console.log("Req.user.user_id: ", req.user.user_id);
    try {
        if (user && user.user_id === Number(userId)) {

            const updatedWishlistItem = await updateWishListByUserId(user.user_id, {
                title
            });
            res.send({
                message: 'Successfully updated user wishlist item.',
                updatedWishlistItem,
                status: true,

            });
            console.log("Updated wishlist item: ", updatedWishlistItem);
        } else {
            next({
                name: "UpdateWishlistError",
                message: "You cannot update a wishlist item that is not yours."
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

wishlistRouter.delete('/:wishId', requireUser, async (req, res, next) => {
    console.log('In delete wishlist item route...');
    const { wishId } = req.params;

    try {
        const wishlistItemToDelete = await getWishListByUserId(wishId);

        if (wishlistItemToDelete && wishlistItemToDelete.userId === req.user.id) {
            const deletedWishListItem = await deleteWishListItem(wishlist.id);

            res.send({
                message: 'Wishlist item deleted!',
                deletedWishListItem,
                status: true
            });
        } else {
            // if there was a wishlist, throw UnauthorizedUserError, otherwise throw WishListNotFoundError
            next(wishlistItemToDelete ?
                {
                    name: "UnauthorizedUserError",
                    message: "You cannot delete a wishlist which is not yours"
                } :
                {
                    name: "WishListNotFoundError",
                    message: "That wishlist does not exist"
                });
        };

    } catch ({ name, message }) {
        next({ name, message })
    };
});

module.exports = wishlistRouter;