"use strict";

window.onload = init;
//let url = "http://localhost/php-api/cources/read.php";
url = "https://studenter.miun.se/~naha2204/dt173g/php-api/cources/read.php";

const Kurskodinput =document.getElementById("Kurskod");
const Kursnamninput =document.getElementById("Kursnamn");
const Progressioninput =document.getElementById("Progression");
const Kursplaninput =document.getElementById("Kursplan");
const submitbtn =document.getElementById("submit");
const button =document.getElementById("button");
submitbtn.addEventListener("click", createcource);
function init(){
getCourses();
}

//funktion för att läsa kurser lista på DOM
function getCourses(){
fetch(url)
.then(response => {
    if(response.status != 200){ //inte lyckat anrop bara return
        return
    }
    return response.json()
.then(data => writecources(data))
.catch(err => console.log(err))
})
}

//skriva kurser som li element
function writecources(cources){

  const ulEl = document.getElementById("courslist");
  ulEl.innerHTML ="";
  cources.forEach(cource => {
     ulEl.innerHTML += `<li class="cource" id="${cource.id}" >Kurskod: ${cource.Kurskod}, Kursnamn:  ${cource.Kursnamn},
     <br> Progression: ${cource.Progression}, Kursplan: ${cource.Kursplan}</li>`
  });
let liEL= document.getElementsByClassName("cource");
for(let i=0; i<liEL.length; i++){
  liEL[i].addEventListener("click",deletecoure);
}

}


//radera en kurs med id 
function deletecoure(event){
  //spara id i variabel
  let id = event.target.id;
// fetch och skicka method delete
  fetch(url + "?id=" + id, {
    "method" : "DELETE"
  })
  .then(response => response.json()) 
  .then(data => getCourses() )   //läsa kurserlista på nytt efter att radera en kurs
  .catch(err => console.log(err))
  }

  
  
    
  

function createcource(event){
event.preventDefault();
//läsa in värden från input
let Kurskodin = Kurskodinput.value;
let Kursnamnin = Kursnamninput.value;
let Progressionin = Progressioninput.value;
let Kursplanin = Kursplaninput.value;

let jsonStr = JSON.stringify({
  Kurskod : Kurskodin,
  Kursnamn :Kursnamnin,
  Progression : Progressionin,
  Kursplan :Kursplanin
})
fetch(url , {
  method : "POST",
  headers: {
    "content-type" : "application/json"
  }, 
  body: jsonStr

})
.then(response => response.json()) 
.then(data => clearform() )   //läsa kurserlista på nytt efter att radera en kurs
.catch(err => console.log(err))
}

//rensa form
function clearform(){
  Kurskodinput.value="";
  Kursnamninput.value="";
  Progressioninput.value="";
  Kursplaninput.value="";
  getCourses();
}
  



function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}