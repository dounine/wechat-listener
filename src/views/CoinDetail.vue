<template>
  <el-page-header title="返回" :content="title" @back="goBack" style="margin:0.8rem 0"/>
  <el-dialog v-model="sendDialog" title="发送确认" center>
    <span
    >你确定要发送这条数据吗？此操作不能逆。</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="sendDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmSend"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-container v-loading="loading">
    <el-main>
      <el-form :model="data" label-width="5rem">
        <el-form-item label="喵币">
          <el-select v-model="data.coin" placeholder="请选择">
            <el-option label="0.1" value="1"/>
            <el-option label="0.2" value="2"/>
            <el-option label="0.3" value="3"/>
            <el-option label="0.4" value="4"/>
            <el-option label="0.5" value="5"/>
            <el-option label="0.6" value="6"/>
            <el-option label="0.7" value="7"/>
            <el-option label="0.8" value="8"/>
            <el-option label="0.9" value="9"/>
            <el-option label="1.0" value="10"/>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input input-style="height:100px;" v-model="data.des" type="textarea"/>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="onSubmit">发送</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {getCurrentInstance, watch, reactive, ref, onBeforeMount} from 'vue'
import {ElMessage} from 'element-plus'

const title = ref("")
const loading = ref(false)
const sendDialog = ref(false)
const {proxy} = getCurrentInstance()
const data = reactive({
  groupId: proxy.$route.params.id,
  coin: 1,
  des: '落掉'
});
const startLoading = () => {
  loading.value = true;
}
const endLoading = () => {
  loading.value = false;
}
const confirmSend = () => {
  startLoading();
  let copyData = {
    ...data,
    coin:parseInt(data.coin+""),
  }
  proxy.$axios.post(`/api/coin/down`, copyData).then(response => {
    console.log('send info', response.data);
    endLoading();
    ElMessage({
      message: `${title.value}成功`,
      type: 'success',
    })
    proxy.$router.push('/coin');
  })
}
const onSubmit = ()=>{
  sendDialog.value = true;
}
const goBack = () => {
  proxy.$router.push('/')
}
</script>

<style lang="scss" scoped>
.row {
  line-height: 32px;
}
</style>