<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

                        <el-form-item label="案件名称" prop="name">
                        <el-input v-model="form.name" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="提出时间" prop="raiseTime">
                        <el-date-picker
                                v-model="form.raiseTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="执行时间" prop="executeTime">
                        <el-date-picker
                                v-model="form.executeTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="负责人姓名" prop="uname">
                        <el-input v-model="form.uname" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="负责人警号" prop="uid">
                        <el-input v-model="form.uid" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="审核人警号" prop="dealUid">
                        <el-input v-model="form.dealUid" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="侦查详情" prop="content">
                        <el-input v-model="form.content" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="审核人姓名" prop="dealUname">
                        <el-input v-model="form.dealUname" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="案件编号" prop="cid">
                        <el-input v-model="form.cid" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/projectInfo'

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
                    raiseTime: '',
                    executeTime: '',
                    uname: '',
                    uid: '',
                    dealUid: '',
                    content: '',
                    dealUname: '',
                    cid: ''
                },
                rules: {
                        id: [
                            {required: true, message: '案件编号不能为空', trigger: 'blur'}
                        ],
                        name: [
                            {required: true, message: '案件名称不能为空', trigger: 'blur'}
                        ],
                        raiseTime: [
                            {required: true, message: '提出时间不能为空', trigger: 'blur'}
                        ],
                        executeTime: [
                            {required: true, message: '执行时间不能为空', trigger: 'blur'}
                        ],
                        uname: [
                            {required: true, message: '负责人姓名不能为空', trigger: 'blur'}
                        ],
                        uid: [
                            {required: true, message: '负责人警号不能为空', trigger: 'blur'}
                        ],

                        content: [
                            {required: true, message: '侦查详情不能为空', trigger: 'blur'}
                        ],

                        cid: [
                            {required: true, message: '案件编号不能为空', trigger: 'blur'}
                        ]
                },
                options:[],
                 kind_options:['民事案件','刑事案件','行政案件'],
                imp_options:['轻','严重','紧急']
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
                raiseTime: '',
                executeTime: '',
                uname: '',
                uid: '',
                dealUid: '',
                content: '',
                dealUname: '',
                cid: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
