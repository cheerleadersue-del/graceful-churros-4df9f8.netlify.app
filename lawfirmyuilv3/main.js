/* =====================================================================
   법무법인 유일 — LAW FIRM YUIL
   main.js

   - 헤더 상태 · 현재 섹션 표시
   - 모바일 메뉴
   - 변호사 · 해결 사례 카드 렌더링
===================================================================== */

(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const prefersReducedMotion =
    matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ===================================================================
     데이터

     ⚠ 사진 파일과 변호사 성명의 짝은 시안만으로는 확정할 수 없어
        성별·인상만 보고 임시로 배정했다. 실제 사진으로 반드시 확인할 것.
  =================================================================== */

  const attorneys = [
    {
      name: "심상한",
      title: "변호사",
      field: "기업 회생 · 파산 전문",
      image: "assets/lawyer-05.webp",
      careers: [
        "사법시험 49회 합격",
        "前 법무법인 세명 구성원",
        "前 서울지방노동위원회 공익위원 (심판담당)",
        "25년 이상 경력"
      ]
    },
    {
      name: "정주현",
      title: "변호사",
      field: "부동산 · 민사 · 형사 전문",
      image: "assets/lawyer-02.webp",
      careers: [
        "사법연수원 30기 수료",
        "前 서울중앙지방법원 조정위원",
        "부동산 · 민사 분야 전문",
        "형사사건 다수 수행"
      ]
    },
    {
      name: "김제도",
      title: "변호사",
      field: "형사사건 전문",
      image: "assets/lawyer-04.webp",
      careers: [
        "사법연수원 47기 수료",
        "마약류관리법, 사기, 폭행, 상해, 도주치상 등 다수 수행",
        "형사사건 전문"
      ]
    },
    {
      name: "이경숙",
      title: "변호사",
      field: "이혼 · 상속 · 부동산 · 형사 전문",
      image: "assets/lawyer-06.webp",
      careers: [
        "사법시험 50회 합격",
        "대한변협 전문분야 등록",
        "이혼 · 상속 사건 다수 수행",
        "형사사건 전문"
      ]
    }
  ];

  /*
    해결 사례 — 대한변협 변호사광고규정상 승소율·성공률 같은 수치나
    특정 결과를 단정하는 표현은 쓸 수 없다. 그래서 결과가 아니라
    "어떤 상황에서 무엇을 하는가" 만 적는다.
  */
  const cases = [
    {
      tag: "마약사건",
      situation: "단순 투약으로 조사 통보를 받은 경우",
      response:
        "모발·소변 감정 결과의 의미와 한계를 검토하고, 초기 진술의 방향과 " +
        "치료·재활 계획을 함께 준비합니다."
    },
    {
      tag: "압수수색",
      situation: "휴대폰과 계좌가 압수된 경우",
      response:
        "압수 범위의 적법성을 확인하고, 텔레그램·계좌 기록이 실제로 무엇을 " +
        "증명하는지 포렌식 관점에서 분석합니다."
    },
    {
      tag: "구속영장",
      situation: "영장실질심사를 앞둔 경우",
      response:
        "도주·증거인멸 우려를 다투는 자료를 정리하고, 심문 당일 진술 내용을 " +
        "함께 준비합니다."
    },
    {
      tag: "고소 · 고발",
      situation: "고소를 당했거나 고소를 준비하는 경우",
      response:
        "사실관계와 증거를 먼저 정리해 무엇이 증명되고 무엇이 증명되지 않는지 " +
        "가린 뒤 대응 순서를 정합니다."
    }
  ];


  /* ===================================================================
     변호사 카드
  =================================================================== */

  const attorneyGrid = $("#attorneyGrid");

  if (attorneyGrid) {
    attorneyGrid.replaceChildren(...attorneys.map((person) => {
      const li = document.createElement("li");
      li.className = "attorney-card";

      const photo = document.createElement("div");
      photo.className = "attorney-photo";

      const img = document.createElement("img");
      img.src = person.image;
      img.alt = `${person.name} ${person.title}`;
      img.loading = "lazy";
      photo.append(img);

      const body = document.createElement("div");
      body.className = "attorney-body";

      const name = document.createElement("h3");
      name.className = "attorney-name";
      name.append(document.createTextNode(person.name));
      const title = document.createElement("small");
      title.textContent = person.title;
      name.append(title);

      const field = document.createElement("p");
      field.className = "attorney-field";
      field.textContent = person.field;

      const careers = document.createElement("ul");
      careers.className = "attorney-career";
      careers.append(...person.careers.map((career) => {
        const item = document.createElement("li");
        item.textContent = career;
        return item;
      }));

      body.append(name, field, careers);
      li.append(photo, body);
      return li;
    }));
  }


  /* ===================================================================
     해결 사례 카드
  =================================================================== */

  const caseList = $("#caseList");

  if (caseList) {
    caseList.replaceChildren(...cases.map((item) => {
      const li = document.createElement("li");
      li.className = "case-card";

      const tag = document.createElement("span");
      tag.className = "case-tag";
      tag.textContent = item.tag;

      const situation = document.createElement("h3");
      situation.className = "case-situation";
      situation.textContent = item.situation;

      const response = document.createElement("p");
      response.className = "case-response";
      const label = document.createElement("strong");
      label.textContent = "이렇게 대응합니다";
      response.append(label, document.createTextNode(item.response));

      li.append(tag, situation, response);
      return li;
    }));
  }


  /* ===================================================================
     모바일 메뉴
  =================================================================== */

  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("is-locked", open);

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");

    /* 닫힌 메뉴는 포커스와 스크린리더 양쪽에서 완전히 제외한다 */
    mobileMenu.toggleAttribute("inert", !open);

    /* visibility 전환 직후에는 focus() 가 먹지 않아 다음 프레임까지 기다린다 */
    if (open) {
      requestAnimationFrame(() => $("a", mobileMenu)?.focus());
    }
  };

  menuToggle?.addEventListener("click", () => {
    setMenu(!mobileMenu.classList.contains("is-open"));
  });

  $$("a", mobileMenu).forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
      setMenu(false);
      menuToggle?.focus();
    }
  });


  /* ===================================================================
     헤더 상태 · 현재 섹션
  =================================================================== */

  const header = $("#header");
  const navLinks = $$(".nav a");

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const id = visible[0].target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
        });
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    });
  };

  addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  /* ===================================================================
     부드러운 앵커 이동
  =================================================================== */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      setMenu(false);

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });


  /* ===================================================================
     초기화
  =================================================================== */

  const year = $("#currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
