const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((json) => displayLesson(json.data));
};

// word function
const loadLevelWord=(id)=>{
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayLevelWord(data.data));
};
const displayLevelWord = (words) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML="";
  words.forEach((word) => {
 const card=document.createElement("div");
 card.innerHTML=`
  

 `});
};


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