export default async function ({ redirect, app }) {
  // plugin を含むルートの Vue インスタンスである app
  // ユーザーを別のルートにリダイレクトさせる関数のredirect
  //を引数にとっている
  console.log('async functionが走りました')

  if (await app.$auth()) {
    redirect('/')
  }
}

// Middleware とは Nuxt が用意している機能で、ページが表示される前の処理を行う場所です。 そのため、ログイン中かどうかによってページの表示するかどうかの判定などを行いたいときはこの Middleware で行います。

// asyncData はコンポーネント（ページコンポーネントに限ります）がロードされる前に毎回呼び出されます
// 第一引数として context（オブジェクト）を受け取り、context を使ってデータを取得してコンポーネントのデータを返します
// asyncData メソッド内で、コンポーネントのインスタンスに this を経由してアクセスしてはいけません。なぜなら asyncData メソッドはコンポーネントが インスタンス化される前に 呼び出されるためです。
