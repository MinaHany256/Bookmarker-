var nameInput = document.getElementById("WebName");
var URLInput = document.getElementById("URL");

var websitesList = [];

if (localStorage.getItem("website") != null) {
  websitesList = JSON.parse(localStorage.getItem("website"));
  displayInput();
}



function main() {
  getInputData();
  displayInput();
  clearInputs();
}

function getInputData() {
  var mywebsite = {
    name: nameInput.value,
    URL: URLInput.value,
  };

  if (check(nameInput.value, URLInput.value)) {
    websitesList.push(mywebsite);
    localStorage.setItem("website", JSON.stringify(websitesList));
  } else {
    var modal = document.getElementById("mainmodal");
    modal.style.cssText = `
      display: inline-block !important; 
      `;
  }
}

function closemodal() {
  var modal = document.getElementById("mainmodal");
  modal.style.cssText = `
  display: none !important; 
  `;
}

function displayInput() {
  var x = "";
  for (var i = 0; i < websitesList.length; i++) {
    x += `
        <tr>
        <td>${i}</td>
        <td>${websitesList[i].name}</td>
        <td><a href="${websitesList[i].URL}" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> visit</button></a></td>
        <td><button onclick="deleteLink(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
        `;
  }
  document.getElementById("mywebsite").innerHTML = x;
}

function deleteLink(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("website", JSON.stringify(websitesList));
  displayInput();
}

function clearInputs() {
  nameInput.value = "";
  URLInput.value = "";
}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

nameInput.addEventListener("input", function () {
  validate(nameInput, nameRegex);
});

URLInput.addEventListener("input", function () {
  validate(URLInput, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function check(word1, word2) {
  return nameRegex.test(word1), urlRegex.test(word2);
}
