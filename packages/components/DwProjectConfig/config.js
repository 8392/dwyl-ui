/* 物联网项目配置 */
const wlwConfig = {
  table: {
    pageField: 'pageNumber',
    limitField: 'pageSize'
  }
}

/* 后台项目配置 */
const htConfig = {
  table: {
    pageField: 'page',
    limitField: 'limit'
  }
}

const projectConfig = new Map([
  [1, wlwConfig],
  [2, htConfig]
])

export default projectConfig
