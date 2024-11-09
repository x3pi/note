import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My note",
  description: "My note",
  base: '/notes/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Notes', link: '/promise' }
    ],

    sidebar: [
      {
        text: 'Javascript - Nodejs',
        items: [
          { text: 'Promise', link: '/promise' },
          { text: 'Stream', link: '/stream' },
          { text: 'Event Emitter', link: '/event-emitter' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/x3pi/notes' }
    ]
  }
})
