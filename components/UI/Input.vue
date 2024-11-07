<template>
    <div>
        <label for="" v-if="props.label" class="block pl-3 ml-px text-sm font-medium text-gray-700">{{ props.label
            }}</label>
        <div class="mt-1">
            <input :type="props.type" :value="props.modelValue"
                class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="props.placeholder" @input="event => emits('update:modelValue', event.target.value)">
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
        default: null
    },
    placeholder: {
        type: String,
        required: false,
        default: ''
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    },
})

const emits = defineEmits(["update:modelValue"])

</script>