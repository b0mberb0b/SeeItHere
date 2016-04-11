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

## Webpage Layout
- home page, at 'localhost:3000'. To have big central search bar, login and sign up is emphasized (for both theaters and theater-goers), if signed in shows suggested plays, otherwise just plays happening near the client (if know location)
- the following all have login/signup and search bar in a smaller header
- list by location page, at 'localhost:3000/results'. To have a map of nearby theaters or nearby theaters showing a specific play or play genre or playwright, and lists them out nicely
- theater page, at 'localhost:3000/theater'. To have a calendar with theater play schedule, map of theater location, description of theater and theater rating, link to theater website
- theater specific play page, at 'localhost:3000/theater/play'. To have information about the play, cast, tickets, and show times, portal to the theater's  web ticket checkout, shows rating of theater production and recent reviews, lets you write a review if logged in (I'm thinking tabs are necessary on this page, like REVIEWS tab, PLAY INFO tab, etc.)
- theater admin page, at 'localhost:3000/admin'. To have editing tools for theaters to change information they have written, has space to post new information, also to see and respond to reviews left by users
- theater-goer personal page, at 'localhost:3000/user'. To show what reviews they've left and new responses to reviews, shows what plays they've marked as interested in seeing, shows suggestions for plays they should see
- and other assorted pages at 'localhost:3000/about', '/terms', and '/FAQ'
