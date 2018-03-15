<style lang="less" scoped>
    @import "../styles/common.css";
    .footer {
        z-index: 100;
        font-size: 14px;
        background-color: #3d3d3d;
        height: 34px;
        line-height: 35px;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        .container {
            margin-right: auto;
            margin-left: auto;
            padding: 0 15px;
            a{
                color: #ffffff
            }
        }
    }
</style>

<template>
    <div class="footer">
        <Row class="container">
            <Col span="12">
                <router-link :to="{ path: '/' }">Website</router-link>
            </Col>
            <Col span="12"></Col>
        </Row>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  computed: {},
  created() {
      
  }
}
</script>
