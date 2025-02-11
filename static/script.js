function createSparkles(num) {
    for (let i = 0; i < num; i++) {
        let sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        // Random initial position
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.left = Math.random() * 100 + "vw";

        // Random animation duration
        sparkle.style.animationDuration = (2 + Math.random() * 2) + "s";

        document.body.appendChild(sparkle);

        // Move sparkle to a new random position every few seconds
        setInterval(() => {
            sparkle.style.top = Math.random() * 100 + "vh";
            sparkle.style.left = Math.random() * 100 + "vw";
        }, 3000); // Change position every 3 seconds
    }
}

document.addEventListener("DOMContentLoaded", function () {
    createSparkles(20); // Creates 20 sparkles, adjust as needed
});
