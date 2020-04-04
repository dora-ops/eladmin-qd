<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="花费" prop="price">
                        <el-input v-model="form.price" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="行为" prop="type">
                        <el-input v-model="form.type" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="用户" prop="uid">
                        <el-input v-model="form.uid" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/order'
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
                    price: '',
                    type: '',
                    uid: ''
                },
                rules: {
                        id: [
                            {required: true, message: 'id不能为空', trigger: 'blur'}
                        ],
                        price: [
                            {required: true, message: '花费不能为空', trigger: 'blur'}
                        ],
                        type: [
                            {required: true, message: '行为不能为空', trigger: 'blur'}
                        ],
                        uid: [
                            {required: true, message: '用户不能为空', trigger: 'blur'}
                        ]
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
                price: '',
                type: '',
                uid: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
