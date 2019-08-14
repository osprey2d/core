import { createMid } from '../utils/index'

class Line {
  _type: number
  _ctrls: number[]
  _mid: string
  _startMid: string
  _endMid: string
  constructor({ start, end, _startMid, _endMid, _ctrls, _mid }: any) {
    this._type = 1
    this._startMid = _startMid
    this._endMid = _endMid
    this._mid = _mid || createMid()
    this._ctrls = _ctrls || [
      start.x,
      start.y,
      end.x,
      end.y,
      start.x + (end.x - start.x) / 2,
      start.y + (end.y - start.y) / 2,
      start.x + (end.x - start.x) / 2,
      start.y + (end.y - start.y) / 2
    ]
  }
  changeControlPoint({ type, ev }: any): any {
    // 修改控制点
    const { x, y } = ev
    let _ctrls = this._ctrls.concat()
    switch (type) {
      case 1:
        // 移动靠近起点的控制点
        _ctrls[4] = x
        _ctrls[5] = y
        break
      case 2:
        // 移动靠近终点的控制点
        _ctrls[6] = x
        _ctrls[7] = y
        break
      case 3:
        // 同时移动两个的控制点
        _ctrls[4] = x
        _ctrls[5] = y
        _ctrls[6] = x
        _ctrls[7] = y
        break
      default:
        break
    }
    this._ctrls = _ctrls
  }
  resetControlPoints(): void {
    const [startX, startY, endX, endY] = this._ctrls
    this._ctrls = [
      startX,
      startY,
      endX,
      endY,
      startX + (endX - startX) / 2,
      startY + (endY - startY) / 2,
      startX + (endX - startX) / 2,
      startY + (endY - startY) / 2
    ]
  }
  changeBoundaryPoint({ type, ev }: any): any {
    // 修改起点和终点
    const { x, y } = ev
    let _ctrls = this._ctrls.concat()
    if (type === 'start') {
      _ctrls[0] = x
      _ctrls[1] = y
      _ctrls[4] = x + (_ctrls[2] - x) / 2
      ;(_ctrls[5] = y + (_ctrls[3] - y) / 2),
        (_ctrls[6] = x + (_ctrls[2] - x) / 2),
        (_ctrls[7] = y + (_ctrls[3] - y) / 2)
    }
    if (type === 'end') {
      _ctrls[2] = x
      _ctrls[3] = y
      _ctrls[4] = _ctrls[0] + (x - _ctrls[0]) / 2
      _ctrls[5] = _ctrls[1] + (y - _ctrls[1]) / 2
      _ctrls[6] = _ctrls[0] + (x - _ctrls[0]) / 2
      _ctrls[7] = _ctrls[1] + (y - _ctrls[1]) / 2
    }
    this._ctrls = _ctrls
  }
}

export default Line
