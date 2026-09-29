import { gettext } from 'i18n';

export const SETTINGS_SIDE_OPTIONAL_TYPES = [
  {
    type: 100201,
    title_en: gettext('steps'),
    title_tc: gettext('steps'),
    title_sc: gettext('steps'),
    preview: 'edit/side_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100202,
    title_en: gettext('heart'),
    title_tc: gettext('heart'),
    title_sc: gettext('heart'),
    preview: 'edit/side_preview_heart.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100203,
    title_en: gettext('battery'),
    title_tc: gettext('battery'),
    title_sc: gettext('battery'),
    preview: 'edit/side_preview_battery.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100204,
    title_en: gettext('distance'),
    title_tc: gettext('distance'),
    title_sc: gettext('distance'),
    preview: 'edit/side_preview_distance.png',
    data: {
      type: 'distance',
    },
  },
];
