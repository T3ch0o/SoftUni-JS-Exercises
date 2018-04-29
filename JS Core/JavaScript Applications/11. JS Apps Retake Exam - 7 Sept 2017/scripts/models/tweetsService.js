let tweetsService = (() => {
    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }


    function loadChirps() {
        return requester.get('appdata', 'chirps', 'kinvey');
    }

    function createChirp(author, text) {
        const tweet = {
            author,
            text
        };

        return requester.post('appdata', 'chirps', 'kinvey', tweet);
    }

    function loadUserChirps(endpoint) {
        return requester.get('appdata', endpoint, 'kinvey');
    }

    function deleteChirp(id) {
        return requester.remove('appdata', `chirps/${id}`, 'kinvey');
    }

    function loadUsers() {
        return requester.get('user', '', 'kinvey');
    }

    function followUser(id, subscriptions = [], subscriber) {
        let data = {
            subscriptions
        };

        data.subscriptions.push(subscriber);

        return requester.update('user', id, 'kinvey', data);
    }

    function loadUser() {
        return requester.get('user', `?query={"username":"${sessionStorage.getItem('username')}"}`, 'kinvey')
    }

    return {
        loadChirps,
        calcTime,
        createChirp,
        loadUserChirps,
        deleteChirp,
        loadUsers,
        loadUser,
        followUser
    }
})();