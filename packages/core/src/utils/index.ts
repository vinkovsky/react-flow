import type { Dimensions, XYPosition, CoordinateExtent, Box, Rect } from '../types';

export const getDimensions = (node: HTMLDivElement): Dimensions => ({
  width: node.offsetWidth,
  height: node.offsetHeight,
});

export const clamp = (val: number, min = 0, max = 1): number => Math.min(Math.max(val, min), max);

export const clampPosition = (position: XYPosition = { x: 0, y: 0 }, extent: CoordinateExtent) => ({
  x: clamp(position.x, extent[0][0], extent[1][0]),
  y: clamp(position.y, extent[0][1], extent[1][1]),
});

export const getHostForElement = (element: HTMLElement): Document | ShadowRoot =>
  (element.getRootNode?.() as Document | ShadowRoot) || window?.document;

export const getBoundsOfBoxes = (box1: Box, box2: Box): Box => ({
  x: Math.min(box1.x, box2.x),
  y: Math.min(box1.y, box2.y),
  x2: Math.max(box1.x2, box2.x2),
  y2: Math.max(box1.y2, box2.y2),
});

export const rectToBox = ({ x, y, width, height }: Rect): Box => ({
  x,
  y,
  x2: x + width,
  y2: y + height,
});

export const boxToRect = ({ x, y, x2, y2 }: Box): Rect => ({
  x,
  y,
  width: x2 - x,
  height: y2 - y,
});

export const getBoundsOfRects = (rect1: Rect, rect2: Rect): Rect =>
  boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const isNumeric = (n: any): n is number => !isNaN(n) && isFinite(n);

export const internalsSymbol = Symbol.for('internals');

// used for a11y key board controls for nodes and edges
export const elementSelectionKeys = ['Enter', ' ', 'Escape'];

export const devWarn = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[React Flow]: ${message}`);
  }
};
