import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/layout/ClientShell';
import { projectConfig } from '@/config/projectConfig';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: `${projectConfig.identity.projectName} | ${projectConfig.identity.tagline}`,
  description: projectConfig.hero.subheadline,
  keywords: [
    'The Riviera Reserve Pune',
    'Luxury Apartments Keshav Nagar',
    'Pune Sky Mansions',
    'Koregaon Park Luxury Flats',
    'Riverfront Residences Pune',
    'Under Construction Luxury Projects Pune',
  ],
  openGraph: {
    title: `${projectConfig.identity.projectName} | ${projectConfig.identity.tagline}`,
    description: projectConfig.hero.subheadline,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rudrapropertypune.com',
    siteName: projectConfig.identity.projectName,
    images: [
      {
        url: projectConfig.hero.fallbackPoster,
        width: 1200,
        height: 630,
        alt: projectConfig.identity.projectName,
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
    <html lang="en">
      <body className="min-h-screen bg-[#040B18] text-[#FAF8F5] font-sans antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
