<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
                      
                <el-form-item
                        label="课程名"
                        prop="name">
                        <el-input v-model="form.name" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="课程号"
                        prop="number">
                        <el-input v-model="form.number" style="width: 370px;"/>
                </el-form-item>
               
                <el-form-item
                        label="面向专业"
                        prop="major">
                        <el-input v-model="form.major" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="总学时"
                        prop="period">
                        <el-input v-model="form.period" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="理论学时"
                        prop="theory">
                        <el-input v-model="form.theory" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="实验学时"
                        prop="experiment">
                        <el-input v-model="form.experiment" style="width: 370px;"/>
                </el-form-item>
                <el-form-item
                        label="实验类型"
                        prop="type">
                        <el-input v-model="form.type" style="width: 370px;"/>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/course'

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
            number: '',
            createTime: '',
            major: '',
            period: '',
            theory: '',
            experiment: '',
            type: ''
        },
            rules: {
                    id: [
                        {required: true, message: 'ID', trigger: 'blur'}
                    ],


                    createTime: [
                        {required: true, message: '创建时间', trigger: 'blur'}
                    ],





            }
        ,
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
                number: '',
                createTime: '',
                major: '',
                period: '',
                theory: '',
                experiment: '',
                type: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
