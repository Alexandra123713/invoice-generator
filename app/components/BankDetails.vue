<template>
	<section class="space-y-5 md:max-w-[50%] col-span-2">
		<h2 class="font-bold text-xl mb-2">Bank details</h2>

		<!-- Account selector -->
		<div class="flex sm:flex-row items-center">
			<!-- Custom Select for bank account -->
			<div class="flex-1">
				<CustomSelect
					v-model="store.selectedAccount"
					:options="accountOptions"
					placeholder="Select bank account"
					class="rounded-l-lg rounded-r-none border-r-0" />
			</div>

			<!-- Dynamic Bank Logo -->
			<div
				class="flex items-center justify-center w-28 h-[50px] border border-gray-200 border rounded-r-lg bg-gray-50">
				<img
					v-if="selectedLogo"
					:src="selectedLogo"
					alt="Bank logo"
					class="h-5 object-contain transition-all duration-200" />
				<span
					v-else
					class="text-gray-400 text-sm italic"
					>No logo</span
				>
			</div>
		</div>

		<!-- Subtotal -->
		<div class="flex justify-between text-gray-700 font-bold">
			<span>Subtotal</span>
			<span>Mdl {{ formatNumber(store.subtotal) }}</span>
		</div>

		<!-- VAT -->
		<div class="flex justify-between text-gray-700 font-bold">
			<span>VAT</span>
			<span>Mdl {{ formatNumber(store.vatTotal) }}</span>
		</div>

		<!-- Global Discount -->
		<div class="flex flex-col gap-2">
			<label class="text-gray-900 font-semibold">Discount %</label>

			<div class="relative">
				<input
					type="text"
					:value="formattedDiscount"
					@input="onDiscountInput"
					placeholder="0%"
					class="w-full border border-gray-200 rounded-[10px] py-3 pl-4 pr-10 text-gray-700 text-base placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200" />

				<!-- Clear Button -->
				<button
					v-if="
						store.globalDiscount !== null &&
						store.globalDiscount !== undefined &&
						store.globalDiscount !== 0
					"
					type="button"
					@click="store.globalDiscount = 0"
					class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
					aria-label="Clear discount">
					<img
						src="/assets/close-icon.svg"
						alt="Clear"
						class="w-[14px] h-[14px]" />
				</button>
			</div>

			<p
				v-if="store.globalDiscount && store.globalDiscount > 100"
				class="text-xs text-red-500 font-medium">
				Maximum allowed discount is 100%.
			</p>
		</div>

		<!-- Total -->
		<div class="flex justify-between items-center font-bold text-lg">
			<span>Total</span>
			<span>Mdl {{ formatNumber(store.totalAfterGlobalDiscount) }}</span>
		</div>

		<div class="flex items-center gap-3">
			<button class="flex items-center gap-2 text-[#3B82F6]">
				<img
					src="/assets/plus-icon.svg"
					alt="Add" />
				<span class="text-base font-medium">Add advanced paid</span>
			</button>
		</div>
	</section>

	<!-- Notes -->
	<div class="mt-8 col-span-2">
		<label class="block text-sm font-medium text-gray-700 mb-2"
			>Notes (optional)</label
		>
		<textarea
			v-model="store.notes"
			placeholder="Add notes"
			class="w-full h-[108px] border border-gray-300 rounded-[8px] py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"></textarea>
		<p class="text-gray-400 text-xs mt-1 hidden md:block">
			The notes will be displayed on the invoice; you can see them on the
			preview on the right.
		</p>
		<p class="text-gray-400 text-xs mt-1 md:hidden">
			The notes will be displayed on the invoice; you can see them on the
			preview on the top.
		</p>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useInvoiceStore } from '@/stores/invoiceStore';
import CustomSelect from './CustomSelect.vue';

const store = useInvoiceStore();

onMounted(() => {
	store.loadBankAccounts();
});

// generate account options for dropdown
const accountOptions = computed(() =>
	store.bankAccounts.map((a) => ({
		value: a.number,
		label: a.number,
	}))
);

// pick correct logo dynamically
const selectedLogo = computed(() => {
	const account = store.bankAccounts.find(
		(a) => a.number === store.selectedAccount
	);
	return account?.logo || '';
});

// format discount display as 10%
const formattedDiscount = computed(() => {
	return store.globalDiscount !== null && store.globalDiscount !== undefined
		? `${store.globalDiscount}%`
		: '';
});

// handle discount input logic (limit 0–100)
function onDiscountInput(e: Event) {
	const input = e.target as HTMLInputElement;
	let value = input.value.replace('%', '').trim();
	let num = Number(value);

	if (isNaN(num)) {
		store.globalDiscount = 0;
		return;
	}
// limit to 0–100 range
	if (num < 0) num = 0;
	if (num > 100) num = 100;

	store.globalDiscount = num;
}

function formatNumber(num: number) {
	return num.toLocaleString('en-US', {
		maximumFractionDigits: 2,
	});
}
</script>
