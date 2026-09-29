import { FONTS } from './index.const';

// 6시 방향 하단 중앙 하트 아이콘 (아이콘 이미지 50x44)
export const HEART_BOTTOM_IMAGE_PROPS = {
  x: px(215),
  y: px(432),
  w: px(50),
  h: px(44),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// 숫자는 하트 위쪽 둥근 부분(꼭짓점 제외)의 중앙에 둔다
export const HEART_BOTTOM_TEXT_PROPS = {
  x: px(215),
  y: px(436),
  w: px(50),
  h: px(30),
  color: 0xffffff,
  text_size: px(20),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.widget,
  text: '--',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
