const userPrefsRouter = require('express').Router();

const { updateUserPreferences, getUserPreferencesByUserId, updateUser, getUserByUserId } = require('../db');
const { requireUser } = require('./utils');

userPrefsRouter.use((req, res, next) => {
    console.log('A request is being made to /userprefs');
    next();
});

userPrefsRouter.get('/:userId', requireUser, async (req, res, next) => {
    console.log('Calling on route to get user preferences by userId...');
    const { userId } = req.params;
    const user = req.user

    if (user && user.user_id === Number(userId)) {
        try {
            const userPreferences = await getUserPreferencesByUserId(userId);
            console.log('Retrieved User Preferences: ', userPreferences);

            res.send(userPreferences);
        } catch ({ name, message }) {
            next({ name, message });
        };
    };
});

userPrefsRouter.patch('/:userId', requireUser, async (req, res, next) => {
    console.log('You are in the update user profile route!');
    const { userId } = req.params;
    const { firstname, lastname, street, city, state, zip, save_pmt, shipping } = req.body;
    const user = req.user;
    console.log("UserId: ", userId);
    console.log('Req.user: ', req.user);
    console.log("Req.user.id: ", req.user.user_id);

    try {
        if (user && user.user_id === Number(userId)) {
            const updatedUserInfo = await updateUser(userId, {
                firstname,
                lastname
            });

            delete updatedUserInfo.password;

            const updatedUserPreferences = await updateUserPreferences(userId, {
                street,
                city,
                state,
                zip,
                save_pmt,
                shipping
            });

            res.send({
                message: "You have successfully updated your user profile.",
                updatedUserInfo,
                updatedUserPreferences,
                status: true
            });
            console.log("Updated UserInfo: ", updatedUserInfo);
            console.log("Updated UserPreferences: ", updatedUserPreferences);
        } else {
            next({
                name: "UpdateUserPreferenceError",
                message: "There was an error updating the user preferences!"
            })
        };
    } catch ({ name, message }) {
        next({ name, message });
    };

})

module.exports = userPrefsRouter;