function attachEvents() {
    const authorization = `Basic ${btoa("techo:t")}`;
    const angler = $('#addForm .angler');
    const weight = $('#addForm .weight');
    const species = $('#addForm .species');
    const location = $('#addForm .location');
    const bait = $('#addForm .bait');
    const captureTime = $('#addForm .captureTime');
    const cathes = $('#catches');

    // Attach event listeners
    $('.load').click(displayAllCatches);
    $('.add').click(createCatch);

    function request(endpoint, method, data) {
        return $.ajax({
            url: `https://baas.kinvey.com/appdata/kid_rydWmVB5f/biggestCatches/${endpoint}`,
            method: method,
            contentType: 'application/json',
            data: data,
            headers: {
                Authorization: authorization
            }
        });
    }

    function displayAllCatches() {
        cathes.empty();
        cathes.text('Loading...');
        request('', 'GET')
            .then(function(response) {
                cathes.empty();

                for (let data of response) {
                    let div = $('<div>').addClass('catch').attr('data-id', data._id);
                    let updateBtn = $('<button>Update</button>').addClass('update');
                    let deleteBtn = $('<button>Delete</button>').addClass('delete');

                    updateBtn.click(updateCatch);
                    deleteBtn.click(deleteCatch);

                    div
                        .append(`<label>Angler</label>` +
                            `<input type="text" class="angler" value="${data.angler}"/>` +
                            `<label>Weight</label>` +
                            `<input type="number" class="weight" value="${data.weight}"/>` +
                            `<label>Species</label>` +
                            `<input type="text" class="species" value="${data.species}"/>` +
                            `<label>Location</label>` +
                            `<input type="text" class="location" value="${data.location}"/>` +
                            `<label>Bait</label>` +
                            `<input type="text" class="bait" value="${data.bait}"/>` +
                            `<label>Capture Time</label>` +
                            `<input type="number" class="captureTime" value="${data.captureTime}"/>`)
                        .append(updateBtn)
                        .append(deleteBtn)
                        .appendTo(cathes);
                }
            });
    }

    function createCatch() {
        const catchForm = JSON.stringify({
            angler: angler.val(),
            weight: Number(weight.val()),
            species: species.val(),
            location: location.val(),
            bait: bait.val(),
            captureTime: Number(captureTime.val())
        });

        request('', 'POST', catchForm);

        angler.val('');
        weight.val('');
        species.val('');
        location.val('');
        bait.val('');
        captureTime.val('');
    }

    function updateCatch() {
        const currentCatch = $(this).parent();

        const catchForm = JSON.stringify({
            angler: currentCatch.find('.angler').val(),
            weight: Number(currentCatch.find('.weight').val()),
            species: currentCatch.find('.species').val(),
            location: currentCatch.find('.location').val(),
            bait: currentCatch.find('.bait').val(),
            captureTime: Number(currentCatch.find('.captureTime').val())
        });

        request(`${currentCatch.attr('data-id')}`, 'PUT', catchForm);
    }

    function deleteCatch() {
        const currentCatch = $(this).parent();

        request(`${currentCatch.attr('data-id')}`, 'DELETE');
        currentCatch.remove();
    }
}