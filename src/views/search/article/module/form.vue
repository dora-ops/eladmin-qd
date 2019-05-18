<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
                        <el-form-item
                        label="标题"
                        prop="title">
                        <el-input v-model="form.title" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item
                        label="摘要"
                        prop="conTent">
                        <el-input v-model="form.conTent" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item
                        label="阅读"
                        prop="reAd">
                        <el-input v-model="form.reAd" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item
                        label="评论"
                        prop="comMent">
                        <el-input v-model="form.comMent" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item
                        label="时间"
                        prop="pubTime">
                        <el-date-picker
                                v-model="form.pubTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/article'

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
            title: '',
            conTent: '',
            reAd: '',
            comMent: '',
            pubTime: '',
            createTime: ''
        },
            rules: {
                    id: [
                        {required: true, message: 'ID', trigger: 'blur'}
                    ],





                    createTime: [
                        {required: true, message: '创建时间', trigger: 'blur'}
                    ]
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
                title: '',
                conTent: '',
                reAd: '',
                comMent: '',
                pubTime: '',
                createTime: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
