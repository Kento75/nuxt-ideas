<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>
      <form>
        <div class="form-content">
          <span>ユーザーID</span>
          <el-input placeholder="" v-model="formData.id"/>
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateMode">アカウントを作成する</el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" @click="handleClickSubmit">{{ buttonText }}</el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  asyncData({ redirect, store }) {
    // ログイン済みの場合は記事一覧画面にリダイレクト
    if(store.getters['user']) {
      redirect('/posts/') 
    }
    return {
      isCreateMode: false,
      formData: {
        id: ''
      }
    }
  },
  computed: {
    buttonText() {
      return this.isCreateMode ? '新規登録' : 'ログイン'
    }
  },
  methods: {
    async handleClickSubmit() {
      // ユーザー作成モードの場合
      if(this.isCreateMode) {
        try {
          await this.register({ ...this.formData })
          // 作成完了通知ダイアログを表示
          this.$notify({
            type: 'success',
            title: 'アカウント作成完了',
            message: `${this.formData.id} として登録しました`,
            position: 'bottom-right',
            duration: 1000
          })
          this.$router.push('/posts/')
        } catch(e) {
          // 作成完了通知ダイアログを表示
          this.$notify.error({
            title: 'アカウント作成失敗',
            message: '既に登録されているか、不正なユーザー ID です',
            position: 'bottom-right',
            duration: 1000
          })
        } 
      } else {
        try {
          await this.register({ ...this.formData })
          // 作成完了通知ダイアログを表示
          this.$notify({
            type: 'success',
            title: 'ログイン成功',
            message: `${this.formData.id} としてログインしました`,
            position: 'bottom-right',
            duration: 1000
          })
          this.$router.push('/posts/')
        } catch(e) {
          // 作成完了通知ダイアログを表示
          this.$notify.error({
            title: 'ログイン失敗',
            message: '不正なユーザー ID です',
            position: 'bottom-right',
            duration: 1000
          })
        }
      }
    },
    ...mapActions(['login', 'register'])
  }
}
</script>

<style>
.form-content {
  margin: 16px 0;
}
</style>
