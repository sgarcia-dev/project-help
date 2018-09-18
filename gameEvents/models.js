const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var commentSchema = new mongoose.Schema({
    content: 'string'
});

const gameEventSchema = new mongoose.Schema({
    //host:      { type: String, required: true },
    host: {
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
        type: String,
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
}) //consider getting rid of comments and attendees and just do attendee count, focus on mongo crud and maybe then authentication

gameEventSchema.pre('find', function (next) {
    this.populate('user');
    next();
});

gameEventSchema.pre('findOne', function (next) {
    this.populate('user');
    next();
});

//gameEventSchema.post('find', user) {
//   this.populate('host', username);
// next();
//};

gameEventSchema.virtual('hostName').get(function () {
    return `${this.user.username}`.trim();
});

gameEventSchema.virtual('address').get(function () {
    return `${this.location.street}, ${this.location.city}, ${this.location.state} ${this.location.zipCode}`.trim();
});

gameEventSchema.methods.serialize = function () {
    return {
        id: this._id,
        host: this.hostName,
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