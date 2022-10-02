<template>
  <footer class="footer">
    Copyright
    <i class="ri-copyright-line"></i>
    2022 Gateway Admin
  </footer>
</template>

<style scoped lang="scss">
.footer {
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 0 20px;
  background: var(--el-color-white);
  border-top: 1px dashed #dcdfe6;
  margin: 0 20px;
}
.ri-copyright-line {
  display: inline-block;
  margin: 0 8px;
  &::before {
    content: '\00A9';
  }
}
</style>
