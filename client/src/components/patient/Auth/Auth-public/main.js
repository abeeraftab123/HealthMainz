let loginForm = $('.login-page');
let signUpForm = $('.signUp');
let loginSection = $('.login-section');
let signUpSection = $('.signup-section');
let loginBtn = $('.login-btn');
let signUpBtn = $('.signup-btn');
let message = $('.message');
let adminSection = $('.admin-section');
let passcodeSection = $('.passcode');
let adminSignup = $('#admin-signup');
let okay = $('.okay');
let adminSignupBtn = $('.admin-signup-btn');
let adminSignUpForm = $('.admin-form');
let adminLoginForm = $('.admin-login');
let adminLoginBtn = $('.admin-login-btn');
let adminLogin = $('#admin-login');

// FRONTEND SECTION JS ###########################  
// FRONTEND SECTION JS ###########################  

signUpForm.hide();

signUpSection.on('click', function(e){
    e.preventDefault();
    loginForm.hide();
    signUpForm.show();
    signUpSection.addClass('selected');
    loginSection.removeClass('selected');
});

loginSection.on('click', function(e){
    e.preventDefault();
    loginForm.show();
    signUpForm.hide();
    signUpSection.removeClass('selected');
    loginSection.addClass('selected');
});

adminSignup.on('click', function(){
    adminSection.addClass('active')
});

let close = $('.close-signup');
close.on('click', function(){
    adminSection.removeClass('active');
});

okay.on('click', function(){
    let passcode = $('#passcode').val();
    let passcodeMessage = $('.passcode-message');
    if(passcode == 'qwerty')
    {
        passcodeMessage.text('Redirecting...');
        passcodeMessage.css('color', 'green');
        setTimeout(function(){
            adminSignUpForm.addClass('active');
        }, 3000);
    }
    else{
        passcodeMessage.text('Wrong Password');
        passcodeMessage.css('color', 'red');
    }
});

adminLogin.on('click', function(){
    adminLoginForm.addClass('active');
});

let closeAdmin = $('.close-admin');
closeAdmin.on('click', function(){
    adminLoginForm.removeClass('active');
});


// FETCH REQUESTS START HERE ################################################################################
// FETCH REQUESTS START HERE ################################################################################


