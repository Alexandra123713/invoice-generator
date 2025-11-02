<template>
	<div class="relative inline-block">
		<button
			@click="toggleMenu"
			class="flex items-center gap-2 border border-gray-200 rounded-[8px] px-4 py-3">
			{{ selectedLanguage }}
			<svg
				class="w-4 h-4"
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

		<ul
			v-if="isOpen"
			class="absolute bg-white border rounded mt-1 w-full z-10 shadow">
			<li
				v-for="lang in languages"
				:key="lang"
				@click.stop="selectLanguage(lang)"
				class="px-3 py-1 hover:bg-gray-100 cursor-pointer">
				{{ lang }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isOpen = ref(false);
const selectedLanguage = ref('English');
const languages = ['English', 'French'];

function toggleMenu() {
	isOpen.value = !isOpen.value;
}

function selectLanguage(lang: string) {
	selectedLanguage.value = lang;
	isOpen.value = false;
}

// Close on outside click
onMounted(() => {
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.relative')) isOpen.value = false;
	});
});
</script>
