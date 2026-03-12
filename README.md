# CloudCalc Pro | Multi-Cloud Price Calculator

CloudCalc Pro is a professional infrastructure cost estimation tool designed for modern architects. It allows for side-by-side comparison of services across AWS, Microsoft Azure, and Google Cloud Platform with 100% AI-driven real-time pricing.

## Features

- **AI-Powered Pricing**: No static price tables. Gemini fetches real-time market data for every service, region, and instance type.
- **Multi-Currency Support**: Switch between USD, EUR, INR, and GBP with instant AI-driven conversion.
- **AI Cost Optimizer**: Analyze your architecture designs and get suggestions for cheaper, equivalent alternatives.
- **Comprehensive Catalog**: Includes Compute (GPU, Serverless, General Purpose), Storage, Databases, Networking, Security, and more.
- **Asian Region Support**: Specialized support for regions like Mumbai, Singapore, and Tokyo.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

1. **Environment Variables**:
   Ensure you have your `GEMINI_API_KEY` set in your environment for the AI features to work.

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment

This app is optimized for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).
