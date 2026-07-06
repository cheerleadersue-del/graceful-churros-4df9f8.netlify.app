/* 센터 이미지 변경 */
const centerItems = document.querySelectorAll(".center-item");
const centerImage = document.getElementById("centerImage");
const currentNum = document.getElementById("currentNum");

if (centerItems.length && centerImage) {
  centerItems.forEach(item => {
    item.addEventListener("click", () => {
      const newImg = item.dataset.img;
      const num = item.dataset.num;

      centerItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      centerImage.style.opacity = "0";
      centerImage.style.transform = "scale(1.06)";

      setTimeout(() => {
        centerImage.src = newImg;
        if (currentNum) currentNum.textContent = num;

        centerImage.style.opacity = "1";
        centerImage.style.transform = "scale(1.03)";
      }, 260);
    });
  });
}

/* 변호인단 프로필 변경 */
const lawyerButtons = document.querySelectorAll(".lawyer-nav button");
const lawyerPhoto = document.getElementById("lawyerPhoto");
const lawyerName = document.getElementById("lawyerName");
const lawyerRole = document.getElementById("lawyerRole");
const lawyerCareer = document.getElementById("lawyerCareer");

if (lawyerButtons.length && lawyerPhoto) {
  lawyerButtons.forEach(button => {
    button.addEventListener("click", () => {
      lawyerButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      lawyerPhoto.style.opacity = "0";
      lawyerPhoto.style.transform = "scale(1.05)";

      setTimeout(() => {
        lawyerPhoto.src = button.dataset.img;
        lawyerName.textContent = button.dataset.name;
        lawyerRole.textContent = button.dataset.role;

        lawyerCareer.innerHTML = "";
        button.dataset.career.split("|").forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          lawyerCareer.appendChild(li);
        });

        lawyerPhoto.style.opacity = "1";
        lawyerPhoto.style.transform = "scale(1)";
      }, 280);
    });
  });

