const practiceItems = document.querySelectorAll(".practice-item");
const practiceImage = document.getElementById("practiceImage");
const practiceTitle = document.getElementById("practiceTitle");
const practiceDesc = document.getElementById("practiceDesc");
const caseText = document.getElementById("caseText");

practiceItems.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.dataset.img;
    const title = item.dataset.title;
    const desc = item.dataset.desc;
    const caseLabel = item.dataset.case;

    practiceItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    practiceImage.style.opacity = "0";
    practiceImage.style.transform = "scale(1.06)";

    setTimeout(() => {
      practiceImage.src = img;
      practiceTitle.innerHTML = title.replace("센터", "<br>센터");
      practiceDesc.innerHTML = desc;
      caseText.textContent = caseLabel;

      practiceImage.style.opacity = "1";
      practiceImage.style.transform = "scale(1.02)";
    }, 260);
  });
});
