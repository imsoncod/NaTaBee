[![Build Status](https://travis-ci.com/imsoncod/NaTaBee.svg?branch=master)](https://travis-ci.com/imsoncod/NaTaBee)

# Intensive-Capstone-Design

  2020-2학기 심화 캡스톤디자인 프로젝트

<br>

## 프로젝트 명칭

인하공업전문대학 도우미 카카오 챗봇 - NaTaBee

<br>

## 프로젝트 목적

* 타 홍보 매체(블로그, 페이스북, 유튜브)와 더불어 ‘인하공업전문대학’을 많은 사람들에게 홍보하여 브랜드가치를 상승시킨다.

* 대중들에게 익숙한 ‘카카오톡’을 통해 접근함으로써 누구나 이용이 쉽도록 한다.

* 현 ‘인하공업전문대학’App으로는 접근이 어렵거나 불편함이 있는 사항들을 개선시킨다.

* 학교에서 운영 중이지만 많은 재학생들이 모르고 있는 컨텐츠의 이용을 활발하게 한다.

* 향후 다양한 문의를 수락하고 해결할 수 있는 소통창구로 발전시킨다.

<br>

## 개발자

* imsoncod

* Raison-CJH

<br>

## 프로젝트 구성도

```
  
  # 세부파일 생략
  
  📦NaTaBee
   ├─ 📁routes
   │   ├─ 📜etc.js
   │   ├─ 📜info.js
   │   ├─ 📜library.js
   │   ├─ 📜menu.js
   │   ├─ 📜notice.js
   │   ├─ 📜phone.js
   │   ├─ 📜swagger.js
   │   └─ 📜test.js
   │
   ├─ 📜app.js
   ├─ 📜app.spec.js
   ├─ 📃appspec.yml
   ├─ 💰deploy.sh
   ├─ 👴travis.yml
   └─ 📃package.json

  ```
         
<br>

## 시스템 구성도

  ![image](https://user-images.githubusercontent.com/48934537/99139511-b3d7da00-267c-11eb-8c21-9ab81747a80b.png)

<br>

## 서비스 소개

  ![image](https://user-images.githubusercontent.com/48934537/101139871-8667c600-3655-11eb-949b-fac1b0d6ecac.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101139985-abf4cf80-3655-11eb-9e14-6fd248bf8e45.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101140280-17d73800-3656-11eb-8036-d2c81cf9cba6.png)

  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101141108-2bcf6980-3657-11eb-9c68-7169dd8b8421.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101141395-97b1d200-3657-11eb-99a0-f7c404a8a8f8.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101141528-c29c2600-3657-11eb-9e69-31503f47bf30.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101141690-fecf8680-3657-11eb-908c-9437512c0e44.png)

  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101141742-10b12980-3658-11eb-8737-720a46bf5100.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101141873-3c341400-3658-11eb-8d2a-f5267c5bbc96.png)
  
  <br>

  ![image](https://user-images.githubusercontent.com/48934537/101141954-50781100-3658-11eb-8373-2eafd5bfc64d.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101142029-6ab1ef00-3658-11eb-8bc0-3b44e490cbc1.png)
  
  <br>
  
  ![image](https://user-images.githubusercontent.com/48934537/101142113-874e2700-3658-11eb-93ae-27e857bd014c.png)

<br>

## 프로젝트 진행 과정 기록

### 📅 2020-08-31 ~ 2020-09-06

* [분야 선정]

  * 카카오 i 오픈빌더를 이용한 챗봇 개발

* [아이디어 선정]

  * 교내 학생들에게 도움을 주기 위한 챗봇 개발

<br>

### 📅 2020-09-07 ~ 2020-09-13

* [프로젝트 목적]

  * 他 홍보 매체(블로그, 페이스북, 유튜브)와 더불어 ‘인하공업전문대학’을 많은 사람들에게 홍보하여 브랜드가치를 상승시킨다.
  
  * 대중들에게 익숙한 ‘카카오톡’을 통해 접근함으로써 누구나 이용이 쉽도록 한다.
  
  * 現 ‘인하공업전문대학’App으로는 접근이 어렵거나 불편함이 있는 사항들을 개선시킨다.
  
  * 학교에서 운영 중이지만 많은 재학생들이 모르고 있는 컨텐츠의 이용을 활발하게 한다.
  
  * 향후 다양한 문의를 수락하고 해결할 수 있는 소통창구로 발전시킨다. 

* [기능 구성도]

  ![image](https://user-images.githubusercontent.com/48934537/93453223-5f321000-f914-11ea-8ce0-7533ace58ad9.png)
  
* [개발 세부 내용]

  * 챗봇
  
    * 카카오 i 오픈빌더를 이용하여 기능구성도에 맞게 시나리오 작성 (뎁스 최소화)
    
    * 스킬서버와 챗봇간 Http통신으로 요청/응답 -> 데이터 제공
    
  * 채널
  
    * 카카오톡 채널 관리자 센터를 통해 채널 관리
    
    * Master : imsoncod / Manager : Raison-CJH 으로 나누어 공동 관리
    
  * 서버
  
    * RestAPI 서버 구축, 문서화
    
    * 배포, 테스팅 자동화 처리
    
    * 데이터들은 대부분 크롤링을 통해 수집
    
  * 디자인 및 브랜딩
  
    * 모두가 알아보기 쉽게 깔끔하게 디자인, 배치
    
    * 챗봇 이름, 캐릭터 등 추후 결정

<br>

### 📅 2020-09-14 ~ 2020-09-20

* [카카오 i 오픈빌더]

  * 시나리오 및 블록 등록 완료
  
  * 스킬서버 연동 및 테스팅 완료

* [서버]

  * Nodejs 스킬서버 구축 완료

  * 크롤링 테스팅 완료
  
* [기획]

  * 챗봇 및 공식 캐릭터 명칭 선정 완료 "나타비(NaTaBee)"
  
  * 캐릭터 디자인 완료
  
    ![image](https://user-images.githubusercontent.com/48934537/93735137-e46c3c00-fc16-11ea-8951-c82151404324.png)

<br>

### 📅 2020-09-21 ~ 2020-09-27

* [카카오 i 오픈빌더]

  * 시나리오별 스킬 설계 완료
  
  * Docs Json 응답 규칙에 맞게 코드 작성 및 테스팅 완료
  
* [서버]

  * Nodejs 크롤링 코드 일반화 완료
  
* [기획]
  
  * 기획안 작성 완료

<br>

### 📅 2020-09-28 ~ 2020-10-04

* [기능]

  * 일부 기능 수정
  
  * "인하대 학식" 추가 예정
  
* [서버]

  * Travis CI 연동 테스팅
  
  * 대학소개 파트 API 제작
  
* [디자인]

  * 기능별 필요한 나타비 캐릭터 디자인 회의 완료

<br>

### 📅 2020-10-05 ~ 2020-10-11

* [서버]

  * 대학소개 파트 API 제작 완료
  
  * 입학, 캠퍼스라이프 파트 API 초안 제작 완료
  
* [디자인]

  * 기능별 캐릭터 디자인 제작 중(50%)
  
* [배포]

  * 개발용 플러스채널 개설 후 배포 테스팅 완료

<br>

### 📅 2020-10-12 ~ 2020-10-18

* [기능]

  * 특정 기능 URL수정 -> 모바일 최적화 사이트로 변경
  
  * "캠퍼스라이프 - 주간 주요일정" 추가
  
* [발표]

  * 중간발표 준비
  
<br>

### 📅 2020-10-19 ~ 2020-10-25

* [문서]

  * Nodejs - Swagger API 문서 완성

* [발표]

  * 2020.10.20 중간발표 완료

<br>

### 📅 2020-10-26 ~ 2020-11-01

* [CI, CD]

  * GitHub - Travis - AWS 연동 및 Build Testing 완료
  
  * AWS S3 - CodeDeploy - EC2 연동 

<br>

### 📅 2020-11-02 ~ 2020-11-08

* [CI, CD]

  * Travis - S3 - CodeDeploy 배포 자동화 완료
  
  * 배포 후 Slack 알림 연동 완료
  
  * Nodejs Build Testing 구현 완료(Mocha 라이브러리 사용)
  
<br>

### 📅 2020-11-09 ~ 2020-11-15

* [서비스]

  * 베타 서비스 오픈
  
  * 사용자 요구사항 설문 진행
