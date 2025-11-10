# 불공정 약관 분석기 - 프로젝트 구조

## 완성된 파일 목록

### 공통 컴포넌트
- `/src/components/common/Header.jsx` - 헤더 컴포넌트
- `/src/components/common/Footer.jsx` - 푸터 컴포넌트
- `/src/styles/common/header.css` - 헤더 스타일
- `/src/styles/common/footer.css` - 푸터 스타일

### Home 페이지 컴포넌트
- `/src/pages/Home.jsx` - 메인 페이지 (상태 관리 및 API 호출)
- `/src/components/home/TermsInput.jsx` - 약관 입력 컴포넌트
- `/src/components/home/AnalysisResult.jsx` - 분석 결과 컨테이너
- `/src/components/home/ResultSummary.jsx` - 분석 요약 표시
- `/src/components/home/UnfairClauses.jsx` - 불공정 조항 상세 표시
- `/src/styles/home/termsInput.css` - 입력 컴포넌트 스타일
- `/src/styles/home/analysisResult.css` - 결과 컨테이너 스타일
- `/src/styles/home/resultSummary.css` - 요약 스타일
- `/src/styles/home/unfairClauses.css` - 불공정 조항 스타일

### API 및 데이터
- `/src/api/termsAnalysis.js` - API 호출 로직 (더미/실제 서버 전환 가능)
- `/src/mock/dummyData.js` - 샘플 약관 및 분석 결과 데이터

### 메인 파일
- `/src/App.jsx` - 앱 루트 컴포넌트 (Header, Footer, Home 조합)
- `/src/App.css` - 앱 레이아웃 스타일
- `/src/index.css` - 글로벌 스타일
- `/src/main.jsx` - 앱 진입점

## 실행 방법

```bash
# 개발 서버 시작
npm run dev

# 빌드
npm run build

# 빌드된 파일 미리보기
npm run preview
```

## 주요 기능

1. **약관 입력**
   - 텍스트 직접 입력
   - 파일 업로드 (TXT, PDF, DOC, DOCX)
   - 샘플 약관 불러오기 버튼

2. **분석 결과**
   - 약관 요약 (전체 조항 수, 불공정 조항 수, 위험도)
   - 불공정 조항 상세 정보
   - 법적 문제점 및 관련 법령
   - 개선 권고사항

3. **상태 관리**
   - 로딩 상태 표시
   - 에러 핸들링
   - 분석 결과 표시

## API 연결 방법

`/src/api/termsAnalysis.js` 파일에서:

1. 현재 더미 데이터를 사용하는 부분 제거
2. 주석 처리된 API 호출 코드의 주석 해제
3. `YOUR_API_ENDPOINT`를 실제 백엔드 엔드포인트로 변경

```javascript
// 변경 전 (더미)
return new Promise((resolve) => {
  setTimeout(() => {
    resolve(sampleAnalysisResult);
  }, 1500);
});

// 변경 후 (실제 API)
const response = await fetch('https://api.example.com/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ terms: termsText }),
});
```

## 컴포넌트 구조

```
App
├── Header (공통)
├── Home (페이지)
│   ├── TermsInput
│   │   ├── 텍스트 입력 탭
│   │   └── 파일 업로드 탭
│   └── AnalysisResult
│       ├── ResultSummary
│       └── UnfairClauses
└── Footer (공통)
```

## 반응형 디자인

모든 컴포넌트는 모바일 화면(768px 이하)을 지원합니다.

## 접근성 고려사항

- 시맨틱 HTML 태그 사용
- 적절한 label과 input 연결
- 키보드 네비게이션 지원
- 충분한 색상 대비

## 성능 최적화

- 컴포넌트별 CSS 분리로 번들 크기 최적화
- React.memo 적용 가능 (필요시)
- 파일 업로드 시 비동기 처리
