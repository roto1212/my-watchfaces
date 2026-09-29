# NOTICE

이 저장소는 novvember의 [amazfit-watchfaces](https://github.com/novvember/amazfit-watchfaces)
(commit 975eb1e, GPL-3.0)에서 아래 항목을 복사해 수정한 파생 저작물이다.
따라서 이 저장소 전체도 GPL-3.0(`LICENSE.txt`)을 따른다.

## 원본에서 가져온 것
- `src/watchfaces/modular`, `src/watchfaces/needle`, `src/watchfaces/text-lines`
- 공용 코드: `src/adapters`, `src/types`, `src/utils`, `scripts`
- 원 저작자: novvember (https://github.com/novvember)

## 디자인 참고 (원본 README 기준)
- modular: Apple Watch Modular Ultra 페이스를 참고
- needle: Suunto 기본 워치페이스에서 아이디어
- text-lines: 별도 참고 없음

## 폰트 (제3자, 라이선스는 배포 전 직접 확인 필요)
- modular: Sofia Sans (SemiBold, ExtraCondensed Regular/Thin)
- needle: Play Regular

## 변경 이력
- 2026-09-29: modular의 `appId`(1073741 → 1129253)와 `appName`(Modular → modular-wellness), `vender`(novvember → sdb8324)를 개발자 콘솔 등록 값으로 변경
- 2026-09-29: modular 상단 12시 방향에 배터리 위젯 추가 (`BatteryTopWidget`, 아이콘은 도형으로 직접 그림, 잔량 숫자를 아이콘 안에 표시, 20% 이하 빨간색, AOD 표시). 충돌 방지를 위해 연결 끊김 아이콘 위치를 (268,18)에서 (290,22)로 이동
- 2026-09-29: modular 하단 이동거리 텍스트를 심박수 위젯으로 교체 (`HeartBottomWidget`, 하트 아이콘은 Pillow로 직접 생성해 `assets/common.r/heart/`에 추가, 숫자를 하트 안에 표시, 일반 모드만 표시). 이동거리는 좌우 사이드 위젯 옵션(`distance`, `DistanceSideWidget`)으로 이전하고 기존 `DistanceWidget` 삭제. 겹침 방지를 위해 수면 텍스트 y를 412에서 404로 이동
- 2026-09-29: modular 하단 위젯을 편집 가능한 슬롯으로 변경 (`BottomSettings`, edit_id 140, 옵션: heart(기본)/distance/steps/disable). 거리·걸음 수는 `BottomTextWidget`으로 표시하고, 편집 영역 테두리 이미지(`edit/bottom_select.png`, `bottom_unselect.png`)를 Pillow로 생성해 추가
- 2026-09-29: modular 편집 모드 상단의 앱 이름/버전/벤더 안내 텍스트 삭제 (`WidgetSettings._buildBackground`). 색상 테마 편집 슬롯을 6시에서 12시 방향(y=4)으로 이동해 하단 편집 슬롯과 겹침 방지
- 2026-09-29: modular AOD 배터리 아이콘에서 잔량 숫자 제거, 게이지를 테두리와 같은 색(흰색, 20% 이하 빨간색)으로 표시하도록 변경
