"use strict";

class blogEntry {
    constructor(id,title, content) {
         this.id= id;
        this.title = title;
        this.content = content;
        this.publicDate = new Date();
    }
}

module.exports = blogEntry;