<template>
    <div class="main">
        Post It
        <div class="login-button" @click="login">Login with Kakao</div>
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

    .login-button {
        cursor: pointer;
        border: 1px solid darkgrey;
        padding: 5px 15px;
        border-radius: 10px;
        margin-top: 10px;
    }
</style>
