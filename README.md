desert-tx

Brian Pilati - August 10, 2018

Installation

# Requirements 

## node v10.7.0 (or equivalent)
## npm v6.1.0 (or equivalent)
## npm install -g @angular/cli

# File Structure

+ src
  |_ angular files
+ aws
  |_ lambda function
+ node-server
  |_ api

# Installation

## npm install

# Configuration

copy the provided `serviceAccountKey.json` to the `node-server/libs` directory
copy the provided `adminServiceAccountKey.json` to the `node-server/libs` directory

# Execution

## Node Server
$ cd node-server
$ node app.js

## Angular Frontend
$ ng serve

In a browser open http://localhost:4200


