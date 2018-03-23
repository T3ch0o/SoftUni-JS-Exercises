function solve() {
    const departBtn = $('#depart');
    const arriveBtn = $('#arrive');
    const spanInfo = $('.info');

    let currentId = 'depot';
    let nextStopId = '';

    return {
        depart: function () {
            departBtn.prop('disabled', true);

            const req = {
                url: `https://judgetests.firebaseio.com/schedule/${currentId}.json`,
                success: function (stopId) {
                    spanInfo.text(`Next stop ${stopId.name}`);
                    currentId = stopId.name;
                    nextStopId = stopId.next;
                }
            };

            $.ajax(req);

            arriveBtn.prop('disabled', false);
        },
        arrive: function () {
            arriveBtn.prop('disabled', true);
            spanInfo.text(`Arriving at ${currentId}`);
            currentId = nextStopId;
            departBtn.prop('disabled', false);
        }
    };
}

let result;

$(function() {
    result = solve()
});