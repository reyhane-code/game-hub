export const checkAuthentication = () => {
  const tokens = localStorage.getItem("tokens");
  return tokens ? true : false;
};
