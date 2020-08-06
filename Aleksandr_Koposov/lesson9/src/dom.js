class Dom {
    constructor(tagOrId, classes = '', clickCallback = null, innerHtml = '') {
        let el = null;
        if (tagOrId[0] === '#') {
            el = document.getElementById(tagOrId.substr(1));
        } else {
            el = document.createElement(tagOrId);
        }
        if (classes) {
            el.className = classes;
        }
        if (clickCallback && typeof clickCallback === 'function') {
            el.addEventListener('click', clickCallback);
        }
        if (innerHtml) {
            el.innerHTML = innerHtml;
        }
        this._el = el;
        return el;
    }
}
