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

function appendCountInFilter(index,filterType){
  const obj = document.querySelector(".filter-types").querySelectorAll("div");
  Array.from(obj[index].querySelectorAll("button")).forEach( node => {
    node.insertAdjacentText("beforeend",` (${findCount(filterType,node.innerText)})`);
  });
}

function showCount(){
  appendCountInFilter(0,"department");
  appendCountInFilter(1,"office");
  appendCountInFilter(2,"jobTitle");
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
    addEmployeeTile(staff);
  });
}

function addAlphabetFilter(){
  const AlphabetFilter = getElementWithId("filterByName");
  for(let i=65; i<=90; i++){
    let btn = createHtmlTag("button");
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
      addEmployeeTile(staff);
    }
  });
  if(_resultPanel.innerHTML==="") noResultFound();
}

function filterByType(name,type){
  clearResults();
  employees.forEach( staff =>{
    if(staff[type]===name){
      addEmployeeTile(staff);
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
      addEmployeeTile(staff);
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
    addEmployeeTile(staff);
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

function addEmployeeTile(staff){
  if(typeof staff === 'undefined') return;
  let newResult = createHtmlTag("div");
  newResult.innerHTML = 
    `<img src="https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/500">
    <p>
      <span><b>${staff.firstName} ${staff.lastName}</b></span><br>
      <span>${staff.jobTitle}</span><br>
      <span>${staff.department} Department</span><br>
      <span style="color:#969595">
      <i class="fa-solid fa-square-phone"></i><i class="fa-solid fa-envelope" style="margin-left:3px;margin-right:8px;"></i>
      <i class="fa-solid fa-comment"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-heart"></i>
      </span>
    </p>`;
  newResult.setAttribute("class","result");
  newResult.addEventListener("click",() => {DisplayEmployeePopup(staff);});
  _resultPanel.appendChild(newResult);
}

function createHtmlTag(name){
  return document.createElement(name);
}

function DisplayEmployeePopup(staff){
  let employeeInfo = getElementWithId("employeeInfo");
  let info = createHtmlTag("div");
  info.innerHTML = 
    `<div><b style="text-decoration: underline;font-size: x-large;">Employee Info</b> 
    <button id="hideInfo" onclick="hideInfo()">X</button><br><br></div>
    <div><b>Name: </b> <span>${staff.firstName} ${staff.lastName}</span><br><br></div>
    <div><b>Preffered Name: </b> <span>${staff.prefferedName}</span><br><br></div>
    <div><b>Email: </b> <span>${staff.email}</span><br><br></div>
    <div><b>Contact No.: </b> <span>${staff.phoneNumber}</span><br><br></div>
    <div><b>Skype ID: </b> <span>${staff.skypeID}</span><br><br></div>
    <div><b>Job title: </b> <span>${staff.jobTitle}</span><br><br></div>
    <div><b>Department: </b> <span>${staff.department}</span><br><br></div>
    <div><b>Office Location: </b> <span>${staff.office}</span><br><br></div>`;
  employeeInfo.style.display = "flex";
  
  let div = createHtmlTag("div");
  const editBtn = createHtmlTag("button");
  editBtn.innerText = "Edit";
  editBtn.setAttribute("style","background-color: #00b1fc; color:white;float: left;");
  editBtn.addEventListener("click",() => {editEmployee(staff);} );
  div.appendChild(editBtn);
  
  const deleteBtn = createHtmlTag("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("style","color: white;background-color: black;");
  deleteBtn.addEventListener("click",() => {
    if(confirm("This info will be permamnently delted. Want to proceed?"))delteEmployee(staff);
  });
  div.appendChild(deleteBtn);
  info.appendChild(div);
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
    let saveBtn = createHtmlTag("button");
    saveBtn.setAttribute("type","submit");
    saveBtn.style = "color:white;background-color:#00b1fc;margin-left:10px;";
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
  clearErrorMessage();
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
});
clearErrorMessage();
