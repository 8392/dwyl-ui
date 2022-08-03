import { createPinia } from 'pinia'

export function setupStore (app) {
  const store = createPinia()
  app.use(store)
}

export * from './modules/user'
export * from './modules/dictionary'
export * from './modules/product'
