High level infrastructure: 

Server: 
  Client-server api is in the "api" folder
  we have built out a /1 api router for version 1 of our API. If you want to build out a v2 of the api, that can go in /2.
  /auth does authentication things. CHRISTIAN and ALAN will update this
  /externalAPI is where we make all our calls out to the external APIs
  /account ALAN and CHRISTIAN are going to write this section

Client: 
  all files are in public
  Follow the Build Process in the wiki
  All files get copied over to dist when gulp and gulp watch are run (with the exception of bower_components)
  DIST is where we are serving up all of our static files, and where everything is compiled into when gulp is run
  assets holds our images
  all of our html is being held inside the public root folder

  js holds all the front-end logic and React.js fun parts
    COMPONENTS holds all of our React components- the different things we are rendering, along with their associated logic
    CONSTANTS holds a file that's used to make sure everyone's speaking the same language. this is totally unnecessary for an app of our size, but in larger apps, makes sure that everyone's using the same names for different functions, no matter where in the app they are being used. 
    ACTIONS is a helper file that just leads directly to our dispatcher. again, unnecessary in an application our size, but good practice with the flux architecture. 
    DISPATCHER sends actions over to our store. again, somewhat superfluous in an application our size, but in a larger application this will dispatch to the correct store if we have multiple stores. it keeps the data cascading through in a logical, one-directional pattern
    STORE: where we hold all the data, and all the event listeners linked to the data. this is the definitive source of truth. the components (views) are just displays of this data, that hold some state

Front-end data flows: 
  1. starts with main.js, renders our app.js in components
  2. app.js renders Header, Footer, and most importantly, MainSection
    2a. Header contains logout
  3. MainSection then gets the data, sets the displayedFileList properties, and renders Google and Dropbox
  4. Google and Dropbox, in turn, each render a lsit of Files

User Flow: 
  go to https://localhost:8000
  if not logged in, main.js will redirect you to /login, which will begin the login flow, forcing you to log into each cloud service if you're not logged in already
  logout removes the tokens from localStorage and refreshes the page, which will automatically redirect you to login