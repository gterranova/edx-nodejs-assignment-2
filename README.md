edx Introduction to NodeJS: Assignment 2
=====

This project is my solution to the 2st assignment at edX Introduction to Node.js course.

https://courses.edx.org/courses/course-v1:Microsoft+DEV283x+2T2018/course/

It is a RESTful Express API server with the following endpoints: 
* GET and POST /posts
* PUT and DELETE /posts/:postId/
* GET and POST /posts/:postId/comments
* PUT and DELETE /posts/:postId/comments/commentId

It does server-side validation of input data, respond with proper status code.

#### Installation

```
$ git clone https://github.com/gterranova/edx-nodejs-assignment-2.git
$ cd edx-nodejs-assignment-2.git
$ npm i
$ npm run serve
```

Then you can play with the api at http://localhost:3000

### 1. Why did I design this project the way I did?

* I followed the instructions;
* then, I wanted the comments to be returned along with the posts because they would be shown together with the post they refer to (hence, no actual need of "/posts/.../comments" endpoints, which I kept anyway);
* I made a draft of front-end to easily play with the API, using knockout which I do not know very well (other solutions, like angular seemed overkilling and a front-end was not even a requirement, so forgive for the poor implementation); 
* All in-memory data manipulation is delegated to the store, which is injected to the request object via middleware.

### 2. How did I test?

I tested the results with curl, and played with the API via the example front-end. 

### 3. Known issues

* Everything works as expected;
* the front-end is not complete, e.g. no authentication, no client-side validation, no error notification on API calls (but at least acts accordingly).
