import ResetPasswordForm from './ResetPasswordForm';
import AuthScaffold from '@/components/auth/AuthScaffold';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const sp = await searchParams;
  const token = typeof sp?.token === 'string' ? sp.token : '';
  return (
    <AuthScaffold heading="Create New Password" subheading="Enter your new password below">
      <ResetPasswordForm token={token} />
    </AuthScaffold>
  );
}


