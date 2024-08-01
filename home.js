import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js"
import { 
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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
const added = document.querySelector("#data");


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
  try {
    const docRef = await addDoc(collection(db, "todocollection"), {
      text: todo.value,
      time: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      text: todo.value,
      id: docRef.id,
    });
    render();
    todo.value = "";
  } catch (error) {
    console.error("Document: ", error);
  }
  render()
})


async function getData() {
  const querySnapshot = await getDocs(collection(db, "todocollection"));
  querySnapshot.forEach((doc) => {
    arr.push({
      ...doc.data(),
      id: doc.id
    });
  });
  console.log(arr);
  render();
}

getData();


async function render(){
  added.innerHTML= "";

  if (arr.length === 0) {
    added.innerHTML = `No Data Found`;
    return;
  }
  
  arr.map((item)=>{
    added.innerHTML += `
    <li>${item.text}</li>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `
  })
  
  
  const editBtn = document.querySelectorAll(".edit-btn");
  const deleteBtn = document.querySelectorAll(".delete-btn");


  editBtn.forEach((btn , index)=>{
    btn.addEventListener("click", async()=>{
      const newValue = prompt("Enter new Value")
      const newTodo = doc(db, "todocollection", arr[index].id);
      await updateDoc(newTodo, {
        text : newValue 
      });
      console.log("Updated");
      arr[index].text = newValue;
      render()
    })
  })

  deleteBtn.forEach((btn , index) =>{
    btn.addEventListener("click", async()=>{
      await deleteDoc(doc(db, "todocollection", arr[index].id));
      arr.splice(index , 1)
      render()
    })
  })
  
}
render()




