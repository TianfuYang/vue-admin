<template>
    <div>

    <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="sd 字"></el-input-number>
    <el-input-number v-model="num1"></el-input-number>
    <el-input-number size="small" v-model="num3"></el-input-number>
    

    </div>
    
</template>



<script>
// @ is an alias to /src

export default {
  name: "login",
  data() {
      return {
          num:0,
        num1: 1,
         num2: 1,
        num3: 1,
        num4: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
}
</script>
<style scoped>

</style>