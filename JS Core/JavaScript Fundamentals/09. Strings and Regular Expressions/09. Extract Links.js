function extractLinks(input) {
    let pattern = /www\.[a-zA-Z0-9\-]+(\.[a-z.]+)+/g;

    let match;

    for (let i = 0; i < input.length; i++) {
        match = input[i].match(pattern);

        if (match == null) {
            continue;
        }

        console.log(match[0]);
    }

}

extractLinks([
    "Join WebStars now for free, at www.web-stars.com",
    "You can also support our partners:",
    "Internet - www.internet.com",
    "WebSpiders - www.webspiders101.com",
    "Sentinel - www.sentinel.-ko"
]);