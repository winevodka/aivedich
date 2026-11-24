import {
  AnimalPath,
  BridgeArc,
  Crossing,
  Point,
  RenderedPathPiece,
} from '../types/game';
import { evaluateCubicBezier } from './BezierBuilder';

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pointsToSvgPath(pts: Point[]): string {
  if (pts.length < 2) return '';
  return pts
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');
}

export function buildBridgesAndCutPaths(
  paths: AnimalPath[],
  crossings: Crossing[]
): { renderedPieces: RenderedPathPiece[]; bridges: BridgeArc[] } {
  const renderedPieces: RenderedPathPiece[] = [];
  const bridges: BridgeArc[] = [];
  const cutRadius = 13;

  paths.forEach((path) => {
    const densePoints: Point[] = [];
    const steps = 26;

    path.segments.forEach((seg) => {
      for (let i = 0; i < steps; i++) {
        densePoints.push(evaluateCubicBezier(seg, i / steps));
      }
    });
    const lastSeg = path.segments[path.segments.length - 1];
    if (lastSeg) {
      densePoints.push(evaluateCubicBezier(lastSeg, 1));
    }

    const underCrossings = crossings.filter((c) => c.bottomAnimalId === path.animalId);

    // Split path into continuous visible chunks, cutting gaps beneath crossings
    let currentChunk: Point[] = [];
    let pieceIndex = 0;

    for (let i = 0; i < densePoints.length; i++) {
      const pt = densePoints[i];
      const isInsideGap = underCrossings.some((c) => distance(pt, c.point) < cutRadius);

      if (isInsideGap) {
        if (currentChunk.length >= 2) {
          renderedPieces.push({
            id: `${path.animalId}-piece-${pieceIndex++}`,
            animalId: path.animalId,
            d: pointsToSvgPath(currentChunk),
            layer: 'under',
          });
        }
        currentChunk = [];
      } else {
        currentChunk.push(pt);
      }
    }

    if (currentChunk.length >= 2) {
      renderedPieces.push({
        id: `${path.animalId}-piece-${pieceIndex++}`,
        animalId: path.animalId,
        d: pointsToSvgPath(currentChunk),
        layer: 'under',
      });
    }
  });

  // Create raised bridge arcs for the top path at each crossing
  crossings.forEach((c) => {
    const bridgeHalf = 15;
    const cos = Math.cos(c.topAngleRad);
    const sin = Math.sin(c.topAngleRad);

    // Perpendicular normal for subtle bridge lift
    const nx = -sin;
    const ny = cos;
    const lift = 6.5;

    const start: Point = {
      x: c.point.x - cos * bridgeHalf,
      y: c.point.y - sin * bridgeHalf,
    };
    const end: Point = {
      x: c.point.x + cos * bridgeHalf,
      y: c.point.y + sin * bridgeHalf,
    };
    const ctrl: Point = {
      x: c.point.x + nx * lift,
      y: c.point.y + ny * lift,
    };

    const arcD = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${ctrl.x.toFixed(
      1
    )} ${ctrl.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;

    bridges.push({
      id: `bridge-${c.id}`,
      animalId: c.topAnimalId,
      d: arcD,
      underlayD: arcD,
    });
  });

  return { renderedPieces, bridges };
}