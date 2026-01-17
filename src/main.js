// Video Start
(async () => {
  const response = await fetch("./background video.mp4");
  const reader = response.body.getReader();
  let chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const blob = new Blob(chunks);
  const videoUrl = URL.createObjectURL(blob);

  const video = document.querySelector("#container #welcome #video video");
  video.src = videoUrl;
  video.play();
})();

// Gallery
(async () => {
  const gallerySlides = document.querySelectorAll("#container #gallery #slider .image-container");
  const galleryTexts = document.querySelectorAll("#container #gallery #text .text-container");
  let currentGallery = 0;

  while (true) {
    gallerySlides.forEach((value) => (value.style.opacity = 0));
    galleryTexts.forEach((value) => (value.style.opacity = 0));

    gallerySlides[currentGallery].style.opacity = 1;
    galleryTexts[currentGallery].style.opacity = 1;

    currentGallery++;

    if (currentGallery === 3) {
      currentGallery = 0;
    }

    await new Promise((r) => setTimeout(() => r(), 6000));
  }
})();

// Navbar Events
const navbarButtons = document.querySelectorAll("#navbar #buttons button");

document.querySelectorAll("section").forEach((value, k) => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navbarButtons.forEach((button, j) => {
            if (j === k - 1) {
              button.setAttribute("current", "");
            } else {
              button.removeAttribute("current");
            }
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.8,
    }
  ).observe(value);
});
