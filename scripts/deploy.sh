#!/bin/bash
# adapted from https://kjaer.io/travis/ 
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo, and push it to our server.
    git init
        
    git remote add deploy "deploy@weighindebates.com:/var/www/wi"
    git config user.name "Travis CI"
    git config user.email "connor.nolan+travisCI@gmail.com"
    
    git add ./backend 
	git add -f ./angular-src/dist
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi
