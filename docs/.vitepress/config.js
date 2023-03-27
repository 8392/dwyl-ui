
export default {
    title: '迪威云联开发文档',
    description: '迪威云联前端开发规范',
    themeConfig: {
        nav: [
            { text: '规范', link: '/standard/index' },
            { text: '组件', link: '/components/dwButton' },
            { text: '指令', link: '/directive/loading' },
            { text: 'hooks', link: '/hooks/useForm' }
        ],
        sidebar: {
            '/standard': [
                {
                    text: '编码规范',
                    link: '/standard/index'
                },
                {
                    text: '设计规范',
                    link: '/standard/design'
                }
            ],
            '/components': [
                {
                    text: 'button 按钮',
                    link: '/components/dwButton'
                },
                {
                    text: 'dialog 对话框',
                    link: '/components/dwDialog'
                },
                {
                    text: 'girdList 网格列表',
                    link: '/components/dwGirdList'
                },
                {
                    text: 'empty 空白占位',
                    link: '/components/dwEmpty'
                },
                {
                    text: 'pagination 分页',
                    link: '/components/dwPagination'
                },
                {
                    text: 'image 图片',
                    link: '/components/dwImage'
                },
                {
                    text: 'picker 日期选择',
                    link: '/components/dwPicker'
                },
                {
                    text: 'select 选择器',
                    link: '/components/dwSelect'
                },
                {
                    text: 'steps 步骤',
                    link: '/components/dwSteps'
                },
                {
                    text: 'table 表格',
                    link: '/components/dwTable'
                },
                {
                    text: 'upload 图片上传',
                    link: '/components/dwUpload'
                }
            ],
            '/directive': [
                {
                    text: 'v-loading',
                    link: '/directive/loading'
                },
                {
                    text: 'v-permission',
                    link: '/directive/permission'
                },
                {
                    text: 'v-tooltip',
                    link: '/directive/tooltip'
                }
            ],
            '/hooks': [{
                text: 'useForm',
                link: '/hooks/useForm'
            }, {
                text: 'useTable',
                link: '/hooks/useDwTable'
            }]
        }
    }
}