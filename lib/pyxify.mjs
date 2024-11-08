/*
This file writed by Iscordian.dev
For ES exports.
Do not copy without permission.
Do not remove this.
*/
export default async function pyxify() {
  const Application = (await import("./core/application")).default;
  const Router = (await import('./helpers/router')).default;
  const Controller = (await import('./helpers/controller')).default;

  pyxify.Router = Router;
  pyxify.Controller = Controller;

  return new Application();
}
