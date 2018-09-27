/*'use strict';
require("dotenv").config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const {createAuthToken} = require("../auth/router");
const { app, runServer, closeServer } = require('../server');
//const { User } = require('../users/models');
//const { GameEvent } = require('../gameEvents/models');
//const {seedDatabase, tearDownDb, generateEventData, preAuthUser} = require("../userSeedData.json");
//

const expect = chai.expect;

chai.use(chaiHttp);


//Add one test Add one test that verifies 
//that when you hit up the root url for your 
//client, you get a 200 status code and HTML.
describe('/', function () {
    it("should return status 200 and html code", function () {
        return chai.request(app)
        .get('/')
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.html;
        });
    });
});

describe('GameEvent', function () {
    before(function(){return runServer();})
    after(function(){return closeServer();})
    it("should list game events on GET", function () {
        
        return chai.request(app)
        .get('/api/gameEvents')
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            //res.should.have.status(200);
            //res.should.be.json;
        });
    });
    it('should add gameEvent on POST', function(){
        const testGame = {
            gameTitle: 'testTitle', gameDate: 'testDate', maxPlayers: 'testPlayers', gameTime: 'testTime'
        };
        return chai.request(app)
            .post('/api/gameevents')
            .send(testGame)
            .then(function(res){
                res.should.have.status(201);
                res.should.be.json;
                //res.should.be.a.length('object');
                res.should.include.keys('gameTitle', 'gameDate', 'gameTime', 'maxPlayers');
                res.body.gameTitle.should.equal(testGame.gameTitle);
            });
    })
});

describe('GameEvents', function () {
    before(function(){return runServer();})
    after(function(){return closeServer();})
    it("should list game events on GET", function () {
        return chai.request(app)
        .get('/gameEvents')
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            //res.should.have.status(200);
            //res.should.be.json;
        });
    });
});*/