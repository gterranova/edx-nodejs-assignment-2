const { validationResult } = require('express-validator/check');

module.exports = {
    getComments(req, res) {
        const comments = req.store.allComments(req.params.id);
        if (comments === null) return res.status(404).send();
        res.status(200).send(comments);
    },
    addComment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }        
        const { text } = req.body;
        const newComment = req.store.createComment(req.params.id, { text });
        if (!newComment) return res.status(404).send();
        res.status(201).send(newComment);
    },
    updateComment(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }        
        const { text } = req.body;
        const comment = req.store.updateComment(req.params.id, req.params.commentId, { text });
        if (!comment) return res.status(404).send();
        res.status(200).send(comment);
    },
    removeComment(req, res) {
        if (!req.store.deleteComment(req.params.id, req.params.commentId)) 
            return res.status(404).send();
        res.status(204).send();
    }
}