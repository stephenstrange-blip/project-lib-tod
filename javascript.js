const myLibrary = [];

function Book(title, author, genre, numPages, isRead = false, price) {
    this.Title = title;
    this.Author = author;
    this.Pages = numPages;
    this.Status = isRead ? "Read" : "Not Yet Read"
    this.Genre = genre;
    this.Price = price;
}

Book.prototype.info = function () {
    let status = this.Status ? "already read" : "not yet read";
    return (`${this.Title} by ${this.Author}, ${this.Pages} pages, ${status}. It sells at ${this.price}`);
}

function SearchList(list) {
    this.list = list;
}

SearchList.prototype.setSearchList = function () {
    // Create a dataList, link it to the input and add to form
    const input = document.getElementById("book-search");
    const dataList = document.createElement("datalist");

    dataList.setAttribute("id", "search-list");
    input.setAttribute("list", "search-list");

    this.list.forEach((item) => {
        const option = document.createElement("option");
        option.setAttribute("value", item);
        dataList.appendChild(option);
    })

    const form = document.querySelector("form")
    form.appendChild(dataList)
}

function Table(list) {
    this.list = list;
    this.mainHeader = "Books";
    this.table = undefined; // property that will be added to the DOM html
}

Table.prototype.setTable = function () {
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Books I need to read for 2025"


    const thead = this.setHeaders();
    const tbody = this.setBody();
    // const tbody = this.setBody();

    // table.appendChild(caption);
    // table.appendChild(thead);
    // table.appendChild(tbody);
    table.append(caption, thead, tbody);
    this.table = table;

}

Table.prototype.setHeaders = function () {
    const thead = document.createElement("thead");
    const mainHeader = this.mainHeader;
    //keys of a Book Object serve as subheaders, i.e. Title
    const subHeaders = Object.keys(this.list[0])

    console.log(subHeaders);

    function setMainHeader() {
       
        // Create a single header that spans across all subheaders, i.e. Books
        const mainHeaderRow = document.createElement("th");
        const tr = document.createElement("tr");
        console.log(subHeaders.length)

        Object.assign(mainHeaderRow, {
            id: mainHeader,
            // camelCase for multi-word attributes even if they're not camelCased in actual DOM
            colSpan: subHeaders.length,
            textContent: mainHeader 
        })

        tr.appendChild(mainHeaderRow);
        return tr
    }


    function setSubHeader() {
        const tr = document.createElement("tr");

        subHeaders.forEach((header) => {
            const subHeaderTr = document.createElement("th");

            // Setting attributes using Object.assign() Method vs .setAttribute()
            Object.assign(subHeaderTr, {
                // id= of main header and headers= of subheaders should be the same
                id: header,
                headers: mainHeader,
                textContent: header
            })

            tr.appendChild(subHeaderTr);
        })
        return tr;
    }

    const mainHeaderRow = setMainHeader();
    const subHeaderRow = setSubHeader();
    // thead.appendChild(mainHeaderRow);
    // thead.appendChild(subHeaderRow);
    thead.append(mainHeaderRow, subHeaderRow)

    return thead;

}

Table.prototype.setBody = function () {
    const tbody = document.createElement("tbody");

    this.list.forEach((book) => {
        const tr = document.createElement("tr");

        // Make an array of arrays with Object.entries()
        const entries = Object.entries(book);
        entries.forEach((keyValue) => {
            const td = document.createElement("td");

            // inner array format is [key, value]
            td.setAttribute("headers", `${this.mainHeader} ${keyValue[0]}`)
            td.textContent = keyValue[1];
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    })

    return tbody;
}

function addBookToLibrary(title, author, genre, numPages, isRead, price) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, genre, numPages, isRead, price)
    myLibrary.push(book);
}

function setData(library) {
    const container = document.querySelector(".body-container");
    // SearchList creates an empty List that will have custom functions
    const search = new SearchList([]);
    const table = new Table([]);

    library.forEach(book => {
        search.list.push(book.Title.trim())
        table.list.push(book)
    });

    //dataList is already added to predefined form element
    search.setSearchList();
    table.setTable();
    container.appendChild(table.table);
}



addBookToLibrary("Terraform: Up and Running: Writing Infrastructure as Code", "Yevgenly Brikman", "Educational", 457, false, 42.87);
addBookToLibrary("AWS Certified Solutions Architect Study Guide with 900 Practice Test Questions: Associate (SAA-C03) Exam (Sybex Study Guide)", "Piper B.|Clinton D.", "Study Guide", 480, false, 39.31);
addBookToLibrary("The DevOps Handbook", "Kim, G.|Debois, P.|Willis, J.|Humble J. ", "Educational", 480, false, 22);
addBookToLibrary("Building Microservices: Designing Fine-Grained Systems ", "Sam Newman", "Educational", 612, false, 44.49);

setData(myLibrary);
