import { AnimalPath, Crossing, Point } from '../types/game';
import { evaluateCubicBezier, evaluateCubicBezierTangent } from './BezierBuilder';

interface PolySample {
  point: Point;
  segmentIndex: number;
  t: number;
}

function samplePath(path: AnimalPath, stepsPerSegment = 22): PolySample[] {
  const samples: PolySample[] = [];
  path.segments.forEach((seg, segIdx) => {
    for (let i = 0; i < stepsPerSegment; i++) {
      const t = i / stepsPerSegment;
      samples.push({
        point: evaluateCubicBezier(seg, t),
        segmentIndex: segIdx,
        t,
      });
    }
  });
  const lastSeg = path.segments[path.segments.length - 1];
  if (lastSeg) {
    samples.push({
      point: evaluateCubicBezier(lastSeg, 1),
      segmentIndex: path.segments.length - 1,
      t: 1,
    });
  }
  return samples;
}

function lineSegmentIntersection(
  a1: Point,
  a2: Point,
  b1: Point,
  b2: Point
): { point: Point; ua: number; ub: number } | null {
  const denom = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
  if (Math.abs(denom) < 1e-6) return null;

  const ua = ((b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x)) / denom;
  const ub = ((a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x)) / denom;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return {
      point: {
        x: a1.x + ua * (a2.x - a1.x),
        y: a1.y + ua * (a2.y - a1.y),
      },
      ua,
      ub,
    };
  }
  return null;
}

function distance(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function detectCrossings(paths: AnimalPath[]): Crossing[] {
  const sampled = paths.map((p) => ({
    path: p,
    samples: samplePath(p, 22),
  }));

  const crossings: Crossing[] = [];
  const minSpacing = 26;

  for (let i = 0; i < sampled.length; i++) {
    for (let j = i + 1; j < sampled.length; j++) {
      const pathA = sampled[i];
      const pathB = sampled[j];

      for (let sa = 0; sa < pathA.samples.length - 1; sa++) {
        const a1 = pathA.samples[sa];
        const a2 = pathA.samples[sa + 1];

        for (let sb = 0; sb < pathB.samples.length - 1; sb++) {
          const b1 = pathB.samples[sb];
          const b2 = pathB.samples[sb + 1];

          const hit = lineSegmentIntersection(a1.point, a2.point, b1.point, b2.point);
          if (!hit) continue;

          // Ignore intersections too close to start or end
          if (
            distance(hit.point, pathA.path.startPoint) < 28 ||
            distance(hit.point, pathA.path.endPoint) < 28 ||
            distance(hit.point, pathB.path.startPoint) < 28 ||
            distance(hit.point, pathB.path.endPoint) < 28
          ) {
            continue;
          }

          // Avoid clustered crossings
          const tooClose = crossings.some((c) => distance(c.point, hit.point) < minSpacing);
          if (tooClose) continue;

          const tA = a1.t + hit.ua * (a2.t - a1.t || 1 / 22);
          const tB = b1.t + hit.ub * (b2.t - b1.t || 1 / 22);

          const tanA = evaluateCubicBezierTangent(
            pathA.path.segments[a1.segmentIndex],
            Math.min(1, Math.max(0, tA))
          );
          const tanB = evaluateCubicBezierTangent(
            pathB.path.segments[b1.segmentIndex],
            Math.min(1, Math.max(0, tB))
          );

          const angleA = Math.atan2(tanA.y, tanA.x);
          const angleB = Math.atan2(tanB.y, tanB.x);

          const aIsTop = Math.random() > 0.5;

          crossings.push({
            id: `cross-${i}-${j}-${crossings.length}`,
            point: hit.point,
            topAnimalId: aIsTop ? pathA.path.animalId : pathB.path.animalId,
            bottomAnimalId: aIsTop ? pathB.path.animalId : pathA.path.animalId,
            topAngleRad: aIsTop ? angleA : angleB,
            bottomAngleRad: aIsTop ? angleB : angleA,
            topSegmentIndex: aIsTop ? a1.segmentIndex : b1.segmentIndex,
            bottomSegmentIndex: aIsTop ? b1.segmentIndex : a1.segmentIndex,
            topT: aIsTop ? tA : tB,
            bottomT: aIsTop ? tB : tA,
          });
        }
      }
    }
  }

  return crossings;
}