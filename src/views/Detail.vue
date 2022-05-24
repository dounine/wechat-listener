<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12" style="line-height: 32px;">
          监听状态
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

    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref, onBeforeMount} from 'vue';

const listen = ref(true)
const {proxy} = getCurrentInstance()
const data = ref({});
onBeforeMount(() => {
  proxy.$axios.get(`/api/detail/${proxy.$route.params.id}`).then(response => {
    console.log('detail', response.data);
    data.value = response.data.data;
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