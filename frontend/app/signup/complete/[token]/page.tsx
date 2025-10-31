import RegisterCompleteForm from './RegisterCompleteForm';

export default async function SignupCompleteTokenPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <RegisterCompleteForm token={token} />;
}


