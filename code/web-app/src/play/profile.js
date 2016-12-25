import PureProfileImage from '../components/pure/profile/ProfileImage.vue'

export default function (play, m) {
  play(PureProfileImage, m)
    .name('pure-profile-image')
    .add('default', `<pure-profile-image source="http://tachyons.io/img/logo.jp"></pure-profile-image>`)
}
