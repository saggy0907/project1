const express = require('express');
let router = express.Router();
const ctrlStd = require('../app/controller/user.controller');

router
.route('/login')
.post(ctrlStd.login);

router
.route('/registration')
.post(ctrlStd.registration);

router
.route('/:userId')
.delete(ctrlStd.removeOneUser);

router
.route('/all')
.get(ctrlStd.getAll);

router
.route('/login/one')
.get(ctrlStd.getOne);

module.exports=router;
