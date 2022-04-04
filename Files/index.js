
var data=[
    {
        "id":"1",
        "first_name":"Anthony",
        "last_name":"Morris",
        "preferred_name":"Anthony Morris",
        "job_title":"SharePoint Practice Head",
        "department":"IT Department",
        "email":"anthony.m@gmail.com",
        "office":"Seattle",
        "phone_number":"9246284627",
        "skype_id":"9472874852818",
        "profile_pic":"./Data/profile1.jpg"
    },
    {
        "id":"2",
        "first_name":"Helen",
        "last_name":"Zimmerman",
        "preferred_name":"Helen Zimmerman",
        "job_title":"Operations Manager",
        "department":"IT Department",
        "email":"helen.z@gmail.com",
        "office":"Seattle",
        "phone_number":"7264128312",
        "skype_id":"8235135895281",
        "profile_pic":"./Data/profile2.jpg"
    },
    {
        "id":"3",
        "first_name":"Jonathon",
        "last_name":"Smith",
        "preferred_name":"Jonathon Smith",
        "job_title":"Product Manager",
        "department":"IT Department",
        "email":"jonathon.s@gmail.com",
        "office":"Seattle",
        "phone_number":"7527637272",
        "skype_id":"7254161763716",
        "profile_pic":"./Data/profile3.jpg"
    },
    {
        "id":"4",
        "first_name":"Richard",
        "last_name":"Scott",
        "preferred_name":"Richard Scott",
        "job_title":".Net Development Lead",
        "department":"IT Department",
        "email":"richard.s@gmail.com",
        "office":"Seattle",
        "phone_number":"9337283471",
        "skype_id":"2741736173464",
        "profile_pic":"./Data/profile4.jpg"
    },
    {
        "id": "5",
        "first_name": "Leanne",
        "last_name":"Graham",
        "preferred_name":"Leanne Graham",
        "job_title":"Recruiting Expert",
        "department":"Human Resources",
        "email": "sincere@april.biz",
        "office":"India",
        "phone_number":"6372832832",
        "skype_id":"",
        "profile_pic":"./Data/profile9.jpg"
    },
    {
        "id": "6",
        "first_name": "Ervin",
        "last_name":"Howell",
        "preferred_name":"Ervin Howell",
        "job_title":"Business Analyst",
        "department":"Sales",
        "email": "ervin.howell@March.io",
        "office":"India",
        "phone_number":"9472842832",
        "skype_id":"282813712942",
        "profile_pic":"./Data/profile10.jpg"
    },
    {
        "id": "7",
        "first_name": "Dennis",
        "last_name":"Schulist",
        "preferred_name":"Dennis Schulist",
        "job_title":"BI Developer",
        "department":"MD",
        "email": "schulist@outlook.com",
        "office":"India",
        "phone_number":"6382728411",
        "skype_id":"837542627481",
        "profile_pic":"./Data/profile6.jpg"
    },
    {
        "id": "8",
        "first_name": "Chelsey",
        "last_name":"Dietrich",
        "preferred_name":"Chelsey Dietrich",
        "job_title":"Business Analyst",
        "department":"Sales",
        "email": "lucio_hettinger@annie.ca",
        "office":"Seattle",
        "phone_number":"8246284627",
        "skype_id":"",
        "profile_pic":"./Data/profile5.jpg"
    }
]



// var departments={
//     "IT Department":4,
//     "Human Resources":0,
//     "MD":0,
//     "Sales":0
// }

// var offices={
//     "India":0,
//     "Seattle":4
// }

// var jobTitles={
//     "SharePoint Practice Head":1,
//     ".Net Development Lead":1,
//     "Recruiting Expert":0,
//     "BI Developer":0,
//     "Business Analyst":0,
//     "Product Engineer":1,
//     "Operations Manager":1
// }


Map=[["Preferred Name","preferred_name"],["First Name","first_name"],["Last Name","last_name"],["Job Title","job_title"],["Department","department"],["Email","email"],["Office","office"],["Phone Number","phone_number"],["Skype Id","skype_id"]]
employeeCounter=1
let searchBarValue="";
let filters={"department":"", "job_title":"", "office":""}
let EmpFilterValues=["department","job_title","office"]
let visibleEmp=[]
let prevVisibleEmp=[]
let temp={"department":[-1],"job_title":[-1],"office":[-1]}
let leftFilter={"department":"","job_title":"","office":""}

