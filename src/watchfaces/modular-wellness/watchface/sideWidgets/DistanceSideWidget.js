import { SideArcWidget } from './SideArcWidget';
import { gettext } from 'i18n';

/**
 * @typedef {Object} DistanceSideWidgetParams
 * @property {HmSensorInstance} distanceSensor
 * @property {'left' | 'right'} side
 * @property {string} colorTheme
 */

// 게이지가 가득 차는 하루 목표 거리 (m)
const MAX_VALUE = 10000;

export class DistanceSideWidget {
  /**
   * @param {DistanceSideWidgetParams} params
   */
  constructor({ distanceSensor, side, colorTheme }) {
    this._distanceSensor = distanceSensor;

    this._sideArcWidget = new SideArcWidget({
      side,
      title: gettext('km'),
      colorTheme,
    });

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { current = 0 } = this._distanceSensor;
    const value = current / MAX_VALUE;

    this._sideArcWidget?.set({
      valueText: (current / 1000).toFixed(1),
      value,
      selection: [0, value],
    });
  }

  _bindHandlers() {
    const distanceSensor = this._distanceSensor;
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          distanceSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        distanceSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  }
}
