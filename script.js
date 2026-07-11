document.addEventListener("DOMContentLoaded", () => {
  /* ===================================
     JS PART 1
     HEADER + MOBILE MENU
  =================================== */

  const body = document.body;
  const header = document.getElementById("header");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  /* ---------- HEADER SCROLL ---------- */

  function updateHeaderState() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
  }

  updateHeaderState();

  window.addEventListener(
    "scroll",
    updateHeaderState,
    { passive: true }
  );


  /* ---------- MOBILE MENU OPEN ---------- */

  function openMobileMenu() {
    if (!menuButton || !mobileMenu) return;

    menuButton.classList.add("active");
    mobileMenu.classList.add("open");
    header?.classList.add("menu-active");
    body.classList.add("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "메뉴 닫기"
    );
  }


  /* ---------- MOBILE MENU CLOSE ---------- */

  function closeMobileMenu() {
    if (!menuButton || !mobileMenu) return;

    menuButton.classList.remove("active");
    mobileMenu.classList.remove("open");
    header?.classList.remove("menu-active");
    body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "메뉴 열기"
    );
  }


  /* ---------- MOBILE MENU TOGGLE ---------- */

  function toggleMobileMenu() {
    if (!mobileMenu) return;

    const isOpen =
      mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }


  menuButton?.addEventListener(
    "click",
    toggleMobileMenu
  );


  /* ---------- CLOSE AFTER LINK CLICK ---------- */

  const mobileMenuLinks = mobileMenu
    ? [...mobileMenu.querySelectorAll("a")]
    : [];

  mobileMenuLinks.forEach((link) => {
    link.addEventListener(
      "click",
      closeMobileMenu
    );
  });


  /* ---------- ESC KEY ---------- */

  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }
  );


  /* ---------- RESIZE RESET ---------- */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 980) {
        closeMobileMenu();
      }
    }
  );
    /* ===================================
     JS PART 2
     LAWYER DATA + BASIC ELEMENTS
  =================================== */

  const lawyerCards = [
    ...document.querySelectorAll(".lawyer-card")
  ];

  const prevButton =
    document.getElementById("prev");

  const nextButton =
    document.getElementById("next");

  const dotsContainer =
    document.getElementById("dots");

  const careerSection =
    document.getElementById("career");

  const careerRole =
    document.getElementById("careerRole");

  const careerName =
    document.getElementById("careerName");

  const careerField =
    document.getElementById("careerField");

  const careerList =
    document.getElementById("careerList");


  /* ---------- ACTIVE INDEX ---------- */

  let activeLawyerIndex = 0;


  /* ---------- LAWYER DATA ---------- */

  const lawyerProfiles = [

    {
      role: "대표변호사",

      name: "정호길",

      field: "형사 · 수사 및 재판 대응",

      career: [
        "법무법인 유일 대표변호사",
        "25년 경력 형사전문 변호사",
        "중대 형사사건 수사·재판 전략 총괄",
        "구속영장·압수수색 대응",
        "기업 및 개인 형사위기 대응 자문",
        "다수 형사재판 및 항소심 수행"
      ]
    },


    {
      role: "변호사",

      name: "김제도",

      field: "형사 · 기업분쟁",

      career: [
        "법무법인 유일 변호사",
        "경제범죄 및 재산범죄 사건 수행",
        "사기·횡령·배임 사건 변론",
        "기업 관련 형사·민사 분쟁 담당",
        "고소·고발 사건 대리",
        "금융·계좌자료 분석 및 증거 검토"
      ]
    },


    {
      role: "변호사",

      name: "정주현",

      field: "민사 · 손해배상",

      career: [
        "법무법인 유일 변호사",
        "민사 및 손해배상 사건 수행",
        "부동산·임대차 분쟁 담당",
        "계약금·대금 청구 사건 대리",
        "의료분쟁 및 전문직 책임 사건 검토",
        "사실조회·문서제출명령 절차 수행"
      ]
    },


    {
      role: "변호사",

      name: "심상한",

      field: "회생 · 기업법무",

      career: [
        "법무법인 유일 변호사",
        "개인회생·파산 사건 수행",
        "법인회생 및 채무조정 업무",
        "채권자 대응 및 재산관계 분석",
        "변제계획안 작성 및 보정",
        "기업 법률자문 및 계약 검토"
      ]
    },


    {
      role: "변호사",

      name: "이경숙",

      field: "가사 · 민사",

      career: [
        "법무법인 유일 변호사",
        "이혼·재산분할 사건 수행",
        "상속·유류분 분쟁 담당",
        "양육권·친권 사건 수행",
        "민사 손해배상 사건 대리",
        "가사조정 및 협상 사건 수행"
      ]
    },


    {
      role: "파트너변호사",

      name: "성명 입력",

      field: "형사 · 공공기관 자문",

      career: [
        "제11회 변호사시험 합격",
        "고려대학교 법학과 졸업",
        "전 법무법인 승우 변호사",
        "현 법무법인 유일 파트너변호사",
        "서울시의회 등 공공기관 법률자문",
        "형사사건 다수 수행"
      ]
    }

  ];


  /* ---------- CREATE DOTS ---------- */

  function createLawyerDots() {
    if (
      !dotsContainer ||
      lawyerCards.length === 0
    ) {
      return;
    }

    dotsContainer.innerHTML = "";

    lawyerCards.forEach((_, index) => {
      const dot =
        document.createElement("button");

      dot.type = "button";

      dot.className = "dot";

      dot.setAttribute(
        "aria-label",
        `${index + 1}번째 변호사 보기`
      );

      dot.addEventListener(
        "click",
        () => {
          activeLawyerIndex = index;

          renderLawyers();
        }
      );

      dotsContainer.appendChild(dot);
    });
  }


  /* ---------- DOT ELEMENTS ---------- */

  createLawyerDots();

  const lawyerDots = dotsContainer
    ? [...dotsContainer.children]
    : [];


  /* ---------- CARD CLICK ---------- */

  lawyerCards.forEach(
    (card, index) => {

      card.addEventListener(
        "click",
        () => {

          activeLawyerIndex = index;

          renderLawyers();
        }
      );


      /* 키보드 접근성 */

      card.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            activeLawyerIndex = index;

            renderLawyers();
          }
        }
      );

    }
  );
    /* ===================================
     JS PART 3
     COVERFLOW POSITION + CONTROLS
  =================================== */

  /* ---------- SHORTEST OFFSET ---------- */

  function getLawyerOffset(index) {
    let difference =
      index - activeLawyerIndex;

    const total =
      lawyerCards.length;

    if (
      difference >
      total / 2
    ) {
      difference -= total;
    }

    if (
      difference <
      -total / 2
    ) {
      difference += total;
    }

    return difference;
  }


  /* ---------- RESPONSIVE STEP ---------- */

  function getLawyerStep() {
    const width =
      window.innerWidth;

    if (width <= 640) {
      return 112;
    }

    if (width <= 980) {
      return 185;
    }

    if (width <= 1180) {
      return 210;
    }

    return 225;
  }


  /* ---------- CARD POSITION ---------- */

  function getCardTransform(
    offset
  ) {
    const distance =
      Math.abs(offset);

    const horizontalStep =
      getLawyerStep();

    const translateX =
      offset * horizontalStep;

    let translateZ = -110;
    let rotateY = 0;
    let scale = 0.76;
    let opacity = 0.46;

    if (distance === 0) {
      translateZ = 130;
      rotateY = 0;
      scale = 1;
      opacity = 1;
    }

    if (distance === 1) {
      translateZ = 15;
      rotateY =
        offset < 0
          ? 7
          : -7;
      scale = 0.86;
      opacity = 0.7;
    }

    if (distance >= 2) {
      translateZ = -110;
      rotateY =
        offset < 0
          ? 9
          : -9;
      scale = 0.76;
      opacity = 0.42;
    }

    return {
      distance,
      translateX,
      translateZ,
      rotateY,
      scale,
      opacity
    };
  }


  /* ---------- RENDER LAWYERS ---------- */

  function renderLawyers() {
    if (
      lawyerCards.length === 0
    ) {
      return;
    }

    lawyerCards.forEach(
      (card, index) => {

        const offset =
          getLawyerOffset(index);

        const transform =
          getCardTransform(offset);

        card.style.setProperty(
          "--x",
          `${transform.translateX}px`
        );

        card.style.setProperty(
          "--z",
          `${transform.translateZ}px`
        );

        card.style.setProperty(
          "--r",
          `${transform.rotateY}deg`
        );

        card.style.setProperty(
          "--s",
          transform.scale
        );

        card.style.zIndex =
          String(
            30 -
            transform.distance
          );

        card.style.opacity =
          transform.distance > 2
            ? "0"
            : String(transform.opacity);

        card.style.pointerEvents =
          transform.distance > 2
            ? "none"
            : "auto";

        card.classList.toggle(
          "active",
          index === activeLawyerIndex
        );

        card.setAttribute(
          "aria-hidden",
          transform.distance > 2
            ? "true"
            : "false"
        );

        card.tabIndex =
          transform.distance > 2
            ? -1
            : 0;
      }
    );


    /* 하단 점 활성화 */

    lawyerDots.forEach(
      (dot, index) => {

        const isActive =
          index === activeLawyerIndex;

        dot.classList.toggle(
          "active",
          isActive
        );

        dot.setAttribute(
          "aria-current",
          isActive
            ? "true"
            : "false"
        );
      }
    );


    /* 주요 경력 변경 */

    updateLawyerCareer();
  }


  /* ---------- PREVIOUS ---------- */

  function showPreviousLawyer() {
    if (
      lawyerCards.length === 0
    ) {
      return;
    }

    activeLawyerIndex =
      (
        activeLawyerIndex -
        1 +
        lawyerCards.length
      ) %
      lawyerCards.length;

    renderLawyers();
  }


  /* ---------- NEXT ---------- */

  function showNextLawyer() {
    if (
      lawyerCards.length === 0
    ) {
      return;
    }

    activeLawyerIndex =
      (
        activeLawyerIndex +
        1
      ) %
      lawyerCards.length;

    renderLawyers();
  }


  /* ---------- BUTTON EVENTS ---------- */

  prevButton?.addEventListener(
    "click",
    showPreviousLawyer
  );

  nextButton?.addEventListener(
    "click",
    showNextLawyer
  );


  /* ---------- KEYBOARD ARROWS ---------- */

  const lawyerStage =
    document.querySelector(
      ".lawyer-stage"
    );

  lawyerStage?.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();

        showPreviousLawyer();
      }

      if (
        event.key === "ArrowRight"
      ) {
        event.preventDefault();

        showNextLawyer();
      }
    }
  );


  /* ---------- SWIPE SUPPORT ---------- */

  let touchStartX = 0;
  let touchEndX = 0;

  lawyerStage?.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0]
          .screenX;
    },
    {
      passive: true
    }
  );

  lawyerStage?.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0]
          .screenX;

      const swipeDistance =
        touchEndX -
        touchStartX;

      const minimumSwipe = 45;

      if (
        swipeDistance >
        minimumSwipe
      ) {
        showPreviousLawyer();
      }

      if (
        swipeDistance <
        -minimumSwipe
      ) {
        showNextLawyer();
      }
    },
    {
      passive: true
    }
  );


  /* ---------- RESIZE ---------- */

  let resizeTimer = null;

  window.addEventListener(
    "resize",
    () => {

      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          () => {
            renderLawyers();
          },
          120
        );
    }
  );
    /* ===================================
     JS PART 4
     LAWYER CAREER CHANGE
  =================================== */

  function updateLawyerCareer() {
    const profile =
      lawyerProfiles[
        activeLawyerIndex
      ];

    if (
      !profile ||
      !careerSection
    ) {
      return;
    }

    careerSection.classList.add(
      "changing"
    );

    window.setTimeout(() => {

      if (careerRole) {
        careerRole.textContent =
          profile.role;
      }

      if (careerName) {
        careerName.textContent =
          profile.name;
      }

      if (careerField) {
        careerField.textContent =
          profile.field;
      }

      if (careerList) {
        careerList.innerHTML =
          profile.career
            .map((item) => {
              return `
                <li>
                  ${item}
                </li>
              `;
            })
            .join("");
      }

      careerSection.classList.remove(
        "changing"
      );

    }, 140);
  }


  /* ---------- INITIALIZE LAWYERS ---------- */

  renderLawyers();
    /* ===================================
     JS PART 5
     PRACTICE CENTER CHANGE
  =================================== */

  const centerItems = [
    ...document.querySelectorAll(
      ".center-item"
    )
  ];

  const centerImage =
    document.getElementById(
      "centerImage"
    );

  const centerTitle =
    document.getElementById(
      "centerTitle"
    );

  const centerEnglish =
    document.getElementById(
      "centerEn"
    );


  /* ---------- IMAGE PRELOAD ---------- */

  function preloadCenterImages() {
    centerItems.forEach((item) => {
      const imagePath =
        item.dataset.image;

      if (!imagePath) {
        return;
      }

      const preloadImage =
        new Image();

      preloadImage.src =
        imagePath;
    });
  }


  /* ---------- ACTIVE CENTER ---------- */

  function setActiveCenter(item) {
    centerItems.forEach(
      (centerItem) => {

        centerItem.classList.remove(
          "active"
        );

        centerItem.setAttribute(
          "aria-pressed",
          "false"
        );
      }
    );

    item.classList.add(
      "active"
    );

    item.setAttribute(
      "aria-pressed",
      "true"
    );
  }


  /* ---------- CONTENT CHANGE ---------- */

  function changeCenter(item) {
    if (!item) {
      return;
    }

    const nextImage =
      item.dataset.image || "";

    const nextTitle =
      item.dataset.title || "";

    const nextEnglish =
      item.dataset.en || "";

    setActiveCenter(item);

    if (!centerImage) {
      return;
    }

    centerImage.style.opacity =
      "0";

    centerImage.style.transform =
      "scale(1.025)";

    window.setTimeout(() => {

      centerImage.src =
        nextImage;

      centerImage.alt =
        nextTitle ||
        "전문센터 대표 이미지";

      if (centerTitle) {
        centerTitle.textContent =
          nextTitle;
      }

      if (centerEnglish) {
        centerEnglish.textContent =
          nextEnglish;
      }

      centerImage.style.opacity =
        "1";

      centerImage.style.transform =
        "scale(1)";

    }, 180);
  }


  /* ---------- CENTER EVENTS ---------- */

  centerItems.forEach((item) => {

    item.setAttribute(
      "aria-pressed",
      item.classList.contains("active")
        ? "true"
        : "false"
    );


    item.addEventListener(
      "mouseenter",
      () => {
        changeCenter(item);
      }
    );


    item.addEventListener(
      "click",
      () => {
        changeCenter(item);
      }
    );


    item.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          changeCenter(item);
        }
      }
    );

  });


  /* ---------- INITIALIZE CENTERS ---------- */

  preloadCenterImages();

  const initialCenter =
    centerItems.find((item) =>
      item.classList.contains(
        "active"
      )
    ) ||
    centerItems[0];

  if (initialCenter) {
    changeCenter(
      initialCenter
    );
  }
    /* ===================================
     JS PART 6
     SMOOTH SCROLL + REVEAL
     + FINAL INITIALIZATION
  =================================== */

  /* ---------- SMOOTH ANCHOR LINKS ---------- */

  const anchorLinks = [
    ...document.querySelectorAll(
      'a[href^="#"]'
    )
  ];

  anchorLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const targetSelector =
          link.getAttribute("href");

        if (
          !targetSelector ||
          targetSelector === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetSelector
          );

        if (!target) {
          return;
        }

        event.preventDefault();

        closeMobileMenu();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });


  /* ---------- REVEAL ELEMENTS ---------- */

  const revealElements = [
    ...document.querySelectorAll(
      ".reveal"
    )
  ];


  /* ---------- FALLBACK ---------- */

  function showAllRevealElements() {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "visible"
        );
      }
    );
  }


  /* ---------- INTERSECTION OBSERVER ---------- */

  if (
    "IntersectionObserver" in window
  ) {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.16,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      (element) => {
        revealObserver.observe(
          element
        );
      }
    );

  } else {
    showAllRevealElements();
  }


  /* ---------- IMAGE LOAD FALLBACK ---------- */

  const pageImages = [
    ...document.querySelectorAll("img")
  ];

  pageImages.forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-error"
        );
      }
    );
  });


  /* ---------- CURRENT YEAR ---------- */

  const currentYearElement =
    document.getElementById(
      "currentYear"
    );

  if (currentYearElement) {
    currentYearElement.textContent =
      new Date().getFullYear();
  }


  /* ---------- FINAL HEADER CHECK ---------- */

  updateHeaderState();


  /* ---------- FINAL MENU RESET ---------- */

  if (
    window.innerWidth > 980
  ) {
    closeMobileMenu();
  }


  /* ---------- FINAL LAWYER RENDER ---------- */

  renderLawyers();


  /* ---------- FINAL CENTER STATE ---------- */

  if (initialCenter) {
    setActiveCenter(
      initialCenter
    );
  }

});
/* =========================================
   PHASE 1 — GLOBAL TYPOGRAPHY + HERO
========================================= */

