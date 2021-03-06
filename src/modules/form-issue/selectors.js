import R from 'ramda';
import { createSelector } from 'reselect';
import { STEPS, STEPS_ORDER } from './constants';

export const formValuesSelector = R.pathOr({}, ['form', 'issue', 'values']);
export const userInfoSelector = R.prop('userInfo');
export const isIssuePostedSelector = R.prop('isIssuePosted');

export const isUserCollaboratorSelector = createSelector(
  [userInfoSelector],
  R.propOr(false, 'hasPermission'),
);

const isPropLongerThan = (propName, minLength) =>
  ({ [propName]: prop }) => !!prop && prop.length > minLength;

// STEP VALIDATIONS
const stepValidators = {
  [STEPS.CONNECT]: isUserCollaboratorSelector,
  [STEPS.TITLE]: createSelector(
    [formValuesSelector],
    isPropLongerThan('title', 5),
  ),
  [STEPS.TYPE]: createSelector(
    [formValuesSelector],
    isPropLongerThan('type', 0),
  ),
  [STEPS.PRIORITY]: createSelector(
    [formValuesSelector],
    isPropLongerThan('priority', 0),
  ),
  [STEPS.PLATFORM]: createSelector(
    [formValuesSelector],
    isPropLongerThan('platform', 0),
  ),
  [STEPS.DESCRIPTION]: createSelector(
    [formValuesSelector], ({ description = '' }) => description
      .replace(/\n/g, '')
      .replace(/### /g, '')
      .replace('Expected behaviour', '')
      .replace('Current behaviour', '')
      .replace('Possible solution', '')
      .replace('Steps to reproduce', '')
      .length > 30,
  ),
  [STEPS.SEND]: isIssuePostedSelector,
};

export const currentStepSelector = createSelector(
  STEPS_ORDER.map(R.propOr(R.F, R.__, stepValidators)),
  (...conditions) => {
    const firstNonPassed = conditions.findIndex(c => !c);
    return firstNonPassed === -1 ? conditions.length : firstNonPassed;
  },
);
