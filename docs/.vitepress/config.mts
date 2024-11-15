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
      },
      {
        text: 'Data structure',
        items: [
          { text: 'Array', link: '/array' },
          { text: 'Stream', link: '/stream' },
          { text: 'Event Emitter', link: '/event-emitter' }
        ]
      },
      {
        text: 'Database',
        items: [
          { text: 'Redis', link: '/redis' },
          { text: 'Stream', link: '/stream' },
          { text: 'Event Emitter', link: '/event-emitter' }
        ]
      },
      {
        text: 'DEX',
        items: [
          { text: 'Uniswap V3', link: '/uniswap-v3' },
          { text: 'Stream', link: '/stream' },
          { text: 'Event Emitter', link: '/event-emitter' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/x3pi/notes' }
    ]
  },
  // Add KaTeX support
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js' }],
  ],

  markdown: {
    math: true
  }
})
