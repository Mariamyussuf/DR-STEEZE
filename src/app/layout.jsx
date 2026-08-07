import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'DR STEEZE — Creative Director, Visual Storyteller & Founder of Culture of Zion',
  description: 'Creating timeless stories through photography, filmmaking, and handcrafted footwear design. Executive creative direction globally.',
  keywords: ['DR STEEZE', 'Creative Director', 'Photographer', 'Filmmaker', 'Culture of Zion', 'Visual Storytelling', 'High Fashion Editorial'],
  authors: [{ name: 'DR STEEZE' }],
  openGraph: {
    title: 'DR STEEZE — Creative Director',
    description: 'Creating timeless stories through photography, filmmaking, and handcrafted design.',
    type: 'website',
    url: 'https://drsteeze.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="noise-bg" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
