/**
 * @file chartUtils.ts
 * @description Pure geometric algorithms and SVG curve path calculations
 * supporting responsive visual data charts.
 */

export interface Point2D {
  cx: number;
  cy: number;
}

/**
 * Catmull-Rom to cubic Bézier spline conversion.
 * Produces smooth, organic curvature through a series of discrete 2D points.
 */
export const smoothPath = (pts: Point2D[]): string => {
  if (pts.length === 0) return "";
  if (pts.length < 2) return pts.map((p) => `M${p.cx},${p.cy}`).join(" ");

  let d = `M${pts[0].cx.toFixed(2)},${pts[0].cy.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;

    const cp1x = p1.cx + (p2.cx - p0.cx) / 6;
    const cp1y = p1.cy + (p2.cy - p0.cy) / 6;
    const cp2x = p2.cx - (p3.cx - p1.cx) / 6;
    const cp2y = p2.cy - (p3.cy - p1.cy) / 6;

    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.cx.toFixed(2)},${p2.cy.toFixed(2)}`;
  }
  return d;
};

/**
 * Calculates linear scale coordinate projection from domain interval to range interval.
 */
export const scaleLinear = (
  value: number,
  domain: [number, number],
  range: [number, number],
): number => {
  const [dMin, dMax] = domain;
  const [rMin, rMax] = range;
  const span = dMax - dMin || 1;
  return rMin + ((value - dMin) / span) * (rMax - rMin);
};
