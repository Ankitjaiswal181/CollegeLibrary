console.log("This is ankit Library");
// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {

}

// add method to display Prototype
// delete
// add
function Update() {
    // let noteObj;
    let tableBody = document.getElementById('tableBody');
    let notes = localStorage.getItem("notes");
    let noteObj;
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let uiString="";
    noteObj.forEach(function (element, index) {
     uiString += `<tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button id = "${index}" onclick = ' deleteRow(this.id)' >Delete</button></td>

    </tr>`;
    
    });

    if (noteObj.length == 0) {
        tableBody.innerHTML = "";
    }else{
        tableBody.innerHTML = uiString;
    }
}

Display.prototype.add = function (book) {
    console.log('Adding to UI');
    // let tableBody = document.getElementById('tableBody');
    Update();
}
// clear
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
// validate
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

// show
Display.prototype.show = function (type, message) {
    let msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-${type}" role="alert">
    <h4 class="alert-heading">${message}</h4>
  </div>`;
    setTimeout(() => {
        msg.innerHTML = '';
    }, 2000);

}
// Add submit event listner to Libraryform
const libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    console.log('You have Submmited the form');
    const name = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    // fiction,programming,recipe
    const fiction = document.getElementById('fiction');
    const programming = document.getElementById('programming');
    const cookingRecipe = document.getElementById('recipe');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cookingRecipe.checked) {
        type = cookingRecipe.value;
    }

    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();
    if (display.validate(book)) {

        

        let notes = localStorage.getItem("notes");
        let noteObj;
        if (notes == null) {
            noteObj = [];
        }
        else {
            noteObj = JSON.parse(notes);
        }

        noteObj.push(book);
        
        
        localStorage.setItem("notes", JSON.stringify(noteObj));
        display.add(book);
        display.clear();
        display.show('success', 'Well Done!!');
    }
    else {
        display.show('danger', 'Sorry this cannot be executed');
    }


}

function deleteRow(index) {
    console.log("I am deleting Note", index);


    let display = new Display();
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    Update();
    display.show('success', 'deleted row');


}