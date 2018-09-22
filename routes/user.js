const express = require('express');
let router = express.Router();
const ctrlStd = require('../app/controller/user.controller');

router
.route('/login')
.post(ctrlStd.login,ctrlStd.validate);

router
.route('/registration')
.post(ctrlStd.registration,ctrlStd.validate);

router
.route('/:userId')
.delete(ctrlStd.removeOneUser);

module.exports=router;
