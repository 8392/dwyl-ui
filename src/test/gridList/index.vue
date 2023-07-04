<template>
  <DwGridList
    ref="dwTable"
    class="py-20px min-h-180px border-t-1px border-#F2F3F5"
    :api="productVersionVo"
    :params="params"
    :minWidth="330"
    :lineCount="2"
    :rowGap="10"
  >
    <template #default="{ row: data }">
      <div class="rounded border-#E5E8EF border-1px hover-shadow">
        <div class="flex justify-between items-center bg-#F0F5FF h-36px px-20px lh-36px">
          <div>属性转换</div>
          <div>正常</div>
        </div>
        <div class="flex items-center px-30px pb-10px overflow-hidden">
          <dw-image class="w-80px h-80px" :src="data.iconUrl" alt="" />
          <div class="pl-30px lh-22px flex-1 overflow-hidden">
            <div class="text-14px color-#292A2C py-10px">规则名称</div>
            <div class="flex items-center text-12px">
              <div class="color-#6E7279 text-right pr-10px whitespace-nowrap">项目名称</div>
              <div class="color-#292A2C truncate">项目名称项目名称项目名称项目名称</div>
            </div>
            <div class="flex items-center text-12px">
              <div class="color-#6E7279 text-right pr-10px whitespace-nowrap">产品名称</div>
              <div class="color-#292A2C truncate">产品名称项目名称项目名称项目名称</div>
            </div>
            <div class="flex items-center text-12px">
              <div class="color-#6E7279 text-right pr-10px pl-27px whitespace-nowrap">厂家</div>
              <div class="color-#292A2C truncate">厂家项目名称项目名称项目名称</div>
            </div>
            <div class="flex items-center text-12px">
              <div class="color-#6E7279 text-right pr-10px pl-27px whitespace-nowrap">版本</div>
              <div class="color-#292A2C truncate">版本项目名称项目名称项目名称项目名称</div>
            </div>
          </div>
        </div>
        <div class="flex items-center h-51px border-t -1px border-#E5E8EF">
          <div class="flex-1 h-40px border-r-1px border-#E5E8EF cursor-pointer flex-center hover:color-primary" @click="handleBtn(data, 1)">编辑</div>
          <div class="flex-1 h-40px border-r-1px border-#E5E8EF cursor-pointer flex-center hover:color-primary" @click="handleBtn(data, 2)">禁用</div>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="#f00"
            title="确认删除吗？"
            @confirm="handleBtn(data, 4)"
          >
            <template #reference>
              <div class="flex-1 h-40px cursor-pointer flex-center hover:color-danger" @click.stop>删除</div>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </template>
  </DwGridList>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { productVersionVo } from '@/api'
import { dwHooks } from 'dwyl-ui'
const { useDwTable } = dwHooks

const {
  params,
  onSearch,
  dwTable
} = useDwTable()

const router = useRouter()
const search = ref({})
const orderOpts = ref([
  {
    label: '撒大苏打',
    value: 1
  }
])

const tableLoading = ref(false)

const searchMeth = () => {

}

/* 操作按钮 */
const handleBtn = async (row, type) => {

}
</script>

<style lang="scss" scoped>

</style>
