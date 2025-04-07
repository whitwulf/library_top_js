const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.read = false;
  this.toggleRead = function () {
    this.read = !this.read;
  };
}

function addBookToLibrary(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
  displayBooks(myLibrary);
}

addBookToLibrary("IT", "Stephen King", 600);
addBookToLibrary("lalala", "Not Me", 47);

function displayBooks(books) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  books.forEach((book, index) => {
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-id", book.id);

    const titleElement = document.createElement("h4");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = book.author;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = book.pages;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove Book";

    deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks(myLibrary);
    });

    const readButton = document.createElement("button");
    readButton.textContent = book.read ? "Already read" : "Not yet read";
    readButton.addEventListener("click", () => {
      book.toggleRead();
      displayBooks(myLibrary);
    });

    element.appendChild(titleElement);
    element.appendChild(authorElement);
    element.appendChild(pagesElement);
    element.appendChild(deleteButton);
    element.appendChild(readButton);
    container.appendChild(element);
  });
}

displayBooks(myLibrary);

function displayBookAddForm() {
  const dialog = document.getElementById("addBookDialog");
  const addBookButton = document.getElementById("addBookButton");
  const form = document.getElementById("addBookForm");

  addBookButton.addEventListener("click", () => {
    dialog.showModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    if (title && author && pages) {
      addBookToLibrary(title, author, parseInt(pages));
    }

    dialog.close();
    form.reset();
  });
  displayBooks(myLibrary);
}

displayBookAddForm();
