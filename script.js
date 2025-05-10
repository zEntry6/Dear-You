const loveNote = document.getElementById("loveNote");
const submitBtn = document.getElementById("submitBtn");
const entriesList = document.getElementById("entriesList");

let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

window.addEventListener("DOMContentLoaded", () => {
  journalEntries.forEach(entry => addEntryToUI(entry));
});

submitBtn.addEventListener("click", () => {
  const note = loveNote.value.trim();
  if (note) {
    const entry = {
      text: note,
      date: new Date().toLocaleDateString(),
    };
    journalEntries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    addEntryToUI(entry);
    loveNote.value = ""; 
  }
});

function addEntryToUI(entry) {
  const li = document.createElement("li");
  li.classList.add("entry");
  li.innerHTML = `<strong>${entry.date}</strong><p>${entry.text}</p>`;
  entriesList.appendChild(li);
}

const moodButtons = document.querySelectorAll(".mood-btn");
const moodDisplay = document.getElementById("moodDisplay");

moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.getAttribute("data-mood");
    moodDisplay.textContent = mood;
  });
});

const hugBtn = document.getElementById("hugBtn");
const hugCounter = document.getElementById("hugCounter");
const hugAnimation = document.getElementById("hugAnimation");

let hugCount = localStorage.getItem("hugCount") || 0;
hugCounter.textContent = `You’ve sent ${hugCount} hugs 💞`;

hugBtn.addEventListener("click", () => {
  hugCount++;
  localStorage.setItem("hugCount", hugCount);
  hugCounter.textContent = `You’ve sent ${hugCount} hugs 💞`;

  hugAnimation.classList.add("show");
  setTimeout(() => {
    hugAnimation.classList.remove("show");
  }, 1500);
});

const dateInput = document.getElementById("dateInput");
const saveDateBtn = document.getElementById("saveDateBtn");
const countdownDisplay = document.getElementById("countdownDisplay");

saveDateBtn.addEventListener("click", () => {
  const meetingDate = new Date(dateInput.value);
  const now = new Date();
  const timeDiff = meetingDate - now;

  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    countdownDisplay.textContent = `Hang tight, only ${days} days left!`;
  } else {
    countdownDisplay.textContent = "It’s time! Our day is here! 💖";
  }
});

const imageUpload = document.getElementById("imageUpload");
const imageDescription = document.getElementById("imageDescription");
const uploadImageBtn = document.getElementById("uploadImageBtn");
const memoryTimeline = document.getElementById("memoryTimeline");

let memories = JSON.parse(localStorage.getItem("memories")) || [];

window.addEventListener("DOMContentLoaded", () => {
  memories.forEach(memory => addMemoryToUI(memory));
});

uploadImageBtn.addEventListener("click", () => {
  const file = imageUpload.files[0];
  const description = imageDescription.value.trim();

  if (file && description) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const memory = {
        image: e.target.result,
        description: description,
      };
      memories.push(memory);
      localStorage.setItem("memories", JSON.stringify(memories));
      addMemoryToUI(memory);

      imageUpload.value = "";
      imageDescription.value = "";
    };
    reader.readAsDataURL(file);
  }
});

function addMemoryToUI(memory) {
  const memoryItem = document.createElement("div");
  memoryItem.classList.add("memory-item");

  const img = document.createElement("img");
  img.src = memory.image;

  const description = document.createElement("div");
  description.classList.add("description");
  description.textContent = memory.description;

  memoryItem.appendChild(img);
  memoryItem.appendChild(description);

  memoryTimeline.prepend(memoryItem);
}