:root {
  --yuil-black: #090a0b;
  --yuil-black-soft: #111214;
  --yuil-ivory: #f4f1eb;
  --yuil-gold: #b99b67;
  --yuil-gold-light: #d5c096;
  --yuil-muted: rgba(255, 255, 255, 0.62);
  --yuil-line: rgba(255, 255, 255, 0.12);
  --yuil-max: 1240px;
  --yuil-ease: cubic-bezier(0.22, 0.8, 0.22, 1);
}

/* 전체 글꼴을 더 젊고 깔끔하게 */
html,
body,
button,
input,
textarea,
select {
  font-family:
    Pretendard,
    "Pretendard Variable",
    "SUIT Variable",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    sans-serif;
}

body {
  margin: 0;
  background: var(--yuil-black);
  color: #fff;
  letter-spacing: -0.015em;
  overflow-x: hidden;
}

/* 모든 주요 콘텐츠가 너무 왼쪽으로 치우치지 않도록 */
.wrap,
.hero-container {
  width: min(calc(100% - 80px), var(--yuil-max));
  margin-inline: auto;
}

/* =========================================
   HERO
========================================= */

.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background: var(--yuil-black);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -2;

  background:
    linear-gradient(
      90deg,
      rgba(7, 8, 9, 0.86) 0%,
      rgba(7, 8, 9, 0.58) 43%,
      rgba(7, 8, 9, 0.22) 100%
    ),
    linear-gradient(
      0deg,
      rgba(7, 8, 9, 0.76) 0%,
      rgba(7, 8, 9, 0.05) 55%
    ),
    url("assets/hero-building.png")
    center center / cover
    no-repeat;

  transform: scale(1.025);
}

