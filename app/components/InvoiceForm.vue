<template>
	<form
		@submit.prevent="saveInvoice"
		class="flex flex-col flex-1 gap-6 mt-8 md:grid grid-cols-2 md:mt-0">
		<!-- Invoice Details -->
		<section class="col-span-2">
			<h2 class="font-bold text-xl mb-4">Invoice details</h2>
			<div class="space-y-2">
				<!-- Invoice number -->
				<div class="relative">
					<label class="block text-sm font-medium text-gray-900 mb-2">
						Invoice number
					</label>
					<input
						v-model="store.invoiceNumber"
						@blur="validateField('invoiceNumber')"
						placeholder="Enter invoice number"
						class="w-full border border-gray-200 mb-4 rounded-[8px] px-4 py-3 placeholder-gray-500"
						:class="{ 'border-red-500': errors.invoiceNumber }" />

					<!-- Clear icon -->
					<button
						v-if="store.invoiceNumber"
						type="button"
						@click="store.invoiceNumber = ''"
						class="absolute right-2 top-[32px] h-10 flex items-center justify-center"
						aria-label="Clear invoice number">
						<img
							src="/assets/close-icon.svg"
							alt="Close" />
					</button>

					<p
						v-if="errors.invoiceNumber"
						class="text-red-500 text-xs mt-1 absolute bottom-0">
						{{ errors.invoiceNumber }}
					</p>
				</div>

				<!-- Issue & Due Dates -->
				<div class="flex flex-col sm:flex-row gap-4">
					<!-- Issue Date -->
					<div class="flex-1">
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Issue date
						</label>
						<div class="relative">
							<img
								src="/assets/datepicker.svg"
								alt="Datepicker"
								class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
							<input
								ref="issueDateInput"
								v-model="store.issueDate"
								type="date"
								:min="minDate"
								@click="openDatePicker('issueDate')"
								@blur="validateField('issueDate')"
								class="date-input w-full pl-10 pr-3 py-3 rounded-[8px] bg-white text-gray-500 border border-gray-200 focus:ring-2 focus:ring-blue-500 transition"
								:class="{ 'border-red-500': errors.issueDate }" />
						</div>
						<p
							v-if="errors.issueDate"
							class="text-red-500 text-xs mt-1 absolute bottom-0">
							{{ errors.issueDate }}
						</p>
					</div>

					<!-- Due Date -->
					<div class="flex-1">
						<label class="block text-sm font-medium text-gray-700 mb-2">
							Due date
						</label>
						<div class="relative">
							<img
								src="/assets/datepicker.svg"
								alt="Datepicker"
								class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
							<input
								ref="dueDateInput"
								v-model="store.dueDate"
								type="date"
								:min="minDate"
								@click="openDatePicker('dueDate')"
								@blur="validateField('dueDate')"
								class="date-input w-full pl-10 pr-3 py-3 rounded-[8px] bg-white text-gray-500 border border-gray-200 focus:ring-2 focus:ring-blue-500 transition"
								:class="{ 'border-red-500': errors.dueDate }" />
						</div>
						<p
							v-if="errors.dueDate"
							class="text-red-500 text-xs mt-1 absolute bottom-0">
							{{ errors.dueDate }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- From Section -->
		<section>
			<h2 class="font-bold text-xl mb-4">From</h2>
			<div class="space-y-2">
				<div class="relative">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Customer name
					</label>
					<input
						v-model="store.fromCustomer"
						@blur="validateField('fromCustomer')"
						placeholder="Enter customer name"
						class="w-full border border-gray-200 mb-4 rounded-[8px] px-4 py-3 placeholder-gray-500"
						:class="{ 'border-red-500': errors.fromCustomer }" />
					<p
						v-if="errors.fromCustomer"
						class="text-red-500 text-xs mt-1 absolute bottom-0">
						{{ errors.fromCustomer }}
					</p>
				</div>

				<div class="relative">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Company name
					</label>
					<CustomSelect
						v-model="store.fromCompany"
						:options="companies.map((c) => ({ value: c, label: c }))"
						placeholder="Select company" />
				</div>

				<div class="relative">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Email address
					</label>
					<input
						v-model="store.fromEmail"
						@blur="validateField('fromEmail')"
						placeholder="Enter email address"
						class="w-full border border-gray-200 mb-4 rounded-[8px] px-4 py-3 placeholder-gray-500"
						:class="{ 'border-red-500': errors.fromEmail }" />
					<p
						v-if="errors.fromEmail"
						class="text-red-500 text-xs mt-1 absolute bottom-0">
						{{ errors.fromEmail }}
					</p>
				</div>
			</div>
		</section>

		<!-- To Section -->
		<section>
			<h2 class="font-bold text-xl mb-4">To</h2>
			<div class="space-y-2">
				<div class="relative">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Customer name
					</label>
					<input
						v-model="store.toCustomer"
						@blur="validateField('toCustomer')"
						placeholder="Enter customer name"
						class="w-full border border-gray-200 mb-4 rounded-[8px] px-4 py-3 placeholder-gray-500"
						:class="{ 'border-red-500': errors.toCustomer }" />
					<p
						v-if="errors.toCustomer"
						class="text-red-500 text-xs mt-1 absolute bottom-0">
						{{ errors.toCustomer }}
					</p>
				</div>

				<div class="relative">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Company name
					</label>
					<CustomSelect
						v-model="store.toCompany"
						:options="companies.map((c) => ({ value: c, label: c }))"
						placeholder="Select company" />
				</div>
				<div class="relative">
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Email address
					</label>
					<input
						v-model="store.toEmail"
						@blur="validateField('toEmail')"
						placeholder="Enter email address"
						class="w-full border border-gray-200 mb-4 rounded-[8px] px-4 py-3 placeholder-gray-500"
						:class="{ 'border-red-500': errors.toEmail }" />
					<p
						v-if="errors.toEmail"
						class="text-red-500 text-xs mt-1 absolute bottom-0">
						{{ errors.toEmail }}
					</p>
				</div>
			</div>
		</section>

		<!-- Products -->
		<ProductsSection />
		<BankDetails />
		<!-- Save Button -->
		<button
			type="submit"
			class="w-full bg-primary-700 text-white font-medium rounded-lg p-3 mt-4 md:hidden">
			Save Invoice →
		</button>
	</form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductsSection from './ProductsSection.vue';
import { useInvoiceStore } from '@/stores/invoiceStore';

const store = useInvoiceStore();

const companies = ref<string[]>([]);
const errors = ref<Record<string, string>>({});

const issueDateInput = ref<HTMLInputElement | null>(null);
const dueDateInput = ref<HTMLInputElement | null>(null);

interface CompaniesData {
	companies: string[];
}

function formatDateForInput(date: Date): string {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${year}-${month}-${day}`;
}

const minDate = formatDateForInput(new Date());

function openDatePicker(field: 'issueDate' | 'dueDate') {
	const input =
		field === 'issueDate' ? issueDateInput.value : dueDateInput.value;
	if (!input) return;

	if ('showPicker' in input && typeof input.showPicker === 'function') {
		input.showPicker();
	} else {
		setTimeout(() => {
			input.focus();
			input.click();
		}, 0);
	}
}

async function loadCompanies() {
	try {
		const data = await $fetch<CompaniesData>('/data/companies.json');
		if (data && Array.isArray(data.companies)) {
			companies.value = data.companies;
		}
	} catch {
		companies.value = [
			'TechCorp Inc',
			'Global Solutions Ltd',
			'Digital Innovations Group',
		];
	}
}

onMounted(async () => {
	const today = new Date();
	store.issueDate = formatDateForInput(today);

	const due = new Date(today);
	due.setDate(due.getDate() + 5);
	store.dueDate = formatDateForInput(due);

	await loadCompanies();
});

// Basic validation
function validateField(field: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const numberRegex = /^[0-9]+$/;
	const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

	switch (field) {
		case 'invoiceNumber':
			errors.value.invoiceNumber = !store.invoiceNumber
				? 'Invoice number is required.'
				: !numberRegex.test(store.invoiceNumber)
				? 'Only numbers are allowed.'
				: '';
			break;

		case 'issueDate':
			errors.value.issueDate = !store.issueDate
				? 'Issue date is required.'
				: '';
			break;

		case 'dueDate':
			errors.value.dueDate = !store.dueDate ? 'Due date is required.' : '';
			break;

		case 'fromCustomer':
			errors.value.fromCustomer = !store.fromCustomer
				? 'Customer name is required.'
				: !nameRegex.test(store.fromCustomer)
				? 'Only letters and spaces allowed.'
				: '';
			break;

		case 'fromCompany':
			errors.value.fromCompany = !store.fromCompany
				? 'Company name is required.'
				: '';
			break;

		case 'fromEmail':
			errors.value.fromEmail = !emailRegex.test(store.fromEmail)
				? 'A valid email is required.'
				: '';
			break;

		case 'toCustomer':
			errors.value.toCustomer = !store.toCustomer
				? 'Customer name is required.'
				: !nameRegex.test(store.toCustomer)
				? 'Only letters and spaces allowed.'
				: '';
			break;

		case 'toCompany':
			errors.value.toCompany = !store.toCompany
				? 'Company name is required.'
				: '';
			break;

		case 'toEmail':
			errors.value.toEmail = !emailRegex.test(store.toEmail)
				? 'A valid email is required.'
				: '';
			break;
	}
}

function validateAll() {
	Object.keys(errors.value).forEach((key) => validateField(key));
}

function saveInvoice() {
	validateAll();
	if (Object.values(errors.value).some((err) => err)) return;
	console.log('✅ Invoice saved successfully!');
	console.log('Invoice data:', store.$state);
}
</script>

<style scoped>
.input-field {
	@apply w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-gray-300 transition-colors duration-200;
}

.input-field.border-red-500:not(:focus) {
	border-color: rgb(239 68 68);
}

.input-field.border-red-500:focus {
	border-color: rgb(209 213 219);
	box-shadow: 0 0 0 2px rgb(59 130 246 / 0.5);
}

.date-input::-webkit-calendar-picker-indicator {
	opacity: 0;
	position: absolute;
	right: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
}

.date-input {
	-moz-appearance: textfield;
	appearance: textfield;
}

.date-input::-webkit-inner-spin-button,
.date-input::-webkit-outer-spin-button {
	display: none;
}
</style>
