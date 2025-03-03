<template>
  <v-stepper-content step="3">
    <div class="d-flex flex-column">
      <div class="d-flex justify-space-between">
        <v-text-field
          v-model="formBucketName"
          label="Bucket name"
          @keyup.enter="load"
        />
        <v-btn
          title="Query the S3 bucket"
          :disabled="formBucketName.length < 1"
          class="fill-height pa-0"
          @click="load"
        >
          <v-icon>mdi-cloud-download</v-icon>
        </v-btn>
      </div>

      <v-list :two-line="true">
        <v-list-item v-if="files.length === 0"
          >No items found! Try different terms?</v-list-item
        >
        <v-list-item v-for="(val, index) in files" :key="val.Key">
          <v-list-item-content>
            <!-- Title: The item key -->
            <v-list-item-title>{{ val.Key }}</v-list-item-title>
            <!-- Subtitle: Date of creation -->
            <v-list-item-subtitle>
              {{ val.LastModified }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <!-- Action: Click to add -->
          <v-list-item-action>
            <v-btn title="Load into Heimdall" icon @click="loadFile(index)">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-btn color="red" class="my-2 mr-3" @click="$emit('exit-list')">
        Cancel
      </v-btn>
    </div>
  </v-stepper-content>
</template>

<script lang="ts">
import {_Object} from '@aws-sdk/client-s3';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {InspecIntakeModule} from '@/store/report_intake';
import {SnackbarModule} from '@/store/snackbar';
import {Auth, fetchS3File} from '@/utilities/aws_util';
import {LocalStorageVal} from '@/utilities/helper_util';

// Caches the bucket name
const localBucketName = new LocalStorageVal<string>('aws_bucket_name');

@Component({
  components: {}
})
export default class FileList extends Vue {
  @Prop({type: Object}) readonly auth!: Auth;
  @Prop({type: Array}) readonly files!: _Object[];

  /** The name written in the form */
  formBucketName = '';

  /** On mount, try to look up stored auth info */
  /** Callback for when user selects a file.
   * Loads it into our system.
   */
  async loadFile(index: number): Promise<void> {
    // Get it out of the list
    const file = this.files[index];

    // Fetch it from s3, and promise to submit it to be loaded afterwards
    await fetchS3File(this.auth, file.Key!, this.formBucketName).then(
      (content) => {
        try {
          JSON.parse(content);
        } catch (parseError) {
          SnackbarModule.failure(
            `Selected file: ${file.Key} is not a valid formatted json file.`
          );
          return;
        }
        InspecIntakeModule.loadText({
          text: content,
          filename: file.Key!
        }).then((uniqueId) => this.$emit('got-files', [uniqueId]));
      }
    );
  }

  /** Recalls the last entered bucket name.  */
  mounted() {
    this.formBucketName = localBucketName.getDefault('');
  }

  /** Handles when load button clicked */
  load() {
    localBucketName.set(this.formBucketName);
    this.$emit('load-bucket', this.formBucketName);
  }
}
</script>
