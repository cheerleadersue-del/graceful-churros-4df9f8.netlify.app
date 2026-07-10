const header=document.getElementById('siteHeader');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));

const lawyers=[
 {name:'정호길',role:'대표변호사',field:'형사 · 수사 및 재판 대응',image:'assets/lawyers/01-jeong-hogil.jpg',career:['법무법인 유일 대표변호사','25년 경력 형사전문 변호사','중대 형사사건 수사·재판 전략 총괄','수사 초기 진술 및 증거 대응','구속영장·압수수색 대응','다수 형사재판 및 항소심 수행']},
 {name:'김제도',role:'변호사',field:'형사 · 기업분쟁',image:'assets/lawyers/02-kim-jedo.png',career:['법무법인 유일 변호사','경제범죄 및 재산범죄 사건 수행','기업 관련 민·형사 분쟁 담당','고소·고발 사건 대리','금융 및 계좌자료 분석','주요 경력 추가 입력']},
 {name:'정주현',role:'변호사',field:'민사 · 손해배상',image:'assets/lawyers/03-jeong-juhyeon.png',career:['법무법인 유일 변호사','민사 및 손해배상 사건 수행','부동산·임대차 분쟁 담당','계약 및 채권 분쟁 대응','사실관계와 증거자료 검토','주요 경력 추가 입력']},
 {name:'심상한',role:'변호사',field:'형사 · 기업법무',image:'assets/lawyers/04-sim-sanghan.png',career:['법무법인 유일 변호사','형사사건 수사 및 재판 대응','기업 법률자문 및 계약 검토','경제범죄 사건 변론','고소대리 및 피해자 대응','주요 경력 추가 입력']},
 {name:'이경숙',role:'변호사',field:'가사 · 민사',image:'assets/lawyers/05-lee-gyeongsuk.png',career:['법무법인 유일 변호사','이혼·재산분할 사건 수행','상속·유류분 분쟁 담당','양육권·친권 사건 수행','민사 손해배상 사건 대리','주요 경력 추가 입력']},
 {name:'성명 입력',role:'파트너 변호사',field:'형사 · 공공기관 자문',image:'assets/lawyers/06-partner.jpg',career:['제11회 변호사시험 합격','고려대학교 법학과 졸업','전 법무법인 승우 변호사','현 법무법인 유일 파트너 변호사','서울시 의회 등 공공기관 법률자문 다수 수행','형사사건 다수 수행']}
];
let active=0;
const stage=document.getElementById('lawyerStage');
const dots=document.getElementById('lawyerDots');
const career=document.getElementById('lawyerCareer');
const cRole=document.getElementById('careerRole');
const cName=document.getElementById('careerName');
const cField=document.getElementById('careerField');
const cList=document.getElementById('careerList');

lawyers.forEach((l,i)=>{
 const card=document.createElement('article');card.className='lawyer-card';card.dataset.index=i;
 card.innerHTML=`<img src="${l.image}" alt="${l.name} ${l.role}"><div class="lawyer-card-info"><span>${l.role}</span><h3>${l.name}</h3></div>`;
 card.addEventListener('click',()=>{active=i;renderLawyers()});stage.appendChild(card);
 const dot=document.createElement('button');dot.className='carousel-dot';dot.type='button';dot.setAttribute('aria-label',`${i+1}번째 변호사`);dot.addEventListener('click',()=>{active=i;renderLawyers()});dots.appendChild(dot);
});
function offsetFor(i){let d=i-active;if(d>lawyers.length/2)d-=lawyers.length;if(d<-lawyers.length/2)d+=lawyers.length;return d}
function renderLawyers(){
 const mobile=innerWidth<=640;const step=mobile?112:205;
 [...stage.children].forEach((card,i)=>{const d=offsetFor(i),a=Math.abs(d);let x=d*step,scale=a===0?1:a===1?.84:.72,y=a===0?0:a===1?36:60,rot=d===0?0:d<0?2.5:-2.5;
 card.style.transform=`translateX(calc(-50% + ${x}px)) translateY(${y}px) scale(${scale}) rotateY(${rot}deg)`;
 card.style.zIndex=20-a;card.style.opacity=a>2?'0':a===0?'1':a===1?'.64':'.34';card.style.filter=a===0?'none':'grayscale(1) brightness(.62)';card.style.pointerEvents=a>2?'none':'auto';card.classList.toggle('active',i===active)});
 [...dots.children].forEach((d,i)=>d.classList.toggle('active',i===active));
 const p=lawyers[active];career.classList.add('changing');setTimeout(()=>{cRole.textContent=p.role;cName.textContent=p.name;cField.textContent=p.field;cList.innerHTML=p.career.map(v=>`<li>${v}</li>`).join('');career.classList.remove('changing')},130)
}
document.getElementById('lawyerPrev').onclick=()=>{active=(active-1+lawyers.length)%lawyers.length;renderLawyers()};
document.getElementById('lawyerNext').onclick=()=>{active=(active+1)%lawyers.length;renderLawyers()};
addEventListener('resize',renderLawyers);renderLawyers();

const centers=[
 {title:'형사센터',en:'CRIMINAL DEFENSE',image:'assets/centers/criminal.png'},
 {title:'민사센터',en:'CIVIL LITIGATION',image:'assets/centers/civil.jpg'},
 {title:'가사센터',en:'FAMILY LAW',image:'assets/centers/family.png'},
 {title:'회생센터',en:'REHABILITATION',image:'assets/centers/rehabilitation.png'},
 {title:'공증센터',en:'NOTARIZATION',image:'assets/centers/notary.png'}
];
const centerList=document.getElementById('centerList'),centerImage=document.getElementById('centerImage'),centerTitle=document.getElementById('centerTitle'),centerEnglish=document.getElementById('centerEnglish');
function chooseCenter(i){[...centerList.children].forEach((el,n)=>el.classList.toggle('active',n===i));centerImage.style.opacity='0';centerImage.style.transform='scale(1.025)';setTimeout(()=>{const c=centers[i];centerImage.src=c.image;centerImage.alt=c.title;centerTitle.textContent=c.title;centerEnglish.textContent=`${c.en} CENTER`;centerImage.style.opacity='1';centerImage.style.transform='scale(1)'},170)}
centers.forEach((c,i)=>{const row=document.createElement('div');row.className='center-item'+(i===0?' active':'');row.innerHTML=`<span class="num">0${i+1}</span><span class="name">${c.title}<small class="en">${c.en}</small></span><span class="arrow">→</span>`;row.addEventListener('mouseenter',()=>chooseCenter(i));row.addEventListener('click',()=>chooseCenter(i));centerList.appendChild(row)});
