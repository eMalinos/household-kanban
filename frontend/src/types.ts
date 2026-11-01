export type Priority = 1 | 2 | 3;
export interface Parent {
  id: string; entity_id: string; name: string; icon: string; color: string; collapse: boolean;
}
export interface Item {
  uid: string; parent: string; summary: string; description: string;
  status: "needs_action" | "completed";
  due: string | null; priority: Priority; assignee: string | null;
  created_at: string; completed_at: string | null; moved: number; raised: boolean;
}
export type EodMode = "keep" | "overdue" | "move" | "raise";
export interface Board { parents: Parent[]; items: Item[]; end_of_day_mode: EodMode }
