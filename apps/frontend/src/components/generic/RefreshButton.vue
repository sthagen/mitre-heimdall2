<template>
  <IconLinkItem
    id="refresh_button"
    key="user"
    text="Refresh"
    icon="mdi-refresh"
    @click="refreshEvaluations"
  >
    Refresh
  </IconLinkItem>
</template>

<script lang="ts">
import IconLinkItem from '@/components/global/sidebaritems/IconLinkItem.vue';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {
    IconLinkItem
  }
})
export default class RefreshButton extends Vue {
  refreshEvaluations() {
    this.$emit('updateEvaluations');
  }
}
</script>
