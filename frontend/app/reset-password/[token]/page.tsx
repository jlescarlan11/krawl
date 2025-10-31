import ResetPasswordForm from '../ResetPasswordForm';
import AuthScaffold from '@/components/auth/AuthScaffold';

export default async function ResetPasswordTokenPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const safeToken = typeof token === 'string' ? token : '';
  return (
    <AuthScaffold heading="Create New Password" subheading="Enter your new password below">
      <ResetPasswordForm token={safeToken} />
    </AuthScaffold>
  );
}


