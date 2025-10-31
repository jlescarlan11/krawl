import type { Metadata } from 'next';

import LoginForm from '@/components/auth/LoginForm';
import AuthScaffold from '@/components/auth/AuthScaffold';

export const metadata: Metadata = {
  title: 'Login | Krawl',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams ?? {};
  const raw = params.redirect;
  const redirect =
    typeof raw === 'string' && raw.startsWith('/') ? raw : '/';

  return (
    <AuthScaffold heading="Welcome Back" subheading="Log in to continue your krawl.">
      <LoginForm redirect={redirect} />
    </AuthScaffold>
  );
}