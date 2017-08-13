<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="list.content" height="700" highlight-current-row v-loading="listLoading"
              @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column  type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="cpIdCardNo" label="身份证号码" sortable>
      </el-table-column>
      <el-table-column prop="cpSno" label="学号" sortable>
      </el-table-column>
      <el-table-column prop="cpName" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="cpOldName" label="曾用名" sortable>
      </el-table-column>
      <el-table-column prop="cpSex" label="性别" sortable>
      </el-table-column>
      <el-table-column prop="cpAcademy.cpName" label="学院" sortable>
      </el-table-column>
      <el-table-column prop="cpMajor.cpName" label="专业" sortable>
      </el-table-column>
      <el-table-column prop="cpClass.cpName" label="班级" sortable>
      </el-table-column>
      <!--<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="120" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>-->
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="list.size"
                     :total="list.totalElements" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="身份证号码" prop="name">
          <el-input v-model="editForm.cpIdCardNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editForm.cpSno" autoComplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.cpName" :min="0" :max="200"></el-input>
        </el-form-item>
        <el-form-item label="曾用名">
          <el-input v-model="editForm.cpOldName" :min="0" :max="200"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio class="radio" v-model="editForm.cpSex" label="男">男</el-radio>
            <el-radio class="radio" v-model="editForm.cpSex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="学院">
          <el-select
            v-model="editForm.cpAcademy.cpName"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteAcademy(1)"
            :loading="academyLoading">
            <el-option
              v-for="item in academyData"
              :key="item.cpId"
              :label="item.cpName"
              :value="item.cpId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select
            v-model="editForm.cpMajor.cpName"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteAcademy(2)"
            :loading="majorLoading">
            <el-option
              v-for="item in majorData"
              :key="item.cpId"
              :label="item.cpName"
              :value="item.cpId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select
            v-model="editForm.cpClass.cpName"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteAcademy(3)"
            :loading="classLoading">
            <el-option
              v-for="item in classData"
              :key="item.cpId"
              :label="item.cpName"
              :value="item.cpId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import {getStudentList,getAcademyByname, removeUser, batchRemoveUser, editUser, addUser} from '../api/api';
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";

  export default {
    components: {ElInput},
    data() {
      return {
        filters        : {
          name: ''
        },
        list           : {
          "content"         : [],
          "totalPages"      : 0,
          "totalElements"   : 0,
          "last"            : false,
          "number"          : 0,
          "size"            : 20,
          "sort"            : null,
          "numberOfElements": 0,
          "first"           : true
        },
        listLoading    : false,
        sels           : [],//列表选中列
        editFormVisible: false,//编辑界面是否显示
        editLoading    : false,
        editFormRules  : {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm       : {
          cpName   : '',
          cpSex    :"男",
          cpAcademy:[],
          cpMajor  :[],
          cpClass  :[]
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        academyLoading:false,
        academyData:[],
        majorLoading:false,
        majorData:[],
        classLoading:false,
        classData:[]
      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.number = val - 1;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
          page: this.list.number,
          size: this.list.size
        };
        this.listLoading = true;
        //NProgress.start();
        getStudentList(para).then((res) => {
          if (res.status != 200) {
            this.$message({
              message: res.data.descript,
              type: 'error'
            });
          } else {
            var data = res.data;
            console.log(data);
            this.list        = data;
            this.listLoading = false;
            //NProgress.done();
          }
        }).catch(error => {
          console.log(error);
          this.$message({
            message: "服务器内部错误",
            type: 'error'
          });
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id};
          removeUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        console.log(row);
        this.editForm = Object.assign({}, row);
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {ids: ids};
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      },
      remoteAcademy(rank){
        return (query)=>{
          if(query!=""){
            this.setSelectLoading(true,rank);
            getAcademyByname({name:query,rank:rank}).then((res)=>{
              console.log(res);
              if (res.status != 200) {
                this.$message({
                  message: res.data.descript,
                  type: 'error'
                });
              } else {
                var data = res.data;
                this.setSelectData(data,rank);
              }
              this.setSelectLoading(false,rank);

            }).catch((err)=>{
              this.setSelectLoading(false,rank);

            })
          }else{
            this.setSelectLoading(false,rank);
          }
        }
      },
      setSelectData(data,rank){
        switch (rank){
          case 1:
            this.academyData = data.data;
            break;
          case 2:
            this.majorData = data.data;
            break;
          case 3:
            this.classData = data.data;
            break;
        }
      },
      setSelectLoading(status,rank){
        switch (rank){
          case 1:
            this.academyLoading = status;
            break;
          case 2:
            this.majorLoading = status;
            break;
          case 3:
            this.classLoading = status;
            break;
        }
      }
      ,
      change(value){

      }
    },
    mounted() {
      this.getUsers();
    }
  }

</script>

<style scoped>

</style>
