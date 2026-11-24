import { AnimalPath, CubicBezierSegment, Point } from '../types/game';
import { RawAnimalWaypoints } from './PathGenerator';

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function buildSmoothBezierSegments(waypoints: Point[]): CubicBezierSegment[] {
  if (waypoints.length < 2) return [];

  const segments: CubicBezierSegment[] = [];
  const tension = 0.24;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const pPrev = waypoints[Math.max(0, i - 1)];
    const p0 = waypoints[i];
    const p1 = waypoints[i + 1];
    const pNext = waypoints[Math.min(waypoints.length - 1, i + 2)];

    const c1: Point = {
      x: clamp(p0.x + (p1.x - pPrev.x) * tension, 20, 580),
      y: clamp(p0.y + (p1.y - pPrev.y) * tension, 24, 576),
    };

    const c2: Point = {
      x: clamp(p1.x - (pNext.x - p0.x) * tension, 20, 580),
      y: clamp(p1.y - (pNext.y - p0.y) * tension, 24, 576),
    };

    segments.push({ p0, c1, c2, p1 });
  }

  return segments;
}

export function buildAnimalPaths(rawList: RawAnimalWaypoints[]): AnimalPath[] {
  return rawList.map((raw) => ({
    animalId: raw.animalId,
    segments: buildSmoothBezierSegments(raw.waypoints),
    isWinner: raw.isWinner,
    startPoint: raw.waypoints[0],
    endPoint: raw.waypoints[raw.waypoints.length - 1],
  }));
}

export function evaluateCubicBezier(seg: CubicBezierSegment, t: number): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * seg.p0.x + 3 * uu * t * seg.c1.x + 3 * u * tt * seg.c2.x + ttt * seg.p1.x,
    y: uuu * seg.p0.y + 3 * uu * t * seg.c1.y + 3 * u * tt * seg.c2.y + ttt * seg.p1.y,
  };
}

export function evaluateCubicBezierTangent(seg: CubicBezierSegment, t: number): Point {
  const u = 1 - t;
  return {
    x:
      3 * u * u * (seg.c1.x - seg.p0.x) +
      6 * u * t * (seg.c2.x - seg.c1.x) +
      3 * t * t * (seg.p1.x - seg.c2.x),
    y:
      3 * u * u * (seg.c1.y - seg.p0.y) +
      6 * u * t * (seg.c2.y - seg.c1.y) +
      3 * t * t * (seg.p1.y - seg.c2.y),
  };
}