import { describe, expect, test } from "vitest";
import { dueTime, toDue } from "../src/logic/dates";
import { changedFields, draftOf, fieldsOf, quickDate } from "../src/ui/detail-dialog";
import type { Item } from "../src/types";

const item: Item = {
  uid: "u1", parent: "household", summary: "x", description: "", status: "needs_action", due: "2026-11-05T10:00:00+01:00",
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 1, raised: false,
};

describe("due value", () => {
  test("date only stays a date", () => expect(toDue("2026-11-05", "")).toBe("2026-11-05"));
  test("no date means no due, even with a time", () => expect(toDue("", "10:00")).toBeNull());
  test("time gives a local ISO datetime with offset (winter and summer)", () => {
    expect(toDue("2026-11-05", "10:00")).toBe("2026-11-05T10:00:00+01:00");
    expect(toDue("2026-07-05", "09:30")).toBe("2026-07-05T09:30:00+02:00");
  });
  test("dueTime reads the local time back", () => {
    expect(dueTime("2026-11-05T10:00:00+01:00")).toBe("10:00");
    expect(dueTime("2026-11-05")).toBe("");
  });
});

describe("quick dates", () => {
  test("weekend is the next Saturday, today if Saturday", () => {
    expect(quickDate("weekend", new Date(2026, 10, 1))).toBe("2026-11-07"); // Sunday
    expect(quickDate("weekend", new Date(2026, 10, 7))).toBe("2026-11-07"); // Saturday
    expect(quickDate("weekend", new Date(2026, 10, 4))).toBe("2026-11-07"); // Wednesday
  });
  test("today, tomorrow, none", () => {
    const now = new Date(2026, 10, 30, 22, 0);
    expect(quickDate("today", now)).toBe("2026-11-30");
    expect(quickDate("tomorrow", now)).toBe("2026-12-01");
    expect(quickDate("none", now)).toBe("");
  });
});

describe("changedFields", () => {
  test("an untouched draft sends nothing", () => expect(changedFields(item, draftOf(item))).toEqual({}));
  test("only edited fields are sent", () => {
    const d = { ...draftOf(item), summary: "y", date: "", time: "" };
    expect(changedFields(item, d)).toEqual({ summary: "y", due: null });
  });
  test("create sends a trimmed summary and the due", () => {
    expect(fieldsOf({ ...draftOf(item), summary: " hi " })).toMatchObject({ summary: "hi", due: "2026-11-05T10:00:00+01:00", parent: "household" });
  });
});
