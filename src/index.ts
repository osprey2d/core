import Point from './element/Point'
import { stackControl, handleActive } from './utils/index'

class Osprey {
  elementHooks: any = {}
  elementStack: any[] = []
  pointIndex: number = 0
  /**
   * 安装插件的方法
   * @param config
   */
  use(config: any) {
    this.elementHooks = Object.assign({}, config)
  }
  createPoint({ _x, _y, _r, _mid, ...config }: any) {
    this.pointIndex = config._nameIndex ? config._nameIndex : this.pointIndex++
    const p = new Point({ _x, _y, _r, _mid })
    // 如果有钩子函数注入，则执行钩子函数
    const fn = this.elementHooks.createdPoint
    const point =
      typeof fn == 'function'
        ? Object.assign(
            p,
            fn(p, Object.assign(config, { _nameIndex: this.pointIndex }))
          )
        : Object.assign(p, { _nameIndex: this.pointIndex })

    const handles: any = {
      set: (target: any, key: string, value: any): any => {
        // 如果属性有修改，则触发钩子函数
        // 可以修改任何属性
        target[key] = value
        this.changePointAttribute(target._mid, key)
        return true
      }
    }
    const proxyPoint = new Proxy(point, handles)
    const [arr, mid] = stackControl(this.elementStack, proxyPoint)
    this.elementStack = arr
    return this.elementStack
  }

  /**
   * 利用多态性修改元素属性
   * @param config 新属性
   * @param index  元素所在集合的下标
   * @return 元素集合
   */
  changeElement(config: any, index: number): any[] {
    this.elementStack[index].changeElement(config)
    return this.elementStack
  }
  changePointAttribute(mid: string, key: string) {
    // 联动修改线的数学属性
    this.elementStack.forEach(element => {
      // console.log('{{{', element.mark)
    })
    // 联动修改线的业务属性
    const fn = this.elementHooks.changePointAttribute
    if (!fn) {
      return this.elementStack
    }
    this.elementStack = fn(this.elementStack, key, mid)
    return this.elementStack
  }
  moveElements(
    indexList: number[],
    { x, y }: any,
    elementOffset: any[]
  ): any[] {
    if (indexList.length === 1) {
      // 单个元素的移动，不需要取相对偏移量
      const [index] = indexList
      if (this.elementStack[index]._type === 0) {
        this.changeElement({ _x: x, _y: y }, index)
      }
      return this.elementStack
    }
    // 批量移动元素
    indexList.forEach((index, i) => {
      const data = this.elementStack[index]
      const offset = elementOffset[i]

      if (data._type === 0 && offset.type === 0) {
        // 移动点元素
        this.elementStack[index]._x = offset.ox + x
        this.elementStack[index]._y = offset.oy + y
      }
    })
    return this.elementStack
  }
  countSelectRect(position: number[]): number[] {
    const [x1, y1, x2, y2] = position
    const _position = [
      x1 < x2 ? x1 : x2,
      y1 < y2 ? y1 : y2,
      x2 > x1 ? x2 : x1,
      y2 > y1 ? y2 : y1
    ]
    const res = this.elementStack
      .filter(data => {
        if (data._type === 0) {
          return (
            data._x >= _position[0] &&
            data._y >= _position[1] &&
            data._x <= _position[2] &&
            data._y <= _position[3]
          )
        }
        return false
      })
      .map(data => data._index)
    return res
  }
  handleCountLayout(arr: number[], handle: string): any[] {
    const fn = handleActive[handle]
    this.elementStack = fn(this.elementStack, arr)
    return this.elementStack
  }
  static countSelectRange(arr: number[]): number[] {
    // 框选时的计算
    const [x1, y1, x2, y2] = arr
    return !x1 || !y1 || !x2 || !y2
      ? []
      : [
          x1 < x2 ? x1 : x2,
          y1 < y2 ? y1 : y2,
          x2 > x1 ? x2 : x1,
          y2 > y1 ? y2 : y1
        ]
  }
  static countElementOffSet(
    arr: any[],
    activeIndex: number[],
    { x, y }: any
  ): any[] {
    // 计算每一个元素的偏移量
    return activeIndex.map(index => {
      const data = arr[index]
      if (data._type === 0) {
        return {
          index,
          type: data._type,
          ox: data._x - x,
          oy: data._y - y
        }
      }
      return {}
    })
  }
  static isOverOtherPoint(arr: any[], { x, y }: any): number | null {
    // 判断当前坐标是否落在其他元素上
    const _arr = arr.filter(
      item =>
        item._type === 0 &&
        Math.abs(item._x - x) <= item._radius &&
        Math.abs(item._y - y) <= item._radius
    )
    return _arr.length ? _arr[_arr.length - 1].index : null
  }
  static transCoordinate(event: any, elm: any): any {
    if (!event.target && !elm) {
      return
    }
    const element = elm || event.target
    var svg = element.ownerSVGElement || element
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint()
      point.x = event.clientX
      point.y = event.clientY
      const matrix = elm
        ? element.getScreenCTM().inverse()
        : svg.getScreenCTM().inverse()
      point = point.matrixTransform(matrix)
      return { x: Math.round(point.x), y: Math.round(point.y) }
    }

    var rect = element.getBoundingClientRect()
    return {
      x: Math.round(event.clientX - rect.left - element.clientLeft),
      y: Math.round(event.clientY - rect.top - element.clientTop)
    }
  }
}

export default Osprey
