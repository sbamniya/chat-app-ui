const useUserId = (): string => {
  return localStorage.getItem("loggedInUserId") || "";
};

export default useUserId;
