class Employee{
  constructor(firstName,lastName,email,jobTitle,department,office,phoneNumber,skypeID){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.jobTitle =jobTitle;
    this.office = office;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.skypeID = skypeID;
  }
}

function showCount(){
  const obj = document.querySelector(".filter-types").querySelectorAll("div");
  Array.from(obj[0].querySelectorAll("button")).forEach( node => {
    node.insertAdjacentText("beforeend",` (${findCount("department",node.innerText)})`);
  });
  Array.from(obj[1].querySelectorAll("button")).forEach( node => {
    node.insertAdjacentText("beforeend",` (${findCount("office",node.innerText)})`);
  });
  Array.from(obj[2].querySelectorAll("button")).forEach( node => {
    node.insertAdjacentText("beforeend",` (${findCount("jobTitle",node.innerText)})`);
  });
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
  const AlphabetFilter = document.getElementById("filterByName");
  for(let i=65; i<=90; i++){
    let btn = document.createElement("button");
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
  if(_resultPanel.innerHTML==="") alert("No Results Found");
}

function filterByOffice(oName){
  clearResults();
  employees.forEach( staff =>{
    if(staff.office===oName){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") alert("No Results Found");
}

function filterByDepartment(dName){
  clearResults();
  employees.forEach( staff =>{
    if(staff.department===dName){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") alert("No Results Found");
}

function filterByJob(jbName){
  clearResults();
  employees.forEach( staff =>{
    if(staff.jobTitle===jbName){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") alert("No Results Found");
}

function filterBySearch(){
  clearResults();
  let val = document.getElementById("searchBox").value;
  let category = document.getElementById("filterBy").value;
  employees.forEach(staff => {
    if(staff[category].includes(val) || staff[category].toString().includes(val)){
      addEmployee(staff);
    }
  });
  if(_resultPanel.innerHTML==="") alert("No Results Found");
}

function createEmployee(staff = undefined){
  if(typeof staff === 'undefined'){
    let val1 = document.getElementById("fName").value;
    let val2 = document.getElementById("lName").value;
    let val3 = document.getElementById("email").value;
    let val4 = document.getElementById("jobtitle").value;
    let val5 = document.getElementById("dpmt").value;
    let val6 = document.querySelector( 'input[name="office"]:checked').value;
    let val7 = document.getElementById("phoneNumber").value.toString();
    let val8 = document.getElementById("skypeID").value;
    if(val1!=="" && val2!=="" && val3!=="" && val7!==""){
      let newEmployee = new Employee(val1,val2,val3,val4,val5,val6,val7,val8);
      employees.push(newEmployee);
      addEmployee(newEmployee);
      clearInputs();
    }
  }else{
    staff.firstName = document.getElementById("fName").value;
    staff.lastName = document.getElementById("lName").value;
    staff.email = document.getElementById("email").value;
    staff.jobTitle = document.getElementById("jobtitle").value;
    staff.department = document.getElementById("dpmt").value;
    staff.office = document.querySelector( 'input[name="office"]:checked').value;
    staff.phoneNumber = document.getElementById("phoneNumber").value.toString();
    staff.skypeID = document.getElementById("skypeID").value;
    clearInputs();
    displayAllEmployee();
    const obj = document.querySelector("form.form-container");
    obj.innerHTML = obj.innerHTML.substring(0,obj.innerHTML.lastIndexOf("<button")-1);
    closeForm();
  }
}

function clearInputs() {
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
  document.getElementById("email").value = "";
  document.querySelector( 'input[name="office"]').value = "India";
  document.getElementById("phoneNumber").value = "0";
  document.getElementById("skypeID").value = "";
}

function addEmployee(staff){
  let newResult = document.createElement("div");
  //newResult.innerHTML = "<img src=\"images/person-icon.png\">"
  newResult.innerHTML = `<img src="https://picsum.photos/500">`
    + `<p><b>${staff.firstName} ${staff.lastName}</b><br>${staff.jobTitle}<br>${staff.department} Department<br>`
    + "<img src=\"images/number-icon.PNG\"> <img src=\"images/email-icon.PNG\"> <img src=\"images/message-icon.PNG\">"
    + " <img src=\"images/star-icon.PNG\"> <img src=\"images/heart-icon.PNG\"></p>";
  newResult.setAttribute("class","result");
  newResult.addEventListener("click",() => {DisplayEmployee(staff);});
  _resultPanel.appendChild(newResult);
}

function DisplayEmployee(staff){
  let employeeInfo = document.getElementById("employeeInfo");
  let info = document.createElement("div");
  info.innerHTML = 
    `<b>Employee Info</b> <button onclick="hideInfo()" style="color: white;background-color: rgba(255, 0, 0, 0.555)">X</button><br><br>` +
    `<b>Name: </b> <span>${staff.firstName} ${staff.lastName}</span><br><br>` +
    //`<b>Preffered Name: </b> <span>${staff.prefferedName}</span><br>` +
    `<b>Email: </b> <span>${staff.email}</span><br><br>` +
    `<b>Contact No.: </b> <span>${staff.phoneNumber}</span><br><br>` +
    `<b>Skype ID: </b> <span>${staff.skypeID}</span><br><br>` +
    `<b>Job title: </b> <span>${staff.jobTitle}</span><br><br>` +
    `<b>Department: </b> <span>${staff.department}</span><br><br>` +
    `<b>Office Location: </b> <span>${staff.office}</span><br><br>`;
  employeeInfo.style.display = "flex";
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.setAttribute("style","background-color: #00b1fc; color:white;");
  editBtn.addEventListener("click",() => {editEmployee(staff);} );
  info.appendChild(editBtn);
  employeeInfo.appendChild(info);
}

function editEmployee(staff){
  hideInfo();
  openForm(true,staff);
  document.getElementById("fName").value = staff.firstName;
  document.getElementById("lName").value = staff.lastName;
  document.getElementById("email").value = staff.email;
  document.getElementById("jobtitle").value = staff.jobTitle;
  document.getElementById("dpmt").value = staff.department;
  document.querySelector( 'input[name="office"]').value = staff.office;
  document.getElementById("phoneNumber").value = parseInt(staff.phoneNumber);
  document.getElementById("skypeID").value = staff.skypeID;
}

function hideInfo() {
  document.getElementById("employeeInfo").style.display = "none";
  document.getElementById("employeeInfo").innerHTML = "";
}

function openForm(isEdit, staff = undefined) {
  clearInputs();
  document.getElementById("popupForm").style.display = "flex";
  const obj = document.querySelector("form.form-container");
  const heading = document.getElementById("formHeading");
  if(isEdit){
    heading.innerText = "Edit";
    let saveBtn = document.createElement("button");
    saveBtn.setAttribute("type","submit");
    saveBtn.style.backgroundColor = "#00b1fc";
    saveBtn.style.color = "white";
    saveBtn.innerText = "Save";
    saveBtn.addEventListener("click",() => {createEmployee(staff);});
    obj.appendChild(saveBtn);
    document.getElementById("createBtn").style.display = "none";
  }else{
    heading.innerText = "Add";
    document.getElementById("createBtn").style.display = "initial";
  }
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

function viewMore(){
  document.getElementById("moreOptions").style.display = "inline";
  document.getElementById("viewMoreBtn").style.display = "none";
}

function viewLess(){
  document.getElementById("moreOptions").style.display = "none";
  document.getElementById("viewMoreBtn").style.display = "initial";
}

function clearResults(){
  _resultPanel.innerHTML = "";
}

const _resultPanel = document.getElementById("searchResult");
document.getElementById("welcomeMessage").insertAdjacentText("afterend","Andrew Phillips");

let sample = new Employee("Hardik","Jaiswal","hardik@technovert.com","Intern","IT","India","7060232702","hj83700@skype");
let employees = [sample];
employees.push(new Employee("Bruce","Wayne","wayne@gotham.com","Recruitment Expert","Human Resource",
"Seattle","8640646","Batman@skype"));
displayAllEmployee();
addAlphabetFilter();
showCount();
document.getElementById("searchBox").addEventListener("keyup", () => {filterBySearch();} );
document.getElementById("addEmployee").addEventListener("click",() => {openForm(false);})