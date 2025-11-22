var keyContainer = document.querySelector(".LowerContainer")
const notes = ["A", "B", "C", "D", "E", "F","G","H","I","J","K","L","M","N","O","P"]
const colors = ["#2498F0", "#3f67deff",  "rgb(143, 185, 221)"]

for (let i = 0; i < keyContainer.clientWidth / 50; i++) {
    const key = document.createElement("div")
    key.classList.add("key")
    
    key.id = notes[i % notes.length]
    key.innerText = notes[i % notes.length]
    key.style.backgroundColor = colors[i % colors.length]
    
    attachMouseEvents(key);
    keyContainer.appendChild(key);

}




addEventListener("keydown", function (det) {
    const key = det.key.toUpperCase();
    const keyElement = document.getElementById(key);

    if (keyElement) {
        if (!keyElement.dataset.originalColor) {
            keyElement.dataset.originalColor = keyElement.style.backgroundColor;
        }
        keyElement.style.backgroundColor = "white";
    }
    playSound(key);
});

addEventListener("keyup", function (det) {
    const key = det.key.toUpperCase();
    const keyElement = document.getElementById(key);

    if (keyElement && keyElement.dataset.originalColor) {
        keyElement.style.backgroundColor = keyElement.dataset.originalColor;
        delete keyElement.dataset.originalColor;
    }
});


//  function playSound(key) {
//     const audio = new Audio(`S/${key}.mp3`);
//     audio.currentTime = 0;    // restart sound if key pressed again
//     audio.play();
// }



function attachMouseEvents(keyElement) {

    // Save original color (only once)
    keyElement.dataset.originalColor = keyElement.style.backgroundColor;

    // 👉 Hover in = dull
    keyElement.addEventListener("mouseenter", function () {
        keyElement.style.backgroundColor = "lightgray";
        playSound(keyElement.innerText);
    });

    // 👉 Hover out = normal
    keyElement.addEventListener("mouseleave", function () {
        keyElement.style.backgroundColor = keyElement.dataset.originalColor;
    });

    // 👉 Click = play sound
    keyElement.addEventListener("click", function () {
        playSound(keyElement.innerText);
    });
   
}

function playSound(key) {
    const allNotes = ["A", "B", "C", "D", "E", "F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"];
    
    const soundKeys = [28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]; // sounds you have
    
    key = key.toUpperCase();

    // find index of pressed key in allNotes
    let index = allNotes.indexOf(key);

    if (index === -1) return; // invalid key

    // repeat pattern using modulo
    const soundKey = soundKeys[index % soundKeys.length];

    const audio = new Audio(`Sounds/${soundKey}.mp3`);
    audio.currentTime = 0;
    audio.play();
}
