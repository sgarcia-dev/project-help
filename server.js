'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

// Here we use destructuring assignment with renaming so the two variables
// called router (from ./users and ./auth) have different names
// For example:
// const actorSurnames = { james: "Stewart", robert: "De Niro" };
// const { james: jimmy, robert: bobby } = actorSurnames;
// console.log(jimmy); // Stewart - the variable name is jimmy, not james
// console.log(bobby); // De Niro - the variable name is bobby, not robert
const { router: usersRouter } = require('./users');
const {router: gameEventsRouter } = require('./gameEvents');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

// Logging
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/gameevents', gameEventsRouter);
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);


const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useNewUrlParser: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };


/*const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.Promise = global.Promise;
const router = express.Router();
const {DATABASE_URL, PORT} = require('./config');
const {User,gameEvent
} = require('./models');
const app = express();
app.use(morgan('common'));
app.use(express.json());

passport.use(localStrategy);
passport.use(jwtStrategy);


//Route for games
router.get('/', (req, res) => {
    res.json(gameEvents);
});

router.get('/users', (req, res) => {
    User
        .find()
        .then(users => {
            res.json(users.map(user => {
                return {
                    id: user._id,
                    name: `${user.firstName} ${user.lastName}`,
                    userName: user.userName
                };
            }));
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Something wrong'
            });
        });
    //const gameEvent = gameEvents.find(c => c.id === parseInt(req.params.id));
    //if (!gameEvent) return res.status(404).send('Game with given ID not found.');
    //res.json(gameEvent); //res.send(req.params.id);
});

//app.get('/api/gameEvents/:host', (req, res) => {
//    res.send(req.query);
//});

router.post('/users', (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'userName'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });
    User
        .findOne({
            userName: req.body.userName
        })
        .then(user => {
            if (user) {
                const message = `Username already taken`;
                console.error(message);
                return res.status(400).send(message);
            } else {
                User
                    .create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userName: req.body.userName
                    })
                    .then(user => res.status(201).json({
                        _id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        userName: user.userName
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            error: 'Something went wrong'
                        });
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});

app.put('/users/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    const updated = {};
    const updateableFields = ['firstName', 'lastName', 'userName'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    User
        .findOne({
            userName: updated.userName || '',
            _id: {
                $ne: req.params.id
            }
        })
        .then(user => {
            if (user) {
                const message = `Username already taken`;
                console.error(message);
                return res.status(400).send(message);
            } else {
                User
                    .findByIdAndUpdate(req.params.id, {
                        $set: updated
                    }, {
                        new: true
                    })
                    .then(updatedUser => {
                        res.status(200).json({
                            id: updatedUser.id,
                            name: `${updatedUser.firstName} ${updatedUser.lastName}`,
                            userName: updatedUser.userName
                        });
                    })
                    .catch(err => res.status(500).json({
                        message: err
                    }));
            }
        });
});

app.delete('/users/:id', (req, res) => {
    gameEvent
        .remove({
            user: req.params.id
        })
        .then(() => {
            User
                .findByIdAndRemove(req.params.id)
                .then(() => {
                    console.log(`Deleted event owned by and user with id \`${req.params.id}\``);
                    res.status(204).json({
                        message: 'success'
                    });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        });
});



app.get('/gameEvents', (req, res) => {
    GameEvent
        .find()
        .then(gameEvents => {
            res.json(gameEvents.map(gameEvent => {
                return {
                    id: gameEvent._id,
                    host: gameEvent.user,
                    gameTitle: gameEvent.gameTitle,
                    maxPlayers: gameEvent.maxPlayers,
                    gameDate: gameEvent.gameDate,
                    gameTime: gameEvent.gameTime,
                    location: gameEvent.location,
                    comments: gameEvent.comments,
                    attendees: gameEvent.attendees,
                    publishedAt: gameEvent.publishedAt
                };
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        });
});

app.get('/gameEvents/:id', (req, res) => {
    GameEvent
        .findById(req.params.id)
        .then(gameEvent => {
            res.json({
                id: gameEvent._id,
                host: gameEvent.user,
                gameTitle: gameEvent.gameTitle,
                maxPlayers: gameEvent.maxPlayers,
                gameDate: gameEvent.gameDate,
                gameTime: gameEvent.gameTime,
                location: gameEvent.location,
                comments: gameEvent.comments,
                attendees: gameEvent.attendees,
                publishedAt: gameEvent.publishedAt
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});

app.post('/gameEvents', (req, res) => {
    const requiredFields = ['gameTitle', 'host', 'gameTime'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    User
        .findById(req.body.user_id)
        .then(user => {
            if (user) {
                GameEvent
                    .create({
                        host: req.body.id,
                        gameTitle: req.body.gameTitle,
                        maxPlayers: req.body.maxPlayers,
                        gameDate: req.body.gameDate,
                        gameTime: req.body.gameTime,
                        location: req.body.location,
                        comments: req.body.comments,
                        attendees: req.body.attendees,
                        publishedAt: req.body.publishedAt
                    })
                    .then(gameEvent => res.status(201).json({
                        id: gameEvent.id,
                        host: `${host.firstName} ${host.lastName}`,
                        gameTitle: gameEvent.gameTitle,
                        maxPlayers: gameEvent.maxPlayers,
                        gameDate: gameEvent.gameDate,
                        gameTime: gameEvent.gameTime,
                        location: gameEvent.location,
                        comments: gameEvent.comments,
                        attendees: gameEvent.attendees,
                        publishedAt: gameEvent.publishedAt
                    }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({
                            error: 'Something went wrong'
                        });
                    });
            } else {
                const message = `User not found`;
                console.error(message);
                return res.status(400).send(message);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went horribly awry'
            });
        });
});




app.put('/gameEvents/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    const updated = {};
    const updateableFields = ['gameTitle', 'gameDate', 'gameTime', 'maxPlayers', 'location'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    GameEvent
        .findByIdAndUpdate(req.params.id, {
            $set: updated
        }, {
            new: true
        })
        .then(updatedGameEvent => res.status(200).json({
            id: updatedGameEvent.id,
            gameTitle: updatedGameEvent.gameTitle,
            maxPlayers: updatedGameEvent.maxPlayers,
            gameDate: updatedGameEvent.gameDate,
            gameTime: updatedGameEvent.gameTime,
            location: updatedGameEvent.location,
            comments: updatedGameEvent.comments,
            attendees: updatedGameEvent.attendees,
            publishedAt: updatedGameEvent.publishedAt
        }))
        .catch(err => res.status(500).json({
            message: err
        }));
});
app.delete('/gameEvents/:id', (req, res) => {
    GameEvent
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted event with id \`${req.params.id}\``);
            res.status(204).end();
        });
});



app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
  });
  
  // closeServer needs access to a server object, but that only
  // gets created when `runServer` runs, so we declare `server` here
  // and then assign a value to it in run
  let server;
  
  // this function connects to our database, then starts the server
  function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }
  
  // this function closes the server, and returns a promise. we'll
  // use it in our integration tests later.
  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  
  module.exports = { runServer, app, closeServer };*/