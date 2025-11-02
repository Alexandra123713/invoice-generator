<template>
	<div class="bg-gray-100">
		<div
			class="flex flex-col py-5 px-3 md:flex-row-reverse justify-between md:py-8 md:px-8 max-w-[1440px] mx-auto">
			<!-- Header: Mobile -->
			<div class="flex items-center justify-between mb-4 md:hidden">
				<h1 class="text-2xl font-bold text-gray-900">New Invoice</h1>
				<button
					class="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-xl text-white hover:bg-blue-700"
					aria-label="Settings">
					<img
						src="/assets/gear.svg"
						alt="Gear"
						width="24"
						height="24" />
				</button>
			</div>

			<!-- Preview section -->
			<div class="w-full md:w-[474px] md:px-4 lg:w-[574px]">
				<InvoicePreview />
			</div>

			<!-- Form -->
			<div class="flex flex-col flex-1">
				<InvoiceForm />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useInvoiceStore } from '@/stores/invoiceStore';
import InvoiceForm from '@/components/InvoiceForm.vue';
import InvoicePreview from '@/components/InvoicePreview.vue';

const store = useInvoiceStore();

// Debounce function
function debounce(fn: (...args: any[]) => void, delay = 300) {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

// Function that updates the preview
function updatePreview() {
	console.log('Invoice preview updated', store.$state);
}

// Create the debounced version
const debouncedUpdate = debounce(updatePreview, 300);

// Watch on the entire store
watch(
	() => store.$state,
	() => debouncedUpdate(),
	{ deep: true }
);
</script>
