import { nanoid } from "nanoid";
import {
  FrameConfig,
  FrameStackConfig,
  NonNullFrameStackConfig,
} from "./types";
import { DEFAULT_FRAMESTACK_CONFIG } from "./constants";
import { Frame } from "./frame";
import { HooksMixin } from "./mixins/hooks";

export class FrameStack extends HooksMixin {
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
}
