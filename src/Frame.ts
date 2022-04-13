import { FrameConfig, FrameMessage, NonNullFrameConfig } from "./types";
import { DEFAULT_FRAME_CONFIG } from "./constants";
import FrameStack from "./FrameStack";
import {YOUARE} from "./actions";

export default class Frame {
  public id: string;
  public visible: boolean = false;
  private config: NonNullFrameConfig;
  private fs: FrameStack;
  private frame?: HTMLIFrameElement;

  constructor(id: string, config: FrameConfig, fs: FrameStack) {
    this.id = id;
    this.fs = fs;
    this.config = { ...DEFAULT_FRAME_CONFIG, ...config };
    this.createElement();
    this.attachElement();
  }

  private createElement(): void {
    this.frame = document.createElement("iframe");
    this.frame.id = this.id;
    this.frame.src = this.config.url;
    this.frame.classList.add("fs_iframe");
    this.frame.setAttribute("allowTransparency", "true");

    const { width, height } = this.getSize();
    const { x, y } = this.getOffset();

    // @ts-ignore
    this.frame.style = `
      max-width: calc(100% - ${2 * x}px); 
      max-height: calc(100% - ${2 * y}px); 
      height: ${height}px;
      width: ${width}px;
      background: ${this.config.background}; 
      ${!this.config.shadow && "box-shadow: none"};
      top: ${this.config.position.top}px;
      right: ${this.config.position.right}px;
      bottom: ${this.config.position.bottom}px;
      left: ${this.config.position.left}px;
    `;
  }

  private attachElement(): void {
    document.body.append(this.frame!);
  }

  private getSize(): { width: number; height: number } {
    return typeof this.config.size === "string"
      ? this.fs.config.sizes[this.config.size]
      : this.config.size;
  }

  private getOffset(): { x: number; y: number } {
    const { top, right, bottom, left } = this.config.position;

    return {
      x:
        (typeof right === "number" ? right : 0) +
        (typeof left === "number" ? left : 0),
      y:
        (typeof top === "number" ? top : 0) +
        (typeof bottom === "number" ? bottom : 0),
    };
  }

  public show(): Frame {
    this.frame!.classList.add("fs_frame_show");
    this.visible = true;

    return this;
  }

  public hide(): Frame {
    this.frame!.classList.remove("fs_frame_show");
    this.frame!.classList.add("fs_frame_hide");

    this.visible = false;

    setTimeout(() => {
      this.frame!.classList.remove("fs_frame_hide");
    }, 600);

    return this;
  }

  public toggle(): Frame {
    this.visible ? this.hide() : this.show();

    return this;
  }

  public resize(size: string): Frame {
    this.config.size = size;

    const { width, height } = this.getSize();

    this.frame!.style.height = `${height}px`;
    this.frame!.style.width = `${width}px`;

    return this;
  }

  public sendMessage(message: FrameMessage) {
    this.frame!.contentWindow?.postMessage(message, { targetOrigin: "*" });
  }
}
