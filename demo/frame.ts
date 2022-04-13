import { FrameManager } from "../src";

const manager = new FrameManager();

manager.sendMessage({ type: "hi", payload: "there" });
