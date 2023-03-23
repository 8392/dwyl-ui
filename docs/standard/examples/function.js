/* 根据经纬度回显地址 */
export const echoAddress = (lng, lat) => {
  const point = new BMapGL.Point(lng, lat)
  const gc = new BMapGL.Geocoder()
  return new Promise((res, rej) => {
    gc.getLocation(point, function (rs) { // getLocation函数用来解析地址信息，分别返回省市区街等
      const addComp = rs.addressComponents
      const province = addComp.province// 获取省份
      const city = addComp.city// 获取城市
      const district = addComp.district// 区
      const street = addComp.street
      const streetNumber = addComp.streetNumber
      const str = province + city + district + street + streetNumber
      res(str)
    })
  })
}
