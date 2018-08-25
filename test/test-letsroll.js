'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

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

describe('/loggedin.html', function () {
    it("should return status 200 and html code", function () {
        return chai.request(app)
        .get('/')
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res).to.be.html;
        });
    });
});