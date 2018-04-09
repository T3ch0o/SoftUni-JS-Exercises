let auth = (() => {

    function isAuth() {
        return localStorage.getItem('authtoken') !== null;
    }
    
    function saveSession(userData) {
        localStorage.setItem('username', userData.username);
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('authtoken', userData._kmd.authtoken);
    }
    
    function login(username, password) {
        return remote.post('user', 'login', 'basic', { username, password });
    }
    
    function register(username, password) {
        remote.post('user', '', 'basic', { username, password })
            .then(saveSession)
            .catch(console.error);
    }

    function logout() {
        remote.post('user', '_logout', 'kinvey')
            .then(() => {
                localStorage.clear();
            })
            .catch(console.error);
    }

    return {
        isAuth,
        login,
        register,
        logout,
        saveSession
    }
})();