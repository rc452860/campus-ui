<template>
  <el-form ref="form" :model="form" label-width="120px" @submit.prevent="onSubmit"
           style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="开放申请名称">
      <el-input v-model="form.cpName"></el-input>
    </el-form-item>
    <el-form-item label="开放时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.cpStart"
                        style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择时间" v-model="form.cpEnd"
                        style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit" type="primary">立即创建</el-button>
      <el-button @click.native.prevent>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import {requestOpenApply} from "../api/api"
  export default {
    components: {
      ElRow,
      ElCol
    },
    data() {
      return {
        form: {
        	cpName:(new Date()).getFullYear()+"建档申请",
          cpStart: new Date(),
          cpEnd:new Date()
        }
      }
    },
    methods: {
      onSubmit() {
      	console.log(this.form)
        console.log('submit!');
      	requestOpenApply(this.form).then(res=>{
          //成功处理
          console.log(res)
          if(res.state>=400 || res.data.status != "success"){
            throw res
          }else{
            this.$message({
              message:res.data.data
            })
          }
        }).catch(err=>{
        	//错误处理
          console.log(err)
          this.$message({
            message:err.data.descript || "开放申请失败",
            type:'error'
          })
        })
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
