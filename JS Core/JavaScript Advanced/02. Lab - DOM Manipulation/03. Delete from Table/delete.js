function deleteByEmail() {
    let input = document.getElementsByName('email')[0];
    let emails = document.querySelectorAll('#customers tr td:last-child');

    if (emails.length === 0) {
        document.getElementById('result').textContent = 'No emails found.';
        return;
    }

    for (let email of emails) {
        if (email.textContent === input.value) {
            let row = email.parentNode;
            row.parentNode.removeChild(row);
            input.value = '';
            document.getElementById('result').textContent = 'Deleted.';
            return;
        }
    }

    document.getElementById('result').textContent = 'Not found.';
}