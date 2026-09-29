import { SETTINGS_BOTTOM_OPTIONAL_TYPES } from './BottomSettings.const';

const EDIT_GROUP_PARAMS = {
  name: 'bottom',
  props: {
    x: px(150),
    y: px(432),
  },
};

export class BottomSettings {
  constructor() {
    this.settings = this._buildEditWidgets();
  }

  _buildEditWidgets() {
    const editGroupParam = EDIT_GROUP_PARAMS;
    const optionalTypes = SETTINGS_BOTTOM_OPTIONAL_TYPES;

    const editGroup = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      // @ts-ignore
      x: 0,
      // @ts-ignore
      y: 0,
      w: px(180),
      h: px(44),

      select_image: 'edit/bottom_select.png',
      un_select_image: 'edit/bottom_unselect.png',

      tips_BG: 'edit/tip.png',
      tips_width: px(120),
      tips_margin: px(6),
      tips_x: px(30),
      tips_y: px(-35),

      edit_id: 140,
      optional_types: optionalTypes,
      count: optionalTypes.length,
      default_type: optionalTypes[0].type,

      ...editGroupParam.props,
    });

    const typeId = editGroup.getProperty(hmUI.prop.CURRENT_TYPE);
    const chosenType = optionalTypes.find((item) => item.type === typeId)?.data
      ?.type;

    return { [editGroupParam.name]: chosenType };
  }
}
