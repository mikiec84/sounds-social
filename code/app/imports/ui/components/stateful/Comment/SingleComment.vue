<template>
  <div>
    <comment-component
            :userId="userId"
            :userDisplayName="userDisplayName"
            :createdAt="createdAt"
            :isRemovable="currentUserId === userId"
            @remove="removeComment"
            :content="content"></comment-component>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import CommentComponent from '../../pure/Comment/SingleComment.vue'
  import { getUserId } from '../../../api/AuthApi'

  const removeCommentMutation = gql`
    mutation RemoveComment($id: String!) {
      removeComment(id: $id) {
        id
      }
    }
  `

  export default {
    components: { CommentComponent },
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
    data() {
      return {
        currentUserId: '',
      }
    },
    mounted() {
      getUserId().then(id => this.currentUserId = id)
    },
    methods: {
      removeComment() {
        this.$apollo.mutate({
            mutation: removeCommentMutation,
            variables: {
              id: this.commentId,
            },
            refetchQueries: ['ListComments'],
          })
      },
    },
  }
</script>
