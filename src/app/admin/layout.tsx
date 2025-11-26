// app/admin/layout.tsx
import { ProtegerAdmin } from '@/src/components/protected/ProtegerAdmin';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtegerAdmin>
      <div className="min-h-screen bg-gray-100">
        <main>{children}</main>
      </div>
    </ProtegerAdmin>
  );
}