<template>
  <div v-if="!loading">
    <layout-component>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="getTrack">
          <track-component
                  :timeAgo="getTrack.createdAt"
                  :label="getTrack.name"
                  :description="getTrack.description"
                  :username="getTrack.creator.username"
                  @open-profile="$router.push('/profile/' + getTrack.creator._id)"
                  @open-track="playTrack"
                  @pauseTrack="pauseTrack"
                  :noBorder="true"
                  :fileUrl="getTrack.fileUrl"
                  :playingPos="playingPos"
                  :isPlaying="isPlaying"
                  :waveform-src="getTrack.waveformSrc"></track-component>

          <div class="ph3">
            <div v-if="getTrack.isRemovable" class="mt4">
              <button-component @click="removeTrack">Remove sound</button-component>
            </div>

            <h2 class="f3 mb3 mt5">Comments</h2>
            <comment-box :id="getTrack._id"></comment-box>
          </div>
        </div>

        <div v-if="!getTrack">
          Track not found!
        </div>
      </div>
      <div slot="sidebar">
        Awesome sidebar! (add meta info and so on)
      </div>
    </layout-component>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import { Howl } from 'howler'

  import TrackComponent from '../../pure/track/Track.vue'
  import ButtonComponent from '../../pure/Button.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'
  import CommentBox from '../../stateful/Comment/CommentBox.vue'

  const query = gql`
    query DetailTrack($id: String!) {
      getTrack(_id: $id) {
        _id
        name
        description
        createdAt
        fileUrl
        isRemovable
        creator {
          _id
          username
        }
      }
    }
  `

  let trackSound

  export default {
    components: {
      TrackComponent,
      LayoutComponent,
      HeaderComponent,
      ButtonComponent,
      CommentBox,
    },
    data() {
      return {
        loading: 0,
        playingTrackId: null,
        isPlaying: false,
        playingPos: 0,
      }
    },
    apollo: {
      getTrack: {
        query: query,
        loadingKey: 'loading',
        variables() {
          return {
            id: this.$route.params.id,
          }
        }
      }
    },
    watch: {
      getTrack() {
        if (this.getTrack && this.getTrack.fileUrl) {
          trackSound = new Howl({
            src: [this.getTrack.fileUrl],
            html5: true,
            volume: 1,
            onend: () => this.isPlaying = false,
          })
        }
      },
    },
    destroyed() {
      trackSound && trackSound.stop(this.playingTrackId)
    },
    methods: {
      removeTrack() {
        this.$apollo.mutate({
          mutation: gql`
mutation RemoveTrack($id: String!) {
    deleteTrack(_id: $id) {
      _id
    }
}
          `,
          variables: {
            id: this.getTrack._id,
          },
          refetchQueries: ['DetailTrack'],
        }).then(() => this.$router.push('/profile/me'))
      },
      pauseTrack() {
        trackSound.pause(this.playingTrackId)
        this.isPlaying = false
      },
      playTrack(position) {
        this.isPlaying = true

        if (!this.playingTrackId) {
          this.playingTrackId = trackSound.play()
          setInterval(() =>  {
            if (this.isPlaying) {
              this.playingPos = trackSound.seek(this.playingTrackId)
                / trackSound.duration(this.playingTrackId)
            }
          }, 20)
        } else {
          position && trackSound.seek(trackSound.duration() * position, this.playingTrackId)
          trackSound.play(this.playingTrackId)
        }
      },
    },
  };
</script>
