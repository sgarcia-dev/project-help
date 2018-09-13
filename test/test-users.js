'use strict';
global.DATABASE_URL = 'mongodb://localhost/test-games-db';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);
//
describe('/api/user', function() {
  const userName = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const id = 'idex'
  const lastName = 'User';
  const userNameB = 'exampleUserB';
  const passwordB = 'examplePassB';
  const firstNameB = 'ExampleB';
  const lastNameB = 'UserB';

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  beforeEach(function() {});

  afterEach(function() {
    return User.remove({});
  });

  describe('/api/users', function() {
    describe('POST', function() {
      it('Should reject users with missing userName', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            password,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('userName');
          });
      });
      it('Should reject users with missing password', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string userName', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName: 1234,
            password,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('userName');
          });
      });
      it('Should reject users with non-string password', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password: 1234,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string first name', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password,
            firstName: 1234,
            lastName
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('firstName');
          });
      });
      it('Should reject users with non-string last name', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password,
            firstName,
            lastName: 1234, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('lastName');
          });
      });
      it('Should reject users with non-trimmed userName', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName: ` ${userName} `,
            password,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('userName');
          });
      });
      it('Should reject users with non-trimmed password', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password: ` ${password} `,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with empty userName', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName: '',
            password,
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 1 characters long'
            );
            expect(res.body.location).to.equal('userName');
          });
      });
      it('Should reject users with password less than ten characters', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password: '123456789',
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 10 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with password greater than 72 characters', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password: new Array(73).fill('a').join(''),
            firstName,
            lastName, 
            id
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at most 72 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with duplicate userName', function() {
        // Create an initial user
        return User.create({
          userName,
          password,
          firstName,
          lastName, 
          id
        })
          .then(() =>
            // Try to create a second user with the same userName
            chai.request(app).post('/api/users').send({
              userName,
              password,
              firstName,
              lastName, 
              id
            })
          )
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'userName already taken'
            );
            expect(res.body.location).to.equal('userName');
          });
      });
      it('Should create a new user', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password,
            firstName,
            lastName, 
            id
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'userName',
              'firstName',
              'lastName', 
              'id'
            );
            expect(res.body.userName).to.equal(userName);
            expect(res.body.firstName).to.equal(firstName);
            expect(res.body.lastName).to.equal(lastName);
            return User.findOne({
              userName
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            expect(user.lastName).to.equal(lastName);
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
      it('Should trim firstName and lastName', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userName,
            password,
            firstName: ` ${firstName} `,
            lastName: ` ${lastName} `
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'userName',
              'firstName',
              'lastName', 
              'id'
            );
            expect(res.body.userName).to.equal(userName);
            expect(res.body.firstName).to.equal(firstName);
            expect(res.body.lastName).to.equal(lastName);
            return User.findOne({
              userName
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            expect(user.lastName).to.equal(lastName);
          });
      });
    });

    describe('GET', function() {
      it('Should return an empty array initially', function() {
        return chai.request(app).get('/api/users').then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(0);
        });
      });
      it('Should return an array of users', function() {
        return User.create(
          {
            userName,
            password,
            firstName,
            lastName
          },
          {
            userName: userNameB,
            password: passwordB,
            firstName: firstNameB,
            lastName: lastNameB
          }
        )
          .then(() => chai.request(app).get('/api/users'))
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(2);
            expect(res.body[0]).to.deep.equal({
              userName,
              firstName,
              lastName
            });
            expect(res.body[1]).to.deep.equal({
              userName: userNameB,
              firstName: firstNameB,
              lastName: lastNameB
            });
          });
      });
    });
  });
});
