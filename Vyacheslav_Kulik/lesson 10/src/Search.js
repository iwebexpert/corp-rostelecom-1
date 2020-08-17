class Search {
    constructor(listItems) {
        this.listItems = listItems;
        this.listItemsAfterFilter = [];
        //this.getValueFromSearchLine();
    }

    filter(query) {
        const regExp = new RegExp(query, 'i');
       // console.log(this.listItems)
        this.listItemsAfterFilter = this.listItems.filter(element => {
            //console.log(regExp.test(element.type));
            return regExp.test(element.type);
        });
        return this.listItemsAfterFilter;
    }

}