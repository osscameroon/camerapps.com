#!/bin/bash

set -e

# navigate to the deploy dir and clean the precedent
DIR="/home/deploy/camerapps.com"
if [ -d "$DIR" ]; then
    cd $DIR

    # get/stash changes
    OUTPUT=$(git stash clear; git stash; git pull --rebase origin main || true && git stash apply || true)
    echo $OUTPUT

    # yarn install/build
    yarn install && yarn build

    # we handle the rest with pm2
    pm2 restart camerapps && pm2 save
else
    mkdir $DIR
    cd $DIR

    # we clone the project
    git clone git@github.com:osscameroon/camerapps.com.git .
    
    # yarn install/build
    yarn install && yarn build

    # we handle the rest with pm2
    pm2 start yarn --name camerapps -- start
    pm2 save
fi
