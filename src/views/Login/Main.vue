<template>
    <div class="main">
        <div class="title">Post It</div>
        <div class="description">저희 사이트는 크롬에 최적화 되었습니다.</div>
        <div class="login-button" @click="login"></div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class Main extends Vue {
        login() {
            this.$store.dispatch('login')
        }
    }
</script>

<style scoped lang="scss">
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .title {
        margin-bottom: 50px;
        font-size: 24px;
        font-weight: bold;
    }

    .title, .description {
        color: antiquewhite;
    }

    .description {
        margin-bottom: 10px;
    }

    .login-button {
        width: 50px;
        height: 70px;
        cursor: pointer;
        border: 1px solid darkgrey;
        padding: 5px 15px;
        border-radius: 50%;
        margin-top: 10px;
        background-image: url("../../assets/login-button.png");
        background-size: 100px;
        background-position: center;
        background-repeat: no-repeat;
        background-color: rgb(250, 220, 4);
    }
</style>
