<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="试卷名" prop="examName">
                        <el-input v-model="form.examName" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="试卷id" prop="examId">
                        <el-select v-model="form.examId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="学号" prop="userId">
                        <el-select v-model="form.userId" placeholder="请选择" style="width: 370px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="用户名" prop="userName">
                        <el-input v-model="form.userName" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="成绩" prop="score">
                        <el-input v-model="form.score" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="答对率" prop="average">
                        <el-input v-model="form.average" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="创建日期" prop="createTime">
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
    import {add, edit} from '@/api/grade'

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
                    examName: '',
                    examId: '',
                    userId: '',
                    userName: '',
                    score: '',
                    average: '',
                    createTime: ''
                },
                rules: {
                        id: [
                            {required: true, message: '不能为空', trigger: 'blur'}
                        ],
                        examName: [
                            {required: true, message: '试卷名不能为空', trigger: 'blur'}
                        ],
                        examId: [
                            {required: true, message: '试卷id不能为空', trigger: 'blur'}
                        ],
                        userId: [
                            {required: true, message: '学号不能为空', trigger: 'blur'}
                        ],
                        userName: [
                            {required: true, message: '用户名不能为空', trigger: 'blur'}
                        ],
                        score: [
                            {required: true, message: '成绩不能为空', trigger: 'blur'}
                        ],
                        average: [
                            {required: true, message: '答对率不能为空', trigger: 'blur'}
                        ],
                        createTime: [
                            {required: true, message: '创建日期不能为空', trigger: 'blur'}
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
                examName: '',
                examId: '',
                userId: '',
                userName: '',
                score: '',
                average: '',
                createTime: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
