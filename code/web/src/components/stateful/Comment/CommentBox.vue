<template>
  <div>
    <div v-for="comment in listComments">
      <comment-component
              :commentId="comment.id"
              :userId="comment.user.id"
              :userDisplayName="comment.user.displayName"
              :createdAt="comment.createdAt"
              :content="comment.content"></comment-component>
    </div>

    <div class="mt4">
      <form @submit.prevent="addComment">
        <textarea class="w-50" style="height: 50px" v-model="comment"></textarea>
        <div class="mt3">
          <button-component @click="addComment">Add comment</button-component>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import CommentComponent from './SingleComment.vue'

  const addCommentMutation = gql`
    mutation AddComment($id: String!, $content: String!) {
      addComment(referenceId: $id, content: $content) {
        id
      }
    }
  `

  const listCommentsQuery = gql`
    query ListComments($id: String!) {
      listComments(referenceId: $id, limit: 1000) {
        id
        content
        createdAt
        user {
          id
          displayName
        }
      }
    }
  `

  export default {
    components: {
      CommentComponent,
    },
    props: {
      id: {
        type: String,
      },
    },
    data () {
      return {
        comment: '',
        listComments: [],
        loadingComments: 0,
      }
    },
    apollo: {
      listComments: {
        query: listCommentsQuery,
        loadingKey: 'loadingComments',
        variables () {
          return {
            id: this.id
          }
        },
      },
    },
    methods: {
      addComment () {
        this.$apollo.mutate({
          mutation: addCommentMutation,
          variables: {
            id: this.id,
            content: this.comment,
          },
          refetchQueries: ['ListComments'],
        }).then(() => {
          this.comment = ''
        })
      },
    },
  }
</script>
