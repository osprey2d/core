;[
  // 画布元素
  {
    _type: -1,
    _ctrlPoints: [0, 0, 100, 100], // 四个数字，分别代表左上角点位的x,y坐标，以及右下角点位的x,y坐标，用于描述图形的面积和位置
    color: '#fff' // 用于描述画布的填充色
  },
  // 点元素集合
  {
    _type: 0,
    _x: 10, // 用于描述点的x坐标
    _y: 10, // 用于描述点的y坐标
    _mid: 'fghj34567898ytrewsasdfghjkju765rfdc'
  },
  {
    _type: 0,
    _x: 20,
    _y: 20,
    _mid: 'xdcvgvbhujhnmkjhgtrert45678904edrtf'
  },
  // 线元素集合
  {
    _type: 1,
    _mid: 'w457t8edryuuredcghy87rt78treweruiyu',
    _startMid: 'fghj34567898ytrewsasdfghjkju765rfdc',
    _endMid: 'xdcvgvbhujhnmkjhgtrert45678904edrtf',
    width: 3, // 用于描述线段的宽度
    fill: '#000' // 用于描述线段的填充色
  },
  // 文字元素集合
  {
    _type: 5,
    _mid: 'd678976rfyguy6redfgi7t5e5dtr65f7866',
    _ctrlPoints: [30, 23, 20, 80], // 四个数字，分别代表文字区块左上角点位的x,y坐标，以及右下角点位的x,y坐标，用于描述文字的行高，宽度
    text: '文字内容',
    size: 20 // 用于描述字号
  },
  // 图形（二维码）元素集合
  {
    _type: 10,
    _mid: 'ghgfdertghbv234343423eddfr6ujhgfrty',
    _ctrlPoints: [23, 45, 74, 89], // 四个数字，分别代表左上角点位的x,y坐标，以及右下角点位的x,y坐标，用于描述图形的面积和位置
    bgImg: '远程图片地址'
  }
]
