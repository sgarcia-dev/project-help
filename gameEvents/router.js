const express = require('express');
const router = express.Router();
const passport = require("passport");
const {
    GameEvent
} = require("./models");
const {
    User
} = require("../users/models");
const {
    jwtStrategy
} = require("../auth");
const morgan = require('morgan');
//const router = express();
router.use(morgan('common'));
router.use(express.json());
const jwtAuth = passport.authenticate("jwt", {
    session: false
});

//const jsonParser = bodyParser.json();
//app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', jwtAuth, (req, res) => { //'/', jwtAuth, (re
    //if (req.user) { //do i need this
    //console.log("requser " + req.user);
    GameEvent
        .find() //({})
        //   .populate('user') //user
        .populate('user')
        .then(gameEvents => {
            console.log(gameEvents);
            res.json(gameEvents.map(gameEvent => {
                //console.log('gameEvent', gameEvent.user);
                return {
                    id: gameEvent._id,
                    //user: gameEvent.userName, 
                    //user: gameEvent.user,
                    user: gameEvent.user,
                    maxPlayers: gameEvent.maxPlayers,
                    gameTitle: gameEvent.gameTitle,
                    gameDate: gameEvent.gameDate,
                    gameTime: gameEvent.gameTime,
                    address: gameEvent.address,
                    gameInfo: gameEvent.gameInfo
                };
            }));

            //console.log(gameEvents);//res.json(gameEvents); //how to return serialized version to get address?
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        })
    //} else {
    //    res.status(400);
    //}

});

router.get('/:id', jwtAuth, (req, res) => {
    //if (req.user) {
    if (!(GameEvent.findById(req.params.id))) {
        return res.status.send(204);
    } else {
        GameEvent.findById(req.params.id)
            .populate('user')
            .then(gameEvent => {
                return res.status(200).json(
                    gameEvents.map(gameEvent => gameEvent.serialize()))
                //if doesnt exist return 404
                /*res.json({
                    id: gameEvent._id,
                    user: req.user.id,
                    maxPlayers: gameEvent.maxPlayers,
                    gameTitle: gameEvent.gameTitle,
                    gameDate: gameEvent.gameDate,
                    gameTime: gameEvent.gameTime,
                    address: gameEvent.address,
                    gameInfo: gameEvent.gameInfo
                });*/
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: 'something went terribly wrong'
                });
            })
    }
    //} else {
    //     res.status(400);
    // }
    //};
});

router.post('/', jwtAuth, (req, res) => {
    const requiredFields = ['gameTitle', 'gameDate', 'maxPlayers', 'gameTime'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    //if (req.user) {
    //   User
    //    .findById(req.body.user_id)
    //   .then(user => {
    //      if (user) {
    gameEvent = req.body;
    //U/ser.findById(req.body.user_id)
    //.then(user)
    console.log(req.user.id);
    console.log('req.user', req.user);
    const newGame = {
        //user: req.user.id, //req.body.id,//req.user.username,/
        //id: gameEvent._id,
        user: req.user.id,
        //username: req.user.username,
        maxPlayers: gameEvent.maxPlayers,
        gameTitle: gameEvent.gameTitle,
        gameDate: gameEvent.gameDate,
        gameTime: gameEvent.gameTime,
        address: gameEvent.address,
        gameInfo: gameEvent.gameInfo
    };
    GameEvent.create(newGame)
        .then(createdUser => {
            return res.status(201).json(createdUser.serialize());
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    /* .create({
         //user: req.user.id, //req.body.id,//req.user.username,/
         //id: gameEvent._id,
         user: req.user.id,//username: req.user.username,
         maxPlayers: gameEvent.maxPlayers,
         gameTitle: gameEvent.gameTitle,
         gameDate: gameEvent.gameDate,
         gameTime: gameEvent.gameTime,
         address: gameEvent.address,
         gameInfo: gameEvent.gameInfo
     })
     .then(gameEvent => res.status(201).json({
         //gameEvent
         user: `${user.username}`,
         id: gameEvent.id,
         //user: gameEvent.user,//`${user.firstName} ${user.lastName}`,
         gameTitle: gameEvent.gameTitle,
         maxPlayers: gameEvent.maxPlayers,
         gameDate: gameEvent.gameDate,
         gameTime: gameEvent.gameTime,
         address: gameEvent.address,
         //comments: gameEvent.comments,
         //attendees: gameEvent.attendees,
         //publishedAt: gameEvent.publishedAt
     }))
     .catch(err => {
         console.error(err);
         res.status(500).json({
             error: 'Something went wrong'
         });
     });
     */
    //  } //else {
    //  const message = `User not found`;
    //  console.error(message);
    //   return res.status(400).send(message);
    //\\ })
    //.catch(err => {
    //     console.error(err);
    //      res.status(500).json({
    //          error: 'something went horribly awry'
    // });
    //  });
    // } else {
    //     console.error(err);
    // }
});


router.put('/:id', jwtAuth, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        return res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }
    if (!(req.user.id === req.body.user)) {
        return res.status(400).json({
            error: 'Request user id and request gameEvent creator id values must match'
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
                id: updatedGameEvent._id,
                user: updatedGameEvent.user,
                maxPlayers: updatedGameEvent.maxPlayers,
                gameTitle: updatedGameEvent.gameTitle,
                gameDate: updatedGameEvent.gameDate,
                gameTime: updatedGameEvent.gameTime,
                address: updatedGameEvent.address,
                gameInfo: updatedGameEvent.gameInfo
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
                res.status(204).json({
                    message: `Deleted event with id \`${req.params.id}\``
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: 'Something went wrong'
                });
            });
    }
});


module.exports = {
    router
};