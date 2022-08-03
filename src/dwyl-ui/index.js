/* 全局自定义迪威组件 */
import DwDialog from '@/dwyl-ui/DwDialog'
import DwTable from '@/dwyl-ui/DwTable'
import DialogFoot from '@/dwyl-ui/DialogFoot'
import DwImage from '@/dwyl-ui/DwImage'
import DwPagination from '@/dwyl-ui/DwPagination'
import DwSteps from '@/dwyl-ui/DwSteps'
import DwStep from '@/dwyl-ui/DwSteps/DwStep'
import DwPicker from '@/dwyl-ui/DwPicker'
import DwUpload from '@/dwyl-ui/DwUpload'
import DwGrid from '@/dwyl-ui/DwGrid'
import DwCol from '@/dwyl-ui/DwGrid/DwCol'
/* 全局自定义迪威组件 */

// const modules = import.meta.glob('@/dwyl-ui/**/**index.vue')
const modules = [
  {
    name: 'DwDialog',
    path: DwDialog
  },
  {
    name: 'DwTable',
    path: DwTable
  },
  {
    name: 'DialogFoot',
    path: DialogFoot
  },
  {
    name: 'DwImage',
    path: DwImage
  },
  {
    name: 'DwPagination',
    path: DwPagination
  },
  {
    name: 'DwSteps',
    path: DwSteps
  },
  {
    name: 'DwStep',
    path: DwStep
  },
  {
    name: 'DwPicker',
    path: DwPicker
  },
  {
    name: 'DwUpload',
    path: DwUpload
  },
  {
    name: 'DwGrid',
    path: DwGrid
  },
  {
    name: 'DwCol',
    path: DwCol
  }
]

export default {
  install (Vue) {
    modules.forEach(item => {
      Vue.component(item.name, item.path)
    })
  }
}
