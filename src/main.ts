import {createApp} from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'
import '/@/design/index.less'

import {router} from "/@/router";
import {setupStore} from "/@/store";

const app = createApp(App)
setupStore(app)

app.use(Antd)
app.use(router)
app.mount('#app')