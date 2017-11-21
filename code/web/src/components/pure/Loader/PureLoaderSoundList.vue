<template>
  <div>
    <div v-for="(i, index) in [0, 1, 2]" :class="{ 'mt3': index !== 0  }">
      <pure-loader-sound></pure-loader-sound>
    </div>

    <pure-loader-text><div class="f1">...</div></pure-loader-text>
  </div>
</template>
