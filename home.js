import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseconfig.js"

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location = "login.html"
    }
  });


  
const logout = document.querySelector("#logout-btn");

logout.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        console.log("Logout Successfuly");
        window.location = "login.html"
    }).catch((error) => {
        console.log(error);
    });
})