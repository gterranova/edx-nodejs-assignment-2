function Store(store) {
    this.data = store;
    this.lastPostId = () => {
        return this.data.posts.length ? this.data.posts[this.data.posts.length-1].id : 0; 
    };

    this.lastCommentId = (post) => {
        return (post.comments && post.comments.length) ? post.comments[post.comments.length-1].id : 0; 
    };

    this.allPosts = () => {
        return this.data.posts; 
    };

    this.allComments = (postId) => {
        const storedPost = this.findPostById(postId);
        if (!storedPost) {
            return null;
        }
        return storedPost.comments || []; 
    };
    
    this.findPostById = (id) => {
        if (typeof id == 'string') id = parseInt(id, 10);
        for (let post of this.data.posts) {
            if (post.id === id) return post;
        }
        return null;
    };

    this.findCommentById = (postId, id) => {
        const storedPost = this.findPostById(postId);
        if (!storedPost || !storedPost.comments) {
            return null;
        }
        if (typeof id == 'string') id = parseInt(id, 10);
        for (let comment of storedPost.comments) {
            if (comment.id === id) return comment;
        }
        return null;
    };
    
    this.createPost = (post) => {
        post.id = this.lastPostId(this.data)+1;
        this.data.posts.push(post);
        return post;
    };

    this.createComment = (postId, comment) => {
        const storedPost = this.findPostById(postId);
        if (!storedPost) {
            return null;
        }
        comment.id = this.lastCommentId(storedPost)+1;
        if (!storedPost.comments) {
            storedPost.comments = [];
        }
        storedPost.comments.push(comment);
        return comment;
    };
    
    this.updatePost = (id, post) => {
        const storedPost = this.findPostById(id);
        if (!storedPost) {
            return null;
        }
        Object.assign(storedPost, post);
        return storedPost;
    };

    this.updateComment = (postId, id, comment) => {
        const storedComment = this.findCommentById(postId, id);
        if (!storedComment) {
            return null;
        }
        Object.assign(storedComment, comment);
        return storedComment;
    };
    
    this.deletePost = (id) => {
        const storedPost = this.findPostById(id);
        if (!storedPost) {
            return false;
        }
        this.data.posts.splice(this.data.posts.indexOf(storedPost), 1);
        return true;
    };

    this.deleteComment = (postId, id) => {
        const storedPost = this.findPostById(postId);
        const storedComment = this.findCommentById(postId, id);
        if (!storedPost || !storedComment) {
            return false;
        }
        storedPost.comments.splice(storedPost.comments.indexOf(storedComment), 1);
        return true;
    };
    return this;
}

module.exports = Store;