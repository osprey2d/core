import { createMid, residual } from '../utils/index'

// class Point {
//   x: number
//   y: number
//   mid: string
//   constructor({ x, y, mid }: any) {
//     this.x = x
//     this.y = y
//     this.mid = mid || createMid()
//     this.changeElement = this.changeElement.bind(this)
//   }
//   /**
//    *
//    * @param param0 数学坐标
//    * @param isResidual 是否启用吸附
//    */
//   changeElement({ x, y }: any, isResidual: boolean): void {
//     this.x = isResidual ? residual(x) : x
//     this.y = isResidual ? residual(y) : y
//   }
// }

class Point {
  _type: number
  _x: number
  _y: number
  _r: number
  _mid: string
  constructor({ _x, _y, _r = 5, _mid }: any) {
    this._type = 0
    this._x = _x
    this._y = _y
    this._r = _r
    this._mid = _mid || createMid()
  }
  /**
   *
   * @param { _x, _y } 数学坐标
   * @param isResidual 是否启用吸附
   */
  changeElement({ _x, _y }: any, isResidual: boolean = false): void {
    this._x = isResidual ? residual(_x) : _x
    this._y = isResidual ? residual(_y) : _y
  }
}

export default Point
