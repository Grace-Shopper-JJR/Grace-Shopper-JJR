const express = require('express');
const apiRouter = express.Router();

const {
    getAllMerchandise,
    createMerchandise,
    searchMerchandise,
    getMerchandiseById,
    getUserByUsername,
    createUser,
    createUserPreferences
} = require('../db')

// Merchandise Router

apiRouter.get('/merchandise', async (req, res, next) => {
    try {
        const merchandise = await getAllMerchandise()

        res.send(merchandise)

    } catch (error) {
        throw error;
    }
})

apiRouter.post('/merchandise', async (req, res, next) => {

    const { name, description, price, rating, cat } = req.body;

    try {
        const merch = await createMerchandise({ name, description, price, rating, cat });
        if (merch) {
            res.send({
                message: 'successfully created new item',
                status: true,
                merch
            })
        } else {
            next({
                error: 'FailedToCreateItemError',
                message: 'Unable to create new item'
            })
        }

    } catch ({ error, message }) {
        next({ error, message });
    }

})

apiRouter.post('/search', async (req, res, next) => {
    console.log('Entered POST /search');

    const { value, category } = req.body;

    console.log('From /Search:', value, category);

    try {
        const resp = await searchMerchandise(value, category);

        console.log('/Search results:', resp);

        if (resp.length) {
            res.send({
                message: 'Successfull search',
                status: true,
                data: resp
            })
        } else {
            next({ error: 'UnableToRetrieveSearchResultsError', message: 'Unable to retrieve search results. Please refine your search' })
        }

    } catch ({ error, message }) {
        next({ error, message })
    }

})

apiRouter.get('/search/:merchId', async (req, res, next) => {

    const { merchId } = req.params;

    try {
        const merch = await getMerchandiseById(merchId);

        if (merch) {
            console.log('Merch to send: ', merch)
            res.send({
                message: 'Successfully retrieved item',
                status: true,
                merch
            })
        } else {
            console.log('Failed to fetch')
            next({
                error: 'FailedToRetrieveItemByIdError',
                message: `Unable to retrieve item by id:${merchId} `
            })
        }
    } catch ({ error, message }) {
        next({ error, message })
    }
})

// Users Router

apiRouter.post('/register', async (req, res, next) => {
    const {
        username,
        password,
        firstname,
        lastname,
        street,
        city,
        state,
        zip,
        save_pmt,
        shipping
    } = req.body;

    console.log('Req.body: ', req.body);

    const SALT_COUNT = 10;

    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists',
                status: 'UserExists'
            });
        };
        if (password.length < 8) {
            next({
                name: 'PasswordTooShort',
                message: 'Password must be at least 8 characters',
                status: 'PasswordShort'
            })
            return;
        };
        bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
            const user = await createUser({
                username,
                password: hashedPassword,
                firstname,
                lastname,
            });
            const token = jwt.sign({
                id: user.user_id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            console.log("TOKEN", token);
            console.log('Create user preferences values: ', { userId: user.user_id, street, city, state, zip, save_pmt, shipping })
            const userPreferences = await createUserPreferences({
                userId: user.user_id,
                street,
                city,
                state,
                zip,
                save_pmt,
                shipping
            });
            console.log('New User Preference: ', userPreferences);
            user.userPreferences = userPreferences;
            delete user.password
            console.log('New User: ', user);
            res.send({
                message: "Thank you for signing up!",
                user,
                token,
                status: true
            });
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
});

apiRouter.post('/login', async (req, res, next) => {

    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    };

    try {
        const user = await getUserByUsername(username);

        const hashedPassword = user.password;
        console.log('HASHED PASSWORD: ', hashedPassword);
        console.log('PASSWORD', password);
        console.log('<><>', hashedPassword == hashedPassword);
        bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
            if (passwordsMatch) {
                const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.JWT_SECRET)
                delete user.password;
                res.send({
                    message: "you're logged in!",
                    user,
                    token: `${token}`
                });
                return token;
            } else {
                next({
                    name: 'IncorrectCredentialsError',
                    message: 'Username or password is incorrect',
                    status: 'UsernamePasswordIncorrect'
                });
            };
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = apiRouter;