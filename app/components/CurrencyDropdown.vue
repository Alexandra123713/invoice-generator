<template>
	<div class="relative inline-block">
		<!-- Dropdown trigger -->
		<button
			@click="toggleMenu"
			class="flex items-center justify-between w-[120px] border border-gray-200 rounded-[8px] px-4 py-3 bg-white relative">
			<!-- SVG icon inside input -->
			<img
				:src="`/assets/flags/${getFlagFilename(selectedCurrency)}.svg`"
				alt=""
				class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />

			<!-- Currency text shifted to right -->
			<span class="pl-6">{{ selectedCurrency }}</span>

			<!-- Arrow icon -->
			<svg
				class="w-4 h-4 ml-2 text-gray-600"
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

		<!-- Dropdown list -->
		<ul
			v-if="isOpen"
			class="absolute bg-white border border-gray-200 rounded mt-1 w-full z-10 shadow">
			<li
				v-for="currency in currencies"
				:key="currency"
				@click.stop="selectCurrency(currency)"
				class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
				<img
					:src="`/assets/flags/${getFlagFilename(currency)}.svg`"
					alt=""
					class="w-5 h-5" />
				{{ currency }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isOpen = ref(false);
const selectedCurrency = ref('USD');
const currencies = ['USD', 'EUR'];

function toggleMenu() {
	isOpen.value = !isOpen.value;
}

function selectCurrency(currency: string) {
	selectedCurrency.value = currency;
	isOpen.value = false;
}

function getFlagFilename(currency: string): string {
	const flagMap: Record<string, string> = {
		USD: 'us',
		EUR: 'eur',
	};
	return flagMap[currency] || currency.toLowerCase();
}

// close dropdown when clicking outside
onMounted(() => {
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.relative')) isOpen.value = false;
	});
});
</script>
