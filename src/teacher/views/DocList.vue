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
          <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="list.content" highlight-current-row v-loading="listLoading" @selection-change="
    "
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="cpSno" label="学号" sortable>
      </el-table-column>
      <el-table-column prop="cpName" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="cpAcademy" label="学院" sortable>
      </el-table-column>
      <el-table-column prop="cpMajor" label="专业" sortable>
      </el-table-column>
      <el-table-column prop="cpClass" label="班级" sortable>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template scope="scope">
          <el-button size="small" @click="handleViews(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="list.size"
                     :total="list.totalPages" style="float:right;">
      </el-pagination>
    </el-col>

    <!--查看-->
    <el-dialog title="查看" v-model="viewerDialogVisible" :close-on-click-modal="false">
      <div class="viewer">
        <el-row class="material-info fieldset">
          <div class="fieldset-title">信息</div>
          <el-col :span="12">
            <p><span class="prefix">学号:</span>{{viewerData.cpSno}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">学院:</span>{{viewerData.cpAcademy}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">性别:</span>{{viewerData.cpSex}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">姓名:</span>{{viewerData.cpName}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">学制:</span>{{viewerData.cpStudyLength}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">年级:</span>{{viewerData.cpGrade}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">专业:</span>{{viewerData.cpMajor}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">班级:</span>{{viewerData.cpClass}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">身份证号:</span>{{viewerData.cpIdCardNo}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">出生年月:</span>{{viewerData.cpBirthday}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">民族:</span>{{viewerData.cpNationality}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">政治面貌:</span>{{viewerData.cpPolitical}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">电话号码:</span>{{viewerData.cpTel}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">寝室号:</span>{{viewerData.cpRoom}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">银行卡号:</span>{{viewerData.cpBankCard}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">家庭住址:</span>{{viewerData.cpAddress}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">邮政编码:</span>{{viewerData.cpPostcode}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">经济来源:</span>{{viewerData.cpFinancialResources}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">家庭收入:</span>{{viewerData.cpFamilyIncome}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">人口数量:</span>{{viewerData.cpPopulation}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">是否购买保险:</span>{{viewerData.cpInsurance}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">是否生源地贷款:</span>{{viewerData.cpLoan}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">父亲姓名:</span>{{viewerData.cpFatherName}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">父亲工作单位:</span>{{viewerData.cpFWorkAddress}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">父亲收入:</span>{{viewerData.cpFatherIncome}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">母亲姓名:</span>{{viewerData.cpMotherName}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">母亲工作单位:</span>{{viewerData.cpMWorkAddress}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">母亲收入:</span>{{viewerData.cpMotherIncome}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员1姓名:</span>{{viewerData.cpOthers1Name}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员1工作单位:</span>{{viewerData.cpOthers1WorkAddress}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员1收入:</span>{{viewerData.cpOthers1Income}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员2姓名:</span>{{viewerData.cpOthers2Name}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员2工作单位:</span>{{viewerData.cpOthers2WorkAddress}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员2收入:</span>{{viewerData.cpOthers2Income}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员3姓名:</span>{{viewerData.cpOthers3Name}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员3工作单位:</span>{{viewerData.cpOthers3WorkAddress}}</p>
          </el-col>
          <el-col :span="12">
            <p><span class="prefix">其他成员3收入:</span>{{viewerData.cpOthers3Income}}</p>
          </el-col>
        </el-row>
        <div class="material-list fieldset clear">
          <div class="fieldset-title">材料列表：</div>
          <div class="material-item">
            <p class="image-title">照片</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpImg"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">个人申请材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpApplications"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">特困证明材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpSpecialPoor"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">下岗证明材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpLaidOff"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">残疾证材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpDisability"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">低保证材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpLowSecurity"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">病情证明材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpCondition"/>
            </div>
          </div>
          <div class="material-item">
            <p class="image-title">获奖证明材料</p>
            <div class="image-wapper">
              <img v-img :src="viewerData.cpAwards"/>
            </div>
          </div>
        </div>
      </div>
      <div class="operation fieldset">
        <div class="fieldset-title">
          操作
        </div>
        <div class="operation-wapper">
          <el-form v-if="isAudit(viewerData).result == 0">
            <el-form-item>
              <el-button @click="audit(viewerData.cpId,remark,true)" type="success">
                审核成功
              </el-button>
              <el-button @click="audit(viewerData.cpId,remark,false)" type="danger">
                审核失败
              </el-button>
            </el-form-item>
            <el-row justify="center" type="flex">
              <el-col :span="12">
                <el-input type="textarea" :rows="2" v-model="remark" placeholder="审核理由"></el-input>
              </el-col>
            </el-row>
          </el-form>
          <p class="audit-success" v-else-if="isAudit(viewerData).result == 1">审核通过 {{isAudit(viewerData).remark}}</p>
          <p class="audit-faild" v-else-if="isAudit(viewerData).result == 2">审核拒绝 {{isAudit(viewerData).remark}}</p>
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import {requestDocList, requestAudit} from '../api/api';
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElCol from "element-ui/packages/col/src/col";
  import {mapState} from 'vuex'
  export default{
    components: {
      ElCol,
      ElFormItem,
      ElRow,
      ElForm,
      ElButton,
      ElDialog
    },
    data(){
      return {
        filters            : {
          name: ''
        },
        sels               : [],
        listLoading        : false,
        list               : {
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
        viewerDialogVisible: false,//查看窗口
        viewerData         : {},
        remark             : ""
      }
    },
    methods   : {
      getList(){
        this.listLoading = true;
        let para         = {
          page      : this.list.number,
          size      : this.list.size,
          cpDocTagId: this.$route.params.id
        };
        requestDocList(para).then(res => {
          this.list        = res.data.data;
          this.listLoading = false;
        }).catch(err => {
          this.listLoading = false;
          var message      = null;
          try {
            var descript = err.data.descript;
            message      = (descript != null && descript.trim() != '') && descript;
          } catch (e) {
            message = "服务器内部错误"
          }
          this.$message({
            message: message,
            type   : 'error'
          })
        })
      },
      selsChange : function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.cpId);
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          requestDelDocTags(ids).then((response) => {
            let {status, data, descript} = response.data;

            this.$message({
              message: "删除成功",
              type   : 'success'
            });
            this.getList();
          }).catch((error) => {
            this.listLoading = false;
          })

        }).catch(() => {

        });
      },
      handleCurrentChange(value) {
        this.list.number = value - 1;
        this.getList()
      },
      handleViews: function (index, row) {
        this.viewerDialogVisible = true;
        this.viewerData          = row;
      },
      audit(id, remark, result) {
        let data = {
          "cpId"  : id,
          "remark": remark,
          "result": result
        };
        requestAudit(data).then((res) => {
          //TODO 认证返回结果处理
          this.viewerDialogVisible = false;
          this.getList();
        }).catch((err) => {
          //TODO 认证请求失败处理
          this.viewerDialogVisible = false;
          this.getList();
        })
      },
      isAudit(viewerData) {
        let result = null;
        if (this.cpTeacher.cpRole == "学工部") {
          result = {
            "result": viewerData.cpSuperResult,
            "remark": viewerData.cpSuperRemarks
          }
        }

        if (this.cpTeacher.cpRole == "辅导员") {
          result = {
            "result": viewerData.cpCounselorResult,
            "remark": viewerData.cpCounselorRemarks
          }
        }
        console.log(this.cpTeacher.cpRole == "学工部");
        console.log(result);
        return result;
      }
    },
    computed  : {
      ...mapState([
        'cpTeacher'
      ])
    },
    mounted(){
      this.getList()
    }
  }
</script>
<style>
  .viewer {
  }

  .clear:after {
    display: block;
    content: '';
    clear: both;
  }

  .prefix {
    padding-left: 20%;
    padding-right: 20px;
  }

  .material-list {
  }

  .material-info {
  }

  .fieldset {
    border: 1px solid #cccccc;
    border-radius: 6px;
    padding: 10px 0;
    position: relative;
  }

  .fieldset-title {
    display: inline-block;
    position: absolute;
    left: 30px;
    top: -10px;
    background: #ffffff;
    padding: 0 15px;
  }

  .material-item {
    width: 50%;
    float: left;
  }

  .image-title {
    text-align: center;
  }

  .image-wapper {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }

  .image-wapper img {
    width: 100%;
    line-height: 300px;
  }

  .operation-wapper {
    text-align: center;
  }

  .audit-success {
    color: #13CE66;
    text-align: center;
    font-size: 16px;
  }

  .audit-faild {
    color: #FF4949;
    text-align: center;
    font-size: 16px;
  }
</style>
