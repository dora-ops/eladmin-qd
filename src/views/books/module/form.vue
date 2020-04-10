<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

                        <el-form-item label="书名" prop="title">
                        <el-input v-model="form.title" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="副书名" prop="subtitle">
                        <el-input v-model="form.subtitle" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="图片" prop="pic">
                        <el-input v-model="form.pic" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="摘要" prop="summary">
                        <el-input v-model="form.summary" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="出版社" prop="publisher">
                        <el-input v-model="form.publisher" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="出版地" prop="pubplace">
                        <el-input v-model="form.pubplace" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="出版时间" prop="pubdate">
                        <el-input v-model="form.pubdate" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="出版时间" prop="dura">
                        <el-input v-model="form.dura" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="页数" prop="page">
                        <el-input v-model="form.page" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="价格" prop="price">
                        <el-input v-model="form.price" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="装帧方式" prop="binding">
                        <el-input v-model="form.binding" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="ISBN" prop="isbn">
                        <el-input v-model="form.isbn" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="ISBN 10位" prop="isbn10">
                        <el-input v-model="form.isbn10" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="主题词" prop="keyword">
                        <el-input v-model="form.keyword" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="版次" prop="edition">
                        <el-input v-model="form.edition" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="印次" prop="impression">
                        <el-input v-model="form.impression" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="正文语种" prop="language">
                        <el-input v-model="form.language" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="开本" prop="format">
                        <el-input v-model="form.format" style="width: 370px;"/>
                    </el-form-item>
                <el-form-item label="中图法分类" prop="class">
                        <el-input v-model="form.class" style="width: 370px;"/>
                    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit} from '@/api/books'
    import axios from "axios";
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
                    _id: '',
                    title: '',
                    subtitle: '',
                    pic: '',
                    author: '',
                    summary: '',
                    publisher: '',
                    pubplace: '',
                    pubdate: '',
                    dura: '',
                    page: '',
                    price: '',
                    binding: '',
                    isbn: '',
                    isbn10: '',
                    keyword: '',
                    edition: '',
                    impression: '',
                    language: '',
                    format: '',
                    class: ''
                },
                rules: {
                        _id: [
                            {required: true, message: '_id不能为空', trigger: 'blur'}
                        ],
                        title: [
                            {required: true, message: '书名不能为空', trigger: 'blur'}
                        ],
                        subtitle: [
                            {required: true, message: '副书名不能为空', trigger: 'blur'}
                        ],
                        pic: [
                            {required: true, message: '图片不能为空', trigger: 'blur'}
                        ],
                        author: [
                            {required: true, message: '作者不能为空', trigger: 'blur'}
                        ],
                        summary: [
                            {required: true, message: '摘要不能为空', trigger: 'blur'}
                        ],

                        pubplace: [
                            {required: true, message: '出版地不能为空', trigger: 'blur'}
                        ],
                        pubdate: [
                            {required: true, message: '出版时间不能为空', trigger: 'blur'}
                        ],

                        page: [
                            {required: true, message: '页数不能为空', trigger: 'blur'}
                        ],
                        price: [
                            {required: true, message: '价格不能为空', trigger: 'blur'}
                        ],

                        isbn: [
                            {required: true, message: 'ISBN不能为空', trigger: 'blur'}
                        ],
                        isbn10: [
                            {required: true, message: 'ISBN 10位不能为空', trigger: 'blur'}
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
                var sql = "db.collection('books').add({data: [?]})";
                delete this.form._id
                this.dealForm(this.form)
                this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
                sql = sql.replace("?", JSON.stringify(this.form));
                this.params = { sql: sql, type: "add" };
                axios.post("http://localhost:3000/api/base/vx", this.params).then(res => {
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
                var sql = "db.collection('books').doc('?').update({data: ?})";
                this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
                this.dealForm(this.form)
                sql = sql
                        .replace("?", this.form._id)
                        .replace("?", JSON.stringify(this.form));
                this.params = { sql: sql, type: "update" };
                axios.post("http://localhost:3000/api/base/vx", this.params).then(res => {
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
                _id: '',
                title: '',
                subtitle: '',
                pic: '',
                author: '',
                summary: '',
                publisher: '',
                pubplace: '',
                pubdate: '',
                dura: '',
                page: '',
                price: '',
                binding: '',
                isbn: '',
                isbn10: '',
                keyword: '',
                edition: '',
                impression: '',
                language: '',
                format: '',
                class: ''
            }
            },
            dealForm(form){

            }

    }
    }
</script>

<style scoped>

</style>
