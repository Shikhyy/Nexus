import { AppShell } from '@/components/layout/AppShell';
import { AuthGuard } from '@/components/providers/AuthGuard';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard><AppShell>{children}</AppShell></AuthGuard>;
}
