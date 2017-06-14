<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit"
           style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="开放申请">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="开放时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                        style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                        style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button @click.native.prevent>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {
      ElRow,
      ElCol
    },
    data() {
      return {
        form: {}
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
    	console.log("mounted")
    }
  }

</script>

<style>
  .line {
    text-align: center;
  }
</style>
