<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification";
import { showToast } from "@/toastutiles";
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
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline'


const quantity = ref(1);
const user = ref(null);
const route = useRoute();
const product = ref(null);
const toast = useToast();
const router = useRouter();
const currentImage = ref('');


const state = reactive({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${route.params.id}`);
    product.value = response.data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
});

const updateLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
};

const calculateDiscountedPrice = (price, discount) => {
  return (price - price * (discount / 100)).toFixed(2);
};

const addToCart = () => {
  const existingItem = state.cart.find((item) => item.id === product.value.id);
  if (existingItem) {
    existingItem.quantity += 1;
    showToast(toast, "info", "Quantity updated in cart!");
  } else {
    const discountedPrice = calculateDiscountedPrice(product.value.price, product.value.discountPercentage);
    state.cart.push({ ...product.value, quantity: 1, discountedPrice});
    showToast(toast, "success", "Product added to cart!");
  }
  updateLocalStorage();
  router.push("/cart");
};

// Quantity Update
const updateQuantity = (amount) => {
  quantity.value = Math.max(1, quantity.value + amount);
};

const cartCount = computed(() => 
  state.cart.reduce((total, item) => total + item.quantity, 0)
);


onMounted(() => {
  const storedUser = localStorage.getItem('user-info');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

const handleLogout = () => {
  const userInfo = localStorage.getItem('user-info')
  if(userInfo){
    localStorage.clear('user-info');
    user.value = null;
    showToast(toast, 'success', 'Successfully logged out!');
    router.push('/');
  }
  else{
    showToast(toast,'info','Please create an account or Log in!!!')
    router.push('/signup')
  }
};

const handleCart = () => {
  router.push('/cart')
};

const handleLogin = () => {
  router.push('/login')
};

const handleSignup = () => {
  router.push('/signup')
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
                <button @click="handleLogout" class="text-sm font-medium text-gray-700 hover:text-gray-800">Logout</button>
                </div>
              </div>
              <div v-else>
                <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <button @click="handleLogin" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</button>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <button @click="handleSignup" class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</button>
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
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="size-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <button @click="handleCart" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  <button class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ cartCount }}</button>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>

  <main>
  <section v-if="product" class="py-10 bg-gray-100">
    <div class="container mx-auto px-6 md:px-12 lg:px-24">
      <div class="bg-white rounded-lg shadow-lg flex flex-wrap overflow-hidden">
        <!-- Product Image Gallery -->
        <div class="w-full md:w-1/2 flex justify-center items-center p-6">
          <div class="relative w-full h-full max-w-md">
            <!-- Main Product Image -->
            <img
              v-if="currentImage?.length" 
              :src="currentImage"
              alt="Product Image"
              class="object-contain w-full h-full rounded-lg shadow-lg"
            />
            <img
              v-else 
              :src="product.thumbnail"
              alt="Product Image"
              class="object-contain w-full h-full rounded-lg shadow-lg"
            />

            <!-- Thumbnails for Product Images -->
            <div class="absolute bottom-0 left-0 w-full bg-white p-4 flex space-x-4 overflow-x-auto">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                class="flex-none w-24 h-24 bg-gray-200 rounded-lg shadow-md cursor-pointer"
                @click="currentImage = image"
              >
                <img
                  :src="image"
                  alt="Product Thumbnail"
                  class="object-cover w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="w-full md:w-1/2 p-6 space-y-6">
          <h2 class="text-sm font-semibold uppercase text-gray-500">{{ product.category }}</h2>
          <h1 class="text-3xl font-bold text-gray-800">{{ product.title }}</h1>
          <p class="text-gray-600">{{ product.description }}</p>

          <!-- Price and Discount -->
          <div class="space-y-2">
            <p class="text-xl font-bold text-green-600">
              ${{ calculateDiscountedPrice(product.price, product.discountPercentage) }}
            </p>
            <p class="text-sm text-gray-500 line-through">${{ product.price }}</p>
            <p class="text-sm text-red-600 font-semibold">Save {{ product.discountPercentage }}%</p>
          </div>

          <!-- Quantity Picker -->
          <div class="mt-6 flex items-center space-x-4">
            <h3 class="text-sm font-semibold">Quantity:</h3>
            <div class="flex items-center space-x-4">
              <button
                @click="updateQuantity(-1)"
                class="w-8 h-8 flex justify-center items-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
              >
                -
              </button>
              <span class="text-xl font-bold">{{ quantity }}</span>
              <button
                @click="updateQuantity(1)"
                class="w-8 h-8 flex justify-center items-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>

          <!-- Availability -->
          <div class="mt-6">
            <p class="text-sm font-semibold">Availability:</p>
            <p class="text-gray-700">{{ product.stock > 0 ? "In Stock" : "Out of Stock" }}</p>
          </div>

          <!-- Warranty -->
          <div class="mt-6">
            <p class="text-sm font-semibold">Warranty:</p>
            <p class="text-gray-700">This product comes with a {{ product.warranty || '1 year' }} warranty.</p>
          </div>

          <!-- Shipping -->
          <div class="mt-6">
            <p class="text-sm font-semibold">Shipping:</p>
            <p class="text-gray-700">Estimated delivery time: {{ product.shippingTime || '3-5 business days' }}. Shipping charges may apply.</p>
          </div>

          <!-- Add to Cart Section -->
          <div class="mt-6 flex justify-between items-center">
            <button
              @click="addToCart"
              class="w-36 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-10 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800">Customer Reviews</h2>
        <div v-if="product.reviews.length > 0" class="mt-4">
          <div v-for="review in product.reviews" :key="review.reviewerEmail" class="mb-4">
            <div class="flex items-center space-x-2">
              <p class="font-bold text-gray-700">{{ review.reviewerName }}</p>
              <span class="text-sm text-gray-500">{{ new Date(review.date).toLocaleDateString() }}</span>
            </div>
            <div class="mt-2">
              <p class="text-gray-600">{{ review.comment }}</p>
              <p class="text-yellow-500">Rating: {{ review.rating }} / 5</p>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    </div>
  </section>

  <p v-else class="text-center text-gray-500 py-20">Loading product details...</p>
</main>


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