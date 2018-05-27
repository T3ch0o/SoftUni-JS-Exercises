const fs = require('fs');
let storage = {};

const commands = (() => {
    function put(key, value) {
        validateKey(key);
        storage[key] = value;
    }
    
    function get(key) {
        validateKey(key);
        return storage[key];
    }

    function getAll() {
        if (Object.keys(storage).length === 0) {
            throw new Error('There is not nothing in the storage!');
        }

        return storage;
    }
    
    function update(key, newValue) {
        validateKey(key);
        storage[key] = newValue;
    }
    
    function remove(key) {
        validateKey(key, 1);
        delete storage[key];
    }
    
    function clear() {
        storage = {};
    }
    
    function save() {
        const json = JSON.stringify(storage);
        fs.writeFileSync('./01. Storage/storage.json', json);
    }
    
    function load() {
        const data = fs.readFileSync('/storage.json').toString();
        storage = JSON.parse(data);
    }
    
    function validateKey(key, type) {
        if (typeof key !== 'string') {
            throw new Error('The key must be a string!');
        } else if (storage.hasOwnProperty(key) && type === 0) {
            throw new Error('The key is already in there.');
        } else if (!storage.hasOwnProperty(key) && type === 1) {

        }
    }

    return {
        put,
        get,
        getAll,
        update,
        remove,
        clear,
        save,
        load
    }
})();

module.exports = commands;
