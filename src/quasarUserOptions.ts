// import './styles/quasar.scss'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import { Dialog, Loading, LoadingBar, Notify, QSpinnerTail } from 'quasar'
import langKr from 'quasar/lang/ko-KR'
import 'quasar/src/css/index.sass';
import 'quasar/src/css/flex-addon.sass';

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    loadingBar: { /* look at QuasarConfOptions from the API card */
      color: 'primary',
      hijackFilter (url: string) {
        // http or https :// any url /api
        return /\/ccps\/\w*/.test(url)
      }
    },
    loading: {
      spinner: QSpinnerTail
    },
    notify: {
      position: 'top-right',
      // progress: true,
      textColor: 'white',
      timeout: 3000,
      actions: [{ icon: 'icon-close', color: 'white' }]
    }
  },
  plugins: {
    LoadingBar, Loading, Notify, Dialog
  },
  lang: langKr
}
