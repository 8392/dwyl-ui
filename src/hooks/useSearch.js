import { ref, nextTick } from 'vue'
import { getStarEnd } from '@/utils/utils'

export default (data = {}, update, tableRef) => {
  const params = ref({ ...data })
  const reset = () => {
    params.value = { ...data }
    update && update()
    nextTick(() => {
      tableRef && tableRef.value.refresh()
    })
  }
  const search = () => {
    update && update()
    tableRef && tableRef.value.refresh()
  }
  return {
    params,
    reset,
    search
  }
}
