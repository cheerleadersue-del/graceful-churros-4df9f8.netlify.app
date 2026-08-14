# 법무법인 유일 — LAW FIRM YUIL

정적 웹사이트(HTML · CSS · JavaScript). 빌드 도구 없이 파일 그대로 배포합니다.

```
index.html      마크업
style.css       스타일 (반응형)
main.js         모바일 메뉴 · 변호사/사례 카드 렌더링 · 현재 섹션 표시
assets/         이미지(WebP) · SVG
netlify.toml    Netlify 캐시 · 보안 헤더
robots.txt
```

## 로컬에서 보기

```bash
npx http-server . -p 8080
# http://localhost:8080
```

## 배포

Netlify에 저장소를 연결하면 됩니다. 빌드 명령 없이 `publish = "."` 입니다.
zip을 [app.netlify.com/drop](https://app.netlify.com/drop) 에 끌어다 놓아도 즉시 배포됩니다.

---

## 디자인

시안(다크 + 골드, 형사·마약 전문 포지셔닝)에 맞춰 구성했습니다.

- **헤더** — 골드 모노그램 + 상단 고정, 스크롤 시 축소·블러
- **히어로** — 좌측 카피 / 우측 흑백 비주얼, 골드 CTA + 아웃라인 카카오 버튼
- **대표변호사** — 좌측 인물 / 우측 경력 6항목(아이콘), 검정 상담 버튼
- **전문가 4인** — 흑백 사진 + 크림 카드, 경력 불릿
- **WHY YUIL** — 01~04 번호 + 아이콘 + 세로 구분선
- **해결 사례** — "상황 → 대응" 4카드
- **상담 · 푸터** — 다크 톤 마감

색: `#111111` 다크 / `#f5f2ed` 크림 / `#b8985a` 골드

### 모바일

- 620px 이하에서 햄버거 → 전체화면 메뉴
- 히어로 비주얼이 텍스트 뒤로 깔리고 상하 그라데이션으로 가독성 확보
- 전문가 카드는 **사진 좌측 · 정보 우측 가로형**으로 전환
- WHY YUIL은 번호 + 텍스트 세로 목록으로 전환
- **하단 고정 상담 바**, `env(safe-area-inset-bottom)` 대응

### 검증 결과

| 항목 | 결과 |
|---|---|
| 뷰포트 5종(360~1440px) 가로 넘침 | 0건 |
| JS 에러 | 0건 |
| 로컬 리소스 누락 | 0건 |
| 36px 미만 터치 대상 | 0건 (데스크톱 내비 28px — WCAG 최소 24px 충족) |

---

## ⚠️ 배포 전 반드시 확인할 것

### 1. 변호사 사진과 성명의 짝

시안만으로는 어느 사진이 누구인지 확정할 수 없어 **성별·인상만 보고 임시 배정**했습니다.
`main.js` 의 `attorneys` 배열에서 각 `image` 값을 실제 인물과 대조해 주세요.

| 성명 | 현재 배정된 파일 |
|---|---|
| 심상한 | `assets/lawyer-05.webp` |
| 정주현 | `assets/lawyer-02.webp` |
| 김제도 | `assets/lawyer-04.webp` |
| 이경숙 | `assets/lawyer-06.webp` |

대표변호사 정호길은 `assets/lawyer-01.webp` (`index.html` 의 `.lead-photo`).

### 2. 히어로 비주얼

시안 우측의 인물 사진을 받지 못해 **도심 야경을 고대비 흑백으로 처리해 대체**했습니다
(`assets/hero-visual.webp`). 시안의 이미지가 있으면 같은 파일명으로 교체하면 됩니다.

### 3. 변호사 광고규정

대한변협 변호사광고규정상 **승소율·성공률 등 수치 표기와 특정 결과를 단정하는 표현은
사용할 수 없습니다.** 그래서 "해결 사례" 섹션은 결과가 아니라
**"어떤 상황에서 무엇을 하는가"** 만 기술했습니다.

실제 사례를 추가하실 때도 의뢰인이 특정되지 않도록 하고, 결과를 약속하는 표현은 피해 주세요.
푸터의 면책 문구(`.footer-disclaimer`)도 함께 검토하시기 바랍니다.

### 4. 자리표시자

- **전화번호** `032.000.0000` — `index.html` (헤더·히어로·대표변호사·상담·푸터·모바일 바·JSON-LD)
- **주소** `인천광역시 ○○구 ○○로 00` — `index.html`, JSON-LD
- **카카오 채널 주소** `https://pf.kakao.com/` — 실제 채널 URL
- **개인정보처리방침** 링크 — 현재 `#`
- **상담시간** 평일 09:00–18:00 — 실제 운영시간 확인
- 시안의 **"광수대 마약반 형사 출신"** 문구 — 사실 확인 후 사용하세요.
  경력 사칭은 광고규정 위반을 넘어 형사 문제가 될 수 있습니다.

---

## 내용 수정하기

변호사 목록과 해결 사례는 `main.js` 상단의 배열에서 관리합니다.

```js
const attorneys = [
  { name, title, field, image, careers: [] },
  ...
];

const cases = [
  { tag, situation, response },
  ...
];
```

대표변호사 정보와 WHY YUIL 4항목은 `index.html` 에 직접 적혀 있습니다.

## 이미지 다시 만들기

```bash
pip install Pillow
python3 - <<'PY'
from PIL import Image
import os
SRC = "원본폴더"
for f in os.listdir(SRC):
    if not f.endswith(".png"): continue
    im = Image.open(os.path.join(SRC, f))
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    im.save("assets/" + f[:-4] + ".webp", "WEBP", quality=82, method=6)
PY
```

히어로 비주얼의 흑백 처리:

```python
from PIL import Image, ImageEnhance, ImageOps
im = ImageOps.grayscale(Image.open("원본.png").convert("RGB"))
im = ImageEnhance.Contrast(im).enhance(1.45)
im = ImageEnhance.Brightness(im).enhance(0.80)
im.convert("RGB").save("assets/hero-visual.webp", "WEBP", quality=84, method=6)
```

## 참고

- 폰트는 CDN(Pretendard)에서 불러옵니다. 네트워크가 막히면 시스템 한글 폰트로 대체됩니다.
- WebP는 Safari 14+ 를 포함한 모든 최신 브라우저에서 지원됩니다.
- 한글 제목은 `line-height` 를 1.12 아래로 내리지 않습니다. 그 아래에서는 획이 겹칩니다.
- `<br>` 을 모바일에서 숨길 때는 **`<br>` 앞에 공백을 둡니다.** 그러지 않으면
  단어가 붙어 "대표변호사직접 총괄" 처럼 보입니다.
