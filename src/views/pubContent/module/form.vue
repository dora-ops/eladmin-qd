<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                <el-form-item label="介绍" prop="description">
                        <el-input v-model="form.description" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="属性" prop="property">
                        <el-input v-model="form.property" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="标签" prop="tag">
                        <el-input v-model="form.tag" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="资源id" prop="resId">
                     <el-input v-model="form.resId" style="width: 370px;"/>
                     
                    </el-form-item>
                <el-form-item label="用户id" prop="cusId">
                    <el-input v-model="form.cusId" style="width: 370px;"/>
                       
                    </el-form-item>
                <el-form-item label="是否打水印" prop="flag">
                        <el-input v-model="form.flag" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="地址" prop="url">
                        <el-input v-model="form.url" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="喜欢" prop="likeCount">
                        <el-input v-model="form.likeCount" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="收藏" prop="comCount">
                        <el-input v-model="form.comCount" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/pubContent'
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
                    title: '',
                    createTime: '',
                    description: '',
                    property: '',
                    tag: '',
                    resId: '',
                    cusId: '',
                    flag: '',
                    url: '',
                    likeCount: '',
                    comCount: ''
                },
                rules: {
                        id: [
                            {required: true, message: 'ID不能为空', trigger: 'blur'}
                        ],

                        createTime: [
                            {required: true, message: '创建时间不能为空', trigger: 'blur'}
                        ],







                        likeCount: [
                            {required: true, message: '喜欢不能为空', trigger: 'blur'}
                        ],
                        comCount: [
                            {required: true, message: '收藏不能为空', trigger: 'blur'}
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
                title: '',
                createTime: '',
                description: '',
                property: '',
                tag: '',
                resId: '',
                cusId: '',
                flag: '',
                url: '',
                likeCount: '',
                comCount: ''
            }
            }
        }
    }
</script>

<style scoped>

</style>
