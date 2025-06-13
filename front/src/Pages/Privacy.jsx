
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <section className='h-[95dvh] flex flex-col justify-between'>
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how <strong>Luminou§kin</strong> collects, uses, and protects your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Personal information you provide (e.g., email, name)</li>
        <li>Usage data (pages visited, device type)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <p className="mb-4">
        We use your data to provide and improve our service, respond to inquiries, and personalize content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or rent your personal data. We may share it with trusted third-party services for processing on our behalf.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We use appropriate security measures to protect your data. However, no system is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data by contacting us.
      </p>
    </div>
    <Footer />
    </section>
    
  );
}
