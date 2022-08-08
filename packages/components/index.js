// 导入组件
import DwButton from './DwButton/index.vue'
import DwSteps from './DwSteps/index.vue'
import DwStep from './DwSteps/DwStep.vue'
import DwTable from './DwTable'
import DwDialog from './DwDialog'
import DwPagination from './DwPagination'
import DwDialogFoot from './DwDialogFoot'
import DwGrid from './DwGrid'
import DwCol from './DwGrid/DwCol'

const modules = [DwButton, DwSteps, DwStep, DwTable, DwDialog, DwPagination, DwDialogFoot, DwGrid, DwCol]

// 提供按需导入
export { DwButton, DwSteps, DwStep, DwTable, DwDialog, DwPagination, DwDialogFoot, DwGrid, DwCol }

export default modules
