export const dataType = {
  // 字符串
  1: [{
    type: 'input',
    key: 'length',
    label: '长度',
    placeholder: '请输入长度'
  }],
  // 整型
  2: [{
    type: 'unit',
    key: 'unit',
    label: '计量单位'
  }, {
    type: 'input',
    key: 'max',
    placeholder: '请输入最大值',
    label: '最大值'
  }, {
    type: 'input',
    key: 'min',
    placeholder: '请输入最小值',
    label: '最小值'
  }, {
    type: 'input',
    key: 'step',
    placeholder: '请输入步长',
    label: '步长'
  }],
  // 布尔类型
  3: [{
    type: 'input',
    key: 'bool0',
    placeholder: '如: 开',
    label: 'true'
  }, {
    type: 'input',
    key: 'bool1',
    placeholder: '如: 关',
    label: 'false'
  }],
  // 日期类型
  4: [],
  // 单精度型浮点
  5: [{
    type: 'unit',
    key: 'unit',
    label: '计量单位'
  }, {
    type: 'input',
    key: 'max',
    placeholder: '请输入最大值',
    label: '最大值'
  }, {
    type: 'input',
    key: 'min',
    placeholder: '请输入最小值',
    label: '最小值'
  }, {
    type: 'input',
    key: 'step',
    placeholder: '请输入步长',
    label: '步长'
  }],
  // 双精度型浮点
  6: [{
    type: 'unit',
    key: 'unit',
    label: '计量单位'
  }, {
    type: 'input',
    key: 'max',
    placeholder: '请输入最大值',
    label: '最大值'
  }, {
    type: 'input',
    key: 'min',
    placeholder: '请输入最小值',
    label: '最小值'
  }, {
    type: 'input',
    key: 'step',
    placeholder: '请输入步长',
    label: '步长'
  }],
  // 长整型|long
  7: [{
    type: 'unit',
    key: 'unit',
    label: '计量单位'
  }, {
    type: 'input',
    key: 'max',
    placeholder: '请输入最大值',
    label: '最大值'
  }, {
    type: 'input',
    key: 'min',
    placeholder: '请输入最小值',
    label: '最小值'
  }, {
    type: 'input',
    key: 'step',
    placeholder: '请输入步长',
    label: '步长'
  }],
  // 结构体|struct
  8: [{
    type: 'unit',
    key: 'unit',
    label: '计量单位'
  }, {
    type: 'input',
    key: 'max',
    placeholder: '请输入最大值',
    label: '最大值'
  }, {
    type: 'input',
    key: 'min',
    placeholder: '请输入最小值',
    label: '最小值'
  }, {
    type: 'input',
    key: 'step',
    placeholder: '请输入步长',
    label: '步长'
  }]
}

export const activateOpts = [{
  label: '已激活',
  color: '#00B42A',
  icon: 'https://fire.diweiyunlian.cn/file/292367836761657344.png',
  value: 1
}, {
  label: '未激活',
  color: '#f40',
  icon: 'https://fire.diweiyunlian.cn/file/292367828016533504.png',
  value: 0
}]

export const onlineOpts = [{
  label: '在线',
  value: true,
  color: '#00B42A',
  icon: 'https://fire.diweiyunlian.cn/file/302144322918494208.png'
}, {
  label: '离线',
  value: false,
  icon: 'https://fire.diweiyunlian.cn/file/302143261063327744.png',
  color: '#6E7279'
}]

export const upperlowerStatus = [{
  color: '#6A88FF',
  icon: 'https://fire.diweiyunlian.cn/file/292367769086562304.png',
  label: '上架',
  value: 1
}, {
  color: '#6E7279',
  icon: 'https://fire.diweiyunlian.cn/file/292367760425324544.png',
  label: '下架',
  value: 2
}]
export const screenOpts = [{
  label: '屏蔽',
  value: true
}, {
  label: '不屏蔽',
  value: false
}]

export const orderOpts = [{
  label: '创建时间倒序',
  value: '2'
}, {
  label: '创建时间正序',
  value: '1'
}, {
  label: '更新时间倒序',
  value: '3'
}]

export const imgFileArr = ['.gif', '.jpg', '.jpeg', '.png', '.GIF', '.JPG', 'JPEG', '.PNG', '.webp', '.WEBP']
export const pdfFileArr = ['.pdf', '.PDF']
export const excelArr = ['.xls', '.xlsx', '.XLS', '.XLSX']

export const fileTypeMap = new Map([
  [
    ['img', 'image'],
    {
      errorMsg: '只能上传图片',
      fileList: imgFileArr
    }
  ],
  [
    ['pdf'],
    {
      errorMsg: '只能上传pdf',
      fileList: pdfFileArr
    }
  ],
  [
    ['excel'],
    {
      errorMsg: '只能上传excel',
      fileList: excelArr
    }
  ]
])

export const certificatStatusList = new Map([
  [
    undefined,
    {
      des: '未认证',
      color: '#B1B5BB',
      bg: '#F6F6F6',
      component: 'FACTORY_NO_AUTH'
    }
  ],
  [
    0,
    {
      des: '认证中',
      color: '#B1B5BB',
      bg: '#F6F6F6',
      component: 'FACTORY_UNDER_AUTH'
    }
  ],
  [
    1,
    {
      des: '已认证',
      color: '#00B42A',
      bg: '#E8FFEA'
    }
  ],
  [
    2,
    {
      des: '认证失败',
      color: '#B1B5BB',
      bg: '#F6F6F6',
      component: 'FACTORY_AUTH_FAIL'
    }
  ]
])
