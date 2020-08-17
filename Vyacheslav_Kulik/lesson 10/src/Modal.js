class Modal {
    constructor() {
        this.init();
    }

    init() {
        //this.modalHandler(document.querySelectorAll('.itemDivImg'), 'flex');
        //this.modalHandler(document.querySelectorAll('.itemModalClose'), 'none');
        this.modalWindowOpen();
        this.modalWindowClose();
        this.modalWindowNextImg();
        this.modalWindowPreviousImg();
        this.modalKeyHandler();


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
            allModalWindowClose[i].addEventListener('click', (function (event) {
                allModalWindow[i].style.display = 'none';
                this.setDefaultModal(event);

            }).bind(this));

        }
    }

    setDefaultModal(event) {
        let itemDivImgFull;
        //console.log(event.path[0]);
        if(event.path[0].classList.contains('itemModalRight')) {
            itemDivImgFull = event.target.parentNode.parentNode.children[0].children;
        } else {
            itemDivImgFull = event.target.parentNode.children[0].children;
        }
        itemDivImgFull[0].classList.remove('itemImgNoneDisplay');
        for (let j = 0; j < itemDivImgFull.length; j++) {
            if (j) {
                itemDivImgFull[j].classList.add('itemImgNoneDisplay');
            }
        }
    }

    modalWindowPreviousImg() {
        const allItemModalLeftDiv = document.querySelectorAll('.itemModalLeftDiv');
        for (let i = 0; i < allItemModalLeftDiv.length; i++) {
            allItemModalLeftDiv[i].addEventListener('click', function (event) {
                //const allImg = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.children;
                let allImg;
                if (event.path[0].classList.contains('itemModalLeft')) {
                    allImg = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.children;

                } else {
                    allImg = event.target.previousElementSibling.previousElementSibling.previousElementSibling.children;
                }

                const currentImg = (allImg) => {
                    for (let j = 0; j < allImg.length; j++) {

                        if (!allImg[j].classList.contains('itemImgNoneDisplay')) {
                            return allImg[j];
                        }

                    }
                }
                const lastElement = allImg[allImg.length - 1];
                const previousElement = currentImg(allImg).previousElementSibling;
                if (previousElement === null) {
                    lastElement.classList.remove('itemImgNoneDisplay');
                    for (let j = 0; j < allImg.length; j++) {
                        if (j !== allImg.length - 1) {
                            allImg[j].classList.add('itemImgNoneDisplay');
                        }
                    }
                } else {
                    currentImg(allImg).classList.add('itemImgNoneDisplay');
                    previousElement.classList.remove('itemImgNoneDisplay');

                }
            });

        }
    }

    modalWindowNextImg() {
        const allItemModalRightDiv = document.querySelectorAll('.itemModalRightDiv');
        for (let i = 0; i < allItemModalRightDiv.length; i++) {
            allItemModalRightDiv[i].addEventListener('click', (function (event) {
                let allImg;
                if (event.path[0].classList.contains('itemModalRight')) {
                    allImg = event.target.parentNode.previousElementSibling.previousElementSibling.children;
                } else {
                    allImg = event.target.previousElementSibling.previousElementSibling.children;
                }

                const currentImg = (allImg) => {
                    for (let j = 0; j < allImg.length; j++) {

                        if (!allImg[j].classList.contains('itemImgNoneDisplay')) {
                            return allImg[j];
                        }

                    }
                }
                const nextElement = currentImg(allImg).nextElementSibling;
                if (nextElement === null) {
                        this.setDefaultModal(event);

                } else {
                    nextElement.classList.remove('itemImgNoneDisplay');
                    currentImg(allImg).classList.add('itemImgNoneDisplay');
                }

            }).bind(this));

        }
    }
    modalKeyHandler() {
        document.addEventListener('keydown', function (event) {
            switch(event.key){
                case 'ArrowLeft':
                {
                    const allItemModalLeftDiv = document.querySelectorAll('.itemModalLeftDiv');
                    allItemModalLeftDiv.forEach((element) => element.click());
                    break;
                }
                case 'ArrowRight':
                {
                    const allItemModalRightDiv = document.querySelectorAll('.itemModalRightDiv');
                    allItemModalRightDiv.forEach((element) => element.click());
                    break;
                }
                case 'Escape':
                {
                    const allItemModalClose = document.querySelectorAll('.itemModalClose');
                    allItemModalClose.forEach((element) => element.click());
                    break;
                }

            }





        });
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
                } else {
                    nextElement.classList.remove('itemImgNoneDisplay');
                }
                currentElement.classList.add('itemImgNoneDisplay');
            });

            // document.addEventListener('keydown', function (event) {
            //         switch(event.key){
            //             case 'ArrowLeft':
            //
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