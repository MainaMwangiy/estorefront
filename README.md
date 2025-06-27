# E-Commerce Storefront

A modern e-commerce storefront built with Next.js, React, TypeScript, and Tailwind CSS. This project demonstrates a responsive online store with product listings, dynamic product detail pages, a client-side shopping cart, and a mock payment flow using a Stripe Checkout simulation. The application leverages Next.js features like Server-Side Rendering (SSR) and Static Site Generation (SSG) for performance, along with Redux Toolkit for state management and localStorage for persistent cart data.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Bonus Features](#bonus-features)
- [Notes on Stripe Simulation](#notes-on-stripe-simulation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Listing Page**: Displays a grid of products with images, titles, and prices fetched from the Fake Store API.
- **Product Detail Pages**: Dynamic routes (`/products/[id]`) showing detailed product information, including multiple images, descriptions, and an "Add to Cart" button.
- **Shopping Cart**: Client-side cart management using Zustand, with persistent storage in localStorage. Users can add, remove, and update quantities, with a total price calculation.
- **Responsive UI**: Mobile-friendly design built with Tailwind CSS, ensuring a seamless experience across devices.
- **Search and Filtering**: Optional product search and category filtering on the listing page.
- **Mock Payment Flow**: Simulated Stripe Checkout UI for a realistic checkout experience (no real transactions).
- **Performance Optimizations**: Next.js image optimization, code splitting, and SEO-friendly meta tags for product pages.
- **Type Safety**: TypeScript used throughout for type-safe product data and cart state.

## Screenshots

Below are screenshots of the major features:

**Product Listing Page:**  
Grid layout displaying products with images, titles, and prices.

![Mobile View Product Listing](/public/ProjectScreenshots/mobile-view-products-list.png)
![Desktop View Product Listing](/public/ProjectScreenshots/desktop-view-products-listing.png)

**Product Detail Page:**  
Detailed view with product description, multiple images, and Add to Cart button.

![Mobile view Product details](/public/ProjectScreenshots/mobile-view-product-details.png)
![Desktop View Product details](/public/ProjectScreenshots/desktop-view-product-details.png)

**Shopping Cart:**  
Cart page showing added items, quantities, and total price.

![Mobile view cart items](/public/ProjectScreenshots/mobile-view-cart-items.png)
![Desktop view Cart Items](/public/ProjectScreenshots/Desktop-view-cart-items.png)

**Mock Payment Flow:**  
Simulated Stripe Checkout interface.

![Mobile view checkout page](/public/ProjectScreenshots/mobile-view-checkouts-page.png)
![Desktop view checkout page](/public/ProjectScreenshots/Desktop-view-checkout-page.png)
![Successful Payment Stripe](/public/ProjectScreenshots/success-payment.png)

## Tech Stack

- **Next.js**: React framework for SSR, SSG, and dynamic routing.
- **React**: Component-based UI library.
- **TypeScript**: Static typing for type-safe code.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Redux Toolkit**: Lightweight state management for the shopping cart.
- **Fake Store API**: Public JSON API for product data.
- **localStorage**: Persistent storage for cart and wishlist data.
- **Jest**: Unit testing framework for cart logic and components.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher.
- **Yarn**: Package manager for installing dependencies.
- **Git**: For cloning the repository.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/MainaMwangiy/estorefront.git
   cd estorefront
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables:**  
   Create a `.env.local` file in the project root and add the necessary environment variables. See [Environment Variables](#environment-variables) for details.

## Running the Project

1. **Start the Development Server:**

   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

2. **Build for Production:**

   ```bash
   yarn build
   ```

3. **Start the Production Server:**
   ```bash
   yarn start
   ```

## Testing

Run unit tests for cart logic and components using Jest:

```bash
yarn test
```

Tests cover:

- Adding/removing items from the cart.
- Updating quantities and calculating totals.
- Rendering of product cards and cart items.

## Environment Variables

Create a `.env.local` file in the project root with the following:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-test-publishable-key>
STRIPE_SECRET_KEY=<your-test-secret-key>
```

> **Note**: Replace `<your-test-publishable-key>` and `<your-test-secret-key>` with the provided test credentials for the Stripe mockup (see [Notes on Stripe Simulation](#notes-on-stripe-simulation)).

## Project Structure

```
estorefront/
├── app/                   # Next.js pages (index.tsx, products/[id].tsx, cart.tsx)
├── components/            # Reusable React components (ProductCard, CartItem, etc.)
├── lib/                   # Utilities, redux toolkit state management and API fetching functions
├── public/                # Static assets (images, etc.)
├── tests/                 # Unit tests for components and cart logic
├── types/                 # TypeScript types
├── .env.local             # Environment variables (not committed)
├── README.md              # This file
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
```

## Bonus Features

- **Mock Payment UI**: Simulated Stripe Checkout flow with a front-end-only interface.
- **Persistent Cart**: Cart data is saved in localStorage for persistence across sessions.
- **Product Search & Filtering**: Search bar and category filters on the product listing page.
- **Animations**: Smooth "Add to Cart" animations using CSS transitions.
- **Unit Tests**: Tests for cart logic and key components using Jest.
- **SEO**: Dynamic meta titles and descriptions for product pages.
- **Image Optimization**: Next.js `<Image>` component used for optimized product images.

## Notes on Stripe Simulation

For the mock payment flow, test credentials for the Stripe simulation are shared below. The .env could not be pushed to the repository as it is not a good practice. Please use these Stripe configs for testing the mock payment flow or replace with yours. These credentials are safe for testing as the repository is accessible only to you and the tester as this is a private reposiroty and they are test credentials. Use the provided test card details (e.g., `4242 4242 4242 4242`) to simulate payments in the Stripe Checkout UI.

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RccISIhO4EdTC86stUvhpjuDOUPGpHwuKUCPRCOkUJgGn8R1MTVOWpsSNYdoBGiK69mWQKCZkWdh0rYHHxhOTFP00zkm3xbwG
STRIPE_SECRET_KEY=sk_test_51RccISIhO4EdTC86KfJj1rbilaNNqx1JNUuvHGW4UTV5uoqJzMhnyiWIB0w9QKGzWL2dJRcFQTNKsqFqlmVjvSmb00UjTi1OUz
```

**To test the payment flow:**

1. Add items to the cart.
2. Navigate to the cart page and proceed to checkout.
3. Use the test card details to complete the mock payment.

For more details on Stripe testing, refer to the [Stripe Testing Documentation](https://stripe.com/docs/testing).

## Contributing

This is a private repository for demonstration purposes. Contributions are not expected, but feedback from the tester is welcome. Please report issues or suggestions directly to the repository owner.

## License

This project is for demonstration purposes and is not licensed for public use. All rights reserved.
