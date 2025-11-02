<template>
	<section class="bg-white shadow-sm p-5 space-y-8">
		<!-- Header -->
		<div class="flex justify-between items-start">
			<div>
				<h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-1">
					Invoice {{ store.invoiceNumber || '—' }}
				</h2>
				<p class="text-gray-500 text-xs md:text-sm">
					Live preview of your invoice
				</p>
				<div class="mt-2 text-sm text-gray-700">
					<p>
						<span class="font-xs md:font-medium">Issue date:</span>
						{{ store.issueDate || '—' }}
					</p>
					<p>
						<span class="font-xs md:font-medium">Due date:</span>
						{{ store.dueDate || '—' }}
					</p>
				</div>
			</div>

			<!-- Selected bank logo -->
			<div
				v-if="selectedBank"
				class="w-[30%]">
				<img
					:src="selectedBank.logo"
					:alt="selectedBank.bank"
					class="h-10 object-contain" />
			</div>
		</div>

		<!-- From / To Section -->
		<div class="grid grid-cols-2 gap-8">
			<div>
				<h3 class="font-semibold text-gray-800 mb-2">From</h3>
				<p class="text-gray-600">{{ store.fromCustomer || '—' }}</p>
				<p class="text-gray-800">{{ store.fromCompany || '—' }}</p>
				<p class="text-sm text-gray-500">{{ store.fromEmail || '—' }}</p>
			</div>

			<div>
				<h3 class="font-semibold text-gray-800 mb-2">To</h3>
				<p class="text-gray-600">{{ store.toCustomer || '—' }}</p>
				<p class="text-gray-800">{{ store.toCompany || '—' }}</p>
				<p class="text-sm text-gray-500">{{ store.toEmail || '—' }}</p>
			</div>
		</div>

		<!-- Products Table -->
		<div>
			<table
				class="w-full text-[6px] border border-gray-200 border-collapse xs:text-[8px]">
				<thead class="bg-gray-50 text-gray-700">
					<tr>
						<th class="p-1 border-r border-gray-200">Description</th>
						<th class="p-1 border-r border-gray-200">Qty</th>
						<th class="p-1 border-r border-gray-200">Unit</th>
						<th class="p-1 border-r border-gray-200">Price</th>
						<th class="p-1 border-r border-gray-200">VAT %</th>
						<th class="p-1 border-r border-gray-200">Discount %</th>
						<th class="p-1">Amount</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="product in store.products"
						:key="product.id"
						class="border border-gray-200">
						<td class="p-1 text-gray-800 border-r border-gray-100">
							{{ product.description || '—' }}
						</td>
						<td class="p-1 text-gray-800 text-left border-r border-gray-100">
							{{ product.quantity }}
						</td>
						<td class="p-1 text-gray-800 text-left border-r border-gray-100">
							{{ product.unit || '—' }}
						</td>
						<td class="p-1 text-gray-800 text-left border-r border-gray-100">
							{{ formatCurrency(product.price) }}
						</td>
						<td class="p-1 text-gray-800 text-left border-r border-gray-100">
							{{ product.vat }}%
						</td>
						<td class="p-1 text-gray-800 text-left border-r border-gray-100">
							{{ product.discount || 0 }}%
						</td>
						<td class="p-1 text-gray-800 text-left font-medium">
							{{ formatCurrency(calcAmount(product)) }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Totals Section -->
		<div class="flex justify-end pt-4 border-t border-gray-200">
			<div class="w-64 space-y-2 text-sm">
				<div class="flex justify-between">
					<span>Subtotal:</span>
					<span class="font-medium">{{ formatCurrency(store.subtotal) }}</span>
				</div>
				<div class="flex justify-between">
					<span>VAT:</span>
					<span class="font-medium">{{ formatCurrency(store.vatTotal) }}</span>
				</div>
				<div
					v-if="store.globalDiscount"
					class="flex justify-between text-blue-600">
					<span>Global Discount:</span>
					<span>-{{ store.globalDiscount }}%</span>
				</div>
				<div class="flex justify-between text-lg font-semibold pt-2 border-t">
					<span>Total:</span>
					<span>{{ formatCurrency(store.totalAfterGlobalDiscount) }}</span>
				</div>
			</div>
		</div>

		<!-- Bank Details -->
		<div class="pt-6 border-t border-gray-200">
			<h3 class="font-semibold text-gray-800 mb-2">Bank details</h3>
			<p v-if="selectedBank">
				<span class="font-medium text-gray-700">{{ selectedBank.bank }}</span
				><br />
				<span class="text-gray-600">Account: {{ selectedBank.number }}</span>
			</p>
			<p
				v-else
				class="text-gray-500 text-sm">
				No bank account selected.
			</p>
		</div>

		<!-- Notes Section -->
		<div
			v-if="store.notes"
			class="pt-4 border-t border-gray-200">
			<h3 class="font-semibold text-gray-800 mb-2">Notes</h3>
			<p class="text-gray-600 text-sm whitespace-pre-line">{{ store.notes }}</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useInvoiceStore } from '@/stores/invoiceStore';

const store = useInvoiceStore();

// find selected bank
const selectedBank = computed(() =>
	store.bankAccounts.find((b) => b.number === store.selectedAccount)
);

// calculate per-line amount
function calcAmount(p: any) {
	const discountedPrice = p.price * (1 - (p.discount ?? 0) / 100);
	const vatValue = discountedPrice * (p.vat / 100);
	return p.quantity * discountedPrice + vatValue;
}

// format currency
function formatCurrency(value: number) {
	return `MDL ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}
</script>

<style scoped>
table th,
table td {
	@apply border-gray-200;
}
</style>
