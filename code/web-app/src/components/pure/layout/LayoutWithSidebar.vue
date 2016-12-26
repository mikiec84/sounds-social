<template>
  <div class="relative mw8 center">
    <div class="fl w-80">
      <div class="pa2">
        <slot name="main"></slot>
      </div>
    </div>

    <div class="fl w-20 fixed" style="margin-left: 820px">
      <div class="pa2">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>
