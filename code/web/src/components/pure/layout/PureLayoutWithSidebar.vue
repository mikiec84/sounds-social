<template>
  <div>
    <slot name="header"></slot>
    <div class="relative mw8 center mt3">
      <div class="fl w-70-l w-100">
        <div class="pa2">
          <slot name="main"></slot>
        </div>
      </div>

      <div class="fl w-100 w-20-l fixed-l custom-layout-sidebar-left-offset-l">
        <div class="pa2 mt4 mt0-m mt0-l overflow-y-auto-ns custom-max-height-sidebar-l">
          <slot name="sidebar"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
