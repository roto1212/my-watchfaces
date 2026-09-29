import {
  HEART_BOTTOM_IMAGE_PROPS,
  HEART_BOTTOM_TEXT_PROPS,
} from './HeartBottomWidget.layout';

/**
 * @typedef {Object} HeartBottomWidgetParams
 * @property {HmSensorInstance} heartSensor
 * @property {string} colorTheme
 */

/**
 * 6시 방향 하단의 하트 아이콘. 현재 심박수 숫자를 아이콘 안에 표시한다.
 * 일반 모드에서만 표시한다 (AOD에서는 심박 갱신이 제한되어 표시하지 않음).
 */
export class HeartBottomWidget {
  /**
   * @param {HeartBottomWidgetParams} params
   */
  constructor({ heartSensor, colorTheme }) {
    this._heartSensor = heartSensor;

    hmUI.createWidget(hmUI.widget.IMG, {
      ...HEART_BOTTOM_IMAGE_PROPS,
      src: `heart/${colorTheme}.png`,
    });

    this._textWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      HEART_BOTTOM_TEXT_PROPS,
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { last = 0 } = this._heartSensor;
    const text = last > 0 ? String(last) : '--';

    this._textWidget?.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const heartSensor = this._heartSensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  }
}
