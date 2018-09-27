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
            res.json(
                gameEvents.map(
                    gameEvent => gameEvent.serialize()
                )
            );

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
    GameEvent.findById(req.params.id)
        .populate('user')
        .then(gameEvent => {
            return res.status(200).json(
                gameEvent.serialize()
            );
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'something went terribly wrong'
            });
        })
});

router.post('/', jwtAuth, (req, res) => {
    const requiredFields = ['gameTitle', 'gameDatetime', 'maxPlayers'];
    requiredFields.forEach(field => {
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    });

    gameEvent = req.body;
    console.log(req.user.id);
    console.log('req.user', req.user);
    const newGame = {
        //user: req.user.id, //req.body.id,//req.user.username,/
        user: req.user.id,
        //username: req.user.username,
        maxPlayers: gameEvent.maxPlayers,
        gameTitle: gameEvent.gameTitle,
        gameDatetime: gameEvent.gameDatetime,
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
});


router.put('/:id', jwtAuth, (req, res) => {
    const updated = {};
    const updateableFields = ['gameTitle', 'gameDatetime', 'maxPlayers', 'address', 'gameInfo'];
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
        .then(updatedGameEvent => res.status(200).json(
            updatedGameEvent.serialize()
        ))
        .catch(err => res.status(500).json({
            message: err
        }));
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