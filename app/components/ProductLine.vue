<template>
	<div class="relative flex flex-col gap-2">
		<!-- Main line -->
		<div
			class="grid grid-cols-2 gap-2 relative md:flex md:gap-0 md:justify-between">
			<!-- Description -->
			<div class="flex flex-col col-span-2 mb-4 w-[90%] md:w-[30%]">
				<label class="text-sm font-medium text-gray-900 mb-1"
					>Description</label
				>
				<input
					v-model.trim="localProduct.description"
					@blur="validateField('description')"
					placeholder="Enter description"
					class="w-full border rounded-[8px] px-4 py-3 placeholder-gray-400"
					:class="errors.description ? 'border-red-400' : 'border-gray-200'" />
				<p
					v-if="errors.description"
					class="text-xs text-red-500 mt-1 absolute bottom-0">
					{{ errors.description }}
				</p>
			</div>

			<!-- Quantity -->
			<div class="flex flex-col w-full md:w-[10%] md:ml-2">
				<label class="text-sm font-medium text-gray-700 mb-1">Quantity</label>
				<input
					type="number"
					min="1"
					v-model.number="localProduct.quantity"
					@blur="validateField('quantity')"
					class="w-full border rounded-[8px] px-4 py-3"
					:class="errors.quantity ? 'border-red-400' : 'border-gray-200'" />
				<p
					v-if="errors.quantity"
					class="text-xs text-red-500 mt-1 absolute bottom-0">
					{{ errors.quantity }}
				</p>
			</div>

			<!-- Unit -->
			<div class="flex flex-col w-full md:w-[10%] md:ml-2">
				<label class="text-sm font-medium text-gray-700 mb-1">UoM</label>
				<CustomSelect
					v-model="localProduct.unit"
					@blur="validateField('unit')"
					:options="[
						{ value: 'pcs', label: 'pcs' },
						{ value: 'kg', label: 'kg' },
						{ value: 'h', label: 'h' },
					]" />
				<p
					v-if="errors.unit"
					class="text-xs text-red-500 mt-1 absolute bottom-0">
					{{ errors.unit }}
				</p>
			</div>

			<!-- Price -->
			<div class="flex flex-col w-full col-span-2 md:w-[15%] md:ml-2">
				<label class="text-sm font-medium text-gray-700 mb-1">Price/Unit</label>
				<input
					type="number"
					min="0"
					v-model.number="localProduct.price"
					@input="onPriceInput"
					@blur="validateField('price')"
					class="w-full border rounded-[8px] px-4 py-3"
					:class="errors.price ? 'border-red-400' : 'border-gray-200'" />
				<p
					v-if="errors.price"
					class="text-xs text-red-500 mt-1 absolute bottom-0">
					{{ errors.price }}
				</p>
			</div>

			<!-- VAT -->
			<div class="flex flex-col w-full col-span-2 md:w-[10%] md:ml-2">
				<label class="text-sm font-medium text-gray-700 mb-1">VAT</label>
				<CustomSelect
					v-model.number="localProduct.vat"
					@blur="validateField('vat')"
					:options="[
						{ value: 0, label: '0%' },
						{ value: 5, label: '5%' },
						{ value: 10, label: '10%' },
						{ value: 15, label: '15%' },
						{ value: 20, label: '20%' },
					]"
					placeholder="VAT" />
				<p
					v-if="errors.vat"
					class="text-xs text-red-500 mt-1 absolute bottom-0">
					{{ errors.vat }}
				</p>
			</div>

			<!-- Amount -->
			<div class="flex flex-col w-full col-span-2 md:w-[15%] md:ml-2">
				<label class="text-sm font-medium text-gray-700 mb-1">Amount</label>
				<input
					:value="formatCurrency(amount)"
					readonly
					class="w-full border border-gray-200 rounded-[8px] px-4 py-3 bg-white" />
			</div>

			<!-- Buttons -->
			<div
				class="absolute right-0 flex flex-col w-[8%] md:w-[3%] md:ml-2 md:relative">
				<button
					type="button"
					@click="$emit('remove')"
					class="flex items-center justify-center h-[20px] mb-1">
					<img
						src="/assets/close-icon.svg"
						alt="Remove"
						class="w-[14px] h-[14px]" />
				</button>

				<button
					type="button"
					@click="toggleOptions"
					class="flex items-center justify-center h-[50px] border border-gray-200 rounded-[8px] bg-white">
					<img
						src="/assets/vertical-dots.svg"
						alt="Options" />
				</button>
			</div>
		</div>

		<!-- Expanded options -->
		<div
			v-if="showOptions"
			class="mt-3">
			<label class="block text-sm font-medium text-gray-700 mb-1"
				>Add description</label
			>
			<textarea
				v-model="localProduct.longDescription"
				placeholder="Add description"
				class="w-full h-[74px] border border-gray-200 rounded-[8px] py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-gray-300 resize-none"></textarea>

			<div class="mt-2">
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Discount
				</label>

				<div class="flex items-center">
					<input
						type="number"
						min="0"
						v-model.number="localProduct.discount"
						class="w-[67px] border border-gray-200 text-gray-400 rounded-l-lg py-3 px-4 text-sm border-r-0 focus:outline-none focus:ring-0 focus:border-gray-200"
						placeholder="10" />

					<div
						class="border border-gray-200 rounded-r-lg py-3 px-4 text-sm bg-white -ml-px text-gray-400 select-none">
						%
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import CustomSelect from './CustomSelect.vue';

type Product = {
	description: string;
	longDescription?: string;
	quantity: number;
	unit: string;
	price: number;
	vat: number;
	discount?: number;
	amount: number;
};

const props = defineProps<{ modelValue: Product }>();
const emit = defineEmits(['update:model-value', 'remove']);

const showOptions = ref(false);
const errors = ref<Record<string, string>>({});

const localProduct = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:model-value', val),
});

// Calculate the sum
const amount = computed(() => {
	const base = localProduct.value.quantity * localProduct.value.price;
	const vat = base * (localProduct.value.vat / 100);
	const discount = base * ((localProduct.value.discount ?? 0) / 100);
	return base + vat - discount;
});

// Open / close options
function toggleOptions() {
	showOptions.value = !showOptions.value;
}
// Prevent negative values for price
function onPriceInput() {
	if (localProduct.value.price < 0) {
		localProduct.value.price = 0;
	}
	validateField('price');
}
// Validate fields
function validateField(field: string) {
	switch (field) {
		case 'description':
			errors.value.description = localProduct.value.description.trim()
				? ''
				: 'Description is required';
			break;
		case 'quantity':
			errors.value.quantity =
				localProduct.value.quantity > 0
					? ''
					: 'Quantity must be greater than 0';
			break;
		case 'unit':
			errors.value.unit = localProduct.value.unit ? '' : 'Unit is required';
			break;
		case 'price':
			errors.value.price =
				localProduct.value.price >= 0 ? '' : 'Price cannot be negative';
			break;
		case 'vat':
			errors.value.vat =
				localProduct.value.vat >= 0 && localProduct.value.vat <= 100
					? ''
					: 'VAT must be between 0 and 100';
			break;
	}
}

// Currency format
function formatCurrency(value: number) {
	return `${value.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
}
</script>
