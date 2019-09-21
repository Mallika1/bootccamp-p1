// Firebase Login test script

// Programmer: Sohail Zafar

// Description: This is a javascript file that is part of a 2 part system. The first part is the file: testIndexModal.html.

// This is the second part.

// The login status is outputed to the console by log.  // Initialize Firebase

var config = {

   apiKey: "AIzaSyCIGE2VpVfjpOyC2Kt9tM7t_RTV_Ebf3EU",

   authDomain: "project1login.firebaseapp.com",

   databaseURL: "https://project1login.firebaseio.com",

   projectId: "project1login",

   storageBucket: "project1login.appspot.com",

   messagingSenderId: "547869776661"

 };

 firebase.initializeApp(config);  const txtEmail = document.getElementById('txtEmail');

 const txtPassword = document.getElementById('txtPassword');

 const btnLogin = document.getElementById('btnLogin');

 const btnSignUp = document.getElementById('btnSignUp');

 const btnLogOut = document.getElementById('btnLogOut');//  Add event Listener. Sign in.

btnLogin.addEventListener('click', e => {

   // get email and Password

   const email = txtEmail.value;

   const pass = txtPassword.value;

   const auth = firebase.auth();    const promise = auth.signInWithEmailAndPassword(email, pass);

   promise.catch( e => console.log(e.message));

});btnSignUp.addEventListener('click', e => {

   // sign up

   const email = txtEmail.value;

   const pass = txtPassword.value;

   const auth = firebase.auth();    // sign in

   const promise = auth.createUserWithEmailAndPassword(email, pass);

   promise.catch( e => console.log(e.message));

});    //  Log out

btnLogout.addEventListener('click', e=> {

   firebase.auth().signOut();

   $("#txtEmail").val("");

   $("#txtPassword").val("");

});//  add a realtime listner

firebase.auth().onAuthStateChanged(firebaseUser => {

       if (firebaseUser) {

   // Here the user is logged in and print the user email id to the console. If user is logged in the firbaseUser has the email ID value

   // stored in the firebaseUser.email

           console.log(firebaseUser.email +" is logged in.");            
           $("#btnLogout").show();

       } else {

   // Here the user is not logged in. firebaseUser has the vaule null.

           console.log("Not Logged in.");

           console.log(firebaseUser);

           $("#btnLogout").hide();

       }

   });

