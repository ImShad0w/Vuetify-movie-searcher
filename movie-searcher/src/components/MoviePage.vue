<template>
  <v-dialog
    max-width="760"
    :model-value="movieOpen"
    scrollable
    @update:model-value="onDialogChange"
  >
    <v-card class="overflow-hidden" rounded="xl">
      <div v-if="!movieInfo" class="flex items-center justify-center pa-16">
        <v-progress-circular color="primary" indeterminate size="56" width="5" />
      </div>

      <template v-else>
        <div class="flex flex-col sm:flex-row">
          <v-img
            class="shrink-0 bg-slate-200 sm:w-2/5"
            cover
            height="320"
            :src="posterUrl(movieInfo.Poster)"
          />

          <div class="flex-1 p-6">
            <h2 class="text-2xl font-bold leading-tight text-slate-900">
              {{ movieInfo.Title }}
            </h2>

            <!-- Contrast + Repetition: metadata shares the chip language used across the app -->
            <div class="mt-3 flex flex-wrap gap-2">
              <v-chip v-if="show(movieInfo.Year)" color="primary" size="small" variant="tonal">
                {{ movieInfo.Year }}
              </v-chip>

              <v-chip v-if="show(movieInfo.Runtime)" size="small" variant="tonal">
                {{ movieInfo.Runtime }}
              </v-chip>

              <v-chip v-if="show(movieInfo.Genre)" size="small" variant="tonal">
                {{ movieInfo.Genre }}
              </v-chip>
            </div>

            <p class="mt-4 text-sm leading-relaxed text-slate-600">
              {{ show(movieInfo.Plot) ? movieInfo.Plot : "No plot available for this title." }}
            </p>
          </div>
        </div>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-btn block color="primary" variant="flat" @click="closeMovie">
            Close
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { posterUrl } from '@/utils/poster'

defineProps({
  movieOpen: Boolean,
  movieInfo: { type: Object, default: null },
})
const emit = defineEmits(["movieClose"])

function show(value) {
  return Boolean(value) && value !== "N/A"
}

function closeMovie() {
  emit("movieClose")
}

// Keep parent state in sync when the dialog closes via Esc / backdrop click
function onDialogChange(value) {
  if (!value) closeMovie()
}
</script>
