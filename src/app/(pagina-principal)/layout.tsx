import { MenuBar } from '../../components/MenuBar'
import { Footer } from '../../components/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="min-h-screen">
    <MenuBar/>
    {children}
    <Footer/>
   </main>
  );
}
