const useIsLoggedIn = () => {
  return Boolean(localStorage.getItem("loginToken"));
};

export default useIsLoggedIn;
