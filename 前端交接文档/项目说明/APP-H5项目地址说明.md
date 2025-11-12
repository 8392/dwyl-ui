# 前端代码 GitLab 与项目目录说明

本文档用于说明各 H5 子项目、小程序页面在 GitLab 中的代码位置，以及它们在生产环境对应的访问域名。

---

## 1. GitLab 仓库

统一仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/app_monorepo_maintenance**

所有 H5 项目均在此 Monorepo 中维护。

---

## 2. APP & 小程序嵌入的 H5 页面

### 2.1 维保服务
- **访问域名：** `https://prod.wbfwh5.diweiyunlian.cn`
- **项目目录：** `service_manage`

### 2.2 消防管理
- **访问域名：** `https://prod.xfglh5.diweiyunlian.cn`
- **项目目录：** `fire_manage`

### 2.3 维保老板
- **访问域名：** `https://prod.wblbh5.diweiyunlian.cn`
- **项目目录：** `maintenance_boss`

### 2.4 肖智云 APP（相关页面）
- **访问域名：** `https://prod.appuseh5.diweiyunlian.cn`
- **项目目录：** `app_useh5`

### 2.5. 多应用融合到一个模块

统一入口域名：

**`https://prod.xcxh5.diweiyunlian.cn`**

对应仓库目录：

**`mini_program`**

内部划分多个子业务模块。

#### 2.5.1 智慧家庭
- **入口地址：** `https://prod.xcxh5.diweiyunlian.cn`
- **项目目录：** `that_person`

#### 2.5.2 安装
- **入口地址：** `https://prod.xcxh5.diweiyunlian.cn/#/views/adbInstall/home/index`
- **项目目录：** `adbInstall`

#### 2.5.3 运维
- **入口地址：** `https://prod.xcxh5.diweiyunlian.cn/#/views/operation/home/index`
- **项目目录：** `operation`

#### 2.5.4 集成商
- **入口地址：** `https://prod.xcxh5.diweiyunlian.cn/#/views/integrator/home/index`
- **项目目录：** `integrator`

---


## 3. 微信小程序项目说明

仓库地址：

**http://git.diweiyunlian.cn:8090/xiaozhiyun/web/wx_cloud2.0**

项目分支：`sui_an_yun`  遂安云，小程序分支


迪威云联公司用的小程序分支-`prod`

---