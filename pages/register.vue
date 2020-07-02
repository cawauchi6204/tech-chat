<template>
  <div class="m-4 p-4 bg-white shadow rounded">
    <h2 class="text-2xl text-center text-darkGray">アカウント登録</h2>
    <form @submit.prevent="onSubmit">
      <div class="flex items-center justify-center flex-col w-full h-full mt-8">
        <div
          :class="{'border-red-500':form.imageUrl.errorMessage}"
          class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border border-gray-400"
        >
          <!-- v-ifで画像データがあれば表示してなければデフォルトのものを表示している -->
          <template v-if="form.imageUrl.val">
            <img
              :src="form.imageUrl.val"
              class="w-32 h-32 object-cover border rounded-full"
              @click="selectImage"
            />
            <!-- data()の中のformオブジェクトからとってきている -->
          </template>

          <template v-else>
            <i class="material-icons text-7xl text-gray" @click="selectImage">person</i>
            <!-- 初期のものはクリックメソッドがあってそれを通じてform.imageUrl.valに値を入れている。値が入ったら見た目が変わる -->
          </template>
          <input
            ref="image"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onSelectFile"
          />
          <!-- accept属性とは許可するファイル型を表す1つ以上の固有ファイル型指定子 -->
          <!-- refを指定することで$refsから直接DOMを操作することができる -->
          <!-- 今回は this.$refs.image.click(); で input タグに対して click イベントを発火させています。 -->
        </div>
        <span
          v-show="form.imageUrl.errorMessage"
          class="text-red text-sm"
        >{{form.imageUrl.errorMessage}}</span>
      </div>
      <label class="block mt-8 mb-2 ml-2 uppercase tracking-wide text-darkGray text-s">名前</label>
      <div class="h-20 mb-6">
        <input
          type="text"
          :class="{'border-red-500':form.name.errorMessage}"
          class="block w-full py-3 px-4 appearance-none bg-gray-200 text-darkGray border rounded leading-tight focus:outline-none focus:bg-white"
          v-model="form.name.val"
          @blur="validateName"
        />
        <span v-show="form.name.errorMessage" class="text-red text-sm">{{form.name.errorMessage}}</span>
      </div>

      <div class="flex">
        <button class="w-full p-3 gradation rounded-full text-white">登録</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: {
          label: "名前",
          val: null,
          errorMessage: null
        },
        imageUrl: {
          label: "アイコン画像",
          val: null,
          errorMessage: null
        }
      }
    };
  },
  methods: {
    validateName() {
      const { name } = this.form;
      const maxLength = 8;

      if (!name.val) {
        name.errorMessage = `${name.label}は必須入力項目です`;
        return;
      }

      if (name.val.length > maxLength) {
        name.errorMessage = `${name.label}は${maxLength}文字いないです`;
        return;
      }

      name.errorMessage = null;
    },
    validateImageUrl() {
      const { imageUrl } = this.form;

      if (!imageUrl.val) {
        imageUrl.errorMessage = `${imageUrl.label}は必須入力項目です`;
        return;
      }
      imageUrl.errorMessage = null;
    },
    selectImage() {
      this.$refs.image.click();
    },
    // 画像がアップロードされた瞬間このメソッドが走る
    onSelectFile(e) {
      const files = e.target.files;
      if (files.length === 0) return;
      // filesがなかった場合突き返す
      // (e)はイベントが格納されている
      // eを定数filesに格納している

      const reader = new FileReader();
      // 定数readerとしてインスタンス化している

      reader.readAsDataURL(files[0]);
      // FileReader オブジェクトを使うと、ユーザーのコンピューター内にあるファイル (もしくはバッファ上の生データ) をウェブアプリケーションから非同期的に読み込むことが出来ます。読み込むファイルやデータは File ないし Blob オブジェクトとして指定します。
      // FileReader.readAsDataURL()
      // 指定された Blob オブジェクトを読み込みます。終了後の result プロパティには、ファイルのデータを示す data: URL が格納されます。

      reader.addEventListener("load", () => {
        //addEventListener() を使用するか、このインターフェイスの onイベント名 プロパティにイベントリスナーを代入するかして、これらのイベントを待ち受けします。
        //         load
        // 読み取りが正常に完了したときに発生します。
        // onload プロパティ経由でも利用できます。

        this.upload({
          localImageFile: files[0]
        });
      });
    },
    async upload({ localImageFile }) {
      const user = await this.$auth();

      if (!user) this.$router.push("/login");
      //未ログインの場合loginページまで飛ばす

      const storageRef = this.$fireStorage.ref();
      //ストレージオブジェクト作成

      const imageRef = storageRef.child(
        `images/${user.uid}/${localImageFile.name}`
      );
      //ファイルのパスを指定

      const snapShot = await imageRef.put(localImageFile);
      this.form.imageUrl.val = await snapShot.ref.getDownloadURL();
      //ファイルを適用してファイルアップロード開始

      this.validateImageUrl()
    },
    onSubmit() {
      this.validateName()
      this.validateImageUrl()
    }
  }
};
</script>
