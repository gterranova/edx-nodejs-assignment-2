const { validationResult } = require('express-validator/check');

module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.allPosts());
    },
    addPost(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }        
        const { name, text, url } = req.body;
        res.status(201).send(req.store.createPost({ name, text, url }));
    },
    updatePost(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const { name, text, url } = req.body;        
        const post = req.store.updatePost(req.params.id, { name, text, url });
        if (!post) return res.status(404).send();
        res.status(200).send(post);
    },
    removePost(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        if (!req.store.deletePost(req.params.id)) 
            return res.status(404).send();
        res.status(204).send();
    }
}