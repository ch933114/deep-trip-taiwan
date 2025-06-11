<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
  >
    <div class="bg-white rounded-xl p-6 w-[80%] lg:w-[40%] shadow-lg">
      <slot name="content" />
      <div class="flex justify-end gap-2">
        <slot name="button" />
        <button
          @click="$emit('close')"
          class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
        >
          關閉
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ visible: Boolean })
defineEmits(['close'])
</script>
