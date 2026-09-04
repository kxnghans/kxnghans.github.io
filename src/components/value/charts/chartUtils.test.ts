import { describe, it, expect } from "vitest";
import { smoothPath, scaleLinear, type Point2D } from "./chartUtils";

describe("chartUtils", () => {
  describe("smoothPath", () => {
    it("returns empty string when given empty array", () => {
      expect(smoothPath([])).toBe("");
    });

    it("returns M coordinates when given a single point", () => {
      const singlePoint: Point2D[] = [{ cx: 10, cy: 20 }];
      expect(smoothPath(singlePoint)).toBe("M10,20");
    });

    it("generates a smooth Catmull-Rom cubic Bezier path for multiple points", () => {
      const points: Point2D[] = [
        { cx: 0, cy: 0 },
        { cx: 50, cy: 100 },
        { cx: 100, cy: 50 },
      ];
      const path = smoothPath(points);
      expect(path).toContain("M0.00,0.00");
      expect(path).toContain("C");
      expect(path).toContain("100.00,50.00");
    });
  });

  describe("scaleLinear", () => {
    it("projects values linearly across domains", () => {
      // 5 on [0, 10] mapped to [0, 100] -> 50
      expect(scaleLinear(5, [0, 10], [0, 100])).toBe(50);
      // Min domain maps to min range
      expect(scaleLinear(0, [0, 10], [10, 20])).toBe(10);
      // Max domain maps to max range
      expect(scaleLinear(10, [0, 10], [10, 20])).toBe(20);
    });

    it("handles zero span domain gracefully without dividing by zero", () => {
      expect(scaleLinear(10, [10, 10], [0, 100])).toBe(0);
    });
  });
});
