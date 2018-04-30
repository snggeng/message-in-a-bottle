# Message In A Bottle
This is the main repository for the CS 290 Final Project: `Message In a Bottle`.

## Team Members
* Geng Sng (gs148)
* Gerald Kora Kwok (gk72)

Started: April 20th
Finished: April 30th
Hours: 100 hours
Consulted with: NONE
Online Resources: A-Frame documentation
Assets: 3D bottles from https://sketchfab.com/models/beb69bc08a8f487ab8c5207fb155cbf2#download by Francesco Coldesina

#### What makes your application useful 
Our application is useful because it’s an platform that connects people all over the world, and allows them to express themselves. Anyone can create a bottle containing their message to the world, and view the messages others have created. Given a degree of Internet anonymity, what will users write? What legacies will they leave behind in their bottles? The possibilities are endless.

#### References for your data that establishes its authenticity 
All of our data are direct user inputs. The database is dynamic.

#### Discuss both the pros and the cons of different framework possibilities you considered and why you made the decision you did (including choosing not to use any framework)
We chose to use A-Frame to handle the WebVR experience because it was the best option for efficiently building virtual web environments. Compared to other 3D libraries such as three.js, A-Frame was much simpler to pick up in a short amount of time, given the relatively simplistic nature of its code – it’s essentially HTML, and the provided tutorials were very helpful. At the same time, A-Frame could easily be connected to Javascript, allowing us to link A-Frame elements with Javascript events and so forth. Furthermore, the A-Frame ecosystem had many community-built add-ons such as a physics and animation engine, due to the fact that its components system allowed the community to build and share such custom components; this allowed us to add features such oceans and animations. Finally, the framework is well-documented, and the Slack channel was very active (any questions we had were quickly answered by the community). After discovering all of these benefits through the Explore assignment, we easily agreed that A-Frame was the best framework option for our app’s WebVR component.

In terms of the backend, we essentially used a stack that we were already very comfortable with.


## Stack
* Backend
  * Node.js
  * Express.js
  * MongoDB

* Frontend
  * A-frame
  * React.js

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
This is the file tree of our project:
```
root
 |- client
 |- react-client
 |- server
```
The `client` folder is a static html implementation of the WebVR environments used in this project. The `react-client` folder is the frontend for this project, and contains a React app which renders the WebVR scenes along with other components that allow the user to manipulate data in our application. The `server` folder is the backend of this project, which is hosted in production using heroku.

###### Server (Backend)
To start the server:
```
cd server && npm start
```

To (manually) test server endpoints, either use [curl](https://curl.haxx.se/docs/manual.html) or [Postman](https://www.getpostman.com/) (equivalent GUI for making http calls):

Sample curl:
```
curl http://localhost:3000/public
// => {"message": "hi"}
```

To deploy:
```
heroku create
```
Make sure that your remote is now set to heroku as well:
```
git remote -v
# you should see 4 remote links, 2 prefixed with origin, 2 prefixed with heroku
# if there aren't 2, run this to set your remote
# heroku git:remote -a app-name
```
Push your changes to Heroku:
```
git push heroku master
```

To get access to the database files, you can export them from mLab with the following commands:
```
mongoexport -h ds263639.mlab.com:63639 -d heroku_2889j77f -c users -u heroku_2889j77f -p eccd4hqkadojkuqqqh3isnui36 -o /path/to/file.json
mongoexport -h ds263639.mlab.com:63639 -d heroku_2889j77f -c bottles -u heroku_2889j77f -p eccd4hqkadojkuqqqh3isnui36 -o /path/to/file.json

```
This will export a JSON of each collection `bottles` and `users`, which are the two collections we are using in our database. Remember to set the `/path/to/file` to where you want to save your JSON.

###### React-client (Frontend)
To start the server:
```
cd react-client && yarn install && yarn start
```
To deploy:
```
yarn build
```
