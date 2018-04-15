# Message In A Bottle
This is the main repository for the CS 290 Final Project: `Message In a Bottle`.

## Team Members
* Geng Sng (gs148)
* Gerald Kora Kwok (gk72)

## Topic
We would like to build an online message-in-a-bottle platform similar to [paperplanes.world](https://paperplanes.world/).

Essentially, users will be able to place short messages inside virtual bottles. Users can retrieve a bottle at random, read the message contained inside, and add their own message. This is interesting because it's a platform that can connect people all over the world.

Ideally we'd like to implement some cool visualizations to make the platform look aesthetic (explore tools like three.js).

Our data sources will be the user-inputted messages, but other ways we could incorporate existing data sources could be scraping text from popular sites (reddit, etc) to fill initial bottles, or making the 'ocean' environment dependent on real-time data sources like weather.

## Stack
* Backend
  * Node.js
  * Express.js
  * MongoDB

* Frontend
  * A-frame

## Getting Started
#### Clone this project and change directory:
```
git clone https://github.com/duke-compsci290-spring2018/final-project-team-36.git message-in-a-bottle
cd message-in-a-bottle
```
#### Install dependencies:
_**NOTE**: This project uses `Node.js` and ES6 features. You need to have Node installed and it is recommended that your version of Node is `v8.11.1` which is the LTS version._

To check what version of node you are running:
```
node -v
```

If you do not have `Node.js` installed in your local machine, [download it here](https://www.google.com/search?q=download+nodejs&oq=download+nodejs&aqs=chrome..69i57.2421j0j4&sourceid=chrome&ie=UTF-8).

Install npm packages:
```
npm install
```

#### Development
To start the server:
```
npm start
```

To (manually) test server endpoints, either use [curl](https://curl.haxx.se/docs/manual.html) or [Postman](https://www.getpostman.com/) (equivalent GUI for making http calls):

Sample curl:
```
curl http://localhost:3000/public
// => {"message": "hi"}
```
