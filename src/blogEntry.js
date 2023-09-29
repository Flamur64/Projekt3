"use strict";

class blogEntry {
    constructor(id,title, content) {
        this.id= id;
        this.title = title;
        this.content = content;
        this.publicDate = new Date(); //geklappt lol
        //this.imageURL = imageURL; // fürs Image, hmhmhm später...?
        this.comments = []; 
    }
}




module.exports = blogEntry;