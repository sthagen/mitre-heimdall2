<template>
  <Modal :visible="visible" @close-modal="$emit('close-modal')">
    <v-card>
      <v-card-title>Search Help</v-card-title>

      <v-card-text>
        <h3>Filter your controls via advanced search.</h3>
        <br />
        <h2>Supported Query Examples</h2>
        <h4>Queries are not case-sensitive</h4>
        <br />
        <ul>
          <li class="pb-1">
            <h3>ID: <code>id:V-123456</code></h3>
          </li>
          <li class="pb-1">
            <h3>Title: <code>title:Server</code></h3>
          </li>
          <li class="pb-1">
            <h3>Severity: <code>severity:High</code></h3>
          </li>
          <li class="pb-1">
            <h3>Status: <code>status:Passed</code></h3>
          </li>
          <li class="pb-1">
            <h3>NIST 800-53: <code>nist:UM-1</code></h3>
          </li>
          <li class="pb-1">
            <h3>Description: <code>desc:"Status groups"</code></h3>
          </li>
          <li class="pb-1">
            <h3>
              Code: <code>code:"Ensure enable log file validation is set"</code>
            </h3>
          </li>
          <li class="pb-1">
            <h3>Inputs: <code>input:disable_slow_controls</code></h3>
          </li>
          <li class="pb-1">
            <h3>Tags: <code>tags:severityoverride</code></h3>
          </li>
        </ul>
        <br />
        <h2>Joining Queries</h2>
        <br />
        <h3>
          Heimdall supports joining queries. For example, load the AWS CIS
          Foundations Baseline example and search:
        </h3>
        <br />
        <h3>
          <code>
            status:"Failed,Not reviewed" severity:High title:"Ensure IAM"
          </code>
        </h3>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="primary" text @click="$emit('close-modal')">
          Close Window
        </v-btn>
      </v-card-actions>
    </v-card>
  </Modal>
</template>

<script lang="ts">
import Modal from '@/components/global/Modal.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  components: {
    Modal
  }
})
export default class SearchHelpModal extends Vue {
  @Prop({default: true}) readonly visible!: boolean;
}
</script>
