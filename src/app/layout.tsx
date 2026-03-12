import type {Metadata} from 'next';
import './globals.css';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const ogImage = PlaceHolderImages.find(img => img.id === 'og-image');

export const metadata: Metadata = {
  title: 'CloudCalc Pro | Multi-Cloud Price Calculator',
  description: 'Professional cloud infrastructure cost estimation for AWS, Azure, and Google Cloud with AI optimization.',
  openGraph: {
    title: 'CloudCalc Pro',
    description: 'Estimate your cloud costs with AI precision.',
    images: ogImage ? [{ url: ogImage.imageUrl }] : [],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
