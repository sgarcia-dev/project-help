const express = require('express');
const router = express.Router();
const passport = require("passport");
const {GameEvent} = require("./models");
const {jwtStrategy} = require("../auth");
const morgan = require('morgan');
const app = express();
app.use(morgan('common'));
app.use(express.json());
const jwtAuth = passport.authenticate("jwt", {session: false});
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const jsonParser = bodyParser.json();
//app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', jwtAuth, (req, res) => {
    if (req.user) {
        GameEvent
            .find({
                user_id: req.user.id
            })
            .then(gameEvents => {
                res.json(gameEvents.map(gameEvent => {
                    return {
                        id: gameEvent._id,
                        host: gameEvent.user,
                        gameTitle: gameEvent.gameTitle,
                        maxPlayers: gameEvent.maxPlayers,
                        gameDate: gameEvent.gameDate,
                        gameTime: gameEvent.gameTime,
                        address: gameEvent.address,
                        //comments: gameEvent.comments,
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
            })
    } else {
        res.status(400);
    }
});

router.get('/:id', jwtAuth, (req, res) => {
    if (req.user) {
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
                        address: gameEvent.address,
                        //comments: gameEvent.comments,
                        attendees: gameEvent.attendees,
                        publishedAt: gameEvent.publishedAt
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: 'something went terribly wrong'
                });
            })
    } else {
        res.status(400);
    }
});

router.post('/', jsonParser, jwtAuth, (req, res) => {
    const requiredFields = ['gameTitle', 'host', 'gameTime'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });
      //}
/*
        const propertiesNotFound = [];
        const propertiesToCheck = ['gameTitle', 'host', 'gameTime'];
        const objectToCheck = req.body;
        propertiesToCheck.forEach(propertyName => {
            if (!objectToCheck.hasOwnProperty(propertyName)) {
                propertiesNotFound.push(propertyName);
            }
        });
        if ( propertiesNotFound > 0) {
            const message = `Missing \`${}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }*/
  

   // if (req.user) {
       // User
           // .findById(req.body.user_id)
          //  .then(user => {
               // if (user) {
                    GameEvent
                        .create({
                            host: req.body.id,
                            gameTitle: req.body.gameTitle,
                            maxPlayers: req.body.maxPlayers,
                            gameDate: req.body.gameDate,
                            gameTime: req.body.gameTime,
                            address: req.body.address,
                            //comments: req.body.comments,
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
                            address: gameEvent.address,
                            //comments: gameEvent.comments,
                            attendees: gameEvent.attendees,
                            publishedAt: gameEvent.publishedAt
                        }))
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({
                                error: 'Something went wrong'
                            });
                        });
               // } //else {
               //    const message = `User not found`;
               //     console.error(message);
               //     return res.status(400).send(message);
               // }
            //}
            //.catch(err => {
           //     console.error(err);
          //      res.status(500).json({
          //          error: 'something went horribly awry'
               // });
          //  });
    //}
});


router.put('/:id', jsonParser, jwtAuth, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    if (req.user) {
        const updated = {};
        const updateableFields = ['gameTitle', 'gameDate', 'gameTime', 'maxPlayers', 'address'];
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
                address: updatedGameEvent.address,
                //comments: updatedGameEvent.comments,
                attendees: updatedGameEvent.attendees,
                publishedAt: updatedGameEvent.publishedAt
            }))
            .catch(err => res.status(500).json({
                message: err
            }));
    }
});


router.delete('/:id', jwtAuth, (req, res) => {
    if (req.user) {
    GameEvent
        .findByIdAndRemove(req.params.id)
        .then(() => {
            //console.log(`Deleted event with id \`${req.params.id}\``);
            res.status(204).json({message: `Deleted event with id \`${req.params.id}\``});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: 'Something went wrong'});
        });
    }
});


  module.exports = { router};