function Constructor(){
    var leftBar=document.getElementById("content")
    var links=leftBar.getElementsByTagName("a")
    for(var i=0;i<links.length;i++){
        links[i].setAttribute("href","javascript:void(0);")
        links[i].setAttribute("id",links[i].innerText)
    }

    for(let i=0;i<data.length;i++){
        AddEmployee([data[i].first_name,data[i].last_name,data[i].job_title,data[i].department,data[i].profile_pic])
    }
    FilterEmployees()
}

var image = document.createElement("img");
var loadFile = function(event) {
	image.src = URL.createObjectURL(event.target.files[0]);
};

function EmailValidation(inputtxt){
    var reg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(inputtxt)
}

function AllEmpty(){
    for(let i=0;i<EmpFilterValues.length;i++){
        if(temp[EmpFilterValues[i]][0]!=-1){
            return false
        }
    }
    return true
}

function allLetter(inputtxt)
{
    if(inputtxt.length<3){
        return false
    }
    var letters = "abcedfghijklmnopqrstuvwxyz ".split("");
    inputtxt=inputtxt.toLowerCase()
    for(var i=0;i<inputtxt.length;i++){
        if(letters.includes(inputtxt[i])==false){
            return false
        }
    }
    return true
}
  
function allNumbers(inputtxt){
    if(inputtxt==""){
        return true
    }

    let regx=/^[6-9]\d{9}$/
    if(inputtxt.match(regx)){
        return true
    }
    return false
}
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

function OpenError(inputtxt){
    document.getElementById("error").appendChild(document.createTextNode(inputtxt))
    document.getElementById("errorMessage").style.display="flex"
    document.getElementById("content").style.filter="blur(5px)"
}

function CloseError(){
    document.getElementById("errorMessage").style.display="none"
}

// function ErrorMessage(inputtxt){
//     let errorElement=document.createElement("div")
//     let errorData=document.createElement("p")
//     errorData.appendChild(document.createTextNode(inputtxt))
//     errorElement.appendChild(errorData)

//     errorElement.className="errorMessage"
//     errorElement.id="errorMessage"

//     let button=document.createElement("button")
//     button.setAttribute("onclick","CloseError()")
//     errorElement.appendChild(button)
// }


function Validator(){
    let first_name=document.getElementById("first_name").value
    let last_name=document.getElementById("last_name").value
    let email=document.getElementById("email").value
    let phone_number=document.getElementById("phone_number").value
    if(first_name==""){
        alert("Please enter First Name")
        return false
    }
    else if(last_name==""){
        alert("Please enter Last Name")
        return false
    }
    else if(allLetter(first_name)==false){
        alert("Please enter Valid First Name")
        return false
    }
    else if(allLetter(last_name)==false){
        alert("Please enter Valid Last Name")
        return false
    }
    else if(email==""){
        alert("Please enter Email Address")
        return false
    }
    else if(EmailValidation(email)==false){
        alert("Please enter Valid Email Address")
        return false
    }
    else if(allNumbers(phone_number)==false){
        alert("Please enter Valid Phone Number")
        return false
    }
    NewEmployee()
}

function insert(){
    let job=document.getElementById("job_title")
    let department=document.getElementById("department")
    let office=document.getElementById("office")
    var newData={
        "id": (employeeCounter).toString(),
        "first_name":titleCase(document.getElementById("first_name").value),
        "last_name":titleCase(document.getElementById("last_name").value),
        "preferred_name":titleCase(document.getElementById("first_name").value),
        "job_title":job.options[job.selectedIndex].text,
        "department":department.options[department.selectedIndex].text,
        "email":document.getElementById("email").value.toLowerCase(),
        "office":office.options[office.selectedIndex].text,
        "phone_number":document.getElementById("phone_number").value,
        "skype_id":document.getElementById("skype_id").value,
        "profile_pic":image.src
    }
    if(newData.phone_number==""){
        newData.phone_number="NA"
    }
    if(newData.skype_id==""){
        newData.skype_id="NA"
    }
    data.push(newData);
    // console.log(data)

}

function ClearForm(){
    document.getElementById("first_name").value=""
    document.getElementById("last_name").value=""
    document.getElementById("email").value=""
    document.getElementById("phone_number").value="" 
    document.getElementById("skype_id").value=""
}

function NewEmployee(){

    let first_name=titleCase(document.getElementById("first_name").value)
    let last_name=titleCase(document.getElementById("last_name").value)
    let job=document.getElementById("job_title")
    let job_title=job.options[job.selectedIndex].text
    let dept=document.getElementById("department")
    let department=dept.options[dept.selectedIndex].text

    insert()
    AddEmployee([first_name,last_name,job_title,department,""])

    ClearSearch()
    ClearForm()
    closeForm()
}

