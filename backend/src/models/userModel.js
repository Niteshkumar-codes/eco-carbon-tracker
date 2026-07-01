const users = [];

function createUser({ id, name, email, password }) {
  const user = { id, name, email, password };
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

function getAllUsers() {
  return users;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
};
