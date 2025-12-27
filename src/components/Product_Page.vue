<script setup>
import axios from "axios";
import { ref, onMounted, computed, watch } from "vue";
import { ArrowLongLeftIcon, ArrowLongRightIcon, StarIcon } from "@heroicons/vue/20/solid"
import { useRouter } from "vue-router";
import { showToast } from "@/toastutiles";
import { useToast } from "vue-toastification";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline'


const products = ref([]);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = 20;
const totalProducts = ref(0);
const router = useRouter();
const toast = useToast();
const user = ref(null);
const searchQuery = ref('');
const isSearching = ref(false);
const isSearchBarVisible = ref(false);
const isInputFocused = ref(false);
const isLoading = ref(false);

const toggleSearchBar = () => {
  if (isSearchBarVisible.value && !isInputFocused.value && searchQuery.value.trim() === '') {
    isSearchBarVisible.value = false;
  } else {
    isSearchBarVisible.value = true;
  }
};

const handleFocus = () => {
  isInputFocused.value = true;
};

const handleBlur = () => {
  isInputFocused.value = false;
  if (searchQuery.value.trim() === '') {
    isSearchBarVisible.value = false;
  }
};

const fetchProducts = async (page) => {
  isLoading.value = true;
  try {
    const skip = (page - 1) * itemsPerPage;
    const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${itemsPerPage}`);
    products.value = response.data.products;
    totalProducts.value = response.data.total;
    error.value = null;
  } catch (err) {
    error.value = "Failed to load products.";
    console.error(err);
  }finally{
    isLoading.value = false;
  }
};

const fetchSearchedProducts = async (page) => {
  try {
    const skip = (page - 1) * itemsPerPage; // Calculate the number of items to skip
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${searchQuery.value}&skip=${skip}&limit=${itemsPerPage}`
    );
    products.value = response.data.products;
    totalProducts.value = response.data.total; // Assuming API returns total count
    error.value = null;
  } catch (err) {
    error.value = "Failed to search products.";
    console.error(err);
  }
};

// Displayed products (only used for local display)
const displayedProducts = computed(() => products.value);

// Total pages
const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / itemsPerPage);
});

// Handle page navigation
const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    if (isSearching.value) {
      await fetchSearchedProducts(page);
    } else {
      await fetchProducts(page);
    }
  }
};

// Watch search query changes
watch(searchQuery, async (newQuery) => {
  currentPage.value = 1; // Reset to the first page when the search query changes
  if (newQuery) {
    isSearching.value = true; // Enable search mode
    await fetchSearchedProducts(currentPage.value);
  } else {
    isSearching.value = false; // Exit search mode
    await fetchProducts(currentPage.value);
  }
});