function AddEmployee(inputList){
    
    let first_name=inputList[0]
    let last_name=inputList[1]
    let job_title=inputList[2]
    let department=inputList[3]

    const newCard=document.createElement("div")
    newCard.className="card flex"
    newCard.setAttribute("onclick","OpenProfile("+employeeCounter+");")
    newCard.id=employeeCounter
    newCard.style.order=employeeCounter

    const profileImgDiv=document.createElement("div")
    profileImgDiv.className="profileImg"

    const profileImg=document.createElement("img")
    profileImg.src=image.src
    profileImg.alt="Profile Image"
    if(inputList[4]!=""){
        profileImg.src=inputList[4]
    }

    profileImgDiv.appendChild(profileImg)
    newCard.appendChild(profileImgDiv)

    const profileDataDiv=document.createElement("div");
    profileDataDiv.className="profileData"

    const strong=document.createElement("strong");

    strong.appendChild(document.createTextNode(first_name+" "+last_name));
    profileDataDiv.appendChild(strong);
    profileDataDiv.appendChild(document.createElement("br"));

    profileDataDiv.appendChild(document.createTextNode(job_title));
    profileDataDiv.appendChild(document.createElement("br"));

    profileDataDiv.appendChild(document.createTextNode(department));
    profileDataDiv.appendChild(document.createElement("br"));
    
    const call=document.createElement("img");
    call.src=""
    call.className="fa fa-phone-square"
    call.id="contactImg"
    call.style.padding="2px"
    profileDataDiv.appendChild(call)

    const mail=document.createElement("img");
    mail.src=""
    mail.className="fa fa-envelope"
    mail.id="contactImg"
    mail.style.padding="2px"
    profileDataDiv.appendChild(mail)

    const msg=document.createElement("img");
    msg.src=""
    msg.className="fa fa-comment"
    msg.id="contactImg"
    msg.style.padding="2px"
    profileDataDiv.appendChild(msg)

    const fav=document.createElement("img");
    fav.src=""
    fav.className="fa fa-star"
    fav.id="contactImg"
    fav.style.padding="2px"
    profileDataDiv.appendChild(fav)

    const like=document.createElement("img");
    like.src=""
    like.className="fa fa-heart"
    like.id="contactImg"
    like.style.padding="2px"
    profileDataDiv.appendChild(like)

    newCard.appendChild(profileDataDiv);
    const element=document.getElementById("employeeData");
    element.appendChild(newCard);

    employeeCounter+=1
}

function ModifyEmployee(){
    let empId=document.getElementById("profile-container").title
    // let card=document.getElementById(empId)
    // card.getElementById()
    var temp=data.find(x => x.id==empId)
    let firstName=document.getElementById("profile_first_name").innerText
    let lastName=document.getElementById("profile_last_name").innerText
    let phoneNumber=document.getElementById("profile_phone_number").innerText
    let email=document.getElementById("profile_email").innerText.toLowerCase()
    let skype=document.getElementById("profile_skype_id").innerText
    if(allLetter(firstName)==false){
        alert("Please Enter a Valid First Name")
        return
    }
    if(allLetter(lastName)==false){
        alert("Please Enter a Valid Last Name")
        return
    }
    if(allNumbers(phoneNumber)==false){
        alert("Please Enter a Valid Phone Number")
        return
    }
    let job=document.getElementsByName("profile_job_title")[0]
    let job_tit=job.options[job.selectedIndex].text
    let office=document.getElementsByName("profile_office")[0]
    let office_loc=office.options[office.selectedIndex].text
    let dept=document.getElementsByName("profile_department")[0]
    let dept_type=dept.options[dept.selectedIndex].text
    temp.first_name=titleCase(firstName)
    temp.last_name=titleCase(lastName)
    temp.email=email
    // temp.phone_number=phoneNumber
    // temp.skype_id=skype
    if(phoneNumber==""){
        temp.phone_number="NA"
    }
    else{
        temp.phone_number=phoneNumber
    }
    if(skype==""){
        temp.skype_id="NA"
    }
    else{
        temp.skype_id=skype
    }
    temp.job_title=job_tit
    temp.office=office_loc
    temp.department=dept_type
    console.log(temp,empId)

    var imageSRC=document.getElementById(empId).getElementsByTagName("img")[0].src
    let card=document.getElementById(empId)
    document.getElementById("employeeData").removeChild(card)

    const newCard=document.createElement("div")
    newCard.className="card flex"
    newCard.setAttribute("onclick","OpenProfile("+empId+");")
    newCard.id=empId
    newCard.style.order=empId

    const profileImgDiv=document.createElement("div")
    profileImgDiv.className="profileImg"

    const profileImg=document.createElement("img")
    profileImg.src=imageSRC
    profileImg.alt="Profile Image"

    profileImgDiv.appendChild(profileImg)
    newCard.appendChild(profileImgDiv)

    const profileDataDiv=document.createElement("div");
    profileDataDiv.className="profileData"

    const strong=document.createElement("strong");

    strong.appendChild(document.createTextNode(temp.first_name+" "+temp.last_name));
    profileDataDiv.appendChild(strong);
    profileDataDiv.appendChild(document.createElement("br"));

    profileDataDiv.appendChild(document.createTextNode(temp.job_title));
    profileDataDiv.appendChild(document.createElement("br"));

    profileDataDiv.appendChild(document.createTextNode(temp.department));
    profileDataDiv.appendChild(document.createElement("br"));
    
    const call=document.createElement("img");
    call.src=""
    call.className="fa fa-phone-square"
    call.id="contactImg"
    call.style.padding="2px"
    profileDataDiv.appendChild(call)

    const mail=document.createElement("img");
    mail.src=""
    mail.className="fa fa-envelope"
    mail.id="contactImg"
    mail.style.padding="2px"
    profileDataDiv.appendChild(mail)

    const msg=document.createElement("img");
    msg.src=""
    msg.className="fa fa-comment"
    msg.id="contactImg"
    msg.style.padding="2px"
    profileDataDiv.appendChild(msg)

    const fav=document.createElement("img");
    fav.src=""
    fav.className="fa fa-star"
    fav.id="contactImg"
    fav.style.padding="2px"
    profileDataDiv.appendChild(fav)

    const like=document.createElement("img");
    like.src=""
    like.className="fa fa-heart"
    like.id="contactImg"
    like.style.padding="2px"
    profileDataDiv.appendChild(like)

    newCard.appendChild(profileDataDiv);
    const element=document.getElementById("employeeData");
    element.appendChild(newCard);
    console.log(newCard)
}

