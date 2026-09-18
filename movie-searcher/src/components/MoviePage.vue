<template>
  <v-card v-if="movieInfo">
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
    </v-row>
    <v-card-actions>
      <v-btn block border @click="resetId">
        Go back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({ movieInfo: Object })
const emit = defineEmits(["resetId"])

function resetId() {
  emit("resetId")
}
</script>
