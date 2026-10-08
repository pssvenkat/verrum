import { describe, expect, it } from "vitest";
import { calculateCounterDelta, measured, missing } from "./calculations";

describe("counter calculations", () => {
  it("calculates measured cumulative deltas", () => {
    const result = calculateCounterDelta(measured(10, "h"), measured(14.5, "h"));

    expect(result.delta).toEqual({ value: 4.5, unit: "h", state: "measured" });
    expect(result.issue).toBeUndefined();
  });

  it("does not manufacture a correction when a counter moves backwards", () => {
    const result = calculateCounterDelta(measured(14.5, "h"), measured(10, "h"));

    expect(result.delta.value).toBeNull();
    expect(result.delta.state).toBe("unavailable");
    expect(result.issue).toBe("counter_moved_backwards");
  });

  it("keeps missing data distinct from zero", () => {
    const result = calculateCounterDelta(missing("no_reading", "h"), measured(10, "h"));

    expect(result.delta.value).toBeNull();
    expect(result.delta.state).toBe("no_reading");
    expect(result.issue).toBe("missing_reading");
  });
});