function openForm() {
    document.getElementById("form-container").style.display = "flex";
    document.getElementById("openEmployee").style.display="none";
    document.getElementById("content").style.filter="blur(5px)"
}
  
function closeForm() {
    document.getElementById("form-container").style.display = "none";
    document.getElementById("openEmployee").style.display="initial";
    document.getElementById("content").style.filter="blur(0px)"
}

function showHiddenJobs(){
    document.getElementById("hiddenJobs").style.display="flex"
    document.getElementById("viewMore").style.display="none"
}

function HideJobs(){
    document.getElementById("hiddenJobs").style.display="none"
    document.getElementById("viewMore").style.display="initial"   
}

function showProfileData(empId){
    var profile=data.find(x => x.id==empId)
    if(profile==null){
        alert("Invalid Emp Id")
        return
    }
    
    let job=document.getElementsByName("profile_job_title")[0]
    for(let i=0;i<job.options.length;i++){
        if(job.options[i].value==profile.job_title){
            job.selectedIndex=i
            break
        }
    }
    let dept=document.getElementsByName("profile_department")[0]
    for(let i=0;i<dept.options.length;i++){
        if(dept.options[i].value==profile.department){
            dept.selectedIndex=i
            break
        }
    }
    let office=document.getElementsByName("profile_office")[0]
    for(let i=0;i<office.options.length;i++){
        if(office.options[i].value==profile.office){
            office.selectedIndex=i
            break
        }
    }
    //console.log(profile,job.options)
    document.getElementById("profile_first_name").innerText=profile.first_name;
    document.getElementById("profile_last_name").innerText=profile.last_name;
    document.getElementById("profile_email").innerText=profile.email;
    document.getElementById("profile_phone_number").innerText=profile.phone_number;
    document.getElementById("profile_skype_id").innerText=profile.skype_id;
    // document.getElementById("profile_pic").src=profile.profile_pic
    // console.log(profile)
}

function OpenProfile(empId){
    document.getElementById("profile-container").style.display="flex"
    document.getElementById("content").style.filter="blur(5px)"
    document.getElementById("profile-container").title=empId
    showProfileData(empId)
}

function CloseProfile(){
    document.getElementById("profile-container").style.display="none"
    document.getElementById("content").style.filter="blur(0px)"
}

