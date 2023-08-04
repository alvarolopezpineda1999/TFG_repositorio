const bcrypt = require('bcryptjs');
const image = require('../utils/image');
const { response } = require('../app');
const User = require('../models/user');

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: 'No se ha encontrado usuario' });
  } else {
    res.status(200).send(response);
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  const response = await User.findById(id);

  if (!response) {
    res.status(400).send({ msg: 'No se ha encontrado usuario' });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  let response = null;

  response = await User.find();

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    user.avatar = imagePath;
  }

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: 'Error en la creacion del usuario' });
    } else {
      res.status(201).send(userStored);
    }
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al actualizar el usuario' });
    } else {
      res.status(200).send({ msg: 'Actualización correcta' });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;
  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'Error al eliminar usuario' });
    } else {
      res.status(200).send({ msg: 'Usuario eliminado' });
    }
  });
}

module.exports = {
  getMe,
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
