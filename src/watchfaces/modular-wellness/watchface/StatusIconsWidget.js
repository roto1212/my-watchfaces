export class StatusIconsWidget {
  constructor() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      x: px(290),
      y: px(22),
      type: hmUI.system_status.DISCONNECT,
      src: 'status/disconnect.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
  }
}
