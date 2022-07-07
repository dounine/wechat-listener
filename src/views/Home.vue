<template>
  <el-container v-loading="loading">
    <el-header>
      <el-row class="row">
        <el-col :span="8">
          全局监听
        </el-col>
        <el-col :span="12">
          <el-switch
              v-model="listen"
              @change="listenChange"
          />
        </el-col>
        <el-col :span="4">
          <router-link :to="{name:'Detail',params:{id:'-'}}">
            <el-button type="primary" :icon="Plus" circle/>
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-link :to="{name:'Detail',params:{id:item.id}}" v-for="item in list"
                   :key="item.id" tag="li">
        <el-row>
          <el-col :span="21" style="line-height: 32px;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
            {{ item.text }}
          </el-col>
          <el-col :span="2" style="color:#ccc;">
            {{ item.useLike ? 'like' : item.match.toLowerCase() }}
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
  proxy.$axios.get('/api/infos').then(response => {
    console.log('infos', response)
    let ll = response.data.data.list;
    ll.sort(function (a, b) {
      return b.text.localeCompare(a.text)
    })
    list.value = ll
    listen.value = response.data.data.listen
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