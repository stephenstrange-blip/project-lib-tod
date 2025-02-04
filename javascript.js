const myLibrary = [];

function Book(title, author, genre, numPages, isRead=false, price) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.genre = genre;
    this.price = price;
}

Book.prototype.info = function () {
    let status = this.isRead ? "already read" : "not yet read";
    return (`${this.title} by ${this.author}, ${this.numPages} pages, ${status}. It sells at ${this.price}`);
}

function addBookToLibrary(title, author, genre, numPages, isRead, price) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, genre, numPages, isRead, price)
    myLibrary.push(book);
}
function getData(library) {
    // SearchList creates an empty List that will have custom functions
    const titles = new SearchList([]);
    library.forEach(book => {
        titles.list.push(book.title.trim())
    });
    
    titles.setSearchList();
}
function SearchList(list) {
    this.list = list
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


addBookToLibrary("Terraform: Up and Running: Writing Infrastructure as Code", "Yevgenly Brikman", "Educational", 457, false, 42.87);
addBookToLibrary("AWS Certified Solutions Architect Study Guide with 900 Practice Test Questions: Associate (SAA-C03) Exam (Sybex Study Guide)", "Piper B.|Clinton D.", "Study Guide", 480, false, 39.31);
addBookToLibrary("The DevOps Handbook", "Kim, G.|Debois, P.|Willis, J.|Humble J. ", "Educational", 480, false, 22);
addBookToLibrary("Building Microservices: Designing Fine-Grained Systems ", "Sam Newman", "Educational", 612, false, 44.49);

getData(myLibrary);
