import { BOTTOM_TEXT_PROPS } from './BottomTextWidget.layout';
import { COLORS } from './index.const';

/**
 * @typedef {Object} BottomTextWidgetParams
 * @property {HmSensorInstance} sensor
 * @property {number} event 센서 갱신 이벤트 (hmSensor.event.LAST 또는 CHANGE)
 * @property {(sensor: HmSensorInstance) => string} getText
 * @property {string} colorTheme
 */

/**
 * 6시 방향 하단의 텍스트 위젯. 센서 값을 getText로 문자열로 바꿔 표시한다.
 * 일반 모드에서만 표시한다.
 */
export class BottomTextWidget {
  /**
   * @param {BottomTextWidgetParams} params
   */
  constructor({ sensor, event, getText, colorTheme }) {
    this._sensor = sensor;
    this._event = event;
    this._getText = getText;

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...BOTTOM_TEXT_PROPS,
      color: COLORS[colorTheme].primary,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    this._textWidget?.setProperty(hmUI.prop.TEXT, this._getText(this._sensor));
  }

  _bindHandlers() {
    const sensor = this._sensor;
    const event = this._event;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          sensor.addEventListener?.(event, update);
          update();
        }
      },
      pause_call: () => {
        sensor.removeEventListener?.(event, update);
      },
    });
  }
}
