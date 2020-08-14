class Block {
    constructor(classList, tagName = 'div',  id) {
        this.classList = classList;
        this.tagName = tagName;
        this.id = id;
        this._element = null;
    }
    render() {
        if(!this._element) {
            this._element = document.createElement(this.tagName);

            if(this.classList) {
                this._element.classList.add(this.classList);
            }
            if(this.id) {
                this._element.id = this.id;
            }

            return this._element;
        }
    }
}

class BlockImg extends Block{
    constructor(classList, scr) {
        super(classList, 'img');
        this.scr = scr;
    }

    render() {
        super.render();
        this._element.src = this.scr;
        return this._element;
    }
}

class BlockDivWithImg extends Block {
    constructor(classList, arrayWithImg, classListImg) {
        super(classList,  'div');
        this.arrayWithImg = arrayWithImg;
        this.classListImg = classListImg;
    }

    render() {
        super.render();
        this.arrayWithImg.forEach((element, index) => {
            const blockImg = new BlockImg(`${this.classListImg}`, element).render();
            //console.log(index)
            if(index !== 0) {
                blockImg.classList.add('itemImgNoneDisplay');
            }
            this._element.appendChild(blockImg);


        } );
        return this._element;
    }

}

class BlockTextContent extends Block {
    constructor(classList, textContent, tagName,  id) {
        super(classList, tagName, id);
        this.textContent = textContent;
    }
    render() {
        super.render();
        this._element.textContent = this.textContent;
        return this._element;
    }
}

class BlockH2 extends BlockTextContent {
    constructor(classList, textContent, id) {
        super(classList, textContent, 'h2',  id);
    }
}

class BlockP extends BlockTextContent {
    constructor(classList, textContent, id) {
        super(classList, textContent, 'p',  id);
    }
}

class BlockButton extends BlockTextContent{
    constructor(classList, textContent, id) {
        super(classList, textContent, 'button',  id);
    }
}