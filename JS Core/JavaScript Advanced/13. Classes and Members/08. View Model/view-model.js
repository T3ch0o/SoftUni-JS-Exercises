class Textbox {
    constructor(selector, regex) {
        this._elements = $(selector);
        this._value = $(this._elements[0]).val();
        this._ivalidSymbols = regex;
        this.onInput();
    }

    get elements() {
        return this._elements;
    }


    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        for (let el of this.elements) {
            $(el).val(value);
        }
    }

    isValid() {
        return !this._ivalidSymbols.test(this.value);
    }

    onInput () {
        this.elements.on('input', (event) => {
            let text = $(event.target).val();
            this.value = text;
        });
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input',function(){console.log(textbox.value);});
