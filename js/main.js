let nameInput = document.getElementById("Name");
let urlInput = document.getElementById("siteUrl");
let Btn = document.getElementById("btn");
let tableBody = document.getElementById("TdBody");
let searchInput = document.getElementById("search");

let booksMark;
let mainIndex = 0;

if (localStorage.getItem("bookMarket") == null) {
  booksMark = [];
} else {
  booksMark = JSON.parse(localStorage.getItem("bookMarket"));
  showBoks(booksMark);
}

Btn.addEventListener("click", function () {
  if (valdiationName() && valdiationUrl() == true) {
    if (Btn.innerHTML == "Edit") {
      saveEdit();
    } else {
      bookMareker();
    }

    localStorage.setItem("bookMarket", JSON.stringify(booksMark));
    showBoks(booksMark);
    clearForm();
  }
});

function bookMareker() {
  let data = {
    name: nameInput.value,
    url: urlInput.value,
  };
  booksMark.push(data);
}

function showBoks(list) {
  let books = ``;
  for (let i = 0; i < list.length; i++) {
    books += `<tr>
    <td>${list[i].name}</td>
    <td>${list[i].url}</td>
    <td> <a href=" ${list[i].url}" target=_blank><button class="btn btn-primary ">Visit</button></a></td> 
    <td><button  onClick="updateBook(${i})"  class="btn btn-light ">Update</button></td> 
    <td><button  onClick="deleteBook(${i})" class="btn btn-danger " >delete</button></td> 

    </tr>`;
  }
  tableBody.innerHTML = books;
}

function deleteBook(index) {
  booksMark.splice(index, 1);
  showBoks(booksMark);
  localStorage.setItem("bookMarket", JSON.stringify(booksMark));
}

function clearForm() {
  nameInput.value = "";
  urlInput.value = "";
}

function updateBook(index) {
  mainIndex = index;
  nameInput.value = booksMark[index].name;
  urlInput.value = booksMark[index].url;
  Btn.innerHTML = "Edit";
}

function saveEdit() {
  booksMark[mainIndex].name = nameInput.value;
  booksMark[mainIndex].url = urlInput.value;

  Btn.innerHTML = "Supmit";
}

function realSearch(term) {
  let searchReasult = [];

  for (let i = 0; i < booksMark.length; i++) {
    if (booksMark[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      searchReasult.push(booksMark[i]);
    }
  }

  showBoks(searchReasult);
}

function valdiationName() {
  // add evint has not called
  let regex = /^[a-zA-Z]{2,9}$/;
  if (regex.test(nameInput.value) == true) {
    nameInput.classList.replace("is-invalid", "is-valid");

    return true;
  } else {
    nameInput.classList.add("is-invalid");

    return false;
  }
}

function valdiationUrl() {
  let regexUrl =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (regexUrl.test(urlInput.value) == true) {
    urlInput.classList.replace("is-invalid", "is-valid");

    return true;
  } else {
    urlInput.classList.add("is-invalid");

    return false;
  }
}
