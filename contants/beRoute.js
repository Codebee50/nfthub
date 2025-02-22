export const BASE_BE_URL = `http://localhost:8080`;

export const makeApiUrl = (path) => {
  return `${BASE_BE_URL}${path}`;
};
