<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  
    <!--列表-->
    <el-table :data="list.content" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="cpName" label="标题" sortable>
      </el-table-column>
      <el-table-column prop="cpStart" :formatter="formateDate('cpStart')" label="开始时间" sortable>
      </el-table-column>
      <el-table-column prop="cpEnd" :formatter="formateDate('cpEnd')" label="结束时间" sortable>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template scope="scope">
          <el-button size="small" @click="handleViews(scope.$index, scope.row)">查看</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="list.size" :total="list.totalPages" style="float:right;">
      </el-pagination>
    </el-col>
  
    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form ref="editForm" :model="editForm" label-width="120px" @submit.prevent="onSubmit">
        <el-form-item label="开放申请名称">
          <el-input v-model="editForm.cpName"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.cpStart" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="editForm.cpEnd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit('edit')" type="primary">修改</el-button>
          <el-button @click.prevent="onCancle('edit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  
    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addForm" label-width="120px" @submit.prevent="onSubmit">
        <el-form-item label="开放申请名称">
          <el-input v-model="addForm.cpName"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.cpStart" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="addForm.cpEnd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit('add')" type="primary">创建</el-button>
          <el-button @click.prevent="onCancle('add')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import util from '../../common/js/util'
//import NProgress from 'nprogress'
import { requestDocTagList, requestOpenApply, requestDelDocTags } from '../api/api';

export default {
  data() {
    return {
      filters: {
        name: ''
      },
      sels: [],
      listLoading: false,
      list: {
        "content": [],
        "totalPages": 0,
        "totalElements": 0,
        "last": false,
        "number": 1,
        "size": 10,
        "sort": null,
        "numberOfElements": 0,
        "first": true
      },

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {
        "cpId": null,
        "cpName": null,
        "cpStart": null,
        "cpEnd": null
      },

      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        cpName: (new Date()).getFullYear() + "建档申请",
        cpStart: new Date(),
        cpEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
      },
      onCancle(val) {
        if (val == 'add') {
          this.addFormVisible = false;
        }
        if (val == 'edit') {
          this.editFormVisible = false;
        }
      }
    }
  },
  methods: {
    formateDate(val) {
      return (row, col) => {
        if (row[val] instanceof Date) {
          return row[val].toLocaleString()
        } else {
          return (new Date()).toLocaleString()
        }
      }
    },
    //获取列表
    getList() {
      let para = {
        page: this.list.number,
        size: this.list.size
      };
      this.listLoading = true;
      requestDocTagList(para).then((res) => {
        if (res.status != 200 || res.data.status != "success") {
          throw res || "获取失败"
        } else {
          this.list = res.data.data;
          this.listLoading = false;
        }
      }).catch(error => {
        try {
          this.$message({
            message: err.data.descript,
            type: 'error'
          });
        } catch (e) {
          this.$message({
            message: "服务器内部错误",
            type: 'error'
          });
        }
        this.listLoading = false;
      });
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        //NProgress.start();
        let para = { ids: [row.cpId] };
        requestDelDocTags([row.cpId]).then((response) => {
          let { status, data, descript } = response.data;
          if (response.status !== 200 || status != "success") {
            throw response
          } else {
            sessionStorage.setItem("teacher", data);
            this.getList();
          }
        }).catch((error) => {
          console.log(error)
          var message = null;
          try {
            var descript = error.data.descript
            message = (descript != null && descript.trim() != '') && descript;
          } catch (e) {
            message = "服务器错误"
          }
          this.$message({
            message: message,
            type: 'error'
          })
          this.listLoading = false;
        })
      }).catch((err) => {
        console.log(err)
      });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
    },
    handleCurrentChange(value) {
      this.list.number = value
      this.getList()
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

          });
        }
      });
    },
    //新增
    onSubmit: function (val) {
      console.log(val)
      this.$refs[val + 'Form'].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this[val + 'Loading'] = true;
            //NProgress.start();
            console.log(this[val + 'Form'])
            requestOpenApply(this[val + 'Form']).then(res => {
              //成功处理
              if (res.state >= 400 || res.data.status != "success") {
                throw res
              } else {
                this.$message({
                  message: res.data.data
                })
                this[val + 'Loading'] = false;
                this[val + 'FormVisible'] = false;
                this.getList();
              }
            }).catch(err => {
              //错误处理
              console.log(err)
              this.$message({
                message: err.data.descript || "开放申请失败",
                type: 'error'
              })
              this[val + 'Loading'] = false;
              this[val + 'FormVisible'] = false;
            })
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
        let para = { ids: ids };

      }).catch(() => {

      });
    },

    handleViews: function (index, row) {

    }
  },
  mounted() {
    this.getList();
  }
}

</script>

<style scoped>
.line {
  text-align: center;
}
</style>
