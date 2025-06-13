import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <section className='h-[95dvh] flex flex-col justify-between'>

    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        Welcome to <strong>Luminou§kin</strong>! These Terms of Service ("Terms") govern your use of our website and services.
        By accessing or using our services, you agree to be bound by these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
      <p className="mb-4">
        You agree to use our service only for lawful purposes and in accordance with these Terms.
        You may not use our service in any way that could damage, disable, or impair the website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
      <p className="mb-4">
        When you create an account with us, you must provide accurate information.
        You are responsible for safeguarding your password and for any activities under your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        All content on this site, including text, images, and code, is the property of <strong>Luminou§kin</strong> or its licensors.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access at any time, without prior notice, if we believe you have violated these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
      <p>
        We reserve the right to update these Terms at any time. We will notify you of changes by updating the date at the top of the Terms.
      </p>
    </div>
    <Footer />
    </section>
  );
}
