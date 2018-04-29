class PaymentManager {
    constructor(title) {
        this.title = title;
    }

    render(id) {
        const table = $('<table>');
        const addButton = $('<button>Add</button>');
        addButton.click(function() {
            const tr = $(this).parent().parent();
            const table = $(this).parent().parent().parent().parent();

            const name = tr.find('input[name=name]');
            const category = tr.find('input[name=category]');
            const price = tr.find('input[name=price]');

            if (name.val() === '' || category.val() === '' || price.val() === '') {
                return Error('Please fill the requirement fields');
            }

            const payments = table.find('.payments');
            const deleteButton = $('<button>Delete</button>');
            deleteButton.click(function() {
                const tr = $(this).parent().parent();
                tr.remove();
            });

            payments
                .append($('<tr>')
                    .append(`<td>${name.val()}</td>`)
                    .append(`<td>${category.val()}</td>`)
                    .append(`<td>${Number(price.val())}</td>`)
                    .append($('<td>').append(deleteButton)));

            name.val('');
            category.val('');
            price.val('');
        });

        table
            .append(`<caption>${this.title} Payment Manager</caption>`)
            .append('<thead>' +
                '<tr>' +
                '<th class="name">Name</th>' +
                '<th class="category">Category</th>' +
                '<th class="price">Price</th>' +
                '<th>Actions</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody class="payments"></tbody>')
            .append($('<tfoot class="input-data">')
                .append($('<tr>')
                    .append('<td><input name="name" type="text"></td>' +
                        '<td><input name="category" type="text"></td>' +
                        '<td><input name="price" type="number"></td>')
                    .append($('<td>').append(addButton))));

        table.appendTo(`#${id}`);
    }
}