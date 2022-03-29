class Employee{
  constructor(firstName,lastName,prefferedName,email,jobTitle,department,office,phoneNumber,skypeID,index){
    this.firstName = firstName;
    this.lastName = lastName;
    this.prefferedName = prefferedName;
    this.email = email;
    this.jobTitle =jobTitle;
    this.office = office;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.skypeID = skypeID;
    this.index = index;
  }
}

function getElementWithId(id){
  return document.getElementById(id);
}

function appendTextInFilter(index,filterType){
  const obj = document.querySelector(".filter-types").querySelectorAll("div");
  Array.from(obj[index].querySelectorAll("button")).forEach( node => {
    node.insertAdjacentText("beforeend",` (${findCount(filterType,node.innerText)})`);
  });
}

function showCount(){
  appendTextInFilter(0,"department");
  appendTextInFilter(1,"office");
  appendTextInFilter(2,"jobTitle");
}

function findCount(property,val){
  let count = 0;
  employees.forEach( emp => {
    if(emp[property]==val) count++;
  })
  return count;
}

function displayAllEmployee(){
  clearResults();
  employees.forEach( staff =>{
    addEmployee(staff);
  });
}

function addAlphabetFilter(){
  const AlphabetFilter = getElementWithId("filterByName");
  for(let i=65; i<=90; i++){
    let btn = document.createElement("button");
    btn.setAttribute("class","button-primary");
    btn.innerText = String.fromCharCode(i);
    btn.addEventListener("click",() => {filterByAlphabet(btn.innerText);});
    AlphabetFilter.appendChild(btn);
  }
}

