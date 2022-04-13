import { nanoid } from "nanoid";
import {
  FrameConfig,
  FrameMessage,
  FrameStackConfig,
  NonNullFrameStackConfig,
} from "./types";
import { DEFAULT_FRAMESTACK_CONFIG } from "./constants";
import Frame from "./Frame";
import HooksMixin from "./mixins/HooksMixin";

export default class FrameStack extends HooksMixin {
  protected frames: Record<string, Frame> = {};
  public readonly config: NonNullFrameStackConfig;

  constructor(config: FrameStackConfig = {}) {
    super();
    this.config = { ...DEFAULT_FRAMESTACK_CONFIG, ...config };
  }

  public addFrame(config: FrameConfig): Frame {
    const id = config.id || nanoid();
    const f = new Frame(id, config, this);

    this.frames[id] = f;

    return f;
  }

  public addListener(fn: (message: FrameMessage) => void) {
    window.addEventListener("message", (e) => {
      fn(e.data);
    });
  }
}
