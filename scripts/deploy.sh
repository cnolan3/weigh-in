#!/bin/bash
# adapted from https://kjaer.io/travis/ 
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo, and push it to our server.
	mkdir angular-build
	mv angular-src/dist/* angular-build/

    git init
        
    git remote add deploy "deploy@weighindebates.com:/var/www/wi"
    git config user.name "Travis CI"
    git config user.email "connor.nolan+travisCI@gmail.com"
    
    git add ./backend ./angular-build
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi
