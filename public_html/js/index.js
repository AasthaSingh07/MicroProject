/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jpdBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "SCHOOL-DB";
var empRelationName = "STUDENT-TABLE";
var connToken="90933214|-31949279405643706|90950677";
$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function getEmpIdAsJsonObj(){
    var rollno = $("#rollno").val();
    var jsonStr = {
        roll:rollno
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fullname").val(record.name);
    $("#class1").val(record.class2);
    $("#birthdate").val(record.birth);
    $("#address").val(record.add);
    $("#enrollmentdate").val(record.enroll);   
}
function resetForm(){
    $("#rollno").val("");
    $("#fullname").val("");
    $("#class1").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrollmentdate").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollno").focus();
}
function validateData(){
    var rollno, fullname,class1,birthdate,address,enrollmentdate;
    rollno = $("#rollno").val();
    fullname = $("#fullname").val();
    class1 = $("#class1").val();
    birthdate = $("#birthdate").val();
    address = $("#address").val();
    enrollmentdate = $("#enrollmentdate").val();
    if(rollno===""){
        alert("Roll No missing");
        $("#rollno").focus();
        return "";
    }
    if(fullname===""){
        alert("Full Name missing");
        $("#fullname").focus();
        return "";
    }
    if(class1===""){
        alert("Class missing");
        $("#class1").focus();
        return "";
    }
    if(birthdate===""){
        alert("Birth-Date missing");
        $("#birthdate").focus();
        return "";
    }
    if(address===""){
        alert("Address missing");
        $("#address").focus();
        return "";
    }
    if(enrollmentdate===""){
        alert("Enrollment-Date missing");
        $("#enrollmentdate").focus();
        return "";
    }
    var jsonStrObj = {
        roll:rollno,
        name: fullname,
        class2: class1,
        birth: birthdate,
        add: address,
        enroll: enrollmentdate
    };
    return JSON.stringify(jsonStrObj);
}
function getEmp(){
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,empDBName,empRelationName,empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status===400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullname").focus();
    }else if(resJsonObj.status===200){
        $("#rollno").prop("disabled", true);
        fillData(resJsonObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#fullname").focus();
    }
    
}
function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj===" "){
        return " ";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#rollno").focus();  
}
function changeData(){
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBName, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}
function resetData(){
    resetForm();
    $("#rollno").focus();
}




