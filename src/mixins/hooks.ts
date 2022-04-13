import { Frame } from "../frame";

export class HooksMixin {
  // Cache listener function for later removal
  private hookEventListenerFn?: (e: MouseEvent) => void;

  // Only for typing
  protected frames?: Record<string, Frame>;

  public enableHooks() {
    this.hookEventListenerFn = this.hookEventListener.bind(this);
    document.addEventListener("click", this.hookEventListenerFn);
    return this;
  }

  public disableHooks() {
    if (this.hookEventListenerFn) {
      document.removeEventListener("click", this.hookEventListenerFn);
    }
    return this;
  }

  private hookToggle() {
    for (const f of Object.values(this.frames!)) {
      f.toggle();
    }
  }

  private hookResize(size: string) {
    for (const f of Object.values(this.frames!)) {
      f.resize(size);
    }
  }

  private hookEventListener(e: MouseEvent) {
    const ds = (e.target as HTMLElement).dataset;

    if (ds.hasOwnProperty("fsToggle")) {
      this.hookToggle();
    }
    if (ds.hasOwnProperty("fsResize")) {
      this.hookResize(ds.fsResize as string);
    }
  }
}
