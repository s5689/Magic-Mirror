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

// Navbar Click Events
(() => {
  const navbarButtons = document.querySelectorAll("#navbar #buttons button");
  const sectionList = document.querySelectorAll("section");

  navbarButtons.forEach((value, k) => {
    value.addEventListener("click", () => {
      sectionList[k + 1].scrollIntoView();
    });
  });
})();

// Navbar Scroll Events
(() => {
  const navbarButtons = document.querySelectorAll("#navbar #buttons button");
  const sectionList = document.querySelectorAll("section");

  getCurrentSection();
  document.addEventListener("scrollend", () => getCurrentSection());

  function getCurrentSection() {
    let showing = false;

    sectionList.forEach((value, k) => {
      const sectionY = value.offsetTop;
      const sectionSize = value.offsetHeight;
      const currentY = window.scrollY;
      const j = k - 1;

      if (j !== -1) {
        if (
          currentY >= sectionY - sectionSize / 2 &&
          currentY <= sectionY + sectionSize / 2 &&
          !showing
        ) {
          showing = true;
          navbarButtons[j].setAttribute("current", "");
        } else {
          navbarButtons[j].removeAttribute("current");
        }
      }
    });
  }
})();
