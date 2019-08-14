const cuid = require('cuid')
import * as _ from 'lodash'
import { handle } from './handle'

export const handleActive = handle

/**
 * 随机数生成
 */
export const createMid = (): string => cuid()

/**
 * 层级控制算法
 * @param arr 所有元素的集合
 * @param data 需要插入的元素
 */
export const stackControl = (arr: any[], data: any): any => {
  let index: number
  switch (data._type) {
    case 10:
      arr.unshift(data)
      index = 0
      break
    case 1:
      const _arr = arr.filter(item => item._type > 1)
      const len = _arr.length ? _arr.length : 0
      arr.splice(len, 0, data)
      index = len
      break
    case 0:
      arr.push(data)
      index = arr.length - 1
      break
    default:
      break
  }
  // 重置所有的索引再传出去
  return [resetElementIndex(arr), data._mid, index]
}

/**
 * 重置所有元素的 index
 * @param arr
 */
export const resetElementIndex = (arr: any[]): object[] => {
  // console.log(arr[0].changeElement)
  // return arr.map(({ _index, ...item }, index) => ({
  //   _index: index,
  //   ...item
  // }))
  // 用 map 和解构无法直接实现深拷贝
  arr.forEach((item, index) => {
    item._index = index
  })
  return arr
}

/**
 * 吸附点算法
 * @param m 源数值
 * @param R 吸附半径
 * @param H 对齐数值
 */
export const residual = (m: number, R: number = 5, H: number = 20): number => {
  if (m % H <= R) {
    m -= m % H
  }
  if (m % H >= H - R) {
    m += H - (m % H)
  }
  return m
}
