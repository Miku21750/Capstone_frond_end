import { Footer } from "@/components/Footer";

export default function CookiePage() {
  return (
    <section className='h-[95dvh] flex flex-col justify-between'>

    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
      <p className="mb-4">
        This Cookie Policy explains how <strong>Luminou§kin</strong> uses cookies and similar technologies to recognize you when you visit our site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. What are Cookies?</h2>
      <p className="mb-4">
        Cookies are small data files stored on your device. They help improve your experience by remembering preferences and settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Cookies</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Essential cookies for functionality</li>
        <li>Analytics cookies to understand usage</li>
        <li>Preference cookies to remember your settings</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
      <p className="mb-4">
        You can control cookies through your browser settings. Disabling cookies may affect your experience on our site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to this Policy</h2>
      <p>
        We may update this Cookie Policy periodically. Changes will be posted on this page.
      </p>
    </div>
    <Footer />
    </section>
  );
}