$(document).ready(function(){
    console.log('ready')

    // Email Verification

    $("#mail").keyup(function () {
        var check = $("#mail").val();
        IsEmail(check);
    })

    $("#admin-mail").keyup(function () {
        var check = $("#admin-mail").val();
        IsEmail(check);
    })

    $("#admin-login-mail").keyup(function () {
        var check = $("#admin-login-mail").val();
        IsEmail(check);
    })

    $('#username').keyup(function(){
        var check = $("#username").val();
        IsEmail(check);
    })
    
    var isemail = false;

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            isemail = false;
            $("#mail").css("border", "2px solid red");
            $("#username").css("border", "2px solid red");
            $("#admin-mail").css("border", "2px solid red");
            $("#admin-login-mail").css("border", "2px solid red");
            $(signUpBtn).css("background-color", "grey");
            $(loginBtn).css("background-color", "grey");
            $(adminSignupBtn).css("background-color", "grey");
            adminLoginBtn.css("background-color", "grey");
            // $(adminSignupBtn).css("cursor", "not-allowed");
            // $(loginBtn).css("cursor", "not-allowed");
            // $(signUpBtn).css("cursor", "not-allowed");
            // $(adminSignupBtn).off('click');
        } else {
            isemail = true;
            $("#mail").css("border", "2px solid green");
            $("#username").css("border", "2px solid green");
            $("#admin-mail").css("border", "2px solid green");
            $("#admin-login-mail").css("border", "2px solid green");
            $(signUpBtn).css("background-color", "#8C61FF");
            $(loginBtn).css("background-color", "#8C61FF");
            $(adminSignupBtn).css("background-color", "#8C61FF");
            $(adminLoginBtn).css("background-color", "#8C61FF");
        }
    }

    // Username Verification

    $('#new-username').keyup(function(){
        let check = $('#new-username').val();
        IsUser(check);
    })

    $('#admin-username').keyup(function(){
        let check = $('#admin-username').val();
        IsUser(check);
    })

    isUsername = false;

    function IsUser(username){
        let userRegex = /^[a-zA-Z0-9]+$/;
        if(!userRegex.test(username))
        {
            isUsername = false;
            $('#new-username').css("border", "2px solid red");
            $('#admin-username').css("border", "2px solid red");
            signUpBtn.css("background-color", "grey");
            adminSignupBtn.css("background-color", "grey");
        }
        else
        {
            isUsername = true;
            $('#new-username').css("border", "2px solid green");
            $('#admin-username').css("border", "2px solid green");
            signUpBtn.css("background-color", "#8C61FF");
            adminSignupBtn.css("background-color", "#8C61FF");
        }
    }


    loginBtn.on('click', function(e){
        e.preventDefault();
        let mail = $('#username');
        let password = $('#password');
        let form = $(".login-form"); 

        if (isemail)
        {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({email:mail.val() , password:password.val()});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://hackjudge.herokuapp.com/admin/login/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                sessionStorage.setItem("token", result["token"]);
                form.trigger("reset");
                if(result["message"] ==="Auth failed")
                {
                    message.text("Incorrect Email or Password");
                    message.css('color', 'red');
                    message.css('margin-bottom', '10px');
                }
                else{
                    message.text('');
                    swal("Success", "You're all set!", "success");
                    setTimeout(function(){
                        location.href = "./files/user.html"
                    }, 2500)
                }
            })
            .catch(error => {
                console.log('error', error)
                swal("Aww snap!", "some error occurred!", "error");
        });
        }
    });


    signUpBtn.on('click', function(e){
        e.preventDefault();
        let email = $('#mail');
        let username = $('#new-username');
        let password = $('#new-password');
        let confirmPassword = $('#confirm-password');
        let form = $('.signup-form');

        if(isemail && password.val()==confirmPassword.val())
        {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({email: email.val(), password:password.val() ,isAdmin:false});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://hackjudge.herokuapp.com/admin/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                message.text('');
                form.trigger("reset");
                swal("Success", "You're all set!", "success");
                // console.log(result["token"]);
                setTimeout(function(){
                    location.href = "./files/user.html"
                }, 2500)
                sessionStorage.setItem("token", result["token"]);
            })
            .catch(error => {
                console.log('error', error)
                swal("Aww snap!", "some error occurred!", "error");
            });
        }
        else{
            message.text("Passswords Don't Match");
            message.css('color', 'red');
            message.css('margin-bottom', '10px');
        }
    });

    adminSignupBtn.on('click', function(e){
        e.preventDefault();
        let email = $('#admin-mail');
        let username = $('#admin-username');
        let password = $('#admin-password');
        let confirmPassword = $('#confirm-admin-password');
        let form = $('.admin-signup-form');

        if(isemail && password.val()==confirmPassword.val())
        {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({email: email.val(), password:password.val() ,isAdmin:true});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://hackjudge.herokuapp.com/admin/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                message.text('');
                form.trigger("reset");
                swal("Success", "You're all set!", "success");
                // console.log(result["token"]);
                setTimeout(function(){
                    location.href = './files/events.html'
                }, 2500);
                sessionStorage.setItem("admin-token", result["token"]);
            })
            .catch(error => {
                console.log('error', error)
                swal("Aww snap!", "some error occurred!", "error");
            });
        }
        else{
            message.text("Passswords Don't Match");
            message.css('color', 'red');
            message.css('margin-bottom', '10px');
        }
    });

    adminLoginBtn.on('click', function(e){
        e.preventDefault();
        let mail = $('#admin-login-mail');
        let password = $('#admin-login-password');
        let form = $('.admin-login-form');
        let messageBox = $('.admin-message');
        
        if (isemail)
        {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({email:mail.val() , password:password.val()});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://hackjudge.herokuapp.com/admin/login/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                sessionStorage.setItem("admin-token", result["token"]);
                form.trigger("reset");
                if(result["message"]==="Auth failed")
                {
                    messageBox.text("Incorrect email or Password");
                    messageBox.css('color', 'red');
                    messageBox.css('margin-bottom', '10px');
                }
                else{
                    messageBox.text('');
                    swal("Success", "You're all set!", "success");
                    setTimeout(function(){
                        location.href = "./files/events.html"
                    }, 2500);
                }
            })
            .catch(error => {
                console.log('error', error)
                swal("Aww snap!", "some error occurred!", "error");
        });
        }
    });
});



