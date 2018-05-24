$(() => {
    const elementsContainer = $('#elementsContainer');
    const elementInfo = $('#elementInfo');
    const creatures = $('.creatures');
    const center = $('.center-after-click');
    const right = $('#right-after-click');

    renderPage();

    function renderPage() {
        $('#first')
            .append('<div id="air" class="first clickable"></div>' +
                '<div id="fire" class="second clickable"></div>');
        $('#second')
            .append('<div id="water" class="third clickable"></div>' +
                '<div id="earth" class="fourth clickable"></div>');

        $('#backToElements').click(function() {
            elementsContainer.toggle();
            elementInfo.toggle();
            creatures.empty();
            center.empty();
            right.empty();
        });

        $('#air').click(renderCurrentElement);

        $('#fire').click(renderCurrentElement);

        $('#water').click(renderCurrentElement);

        $('#earth').click(renderCurrentElement);
    }
    
    function renderCurrentElement() {
        elementsContainer.toggle();
        elementInfo.toggle();

        const element = $(this).attr('id');

        switch (element) {
            case 'air':
                creatures
                    .append($('<li>').append('<input class="radio-button checked" name="selector" type="radio" value="Archangel"><label>Archangel</label>'))
                    .append('<li><input class="radio-button checked" name="selector" type="radio" value="Air Elemental"><label>Elemental</label></li>');

                    $('input').click(getChampion);
                break;
            case 'fire':
                creatures
                    .append('<li><input class="radio-button checked" name="selector" type="radio" value="Diablo"><label>Diablo</label></li>' +
                        '<li><input class="radio-button checked" name="selector" type="radio" value="Fire Dragon"><label>Fire Dagon</label></li>' +
                        '<li><input class="radio-button checked" name="selector" type="radio" value="Fire Guardian"><label>Fire Guardian</label></li>');

                    $('input').click(getChampion);
                break;
            case 'water':
                creatures
                    .append('<li><input class="radio-button checked" name="selector" type="radio" value="Leviathan"><label>Leviathan</label></li>' +
                        '<li><input class="radio-button checked" name="selector" type="radio" value="Mermaid"><label>Mermaid</label></li>' +
                        '<li><input class="radio-button checked" name="selector" type="radio" value="Ocean Beast"><label>Ocean Beast</label></li>');

                    $('input').click(getChampion);
                break;
            case 'earth':
                creatures
                    .append('<li><input class="radio-button checked" name="selector" type="radio" value="Earth Elemental"><label>Elemental</label></li>' +
                        '<li><input class="radio-button checked" name="selector" type="radio" value="Forest God"><label>Forest God</label></li>' +
                        '<li><input class="radio-button checked" name="selector" type="radio" value="Werewolf"><label>Werewolf</label></li>');

                    $('input').click(getChampion);
                break;
        }
    }

    function getChampion() {
        const currentChamp = $(this).attr('value');

        switch (currentChamp) {
            case 'Archangel':
                center
                    .html('<img id="creature-image" src="images/archangel.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Archangel</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Air Elemental':
                center
                    .html('<img id="creature-image" src="images/air-elemental.png" alt="archangel">');
                right
                    .html('<p id="creature-name">Air Elemental</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Diablo':
                center
                    .html('<img id="creature-image" src="images/diablo.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Daiblo</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Fire Dragon':
                center
                    .html('<img id="creature-image" src="images/fire-dragon.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Fire Dragon</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Fire Guardian':
                center
                    .html('<img id="creature-image" src="images/fire-guardian.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Fire Guardian</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Leviathan':
                center
                    .html('<img id="creature-image" src="images/leviathan.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Leviathan</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Mermaid':
                center
                    .html('<img id="creature-image" src="images/mermaid.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Mermaid</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Ocean Beast':
                center
                    .html('<img id="creature-image" src="images/ocean-beast.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Ocean Beast</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Earth Elemental':
                center
                    .html('<img id="creature-image" src="images/hippogryph.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Earth Elemental</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Forest God':
                center
                    .html('<img id="creature-image" src="images/forest-god.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Forest God</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
            case 'Werewolf':
                center
                    .html('<img id="creature-image" src="images/werewolf.jpg" alt="archangel">');
                right
                    .html('<p id="creature-name">Werewolf</p>' +
                        '<p id="creature-power">Power:2000</p>' +
                        '<p id="creature-ultimate">Ultimate: Wind Justice</p>' +
                        '<p id="creature-region">Region: Heaven’s Kingdom</p>');
                break;
        }
    }
});