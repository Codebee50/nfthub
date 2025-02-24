export const BASE_BE_URL = process.env.NEXT_PUBLIC_BASE_BE_URL || "http://localhost:8090";


export const makeApiUrl = (path) => {
  return `${BASE_BE_URL}${path}`;
};
