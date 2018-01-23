function emailValidator(email) {
    let pat = /^[a-zA-Z0-9]+\@[a-z]+\.[a-z]+$/g;;

    return pat.test(email) ? 'Valid' : 'Invalid';
}

console.log(emailValidator('valid@email.bg'));