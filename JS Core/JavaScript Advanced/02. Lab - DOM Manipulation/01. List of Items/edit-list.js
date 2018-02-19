function addItem() {
    let input = document.getElementById('newItemText');
    if (input.value.length === 0) return;

    let newLi = document.createElement('li');
    newLi.textContent = input.value;
    input.value = '';

    document.getElementById('items').appendChild(newLi);
}