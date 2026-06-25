let profiles = [];

function addProfile() {
  let name = document.getElementById("name").value;
  let teach = document.getElementById("teach").value;
  let learn = document.getElementById("learn").value;

  if (!name || !teach || !learn) {
    alert("Please fill all fields");
    return;
  }

  let profile = { name, teach, learn };
  profiles.push(profile);

  showToast("Profile Added Successfully")

  // Save to Local Storage
  localStorage.setItem("skillswapProfiles", JSON.stringify(profiles));
  displayProfiles();
  updateProfileCount();
  clearForm();
  findMatches();
}

function displayProfiles() {
  let container = document.getElementById("profileContainer");
  container.innerHTML = "";

  profiles.forEach((p) => {
    container.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p><b>Can Teach:</b> ${p.teach}</p>
        <p><b>Wants to Learn:</b> ${p.learn}</p>
      </div>
    `;
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("teach").value = "";
  document.getElementById("learn").value = "";
}

function searchProfile() {
  let input = document.getElementById("search").value.toLowerCase();
  let found=false;
  profiles.forEach((p, index) => {
    let card = document.getElementsByClassName("card")[index];

    let text = (p.teach + p.learn + p.name).toLowerCase();

    if (text.includes(input)) {
      card.style.display = "block";
      found=true;
    } else {
      card.style.display = "none";
    }
  });
let message = document.getElementById("noResult");

if(!found){
    message.style.display = "block";
}
else{
    message.style.display = "none";
}

  findMatches();
}

window.onload=function(){
   let stored=localStorage.getItem("skillswapProfiles");
  if (stored){
    profiles=JSON.parse(stored);
    displayProfiles();
    updateProfileCount();
    findMatches();
  }
}

function saveToStorage() {
  localStorage.setItem("skillswapProfiles", JSON.stringify(profiles));
}

localStorage.setItem("test", "hello");
console.log(localStorage.getItem("test"));

function findMatches() {
  let matches=[];

  let searchText =
document.getElementById("search")
.value
.toLowerCase();

  let matchBox = document.getElementById("matchResult");
  matchBox.innerHTML = "";

  for(let i = 0; i < profiles.length; i++) {

    for(let j = i + 1; j < profiles.length; j++) {

      let score = 0;

      if(
        profiles[i].teach.toLowerCase() === profiles[j].learn.toLowerCase()
      ){
        score += 50;
      }

      if(
        profiles[i].learn.toLowerCase() === profiles[j].teach.toLowerCase()
      ){
        score += 50;
      }

      if(score > 0){

        if (
  !profiles[i].teach.toLowerCase().includes(searchText) &&
  !profiles[i].learn.toLowerCase().includes(searchText) &&
  !profiles[i].name.toLowerCase().includes(searchText) &&

  !profiles[j].teach.toLowerCase().includes(searchText) &&
  !profiles[j].learn.toLowerCase().includes(searchText) &&
  !profiles[j].name.toLowerCase().includes(searchText)
) {
  continue;
}
      matches.push({
    score: score,
    user1: profiles[i].name,
    user2: profiles[j].name
});
        
      }
    }
  }
  matches.sort((a,b) => b.score - a.score);
  matches.forEach(match => {

    matchBox.innerHTML += `
    <div class="match-card">

        <h3>🎯 Match Found!</h3>

        <p>
            <strong>${match.user1}</strong>
            ↔
            <strong>${match.user2}</strong>
        </p>

        <p>Match Score: ${match.score}%</p>

        <button
        onclick="connectUser('${match.user2}')"
        class="connect-btn">
        Connect
        </button>

    </div>
    `;

});
}

function connectUser(name){
  alert("Connection request sent to" + " " + name);
}

function sendMessage(event){

    event.preventDefault();

    alert("Message Sent Successfully!");

    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("message").value = "";

}

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }
    else{
        localStorage.setItem("theme","light");
    }

}

window.addEventListener("load", () => {

    let theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.body.classList.add("dark-mode");
    }

});

function updateProfileCount(){

    document.getElementById("profileCount")
    .innerText =
    "Total Profiles: " + profiles.length;

}

function showToast(message){

    let toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    },3000);

}