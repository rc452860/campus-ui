<template>
    <!--<el-upload class="upload-demo" drag action="http://localhost:8080/common" multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或
                                    <em>点击上传</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>-->
    <el-upload class="avatar-uploader" action="http://localhost:8080/common" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
    <!--<el-form :model="form">
        <el-upload class="upload-demo" ref="upload" action="http://localhost:8080/common/v2"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
         :file-list="form.filelist"
         :auto-upload="false"
         :on-change="change"
         >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-input v-model="form.name"></el-input>
        <el-button @click.prevent="submit">提交</el-button>
    </el-form>-->
</template>
<script>
import {testUpload} from '../api/api.js'
export default {
    data() {
        return {
          imageUrl:null,
            form: {
                filelist:[],
                file: [],
                name: null
            }
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res, file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        submit() {
            console.log(this.$refs.upload)
            console.log(this.form)
            var data = new FormData();
            for(var item in this.form){
                console.log(this.form[item])
                data.append(item,this.form[item])
            }
            testUpload(data).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        },
        change(file,filelist){
            console.log(file,filelist)
            if(filelist.length > 1){
                filelist.shift()
                this.form.file = file.raw;
            }

        }
    },
    mounted() {

    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
