export const createUser = (user) => {
  let oldUsers = localStorage.getItem("users") || JSON.stringify([]);
  oldUsers = JSON.parse(oldUsers);
  const userExists = oldUsers.filter((item) => item.email === user.email);
  if (userExists.length > 0) {
    loginUser(userExists[0]);
    return;
  }
  localStorage.setItem("users", JSON.stringify([...oldUsers, user]));
  loginUser(user);
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem("currentUser");
  return JSON.parse(currentUser);
};

export const loginUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const logoutUser = (user) => {
  localStorage.removeItem("currentUser");
};

export const addorRemoveToWatchList = (movie) => {
  const currentUser = getCurrentUser();
  let watchList = JSON.parse(
    localStorage.getItem("watchlist") || JSON.stringify({})
  );

  const userWatchList = watchList[currentUser.email] || [];

  const alreadyExistIndex = userWatchList.findIndex(
    (item) => item.id === movie.id
  );

  if (alreadyExistIndex !== -1) {
    userWatchList.splice(alreadyExistIndex, 1);
  } else {
    userWatchList.push(movie);
  }

  let newWatchList = { ...watchList, [currentUser.email]: userWatchList };
  localStorage.setItem("watchlist", JSON.stringify(newWatchList));
};

export const isMovieExistsInWatchList = (movie) => {
  const currentUser = getCurrentUser();
  let watchList = JSON.parse(
    localStorage.getItem("watchlist") || JSON.stringify({})
  );

  const userWatchList = watchList[currentUser.email] || [];

  const alreadyExistIndex = userWatchList.findIndex(
    (item) => item.id === movie.id
  );
  if (alreadyExistIndex !== -1) {
    return true;
  } else {
    return false;
  }
};

export const getWatchList = () => {
  const currentUser = getCurrentUser();
  let watchList = JSON.parse(
    localStorage.getItem("watchlist") || JSON.stringify({})
  );
  return watchList[currentUser.email] || [];
};
