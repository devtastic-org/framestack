import { FrameStack } from "../src";

const fs = new FrameStack();

fs.enableHooks();

const f = fs.addFrame({
  url: "http://localhost:3000/frame.html",
  size: "small",
});

setTimeout(() => f.show(), 1000);
