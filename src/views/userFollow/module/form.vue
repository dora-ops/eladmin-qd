<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="被关注用户id" prop="cusId">
                            <el-input v-model="form.cusId" style="width: 370px;"/>
                        <!-- <el-select v-model="form.cusId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select> -->
                    </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="关注用户id" prop="cusFollowId">
                    <el-input v-model="form.cusFollowId" style="width: 370px;"/>
                        <!-- <el-select v-model="form.cusFollowId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select> -->
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/userFollow'
    // import { queryAll } from '@/api/selName'
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
                    cusId: '',
                    createTime: '',
                    cusFollowId: ''
                },
                rules: {
                        id: [
                            {required: true, message: '不能为空', trigger: 'blur'}
                        ],
                        cusId: [
                            {required: true, message: '被关注用户id不能为空', trigger: 'blur'}
                        ],
                        createTime: [
                            {required: true, message: '创建时间不能为空', trigger: 'blur'}
                        ],
                        cusFollowId: [
                            {required: true, message: '关注用户id不能为空', trigger: 'blur'}
                        ]
                },
                options:[]
            }
        },
        created() {
    queryAll().then(res => {
        this.options=res.content
    })
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
                cusId: '',
                createTime: '',
                cusFollowId: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