/* 사진이 안 보일 경우 경로가 틀린 것이므로
   assets/hero-building.png를 정확히 확인하세요. */

.hero-container {
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding: 130px 0 90px;
}

.hero-content {
  width: min(100%, 620px);
  margin-left: clamp(0px, 5vw, 72px);
}

.hero-label {
  margin: 0 0 24px;
  color: var(--yuil-gold-light);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.24em;
}

.hero-title {
  margin: 0;
  color: #fff;
  font-size: clamp(38px, 4.4vw, 66px);
  font-weight: 400;
  line-height: 1.23;
  letter-spacing: -0.055em;
  word-break: keep-all;
}

.hero-title span {
  display: block;
  margin-bottom: 4px;
  color: var(--yuil-gold-light);
  font-weight: 500;
}

.hero-description {
  margin: 30px 0 0;
  color: rgba(255, 255, 255, 0.64);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.9;
  word-break: keep-all;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 38px;
}

.hero-cta,
.hero-more {
  min-height: 50px;
  padding: 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  font-size: 12px;
  font-weight: 500;
  transition:
    transform 0.3s var(--yuil-ease),
    background 0.3s ease,
    border-color 0.3s ease;
}

/* 고급스러운 골드 상담 버튼 */
.hero-cta {
  min-width: 158px;
  background:
    linear-gradient(
      135deg,
      #c7ad7a 0%,
      #aa8954 100%
    );
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #101010;
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.hero-cta:hover {
  transform: translateY(-2px);
  background:
    linear-gradient(
      135deg,
      #d2bd92 0%,
      #b4935d 100%
    );
}

.hero-more {
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.025);
  color: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(8px);
}

