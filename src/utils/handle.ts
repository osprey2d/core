import * as _ from 'lodash'

/**
 * 策略模式
 * @param
 */
export const handle: any = {
  alignLeft: (element: any[], arr: number[]): any[] => {
    let left: number
    arr.forEach(item => {
      if (!left) {
        left = element[item]._x
      } else {
        left = left < element[item]._x ? left : element[item]._x
      }
    })
    arr.forEach(item => {
      element[item]._x = left
    })
    return element
  },
  alignRight: (element: any[], arr: number[]): any[] => {
    let right: number
    arr.forEach(item => {
      if (!right) {
        right = element[item]._x
      } else {
        right = right > element[item]._x ? right : element[item]._x
      }
    })
    arr.forEach(item => {
      element[item]._x = right
    })
    return element
  },
  alignCenter: (element: any[], arr: number[]): any[] => {
    let left: number
    let right: number
    let center: number
    arr.forEach(item => {
      if (!left || !right) {
        left = element[item]._x
        right = element[item]._x
      } else {
        left = left < element[item]._x ? left : element[item]._x
        right = right > element[item]._x ? right : element[item]._x
      }
    })
    center = left + (right - left) / 2
    arr.forEach(item => {
      element[item]._x = center
    })
    return element
  },
  alignTop: (element: any[], arr: number[]): any[] => {
    let top: number
    arr.forEach(item => {
      if (!top) {
        top = element[item]._y
      } else {
        top = top < element[item]._y ? top : element[item]._y
      }
    })
    arr.forEach(item => {
      element[item]._y = top
    })
    return element
  },
  alignBottom: (element: any[], arr: number[]): any[] => {
    let bottom: number
    arr.forEach(item => {
      if (!bottom) {
        bottom = element[item]._y
      } else {
        bottom = bottom > element[item]._y ? bottom : element[item]._y
      }
    })
    arr.forEach(item => {
      element[item]._y = bottom
    })
    return element
  },
  alignMiddle: (element: any[], arr: number[]): any[] => {
    let top: number
    let bottom: number
    let middle: number
    arr.forEach(item => {
      if (!top || !bottom) {
        top = element[item]._y
        bottom = element[item]._y
      } else {
        top = top < element[item]._y ? top : element[item]._y
        bottom = bottom > element[item]._y ? bottom : element[item]._y
      }
    })
    middle = top + (bottom - top) / 2
    arr.forEach(item => {
      element[item]._y = middle
    })
    return element
  },
  distributeHorizontal: (element: any[], arr: number[]): any[] => {
    let left: number
    let right: number
    let spacing: number
    let len: number = arr.length - 1
    const _arr: any[] = []
    let res: any[] = []
    arr.forEach(item => {
      if (!left || !right) {
        left = element[item]._x
        right = element[item]._x
      } else {
        left = left < element[item]._x ? left : element[item]._x
        right = right > element[item]._x ? right : element[item]._x
      }
      _arr.push({ index: item, x: element[item]._x })
    })
    res = _.sortBy(_arr, function(item) {
      return item.x
    })
    spacing = (right - left) / len
    res.forEach((item, index) => {
      element[item.index]._x = left + spacing * index
    })
    return element
  },
  distributeVertical: (element: any[], arr: number[]): any[] => {
    let top: number
    let bottom: number
    let spacing: number
    let len: number = arr.length - 1
    const _arr: any[] = []
    let res: any[] = []
    arr.forEach(item => {
      if (!top || !bottom) {
        top = element[item]._y
        bottom = element[item]._y
      } else {
        top = top < element[item]._y ? top : element[item]._y
        bottom = bottom > element[item]._y ? bottom : element[item]._y
      }
      _arr.push({ index: item, y: element[item]._y })
    })
    res = _.sortBy(_arr, function(item) {
      return item.y
    })
    spacing = (bottom - top) / len
    res.forEach((item, index) => {
      element[item.index]._y = top + spacing * index
    })
    return element
  }
}
