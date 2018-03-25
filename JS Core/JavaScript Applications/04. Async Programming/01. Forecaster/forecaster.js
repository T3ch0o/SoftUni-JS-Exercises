function attachEvents() {
    const location = $('#location');
    const forecast = $('#forecast');
    const weatherSymbols = {
        sunny: '&#x2600',
        partlysunny: '&#x26C5',
        overcast: '&#x2601',
        rain: '&#x2614'
    };

    $('#submit').click(getWeather);

    function request(endpoint) {
        return $.ajax({
            url: `https://judgetests.firebaseio.com/${endpoint}.json`
        })
    }

    function getWeather() {
        request(`locations`).then(function(response) {
            for (let city of response) {
                if (city.name === location.val()) {
                    printWeather(city.code);
                    return;
                }
            }
            displayError();
        });
    }

    function displayError() {
        forecast.css('display', 'block');
        forecast.find('span').remove();
        $('.label').text('Nothing here!');
    }

    function printWeather(code) {
        Promise
            .all([
                request(`forecast/today/${code}`),
                request(`forecast/upcoming/${code}`)
            ])
            .then(function([currentCondition, daysForecast]) {
                forecast.css('display', 'block');
                forecast.find('span').remove();

                const currentSymbol = currentCondition.forecast.condition.split(' ').join('').toLowerCase();

                $(`<span>${weatherSymbols[currentSymbol]}</span>`)
                    .addClass('symbol')
                    .addClass('condition')
                    .appendTo('#current');

                let condition = $('<span>').addClass('condition');

                condition
                    .append($(`<span>${currentCondition.name}</span>`).addClass('forecast-data'))
                    .append($(`<span>${currentCondition.forecast.low}&#176;/${currentCondition.forecast.high}&#176;</span>`).addClass('forecast-data'))
                    .append($(`<span>${currentCondition.forecast.condition}</span>`).addClass('forecast-data'))
                    .appendTo('#current');

                for (let data of daysForecast.forecast) {
                    let upcoming = $('<span>').addClass('upcoming');
                    const symbol = data.condition.split(' ').join('').toLowerCase();

                    upcoming
                        .append($(`<span>${weatherSymbols[symbol]}</span>`).addClass('symbol'))
                        .append($(`<span>${data.low}&#176;/${data.high}&#176;</span>`).addClass('forecast-data'))
                        .append($(`<span>${data.condition}</span>`).addClass('forecast-data'))
                        .appendTo('#upcoming');
                }
            })
    }
}