.hero-more:hover {
  transform: translateY(-2px);
  border-color: var(--yuil-gold);
}

/* 태블릿 */
@media (max-width: 980px) {
  .wrap,
  .hero-container {
    width: min(calc(100% - 48px), var(--yuil-max));
  }

  .hero-content {
    margin-left: 3vw;
  }

  .hero-title {
    font-size: clamp(38px, 7vw, 58px);
  }
}

/* 모바일 */
@media (max-width: 640px) {
  .wrap,
  .hero-container {
    width: calc(100% - 32px);
  }

  .hero {
    min-height: 90svh;
  }

  .hero-bg {
    background:
      linear-gradient(
        90deg,
        rgba(7, 8, 9, 0.82) 0%,
        rgba(7, 8, 9, 0.42) 62%,
        rgba(7, 8, 9, 0.18) 100%
      ),
      linear-gradient(
        0deg,
        rgba(7, 8, 9, 0.92) 0%,
        rgba(7, 8, 9, 0.08) 56%
      ),
      url("assets/hero-building.png")
      58% center / cover
      no-repeat;
  }

  .hero-container {
    min-height: 90svh;
    align-items: flex-end;
    padding: 110px 0 64px;
  }

  .hero-content {
    margin-left: 0;
  }

  .hero-label {
    margin-bottom: 17px;
    font-size: 9px;
  }

  .hero-title {
    font-size: 39px;
    line-height: 1.22;
  }

  .hero-description {
    margin-top: 22px;
    font-size: 12px;
    line-height: 1.8;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
    margin-top: 30px;
  }

  .hero-cta,
  .hero-more {
    width: 100%;
    justify-content: space-between;
  }
}
