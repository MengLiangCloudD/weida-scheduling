import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './common/style.scss';
import { DatePicker,Modal,Message,Select,Option,Table,Input,Button,Page  } from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.component('DatePicker', DatePicker);
Vue.component('Modal', Modal);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Table', Table);
Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.component('Page', Page);
Vue.prototype.$Message=Message;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
