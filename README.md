# Group: Rainier Reindeers

## Members:
 Noah Reyes, Rob Shelton, Nicky Smit, Nathan Wang

## Heroku site:
https://afternoon-taiga-87750.herokuapp.com/
https://git.heroku.com/afternoon-taiga-87750.git

created new group account, make sure to login and do setup on each computer, email is nsmit@pugetsound.edu, password is R3ind33r$, here's a link on how to setup, if ya need
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

## Using Express Folder Layout
Pretty much going back to the beginning of the Loc8r book here, so that we can start of with a simple website that works. Has bootstrap installed in public folder.

##Do this!
- Always confirm it works locally and on heroku
(Runs locally on localhost:3000, AND use heroku local, at localhost:5000)
- Don't forget to comment all your code so others know what's going on!
- Check and make sure you are running node version v4.2.1... I'm not sure how it works exactly but things will go wrong if you aren't. I wasn't somehow, had to reinstall Express and nodemon

## Things Needing Work/Change (please add to this)
- Amelia is referenced as a stylesheet in app_server/views/layout.jade, but this definitely needs changing


## Webpage Layout
- home page, has big central search bar, login and sign up is emphasized (for both theaters and theater-goers), if signed in shows suggested plays, otherwise just plays happening near the client (if know location)
at 'localhost:3000'
- the following all have login/signup and search bar in a smaller header
- list by location page, has a map of nearby theaters or nearby theaters showing a specific play or play genre or playwright, and lists them out nicely
at 'localhost:3000/results'
- theater page, has calendar with theater play schedule, map of theater location, description of theater and theater rating, link to theater website
at 'localhost:3000/theater'
- theater specific play page, has information about the play, cast, tickets, and show times, portal to the theater's  web ticket checkout, shows rating of theater production and recent reviews, lets you write a review if logged in (I'm thinking tabs are necessary on this page, like REVIEWS tab, PLAY INFO tab, etc.)
at 'localhost:3000/theater/play'
- theater admin page, has editing tools for theaters to change information they have written, has space to post new information, also to see and respond to reviews left by users
at 'localhost:3000/admin'
- theater-goer personal page, shows what reviews they've left and new responses to reviews, shows what plays they've marked as interested in seeing, shows suggestions for plays they should see
at 'localhost:3000/user'
- and other assorted pages at 'localhost:3000/about', '/terms', and '/FAQ'
