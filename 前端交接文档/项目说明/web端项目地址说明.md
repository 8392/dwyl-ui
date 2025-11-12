# 前端代码 GitLab 与项目目录说明

本文档用于说明各 web端 项目、小程序页面在 GitLab 中的代码位置，以及它们在生产环境对应的访问域名。

---

## 1. 物联网平台

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/lot_cloud**

项目分支：`new_prod`

访问域名：

**https://device.diweiyunlian.cn**

---

## 2. 数据中台

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/wisdom_admin_2.0**

项目分支：`new_release`

访问域名：

**https://xzy.diweiyunlian.cn/admin/home**

---

## 3. 维保服务，消防管理，演示环境首页

统一仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/web_monorepo_maintenance**

项目分支：`release`

所有项目均在此 Monorepo 中维护。

### 3.1 维保服务
- **访问域名：** `https://wbfw.diweiyunlian.cn`
- **项目目录：** `service_manage`

### 3.2 消防管理
- **访问域名：** `https://xfgl.diweiyunlian.cn`
- **项目目录：** `fire_manage`

### 3.3 演示环境首页
- **访问域名：** `https://yshome.diweiyunlian.cn/`
- **项目目录：** `display_system`

---

## 4. 运维中心

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/operation_center_vue3**

项目分支：`master`

访问域名：

**https://ywgl.diweiyunlian.cn/login**

---

## 5. 集成商大屏

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/integrator_screen**

项目分支：`master`

访问域名：

**http://jcsdp.diweiyunlian.cn/home**

---

## 6. 迪威云联官网

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/official-website**

项目分支：`master`

项目用的`nuxt2`服务端渲染

访问域名：

**https://www.diweiyunlian.cn/**

---

## 6. 郫都新的监管大屏，`事件推送模式`

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/supervise_big_scree_vue3**

项目分支：`main`

访问域名：

**http://pdjg.diweiyunlian.cn**

---

## 7. 维保监管大屏，广德寺联网大屏，养老监管大屏（个人，目前主要巴中在用）

统一仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/large_screen_monorepo**

项目分支：`release`

所有项目均在此 Monorepo 中维护。

`carport_screen`和`yjgb_screen`之前做车棚和应急广播的项目，目前已废弃，项目没有删除

### 7.1 维保监管大屏
- **访问域名：** `https://wbjg.diweiyunlian.cn`
- **项目目录：** `wb_screen`

### 7.2 广德寺联网大屏
- **访问域名：** `http://gds.diweiyunlian.cn`
- **项目目录：** `gds_screen`

### 7.3 养老监管大屏
- **访问域名：** `https://yljg.diweiyunlian.cn`
- **项目目录：** `yljg_screen`

---

## 7. 维保监管大屏，广德寺联网大屏，养老监管大屏（个人，目前主要巴中在用）

统一仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/large_screen_monorepo**

项目分支：`release`

所有项目均在此 Monorepo 中维护。

### 7.1 维保监管大屏
- **访问域名：** `https://wbjg.diweiyunlian.cn`
- **项目目录：** `wb_screen`

### 7.2 广德寺联网大屏
- **访问域名：** `http://gds.diweiyunlian.cn`
- **项目目录：** `gds_screen`

### 7.3 养老监管大屏
- **访问域名：** `https://yljg.diweiyunlian.cn`
- **项目目录：** `yljg_screen`

---

## 7. 联网大屏，郫都联网监管大屏之前的版本，现在用的事件（郫都新的监管大屏，`事件推送模式`），个人监管大屏

统一仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/all_large_screen**


`maintenan_service`融合维保的联网大屏，没有部署,
`wuhouci_screen`武侯祠迁移版本，已废弃

项目分支：`release`

联网大屏和监管大屏在一个项目里面，都在`basic_screen`，只是部署了两个域名，防止监管跳转联网token区分

所有项目均在此 Monorepo 中维护。

### 7.1 联网大屏
- **访问域名：** `https://lw.diweiyunlian.cn`
- **项目目录：** `basic_screen`

### 7.2 监管大屏
- **访问域名：** `https://jgdw.diweiyunlian.cn/`
- **项目目录：** `basic_screen`

### 7.3 郫都监管大屏
- **访问域名：** `https://pidu.diweiyunlian.cn`
- **项目目录：** `pidu_supervision`

### 7.4 个人监管大屏，（智慧家庭）
- **访问域名：** `https://grjg.diweiyunlian.cn`
- **项目目录：** `supervise_screen`

---