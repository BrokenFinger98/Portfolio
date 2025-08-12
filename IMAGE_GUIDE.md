# 🖼️ 포트폴리오 이미지 가이드

## 📁 폴더 구조

```
public/
├── images/
│   ├── projects/
│   │   ├── aicheck/           # AI 금융 사기 탐지 프로젝트
│   │   ├── ceonsun/           # 개발자 과외 매칭 플랫폼
│   │   ├── contract4k/        # Kotlin DSL 라이브러리
│   │   └── zipda/             # 부동산 검색 플랫폼
│   ├── profile/
│   └── icons/
└── documents/
    └── resume.pdf             # 이력서 PDF 파일
```

## 📋 추천 이미지 목록

### 🏦 aicheck 프로젝트
```
public/images/projects/aicheck/
├── architecture.png          # MSA 시스템 아키텍처 다이어그램
├── dashboard.png             # 관리자 대시보드 스크린샷
├── mobile-app.png            # 모바일 앱 화면
├── ai-detection.gif          # AI 사기 탐지 데모 영상
├── performance-chart.png     # 성능 개선 전후 비교 차트
└── kafka-flow.png           # Kafka 이벤트 처리 플로우
```

### 👨‍🏫 ceonsun 프로젝트
```
public/images/projects/ceonsun/
├── architecture.png          # 마이크로서비스 아키텍처
├── coupon-system.gif         # 선착순 쿠폰 발급 시스템 데모
├── matching-flow.png         # 과외 매칭 플로우
├── redis-performance.png     # Redis 분산락 성능 비교
└── user-interface.png        # 사용자 인터페이스
```

### 📚 contract4k 프로젝트
```
public/images/projects/contract4k/
├── dsl-example.png          # Kotlin DSL 코드 예시
├── usage-demo.gif           # 라이브러리 사용법 데모
├── jitpack-badge.png        # JitPack 배포 뱃지
└── aspectj-flow.png         # AspectJ 처리 플로우
```

### 🏠 zipda 프로젝트
```
public/images/projects/zipda/
├── search-demo.gif          # 매물 검색 데모
├── chatbot.png              # AI 챗봇 화면
├── querydsl-performance.png # QueryDSL 성능 최적화 결과
└── oauth-flow.png           # OAuth 로그인 플로우
```

### 👤 프로필 이미지
```
public/images/profile/
├── profile-photo.jpg        # 프로필 사진 (정사각형, 500x500px 권장)
├── background.jpg           # Hero Section 배경 (선택사항)
└── resume-thumbnail.png     # 이력서 썸네일
```

### 🔧 기술 스택 아이콘
```
public/images/icons/tech-stack/
├── spring-boot.svg
├── kotlin.svg
├── java.svg
├── kafka.svg
├── redis.svg
├── mysql.svg
├── docker.svg
└── jenkins.svg
```

## 📏 이미지 권장 사양

### 📊 프로젝트 이미지
- **아키텍처 다이어그램**: 1200x800px, PNG/SVG
- **스크린샷**: 1920x1080px, PNG
- **데모 GIF**: 최대 10MB, 720p, 10-30초
- **차트/그래프**: 800x600px, PNG

### 👤 프로필 이미지
- **프로필 사진**: 500x500px, JPG (1:1 비율)
- **배경 이미지**: 1920x1080px, JPG

### 🎯 최적화 팁
- PNG: 투명 배경이 필요한 로고, 다이어그램
- JPG: 사진, 스크린샷
- SVG: 아이콘, 심플한 그래픽
- GIF: 동작 데모 (파일 크기 10MB 이하)

## 🚀 이미지 추가 후 코드 업데이트

이미지를 추가한 후 다음 명령어를 실행하세요:
\`\`\`bash
# 개발 서버 재시작
npm run dev
\`\`\`

이미지 경로는 다음과 같이 사용됩니다:
\`\`\`jsx
// 예시: aicheck 프로젝트 아키텍처 이미지
<img src="/images/projects/aicheck/architecture.png" alt="Architecture" />
\`\`\`

## 📝 추가 도움이 필요하시면...

이미지를 추가하신 후 "이미지를 추가했어" 라고 말씀해 주시면:
1. 자동으로 이미지를 포트폴리오에 연동
2. 반응형 이미지 컴포넌트 생성
3. Lazy loading 및 최적화 적용
4. 프로젝트별 이미지 갤러리 구성

을 진행해드리겠습니다!