<template>
  <div :class="{ 'ba bw1 b--light-gray br2': !isDetail }" style="max-width: 700px">
    <div class="cf">
      <div class="fl w-50 w-25-l w-30-m pa2">
        <pure-loader-block cssStyles="max-width: 150px; height: 150px"></pure-loader-block>
      </div>
      <div class="fl w-50 w-75-l w-70-m">
        <div class="mt3">
          <div class="ml3">
            <div class="relative" style="left: -13px; top: 3px">
              <div class="absolute">
                <pure-loader-text>
                  <pure-icon icon="play"></pure-icon>
                </pure-loader-text>
              </div>
            </div>
            <div class="ml2">
              <pure-loader-block cssStyles="width: 45%; height: 25px"></pure-loader-block>
            </div>
          </div>

          <div class="mt3">
            <pure-loader-block cssStyles="width: 30%; height: 15px"></pure-loader-block>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      isDetail: {
        type: Boolean,
        required: false,
        default: false,
      }
    }
  }
</script>

