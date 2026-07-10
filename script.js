document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     HEADER
  ========================= */

  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  });

  /* =========================
     변호사 카드
  ========================= */

  const cards = [...document.querySelectorAll(".lawyer-card")];

  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const dotsContainer = document.getElementById("dots");

  const careerSection = document.getElementById("career");
  const careerRole = document.getElementById("careerRole");
  const careerName = document.getElementById("careerName");
  const careerField = document.getElementById("careerField");
  const careerList = document.getElementById("careerList");

  let activeIndex = 0;

  /*
    index.html의 변호사 카드 순서와
    아래 profiles 순서를 동일하게 유지해야 합니다.
  */

  const profiles = [
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

  /* 하단 점 만들기 */

  if (dotsContainer && cards.length > 0) {
    cards.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute(
        "aria-label",
        `${index + 1}번째 변호사 보기`
      );

      dot.addEventListener("click", () => {
        activeIndex = index;
        renderLawyers();
      });

      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer
    ? [...dotsContainer.children]
    : [];

  /*
    현재 카드와 다른 카드 사이의 거리를 계산합니다.
    마지막 카드 다음에 첫 카드가 자연스럽게 연결됩니다.
  */

  function getCardOffset(index) {
    let difference = index - activeIndex;

    if (difference > cards.length / 2) {
      difference -= cards.length;
    }

    if (difference < -cards.length / 2) {
      difference += cards.length;
    }

    return difference;
  }

  /* 선택된 변호사의 주요 경력 변경 */

  function updateCareer() {
    const profile = profiles[activeIndex];

    if (!profile || !careerSection) {
      return;
    }

    careerSection.classList.add("changing");

    window.setTimeout(() => {
      if (careerRole) {
        careerRole.textContent = profile.role;
      }

      if (careerName) {
        careerName.textContent = profile.name;
      }

      if (careerField) {
        careerField.textContent = profile.field;
      }

      if (careerList) {
        careerList.innerHTML = profile.career
          .map((careerItem) => {
            return `<li>${careerItem}</li>`;
          })
          .join("");
      }

      careerSection.classList.remove("changing");
    }, 140);
  }

  /* 변호사 카드 위치 변경 */

  function renderLawyers() {
    if (cards.length === 0) {
      return;
    }

    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth <= 900;

    const horizontalStep = isMobile
      ? 112
      : isTablet
        ? 185
        : 225;

    cards.forEach((card, index) => {
      const offset = getCardOffset(index);
      const distance = Math.abs(offset);

      const translateX = offset * horizontalStep;

      const translateZ =
        distance === 0
          ? 130
          : distance === 1
            ? 15
            : -110;

      const rotateY =
        offset === 0
          ? 0
          : offset < 0
            ? 7
            : -7;

      const scale =
        distance === 0
          ? 1
          : distance === 1
            ? 0.86
            : 0.76;

      card.style.setProperty(
        "--x",
        `${translateX}px`
      );

      card.style.setProperty(
        "--z",
        `${translateZ}px`
      );

      card.style.setProperty(
        "--r",
        `${rotateY}deg`
      );

      card.style.setProperty(
        "--s",
        scale
      );

      card.style.zIndex = String(20 - distance);

      card.style.opacity =
        distance > 2 ? "0" : "";

      card.style.pointerEvents =
        distance > 2 ? "none" : "auto";

      card.classList.toggle(
        "active",
        index === activeIndex
      );
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === activeIndex
      );
    });

    updateCareer();
  }

  /* 이전 버튼 */

  prevButton?.addEventListener("click", () => {
    activeIndex =
      (activeIndex - 1 + cards.length) %
      cards.length;

    renderLawyers();
  });

  /* 다음 버튼 */

  nextButton?.addEventListener("click", () => {
    activeIndex =
      (activeIndex + 1) %
      cards.length;

    renderLawyers();
  });

  /* 카드를 직접 클릭 */

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      activeIndex = index;
      renderLawyers();
    });
  });

  window.addEventListener(
    "resize",
    renderLawyers
  );

  renderLawyers();

  /* =========================
     전문센터
  ========================= */

  const centerItems = [
    ...document.querySelectorAll(".center-item")
  ];

  const centerImage =
    document.getElementById("centerImage");

  const centerTitle =
    document.getElementById("centerTitle");

  const centerEnglish =
    document.getElementById("centerEn");

  function changeCenter(item) {
    centerItems.forEach((centerItem) => {
      centerItem.classList.remove("active");
    });

    item.classList.add("active");

    if (!centerImage) {
      return;
    }

    centerImage.style.opacity = "0";
    centerImage.style.transform =
      "scale(1.025)";

    window.setTimeout(() => {
      centerImage.src =
        item.dataset.image || "";

      centerImage.alt =
        item.dataset.title || "전문센터";

      if (centerTitle) {
        centerTitle.textContent =
          item.dataset.title || "";
      }

      if (centerEnglish) {
        centerEnglish.textContent =
          item.dataset.en || "";
      }

      centerImage.style.opacity = "1";
      centerImage.style.transform =
        "scale(1)";
    }, 180);
  }

  centerItems.forEach((item) => {
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
  });

  /* =========================
     내부 링크 부드러운 이동
  ========================= */

  const anchorLinks = [
    ...document.querySelectorAll(
      'a[href^="#"]'
    )
  ];

  anchorLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const selector =
          link.getAttribute("href");

        if (
          !selector ||
          selector === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(selector);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    );
  });
});
