import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Journal of Basic Science and Engineering',
  description: 'Yingyong Jichu yu Gongcheng Kexue Xuebao - Journal of Basic Science and Engineering',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <body style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{children}</body>
    </html>
  );
}