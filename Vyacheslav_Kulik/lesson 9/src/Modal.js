class Modal {
    constructor() {
        this.init();
    }

    init() {
        //this.modalHandler(document.querySelectorAll('.itemDivImg'), 'flex');
        //this.modalHandler(document.querySelectorAll('.itemModalClose'), 'none');
        this.modalWindowOpen()
        this.modalWindowClose()
        this.modalWindowChangeImg()
    }

    // modalHandler(selector, action) {
    //     const allModalWindow = document.querySelectorAll('.itemModal');
    //     for (let i = 0; i < selector.length; i++) {
    //         selector[i].addEventListener('click', function () {
    //             allModalWindow[i].style.display = `${action}`;
    //         })
    //     }
    // }

    modalWindowOpen() {
        const allPhotoItems = document.querySelectorAll('.itemDivImg');
        const allModalWindow = document.querySelectorAll('.itemModal');
        //console.log(allPhotoItems);
        //console.log(allModalWindow);
        for (let i = 0; i < allPhotoItems.length; i++) {
            allPhotoItems[i].addEventListener('click', function () {
                allModalWindow[i].style.display = 'flex';
            });

        }
    }

    modalWindowClose() {
        const allModalWindowClose = document.querySelectorAll('.itemModalClose');
        const allModalWindow = document.querySelectorAll('.itemModal');
        for (let i = 0; i < allModalWindowClose.length; i++) {
            allModalWindowClose[i].addEventListener('click', function (event) {
                allModalWindow[i].style.display = 'none';

            });
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    allModalWindow[i].style.display = 'none';
                }
            });

        }
    }

    modalWindowChangeImg() {
        const allModalItemImgFull = document.querySelectorAll('.itemImgModal');
        //console.log(allModalItemImgFull)

        for (let i = 0; i < allModalItemImgFull.length; i++) {
            allModalItemImgFull[i].addEventListener('click', function (event) {
                const parrentDiv = event.target.parentNode;
                const currentElement = event.target;
                const nextElement = event.target.nextElementSibling;
                if (nextElement === null) {
                    parrentDiv.children[0].classList.remove('itemImgNoneDisplay');
                    currentElement.classList.add('itemImgNoneDisplay');
                } else {
                    nextElement.classList.remove('itemImgNoneDisplay');
                    currentElement.classList.add('itemImgNoneDisplay');
                }
            });
            //TODO keydown
            // document.addEventListener('keydown', function (event) {
            //         switch(event.key){
            //             case 'ArrowLeft':
            //                 //console.log(allModalItemImgFull[i]);
            //
            //             case 'ArrowRight':
            //
            //         }
            //
            //
            // });
        }
    }
}