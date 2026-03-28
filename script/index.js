
const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return(htmlElements.join(" "));
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  }
  else{
       document.getElementById("spinner").classList.add("hidden");
       document.getElementById("word-container").classList.remove("hidden");
  }
}


const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((json) => displayLesson(json.data));
};

const removeactive=()=>{
  const lessonbtn = document.querySelectorAll(".lesson-btn");
  lessonbtn.forEach(btn=>btn.classList.remove('active'));
}


// word function link setup
  const loadLevelWord=(id)=>{
    manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
     .then((res) => res.json())
     .then((data) => {
      removeactive();
      const onclick = document.getElementById(`lesson-btn-${id}`);
      onclick.classList.add("active");
       displayLevelWord(data.data);
     }
    );  
};

const loadWordDetail=async(id)=>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res=await fetch(url);
  const details=await res.json();
  displayWordDetails(details.data);
}

const displayWordDetails=(word)=>{
const detailsBox = document.getElementById("details-container");
detailsBox.innerHTML = `
 <div class="">
      <h2 class="text-2xl font-bold">
        ${word.word} (  <i class="fa-solid fa-microphone-lines"></i>   :${word.pronunciation})
      </h2>
    </div>
    <div class="">
      <h2 class=" font-bold">meaning </h2>
      <p>${word.meaning}</p>
    </div>
    <div class="">
      <h2 class=" font-bold">Example</h2>
      <p>${word.sentence}</p>
      <p></p>
    </div>
    <div class="">
      <h2 class=" font-bold">সমার্থক শব্দ গুলো</h2>
     <div>${createElements(word.synonyms)}</div>
    </div>
`;
 document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
 wordContainer.innerHTML = "";

 //for not complete button
 if(words.length==0){
   wordContainer.innerHTML = ` 
    <div class="col-span-full text-center space-y-3 font-bangla">
        <img class="mx-auto" src=./assets/alert-error.png>
        <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-medium text-[#292524] text-2xl">নেক্সট Lesson এ যান</h1>
      </div>`;
      manageSpinner(false);
      return;
 }

  words.forEach((word) => { //every object show this function
 const card=document.createElement("div");

 //div inside html this section
 card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
      <h2 class="font-bold text-2xl">${word.word ? word.word : "not find word"}</h2>
      <p class="font-semibold">Meaning/pronounciation</p>
      <div class="text-2xl font-bangla">${word.meaning ? word.meaning : "not find meaning"}/ ${word.pronunciation ? word.pronunciation : "not find pronunciation"}</div>
     <div class="flex justify-between items-center">

      <button onclick="loadWordDetail(${word.id})"
       class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

      <button onclick="pronounceWord('${word.word}')" class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
      </div>
      </div>
 `;
//join div and word container this code
wordContainer.append(card);});
manageSpinner(false);            
};


//button section
 const displayLesson=(lessons)=>{
 //   1-get the  container & empty
 const levelContainer = document.getElementById("level-container");
 levelContainer.innerHTML="";
 //   2- get into every lesson
 for(let lesson of lessons ){
//   3-create element
const btnDiv = document.createElement("div");
btnDiv.innerHTML = `
<button id="lesson-btn-${lesson.level_no}" 
onclick="loadLevelWord(${lesson.level_no})"
class="btn btn-outline btn-primary lesson-btn">
 <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
 </button>
  `;
  //   4-append into container
  levelContainer.append(btnDiv);
}
};
loadLesson();
//id="lesson-btn-${lesson.level_no}
document.getElementById("btn-search").addEventListener("click",()=>{
  removeactive();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allword = data.data;
      const filterwords = allword.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
       displayLevelWord(filterwords);
    });
});