const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((json) => displayLesson(json.data));
};

// word function link setup
const loadLevelWord=(id)=>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
     .then((res) => res.json())
     .then((data) => displayLevelWord(data.data));
   
};
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
      <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
      </div>
      </div>
 `;
//join div and word container this code
wordContainer.append(card);});            
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
<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
 <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
 </button>
  `;
  //   4-append into container
  levelContainer.append(btnDiv);
}
};
loadLesson();