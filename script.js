var keyContainer = document.querySelector(".LowerContainer")
const notes = ["A", "B", "C", "D", "E", "F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"]
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


 function playSound(key) {
    const audio = new Audio(`S/${key}.mp3`);
    audio.currentTime = 0;    // restart sound if key pressed again
    audio.play();
}



function attachMouseEvents(keyElement) {

    // Save original color (only once)
    keyElement.dataset.originalColor = keyElement.style.backgroundColor;

    // 👉 Hover in = dull
    keyElement.addEventListener("mouseenter", function () {
        keyElement.style.backgroundColor = "lightgray";
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
