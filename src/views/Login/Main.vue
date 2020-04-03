<template>
    <div class="main">
        Post It Login Page
        <button @click="login">Login</button>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class Main extends Vue {
        beforeMount() {
            Kakao.init('8d154019fab779af4bff62678b0a6eb6')
        }

        login() {
            Kakao.Auth.login({
                success: function(response) {
                    console.log(response);
                },
                fail: function(error) {
                    console.log(error);
                }
            })
        }

        mounted() {
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
