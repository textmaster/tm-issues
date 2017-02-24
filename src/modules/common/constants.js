export const STEPS = Object.freeze({
  CONNECT: 'CONNECT',
  TITLE: 'TITLE',
  TYPE: 'TYPE',
  PLATFORM: 'PLATFORM',
  DESCRIPTION: 'DESCRIPTION',
  SEND: 'SEND',
});

export const STEPS_ORDER = Object.freeze([
  STEPS.CONNECT, STEPS.TITLE, STEPS.TYPE,
  STEPS.PLATFORM, STEPS.DESCRIPTION, STEPS.SEND,
]);

export const STEPS_TITLES = Object.freeze({
  [STEPS.CONNECT]: 'Connect to Github',
  [STEPS.TITLE]: 'Title',
  [STEPS.TYPE]: 'Type',
  [STEPS.PLATFORM]: 'Platform',
  [STEPS.DESCRIPTION]: 'Description',
  [STEPS.SEND]: 'Submit Issue',
});