import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js"
import { collection, addDoc , getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location = "login.html"
    }
  });


  
const logout = document.querySelector("#logout-btn");
const todo = document.querySelector("#todo");
const addBtn = document.querySelector("#add-btn");
const added = document.querySelector("#list");


const arr = [];

logout.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        console.log("Logout Successfuly");
        window.location = "login.html"
    }).catch((error) => {
        console.log(error);
    });
})


addBtn.addEventListener("click",async (event)=>{
  event.preventDefault()
  const docRef = await addDoc(collection(db, "todocollection"), {
    text: todo.value,
  });
  console.log("Document written with ID: ", docRef.id);
  arr.push({
    text: todo.value,
  })
  render()
  todo.value = ""
})

async function render(){
  added.innerHTML= ""
  arr.length = 0
  const querySnapshot = await getDocs(collection(db, "todocollection"));
  querySnapshot.forEach((doc) => {
    arr.push(doc.data())
  console.log(doc.id, " => ", doc.data());
});

  arr.map((item)=>{
    added.innerHTML += `
    <li>${item.text}</li>
    `
    console.log(item.text);
  })
  
}
render()




