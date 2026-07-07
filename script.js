const practiceItems = document.querySelectorAll(".practice-item");
const practiceImage = document.getElementById("practiceImage");
const practiceTitle = document.getElementById("practiceTitle");
const practiceKeywords = document.getElementById("practiceKeywords");

practiceItems.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.dataset.img;
    const title = item.dataset.title;
    const keywords = item.dataset.keywords;

    practiceItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    practiceImage.style.opacity = "0";
    practiceImage.style.transform = "scale(1.06)";

    setTimeout(() => {
      practiceImage.src = img;
      practiceTitle.innerHTML = title;
      practiceKeywords.textContent = keywords;

      practiceImage.style.opacity = "1";
      practiceImage.style.transform = "scale(1.02)";
    }, 260);
  });
});
