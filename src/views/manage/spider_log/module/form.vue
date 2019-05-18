<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
                        <el-form-item
                        label="数据"
                        prop="data">
                        <el-input v-model="form.data" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item
                        label="任务id"
                        prop="taskId">
                        <el-select v-model="form.taskId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item
                        label="创建时间"
                        prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item
                        label="请求地址"
                        prop="url">
                        <el-input v-model="form.url" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item
                        label="请求头"
                        prop="header">
                        <el-input v-model="form.header" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/spiderLog'

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
            data: '',
            taskId: '',
            createTime: '',
            url: '',
            header: ''
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
                data: '',
                taskId: '',
                createTime: '',
                url: '',
                header: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
