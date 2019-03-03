export interface IPosition {
  x: number;
  y: number;
}

export class Position implements IPosition {
  constructor(public x: number, public y: number) {}

  static fromEvent(e: MouseEvent | TouchEvent, el: any = null) {
    if (e instanceof MouseEvent) {
      return new Position(e.clientX, e.clientY);
    } else {
      if (el === null || e.changedTouches.length === 1) {
        return new Position(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }

      /**
       * Fix issue: Multiple phone draggables at the same time
       * https://github.com/xieziyu/angular2-draggable/issues/128
       */
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].target === el) {
          return new Position(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        }
      }
    }
  }

  static isIPosition(obj): obj is IPosition {
    return !!obj && 'x' in obj && 'y' in obj;
  }

  static getCurrent(el: Element) {
    let pos = new Position(0, 0);

    if (window) {
      const computed = window.getComputedStyle(el);
      if (computed) {
        let x = parseInt(computed.getPropertyValue('left'), 10);
        let y = parseInt(computed.getPropertyValue('top'), 10);
        pos.x = isNaN(x) ? 0 : x;
        pos.y = isNaN(y) ? 0 : y;
      }
      return pos;
    } else {
      console.error('Not Supported!');
      return null;
    }
  }

  static copy(p: IPosition) {
    return new Position(0, 0).set(p);
  }

  get value(): IPosition {
    return { x: this.x, y: this.y };
  }

  add(p: IPosition) {
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  subtract(p: IPosition) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  set(p: IPosition) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }
}
