$(() => {
    $('.toggle').click(function() {
        const currentLi = $(this);

        if (currentLi.next().hasClass('show')) {
            currentLi.next().removeClass('show');
            currentLi.next().slideUp(350);
        } else {
            currentLi.parent().parent().find('li .inner').removeClass('show');
            currentLi.parent().parent().find('li .inner').slideUp(350);
            currentLi.next().toggleClass('show');
            currentLi.next().slideToggle(350);
        }
    });
});