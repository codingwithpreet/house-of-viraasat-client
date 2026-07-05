import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/main.layout";
import HomePage from "../features/home/pages/home.page";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  VerificationPendingPage,
  AuthSuccessPage,
} from "../features/auth";
import {
  CollectionsPage,
  ProductListingPage,
  CategoryPage,
  SearchResultsPage,
} from "../features/product-discovery";
import { ProductDetailPage } from "../features/product";
import { WishlistPage, CartPage, CheckoutPage, OrderSuccessPage } from "../features/commerce";
import {
  AccountDashboardPage,
  ProfilePage,
  OrdersPage,
  OrderDetailsPage,
  AddressBookPage,
  SettingsPage,
  ChangePasswordPage,
} from "../features/account";
import { ErrorPage } from "../components/FeedbackStates";
import DebugPage from "../pages/DebugPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      /* Authentication Pages */
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "verification-pending", element: <VerificationPendingPage /> },
      { path: "auth-success", element: <AuthSuccessPage /> },

      /* Product Discovery Pages */
      { path: "collections", element: <CollectionsPage /> },
      { path: "products", element: <ProductListingPage /> },
      { path: "category/:slug", element: <CategoryPage /> },
      { path: "search", element: <SearchResultsPage /> },

      /* Product Details & Purchase Pages */
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order-success", element: <OrderSuccessPage /> },
      { path: "debug", element: <DebugPage /> },

      /* Account Settings Pages */
      {
        path: "account",
        children: [
          { index: true, element: <AccountDashboardPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:id", element: <OrderDetailsPage /> },
          { path: "addresses", element: <AddressBookPage /> },
          { path: "change-password", element: <ChangePasswordPage /> },
          { path: "security", element: <ChangePasswordPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
      { path: "*", element: <ErrorPage isNotFound /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
