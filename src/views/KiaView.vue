<script setup>
import KiaPage from '@/components/KiaPage.vue';
</script>

<template>
    <KiaPage/>
    <!--
      <nav class="bg-black text-white py-4 font-sans">
        <div class="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-3">
          <div class="flex items-center space-x-4">
            <img 
              src="https://kia.rubikxstores.com/web/image/website/30/logo/Kia%20Gear%20Shop?unique=d57bb74" 
              alt="Kia Logo" 
              class="h-10" />
            <div class="ml-3">
              <span class="text-sm font-light tracking-wider">Movement that inspires</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="px-4 py-1 border border-gray-500 text-sm font-light hover:bg-gray-800 hover:border-white transition">
              Sign In
            </button>
            <button class="px-7 py-2.5 bg-white text-black text-sm hover:bg-gray-200 transition rounded">
              CONTACT US
            </button>
          </div>
        </div>

        <div class="border-t border-gray-700"></div>

        <div class="flex justify-between items-center max-w-screen-xl mx-auto px-6 py-2 text-sm">

          <div class="flex space-x-8">
            <a href="#" class="hover:text-gray-400">Home</a>
            <a href="#" class="hover:text-gray-400">Apparel</a>
            <a href="#" class="hover:text-gray-400">Bags</a>
            <a href="#" class="hover:text-gray-400">Drinkware</a>
            <a href="#" class="hover:text-gray-400">Eco</a>
            <a href="#" class="hover:text-gray-400">Headwear</a>
            <a href="#" class="hover:text-gray-400">Household</a>
            <a href="#" class="hover:text-gray-400">Office</a>
            <a href="#" class="hover:text-gray-400">Tech</a>
            <a href="#" class="hover:text-gray-400">Socks</a>
            <a href="#" class="hover:text-gray-400">Food</a>
            <a href="#" class="hover:text-gray-400">Custom Direct</a>
          </div>

          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-15-2l1.25-9h16.5l1.25 9h-19zm3.382-7h11.236l-.906 6h-9.424l-.906-6z" />
            </svg>
            <span class="text-sm">0</span>
          </div>
        </div>
      </nav>

      

<div id="default-carousel" class="relative w-full" data-carousel="slide">

    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://kia.rubikxstores.com/web/image/155846-25c44f61/KIA_DemoSite_Banners%201.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://kia.rubikxstores.com/web/image/155847-0f57277e/KIA_DemoSite_Banners%202.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://kia.rubikxstores.com/web/image/156647-1bf2a003/44.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://kia.rubikxstores.com/web/image/156648-217487a8/33.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://kia.rubikxstores.com/web/image/156649-0456248a/22.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://kia.rubikxstores.com/web/image/156646-f56294b4/11.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
    </div>

    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>

    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>-->
</template>

