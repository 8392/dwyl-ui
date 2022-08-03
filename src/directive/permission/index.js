import { useUserStore } from '@/store'

/* 判断是否有权限 */
export const checkPermission = (value) => {
  const userStore = useUserStore()
  const permissions = userStore?.info?.permissions || []
  return permissions.includes(value)
}

const getPermission = (el, binding) => {
  const { value } = binding
  const hasPermission = checkPermission(value)
  if (!hasPermission && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

export default {
  mounted (el, binding) {
    getPermission(el, binding)
  },
  updated (el, binding) {
    getPermission(el, binding)
  }
}
