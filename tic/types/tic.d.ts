// == TIC-80 API Types ==

// ░░ Básico do sistema ░░
declare function cls(color?: number): void;
declare function print(
  text: string,
  x?: number,
  y?: number,
  color?: number,
  fixed?: boolean,
  scale?: number,
  smallfont?: boolean
): number;
declare function trace(msg: string, color?: number): void;
declare function time(): number;
declare function tstamp(): number;

// ░░ Entrada ░░
declare function btn(id: number): boolean;
declare function btnp(id: number, hold?: number, period?: number): boolean;
declare function key(code?: number): boolean;
declare function keyp(code?: number, hold?: number, period?: number): boolean;
declare function mouse(): { x: number; y: number; left: boolean; right: boolean; middle: boolean };

// ░░ Desenho ░░
declare function pix(x: number, y: number, color?: number): number;
declare function line(x0: number, y0: number, x1: number, y1: number, color: number): void;
declare function rect(x: number, y: number, w: number, h: number, color: number): void;
declare function rectb(x: number, y: number, w: number, h: number, color: number): void;
declare function circ(x: number, y: number, radius: number, color: number): void;
declare function circb(x: number, y: number, radius: number, color: number): void;
declare function tri(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  color: number
): void;
declare function trib(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  color: number
): void;

// ░░ Sprites e Mapas ░░
declare function spr(
  id: number,
  x: number,
  y: number,
  colorkey?: number,
  scale?: number,
  flip?: number,
  rotate?: number,
  w?: number,
  h?: number
): void;
declare function map(
  x?: number,
  y?: number,
  w?: number,
  h?: number,
  sx?: number,
  sy?: number,
  colorkey?: number,
  scale?: number,
  remap?: (tile: number) => number
): void;
declare function mget(x: number, y: number): number;
declare function mset(x: number, y: number, value: number): void;

// ░░ Som ░░
declare function sfx(
  id: number,
  note?: number,
  duration?: number,
  channel?: number,
  volume?: number,
  speed?: number
): void;
declare function music(
  track: number,
  frame?: number,
  row?: number,
  loop?: boolean,
  sustain?: boolean
): void;

// ░░ Memória ░░
declare function peek(addr: number): number;
declare function poke(addr: number, val: number): void;
declare function memcpy(dst: number, src: number, size: number): void;
declare function memset(addr: number, val: number, size: number): void;

// ░░ Dados ░░
declare function pmem(index: number, value?: number): number;
declare function sync(mask?: number, bank?: number, toCart?: boolean): void;

// ░░ Texto ░░
declare function font(
  text: string,
  x: number,
  y: number,
  color?: number,
  background?: number,
  scale?: number,
  fixed?: boolean,
  smallfont?: boolean
): number;

// ░░ Outros ░░
declare function reset(): void;
declare function exit(): void;
declare function reload(addr?: number, size?: number, bank?: number): void;
declare function run(): void;

// ░░ Math extra do TIC-80 ░░
declare const pi: number;
declare const cos: (angle: number) => number;
declare const sin: (angle: number) => number;
declare const atan2: (dy: number, dx: number) => number;
declare const sqrt: (val: number) => number;
declare const abs: (val: number) => number;
declare const min: (...args: number[]) => number;
declare const max: (...args: number[]) => number;
declare const mid: (a: number, b: number, c: number) => number;
declare const rnd: (max?: number) => number;
declare const srand: (seed: number) => void;

// ░░ Função chamada a cada frame no TIC-80 ░░
declare function TIC(): void;
