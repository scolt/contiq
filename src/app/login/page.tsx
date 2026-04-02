import type { Metadata } from "next";
import { LoginPage } from '@/features/auth/components/LoginPage/LoginPage';

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Contiq to access your document intelligence workspace.",
  openGraph: {
    title: "Sign In",
    description: "Sign in to Contiq to access your document intelligence workspace.",
  },
};

export default function LoginRoute() {
  return <LoginPage />;
}
