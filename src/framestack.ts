import {
  FrameConfig,
  FrameStackConfig,
  NonNullFrameStackConfig,
} from "./types";
import { DEFAULT_FORMSTACK_CONFIG } from "./constants";
import { Frame } from "./frame";
import { nanoid } from "nanoid";

export class FrameStack {
  private frames: Record<string, Frame> = {};
  public readonly config: NonNullFrameStackConfig;

  constructor(config: FrameStackConfig = {}) {
    this.config = { ...DEFAULT_FORMSTACK_CONFIG, ...config };
  }

  public addFrame(config: FrameConfig): Frame {
    const id = nanoid();
    const f = new Frame(id, config, this);

    this.frames[id] = f;

    return f;
  }
}
