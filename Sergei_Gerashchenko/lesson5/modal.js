let modalWindow = null;
function createModal() {
    modalWindow = document.createElement("div");

    //Добвляем кнопку закрыть
    modalWindow.className='modal-back';
    let top = document.createElement("div");
    top.className='modal-top';
    let a = document.createElement("a");
    a.addEventListener('click', function (event) {
        event.preventDefault();
        hideModal();
    })
    a.className='modal-close';
    a.textContent = 'X';
    top.appendChild(a);
    modalWindow.appendChild(top);


    let content = document.createElement("div");
    content.className='modal-main';
    let prevDiv = document.createElement("div");
    prevDiv.id = 'prev-img';
    a = document.createElement("a");
    a.addEventListener('click', function (event) {
        event.preventDefault();
        prevImage();
    })
    a.textContent = "<";
    a.className='modal-close';
    prevDiv.appendChild(a);
    content.appendChild(prevDiv);

    let img = document.createElement("img");
    img.id = 'modal-img';
    img.className = 'modal-img';
    content.appendChild(img);

    let nextDiv = document.createElement("div");
    nextDiv.id = 'next-img';
    a = document.createElement("a");
    a.addEventListener('click', function (event) {
        event.preventDefault();
        nextImage();
    })
    a.textContent = ">";
    a.className='modal-close';
    nextDiv.appendChild(a);
    content.appendChild(nextDiv);
    modalWindow.appendChild(content);


    document.body.appendChild(modalWindow);


}
let currentImg = -1;
let currentItem = null;
function showModal(index) {
    currentItem = index;
    console.log(catalog)
    if(catalog[index].images.length>0){
        i = document.getElementById('modal-img')
        i.src = catalog[index].images[0];
        currentImg=0;
        document.getElementById('prev-img').style.visibility = 'hidden';
        if(catalog[index].images.length==1)
            document.getElementById('next-img').style.visibility = 'hidden';
    }
    modalWindow.style.visibility = 'visible';
}
function hideModal() {
    currentItem=null;
    modalWindow.style.visibility = 'hidden';

}

function prevImage() {
    let index = currentItem;
    let imgId = currentImg-1;
    if(catalog[index].images.length>0){
        i = document.getElementById('modal-img')
        i.src = catalog[index].images[imgId];
        currentImg=imgId;
        if(imgId>0)
            document.getElementById('prev-img').style.visibility = 'visible';
        else
            document.getElementById('prev-img').style.visibility = 'hidden';
        if(catalog[index].images.length>imgId+1)
            document.getElementById('next-img').style.visibility = 'visible';
        else
            document.getElementById('next-img').style.visibility = 'hidden';
    }

}
function nextImage() {
    let index = currentItem;
    let imgId = currentImg+1;
    if(catalog[index].images.length>0){
        i = document.getElementById('modal-img')
        i.src = catalog[index].images[imgId];
        currentImg=imgId;
        if(imgId>0)
            document.getElementById('prev-img').style.visibility = 'visible';
        else
            document.getElementById('prev-img').style.visibility = 'hidden';
        if(catalog[index].images.length>imgId+1)
            document.getElementById('next-img').style.visibility = 'visible';
        else
            document.getElementById('next-img').style.visibility = 'hidden';
    }
}