<template>
  <el-container v-loading="loading">
    <el-main>
      <router-link :to="{name:'CoinDetail',params:{id:item.v1}}" v-for="item in list"
                   :key="item.v1" tag="li">
        <el-row>
          <el-col :span="21" style="line-height: 32px;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
            {{ item.nickName }}
          </el-col>
          <el-col :span="2" style="color:#ccc;">
          </el-col>
          <el-col :span="1">
            <el-icon style="vertical-align: middle" color="#ccc">
              <ArrowRight/>
            </el-icon>
          </el-col>
        </el-row>
      </router-link>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onBeforeMount, ref} from 'vue';
import {
  Plus
} from '@element-plus/icons-vue'

const listen = ref(true)
const loading = ref(true);
const {proxy} = getCurrentInstance()
const list = ref([])
onBeforeMount(() => {
  proxy.$axios.get('/api/coin/down').then(response => {
    console.log('infos', response)
    list.value = response.data.data
    loading.value = false
  })
})
const listenChange = (value) => {
  console.log('listen change', value)
  proxy.$axios.post(`/api/listen/${value}`).then(response => {
    console.log('listen', response.data)
  })
}
</script>

<style lang="scss" scoped>
.row {
  line-height: 32px;
}
</style>