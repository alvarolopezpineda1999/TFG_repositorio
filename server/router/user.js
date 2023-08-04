const express = require('express');
const multiparty = require('connect-multiparty');
const userController = require('../controllers/user');
const md_auth = require('../middlewares/autenticated');

const md_upload = multiparty({ uploadDir: './uploads/avatar' });
const api = express.Router();

api.get('/user/me', [md_auth.asureAuth], userController.getMe);
api.get('/user/:id', [md_auth.asureAuth], userController.getUserById);
api.get('/users', [md_auth.asureAuth], userController.getUsers);
api.post('/user', [md_auth.asureAuth, md_upload], userController.createUser);
api.patch(
  '/user/:id',
  [md_auth.asureAuth, md_upload],
  userController.updateUser
);
api.delete('/user/:id', [md_auth.asureAuth], userController.deleteUser);

module.exports = api;
