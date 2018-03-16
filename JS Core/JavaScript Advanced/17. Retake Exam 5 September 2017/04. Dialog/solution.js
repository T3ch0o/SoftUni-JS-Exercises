class Dialog {
    constructor(message, callback) {
        this.message = message;
        this.callback = callback;
        this.inputs = [];
    }

    addInput(label, name, type) {
        this.inputs.push(`${label} ${name} ${type}`);
    }

    render() {
        const that = this;

        const overlayDiv = $('<div>').addClass('overlay');
        const dialogDiv = $('<div>').addClass('dialog');
        dialogDiv.append($(`<p>${that.message}</p>`));

        for (let input of this.inputs) {
            let [label, name, type] = input.split(' ');
            dialogDiv.append($(`<label>${label}</label>`))
                .append($(`<input name="${name}" type="${type}">`));
        }

        const buttonOk = $('<button>OK</button>');
        const buttonCancel = $('<button>Cancel</button>');

        buttonOk.click(function () {
            const parameters = { };
            const inputs = document.querySelectorAll('input');

            for (const input of inputs) {
                parameters[input.name] = input.value;
            }

            that.callback(parameters);

            overlayDiv.remove();
        });

        buttonCancel.click(function () {
            overlayDiv.remove();
        });

        dialogDiv.append(buttonOk).append(buttonCancel);
        dialogDiv.appendTo(overlayDiv);

        $('body').append(overlayDiv);
    }
}