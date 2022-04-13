import Frame from "../Frame";

export default class HooksMixin {
  private frameId: string | null = null;
  // Cache listener function for later removal
  private hookEventListenerFn?: (e: MouseEvent) => void;

  // Only for typing
  protected frames?: Record<string, Frame>;

  public enableHooks(frameId: string) {
    // Clear any existing listeners
    this.disableHooks();

    this.frameId = frameId;

    this.hookEventListenerFn = this.hookEventListener.bind(this);
    document.addEventListener("click", this.hookEventListenerFn);

    return this;
  }

  public disableHooks() {
    this.frameId = null;
    if (this.hookEventListenerFn) {
      document.removeEventListener("click", this.hookEventListenerFn);
    }
    return this;
  }

  private hookToggle() {
    this.frames![this.frameId!]?.toggle();
  }

  private hookResize(size: string) {
    this.frames![this.frameId!]?.resize(size);
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
