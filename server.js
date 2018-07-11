const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const logger = require('morgan');
const routes = require('./routes');
const Store = require('./store');
const { check, body, param, validationResult } = require('express-validator/check');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler());

let storeData = {
    posts: [{
        id: 1,
        name: 'Top 10 ES6 Features every Web Developer must know',
        url: 'https://webapplog.com/es6',
        text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
        comments: [{
                id: 1,
                text: 'Cruel…..var { house, mouse} = No type optimization at all'
            },
            {
                id: 2,
                text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'
            },
            {
                id: 3,
                text: '(p1,p2)=>{ … } ,i understand this ,thank you !'
            }
        ]
    }]
}

app.use((req, res, next) => {
    req.store = new Store(storeData);
    next();
});

app.use('/', express.static(__dirname + '/public'));

app.get('/posts', routes.posts.getPosts);
app.post('/posts', [
        body('name').isString().not().isEmpty().trim(),
        body('text').isString().not().isEmpty().trim(),
        body('url').isURL().not().isEmpty().trim()
    ], routes.posts.addPost);

app.put('/posts/:id', [
    body('name').isString().not().isEmpty().trim(),
    body('text').isString().not().isEmpty().trim(),
    body('url').isString().isURL().not().isEmpty().trim(),
    param('id').toInt()
], routes.posts.updatePost);
app.delete('/posts/:id', [param('id').toInt()], routes.posts.removePost);

app.get('/posts/:id/comments', routes.comments.getComments);
app.post('/posts/:id/comments', [
    body('text').isString().not().isEmpty().trim(),
    param('id').toInt()
], routes.comments.addComment);
app.put('/posts/:id/comments/:commentId', [
    body('text').isString().not().isEmpty().trim(),
    param('id').toInt(),
    param('commentId').toInt(),
], routes.comments.updateComment);
app.delete('/posts/:id/comments/:commentId', [
    param('id').toInt(),
    param('commentId').toInt(),
], routes.comments.removeComment);

app.listen(3000);
console.log('Server listening on localhost, port 3000');
console.log('HINT: go to http://localhost:3000 to play with the API');
