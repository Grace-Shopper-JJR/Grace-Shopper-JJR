const client = require('./client_db');

//each teammember please create seed method to test your

const {
    createMerchandise,
    addCategory,
    updateMerchandise,
    createMerchandiseReview,
    getMerchandiseById,
    getAllMerchandise,
    createUser,
    updateUser,
    getUserByUserId,
    getUserByUsername,
    getAllUsers,
    createUserPreferences,
    updateUserPreferences,
    getUserPreferencesByUserId,
    createPayment,
    createWishListByUserId,
    getWishListByUserId,

} = require('./index');

const faker = require('faker');
const chalk = require('chalk');
const { seed } = require('faker');

const bcrypt = require('bcrypt');
SALT_COUNT = 10;

async function dropTables() {

    try {
        console.log('Dropping all tables...');

        await client.query(`
            DROP TABLE IF EXISTS payments;
            DROP TABLE IF EXISTS blogs;
            DROP TABLE IF EXISTS wishlist;
            DROP TABLE IF EXISTS userPreferences;
            DROP TABLE IF EXISTS orderItem;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS images;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS merchandise;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS users;

        `);

        console.log('Successfully dropped all tables.');

    } catch (error) {
        console.log(chalk.red('Error dropping tables!'));
        throw error;
    };

};

async function createTables() {

    try {

        console.log('Building new tables...');

        console.log('Building users...')
        await client.query(`
            CREATE TABLE users(
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                save_pmt BOOLEAN DEFAULT false,
                active BOOLEAN DEFAULT true
            );
        `);

        console.log('Creating categories...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories(
                cat_id SERIAL PRIMARY KEY,
                "Catname" VARCHAR(255) NOT NULL
            );
        `);

        console.log('Creating merchandise...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS merchandise(
                merch_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price MONEY NOT NULL,
                rating INTEGER,
                cats INTEGER REFERENCES categories(cat_id)
                
            );
        `);

        console.log('Creating reviews...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                review_id SERIAL PRIMARY KEY,
                author INTEGER REFERENCES users(user_id) NOT NULL,
                "merchId" INTEGER REFERENCES merchandise(merch_id)NOT NULL,
                rating INTEGER,
                description TEXT NOT NULL
            );
        `);

        console.log('Creating images...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS images(
                imageId SERIAL PRIMARY KEY,
                merch_id SERIAL REFERENCES merchandise(merch_id)
            );
        `);

        console.log('Creatings blogs...');
        await client.query(` 
            CREATE TABLE IF NOT EXISTS blogs(
                blog_id SERIAL PRIMARY KEY,
                "merchId" INTEGER REFERENCES merchandise(merch_id),
                title VARCHAR(255) NOT NULL,
                "blogText" TEXT NOT NULL,
                "authorId" INTEGER REFERENCES users(user_id)
            );
        `);

        console.log('Creating wishlist...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS wishlist(
                wish_id SERIAL PRIMARY KEY,
                "merchId" INTEGER REFERENCES merchandise(merch_id),
                title VARCHAR(255),
                "userId" INTEGER REFERENCES users(user_id),
                CONSTRAINT UC_wishlist UNIQUE ("userId", "merchId")
            );
        `);

        console.log('Creating orders...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders(
                "orderId" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(user_id),
                status BOOLEAN DEFAULT true
            );
        `);

        console.log('Creating orderItem...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS orderitem(
                item_id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders("orderId"),
                "merchId" INTEGER REFERENCES merchandise(merch_id),
                quantity INTEGER DEFAULT 1,
                price NUMERIC NOT NULL
            );
        `);

        console.log('Creating userPreferences...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS userPreferences(
                preference_id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(user_id),
                street VARCHAR(255) NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                zip VARCHAR(255) NOT NULL,
                save_pmt BOOLEAN DEFAULT FALSE,
                shipping VARCHAR(255)
            );
        `);

        console.log('Creating payments...')
        await client.query(`
            CREATE TABLE IF NOT EXISTS payments(
                payment_id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(user_id),
                name VARCHAR(255) NOT NULL,
                number INTEGER UNIQUE NOT NULL,
                cardType VARCHAR(255),
                CID INTEGER NOT NULL,
                expiration DATE NOT NULL
            );
        `);

        console.log('Tables successfully built!');
    } catch (error) {
        console.log(chalk.red('Error creating tables!'));
        throw error;
    };

};

