export type ViewType = "table" | "grouped table" | "tiles";

export type GroupedDataType = Array<{ postId: string; comments: Comment[] }>;

export type MeasurementViewType = "table" | "tiles";

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Measurement {
  id: string;
  type: ViewType;
  phase: "mount" | "update";
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  interactions: Set<any>;
  fetchDuration?: number;
  createdAt?: number;
}
