import {App} from 'vue'
import {createPinia, defineStore} from 'pinia'

export const setupStore = (app: App): void => {
    const store = createPinia();
    app.use(store)
}