import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = 'http://localhost:3000/api/v1/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () =>{
  const res = await axios.get(`${URL_API}`)
  return res.data
})

export const sendProducts = createAsyncThunk('products/sendProducts', async (productData) =>{
  const res = await axios.post(`${URL_API}`, productData,
    { withCredentials: true });
  return res.data
})



const ProductShopSlice = createSlice({
    name:'ProductShop',
    initialState: {
        // products:[
        //     {
        //       id: 1,
        //       title: "2PAC Hoodie",
        //       description: "Honor the legendary Tupac Shakur with this stylish and comfortable hoodie. Featuring iconic designs inspired by his music and legacy, it’s a must-have for any fan.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Music',
        //       colors: ['bg-black', 'bg-white', 'bg-red-500', 'bg-blue-900'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/2pac-black-hoodie.jpeg',
        //       backMockups: '',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 2,
        //       title: "Kobe brayant Hoodie",
        //       description: "Celebrate the legacy of Kobe Bryant with this premium hoodie. Featuring a bold design inspired by his iconic career, it’s stylish, comfortable, and perfect for any fan.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Sport',
        //       colors: ['bg-black', 'bg-white', 'bg-red-500'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Kobe-white-front-hoodie.jpeg',
        //       backMockups: '/mockups/Kobe-white-back-hoodie.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 3,
        //       title: "Gojo Saturu Hoodie",
        //       description: "Show your love for Jujutsu Kaisen with this stylish Gojo Satoru hoodie. Featuring a bold design inspired by the iconic character, it’s perfect for anime fans and everyday wear.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Gojo-white-front-hoodie.jpeg',
        //       backMockups: '/mockups/Gojo-white-back-hoodie.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 4,
        //       title: "Son Goku Hoodie",
        //       description: "Embrace your inner Saiyan with this epic Son Goku hoodie. Featuring a dynamic design inspired by the legendary Dragon Ball hero, it’s perfect for fans of all ages.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white', 'bg-orange-500', 'bg-blue-500'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Goku-black-front-hoodie.jpeg',
        //       backMockups: '/mockups/Goku-black-back-hoodie.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 5,
        //       title: "Monky D Luffy Gear 5 Hoodie",
        //       description: "Celebrate the power of Gear 5 with this epic Monkey D. Luffy hoodie. Featuring a striking design inspired by One Piece’s iconic transformation, it’s a must-have for every anime fan.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white', 'bg-red-500'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Luffy-black-front-hoodie.png',
        //       backMockups: '/mockups/Luffy-black-back-hoodie.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 6,
        //       title: "Naruto Akatsuki Hoodie",
        //       description: "Show your allegiance to the infamous Akatsuki with this bold Naruto hoodie. Featuring the iconic Akatsuki cloud symbol, it’s perfect for fans of the legendary anime series.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Akatuki-black-front-hoodie.jpeg',
        //       backMockups: '/mockups/Akatsuki-black-back-hoodie.png',
        //       isTopSelling: false,
        //       isNew: true
        //     },
        //     {
        //       id: 7,
        //       title: "Roronoa Zoro Hoodie",
        //       description: "Honor the swordsman of the Straw Hat Pirates with this Roronoa Zoro hoodie. Featuring his signature style, it's perfect for One Piece fans who admire his strength and determination.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white', 'bg-green-700'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/front-green-hoodie-Zoro.png',
        //       backMockups: '/mockups/back-green-hoodie-ZORO.png',
        //       isTopSelling: false,
        //       isNew: true
        //     },
        //     {
        //       id: 8,
        //       title: "Toji Fushiguro JJK Hoodie",
        //       description: "Embrace the dark side with this Toji Fushiguro hoodie. Featuring a sleek design inspired by the powerful Jujutsu Kaisen character, it’s perfect for fans of the series.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Toji-black-front-hoodie.jpeg',
        //       backMockups: '/mockups/Toji-black-back-hoodie.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },
        //     {
        //       id: 9,
        //       title: "Kobe brayant Hoodie",
        //       description: "Celebrate the legacy of Kobe Bryant with this comfortable and stylish hoodie. Featuring iconic designs that honor his Mamba Mentality, it’s a must-have for basketball fans.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Sport',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Kobe2-black-front-hoodie.jpeg',
        //       backMockups: '/mockups/Kobe2-black-back-hoodie.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },
        //     {
        //       id: 10,
        //       title: "Michael Jordan Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Sport',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Jordan-white-front-hoodie.jpeg',
        //       backMockups: '/mockups/Jordan-white-back-hoodie.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },

        //     {
        //       id: 11,
        //       title: "Pordugas D ACE Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/ace_Hoodie_front.jpeg',
        //       backMockups: '/mockups/ace_Hoodie_back.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 12,
        //       title: "Bersek Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/bersek_Hoodie_front.jpeg',
        //       backMockups: '/mockups/bersek_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: false
        //     },
        //     {
        //       id: 13,
        //       title: "Billie Eilish Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Music',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Billie_eilish_Hoodie_front.jpeg',
        //       backMockups: '/mockups/Billie_eilish_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },

        //     {
        //       id: 14,
        //       title: "Eminem Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Music',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Eminem_Hoodie_front.jpeg',
        //       backMockups: '/mockups/Eminem_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },

        //     {
        //       id: 15,
        //       title: "Itashi Utshiha Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'OvHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Itachi_Hoodie_front.jpeg',
        //       backMockups: '/mockups/Itachi_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },

        //     {
        //       id: 16,
        //       title: "Michael Jackson Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Music',
        //       colors: ['bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/MJ_Hoodie_front.jpeg',
        //       backMockups: '/mockups/MJ_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },

        //     {
        //       id: 17,
        //       title: "OTC Roman WWE tshirt",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'OvTshirts',
        //       category: 'Sport',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/OTC_Hoodie_front.jpeg',
        //       backMockups: '/mockups/OTC_Hoodie_back.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
        //     {
        //       id: 18,
        //       title: "One piece Shanks Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'Anime',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Shanks_Hoodie_front.jpeg',
        //       backMockups: '/mockups/Shanks_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },

        //     {
        //       id: 19,
        //       title: "Spader-Man Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'MoviesAndSeries',
        //       colors: ['bg-white', 'bg-red-500'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/spaderMan_Hoodie_front.jpeg',
        //       backMockups: '/mockups/spaderMan_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: false
        //     },
        //     {
        //       id: 20,
        //       title: "The Rock Tshirt",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaTshirts',
        //       category: 'Sport',
        //       colors: ['bg-black'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/TheRock_Hoodie_front.jpeg',
        //       backMockups: '/mockups/TheRock_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: true
        //     },
        //     {
        //       id: 21,
        //       title: "toyota Supra Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'ClaHoodies',
        //       category: 'superCars',
        //       colors: ['bg-black', 'bg-white'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/toyota_Hoodie_front.jpeg',
        //       backMockups: '/mockups/toyota_Hoodie_back.jpeg',
        //       isTopSelling: true,
        //       isNew: false
        //     },
          
        //     {
        //       id: 22,
        //       title: "Travis Scoot Hoodie",
        //       description: "Celebrate the legacy of basketball’s greatest with this Michael Jordan hoodie. Featuring iconic designs inspired by His Airness, it’s perfect for fans who admire his unparalleled skill and impact on the game.",
        //       price: 200,
        //       type: 'OvHoodies',
        //       category: 'Music',
        //       colors: ['bg-black'],
        //       sizes: ['S', 'M', 'L', 'XL', '2XL'],
        //       frontMockups: '/mockups/Travis_Hoodie_front.jpeg',
        //       backMockups: '/mockups/Travis_Hoodie_back.jpeg',
        //       isTopSelling: false,
        //       isNew: false
        //     },
        //   ]

        products: [],
        loading: false,
        error: null
    },

    reducers:{},

    extraReducers: (builder) => {
      builder
        // Handle fetch products
        .addCase(fetchProducts.pending, (state) =>{
          state.loading = true;
        })

        .addCase(fetchProducts.fulfilled, (state, action) =>{
          state.loading = false;
          state.products = action.payload;
        })

        .addCase(fetchProducts.rejected, (state,action) =>{
          state.loading = false;
          state.error = action.error.message;
        })

        // Handel send products
        .addCase(sendProducts.pending, (state)=>{
          state.loading = true;
        })

        .addCase(sendProducts.fulfilled, (state, action) =>{
          state.loading = false;
          state.products = action.payload;
        })

        .addCase(sendProducts.rejected, (state, action) =>{
          state.loading = false;
          state.error = action.error.message
        });
    }
});

export default ProductShopSlice.reducer;