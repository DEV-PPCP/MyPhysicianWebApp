function setParameter(parameterName, methodName) {
    var obj = new Object();
    obj.WebMethodName = methodName;
    obj.XMLdata = parameterName;
    var resultData = JSON.stringify(obj);
    return resultData;
}
function setJsonParameter(parameterName, parameterValue, methodName) {
    var obj = new Object();
    obj.ParameterName = parameterName;
    obj.ParameterValue = parameterValue;
    obj.WebMethodName = methodName;
    var resultData = JSON.stringify(obj);
    resultData = getformattedJsonFromArray(resultData);
    return resultData;
}
function getformattedJsonFromArray(arrayObj) {
    arrayObj = arrayObj.replace(/"/g, "'");
    return arrayObj + "";
}

function credentials(Url) {
    var Providervalidators = $("#usernamediv").kendoValidator().data("kendoValidator");
    var usernamevalidate = $("#divUserName").kendoValidator().data("kendoValidator");
    if ($("#rbtnUserName").is(":checked") == true) {
        if (Providervalidators.validate()) {
            var webMethodName = "ValidateProviderForgotUserName";
            var username = $("#txtUserName").val();
            var ParameterNames = new Array();
            var ParameterValues = new Array();
            ParameterNames[0] = "UserName";
            ParameterValues[0] = username;
            ParameterNames[1] = "FirstName";
            ParameterValues[1] = $("#First_Name").val();;
            ParameterNames[2] = "LastName";
            ParameterValues[2] = $("#Last_Name").val();
            ParameterNames[4] = "CountryCode";
            ParameterValues[4] = $("#CountryCode").val();
            ParameterNames[3] = "MobileNumber";
            ParameterValues[3] = $("#txtMobileNumber").val();
            ParameterNames[5] = "Email";
            ParameterValues[5] = $("#txtEmail").val();
            var Url = Url + "Provider";
            var jsonPostString = setJsonParameter(ParameterNames, ParameterValues, webMethodName);
            $.ajax({
                type: "POST",
                url: Url,
                data: jsonPostString,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    var obj = result[0];
                    if (obj.length > 0) {
                        $('#FirstName').val(obj[0].FirstName);
                        $('#LastName').val(obj[0].LastName);
                        $('#UserID').val(obj[0].UserID);
                        $('#ProviderID').val(obj[0].ProviderID);
                        $('#UserName').val(obj[0].UserName);
                        $('#CountryID').val(obj[0].CountryCode);
                        $('#MobileNo').val(obj[0].MobileNumber);
                        $('#Email').val(obj[0].Email);
                        $('#UserPassword').val(obj[0].UserPassword);
                        $("#OtpNumber").val(obj[0].OTP);
                        document.getElementById("divfsLogin").style.display = "none";
                        document.getElementById("divvalidotp").style.display = "block";
                        document.getElementById("spnMessage").innerHTML = "An Onetime Password is sent to your Mobile Number: " + $('#MobileNo').val();
                    } else {
                        document.getElementById("spnForgotUsername").innerHTML = "Please enter valid data.";
                        return;
                    }

                }
            });

        }
    } else if ($("#rbtnPassword").is(":checked") == true) {
        if (usernamevalidate.validate()) {
            var username = $("#txtUserName").val();
            var webMethodName = "ValidateProviderForgotPassword";
            var ParameterNames = new Array();
            var ParameterValues = new Array();
            ParameterNames[0] = "UserName";
            ParameterValues[0] = username;
            ParameterNames[1] = "FirstName";
            ParameterValues[1] = $("#First_Name").val();;
            ParameterNames[2] = "LastName";
            ParameterValues[2] = $("#Last_Name").val();
            ParameterNames[3] = "CountryCode";
            ParameterValues[3] = $("#CountryCode").val();
            ParameterNames[4] = "MobileNumber";
            ParameterValues[4] = $("#txtMobileNumber").val();
            ParameterNames[5] = "Email";
            ParameterValues[5] = $("#txtEmail").val();
            var Url = Url + "Provider";
            var jsonPostString = setJsonParameter(ParameterNames, ParameterValues, webMethodName);
            $.ajax({
                type: "POST",
                url: Url,
                data: jsonPostString,
                dataType: "json",
                contentType: "application/json",
                success: function (result) {
                    var obj = result[0];
                    if (obj == "") {
                        document.getElementById("spnUserName").innerHTML = "Username not valid";
                        return;
                    }
                    else {
                        document.getElementById("spnUserName").innerHTML = "";
                        document.getElementById("divfsLogin").style.display = "none";
                        $('#FirstName').val(obj[0].FirstName);
                        $('#LastName').val(obj[0].LastName);
                        $('#UserID').val(obj[0].UserID);
                        $('#ProviderID').val(obj[0].ProviderID);
                        $('#UserName').val(obj[0].UserName);
                        $('#CountryID').val(obj[0].CountryCode);
                        $('#MobileNo').val(obj[0].MobileNumber);
                        $('#Email').val(obj[0].Email);
                        $('#UserPassword').val(obj[0].UserPassword);
                        $("#OtpNumber").val(obj[0].OTP);
                        $("#fsSecurityQuestions").show();
                        document.getElementById("divvalidotp").style.display = "block";
                        document.getElementById("spnMessage").innerHTML = "An Onetime Password is sent to your Mobile Number " + $('#MobileNo').val();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                },
            });
        }
    }
}
//Resend OTP FOR Provider Credentials  : Ragini on 27-08-2019
function resendOTPs(Url) {
    var reqcount = $("#Count").val();
    if (reqcount == 2) {
        document.getElementById("divErrMessagePopup").style.display = "block";
        document.getElementById("spnPopupErrMessage").innerHTML = "Your reach the maximum reasend OTP.Please try again later";
    } else {
        reqcount = parseInt(reqcount) + parseInt(1);
        $("#Count").val(reqcount);
        credentials(Url);
    }
}

function UpdateProviderPassword(Url) {
    var txtpassword = $("#NewPassword").val();
    var txtconfirmpassword = $("#ConfirmPassword").val();
    var ID = $("#ProviderID").val();
    var webMethodName = "UpdatePassword";
    var ParameterNames = new Array();
    var ParameterValues = new Array();
    ParameterNames[0] = "ProviderID";
    ParameterValues[0] = ID;
    ParameterNames[1] = "Password";
    ParameterValues[1] = txtconfirmpassword;
    var jsonPostString = setJsonParameter(ParameterNames, ParameterValues, webMethodName);
    var Url = Url + "Provider";
    $.ajax({
        type: "POST",
        url: Url,
        data: jsonPostString,
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            var obj = result[0];
            var objlist = obj[0];
            if (objlist.ResultID >= 1) {   
                document.getElementById("divChangePwdPopup").style.display = "block";
                document.getElementById("spnPopupMessage").innerHTML = "Password has been changed successfully.";
            }
            else {
                document.getElementById("divErrMessagePopup").style.display = "block";
                document.getElementById("spnPopupErrMessage").innerHTML = "Please enter valid Data";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });


}