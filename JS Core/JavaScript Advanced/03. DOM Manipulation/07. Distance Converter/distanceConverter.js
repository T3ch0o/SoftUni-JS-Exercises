function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', convert);

    function convert() {
        let firstSelect = document.getElementById('inputUnits');
        let secondSelect = document.getElementById('outputUnits');
        let index1 = firstSelect.selectedIndex;
        let index2 = secondSelect.selectedIndex;
        let firstUnit = firstSelect.children[index1].value;
        let secondUnit = secondSelect.children[index2].value;

        let num = Number(document.getElementById('inputDistance').value);

        switch (firstUnit) {
            case 'km':
                num *= 1000;
                break;
            case 'cm':
                num *= 0.01;
                break;
            case 'mm':
                num *= 0.001;
                break;
            case 'mi':
                num *= 1609.34;
                break;
            case 'yrd':
                num *= 0.9144;
                break;
            case 'ft':
                num *= 0.3048;
                break;
            case 'in':
                num *= 0.0254;
                break;
        }
        switch (secondUnit) {
            case 'km':
                num /= 1000;
                break;
            case 'cm':
                num /= 0.01;
                break;
            case 'mm':
                num /= 0.001;
                break;
            case 'mi':
                num /= 1609.34;
                break;
            case 'yrd':
                num /= 0.9144;
                break;
            case 'ft':
                num /= 0.3048;
                break;
            case 'in':
                num /= 0.0254;
                break;
        }

        document.getElementById('outputDistance').value = `${num}`
    }
}