<template>
  <el-row class="container">
    <el-col :span="24">
      <el-button type="success" @click="entryStudent">学生登录</el-button>
      <el-button type="info" @click="entryTeacher">教师登录</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      ElCol,
      ElRow},
    data() {
      return {

      }
    },
    methods: {
      entryStudent(){
          this.$router.push("/student/login")
      },
      entryTeacher(){
        this.$router.push("/teacher/login")
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  @import '~scss_vars';

  .container {
    text-align: center;
    margin-top:300px;
  }
</style>
