<template>
    <el-form ref="form" :model="form" label-width="140px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-row :gutter="40">
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
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="性别">
                    <el-radio disabled label="男" v-model="form.cpSex">男</el-radio>
                    <el-radio disabled label="女" v-model="form.cpSex">女</el-radio>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="出生年月">
                    <el-date-picker v-model="form.cpBirthday" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="民族">
                    <el-input v-model="form.cpNationality"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="政治面貌">
                    <el-input v-model="form.cpPolitical"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="大头贴">
                    <el-input v-model="form.cpImg"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="是否购买保险">
                    <el-input v-model="form.cpInsurance"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="银行卡号">
                    <el-input v-model="form.cpBankCard"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="是否生源地贷款">
                    <el-input v-model="form.cpLoan"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="人口数量">
                    <el-input v-model="form.cpPopulation"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
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
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="其他成员3收入">
                    <el-input v-model="form.cpOthers3Income"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="个人申请材料">
                    <el-input v-model="form.cpApplications"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="特困证明材料">
                    <el-input v-model="form.cpSpecialPoor"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="下岗证明材料">
                    <el-input v-model="form.cpLaidOff"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="残疾证材料">
                    <el-input v-model="form.cpDisability"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="低保证材料">
                    <el-input v-model="form.cpLowSecurity"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form-item label="病情证明材料">
                    <el-input v-model="form.cpCondition"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="获奖证明材料">
                    <el-input v-model="form.cpAwards"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row justify="center">
            <el-button type="success" :disabled="open">提交</el-button>
            <el-button type="warning">重置</el-button>
        </el-row>
    </el-form>
</template>

<script>
import ElCol from "element-ui/packages/col/src/col";
import ElRow from "element-ui/packages/row/src/row";
import { getPoolBuildBaseInfo } from "../api/api.js";
import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
import ElRadio from "../../../node_modules/element-ui/packages/radio/src/radio";
export default {
    components: {
        ElRadio,
        ElFormItem,
        ElInput,
        ElRow,
        ElCol
    },
    data() {
        return {
            open: false,
            form: {
                "cpSno": null,
                "cpAcademy": null,
                "cpName": null,
                "cpSex": null,
                "cpStudyLength": 0,
                "cpGrade": null,
                "cpMajor": null,
                "cpClass": null,
                "cpIdCardNo": null,
                "cpBirthday": null,
                "cpNationality": null,
                "cpImg": null,
                "cpPolitical": null,
                "cpRoom": null,
                "cpTel": null,
                "cpInsurance": null,
                "cpBankCard": null,
                "cpAddress": null,
                "cpPostcode": null,
                "cpFinancialResources": null,
                "cpFamilyIncome": null,
                "cpLoan": null,
                "cpPopulation": null,
                "cpFatherName": null,
                "cpFWorkAddress": null,
                "cpFatherIncome": null,
                "cpMotherName": null,
                "cpMWorkAddress": null,
                "cpMotherIncome": null,
                "cpOthers1Name": null,
                "cpOthers1WorkAddress": null,
                "cpOthers1Income": null,
                "cpOthers2Name": null,
                "cpOthers2WorkAddress": null,
                "cpOthers2Income": null,
                "cpOthers3Name": null,
                "cpOthers3WorkAddress": null,
                "cpOthers3Income": null,
                "cpApplications": null,
                "cpSpecialPoor": null,
                "cpLaidOff": null,
                "cpDisability": null,
                "cpLowSecurity": null,
                "cpCondition": null,
                "cpAwards": null,
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    mounted() {
        getPoolBuildBaseInfo().then((res) => {
            data = res.data;
            this.form = data.data
            if (res.status != 200 && data.status != "success") {
                throw res
            } else {
                this.open = true;
                var data = res.data;
            }
        }).catch((error) => {
            var message = null;
            try {
                console.log(error)
                var descript = error.data.descript
                message = (descript != null && descript.trim() != '') && descript;
            } catch (e) {
                message = "找不到服务器地址"
            }
            this.$message({
                message: message,
                type: 'error'
            })
        })
    }
}

</script>
