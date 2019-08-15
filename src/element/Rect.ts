import { createMid } from '../utils/index'

interface RectInterface {
  _mid: string
  _ctrls: any[]
  _type: number
  changePosition(params: any): any
  changeControlPoint(params: any): any
}
class Rect implements RectInterface {
  _mid: string
  _ctrls: any[]
  _type = 9
  constructor({ start, end }: any) {
    this._mid = createMid()
    this._ctrls = [
      { x: start.x, y: start.y },
      { x: start.x + (end.x - start.x) / 2, y: start.y },
      { x: end.x, y: start.y },
      { x: start.x, y: start.y + (end.y - start.y) / 2 },
      { x: end.x, y: start.y + (end.y - start.y) / 2 },
      { x: start.x, y: end.y },
      { x: start.x + (end.x - start.x) / 2, y: end.y },
      { x: end.x, y: end.y }
    ]
  }
  changePosition({ ev, rx, ry }: any): any {
    let _ctrls = this._ctrls.concat()
    const _w = _ctrls[7].x - _ctrls[0].x
    const _h = _ctrls[7].y - _ctrls[0].y
    const _x = ev.x - rx
    const _y = ev.y - ry
    _ctrls[0].x = _x
    _ctrls[0].y = _y
    _ctrls[1].x = _x + _w / 2
    _ctrls[1].y = _y
    _ctrls[2].x = _x + _w
    _ctrls[2].y = _y
    _ctrls[3].x = _x
    _ctrls[3].y = _y + _h / 2
    _ctrls[4].x = _x + _w
    _ctrls[4].y = _y + _h / 2
    _ctrls[5].x = _x
    _ctrls[5].y = _y + _h
    _ctrls[6].x = _x + _w / 2
    _ctrls[6].y = _y + _h
    _ctrls[7].x = _x + _w
    _ctrls[7].y = _y + _h
    this._ctrls = _ctrls
  }
  changeControlPoint({ n, ev }: any): any {
    let _ctrls = this._ctrls.concat()
    const x1 = _ctrls[0].x
    const y1 = _ctrls[0].y
    const x2 = _ctrls[7].x
    const y2 = _ctrls[7].y
    const R = 8 // 范围
    switch (n) {
      case 0:
        _ctrls[0].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[0].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[1].x = x2 - ev.x >= R ? ev.x + (x2 - ev.x) / 2 : x2 - R / 2
        _ctrls[1].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[2].x = x2
        _ctrls[2].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[3].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[3].y = y2 - ev.y >= R ? ev.y + (y2 - ev.y) / 2 : y2 - R / 2
        _ctrls[4].x = x2
        _ctrls[4].y = y2 - ev.y >= R ? ev.y + (y2 - ev.y) / 2 : y2 - R / 2
        _ctrls[5].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[5].y = y2
        _ctrls[6].x = x2 - ev.x >= R ? ev.x + (x2 - ev.x) / 2 : x2 - R / 2
        _ctrls[6].y = y2
        _ctrls[7].x = x2
        _ctrls[7].y = y2
        break
      case 1:
        _ctrls[0].x = x1
        _ctrls[0].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[1].x = x1 + (x2 - x1) / 2
        _ctrls[1].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[2].x = x2
        _ctrls[2].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[3].x = x1
        _ctrls[3].y = y2 - ev.y >= R ? ev.y + (y2 - ev.y) / 2 : y2 - R / 2
        _ctrls[4].x = x2
        _ctrls[4].y = y2 - ev.y >= R ? ev.y + (y2 - ev.y) / 2 : y2 - R / 2
        _ctrls[5].x = x1
        _ctrls[5].y = y2
        _ctrls[6].x = x1 + (x2 - x1) / 2
        _ctrls[6].y = y2
        _ctrls[7].x = x2
        _ctrls[7].y = y2
        break
      case 2:
        _ctrls[0].x = x1
        _ctrls[0].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[1].x = ev.x - x1 >= R ? x1 + (ev.x - x1) / 2 : x1 + R / 2
        _ctrls[1].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[2].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[2].y = y2 - ev.y >= R ? ev.y : y2 - R
        _ctrls[3].x = x1
        _ctrls[3].y = y2 - ev.y >= R ? ev.y + (y2 - ev.y) / 2 : y2 - R / 2
        _ctrls[4].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[4].y = y2 - ev.y >= R ? ev.y + (y2 - ev.y) / 2 : y2 - R / 2
        _ctrls[5].x = x1
        _ctrls[5].y = y2
        _ctrls[6].x = x1 + (x2 - x1) / 2
        _ctrls[6].y = y2
        _ctrls[7].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[7].y = y2
        break
      case 3:
        _ctrls[0].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[0].y = y1
        _ctrls[1].x = x2 - ev.x >= R ? ev.x + (x2 - ev.x) / 2 : x2 - R / 2
        _ctrls[1].y = y1
        _ctrls[2].x = x2
        _ctrls[2].y = y1
        _ctrls[3].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[3].y = y1 + (y2 - y1) / 2
        _ctrls[4].x = x2
        _ctrls[4].y = y1 + (y2 - y1) / 2
        _ctrls[5].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[5].y = y2
        _ctrls[6].x = x2 - ev.x >= R ? ev.x + (x2 - ev.x) / 2 : x2 - R / 2
        _ctrls[6].y = y2
        _ctrls[7].x = x2
        _ctrls[7].y = y2
        break
      case 4:
        _ctrls[0].x = x1
        _ctrls[0].y = y1
        _ctrls[1].x = ev.x - x1 >= R ? x1 + (ev.x - x1) / 2 : x1 + R / 2
        _ctrls[1].y = y1
        _ctrls[2].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[2].y = y1
        _ctrls[3].x = x1
        _ctrls[3].y = y1 + (y2 - y1) / 2
        _ctrls[4].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[4].y = y1 + (y2 - y1) / 2
        _ctrls[5].x = x1
        _ctrls[5].y = y2
        _ctrls[6].x = ev.x - x1 >= R ? x1 + (ev.x - x1) / 2 : x1 + R / 2
        _ctrls[6].y = y2
        _ctrls[7].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[7].y = y2
        break
      case 5:
        _ctrls[0].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[0].y = y1
        _ctrls[1].x = x2 - ev.x >= R ? ev.x + (x2 - ev.x) / 2 : x2 - R / 2
        _ctrls[1].y = y1
        _ctrls[2].x = x2
        _ctrls[2].y = y1
        _ctrls[3].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[3].y = ev.y - y1 >= R ? y1 + (ev.y - y1) / 2 : y1 + R / 2
        _ctrls[4].x = x2
        _ctrls[4].y = ev.y - y1 >= R ? y1 + (ev.y - y1) / 2 : y1 + R / 2
        _ctrls[5].x = x2 - ev.x >= R ? ev.x : x2 - R
        _ctrls[5].y = ev.y - y1 >= R ? ev.y : y1 + R
        _ctrls[6].x = x2 - ev.x >= R ? ev.x + (x2 - ev.x) / 2 : x2 - R / 2
        _ctrls[6].y = ev.y - y1 >= R ? ev.y : y1 + R
        _ctrls[7].x = x2
        _ctrls[7].y = ev.y - y1 >= R ? ev.y : y1 + R
        break
      case 6:
        _ctrls[0].x = x1
        _ctrls[0].y = y1
        _ctrls[1].x = x1 + (x2 - x1) / 2
        _ctrls[1].y = y1
        _ctrls[2].x = x2
        _ctrls[2].y = y1
        _ctrls[3].x = x1
        _ctrls[3].y = ev.y - y1 >= R ? y1 + (ev.y - y1) / 2 : y1 + R / 2
        _ctrls[4].x = x2
        _ctrls[4].y = ev.y - y1 >= R ? y1 + (ev.y - y1) / 2 : y1 + R / 2
        _ctrls[5].x = x1
        _ctrls[5].y = ev.y - y1 >= R ? ev.y : y1 + R
        _ctrls[6].x = x1 + (x2 - x1) / 2
        _ctrls[6].y = ev.y - y1 >= R ? ev.y : y1 + R
        _ctrls[7].x = x2
        _ctrls[7].y = ev.y - y1 >= R ? ev.y : y1 + R
        break
      case 7:
        _ctrls[0].x = x1
        _ctrls[0].y = y1
        _ctrls[1].x = ev.x - x1 >= R ? x1 + (ev.x - x1) / 2 : x1 + R / 2
        _ctrls[1].y = y1
        _ctrls[2].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[2].y = y1
        _ctrls[3].x = x1
        _ctrls[3].y = ev.y - y1 >= R ? y1 + (ev.y - y1) / 2 : y1 + R / 2
        _ctrls[4].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[4].y = ev.y - y1 >= R ? y1 + (ev.y - y1) / 2 : y1 + R / 2
        _ctrls[5].x = x1
        _ctrls[5].y = ev.y - y1 >= R ? ev.y : y1 + R
        _ctrls[6].x = ev.x - x1 >= R ? x1 + (ev.x - x1) / 2 : x1 + R / 2
        _ctrls[6].y = ev.y - y1 >= R ? ev.y : y1 + R
        _ctrls[7].x = ev.x - x1 >= R ? ev.x : x1 + R
        _ctrls[7].y = ev.y - y1 >= R ? ev.y : y1 + R
        break

      default:
        break
    }
    this._ctrls = _ctrls
  }
}

export default Rect
