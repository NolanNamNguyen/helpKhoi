const PROBLEM_LEVEL = {
  BEGINNER: 'BEGINNER',
  MIDDLE: 'MIDDLE',
  ADVANCE: 'ADVANCE',
};

const LEVEL_TITLE = {
  BEGINNER: 'Intro Gates',
  MIDDLE: 'At the Crossroads',
  ADVANCE: 'Corner of 0s and 1s',
};

const APP_ROLE = {
  SUPERVISOR: 'supervisor',
  MANAGER: 'manager',
};

const LOCAL_STORAGE = {
  session_id: 'sessionId',
};

const IMAGE_ENDPOINT = process.env.REACT_APP_ENDPOINT_IMAGE;

export { PROBLEM_LEVEL, LEVEL_TITLE, APP_ROLE, LOCAL_STORAGE, IMAGE_ENDPOINT };
