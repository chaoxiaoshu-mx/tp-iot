<!-- 开关(0, 1) -->
<template>
  <div class="switch-container">
    <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949" :width="60"
               :disabled="disabled"
               @change="switchChange"></el-switch>
  </div>

</template>

<script>
export default {
  name: "CommonSwitch",
  props: {
    value: {
      type: [Boolean],
      default: false
    },
    disabled: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      switchValue: false
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.switchValue = newValue;
      },
      immediate: true
    }
  },
  methods: {
    switchChange(value) {
      this.$emit("change", value)
    }
  }
}
</script>

<style scoped>
.switch-container {
  height: 60px;
  line-height: 60px;
}
</style>