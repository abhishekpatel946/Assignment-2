// jshint esversion:6

// login section DOMs
const login_username = document.getElementById("login_username");
const login_password = document.getElementById("login_password");
const login_submit = document.getElementById("login_submit");
// register section DOMs
const reg_email = document.getElementById("reg_email");
const reg_username = document.getElementById("reg_username");
const reg_fname = document.getElementById("reg_fname");
const reg_lname = document.getElementById("reg_lname");
const reg_password = document.getElementById("reg_password");
const reg_gender = document.getElementById("reg_gender");
const reg_role = document.getElementById("reg_role");
const reg_submit = document.getElementById("reg_submit");
// List DOM
const List = document.getElementById("list");

// variable declaration
let EMP_LIST;

// get item from localStorage
let data = localStorage.getItem("EMP");

// check if data is not emtpy
if (data) {
  EMP_LIST = JSON.parse(data);
} else {
  // if data isn't empty
  EMP_LIST = [];
}

// add EMP to the list user click the reg_submit btn
reg_submit.addEventListener("click", function (event) {
  event.preventDefault();
  const email = reg_email.value;
  const userName = reg_username.value;
  const firstName = reg_fname.value;
  const lastName = reg_lname.value;
  const rPassword = reg_password.value;
  const gender = reg_gender.value;
  const role = reg_role.value;
  // if the input isn;t empy
  if (
    email &&
    userName &&
    firstName &&
    lastName &&
    rPassword &&
    gender &&
    role
  ) {
    EMP_LIST.push({
      email: email,
      username: userName,
      first_name: firstName,
      last_name: lastName,
      password: rPassword,
      gender: gender,
      role: role,
    });
    //  add info to localStorage
    localStorage.setItem("EMP", JSON.stringify(EMP_LIST));

    // clear the form after submitting
    reg_email.value = "";
    reg_username.value = "";
    reg_fname.value = "";
    reg_lname.value = "";
    reg_password.value = "";
    reg_gender.value = "";
    reg_role.value = "";
    // popup for the success
    alert("Registeration Successfully!");
  } else {
    alert("ALL FIELDS ARE MANDATORY...!");
  }
});

console.log(EMP_LIST);

// login with loadList (according to the privileges)
login_submit.addEventListener("click", function (event) {
  event.preventDefault();
  const log_username = login_username.value;
  const log_password = login_password.value;
  const result = JSON.parse(localStorage.getItem("EMP"));

  // alert
  if (log_username && log_password) {
    // iterate the object
    result.forEach((item) => {
      if (
        (item.username === log_username || item.email) &&
        item.password === log_password
      ) {
        // view the list for admin
        if (item.role == "admin") {
          List.textContent = "";
          for (let prop in EMP_LIST) {
            const item = `
                          <li>${EMP_LIST[prop].first_name} ${EMP_LIST[prop].last_name} [${EMP_LIST[prop].role}]</li>
                        `;
            const position = "beforeend";
            List.insertAdjacentHTML(position, item);
          }
        }
        // view the list of operation dept only
        if (item.role == "operation") {
          List.textContent = "";
          const newArr = EMP_LIST.filter(function (elem) {
            return elem.role == "operation";
          });
          newArr.forEach((user) => {
            const item = `
            <li>${user.first_name} ${user.last_name} [${user.role}]</li>
                          `;
            const position = "beforeend";
            List.insertAdjacentHTML(position, item);
          });
        }
        // view the list of sales dept only
        if (item.role == "sales") {
          List.textContent = "";
          const newArr = EMP_LIST.filter(function (elem) {
            return elem.role == "sales";
          });
          newArr.forEach((user) => {
            const item = `
            <li>${user.first_name} ${user.last_name} [${user.role}]</li>
                          `;
            const position = "beforeend";
            List.insertAdjacentHTML(position, item);
          });
        }
        // clear the form
        login_username.value = "";
        login_password.value = "";
      }
    });
  } else {
    alert("Incorrect username or password!!!");
  }
});
