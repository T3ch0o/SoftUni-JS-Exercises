function loadRepos() {
    let req = {
        url: 'https://api.github.com/users/testnakov/repos',
        method: 'GET',
        contentType: 'application/json',
        success: process
    };

    $.ajax(req);

    function process(repos) {
        $('#res').text(JSON.stringify(repos))
    }
}