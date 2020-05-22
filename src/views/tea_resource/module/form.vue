<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="教案名称" prop="name">
                        <el-input v-model="form.name" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="教案类型" prop="type">
                        <el-input v-model="form.type" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="文件后缀" prop="fileType">
                        <el-input v-model="form.fileType" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="是否是特色教案" prop="isSpecial">
                        <el-input v-model="form.isSpecial" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="评分" prop="score">
                        <el-input v-model="form.score" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="简介" prop="info">
                        <el-input v-model="form.info" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="上传人编号" prop="createId">
                        <el-select v-model="form.createId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="上传人姓名" prop="createName">
                        <el-input v-model="form.createName" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="班级id" prop="claId">
                        <el-select v-model="form.claId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/teaResource'

    export default {
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
            sup_this: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                loading: false, dialog: false,
                form: {
                    id: '',
                    name: '',
                    createTime: '',
                    type: '',
                    fileType: '',
                    isSpecial: '',
                    score: '',
                    info: '',
                    createId: '',
                    createName: '',
                    claId: ''
                },
                rules: {
                        id: [
                            {required: true, message: 'ID不能为空', trigger: 'blur'}
                        ],

                        createTime: [
                            {required: true, message: '创建时间不能为空', trigger: 'blur'}
                        ],








                },
                options:[]
            }
        },
        methods: {
            cancel() {
                this.resetForm()
            },
            doSubmit() {
                this.loading = true
                if (this.isAdd) {
                    this.doAdd()
                } else this.doEdit()
            },
            doAdd() {
                add(this.form).then(res => {
                    this.resetForm()
                this.$notify({
                    title: '添加成功',
                    type: 'success',
                    duration: 2500
                })
                this.loading = false
                this.$parent.$parent.init()
            }).
                catch(err => {
                    this.loading = false
                console.log(err.response.data.message)
            })
            },
            doEdit() {
                edit(this.form).then(res => {
                    this.resetForm()
                this.$notify({
                    title: '修改成功',
                    type: 'success',
                    duration: 2500
                })
                this.loading = false
                this.sup_this.init()
            }).
                catch(err => {
                    this.loading = false
                console.log(err.response.data.message)
            })
            },
            resetForm() {
                this.dialog = false
                this.$refs['form'].resetFields()
                this.form = {
                id: '',
                name: '',
                createTime: '',
                type: '',
                fileType: '',
                isSpecial: '',
                score: '',
                info: '',
                createId: '',
                createName: '',
                claId: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