function filterByAlphabet(letter){
  clearResults();
  employees.forEach( staff =>{
    if(staff.firstName[0]===letter){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") noResultFound();
}

function filterBy(name,type){
  clearResults();
  employees.forEach( staff =>{
    if(staff[type]===name){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") noResultFound();
}

function filterBySearch(){
  clearResults();
  let val = getElementWithId("searchBox").value;
  let category = getElementWithId("filterBy").value;
  employees.forEach(staff => {
    if(staff[category].includes(val) || staff[category].toString().includes(val)){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") noResultFound();
}

function noResultFound(){
  _resultPanel.innerHTML = `<div class="no-result">
  <h3>No Result Found</h3>
  <img style="width: 200px;" src="./images/zero-result.jpg"></div>
  `;
}

function getEmloyeeDetails(staff){
  staff.firstName = getElementWithId("fName").value.trim();
  staff.lastName = getElementWithId("lName").value.trim();
  staff.prefferedName = getElementWithId("pName").value.trim();
  staff.email = getElementWithId("email").value.trim();
  staff.jobTitle = getElementWithId("jobtitle").value;
  staff.department = getElementWithId("dpmt").value;
  staff.office = document.querySelector( 'input[name="office"]:checked').value;
  staff.phoneNumber = getElementWithId("phoneNumber").value.toString().trim();
  staff.skypeID = getElementWithId("skypeID").value.trim();
}

function createEmployee(){
  let staff = new Employee();
  getEmloyeeDetails(staff);
  let isInvalid = false;
  if(!checkName(staff.firstName)){
    document.querySelectorAll("i.error-text")[0].innerText = "Input value cannot be empty and can only be alphabets";
    isInvalid = true;
  }
  if(!checkName(staff.lastName)){
    document.querySelectorAll("i.error-text")[1].innerText = "Input value cannot be empty and can only be alphabets";
    isInvalid = true;
  } 
  if(!checkEmail(staff.email)){
    document.querySelectorAll("i.error-text")[2].innerText = "Input Value cannot be empty and should be a valid email";
    isInvalid = true;
  }
  if(!isInvalid && staff.firstName!=="" && staff.lastName!=="" && staff.email!=="" && staff.phoneNumber!==""){
    employees.push(staff);
    clearErrorMessage();
    addEmployee(staff);
    clearInputs();
    closeForm();
  }
}

function clearErrorMessage(){
  const msg = document.querySelectorAll("i.error-text");
  for(let i=0;i<3;i++) msg[i].innerText = "";
}

function checkName(name){
  let nameRegex = /^[a-zA-Z]+[a-z A-Z]*$/;
  return nameRegex.test(name);
}

function checkEmail(email){
  let nameRegex = /^[a-zA-Z0-9]+@[a-zA-Z.]+$/;
  return nameRegex.test(email);
}

function clearInputs() {
  getElementWithId("fName").value = "";
  getElementWithId("lName").value = "";
  getElementWithId("pName").value = "";
  getElementWithId("email").value = "";
  document.querySelector( 'input[name="office"]').value = "India";
  getElementWithId("phoneNumber").value = "0";
  getElementWithId("skypeID").value = "";
}

function addEmployee(staff){
  if(typeof staff === 'undefined') return;
  let newResult = document.createElement("div");
  newResult.innerHTML = 
    `<img src="https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/500">
    <p>
      <b>${staff.firstName} ${staff.lastName}</b>
      <br>${staff.jobTitle}<br>${staff.department} Department<br>
      <img src="images/number-icon.PNG"> <img src="images/email-icon.PNG"> <img src="images/message-icon.PNG">
      <img src="images/star-icon.PNG"> <img src="images/heart-icon.PNG">
    </p>`;
  newResult.setAttribute("class","result");
  newResult.addEventListener("click",() => {DisplayEmployee(staff);});
  _resultPanel.appendChild(newResult);
}

function DisplayEmployee(staff){
  let employeeInfo = getElementWithId("employeeInfo");
  let info = document.createElement("div");
  info.innerHTML = 
    `<b style="text-decoration: underline;font-size: x-large;">Employee Info</b> 
    <button id="hideInfo" onclick="hideInfo()">X</button><br><br>
    <br><b>Name: </b> <span>${staff.firstName} ${staff.lastName}</span><br><br>
    <b>Preffered Name: </b> <span>${staff.prefferedName}</span><br><br>
    <b>Email: </b> <span>${staff.email}</span><br><br>
    <b>Contact No.: </b> <span>${staff.phoneNumber}</span><br><br>
    <b>Skype ID: </b> <span>${staff.skypeID}</span><br><br>
    <b>Job title: </b> <span>${staff.jobTitle}</span><br><br>
    <b>Department: </b> <span>${staff.department}</span><br><br>
    <b>Office Location: </b> <span>${staff.office}</span><br><br>`;
  employeeInfo.style.display = "flex";

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.setAttribute("style","background-color: #00b1fc; color:white;float: left;");
  editBtn.addEventListener("click",() => {editEmployee(staff);} );
  info.appendChild(editBtn);
  
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("style","color: white;background-color: black;");
  deleteBtn.addEventListener("click",() => {delteEmployee(staff);});
  info.appendChild(deleteBtn);
  employeeInfo.appendChild(info);
}

function delteEmployee(staff){
  delete employees[staff.index];
  clearResults();
  hideInfo();
  displayAllEmployee();
}

function editEmployee(staff){
  hideInfo();
  openForm(true,staff);
  fillValues(staff);
}

function fillValues(staff){
  getElementWithId("fName").value = staff.firstName;
  getElementWithId("lName").value = staff.lastName;
  getElementWithId("pName").value = staff.prefferedName;
  getElementWithId("email").value = staff.email;
  getElementWithId("jobtitle").value = staff.jobTitle;
  getElementWithId("dpmt").value = staff.department;
  document.querySelector( 'input[name="office"]').value = staff.office;
  getElementWithId("phoneNumber").value = parseInt(staff.phoneNumber);
  getElementWithId("skypeID").value = staff.skypeID;
}

function hideInfo() {
  setDisplay("employeeInfo","none");
  getElementWithId("employeeInfo").innerHTML = "";
}

function openForm(isEdit, staff = undefined) {
  clearInputs();
  setDisplay("popupForm","flex");
  const obj = document.querySelector("form.form-container");
  const heading = getElementWithId("formHeading");
  if(isEdit){
    heading.innerText = "Edit";
    let saveBtn = document.createElement("button");
    saveBtn.setAttribute("type","submit");
    saveBtn.style.backgroundColor = "#00b1fc";
    saveBtn.style.color = "white";
    saveBtn.innerText = "Save";
    saveBtn.addEventListener("click",() => {
      getEmloyeeDetails(staff);
      clearInputs();
      displayAllEmployee();
      const obj = document.querySelector("form.form-container");
      obj.innerHTML = obj.innerHTML.substring(0,obj.innerHTML.lastIndexOf("<button")-1);
      closeForm();
    });
    obj.appendChild(saveBtn);
    setDisplay("createBtn","none");
  }else{
    heading.innerText = "Add";
    setDisplay("createBtn","initial");
  }
}

function closeForm() {
  setDisplay("popupForm","none");
}

function viewMore(){
  setDisplay("moreOptions","inline");
  setDisplay("viewMoreBtn","none");
}

function viewLess(){
  setDisplay("moreOptions","none");
  setDisplay("viewMoreBtn","initial");
}

function setDisplay(id,value){
  getElementWithId(id).style.display = value;
}

function clearResults(){
  _resultPanel.innerHTML = "";
}

const _resultPanel = getElementWithId("searchResult");
getElementWithId("welcomeMessage").insertAdjacentText("afterend","Andrew Phillips");
let index = 0;
let sample = new Employee("Hardik","Jaiswal","Hardik Jaiswal","hardik@technovert.com","Intern","IT","India","7060232702","hj83700@skype",index++);
let employees = [sample];
employees.push(new Employee("Bruce","Wayne","Batman","wayne@gotham.com","Recruitment Expert","Human Resource",
"Seattle","8640646","Batman@skype",index++));
displayAllEmployee();
addAlphabetFilter();
showCount();
getElementWithId("searchBox").addEventListener("keyup", () => {filterBySearch();} );
getElementWithId("addEmployee").addEventListener("click",() => {openForm(false);})
getElementWithId("pName").addEventListener("focus",() => {
  getElementWithId("pName").value = `${getElementWithId("fName").value} ${getElementWithId("lName").value}`;
})