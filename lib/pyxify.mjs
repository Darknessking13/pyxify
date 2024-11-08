/*
Copyright (c) 2024 Pyxify
License: MIT

This file was written by Iscordian.dev
*/

let applicationInstance;
let routerInstance;
let controllerInstance;

async function importApplication() {
  if (!applicationInstance) {
    const Application = (await import("./core/application")).default;
    applicationInstance = new Application();
  }
  return applicationInstance;
}

async function importRouter() {
  if (!routerInstance) {
    const Router = (await import('./helpers/router')).default;
    routerInstance = new Router();
  }
  return routerInstance;
}

async function importController() {
  if (!controllerInstance) {
    const Controller = (await import('./helpers/controller')).default;
    controllerInstance = new Controller();
  }
  return controllerInstance;
}

export {
  pyxify: importApplication,
  router: importRouter,
  controller: importController,
};
