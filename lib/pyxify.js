/*
Copyright (c) 2024 Pyxify
License: MIT

This file was written by ! Ｄᴇᴠɪʟɪѕʜ ｃʜʀᴏɴɪᴄʟᴇѕ and modified by Iscordian.dev
*/

const Application = require('./core/application');
const Router = require('./helpers/router');
const Controller = require('./helpers/controller');


module.exports = { pyxify: new Application(), router: new Router(), controller: new Controller() };
