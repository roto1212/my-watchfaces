import { gettext } from 'i18n';

export const SETTINGS_BOTTOM_OPTIONAL_TYPES = [
  {
    type: 100401,
    title_en: gettext('heart'),
    title_tc: gettext('heart'),
    title_sc: gettext('heart'),
    preview: 'edit/bottom_preview_heart.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100402,
    title_en: gettext('distance'),
    title_tc: gettext('distance'),
    title_sc: gettext('distance'),
    preview: 'edit/bottom_preview_distance.png',
    data: {
      type: 'distance',
    },
  },
  {
    type: 100403,
    title_en: gettext('steps'),
    title_tc: gettext('steps'),
    title_sc: gettext('steps'),
    preview: 'edit/bottom_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100400,
    title_en: gettext('disable'),
    title_tc: gettext('disable'),
    title_sc: gettext('disable'),
    preview: 'edit/bottom_preview_empty.png',
    data: {
      type: 'empty',
    },
  },
];
