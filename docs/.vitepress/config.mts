import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sun-Store",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: {
      "/": [

        {
          text: '部署',
          items: [
            { text: '快速部署', link: '/deploy/index' },
          ]
        },


        {
          text: '使用文档',
          items: [
            { text: '软件授权登录', link: '/sun-panel/dev' },
          ]
        },


        {
          text: '开发文档',
          items: [
            { text: '应用授权登录', link: '/dev/oauth2' },
            { text: '获取用户信息', link: '/dev/get_user_info' },
            {
              text: '客户端相关API', link: '/dev/clientApi/index', items: [
                { text: '全局说明', link: '/dev/clientApi/global' },
                { text: '订单相关', link: '/dev/clientApi/order' },
              ]
            },
            { text: 'Webhook', 
              // link: '/dev/webhook/' ,
              items: [
                { text: '全局说明', link: '/dev/webhook/global' },
                { text: '签名验证', link: '/dev/webhook/signature' },
                // { text: '订单相关', link: '/dev/webhook/order' },
              ]
            },
          ]

        },


      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