async function createInitialMerchandise() {
    try {
      console.log('Starting to create merchandise...');
  
      const merchandiseToCreate = [
        { name: 'FemmeDansUnFauteuil', category: 'Cubism', description: '1943 Original Picasso Lithograph.', price: '1025', rating: '10' },
        { name: 'Weeping Woman', category: 'Cubism', description: 'Old Master Signed Picasso 1962', price: '2542', rating: '10' },
        { name: 'Figure of a Woman', category: 'Cubism', description: 'Juan Gris.', price: '132', rating: '8' },
        { name: 'Three Women', category: 'Cubism', description: 'FernandLeger', price: '108', rating: '6' },
        { name: 'The Knife Grinder', category: 'Cubism', description: 'KazimirSeverinovichMalevich', price: '101', rating: '10' },
        { name: 'Symphony', category: 'Cubism', description: 'Michail Menkov', price: '101', rating: '9' },
        { name: 'The Confetti Garden', category: 'Impressionism', description: 'Jinlu', price: '1976', rating: '8' },
        { name: 'Impressionist Lake Scene', category: 'Impressionism', description: 'John Clymer', price: '975', rating: '10' },
        { name: 'Impressionist French Landscape', category: 'Impressionism', description: 'Unknown', price: '750', rating: '7' },
        { name: 'Spring in Central Park', category: 'Impressionism', description: 'Natasha Kramskaya', price: '725', rating: '10' },
        { name: 'Signed Original Street Scene Paris', category: 'Impressionism', description: 'Unknown', price: '695', rating: '9' },
        { name: 'Floral Landscape Flower Fields IV', category: 'Impressionism', description: 'Michael Budden', price: '600', rating: '10' },
        { name: 'Cash Owns Everything Around Me', category: 'Popart', description: 'ResatioAdiPutra', price: '250', rating: '10' },
        { name: 'Massive Stars Collapse III', category: 'Popart', description: 'ResatioAdiPutra', price: '58', rating: '8' },
        { name: 'PissOff', category: 'Popart', description: 'JirapatTatsanasomboon', price: '13000', rating: '10' },
        { name: 'DesireIngrained', category: 'Popart', description: 'JirapatTatsanasomboon', price: '13000', rating: '9' },
        { name: 'SilaturahmiGorillaGlass', category: 'Popart', description: 'HendraHeheHarsono', price: '3000', rating: '7' },
        { name: 'CapitalNoise', category: 'Popart', description: 'HendraHeheHarsono', price: '5000', rating: '10' },
        { name: 'The River Seine', category: 'PostImpressionalism', description: 'Adolph Clary Baroux', price: '28500', rating: '9' },
        { name: 'Ballerinas Paris Opera', category: 'PostImpressionalism', description: 'Jean Louis Marcel Cosson', price: '13605', rating: '10' },
        { name: 'Early Morning Hyde Park London', category: 'PostImpressionalism', description: 'Elliott Seabrooke', price: '7396', rating: '7' },
        { name: 'Cafe Porto Fino Italy', category: 'PostImpressionalism', description: 'Forrest Hewit', price: '5973', rating: '10' },
        { name: 'Village in Mexico', category: 'PostImpressionalism', description: 'JacquesZucker', price: '5250', rating: '9' },
        { name: 'Rural Farm Scene', category: 'PostImpressionalism', description: 'Ludvig Jaconbsen', price: '4800', rating: '10' },
        { name: 'Contemporary1', category: 'Contemporary', description: 'A Contemporary Artpiece.', price: '675', rating: '10' },
        { name: 'Contemporary2', category: 'Contemporary', description: 'A Contemporary Artpiece.', price: '649', rating: '6' },
        { name: 'Contemporary3', category: 'Contemporary', description: 'A Contemporary Artpiece.', price: '659', rating: '8' },
        { name: 'Contemporary4', category: 'Contemporary', description: 'A Contemporary Artpiece.', price: '685', rating: '5' },
        { name: 'Contemporary5', category: 'Contemporary', description: 'A Contemporary Artpiece.', price: '166', rating: '9' },
        { name: 'Contemporary6', category: 'Contemporary', description: 'A Contemporary Artpiece.', price: '399', rating: '7' }
      ]
      const merchandise = await Promise.all(merchandiseToCreate.map(createMerchandise));
  
      console.log('merchandise created:');
      console.log(merchandise);
  
      console.log('Finished creating merchandise!');
    } catch (error) {
      console.error('Error creating merchandise!');
      throw error;
    }
  }

async function createInitialUsers() {

    try {
        console.log("Starting to create users...");

        const seededUsers = [
            {
                username: 'groovyash',
                password: 'hailtotheking',
                firstname: 'Ashley',
                lastname: 'Williams'
            },

            {
                username: 'batman',
                password: 'thedarkknight',
                firstname: 'Bruce',
                lastname: 'Wayne'
            },
            {
                username: 'turdferguson',
                password: 'uraturd99',
                firstname: 'Thomas',
                lastname: 'Ferguson'
            }
        ]

        console.log(seededUsers);

        await Promise.all(seededUsers.map(async user => {
            const hashedPassword = bcrypt.hashSync(user.username, SALT_COUNT);
            const seededUser = await createUser({
                ...user,
                password: hashedPassword
            });
            return seededUser;
        }));

        console.log("Finished creating users!");
    } catch (error) {
        console.error(chalk.red('There was a problem creating users!', error));
        throw error;
    };

};

