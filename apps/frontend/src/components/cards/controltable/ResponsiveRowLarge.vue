<template>
  <v-row no-gutters>
    <v-col class="pa-0" :cols="1">
      <slot name="status" />
    </v-col>

    <v-col class="pa-0" :cols="2">
      <slot name="set" />
    </v-col>

    <v-col class="pa-0" :cols="1">
      <v-card tile flat class="fill-height">
        <slot name="id" />
      </v-card>
    </v-col>

    <v-col class="pa-0" :cols="3">
      <v-card tile flat class="fill-height">
        <slot name="title" />
      </v-card>
    </v-col>

    <v-col class="pa-0" :cols="1">
      <v-card tile flat class="fill-height">
        <slot name="severity" />
      </v-card>
    </v-col>

    <v-col class="pa-0" :cols="2">
      <v-card tile flat class="fill-height">
        <slot name="tags" />
      </v-card>
    </v-col>

    <v-col class="pa-0" :cols="1">
      <v-card tile flat class="fill-height">
        <slot name="runTime" />
      </v-card>
    </v-col>

    <v-col align="center" class="pa-0" :cols="1">
      <v-card tile flat class="fill-height text-center">
        <slot name="viewed" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ResponsiveRowLarge extends Vue {}
</script>

<style scoped>
.v-card {
  background-color: rgba(0, 0, 0, 0);
}
</style>
