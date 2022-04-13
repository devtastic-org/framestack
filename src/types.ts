export interface NonNullFrameStackConfig {
  sizes: Record<string, { width: number; height: number }>;
}

export type FrameStackConfig = Partial<NonNullFrameStackConfig>;

export interface NonNullFrameConfig {
  url: string;
  size: string | { width: number; height: number };
  background: string;
  shadow: boolean;
  position: {
    top: string | number;
    right: string | number;
    bottom: string | number;
    left: string | number;
  };
}

export type FrameConfig = Partial<Omit<NonNullFrameConfig, "url" | "size">> &
  Pick<NonNullFrameConfig, "url" | "size"> & { id?: string };

export interface FrameMessage {
  type: string;
  payload?: any;
  meta?: any;
}
