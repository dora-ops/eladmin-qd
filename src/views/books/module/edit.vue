<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'

export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        _id: this.data._id instanceof Object?JSON.stringify(this.data._id):this.data._id,
        title: this.data.title instanceof Object?JSON.stringify(this.data.title):this.data.title,
        subtitle: this.data.subtitle instanceof Object?JSON.stringify(this.data.subtitle):this.data.subtitle,
        pic: this.data.pic instanceof Object?JSON.stringify(this.data.pic):this.data.pic,
        author: this.data.author instanceof Object?JSON.stringify(this.data.author):this.data.author,
        summary: this.data.summary instanceof Object?JSON.stringify(this.data.summary):this.data.summary,
        publisher: this.data.publisher instanceof Object?JSON.stringify(this.data.publisher):this.data.publisher,
        pubplace: this.data.pubplace instanceof Object?JSON.stringify(this.data.pubplace):this.data.pubplace,
        pubdate: this.data.pubdate instanceof Object?JSON.stringify(this.data.pubdate):this.data.pubdate,
        dura: this.data.dura instanceof Object?JSON.stringify(this.data.dura):this.data.dura,
        page: this.data.page instanceof Object?JSON.stringify(this.data.page):this.data.page,
        price: this.data.price instanceof Object?JSON.stringify(this.data.price):this.data.price,
        binding: this.data.binding instanceof Object?JSON.stringify(this.data.binding):this.data.binding,
        isbn: this.data.isbn instanceof Object?JSON.stringify(this.data.isbn):this.data.isbn,
        isbn10: this.data.isbn10 instanceof Object?JSON.stringify(this.data.isbn10):this.data.isbn10,
        keyword: this.data.keyword instanceof Object?JSON.stringify(this.data.keyword):this.data.keyword,
        edition: this.data.edition instanceof Object?JSON.stringify(this.data.edition):this.data.edition,
        impression: this.data.impression instanceof Object?JSON.stringify(this.data.impression):this.data.impression,
        language: this.data.language instanceof Object?JSON.stringify(this.data.language):this.data.language,
        format: this.data.format instanceof Object?JSON.stringify(this.data.format):this.data.format,
        class: this.data.class instanceof Object?JSON.stringify(this.data.class):this.data.class
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
