'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Location = mongoose.model('Location'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent;
var user1Credentials, user1;
var user2Credentials, user2;
var adminCredentials, admin;
var locationTest;
var unsavedId = "5650f414e4a05020148032dd";

/**
 * Location routes tests
 */
describe('Location CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user1 credentials
    user1Credentials = {
      username: 'username1',
      password: 'password1'
    };
    // Create a new user1
    user1 = new User({
      firstName: 'Full',
      lastName: 'Name1',
      displayName: 'Full Name 1',
      email: 'user1@test.com',
      username: user1Credentials.username,
      password: user1Credentials.password,
      provider: 'local'
    });
    // Create user2 credentials
    user2Credentials = {
      username: 'username2',
      password: 'password2'
    };
    // Create a new user2
    user2 = new User({
      firstName: 'Full',
      lastName: 'Name2',
      displayName: 'Full Name 2',
      email: 'user2@test.com',
      username: user2Credentials.username,
      password: user2Credentials.password,
      provider: 'local'
    });
    // Create admin credentials
    adminCredentials = {
      username: 'admin',
      password: 'passwordAdmin'
    };
    // create a new admin
    admin = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Admin Name',
      email: 'admin@test.com',
      username: adminCredentials.username,
      password: adminCredentials.password,
      provider: 'local',
      roles: ['admin']
    });

    // Save the users to the test db and create new location
    user1.save(function () {
      user2.save(function () {
        admin.save(function(err) {
        console.log(err);
          locationTest = {
            description: 'Test Description'
          };
          done();
        });
      });
    });
  });

  describe('not logged in (guest)', function() {

    // '/api/locations' POST

    it('should not be able to save a location', function (done) {
      agent.post('/api/locations')
        .send(locationTest)
        .expect(403)
        .end(function (locationSaveErr, locationSaveRes) {
          // Call the assertion callback
          done(locationSaveErr);
        });
    });

    // '/api/locations' GET

    it('should not be able to get a list of locations', function (done) {
      agent.get('/api/locations')
        .send(locationTest)
        .expect(403)
        .end(function (locationSaveErr, locationSaveRes) {
          // Call the assertion callback
          done(locationSaveErr);
        });
    });

     // '/api/locations/:locationId' GET

    it('should not be able to get a personal location', function (done) {
      createLocation(user1Credentials, done, function (locationId) {
        agent.get('/api/locations/' + locationId)
          .expect(401)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            done(locationSaveErr);
          });
      });
    });

    it('should not be able to get a general location', function (done) {
      createLocation(adminCredentials, done, function (locationId) {
        agent.get('/api/locations/' + locationId)
          .expect(403)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            done(locationSaveErr);
          });
      });
    });

    it('should not be able to get a not existing location', function (done) {
      agent.get('/api/locations/' + unsavedId)
        .expect(404)
        .end(function (locationSaveErr, locationSaveRes) {
          // Call the assertion callback
          done(locationSaveErr);
        });
    });

     // '/api/locations/:locationId' PUT

    it('should not be able to change a personal location', function (done) {
      createLocation(user1Credentials, done, function (locationId) {
        locationTest._id = locationId;
        changeLocation();
        agent.put('/api/locations/' + locationId)
          .send(locationTest)
          .expect(401)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            done(locationSaveErr);
          });
      });
    });

    it('should not be able to change a general location', function (done) {
      createLocation(adminCredentials, done, function (locationId) {
        locationTest._id = locationId;
        changeLocation();
        agent.put('/api/locations/' + locationId)
          .send(locationTest)
          .expect(403)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            done(locationSaveErr);
          });
      });
    });

    it('should not be able to change a not existing location', function (done) {
      changeLocation();
      agent.put('/api/locations/' + unsavedId)
        .send(locationTest)
        .expect(404)
        .end(function (locationSaveErr, locationSaveRes) {
          // Call the assertion callback
          done(locationSaveErr);
        });
    });

     // '/api/locations/:locationId' DELETE

    it('should not be able to delete a personal location', function (done) {
      createLocation(user1Credentials, done, function (locationId) {
        agent.delete('/api/locations/' + locationId)
          .expect(401)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            done(locationSaveErr);
          });
      });
    });

    it('should not be able to delete a general location', function (done) {
      createLocation(adminCredentials, done, function (locationId) {
        agent.delete('/api/locations/' + locationId)
          .expect(403)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            done(locationSaveErr);
          });
      });
    });

    it('should not be able to delete a not existing location', function (done) {
      agent.delete('/api/locations/' + unsavedId)
        .expect(404)
        .end(function (locationSaveErr, locationSaveRes) {
          // Call the assertion callback
          done(locationSaveErr);
        });
    });
  });

  describe('admin', function() {

     // '/api/locations' POST

    it('should be able to save a general location', function (done) {
      signIn(adminCredentials, done, function(){

          // Save a new location
          agent.post('/api/locations')
            .send(locationTest)
            .expect(200)
            .end(function (locationSaveErr, locationSaveRes) {
              // Handle article save error
              if (locationSaveErr) {
                return done(locationSaveErr);
              }

              var locationResult = locationSaveRes.body;
              var locationId = locationResult._id;
              console.log(locationResult);
              should(locationResult.user).not.be.ok();

              // Get a list of articles
              agent.get('/api/locations')
                .end(function (locationsGetErr, locationsGetRes) {
                  // Handle article save error
                  if (locationsGetErr) {
                    return done(locationsGetErr);
                  }

                  // Get articles list
                  var locations = locationsGetRes.body;

                  // Set assertions
                  should(locations[0].user).not.be.ok();
                  (locations[0].description).should.not.be.null();
                  (locations[0]._id).should.equal(locationId);

                  // Call the assertion callback
                  done();
                });
            });
      });
    });

    // '/api/locations' GET

    it('should be able to get a list of locations', function (done) {
        signIn(adminCredentials, done, function(){
         agent.get('/api/locations')
          .send(locationTest)
          .expect(200)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            if (locationSaveErr){
              done(locationSaveErr);
            } else {
              done();
            }
          });
        });
      });

    // '/api/locations/:locationId' GET

    it('should not be able to get a personal location', function (done) {
        createLocation(user1Credentials, done, function (locationId) {
          signIn(adminCredentials, done, function(){
            agent.get('/api/locations/' + locationId)
              .expect(403)
              .end(function (locationGetErr, locationGetRes) {
                return done(locationGetErr);
              });
          });
        });
      });

      it('should be able to get a general location', function (done) {
        createLocation(adminCredentials, done, function (locationId) {
          signIn(adminCredentials, done, function(){
            agent.get('/api/locations/' + locationId)
              .expect(200)
              .end(function (locationGetErr, locationGetRes) {
                  if (locationGetErr) {
                    // Call the assertion callback
                    return done(locationGetErr);
                  }
                  // Get article list
                  var result = locationGetRes.body;

                  // Set assertions
                  should(result.user).not.be.ok();
                  (result._id).should.equal(locationId);

                  done();
              });
          });
        });
      });

      // '/api/locations/:locationId' PUT
      // '/api/locations/:locationId' DELETE
  });

  describe('user', function() {

      // '/api/locations' POST

      it('should be able to save a personal location', function (done) {
        signIn(user1Credentials, done, function(){
          // Get the userId
            var userId = user1.id;

            // Save a new article
            agent.post('/api/locations')
              .send(locationTest)
              .expect(200)
              .end(function (locationSaveErr, locationSaveRes) {
                // Handle article save error
                if (locationSaveErr) {
                  return done(locationSaveErr);
                }

                var locationId = locationSaveRes.body._id;
                (locationSaveRes.body.user).should.equal(userId);

                // Get a list of articles
                agent.get('/api/locations')
                  .end(function (locationsGetErr, locationsGetRes) {
                    // Handle article save error
                    if (locationsGetErr) {
                      return done(locationsGetErr);
                    }

                    // Get articles list
                    var locations = locationsGetRes.body;

                    // Set assertions
                    (locations[0].user._id).should.equal(userId);
                    (locations[0].description).should.not.be.null();
                    (locations[0]._id).should.equal(locationId);

                    // Call the assertion callback
                    done();
                  });
              });
        });
    });

      it('should not be able to save a location if no title is provided', function (done) {
      signIn(user1Credentials, done, function(){
        // Get the userId
          var userId = user1.id;

           // Invalidate description field
          locationTest.description = '';

          // Save a new article
          agent.post('/api/locations')
            .send(locationTest)
            .expect(400)
            .end(function (locationSaveErr, locationSaveRes) {
              // Handle article save error
              if (locationSaveErr) {
                return done(locationSaveErr);
              }

              var locationId = locationSaveRes.body._id;

              // Get a list of articles
              agent.get('/api/locations')
                .end(function (locationsGetErr, locationsGetRes) {
                  // Set message assertion
                  (locationSaveRes.body.message).should.not.be.null();

                  // Handle location save error
                  done(locationSaveErr);
                });
            });
        });
      });

      // '/api/locations' GET

      it('should be able to get a list of locations', function (done) {
        signIn(user1Credentials, done, function(){
         agent.get('/api/locations')
          .send(locationTest)
          .expect(200)
          .end(function (locationSaveErr, locationSaveRes) {
            // Call the assertion callback
            if (locationSaveErr){
              done(locationSaveErr);
            } else {
              done();
            }
          });
        });
      });

      // '/api/locations/:locationId' GET

      it('should be able to get his/her own personal location', function (done) {
          createLocation(user1Credentials, done, function (locationId) {
           signIn(user1Credentials, done, function(){
            agent.get('/api/locations/' + locationId)
              .expect(200)
              .end(function (locationGetErr, locationGetRes) {
                if (locationGetErr) {
                  // Call the assertion callback
                  return done(locationGetErr);
                }
                // Get article list
                var result = locationGetRes.body;

                // Set assertions
                (result.user._id).should.equal(user1.id);
                (result._id).should.equal(locationId);

                done();
              });
              });
          });
      });

      it('should not be able to get another personal location', function (done) {
        createLocation(user1Credentials, done, function (locationId) {
          signIn(user2Credentials, done, function(){
            agent.get('/api/locations/' + locationId)
              .expect(403)
              .end(function (locationGetErr, locationGetRes) {
                return done(locationGetErr);
              });
          });
        });
      });

      // '/api/locations/:locationId' PUT
      // '/api/locations/:locationId' DELETE
  });

  function signIn(signInCredentials, done, success) {
    agent.post('/api/auth/signin')
      .send(signInCredentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          done(signinErr);
        } else {
          success();
        }
    });
  }

  function signOut(done, success) {
    agent.get('/api/auth/signout')
      .expect(302)
      .end(function (signoutErr, signoutRes) {

        // Handle signin error
        if (signoutErr) {
          done(signoutErr);
        } else {
          success();
        }
      });
  }

  function createLocation(loginCredentials, done, success) {
    signIn(loginCredentials, done, function() {
      // Save a new location
      agent.post('/api/locations')
        .send(locationTest)
        .expect(200)
        .end(function (locationSaveErr, locationSaveRes) {
          // Handle article save error
          if (locationSaveErr) {
            return done(locationSaveErr);
          }

          var locationId = locationSaveRes.body._id;

          signOut(done, function() {
            success(locationId);
          });
        });
    });
  }

  function changeLocation() {
    locationTest.description = "alternative description";
  }

  afterEach(function (done) {
    User.remove().exec(function () {
      Location.remove().exec(done);
    });
  });
});
