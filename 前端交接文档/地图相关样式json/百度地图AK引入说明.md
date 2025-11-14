# 百度地图AK引入说明

1. 目前所有项目都是用的百度地图，ak用的`hLxooL42zTAYdlI5JfQKcRMgNauIm5MJ`丁云伟的账号
2. 所有项目的ak都是统一的通过`minio`的js文件引入的

## 引入方式

1. 目前在`http://minio.diweiyunlian.cn:32564/browser/cdn/d2ViL2JpZHVNYXAvYmFpZHVfaDVfYXBpLmpz`这里配置了3个js引入
2. 所有web端引入都是走的`baidu_web_api`，广德寺大屏有gis相关操作，引入的单独的一个js
3. h5因为有ios和安卓的判断，引入方式不一样，所有用的`baidu_h5_api`
4. `ucenter`都是通过这个代理的域名，以便私有化部署

### 引入方式
- **web端：** `/ucenter/minio/cdn/web/biduMap/baidu_web_api.js`

- **广德寺大屏：** `/ucenter/minio/cdn/web/biduMap/baidu_gds_api.js`

- **h5：** `/ucenter/minio/cdn/web/biduMap/baidu_h5_api.js`
