import { MenuBar } from '../../components/ui/MenuBar'
import { Footer } from '../../components/ui/Footer'

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
