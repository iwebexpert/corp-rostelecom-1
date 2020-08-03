function _AppendChild(parent, child) {
    if (parent == null || child == null)
        return
    else
        parent.appendChild(child);
}

function closeModal() {
    let modal = document.getElementById('modal');
    if (modal != null) {
        modal.classList.remove("open");
        document.onkeydown = null;
    }

}

function showSpan() {
    let modal = document.getElementById('modal');
    if (modal != null)
        modal.classList.remove("open");

} 