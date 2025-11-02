<template>
	<div class="relative inline-block w-full">
		<!-- Button -->
		<button
			type="button"
			@click="toggleMenu"
			class="w-full flex items-center justify-between border border-gray-200 rounded-[8px] px-4 py-3 text-gray-700 bg-white"
            v-bind="$attrs">
			<span
				:class="[
					selectedLabel
						? 'text-gray-700'
						: placeholder === 'Select company'
						? 'text-gray-500'
						: 'text-gray-900',
				]">
				{{ selectedLabel || placeholder }}
			</span>
			<svg
				class="w-4 h-4 text-gray-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		<!-- Options -->
		<ul
			v-if="isOpen"
			class="absolute w-full bg-white border border-gray-200 rounded-[8px] mt-1 z-10 shadow-sm overflow-hidden">
			<li
				v-for="option in options"
				:key="option.value"
				@click="selectOption(option)"
				class="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition">
				{{ option.label }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface Option {
	value: string | number;
	label: string;
}

const props = defineProps<{
	modelValue: string | number;
	options: Option[];
	placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedLabel = ref('');

function toggleMenu() {
	isOpen.value = !isOpen.value;
}

function selectOption(option: Option) {
	emit('update:modelValue', option.value);
	selectedLabel.value = option.label;
	isOpen.value = false;
}

// update label when value changes externally
watch(
	() => props.modelValue,
	(val) => {
		const match = props.options.find((opt) => opt.value === val);
		selectedLabel.value = match ? match.label : '';
	},
	{ immediate: true }
);

// close on outside click
onMounted(() => {
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.relative')) isOpen.value = false;
	});
});
</script>
