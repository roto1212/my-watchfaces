import { FONTS } from './index.const';

// 12시 방향 상단 중앙 배터리 아이콘 (본체 + 단자, 전체 폭 73px 기준 x=240 중앙)
export const BATTERY_TOP_BODY = {
  x: px(204),
  y: px(20),
  w: px(66),
  h: px(32),
  radius: px(8),
  line_width: px(3),
};

export const BATTERY_TOP_TERMINAL = {
  x: px(272),
  y: px(29),
  w: px(5),
  h: px(14),
  radius: px(2),
};

// 본체 안쪽 게이지 (테두리 두께만큼 안쪽)
export const BATTERY_TOP_GAUGE = {
  x: px(207),
  y: px(23),
  w: px(60),
  h: px(26),
  radius: px(5),
};

export const BATTERY_TOP_TEXT_PROPS = {
  x: px(204),
  y: px(20),
  w: px(66),
  h: px(32),
  color: 0xffffff,
  text_size: px(24),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.widget,
  text: '-',
};

export const BATTERY_TOP_AOD_TEXT_PROPS = {
  ...BATTERY_TOP_TEXT_PROPS,
  font: FONTS.aod,
};
