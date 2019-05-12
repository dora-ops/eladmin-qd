<template>
  <div>
   
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false
    }
  },
  methods: {
    click() {
      this.dialogTableVisible = true
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
.my-blockquote{
  margin: 0px 0px 10px;
  padding: 12px;
  line-height: 22px;
  border-left: 5px solid #00437B;
  border-radius: 0 2px 2px 0;
  background-color: #f2f2f2;
}
.my-code{
  position: relative;
  padding: 15px;
  line-height: 20px;
  border-left: 5px solid #ddd;
  color: #333;
  font-family: Courier New;
  font-size: 12px
}
</style>
