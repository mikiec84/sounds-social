import PureTrack from '../src/components/pure/track/Track.vue'
import PureTrackList from '../src/components/pure/track/TrackList.vue'
import PureTrackUploadBox from '../src/components/pure/track/TrackUploadBox.vue'

export default function (play, m, wrap) {
  play(PureTrack, m)
    .name('pure-track')
    .displayName('Track')
    .add(
      'default',
      wrap(
        `
        <pure-track
          time-ago="20 minutes ago"
          label="My track name"
          username="Username"
          @open-profile="$log('open profile')"
          @open-track="$log('open track')"
          fileUrl="https://files.graph.cool/ciza7bn1537xm016692k04bgn/cj21zhmfd002x0195kaacsijv"></pure-track>`
      )
    )
    .add(
      'detail',
      wrap(
        `
        <pure-track
          time-ago="20 minutes ago"
          label="My track name"
          username="Username"
          @open-profile="$log('open profile')"
          @open-track="$log('open track')"
          :no-border="true"
          description="Aut esse dignissimos at deleniti aut. Labore consequatur quibusdam molestiae quos. Possimus ad est iste maxime deserunt non est. Ipsam qui ex reiciendis vero quisquam quis fugiat et. Quia omnis qui natus.Vel commodi vitae est sunt. Hic rerum dolore adipisci consequatur est dicta. Fugiat perferendis minus aut voluptatem aut rerum praesentium. Quibusdam sapiente eum quos quaerat autem repellat dolor."
          fileUrl="https://files.graph.cool/ciza7bn1537xm016692k04bgn/cj21zhmfd002x0195kaacsijv"></pure-track>`
      )
    )

  play(PureTrackList, m)
    .name('pure-track-list')
    .displayName('Track List')
    .add(
      'default',
      {
        data() {
          return {
            tracks: [
              {
                timeAgo: '20 minutes ago',
                label: 'My track',
                username: 'matteodem',
                fileUrl: 'https://files.graph.cool/ciza7bn1537xm016692k04bgn/cj21zhmfd002x0195kaacsijv',
              },
              {
                timeAgo: '50 minutes ago',
                label: 'Another track',
                username: 'franz',
                fileUrl: 'https://files.graph.cool/ciza7bn1537xm016692k04bgn/cj21zhmfd002x0195kaacsijv',
              },
              {
                timeAgo: '2 hours ago',
                label: 'Categorized',
                username: 'Insan3Lik3',
                fileUrl: 'https://files.graph.cool/ciza7bn1537xm016692k04bgn/cj21zhmfd002x0195kaacsijv',
              },
            ]
          }
        },
        template: wrap(
          `
          <pure-track-list :tracks="tracks"></pure-track-list>
          <style>
            @import 'https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css';
          </style>
          `
        ),
      }
    )

  play(PureTrackUploadBox, m)
    .name('pure-track-upload-box')
    .displayName('Track Upload Box')
    .add(
      'default',
      wrap(`<pure-track-upload-box 
              username="DJ Hans" 
              @openFileDialog="$log('open dialog')"></pure-track-upload-box>`)
    )
    .add(
      'with track uploading',
      wrap(`<pure-track-upload-box 
              username="DJ Gretel" 
              :hasFile="true"
              :isUploading="true"
              @changeTitle="$log('changing title: ' + arguments[0])"
              @changeDescription="$log('changing description: ' + arguments[0])"></pure-track-upload-box>`)
    )
    .add(
      'with track uploaded',
      wrap(`<pure-track-upload-box 
              username="DJ Gretel" 
              :hasFile="true"
              :isUploading="false"
              fileUrl="https://files.graph.cool/ciza7bn1537xm016692k04bgn/cj21zhmfd002x0195kaacsijv"
              @changeTitle="$log('changing title: ' + arguments[0])"
              @changeDescription="$log('changing description: ' + arguments[0])"></pure-track-upload-box>`)
    )
}
