<template>
	<section class="relative col-span-2">
		<h2 class="font-bold text-xl mb-6 text-gray-900">Products and services</h2>

		<div class="relative space-y-6">
			<!-- Product rows -->
			<div
				v-for="(product, index) in store.products"
				:key="product.id"
				class="relative">
				<span
					class="hidden absolute -left-[16px] top-[42px] font-normal text-sm select-none md:block">
					{{ index + 1 }}
				</span>

				<ProductLine
					v-model="store.products[index]!"
					@remove="removeProduct(index)" />
			</div>

			<!-- Add Line Button -->
			<button
				type="button"
				@click="addProduct"
				class="flex items-center justify-center border border-primary-700 text-primary-700 font-medium rounded-lg pl-4">
				Add line
				<div class="px-[8px] py-[10px] ml-[16px] border-l border-primary-700">
					<img
						src="/assets/chevron-down.svg"
						alt="Chevron down" />
				</div>
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '@/stores/invoiceStore';
import ProductLine from './ProductLine.vue';

const store = useInvoiceStore();

function addProduct() {
	store.addProduct();
}

function removeProduct(index: number) {
	store.products.splice(index, 1);
}
</script>
