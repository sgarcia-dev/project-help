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
    gameDate: {
        type: Date,
        default: Date.now,
    },
    gameTime: {
        type: String, //datetime-local
        required: true
    },
    location: {
        street: String,
        city: String,
        state: String,
        zipCode: Number,
    },
    //attendees: [{
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'User'
    //}],
    //comments: [commentSchema],
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

//consider getting rid of comments and attendees and just do attendee count, focus on mongo crud and maybe then authentication

//gameEventSchema.pre('find', function (next) {
//    this.populate('user');
//    next();
//});

//gameEventSchema.pre('findOne', function (next) {
//  this.populate('user');
//   next();
//});

//gameEventSchema.pre('find', function (next) { //, user) {
//    this.populate('user'); //, username);
//    next();
//});

//gameEventSchema.virtual('user_id').get(function () {
//   return `${this.user._id}`; //.trim();
//});

gameEventSchema.virtual('user_name').get(function () {
    return `${this.user.username}`.trim();
});

gameEventSchema.virtual('address').get(function () {
    return `${this.location.street}, ${this.location.city}, ${this.location.state} ${this.location.zipCode}`.trim();
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
        //user: this.user, //_id,
        user: user, //this.user_name,
        gameTitle: this.gameTitle,
        maxPlayers: this.maxPlayers,
        gameDate: this.gameDate,
        gameTime: this.gameTime,
        address: this.address,
        gameInfo: this.gameInfo
        //comments: this.comments,
        //attendees: this.attendees,
        //publishedAt: this.publishedAt
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