<template>
  <div class="flex justify-center">
    <div class="flex items-center flex-col h-48 mt-20 w-4/5 p-4 bg-white shadow rounded">
      <div class="w-full border-b pb-2 mb-10">
        <p class="text-center">ログイン</p>
      </div>
      <form class="w-full" @submit.prevent="onSubmit">
        <!-- イベント修飾子のpreventはページがリロードされないようにしている -->
        <button
          type="submit"
          class="w-full bg-google py-3 px-10 text-white rounded focus:outline-none focus:shadow-outline border"
        >Googleでログイン</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$fireAuth.signInWithRedirect(provider);
      // injectメソッドでfirebase を Vue インスタンスに注入しているので this.$名前 で処理を呼び出す事ができる。
    }
  }
};
</script>
