<template>
  <section>
    <!--&lt;!&ndash;工具条&ndash;&gt;-->
    <!--<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">-->
      <!--<el-form :inline="true" :model="filters">-->
        <!--<el-form-item>-->
          <!--<el-input v-model="filters.name" placeholder="姓名"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" v-on:click="getList">查询</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--&lt;!&ndash;<el-button type="primary" @click="handleAdd">新增</el-button>&ndash;&gt;-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-col>-->

    <!--&lt;!&ndash;列表&ndash;&gt;-->
    <!--<el-table :data="list.content" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">-->
      <!--<el-table-column type="selection" width="55">-->
      <!--</el-table-column>-->
      <!--<el-table-column type="index" width="60">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="cpName" label="标题" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="cpStart" :formatter="formateDate('cpStart')" label="开始时间" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="cpEnd" :formatter="formateDate('cpEnd')" label="结束时间" sortable>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作" align="center" width="300">-->
        <!--<template scope="scope">-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->

    <!--&lt;!&ndash;工具条&ndash;&gt;-->
    <!--<el-col :span="24" class="toolbar">-->
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="list.size" :total="list.totalPages" style="float:right;">-->
      <!--</el-pagination>-->
    <!--</el-col>-->
  </section>
</template>
<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import { requestDocList } from '../api/api';
  export default{
    data(){
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
      }
    },
    methods: {
      getList(){
        console.log(this.$route.params.id);
        this.listLoading = true;
        let para = {
          page: this.list.number,
          size: this.list.size,
          cpDocTagId: this.$route.params.id
        };
        requestDocList(para).then(res => {
          console.log(res)
          if (res.status != 200 || res.data.status != "success") {
            throw res || "获取失败";
          } else {
            this.list = res.data.data;
            this.listLoading = false;
          }
        }).catch(err => {
          this.listLoading = false;
          var message = null;
          try {
            var descript = err.data.descript
            message = (descript != null && descript.trim() != '') && descript;
          } catch (e) {
            message = "服务器内部错误"
          }
          this.$message({
            message: message,
            type: 'error'
          })
        })
      },
      selsChange: function (sels) {
        console.log(sels)
        this.sels = sels;
      },
    },
    mounted(){
      this.getList()
    }
  }
</script>
<style>

</style>
