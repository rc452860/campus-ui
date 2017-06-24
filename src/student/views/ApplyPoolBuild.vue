<template>
  <el-form v-if="hasPost == false && open == true" ref="form" :model="form" label-width="140px" @submit.prevent="onSubmit"
           style="margin:20px;width:60%;min-width:600px;">
    <el-row>
      <el-col :span="12">
        <el-form-item label="学号">
          <el-input :disabled="true" v-model="form.cpSno"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="学院">
          <el-input :disabled="true" v-model="form.cpAcademy"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别">
          <el-radio disabled label="男" v-model="form.cpSex">男</el-radio>
          <el-radio disabled label="女" v-model="form.cpSex">女</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓名">
          <el-input :disabled="true" v-model="form.cpName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="学制">
          <el-input :disabled="true" v-model="form.cpStudyLength"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年级">
          <el-input :disabled="true" v-model="form.cpGrade"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="专业">
          <el-input :disabled="true" v-model="form.cpMajor"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="班级">
          <el-input :disabled="true" v-model="form.cpClass"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="身份证号">
          <el-input :disabled="true" v-model="form.cpIdCardNo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出生年月">
          <el-date-picker v-model="form.cpBirthday" style="width: 100%" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="民族">
          <el-input v-model="form.cpNationality"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="政治面貌">
          <el-input v-model="form.cpPolitical"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="电话号码">
          <el-input v-model="form.cpTel"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="寝室号">
          <el-input v-model="form.cpRoom"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="银行卡号">
          <el-input v-model="form.cpBankCard"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="家庭住址">
          <el-input v-model="form.cpAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮政编码">
          <el-input v-model="form.cpPostcode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="经济来源">
          <el-input v-model="form.cpFinancialResources"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="家庭收入">
          <el-input v-model="form.cpFamilyIncome"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="人口数量">
          <el-input v-model="form.cpPopulation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否购买保险">
          <el-radio label="true" v-model="form.cpInsurance">是</el-radio>
          <el-radio label="false" v-model="form.cpInsurance">否</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否生源地贷款">
          <el-radio label="true" v-model="form.cpLoan">是</el-radio>
          <el-radio label="false" v-model="form.cpLoan">否</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="父亲姓名">
          <el-input v-model="form.cpFatherName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="父亲工作单位">
          <el-input v-model="form.cpFWorkAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="父亲收入">
          <el-input v-model="form.cpFatherIncome"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="母亲姓名">
          <el-input v-model="form.cpMotherName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="母亲工作单位">
          <el-input v-model="form.cpMWorkAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="母亲收入">
          <el-input v-model="form.cpMotherIncome"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员1姓名">
          <el-input v-model="form.cpOthers1Name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员1工作单位">
          <el-input v-model="form.cpOthers1WorkAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员1收入">
          <el-input v-model="form.cpOthers1Income"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员2姓名">
          <el-input v-model="form.cpOthers2Name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员2工作单位">
          <el-input v-model="form.cpOthers2WorkAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员2收入">
          <el-input v-model="form.cpOthers2Income"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员3姓名">
          <el-input v-model="form.cpOthers3Name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员3工作单位">
          <el-input v-model="form.cpOthers3WorkAddress"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="其他成员3收入">
          <el-input v-model="form.cpOthers3Income"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <section class="material">
        <el-form-item class="upload-item"label="照片">
          <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpImg')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpImg" :src="form.cpImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="个人申请材料">
          <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpApplications')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpApplications" :src="form.cpApplications" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="特困证明材料">
          <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpSpecialPoor')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpSpecialPoor" :src="form.cpSpecialPoor" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="下岗证明材料">
           <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpLaidOff')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpLaidOff" :src="form.cpLaidOff" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="残疾证材料">
           <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpDisability')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpDisability" :src="form.cpDisability" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="低保证材料">
           <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpLowSecurity')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpLowSecurity" :src="form.cpLowSecurity" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="病情证明材料">
           <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpCondition')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpCondition" :src="form.cpCondition" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-item"label="获奖证明材料">
           <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess('cpAwards')" :before-upload="beforeAvatarUpload">
            <img v-if="form.cpAwards" :src="form.cpAwards" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </section>

    <el-row justify="center">
      <el-button type="success" @click.prevent="onSubmit" :disabled="disabled">提交</el-button>
      <el-button type="warning">重置</el-button>
    </el-row>
  </el-form>
  <section v-else-if="hasPost == true && open == true">
    <el-steps ref="steps" center="center"  :space="400" :active="active" finish-status="success">
      <el-step title="待审核"></el-step>
      <el-step title="班主任审核"></el-step>
      <el-step title="教务处审核"></el-step>
    </el-steps>
  </section>
  <section v-else>
    <el-alert
      title="当前没有开放的申请"
      type="info">
    </el-alert>
  </section>
</template>

