export const generateUuid = () =>
  `_${Math.random()
    .toString(36)
    .slice(2, 11)}`;

export const parseJwt = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const isTokenExpired = () => {
  const date = Date.now();
  return (
    localStorage &&
    localStorage.user &&
    JSON.parse(localStorage.user).expires <= date
  );
};
