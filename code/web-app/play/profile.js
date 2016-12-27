import PureProfileImage from '../src/components/pure/profile/ProfileImage.vue'

export default function (play, m) {
  play(PureProfileImage, m)
    .name('pure-profile-image')
    .displayName('Profile Image')
    .add('default', `<pure-profile-image source="http://tachyons.io/img/logo.jp"></pure-profile-image>`)
}
