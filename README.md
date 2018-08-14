desert-tx

Brian Pilati - August 10, 2018

Design Notes

# Front-end is Angular 6
This is a full-one app with auth-guards, interceptors, local-storage, components,
validators, services, factories, and models. This is one intense coding test!

# Authentication and DB
Both are firebase. I decided on the DB so it was simple to set-up
when you reviewed the code. Using firebase and the node Express server is redundant,
I used Express because of the requirement in the email. In this case, the node server
could be replaced and everything handled in the angular code.
However, in a deployed production app, the db would not be firebase and hence, the
node would be required.

I decided to use firebase for authentication because Google OAuth on localhost is very difficult
to configure.

The caveat with using firebase for authentication, is I pass the token to the node server then 
need to authenticate again because the server is stateless then run the query.
The XHR to node then the double XHR to firebase has a direct effect on performance.

# Error handling
To keep the coding test simple, I didn't add all the error handling to the node and angular routes. There "could" be times in the UI where it appears to be stuck and a review of the console will indicate an error.

# AWS
Lambda to publish the files to an S3 bucket. There is no authentication verification on the
lambda function. In production, I would add CORS and validate against, in this case, firebase
since I am passing in the authetication token. I didn't validate to keep the coding test simple.

I also decided to allow the s3 bucket to be publicly read. I considered extended the lambda function
to have a "get" method. However, I wasn't certain of the use-case for the images. In this example, I
left them public because I modeled the application after an app like "instagram" with a private write
and a public read.

Another caveat, is the angular code actually does the post to AWS and not the node server. The reason
is for simplicity. I do not have a "signed cert" on my server (nor did I want you to have to set one
up to run the example) and this causes errors attempting to POST to aws. In production, the node
server would need to have a signed certificate and the POST to aws would need to have the propery
headers.

Good Luck,
Brian

# Installation and Requirements 

## node v10.7.0 (or equivalent)
## npm v6.1.0 (or equivalent)
## npm install -g @angular/cli

# File Structure

+ src
  |_ angular files (See "Angular Review" below for details)
+ aws
  |_ lambda function - very straight forward cut and paste
+ node-server
  |_ api
    |_ app.js
    |_ routes
    |_ libs
    |_ domains

# Installation

## npm install

# Configuration

copy the provided `serviceAccountKey.json` to the `node-server/libs` directory
copy the provided `adminServiceAccountKey.json` to the `node-server/libs` directory

# Angular Review

$ npm run docs
$ open docs/index.html

# Execution

## Node Server and angular frontend
$ cd node-server
$ node app.js &
$ ng serve

In a browser open http://localhost:4200