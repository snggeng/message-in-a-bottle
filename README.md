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


What makes your application useful 
Our application is useful because it’s an platform that connects people all over the world, and allows them to express themselves. Anyone can create a bottle containing their message to the world, and view the messages others have created. Given a degree of Internet anonymity, what will users write? What legacies will they leave behind in their bottles? The possibilities are endless.

References for your data that establishes its authenticity 
All of our data are direct user inputs. The database is dynamic.

Discuss both the pros and the cons of different framework possibilities you considered and why you made the decision you did (including choosing not to use any framework)
We chose to use A-Frame to handle the WebVR experience because it was the best option for efficiently building virtual web environments. Compared to other 3D libraries such as three.js, A-Frame was much simpler to pick up in a short amount of time, given the relatively simplistic nature of its code – it’s essentially HTML, and the provided tutorials were very helpful. At the same time, A-Frame could easily be connected to Javascript, allowing us to link A-Frame elements with Javascript events and so forth. Furthermore, the A-Frame ecosystem had many community-built add-ons such as a physics and animation engine, due to the fact that its components system allowed the community to build and share such custom components; this allowed us to add features such oceans and animations. Finally, the framework is well-documented, and the Slack channel was very active (any questions we had were quickly answered by the community). After discovering all of these benefits through the Explore assignment, we easily agreed that A-Frame was the best framework option for our app’s WebVR component.

In terms of the backend, we essentially used a stack that we were already very comfortable with.

