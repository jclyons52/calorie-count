import "reflect-metadata";

import { Kernel } from "./Kernel";

const main = async () => {
  const kernel = new Kernel();
  await kernel.boot();
  await kernel.listen();
};

main();
