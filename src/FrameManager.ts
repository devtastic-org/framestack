import { FrameMessage } from "./types";
import { WHOAMI, YOUARE } from "./actions";

export default class FrameManager {
  frameId?: string;

  constructor() {
    this.addInternalListener();
    this.sendMessage({ type: WHOAMI });
  }

  private addInternalListener() {
    this.addListener((message) => {
      switch (message.type) {
        case YOUARE:
          this.frameId = message.payload;
      }
    });
  }

  public addListener(fn: (message: FrameMessage) => void) {
    window.addEventListener("message", (e) => {
      if (!e.data || !e.data.type) {
        return;
      }

      if (this.frameId && e.data.meta?.target !== this.frameId) {
        return;
      }

      console.log("From parent =>", e.data);

      fn(e.data);
    });
  }

  public sendMessage(message: FrameMessage) {
    window.parent.postMessage(message, { targetOrigin: "*" });
  }
}