<script>
  import {getPoolBuildBaseInfo,postPoolBuildInfo,getStatus} from "../api/api.js";
  export default {
    data() {
      return {
      	active:0,
        open: false,
        hasPost:false,
        currentState:0,
        cpCounselorResult:0,//辅导员审核
        cpCounselorRemarks:null,//审核摘要
        cpSuperResult:0,//学工部审核
        cpSuperRemarks:null,//审核摘要
        form: {
          cpSno: null,
          cpAcademy: null,
          cpName: null,
          cpSex: null,
          cpStudyLength: 0,
          cpGrade: null,
          cpMajor: null,
          cpClass: null,
          cpIdCardNo: null,
          cpBirthday: null,
          cpNationality: null,
          cpImg: null,
          cpPolitical: null,
          cpRoom: null,
          cpTel: null,
          cpInsurance: null,
          cpBankCard: null,
          cpAddress: null,
          cpPostcode: null,
          cpFinancialResources: null,
          cpFamilyIncome: null,
          cpLoan: null,
          cpPopulation: null,
          cpFatherName: null,
          cpFWorkAddress: null,
          cpFatherIncome: null,
          cpMotherName: null,
          cpMWorkAddress: null,
          cpMotherIncome: null,
          cpOthers1Name: null,
          cpOthers1WorkAddress: null,
          cpOthers1Income: null,
          cpOthers2Name: null,
          cpOthers2WorkAddress: null,
          cpOthers2Income: null,
          cpOthers3Name: null,
          cpOthers3WorkAddress: null,
          cpOthers3Income: null,
          cpApplications: null,
          cpSpecialPoor: null,
          cpLaidOff: null,
          cpDisability: null,
          cpLowSecurity: null,
          cpCondition: null,
          cpAwards: null,
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        postPoolBuildInfo(this.form).then((res)=>{
          if (res.status != 200 || res.data.status != "success") {
            throw res
          } else {
          	this.$message.success("提交成功")
          }
        }).catch(err=>{
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
      handleAvatarSuccess(field) {
      	return (res, file)=>{
          console.log(res)
          //this.form[field] = URL.createObjectURL(file.raw);
          this.form[field] = "http://localhost:8080/upload/"+res.data.cpConvertName;
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt2M;
      },
    },
    computed: {
      disabled: function () {
        return !this.open;
      }
    },
    mounted() {
      getStatus().then(res=>{
        if (res.status != 200 || res.data.status != "success") {
          throw res
        } else {
          var data = res.data.data;
          this.open = data['open'] != undefined&&data['open'] == 1;
          this.hasPost = data['hasPost'] !=undefined&&data['hasPost'] == 1;
          this.cpCounselorResult = data['cpCounselorResult']||0;
          this.cpCounselorRemarks = data['cpCounselorRemarks']||null;
          this.cpSuperResult = data['cpSuperResult']||0;
          this.cpSuperRemarks =data['cpSuperRemarks']||null;

          this.hasPost&&this.active++
          if(this.cpCounselorResult > 0){
            this.active++
          }

          if(this.cpSuperResult > 0){
            this.active++
          }
          if(this.cpCounselorResult == 2){
            this.$nextTick(()=> {
            	console.log(this.$refs.steps.steps[1])
              this.$refs.steps.steps[this.active-1]['status'] = "error"
              this.$refs.steps.steps[this.active-1]['description'] = this.cpCounselorRemarks
            })
            /*this.$refs.steps.steps[active-1]['status'] = "error"
            this.$refs.steps.steps[active-1]['description'] = this.cpCounselorRemarks*/
            return;
          }
          if(this.cpSuperResult == 2){
            this.$nextTick(()=> {
              this.$refs.steps.steps[active-1]['status'] = "error"
              this.$refs.steps.steps[active-1]['description'] = this.cpSuperRemarks
            })
            return;
          }
        }
      }).catch(err=>{
        this.open = false;
        var message = null;
        try {
          console.log(err)
          var descript = error.data.descript
          message = (descript != null && descript.trim() != '') && descript;
        } catch (e) {
          message = "服务器内部错误"
        }
        this.$message({
          message: message,
          type: 'error'
        })
      })
      getPoolBuildBaseInfo().then((res) => {
        console.log(res)
        if (res.status != 200 || res.data.status != "success") {
          throw res
        } else {
          this.open = true;
          this.form = res.data.data;
        }
      }).catch((error) => {
        this.open = false;
        var message = null;
        try {
          console.log(error)
          var descript = error.data.descript
          message = (descript != null && descript.trim() != '') && descript;
        } catch (e) {
          message = "服务器内部错误"
        }
        this.$message({
          message: message,
          type: 'error'
        })
      })
    }
  }

</script>

<style>
  .material{
    overflow: hidden;
  }
  .material:after{
    clear: both;
  }
  .upload-item{
    float:left !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
