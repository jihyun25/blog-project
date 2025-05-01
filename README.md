# 📝 React Firebase Blog

Firebase 기반 인증, 데이터베이스, 배포를 활용한 개인 블로그 프로젝트입니다.  
React를 이용한 SPA 구조로, 사용자 친화적인 글 작성 및 관리 기능을 제공합니다.

<br />

## 🚀 배포 링크

🔗 [https://codiary25.web.app](https://codiary25.web.app)

<br />

## 🛠 사용 기술

- **프론트엔드**: HTML, CSS, JavaScript, React (Hooks, Context API)
- **백엔드/데이터베이스**: Firebase (Authentication, Firestore)
- **배포**: Firebase Hosting 배포 (.env 설정)
- **기타 도구**: Git, VSCode

<br />

## ✨ 주요 기능

- 🔐 사용자 회원가입 / 로그인 (Firebase Authentication)
- 📝 게시글 CRUD (Firestore 연동)
- 💬 실시간 댓글 기능 (Subcollection 구조)
- 🌗 다크모드 (Context API + CSS 변수)
- 🚀 Firebase Hosting으로 배포
- 📱 반응형 웹 디자인

<br />

## 💡 프로젝트 소개

React와 Firebase를 기반으로 한 블로그 프로젝트로,  
프론트엔드 개발자로서 인증, CRUD, 배포까지 전반적인 흐름을 직접 구현해 보았습니다.  
단순한 디자인보다 기능 구현과 구조화에 집중했습니다.

<br />

## 📝 핵심 구현 포인트

- Firebase Authentication을 활용한 사용자 인증 처리
- Firestore에 게시글 데이터 저장 및 실시간 동기화
- React Router를 이용한 SPA 방식 페이지 전환
- 컴포넌트 재사용성과 상태 관리 구조화
- Firebase Hosting을 통한 배포 및 실서비스 구축 경험

<br />

## 📁 폴더 구조

```bash
src/
├── assets/
├── components/      # 재사용 가능한 UI 컴포넌트
├── context/         # Context API 폴더
├── pages/           # 라우팅되는 주요 페이지
├── styles/          # 스타일 폴더
├── types/           # 타입 폴더
├── App.tsx
├── firebaseApp.ts
└── index.tsx
```