// Initial setup
onMounted(async () => {
  await fetchProducts(currentPage.value);

  const storedUser = localStorage.getItem('user-info');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

const retryFetch = async () => {
  if (isSearching.value) {
    await fetchSearchedProducts(currentPage.value);
  } else {
    await fetchProducts(currentPage.value);
  }
};


const handleLogout = () => {
  const userInfo = localStorage.getItem('user-info');
  if (userInfo) {
    localStorage.clear(); // No need to pass key to clear(), it clears all
    user.value = null;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    showToast(toast, 'success', 'Successfully logged out!');
    router.push('/');
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll in both cases
    showToast(toast, 'info', 'Please create an account or Log in!!!');
    router.push('/signup');
  }
};


const handleLogin = () => {
  router.push('/login')
};

const handleSignup = () => {
  router.push('/signup')
};

const handleCart = () => {
  router.push('/cart')
};

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
};
const open = ref(false);

</script>


<template>

  <div class="bg-white">
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pb-2 pt-5">
                <button type="button" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" @click="open = false">
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIconOutline class="size-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                      <button :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{ category.name }}</button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="category in navigation.categories" :key="category.name" class="space-y-10 px-4 pb-8 pt-10">
                    <div class="grid grid-cols-2 gap-x-4">
                      <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                        <img :src="item.imageSrc" :alt="item.imageAlt" class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" />
                        <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                          <span class="absolute inset-0 z-10" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div v-for="section in category.sections" :key="section.name">
                      <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">{{ section.name }}</p>
                      <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`" class="mt-6 flex flex-col space-y-6">
                        <li v-for="item in section.items" :key="item.name" class="flow-root">
                          <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <button @click="handleLogin" class="-m-2 block p-2 font-medium text-gray-900">Sign in</button>
                </div>
                <div class="flow-root">
                  <button @click="handleSignup" class="-m-2 block p-2 font-medium text-gray-900">Create account</button>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img src="https://tailwindui.com/plus-assets/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 shrink-0" />
                  <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <p class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get free delivery on orders over $100</p>

      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="open = true">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="size-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="#">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover v-for="category in navigation.categories" :key="category.name" class="flex" v-slot="{ open }">
                  <div class="relative flex">
                    <PopoverButton :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">{{ category.name }}</PopoverButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <PopoverPanel class="absolute inset-x-0 top-full z-10 text-sm text-gray-500">
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div v-for="item in category.featured" :key="item.name" class="group relative text-base sm:text-sm">
                                <img :src="item.imageSrc" :alt="item.imageAlt" class="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75" />
                                <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                                  <span class="absolute inset-0 z-10" aria-hidden="true" />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                              <div v-for="section in category.sections" :key="section.name">
                                <p :id="`${section.name}-heading`" class="font-medium text-gray-900">{{ section.name }}</p>
                                <ul role="list" :aria-labelledby="`${section.name}-heading`" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                  <li v-for="item in section.items" :key="item.name" class="flex">
                                    <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ page.name }}</a>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div v-if="user">
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <p class="text-sm font-medium text-gray-700 hover:text-gray-800">{{ user.name }}</p>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <button @click="handleLogout" lass="text-sm font-medium text-gray-700 hover:text-gray-800">Logout</button>
                </div>
              </div>
              <div v-else>
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <button @click="handleLogin" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</button>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <button @click="handleSignup" lass="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</button>
                </div>
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a href="#" class="flex items-center text-gray-700 hover:text-gray-800">
                  <img src="https://tailwindui.com/plus-assets/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 shrink-0" />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <input
                    v-if="isSearchBarVisible"
                    v-model="searchQuery"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    type="text"
                    class="search-input"
                    placeholder="Search..."
                  />
                <button @click="toggleSearchBar" class="p-2 text-gray-400 hover:text-gray-500 flex items-center">
                  <span class="sr-only">Search</span>
                  <!-- Magnifying glass icon -->
                  <MagnifyingGlassIcon class="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <button @click="handleCart" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>

  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Products</h1>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="retryFetch">Retry</button>
    </div>
    <div v-if="isLoading" class="fixed inset-0 bg-lightgray-800 bg-opacity-100 backdrop-blur-md flex items-center justify-center z-50">
        <ArrowPathIcon class="w-20 h-20 animate-spin text-blue-500" />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in displayedProducts" 
      :key="product.id"
        class="border border-gray-300 p-6 rounded-lg shadow-lg bg-white flex flex-col h-full transition-transform transform hover:scale-105">

        <RouterLink :to="`/productdetails/${product.id}`" class="flex flex-col h-full">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">{{ product.title }}</h2>
          <img
            loading="lazy"
            :src="product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'"
            :alt="product.title"
            class="w-full h-48 object-contain mb-2 rounded-lg"
          />
          <p class="text-sm text-gray-600 mb-2 line-clamp-3">{{ product.description }}</p>
          <p class="text-lg font-semibold text-gray-800 mb-2"><strong>Price:</strong> ${{ product.price }}</p>
          <p class="text-sm text-blue-600 mb-2"><strong>Category:</strong> {{ product.category }}</p>
          <div class="flex items-center mb-2">
            <span v-for="n in 5" :key="n" class="star">
              <template v-if="n <= product.rating">
                <StarIcon class="h-6 w-6 text-yellow-500" /> <!-- Filled star -->
              </template>
              <template v-else>
                <StarIcon class="h-6 w-6 text-gray-400" /> <!-- Empty star -->
              </template>
            </span>
          </div>
          <p class="text-sm text-black-600 mb-2"><strong>AvailabilityStatus:</strong> {{ product.availabilityStatus }}</p>
        </RouterLink>
      </div>
    </div>

    <!-- Pagination -->
    <div>
      <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div  class="-mt-px flex w-0 flex-1">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon class="mr-3 size-5 text-gray-400" aria-hidden="true" />
            Previous
          </button>
        </div>
        <div class="flex space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
              currentPage === page
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            ]"
          >
            {{ page }}
          </button>
        </div>
        <div class="-mt-px flex w-0 flex-1 justify-end">
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon class="ml-3 size-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </div>
  </div>

  <footer aria-labelledby="footer-heading" class="bg-gray-50">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-t border-gray-200 py-20">
          <div class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            <!-- Image section -->
            <div class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <img src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" />
            </div>

            <!-- Sitemap sections -->
            <div class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Products</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li v-for="item in footerNavigation.products" :key="item.name" class="text-sm">
                      <a :href="item.href" class="text-gray-500 hover:text-gray-600">{{ item.name }}</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Company</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li v-for="item in footerNavigation.company" :key="item.name" class="text-sm">
                      <a :href="item.href" class="text-gray-500 hover:text-gray-600">{{ item.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">Customer Service</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.customerService" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-500 hover:text-gray-600">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Newsletter section -->
            <div class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <h3 class="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
              <p class="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
              <form class="mt-2 flex sm:max-w-md">
                <input id="email-address" type="text" autocomplete="email" required="" aria-label="Email address" class="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                <div class="ml-4 shrink-0">
                  <button type="submit" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 py-10 text-center">
          <p class="text-sm text-gray-500">&copy; 2021 Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
