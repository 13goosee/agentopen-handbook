import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Claude Code 設計模式手冊',
  description: '從原始碼提取的 AI 系統設計模式，邊做邊學',
  lang: 'zh-TW',
  base: '/agentopen-handbook/',

  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '開始閱讀', link: '/01-設好你的第一個系統' },
    ],

    sidebar: [
      {
        text: '章節',
        items: [
          { text: '第 1 章：設好你的第一個系統', link: '/01-設好你的第一個系統' },
          { text: '第 2 章：用了一週開始調整', link: '/02-用了一週開始調整' },
          { text: '第 3 章：讓 AI 記住你', link: '/03-讓AI記住你' },
          { text: '第 4 章：跑順了開始自動化', link: '/04-跑順了開始自動化' },
          { text: '第 5 章：讓別人也能用', link: '/05-讓別人也能用' },
        ],
      },
      {
        text: '附錄',
        items: [
          { text: '全景速查表', link: '/cheatsheet' },
        ],
      },
    ],

    outline: {
      level: [2, 3],
      label: '本章目錄',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜尋', buttonAriaLabel: '搜尋' },
          modal: {
            noResultsText: '找不到結果',
            resetButtonTitle: '清除搜尋',
            footer: { selectText: '選擇', navigateText: '切換', closeText: '關閉' },
          },
        },
      },
    },

    docFooter: {
      prev: '上一章',
      next: '下一章',
    },

    darkModeSwitchLabel: '深色模式',
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '目錄',
  },
})
