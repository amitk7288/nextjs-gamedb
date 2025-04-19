🎮 GameDB: A Next.js App Powered by RAWG API and Prisma
Welcome to the Next JS GameDB, a powerful and scalable web application built using Next.js and Prisma ORM, with data sourced from the RAWG API.

🛠️ Getting Started
Step 1: Install Dependencies
📦 Run the following command to install all required dependencies:

bash
npm install
Ensure you have Node.js 18+ installed.

Step 2: Add Environment Variables
🔑 Create a .env file in the root of your project and add the following:

env
NEXT_PUBLIC_BASE_URL="https://api.rawg.io/api"
NEXT_PUBLIC_RAWG_API="the_api_key_goes_here"
DATABASE_URL="the_db_url_goes_here"
NEXT_PUBLIC_BASE_URL: The RAWG API base URL.

NEXT_PUBLIC_RAWG_API: Your RAWG API key. Generate this by signing up at RAWG and visiting your account settings.

DATABASE_URL: Your PostgreSQL database connection string (e.g., provided by Supabase).

Step 3: Prisma Setup
🗂️ Set up Prisma ORM to manage your database:

Generate Prisma Client:

bash
npx prisma generate
Push Database Schema:

bash
npx prisma db push
Seed the Database (Optional): Run the following to seed the database with initial data:

bash
npx prisma db seed
The seed logic is defined in prisma/seed.ts.

Step 4: Run Development Server
🚀 Start the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 in your browser to see your project live!

📚 Learn More
Next.js Documentation - Learn about Next.js features and APIs.

Prisma Documentation - Learn how to use Prisma effectively.

RAWG API Documentation - Explore gaming data via the RAWG API.