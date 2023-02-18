// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getDatabase,ref,set, } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt-mMMIReBcDVzMAthFurVa0a2EQCkAOQ",
  authDomain: "quizz-app-86c41.firebaseapp.com",
  projectId: "quizz-app-86c41",
  storageBucket: "quizz-app-86c41.appspot.com",
  messagingSenderId: "951562924039",
  appId: "1:951562924039:web:7b5fc76c57a06381a03aa2",
  measurementId: "G-1LBLVNQ8E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();


var questions = [
   {
     Question: "MS word is software of __",
     CorrectAns: "Microsoft",
     Options: ["Apple", "Android", "Google", "Microsoft"],
   },
   {
     Question: "Which is the word processing software?",
     CorrectAns: "MS word 2007",
     Options: ["Avast", "MS word 2007", "Google Chrome ", "Mozilla Firefox"],
   },
   {
     Question: "MS Word is __ software.    ",
     CorrectAns: "Word processing",
     Options: [
       "Web browser",
       "Word processing",
       "Operating system",
       "Antivirus",
     ],
   },
   {
     Question: "The valid format of MS Word is __",
     CorrectAns: ".doc",
     Options: [".exe", ".doc", ".png", " .jpeg"],
   },
   {
     Question: "What program is used in MS-Word to check the spelling?",
     CorrectAns: "Spelling & Grammar",
     Options: ["Research", "Word Count", "Set language", "Spelling & Grammar"],
   },
   {
     Question: "A word gets selected by clicking it",
     CorrectAns: "Twice",
     Options: [" Once", "Twice", "Three times", "Four times"],
   },
   {
     Question: "The center the selected text, the shortcut key is",
     CorrectAns: "Ctrl + E",
     Options: ["Ctrl + C", "Ctrl + E", " Ctrl + U", "Ctrl + O"],
   },
   {
     Question: "Which option is not available in Microsoft office button?",
     CorrectAns: "Bold",
     Options: ["Bold", "New", "Save", "Open"],
   },
   {
     Question:
       "_ is the change the way text warps around the selected object.",
     CorrectAns: "Text wrapping",
     Options: ["Text wrapping", "Indent", "Clipart", " Line spacing"],
   },
   {
     Question: "A major step before taking print of the document is",
     CorrectAns: "Both b and c",
     Options: [
       "To save the document",
       "To set paper setting",
       "To see print preview of the document",
       "Both b and c",
     ],
   },
 ];

var questionsNum = document.getElementById("questionsNum");
var question = document.getElementById("Question");
var ansParent = document.getElementById("ansParent");
var showMarks = document.getElementById("showMarks");
var showPercentage = document.getElementById("showPercentage");
var displayQuestion = document.getElementById("displayQuestion");
var indexNum = 0;
var marks = 0; 


function renderQuestion(){
   var currentQue = questions[indexNum];

   questionsNum.innerHTML =
   "Question #" + (indexNum + 1) + "/" + questions.length;
   question.innerHTML = currentQue.Question;
   ansParent.innerHTML = "";

   for(var i = 0; i < currentQue.Options.length; i++){
   var obj = {
     question: currentQue.Question,
     CorrectAns: currentQue.CorrectAns,
     OptionSelected: currentQue.Options[i],
   };


    ansParent.innerHTML += `<div class="col-md-6 py-2"><button onclick="checkQues('${currentQue.Options[i]}' , '${currentQue.CorrectAns}')" class="btn btn-outline-danger w-100 rounded">${currentQue.Options[i]}</button></div>`;
   }
obj.id = Math.random().toString().slice(2);
let reference = ref(database , `tasks/Question${indexNum + 1}/${obj.id}/`);
set(reference, obj);
console.log(obj);


}
renderQuestion();

window.checkQues = function (a,b){
   if(a==b){
       marks++;
       showMarks.innerHTML = marks;
       showPercentage.innerHTML = (marks / questions.length)*100;
   }else{
   nextQuestion();
   }
};

window.nextQuestion = function (){
 indexNum++;
 if(indexNum + 1 == questions.length){
   displayQuestion.style.display = "none";
}
 renderQuestion();
};