async function createInititialUserPrefs() {

    try {
        const seededUserPrefs = [
            {
                userId: 1,
                street: '1234 Somestreet Lane',
                city: 'Somecity',
                state: 'CA',
                zip: 54321,
                save_pmt: false,
                shipping: 'FedEx'
            },

            {
                userId: 2,
                street: '1234 Wayne Manor Dr',
                city: 'Gotham City',
                state: 'NY',
                zip: 12345,
                save_pmt: true,
                shipping: 'USPS'
            },
            {
                userId: 3,
                street: '9876 Boulevard Ave',
                city: 'Big City',
                state: 'PA',
                zip: 67890,
                save_pmt: true,
                shipping: 'UPS'
            }

        ]

        console.log('Seeded User Preferences: ', seededUserPrefs);

        await Promise.all(seededUserPrefs.map(async userPref => {
            const seededUserPref = await createUserPreferences(userPref);
            return seededUserPref;
        }));


    } catch (error) {
        console.log(chalk.red('There was an error creating user preferences!', error));
        throw error;
    };
};

async function createInitialPayments() {
    try {
        console.log('Starting to create payment...');

        const seededPayments = [
            {
                userId: 2,
                name: 'Bruce Wayne',
                number: 123,
                cid: 123,
                expiration: "2020-01-01"
            },

            {
                userId: 1,
                name: 'Ashley Williams',
                number: 456,
                cid: 098,
                expiration: "2020-03-05"
            },
        ];

        const createdPayment = await Promise.all(seededPayments.map(async payment => {
            const singleSeededPayment = await createPayment(payment);
            return singleSeededPayment;
        }));

        console.log('Finished creating payments!');
        return createdPayment
    } catch (error) {
        console.error(chalk.red('There was a problem creating payment!', error));
        throw error;
    }
}

async function createInitialWishlist() {
    try {
        const seedWishlist = [
            {
                "merchId": 1,
                title: "graduation day",
                "userId": 1
            }
        ]

        await Promise.all(seedWishlist.map(async wishlist => {
            const seededwishlist = await createWishListByUserId(wishlist);
            return seededwishlist;
        }));

        const list = await getWishListByUserId(1);
        console.log('getting wishlist item', list);


    } catch (e) {
        console.log(chalk.red('There was an error creating wishlist!', e));
        console.error(e);
    };
};

async function initializeSeansStuff() {

    await createInitialUsers();
    await createInititialUserPrefs()


    const catArray = ['clothing', 'climbing', 'hiking', 'sports', 'camping'];

    const newCategory = await Promise.all(catArray.map((cat) => addCategory(cat)));
    console.log(newCategory);


    // await initializeMerchandise();
}

async function testDB() {

    try {
        console.log(chalk.yellow('Starting to test the database...'));

        console.log('Calling getAllUsers...');
        const allUsers = await getAllUsers();
        console.log('All Users: ', allUsers);

        console.log('Calling getUserByUserId with user_id 1');
        const userOne = await getUserByUserId(1);
        console.log("User One: ", userOne);

        console.log('Calling getUserByUsername with batman');
        const batman = await getUserByUsername('batman');
        console.log('Batman: ', batman);

        console.log('Calling creatingInitialPayments...');
        const createPayment = await createInitialPayments();
        console.log('Payment: ', createPayment);

        const catArray = ['tents', 'sleeping bags', 'clothing', 'outdoor gear'];

        const newCategory = await Promise.all(catArray.map((cat) => addCategory(cat)));
        console.log(newCategory);


        // await initializeMerchandise();
        await updateMerchandise(2, { price: 5, description: faker.company.catchPhrase });
        await createMerchandiseReview(2, 1, 5, 'I have no idea what this is or why I bought it...');
        await getAllMerchandise();
        await getMerchandiseById(2);

        console.log(chalk.yellow('Finished testing the database.'));
    } catch (error) {
        console.error(chalk.red('There was an error testing the database!', error));
        throw error;
    };
}

async function startDb() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        // await testDB();
        await createInitialMerchandise();
        await createInitialUsers();
        await createInititialUserPrefs();
        // await initializeSeansStuff();
        await createInitialWishlist();
        await createInitialPayments();
    } catch (error) {
        console.error(chalk.red("Error during startDB"));
        throw error;
    };

};

startDb();