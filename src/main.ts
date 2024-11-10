import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import './style/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//internationalization
import zh_cn from './extended/internationalization/zh_cn'
import en_us from './extended/internationalization/en_us'

const i18n = createI18n({
  legacy: false,
  messages:{
    zh_cn:zh_cn,
    en_us:en_us
  },
  locale: 'en_us'
})

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')