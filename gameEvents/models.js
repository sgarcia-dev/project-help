const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var commentSchema = new mongoose.Schema({
    content: 'string'
});

const gameEventSchema = new mongoose.Schema({
    //user:      { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        ref: 'User'
    },
    gameTitle: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    gameDatetime: {
        type: Date,
        default: Date.now,
    },
    address: String,
    gameInfo: {
        type: String
    }
}, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

gameEventSchema.virtual('user_name').get(function () {
    return `${this.user.username}`.trim();
});

gameEventSchema.methods.serialize = function () {
    let user;
    if (typeof this.user.serialize === 'function') {
        user = this.user.serialize();
    } else {
        user = this.user;
    }

    return {
        id: this._id,
        user: user,
        gameTitle: this.gameTitle,
        maxPlayers: this.maxPlayers,
        gameDatetime: this.gameDatetime,
        address: this.address,
        gameInfo: this.gameInfo
    };
}

//const User = mongoose.model('User', userSchema);
const GameEvent = mongoose.model('GameEvent', gameEventSchema);

/*GameEvent
    .findOne({title: 'another title'})
    .populate('user').then(function(err, gameEvent) {
        if (err) {
        console.log(err);
        }
        else console.log(gameEvent.user.firstName, gameEvent.user.lastName);
});*/

module.exports = {
    GameEvent
};