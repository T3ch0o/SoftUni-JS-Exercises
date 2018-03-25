function attachEvents() {
    const posts = $('#posts');
    const postComments = $('#post-comments');
    const authorization = `Basic ${btoa("guest:guest")}`;
    const postBody = $('#post-body');
    const postTitle = $('#post-title');

    function request(endpoint) {
        return $.ajax({
            url: `https://baas.kinvey.com/appdata/kid_S15j2qf9z/${endpoint}`,
            headers: {
                authorization
            }
        });
    }

    $('#btnLoadPosts').click(function() {
        request('posts')
            .then(function(response) {
                posts.empty();

                for (let post of response) {
                    posts.append($(`<option>${post.title}</option>`).val(post._id));
                }
            });
    });

    $('#btnViewPost').click(function() {
        const postId = $(posts).find(':selected').val();

        Promise.all([request(`posts/${postId}`), request(`comments/?query={"post_Id":"${postId}"}`)])
            .then(function(response) {
                postComments.empty();

                postTitle.text(response[0].title);
                postBody.text(response[0].body);

                if (response[1].length <= 0) {
                    postComments.append($(`<li>No Comments</li>`));
                    return;
                }

                for (let comment of response[1]) {
                    postComments.append($(`<li>${comment.text}</li>`));
                }
            });
    });
}

$(attachEvents);