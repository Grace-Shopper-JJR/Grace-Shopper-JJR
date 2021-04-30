const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET = 'neverTell' } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  // const auth = req.header('Authorization');
  const auth = req.headers.authorization;

  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;
      

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

const healthRouter = require('./health');
apiRouter.use('/health', healthRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const activitiesRouter = require('./activities');
apiRouter.use('/activities', activitiesRouter);

const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

const routine_activitiesRouter = require('./routine_activities');
apiRouter.use('/routine_activities', routine_activitiesRouter);


module.exports = apiRouter;