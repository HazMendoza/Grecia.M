const colors = [
	"#eaf2f8", "#154360", "#e9f7ef", "#145a32", "#fdfefe", "#d0d3d4"
  ];
  const letters = "I MISS YOU";
  let letterIndex = 0;
  
  // Get the next letter from the message
  function getNextLetter() {
	const letter = letters.charAt(letterIndex);
	letterIndex = (letterIndex + 1) % letters.length;
	return letter;
  }
  
  // Create a firework burst directly (no projectile)
  function createBurst(x, y) {
	const numLetters = 10;
	const numSparkles = 30;
  
	for (let i = 0; i < numLetters; i++) {
	  createParticle(x, y, false);
	}
	for (let i = 0; i < numSparkles; i++) {
	  createParticle(x, y, true);
	}
  }
  
  // Create a single particle (letter or sparkle)
  function createParticle(x, y, isSparkle) {
	const el = document.createElement("div");
	el.classList.add(isSparkle ? "sparkle" : "particle");
  
	if (!isSparkle) {
	  el.textContent = getNextLetter();
	  el.style.color = colors[Math.floor(Math.random() * colors.length)];
	} else {
	  el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	}
  
	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	document.body.appendChild(el);
  
	animateParticle(el, isSparkle);
  }
  
  // Animate a particle
  function animateParticle(el, isSparkle) {
	const angle = Math.random() * Math.PI * 2;
	const distance = anime.random(80, 150);
	const duration = anime.random(1000, 2000);
	const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;
  
	anime.timeline({
	  targets: el,
	  easing: "easeOutCubic",
	  duration: duration,
	  complete: () => el.remove(),
	})
	.add({
	  translateX: Math.cos(angle) * distance,
	  translateY: Math.sin(angle) * distance,
	  scale: [0, scale],
	  opacity: [1, 0.9],
	})
	.add({
	  opacity: [0.9, 0],
	  easing: "easeInCubic",
	  duration: duration / 2,
	});
  }
  
  // Add click listener for firework creation
  document.addEventListener("click", (e) => {
	createBurst(e.clientX, e.clientY);
  });
  
  // Auto-trigger a firework on page load
  window.onload = function () {
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	createBurst(centerX, centerY);
  };
