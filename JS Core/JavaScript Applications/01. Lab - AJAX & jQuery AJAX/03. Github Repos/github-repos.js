function loadRepos() {
    let ul = $('#repos');
    ul.empty();

    let req = {
        url: `https://api.github.com/users/${$('#username').val()}/repos`,
        success: process
    };

    $.ajax(req);

    function process(repos) {
        console.dir(repos);

        if (repos.length <= 0) {
            ul.append($('<li>Error</li>'));
            return;
        }

        for (let repo of repos) {
            ul.append($('<li>').append(`<a href="${repo.html_url}">${repo.full_name}</a>`))
        }
    }
}