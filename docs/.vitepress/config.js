
export default {
    title: '迪威云联开发文档',
    description: '迪威云联前端开发规范',
    themeConfig: {
        nav: [
            { text: '规范', link: '/standard/index' },
            { text: '组件', link: '/components/dwButton' },
            { text: '指令', link: '/directive/loading' }
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
            ]
        }
    }
}