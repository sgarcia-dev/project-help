const express = require('express');
const router = express.Router();
const passport = require("passport");
const {
    GameEvent
} = require("./models");
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

router.get('/', (req, res) => { //'/', jwtAuth, (re
    GameEvent
        .find() //({})
        .populate('user')
        .then(gameEvents => {
            res.json(gameEvents.map(gameEvent => {
                return {
                    id: gameEvent._id,
                    //host: gameEvent.hostName,
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
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        })
});

router.get('/:id', (req, res) => {
    //if (req.user) {
    if (!(GameEvent.findById(req.params.id))) {
        return res.status.send(204);
    } else {
        GameEvent.findById(req.params.id)
            .then(gameEvent => { //if doesnt exist return 404
                res.json({
                    id: gameEvent._id,
                    maxPlayers: gameEvent.maxPlayers,
                    gameTitle: gameEvent.gameTitle,
                    gameDate: gameEvent.gameDate,
                    gameTime: gameEvent.gameTime,
                    address: gameEvent.address,
                    gameInfo: gameEvent.gameInfo
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: 'something went terribly wrong'
                });
            })
        //}
        // } else {
        //     res.status(400);
        // }
    };
});

router.post('/', (req, res) => {
    const requiredFields = ['gameTitle', 'gameDate', 'maxPlayers', 'gameTime'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });
    //console.log(req.user);

    //}
    // if (req.user) {
    // User
    // .findById(req.body.user_id)
    //  .then(user => {
    // if (user) {
    GameEvent
        .create({
            //host: req.user.id, //req.body.id,//req.user.username,/
            gameTitle: req.body.gameTitle,
            maxPlayers: req.body.maxPlayers,
            gameDate: req.body.gameDate,
            gameTime: req.body.gameTime,
            address: req.body.address,
            gameInfo: req.body.gameInfo,
            //comments: req.body.comments,
            attendees: req.body.attendees,
            publishedAt: req.body.publishedAt
        })
        .then(gameEvent => res.status(201).json(
            gameEvent
            /*id: gameEvent.id,
            host: gameEvent.host,//`${host.firstName} ${host.lastName}`,
            gameTitle: gameEvent.gameTitle,
            maxPlayers: gameEvent.maxPlayers,
            gameDate: gameEvent.gameDate,
            gameTime: gameEvent.gameTime,
            address: gameEvent.address,
            //comments: gameEvent.comments,
            attendees: gameEvent.attendees,
            publishedAt: gameEvent.publishedAt*/
        ))
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


router.put('/:id', jwtAuth, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        return res.status(400).json({
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
                gameInfo: updatedGameInfo.gameInfo
            }))
            .catch(err => res.status(500).json({
                message: err
            }));
    }
});


router.delete('/:id', (req, res) => {
    // if (req.user) {
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
    // }
});


module.exports = {
    router
};