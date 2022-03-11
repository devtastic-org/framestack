import { FrameConfig, NonNullFrameConfig } from "./types";
import { DEFAULT_FORM_CONFIG } from "./constants";
import { FrameStack } from "./framestack";

export class Frame {
  public id: string;
  private config: NonNullFrameConfig;
  private fs: FrameStack;
  private frame?: HTMLIFrameElement;

  constructor(id: string, config: FrameConfig, fs: FrameStack) {
    this.id = id;
    this.fs = fs;
    this.config = { ...DEFAULT_FORM_CONFIG, ...config };
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
}
