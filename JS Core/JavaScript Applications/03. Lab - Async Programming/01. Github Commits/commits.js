function loadCommits() {
    const ulCommits = $('#commits');

    $.get(`https://api.github.com/repos/${$('#username').val()}/${$('#repo').val()}/commits`)
        .then(function (data) {
            ulCommits.empty();

            for (let commit of data.map(object => ({author: object.commit.author.name, message: object.commit.message}))) {
                ulCommits.append($(`<li>${commit.author}: ${commit.message}</li>`))
            }
        })
        .catch(function (error) {
            ulCommits.empty();

            ulCommits.append($(`<li>Error: ${error.status} (${error.statusText})</li>`))
        })
}