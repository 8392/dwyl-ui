/* 物联网项目配置 */
const wlwConfig = {
  table: {
    pageField: 'pageNumber',
    limitField: 'pageSize',
    totalField: 'total',
    dataField: 'data'
  }
}

/* 后台项目配置 */
const htConfig = {
  table: {
    pageField: 'page',
    limitField: 'limit',
    totalField: 'data.total',
    dataField: 'data.records'
  }
}

const projectConfig = new Map([
  [1, wlwConfig],
  [2, htConfig]
])

export default projectConfig
