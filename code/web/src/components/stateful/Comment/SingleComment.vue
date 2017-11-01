<template>
  <div>
    <single-comment
            :userId="userId"
            :userDisplayName="userDisplayName"
            :createdAt="createdAt"
            :isRemovable="currentUserId === userId"
            @remove="removeComment"
            :content="content"></single-comment>
  </div>
</template>
<script>
  import { getUserId } from '../../../api/AuthApi'
  import { removeComment } from '../../../api/CommentApi'

  export default {
    props: {
      commentId: {
        type: String,
      },
      userId: {
        type: String,
      },
      userDisplayName: {
        type: String,
      },
      createdAt: {
        type: String,
      },
      content: {
        type: String,
      },
    },
    data () {
      return {
        currentUserId: '',
      }
    },
    mounted () {
      getUserId().then(id => {
        this.currentUserId = id
      })
    },
    methods: {
      removeComment () {
        removeComment(this.commentId)
      },
    },
  }
</script>
