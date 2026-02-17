import { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Providers from "../components/providers/providers";
import { verifyToken } from "../features/auth/server/auth.actions";
import { getLoggedUserCart } from "../features/cart/server/cart.actions";
import { getLoggedUserWishlist } from "../features/wishlist/server/wishlist.actions";
import { CartState } from "../features/cart/store/cart.slice";
import { WishlistState } from "../features/wishlist/store/wishlist.slice";
// ^ fontawesome styles
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Exo_2 } from "next/font/google";

config.autoAddCss = false;

// Font optimization
const exo = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-exo",
});

export const metadata = {
  viewport: "width=device-width, initial-scale=1",
};

let defaultCartState: CartState = {
  cartId: null,
  products: [],
  totalCartPrice: 0,
  numOfCartItems: 0,
  loading: false,
  error: null,
};

const defaultWishlistState: WishlistState = {
  wishlistId: null,
  count: 0,
  data: [],
  loading: false,
  error: null,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authValues = await verifyToken();
  let cartState = defaultCartState;
  let wishlistState = defaultWishlistState;
  if (authValues.isAuthenticated) {
    try {
      const cartResponse = await getLoggedUserCart();
      cartState = {
        cartId: cartResponse.cartId,
        products: cartResponse.data.products,
        totalCartPrice: cartResponse.data.totalCartPrice,
        numOfCartItems: cartResponse.numOfCartItems,
        loading: false,
        error: null,
      };
      try {
        const wishlistResponse = await getLoggedUserWishlist();
        wishlistState = {
          wishlistId:
            wishlistResponse.data.length > 0
              ? wishlistResponse.data[0].id
              : null,
          count: wishlistResponse.count,
          data: wishlistResponse.data,
          loading: false,
          error: null,
        };
      } catch (e) {
        // ignore wishlist fetch errors for layout
      }
    } catch (error) {
      cartState = defaultCartState;
      wishlistState = defaultWishlistState;
    }
  }
  return (
    <html lang="en" className={exo.variable}>
      <body className={`${exo.className} antialiased`}>
        <Providers
          preloadedState={{
            auth: authValues,
            cart: cartState,
            wishlist: wishlistState,
          }}
        >
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
