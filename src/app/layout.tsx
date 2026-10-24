import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/layout/ClientShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Rudra Property | Pune's Trusted Real Estate Partner | Keshav Nagar, Kharadi, Mundhwa",
  description:
    "Discover verified luxury apartments, penthouses, and commercial spaces across Keshav Nagar, Mundhwa, Kharadi, Koregaon Park, and Hadapsar. Office No. 47, Prestige Chamber.",
  keywords: [
    'Rudra Property Pune',
    'Real Estate Agent Keshav Nagar',
    'Flats in Mundhwa',
    'Luxury Apartments Kharadi',
    'Koregaon Park Penthouses',
    'Pune Property Consultant',
  ],
  openGraph: {
    title: "Rudra Property | Your Property. Our Priority.",
    description:
      "Pune's premier real estate consultancy. Residential, Commercial, Investment, and Rental Solutions in Keshav Nagar, Mundhwa & Kharadi.",
    url: 'https://rudrapropertypune.com',
    siteName: 'Rudra Property Consultancy',
    images: [
      {
        url: '/branding/rudra-banner.png',
        width: 1200,
        height: 630,
        alt: 'Rudra Property Pune',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
