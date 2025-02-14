function createSparkles(num) {
    for (let i = 0; i < num; i++) {
        let sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        // Assign a unique identifier (for debugging if needed)
        sparkle.setAttribute("data-sparkle", i);

        // Random initial position
        sparkle.style.top = Math.random() * 100 + "vh";
        sparkle.style.left = Math.random() * 100 + "vw";

        // Random animation duration
        sparkle.style.animationDuration = (2 + Math.random() * 2) + "s";

        document.body.appendChild(sparkle);

        // Ensure each sparkle moves
        (function (sparkleElement) {
            setInterval(() => {
                sparkleElement.style.top = Math.random() * 100 + "vh";
                sparkleElement.style.left = Math.random() * 100 + "vw";
            }, 3000); // Change position every 3 seconds
        })(sparkle);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Remove all previous sparkles to ensure no leftovers
    let existingSparkles = document.querySelectorAll(".sparkle");
    existingSparkles.forEach(sparkle => sparkle.remove());

    createSparkles(75); // Just create 1 sparkle to isolate the problem

    const noButton = document.querySelector('.no-btn');
    let clickedOnce = false;  // Variable to track if button has been clicked

    // Function to teleport the button
    function teleportButton() {
        const maxWidth = window.innerWidth - noButton.offsetWidth;
        const maxHeight = window.innerHeight - noButton.offsetHeight;

        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        // Apply the random position to the button
        noButton.style.position = 'absolute';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    }

    // Add click event listener for the first time
    noButton.addEventListener('click', function () {
        if (!clickedOnce) {
            clickedOnce = true; // Mark the first click as done
            teleportButton(); // Teleport immediately after first click
        }
    });

    // After the first click, add hover event to teleport on mouseenter
    noButton.addEventListener('mouseenter', function () {
        if (clickedOnce) {
            teleportButton(); // Teleport on hover after first click
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const yesButton = document.querySelector('.yes-btn');
    const noButton = document.querySelector('.no-btn');
    const question = document.querySelector('.question');

    // Function to fade out the elements
    function fadeOutElements() {
        question.classList.add('hidden'); // Fade out the question
        yesButton.classList.add('hidden'); // Fade out the Yes button
        noButton.classList.add('hidden'); // Fade out the No button
    }

    // Add click event to Yes button
    yesButton.addEventListener('click', function () {
        fadeOutElements(); // Trigger the fade-out animation on click
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const yesButton = document.querySelector('.yes-btn');
    const noButton = document.querySelector('.no-btn');
    const question = document.querySelector('.question');
    const body = document.body;

    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 5000;
    const heartSize = 15; // Scaled properly

    // Resize canvas to match window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Heart equation function
    function heartEquation(t) {
        return {
            x: 16 * Math.pow(Math.sin(t), 3),
            y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        };
    }

    // Generate particles
    function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        let t = Math.random() * Math.PI * 2;
        let r = Math.random(); // Random radius
        let x = r * 16 * Math.pow(Math.sin(t), 3);
        let y = r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        let scaleFactor = 20; // Adjust as needed

        particles.push({
            x: window.innerWidth / 2 + x * scaleFactor,
            y: window.innerHeight / 2 - y * scaleFactor,
            originalX: window.innerWidth / 2 + x * scaleFactor,
            originalY: window.innerHeight / 2 - y * scaleFactor,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 30 + 340}, 100%, 75%)`
        });
    }
}

    createParticles();

    let mouse = { x: null, y: null };
    canvas.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    function updateParticles() {
        for (let p of particles) {
            let dx = p.x - mouse.x;
            let dy = p.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) { // Hover effect
                let angle = Math.atan2(dy, dx);
                p.vx = Math.cos(angle) * 6;
                p.vy = Math.sin(angle) * 6;
            } else {
                p.vx *= 0.9;
                p.vy *= 0.9;
                p.x += (p.originalX - p.x) * 0.02;
                p.y += (p.originalY - p.y) * 0.02;
            }

            p.x += p.vx;
            p.y += p.vy;
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    function fadeOutElements() {
        // Start fading background immediately
        body.classList.add('blackout');

        // Fade out text & buttons
        question.classList.add('hidden');
        yesButton.classList.add('hidden');
        noButton.classList.add('hidden');

        // Select and fade out all sparkles
        document.querySelectorAll('.sparkle').forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.remove();
            }, index * 50); // Delay each removal by 300ms
        });
    }
    function startHeartAnimation() {
    resizeCanvas();
    createParticles();
    animate();

    // Fade in the thank you text after 2 seconds
    setTimeout(() => {
        const thankYouText = document.getElementById('thank-you-tex');
        thankYouText.style.display = 'block';
        setTimeout(() => {
            thankYouText.style.opacity = '1';
        }, 100);

        // Fade in the additional text after 4 seconds (2 seconds after the first text)
        setTimeout(() => {
            const loveUText = document.getElementById('love-u-tex');
            loveUText.style.display = 'block';
            setTimeout(() => {
                loveUText.style.opacity = '1';
            }, 100);
        }, 2000);
    }, 2000);
}

    yesButton.addEventListener('click', function () {
        fadeOutElements();

    // Show the canvas and start animation after the fade-to-black effect
        setTimeout(() => {
            const canvas = document.getElementById("heartCanvas");
            canvas.style.display = "block";
            startHeartAnimation(); // New function to start the animation
        }, 5000); // 5000ms matches the fade-to-black duration
    });
});

document.addEventListener("DOMContentLoaded", function () {



});


