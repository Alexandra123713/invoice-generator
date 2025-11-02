<template>
	<nav
		class="flex justify-between items-center px-[16px] py-[18.5px] bg-white max-w-[1440px] mx-auto">
		<!-- ===== Mobile Navbar ===== -->
		<div class="flex justify-between items-center w-full md:hidden">
			<!-- Back button -->
			<button
				class="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
				<img
					src="/assets/arrow-left.svg"
					alt="Back"
					width="20"
					height="20" />
			</button>
			<!-- Exchange button -->
			<button
				class="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl">
				<img
					src="/assets/rotate.svg"
					alt="Rotate"
					width="20"
					height="20" />
			</button>
		</div>

		<!-- ===== Desktop Navbar ===== -->
		<div class="hidden md:flex justify-between w-full items-center">
			<!-- Left side -->
			<div class="flex items-center gap-2">
				<CurrencyDropdown />
				<LanguageDropdown />

				<button
					class="ml-2 py-2.5 px-[20px] bg-primary-700 text-white rounded-lg flex items-center gap-2">
					<img
						src="/assets/rotate.svg"
						alt="Refresh"
						width="20"
						height="20" />
					Exchange
				</button>
			</div>

			<!-- Right side -->
			<div class="flex items-center gap-2">
				<button
					class="text-primary-700 py-2.5 px-[20px] border border-primary-700 rounded-lg flex items-center gap-1">
					<img
						src="/assets/file.svg"
						alt="File" />
					Attach file
				</button>

				<button class="py-2.5 px-[20px] bg-primary-700 text-white rounded-lg">
					Save invoice →
				</button>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import CurrencyDropdown from './CurrencyDropdown.vue';
import LanguageDropdown from './LanguageDropdown.vue';
</script>
