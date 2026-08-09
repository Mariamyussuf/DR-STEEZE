import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Sobayo Deborah Oluwaseyitan (DR STEEZE) — Creative Director & Visual Storyteller',
  description: 'Sobayo Deborah Oluwaseyitan (DR STEEZE) - Creative Director & Founder of Culture of Zion based in Nigeria. Creating timeless stories through photography, filmmaking, and handcrafted design.',
  keywords: ['Sobayo Deborah Oluwaseyitan', 'DR STEEZE', 'Creative Director Nigeria', 'Photographer Nigeria', 'Filmmaker', 'Culture of Zion', 'Visual Storytelling', 'High Fashion Editorial'],
  authors: [{ name: 'Sobayo Deborah Oluwaseyitan' }],
  openGraph: {
    title: 'Sobayo Deborah Oluwaseyitan (DR STEEZE) — Creative Director',
    description: 'Creating timeless stories through photography, filmmaking, and handcrafted design.',
    type: 'website',
    url: 'https://drsteeze.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-bg" />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

