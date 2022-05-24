<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12" style="line-height: 32px;">
          全局监听
        </el-col>
        <el-col :span="12">
          <el-switch
              v-model="listen"
              active-text="监听中"
              inactive-text="关闭"
              @change="listenChange"
          />
        </el-col>
      </el-row>
    </el-header>
    <el-divider/>
    <el-main>
      <router-link :to="{name:'Detail',params:{id:item.id}}" @click="itemClick(item)" v-for="item in list"
                   :key="item.id" tag="li">
        <el-row>
          <el-col :span="21" style="line-height: 32px;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
            {{ item.text }}
          </el-col>
          <el-col :span="2" style="color:#ccc;">
            {{ item.match }}
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

const listen = ref(true)
const {proxy} = getCurrentInstance()
const list = ref([]);
onBeforeMount(() => {
  proxy.$axios.get('/api/list').then(response => {
    console.log(response)
    list.value = response.data.data;
  })
})
const listenChange = (value) => {
  console.log('listen change', value);
  listen.value = value;
}
const itemClick = (e) => {
  console.log('item click ', e)
}
</script>

<style lang="scss" scoped>
</style>