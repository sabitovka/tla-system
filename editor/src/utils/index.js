export function parseQuery(queryString) {
    if (queryString === '') {
        return {};
    }

    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

// https://stackoverflow.com/a/51086893
export function Mutex() {
    let current = Promise.resolve();
    this.lock = () => {
        let _resolve;
        const p = new Promise(resolve => {
            _resolve = () => resolve();
        });
        // Caller gets a promise that resolves when the current outstanding
        // lock resolves
        const rv = current.then(() => _resolve);
        // Don't allow the next request until the new promise is done
        current = p;
        // Return the new promise
        return rv;
    };
}