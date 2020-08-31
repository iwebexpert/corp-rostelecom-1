function showHide(id) {
    let el = document.getElementById(id)
    if (el.classList.contains('hide')) {
        el.classList.remove('hide')
    } else {
        el.classList.add('hide')
    }

}