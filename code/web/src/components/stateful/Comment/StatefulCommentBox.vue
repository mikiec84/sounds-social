<template>
  <div>
    <div v-for="comment in listComments" :key="comment.id">
      <comment-component
              :commentId="comment.id"
              :userId="comment.user.id"
              :userDisplayName="comment.user.displayName"
              :createdAt="comment.createdAt"
              :content="comment.content"></comment-component>
    </div>

    <div class="mt4" v-if="userIsAuthenticated">
      <form @submit.prevent="addComment">
        <textarea class="w-50" style="height: 50px" v-model="comment"></textarea>
        <div class="mt3">
          <button-component @click="addComment" v-text="$t('Add comment')"></button-component>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import CommentComponent from './StatefulSingleComment.vue'
  import { addComment } from '../../../api/CommentApi'

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
        addComment(this.id, this.comment).then(() => {
          this.comment = ''
        })
      },
    },
  }
</script>
