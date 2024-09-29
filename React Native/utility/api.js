export const mainURL = "http://192.168.1.15:4500";
const url = mainURL + "/api/";

const user = {
  signin: url + "user/signin", // POST
  signup: url + "user/signup", // POST
  updateProfilePic: url + "user/updateProfilePic", // POST
  logout: url + "user/logout", // POST
  getUserByToken: url + "user/getUserByToken", // GET
  getUserById: (userId) => url + "user/getUserById/" + userId, // GET
};

const post = {
  create: url + "post/create", // POST
  latest: url + "post/latest", // GET
  view: url + "post/view", // POST
  mostLiked: url + "post/mostLiked", // GET
  title: (title) => url + "post/title/" + title, // GET
  user: (userId) => url + "post/user/" + userId, // GET
  liked: url + "post/liked", // GET
};

const like = {
  like: url + "like", // POST
};

const asset = {
  upload: url + "asset/upload", // POST
};

const API = {
  user,
  post,
  like,
  asset,
};
export default API;
