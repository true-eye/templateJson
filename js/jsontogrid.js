class Parser {
    createRow(r) {
        return '<div class="row ' + r.title + '">' + this.parse(r) + '</div>';
    }

    createColumn(c, w) {
        return '<div style="background-color : ' + 
        c.color + '" class="col-lg-' + w + ' ' + (c.title ? c.title : '') + '">' + 
        (c.text ? c.text : '') + this.parse(c) + '</div>';
    }
    
    createMenu(menu) {
        return `<nav class="navbar navbar-expand-lg navbar-dark ${menu.title} bg-success">
                    <a class="navbar-brand" href="#">${menu.text}</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent15" aria-controls="navbarSupportedContent15" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent15">
                        <ul class="navbar-nav mr-auto">` + 
                            this.parse(menu) + 
                    `   </ul>
                    </div>
                </nav>`;
    }

    createMenuItem(item) {
        if( item.active == true )
            return `<li class="nav-item active">
                        <a class="nav-link" href="#">${item.itemText} <span class="sr-only">(current)</span></a>
                    </li>`;
        else
            return `<li class="nav-item">
                        <a class="nav-link" href="#">${item.itemText}</a>
                    </li>`;
    }

    parse(s) {
        let S = '';
        
        if (s.menu) {
            console.log(s.menu);
            S += this.createMenu(s.menu);
        }

        if (s.items) {
            for (let i in s.items) {
                S += this.createMenuItem(s.items[i]);
            }
        }

        if (s.rows) {
            for (let i in s.rows) {
                S += this.createRow(s.rows[i]);
            }
        }

        if (s.columns) {
            let width = 12 / Object.keys(s.columns).length;
            for (let i in s.columns) {
                S += this.createColumn(s.columns[i], width);
            }
        }

        return S;
    }
}
let json2bootgrid = (inputJson) => {
    return new Parser().parse(inputJson);
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}