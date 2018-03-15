<style scoped>

</style>

<template>
    <div>
        <header-nav></header-nav>
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
        <footer-bottom></footer-bottom>
    </div>
</template>
<script>

    import HeaderNav from "./views/header-nav";
    import FooterBottom from "./views/footer-bottom";

    export default {
        data () {
            return {}
        },
        components: {
            HeaderNav,
            FooterBottom
        },
        computed: {

        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
