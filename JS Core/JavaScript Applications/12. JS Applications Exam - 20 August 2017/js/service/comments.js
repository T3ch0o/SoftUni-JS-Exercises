let comments = (() => {
    function getPostComments(postId) {
        const endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;

        return requester.get('appdata', endpoint, 'kinvey')
    }

    function createComment(postId, content, author) {
        let data = {
            postId,
            content,
            author
        };

        return requester.post('appdata', 'comments', 'kinvey', data);
    }
    
    function deleteComment(id) {
        const endpoint = `comments/${id}`;

        return requester.remove('appdata', endpoint, 'kinvey');
    }
    
    return {
        getPostComments,
        createComment,
        deleteComment
    }
})();