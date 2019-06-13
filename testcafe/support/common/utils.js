/* eslint-disable import/prefer-default-export */
export const sleep = (delay) => {
  const start = new Date().getTime();
  let now = new Date().getTime();
  while (now < start + delay) {
    now = new Date().getTime();
  }
};