function ClearSearch(){
    document.getElementById("searcher").value="";
    for(let i=0;i<data.length;i++){
        document.getElementById(data[i].id).style.display="";
    }
    searchBarValue=""
    let defaultValue="Preferred Name"
    var filter=document.getElementById("empName")
    for(var i,j=0; i=filter.options[j];j++){
        if(i.value==defaultValue){
            filter.selectedIndex=j
            break
        }
    }
    var parentEle=document.getElementById("content")
    var links=parentEle.getElementsByTagName("a")
    for(let i=0;i<links.length;i++){
        links[i].style.fontWeight="100"
        links[i].style.color="rgb(121, 120, 120)"
    }
    temp["department"]=[-1]
    temp["job_title"]=[-1]
    temp["office"]=[-1]
    FilterEmployees();
}

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  
function intersect(a, b) {
    const setA = new Set(a);
    const setB = new Set(b);

    let intersectionResult = [];

    for (let i of setB) {
    
        if (setA.has(i)) {
            intersectionResult.push(i);
        }
        
    }
    
    return intersectionResult;
}

function HideEmployees(){
    if(AllEmpty()){
        for(let i=0;i<data.length;i++){
            document.getElementById(data[i].id).style.display=""
        }
        return
    }
    for(var i=0;i<data.length;i++){
        if(visibleEmp.includes(data[i].id)){
            document.getElementById(data[i].id).style.display=""
        }
        else{
            document.getElementById(data[i].id).style.display="none"
        }
    }
}

function Filter(filter,filterValue){
    let flag=false
    var parentEle=document.getElementById(filterValue).parentElement
    if(parentEle.id=="hiddenJobs"){
        parentEle=parentEle.parentElement
    }
    var links=parentEle.getElementsByTagName("a")

    if(leftFilter[filter]==filterValue){
        for(let i=0;i<links.length;i++){
            if(links[i].id==filterValue){
                links[i].style.fontWeight="100"
                links[i].style.color="rgb(121, 120, 120)"
                break
            }
        }
        leftFilter[filter]=""
        flag=true
    }
    else{
        for(let i=0;i<links.length;i++){
            if(links[i].id==filterValue){
                links[i].style.fontWeight="bold"
                links[i].style.color="rgb(21, 185, 250)"
            }
            else{
                links[i].style.fontWeight="100"
                links[i].style.color="rgb(121, 120, 120)"
            }
        }
        leftFilter[filter]=filterValue
    }

    

    filters[filter]=filterValue
    let FilteredVales=[]
    for(let i=0;i<EmpFilterValues.length;i++){
        for(let j=0;j<data.length;j++){
            let val=filters[EmpFilterValues[i]]
            if(data[j][filter]==val){
                FilteredVales.push(data[j].id)
            }
        }
        temp[filter]=FilteredVales
    }

    if(flag){
        temp[filter]=[-1]
    }

    for(let j=0;j<EmpFilterValues.length;j++){
        if(EmpFilterValues==filter && flag==true){
            continue
        }
        if(temp[EmpFilterValues[j]][0]!=-1){
            visibleEmp=temp[EmpFilterValues[j]]
            break
        }
    }
    for(let j=0;j<EmpFilterValues.length;j++){
        if(EmpFilterValues==filter && flag==true){
            continue
        }
        if(temp[EmpFilterValues[j]][0]!=-1){
            visibleEmp=intersect(visibleEmp,temp[EmpFilterValues[j]])
        }
    }
    console.log(temp,visibleEmp)
    HideEmployees()
}

function FilterEmployee(searchBar){
    var VisibleEmployees=[]
    for(var i=0;i<data.length;i++){
        if(data[i].first_name[0]==searchBar){
            VisibleEmployees.push(data[i])
        }
    }
    for(var i=0;i<data.length;i++){
        if(VisibleEmployees.includes(data[i])){
            document.getElementById(data[i].id).style.display="";
        }
        else{
            document.getElementById(data[i].id).style.display="none";
        }
    }
}

function FilterEmployees(){
    let searchValue=document.getElementById("searcher").value.toLowerCase()
    let filter=document.getElementById("empName")
    let filterValue=filter.options[filter.selectedIndex].text;
    for(var i=0;i<Map.length;i++){
        if(Map[i][0]==filterValue){
            filterValue=Map[i][1]
            break
        }
    }
    //console.log(searchBarValue,searchValue,filterValue)
    if(searchBarValue!=null && searchBarValue!=''){
        searchValue=searchBarValue
    }
    if(searchValue==null || searchValue==''){
        data.sort(GetSortOrder(filterValue))
        for(let i=0;i<data.length;i++){
            document.getElementById(data[i].id).style.order=i+1
        }
    }

    for(let i=0;i<data.length;i++){
        let value=data[i][filterValue]
        if(value.toLowerCase().indexOf(searchValue)>-1){
            document.getElementById(data[i].id).style.display="";
        }
        else{
            document.getElementById(data[i].id).style.display="none";
        }
    }
}