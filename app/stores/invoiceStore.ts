import { defineStore } from 'pinia';

export interface Product {
	id: number;
	description: string;
	quantity: number;
	price: number;
	vat: number;
	discount?: number;
	unit: string;
	amount: number;
}

export interface BankAccount {
	number: string;
	bank: string;
	logo: string;
}

export const useInvoiceStore = defineStore('invoice', {
	state: () => ({
		// Invoice details
		invoiceNumber: '',
		issueDate: '',
		dueDate: '',

		// From (seller)
		fromCompany: '',
		fromCustomer: '',
		fromEmail: '',

		// To (client)
		toCompany: '',
		toCustomer: '',
		toEmail: '',

		// Products list
		products: [
			{
				id: Date.now(),
				description: '',
				quantity: 1,
				unit: 'pcs',
				price: 0,
				vat: 15,
				discount: 0,
				amount: 0,
			},
		] as Product[],

		globalDiscount: 0,

		// Bank accounts
		bankAccounts: [
			{
				number: '41399128191019',
				bank: 'maib',
				logo: '/assets/maib-logo.png',
			},
			{
				number: '41402928191021',
				bank: 'moldindconbank',
				logo: '/assets/micb-logo.png',
			},
			{
				number: '41503928191025',
				bank: 'victoriabank',
				logo: '/assets/victoriabank-logo.png',
			},
		] as BankAccount[],

		selectedAccount: '',
		notes: '',
	}),

	getters: {
		// Subtotal without VAT or discount
		subtotal: (state) =>
			state.products.reduce((sum, p) => {
				const discountedPrice = p.price * (1 - (p.discount ?? 0) / 100);
				return sum + p.quantity * discountedPrice;
			}, 0),

		// Total VAT
		vatTotal: (state) =>
			state.products.reduce((sum, p) => {
				const discountedPrice = p.price * (1 - (p.discount ?? 0) / 100);
				return sum + p.quantity * discountedPrice * (p.vat / 100);
			}, 0),

		// Total without global discount
		totalBeforeGlobalDiscount(): number {
			return this.subtotal + this.vatTotal;
		},

		// Final total with global discount
		totalAfterGlobalDiscount(): number {
			const discountAmount =
				(this.totalBeforeGlobalDiscount * this.globalDiscount) / 100;
			return this.totalBeforeGlobalDiscount - discountAmount;
		},
	},

	actions: {
		// Add a product
		addProduct() {
			this.products.push({
				id: Date.now(),
				description: '',
				quantity: 1,
				price: 0,
				vat: 15,
				discount: 0,
				unit: 'pcs',
				amount: 0,
			});
		},

		// Remove product
		removeProduct(id: number) {
			this.products = this.products.filter((p) => p.id !== id);
		},

		// Set default bank account
		loadBankAccounts() {
			if (this.bankAccounts.length > 0) {
				this.selectedAccount = this.bankAccounts[0]?.number || '';
			}
		},

		// Full invoice reset
		resetInvoice() {
			this.invoiceNumber = '';
			this.issueDate = '';
			this.dueDate = '';
			this.fromCompany = '';
			this.fromCustomer = '';
			this.fromEmail = '';
			this.toCompany = '';
			this.toCustomer = '';
			this.toEmail = '';
			this.products = [
				{
					id: Date.now(),
					description: '',
					quantity: 1,
					unit: 'pcs',
					price: 0,
					vat: 15,
					discount: 0,
					amount: 0,
				},
			];
			this.globalDiscount = 0;
			this.selectedAccount = '';
			this.notes = '';
		},
	},
});
