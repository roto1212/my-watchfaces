# my-watchfaces

Amazfit(Zepp OS) 워치페이스 프로젝트. 오픈소스 저장소에서 페이스 3개를 복사해 수정하는 파생 프로젝트다.

## 출처 및 라이선스 (중요)

- 원본: [novvember/amazfit-watchfaces](https://github.com/novvember/amazfit-watchfaces) (commit `975eb1e`, **GPL-3.0**)
- 이 저장소는 원본의 파생 저작물이므로 **GPL-3.0을 유지**한다. `LICENSE.txt` 삭제·변경 금지.
- 배포(GitHub 공개, Zepp Store 등록 등) 시 지켜야 할 것:
    - 소스코드 공개, 원작자 저작권 표기 유지, 수정 사실 명시
    - `NOTICE.md`의 "변경 이력"에 수정 내용과 날짜를 계속 기록
- 개인 워치에만 설치하는 용도면 배포 의무는 없다.
- 복사해 온 항목: `src/watchfaces/{modular, needle, text-lines}`, 공용 코드 `src/{adapters,types,utils}`, `scripts/`

### 라이선스 검토 결과 (원본 README/자산 기준)
| 페이스 | 디자인 참고 | 폰트 | 위험도 |
|---|---|---|---|
| modular | Apple Watch Modular Ultra 레이아웃 참고 | Sofia Sans (OFL로 알고 있음) | 낮음. 배포 시 **이름 변경 권장** |
| needle | Suunto 기본 페이스 아이디어 | Play Regular (OFL로 알고 있음) | 낮음 |
| text-lines | 없음 | 없음 | 가장 낮음 |

- 아이콘·이미지 PNG의 출처는 원본 저장소에 명시되어 있지 않다. 스토어 배포 전 교체하거나 원작자(GitHub 이슈, n.demitsuri@gmail.com)에게 문의한다.
- 폰트 라이선스는 이 저장소에 파일이 없다. 배포 시 OFL 라이선스 전문을 함께 넣는다. (Google Fonts에서 재확인 필요)
- 원본의 다른 페이스(rider-1991, regulus, gradient-watch, verbarius 등 상용 디자인 재현, nothing-* 계열의 Nothing 브랜드 폰트)는 위험이 높아 **의도적으로 가져오지 않았다.** 추가로 가져올 때는 assets·폰트·README 출처를 먼저 검토한다.

## 구조

```
├── LICENSE.txt, NOTICE.md, CLAUDE.md
├── package.json, jsconfig.json
├── scripts/            # build.js, 릴리스 스크립트(py/sh)
└── src/
    ├── adapters/       # Zepp OS API 래퍼
    ├── types/          # Zepp OS 타입 선언
    ├── utils/          # 공용 유틸
    └── watchfaces/<name>/
        ├── app.json, app.js
        ├── watchface/  # 워치페이스 본체 코드
        ├── page/       # 설정 화면·번역 (있는 경우)
        ├── assets/     # 이미지, 폰트
        └── README.md
```

## 개발 환경

- 프레임워크: Zepp OS 워치페이스 (JavaScript), 빌드/프리뷰는 Zeus CLI (`@zeppos/zeus-cli`)
- 패키지 매니저: pnpm (npm/yarn 사용 안 함)
- 이 프로젝트는 원본이 JS(JSDoc/jsconfig) 기반이다. 새 코드도 원본 스타일에 맞춘다.
- 들여쓰기는 원본 코드 스타일(2 spaces)을 따른다. 기존 파일 안에서 스타일을 섞지 않는다.
- WSL2에서 코드 작성과 `zeus build`까지 하고, **시뮬레이터는 Windows/macOS 전용**이라 Windows 쪽에서 실행한다.
- 실기기 테스트: 폰의 Zepp 앱 개발자 모드 + QR 스캔
    - 개발자 모드 켜기: `프로필 > 설정 > 정보`에서 Zepp 아이콘 7번 탭 (이후 `프로필 > 설정`에 `개발자모드` 항목 생김. 여기엔 스캔이 없음)
    - QR 스캔: 하단 네비 `기기 > 일반 > 개발자모드`의 오른쪽 위 스캔 아이콘 (Zepp 앱 10.8.7 Android 기준. 공식 문서의 `프로필 > 기기 선택` 경로는 이 버전과 다름)
    - 실행: `cd src/watchfaces/modular && zeus preview` 후 대상 기기를 고르고 QR 스캔 (워치 동기화/업데이트 중에는 전송 실패 가능)
    - 확인 결과 (2026-09-29): Amazfit Active 3 Premium(466x466 원형)에 modular-wellness 설치 성공. 워치에는 나타나고 Zepp 앱의 워치페이스 목록에는 안 보임 (개발자 모드 설치 특성으로 추정)

```bash
pnpm add -g @zeppos/zeus-cli
# WSL + pnpm: zeus 실행 시 "Cannot find module 'zeppos-app-utils'" 에러가 나면
# (pnpm이 패키지 내부 private-modules를 링크하지 않음) 전역 node_modules에 심볼릭 링크를 건다.
#   cd "$(pnpm root -g)" && ln -s @zeppos/zeus-cli/private-modules/zeppos-app-utils zeppos-app-utils
zeus login
cd src/watchfaces/<name>
zeus dev        # 시뮬레이터/QR 프리뷰
zeus build      # dist/ 에 .zab 생성
```

- 루트 `pnpm build`(`scripts/build.js`)는 `INIT_CWD`가 `src/watchfaces/*` 안이어야 동작하며 npm 기준으로 작성되어 있다. pnpm에서 동작하지 않으면 스크립트를 수정한다.

## 현재 상태와 다음 할 일

- [x] 로컬 git 저장소 생성 (`git init` 완료, `.gitignore`에 `.claude/` 포함)
- [x] 첫 커밋 (메시지에 원본 출처 명시, 브랜치 `main`)
- [x] modular `app.json`의 `appId`(1129253), `appName`(modular-wellness), `vender`(sdb8324) 변경 완료. needle, text-lines는 개인 사용 범위 밖이라 원본 값 유지 (등록 시 변경)
- [x] `zeus build`로 빌드 확인 (**modular만** 진행, 2026-09-29 성공: `dist/1129253-modular-wellness-2.5.4-*.zab`)
- [x] 실기기(Amazfit Active 3 Premium) 설치 및 동작 확인 (2026-09-29)
- [x] modular 상단 12시 방향 배터리 위젯 추가 (`watchface/BatteryTopWidget.js`, 숫자만 아이콘 안에 표시, 20% 이하 빨간색, AOD 표시). 실기기 확인 완료
- [ ] 폰트 라이선스 전문(OFL) 포함 여부 결정
- [ ] 배포 계획이 있으면 modular 이름 변경 및 아이콘 출처 점검
- [ ] GitHub 원격 저장소 생성은 아직 하지 않음 (공개 시 GPL 조건 확인 후 진행)

## 작업 규칙

- 모든 응답은 한글로 작성한다.
- 변경 사항 위주로 설명하고, 전체 코드는 요청했을 때만 보여준다.
- 커밋·push·원격 저장소 생성은 사용자가 요청할 때만 한다.
- `.env` 등 비밀 파일은 커밋하지 않는다. 평문 비밀번호·토큰을 발견하면 즉시 경고한다.
- 페이스를 수정하면 `NOTICE.md`의 변경 이력을 함께 갱신한다.
- 해상도가 기기마다 다르므로(GTR Mini 416, GTR 4 466 등) 좌표는 하드코딩하지 않고 원본의 기존 패턴을 따른다.
- AOD(상시 표시) 모드 동작을 항상 함께 확인한다.
