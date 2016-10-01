# CULTURELOG

## What is it?
### Keep track of your cultural experiences

Save info of your theater, book, film, ... experiences.

Filter the logged experiences, e.g. to determine your end-of-year top 10!

### Normal workflow

* Create an account.
* Add personal media to the list of general media.
* Add personal locations to the list of general media.
* Add experiences!

### Experiences
An experience contains

* a date
* the medium: theater, book, film. Or define your personal media!
* the title of the theater piece, the book or the concert
* the location: where did the experience take place?
* description, review, rating, ...

## Technology
This project is based on a mean stack (mongo, express, angular, node), specifically MEAN.JS 0.4.2 release (created via yo). For full info see 

* http://meanjs.org/
* https://github.com/meanjs/mean

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Prerequisites

* Install Node.js, MongoDB, Bower, Grunt
* run the mongod server on the default port (27017). ("mongod [--dbpath ...]")
* execute npm install and bower install

## Running the Application
Locally running the application is easy: just run

```
$ grunt
```

The application will run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

## Running in Production mode
To run the application with *production* environment configuration, execute grunt as follows:

```bash
$ grunt prod
```

## User management
If there is no admin user available on application startup, one will be created. (in admin.server.controller.js)
Other admin users can only be added via direct calls on mongo db.

Admin users can manage the general locations and the general media. Admin users cannot add experiences.

A user that registers will be assigned "user" role.

Users can manage personal locations and personal media. Users can add experiences.


## Testing The Application
Run full tests, or only server or client tests

```bash
$ grunt test
```

```bash
$ grunt test:server
```

```bash
$ grunt test:client
```

## Development and deployment With Docker
Still ontested, from MEAN.JS documentation:

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development and testing with compose:
```bash
$ docker-compose up
```

* Local development and testing with just Docker:
```bash
$ docker build -t mean .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
$
```

* To enable live reload, forward port 35729 and mount /app and /public as volumes:
```bash
$ docker run -p 3000:3000 -p 35729:35729 -v /Users/mdl/workspace/mean-stack/mean/public:/home/mean/public -v /Users/mdl/workspace/mean-stack/mean/app:/home/mean/app --link db:db_1 mean
```

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
