function create(sentences) {
    let div = document.getElementById('content');

    for (let i = 0; i < sentences.length; i++) {
        let section = document.createElement('div');
        let paragraph = document.createElement('p');
        paragraph.style.display = 'none';

        paragraph.textContent = sentences[i];
        section.appendChild(paragraph);
        div.appendChild(section);
    }

    let divs = document.querySelectorAll('#content div');

    for (let i = 0; i < sentences.length; i++) {
        divs[i].addEventListener('click', showParagraph);
    }

    function showParagraph(event) {
        let style = event.target.firstChild.style.display;
        event.target.firstChild.style.display = style === 'none' ? 'block' : 'none';
    }
}