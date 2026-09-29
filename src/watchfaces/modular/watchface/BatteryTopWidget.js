import { clamp } from '../../../utils/clamp';
import {
  BATTERY_TOP_AOD_TEXT_PROPS,
  BATTERY_TOP_BODY,
  BATTERY_TOP_GAUGE,
  BATTERY_TOP_TERMINAL,
  BATTERY_TOP_TEXT_PROPS,
} from './BatteryTopWidget.layout';
import { COLORS } from './index.const';

const LOW_LEVEL = 20;
const LOW_OUTLINE_COLOR = 0xff3b30;
const LOW_GAUGE_COLOR = 0x9b1c1c;
const AOD_GAUGE_COLOR = 0x444444;

/**
 * @typedef {Object} BatteryTopWidgetParams
 * @property {HmSensorInstance} batterySensor
 * @property {string} colorTheme
 */

/**
 * 12시 방향 상단의 배터리 아이콘. 잔량 숫자(% 없음)를 아이콘 안에 표시한다.
 * 20% 이하이면 빨간색으로 바뀐다. 일반 모드와 AOD 모두 표시한다.
 */
export class BatteryTopWidget {
  /**
   * @param {BatteryTopWidgetParams} params
   */
  constructor({ batterySensor, colorTheme }) {
    this._batterySensor = batterySensor;
    this._colorTheme = colorTheme;

    this._normal = this._createIcon({
      showLevel: hmUI.show_level.ONLY_NORMAL,
      textProps: BATTERY_TOP_TEXT_PROPS,
    });
    this._aod = this._createIcon({
      showLevel: hmUI.show_level.ONLY_AOD,
      textProps: BATTERY_TOP_AOD_TEXT_PROPS,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  /**
   * @param {Object} params
   * @param {number} params.showLevel
   * @param {Object} params.textProps
   */
  _createIcon({ showLevel, textProps }) {
    const gauge = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...BATTERY_TOP_GAUGE,
      color: 0x000000,
      show_level: showLevel,
    });

    const body = hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      ...BATTERY_TOP_BODY,
      color: 0xffffff,
      show_level: showLevel,
    });

    const terminal = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      ...BATTERY_TOP_TERMINAL,
      color: 0xffffff,
      show_level: showLevel,
    });

    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      ...textProps,
      show_level: showLevel,
    });

    return { gauge, body, terminal, text };
  }

  /**
   * @param {number} level 0~100
   * @param {boolean} isAod
   */
  _getColors(level, isAod) {
    const isLow = level <= LOW_LEVEL;
    const theme = COLORS[this._colorTheme] || COLORS.common;

    if (isAod) {
      return {
        outline: isLow ? LOW_OUTLINE_COLOR : COLORS.common.aod,
        gauge: isLow ? LOW_GAUGE_COLOR : AOD_GAUGE_COLOR,
      };
    }

    return {
      outline: isLow ? LOW_OUTLINE_COLOR : theme.primary,
      gauge: isLow ? LOW_GAUGE_COLOR : theme.secondary,
    };
  }

  _update() {
    const { current = 0 } = this._batterySensor;
    const level = clamp(0, current, 100);
    const gaugeWidth = Math.round((BATTERY_TOP_GAUGE.w * level) / 100);

    [
      [this._normal, false],
      [this._aod, true],
    ].forEach(([icon, isAod]) => {
      const { outline, gauge } = this._getColors(level, isAod);

      icon.gauge.setProperty(hmUI.prop.MORE, {
        ...BATTERY_TOP_GAUGE,
        w: gaugeWidth,
        color: gauge,
      });
      icon.body.setProperty(hmUI.prop.COLOR, outline);
      icon.terminal.setProperty(hmUI.prop.COLOR, outline);
      icon.text.setProperty(hmUI.prop.TEXT, String(level));
    });
  }

  _bindHandlers() {
    const batterySensor = this._batterySensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  }
}
