<template>
  <v-dialog :model-value="movieOpen" max-width="600" scrollable>
    <v-card v-if="!movieInfo" class="d-flex justify-center pa-16">
      <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
    </v-card>

    <v-card v-else>
      <v-row>
        <v-col cols="12" sm="4">
          <v-img :src="movieInfo.Poster"></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <v-card-title>{{ movieInfo.Title }}</v-card-title>
          <v-card-subtitle>
            {{ movieInfo.Year }} · {{ movieInfo.Genre }} · {{ movieInfo.Runtime }}
          </v-card-subtitle>
          <v-card-text>{{ movieInfo.Plot }}</v-card-text>
        </v-col>
      </v-row>trar la informació detallada dins d'un v-dialog.
      <v-card-actions>
        <v-btn block border @click="closeMovie">
          Go back
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  movieOpen: Boolean,
  movieInfo: { type: Object, default: null },
})
const emit = defineEmits(["movieClose"])
function closeMovie() {
  emit("movieClose")
}
</script>
