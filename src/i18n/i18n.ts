import { createI18n } from 'vue-i18n'
import zh from '../i18n/language/zh-tw.json'
import en from '../i18n/language/en-US.json'

type MessageSchema = typeof zh


const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: 'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages: {
    'zh-TW': zh,
    'en-US': en
  }
})

export default i18n