import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
   } 
   from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js"



const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


form.addEventListener('submit' , (event)=>{
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location = "home.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
})



const forgot = document.querySelector("#forgot-password");

forgot.addEventListener('click' , (event)=>{
  event.preventDefault()
  sendPasswordResetEmail(auth, email.value)
  .then(() => {
    alert("email sent")
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})


const googleBtn = document.querySelector("#google-login");
const provider = new GoogleAuthProvider();


googleBtn.addEventListener('click' , (event)=>{
  event.preventDefault()
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
    window.location = "home.html"
  }).catch((error) => {
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.log(errorMessage);;
  });
})