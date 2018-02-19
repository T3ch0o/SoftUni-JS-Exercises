function addItem() {
    let input = document.getElementById('newText');
    if (input.value.length === 0) return;

    let newLi = document.createElement('li');
    newLi.textContent = `${input.value} `;
    let deleteLink = document.createElement('a');
    deleteLink.textContent = '[Delete]';
    deleteLink.href = '#';
    deleteLink.addEventListener('click', deleteItem);
    newLi.appendChild(deleteLink);

    document.getElementById('items').appendChild(newLi);
    input.value = '';

    function deleteItem() {
        document.getElementById('items').removeChild(newLi);
    }
}