import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, MessageCircleQuestion, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sparkles, Stethoscope, Leaf, Pill } from 'lucide-react';

import ApiRequest from '@/api';

import Swal from 'sweetalert2';

export const SkinCondition = () => {
  const { name } = useParams();
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conditions.length === 0 && loading) {
      Swal.fire({
        title: 'Loading conditions...',
        text: 'Please wait while we fetch the data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    ApiRequest.get('/api/list-skin-condition')
      .then((res) => {
        setConditions(res.data);
        const matched = res.data.find((condition) => slugify(condition.name) === name);

        setSelectedCondition(matched || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch conditions', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while fetching the data.',
        });
        setLoading(false);
      })
      .finally(() => {
        Swal.close();
      });
  }, [name, loading, conditions.length]); // Add conditions.length to dependency array

  useEffect(() => {
    if (conditions.length > 0) {
      const matched = conditions.find((condition) => slugify(condition.name) === name);
      setSelectedCondition(matched || null);
    }
  }, [name, conditions]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  if (loading && conditions.length === 0) {
    return (
      <section className="flex items-center justify-center min-h-[60vh] p-4 bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Loading content...</p>
          {/* You could add a simple spinner here if Swal is not visible */}
        </div>
      </section>
    );
  }

  if (!selectedCondition) {
    return (
      <section className="flex items-center justify-center min-h-[60vh] p-4 bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600">Condition not found.</p>
          <p className="text-gray-600 mt-2">Please check the URL or try searching for another condition.</p>
        </div>
      </section>
    );
  }

  const filteredConditions = conditions.filter((condition) => condition.name.toLowerCase().includes(searchKeyword.toLowerCase()));

  const tocSections = [];
  let currentH2 = null;

  selectedCondition.sections.forEach((section, index) => {
    section.id = `section-${index}`; // Ensure unique IDs for scrolling

    if (section.level === 'h2') {
      currentH2 = {
        ...section,
        children: [],
      };
      tocSections.push(currentH2);
    } else if (section.level === 'h3' && currentH2) {
      currentH2.children.push(section);
    }
  });

  return (
    <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen bg-[#E9F3F4] text-gray-800">
      {/* Main content area */}
      <section className="flex-1 w-auto lg:mr-80 px-4 py-8 lg:px-8 lg:py-12">


        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-6 sm:mb-10 leading-tight">
          {selectedCondition.name}
        </h1>

        <div className=" p-5 lg:hidden"> 
          <h2 className="font-bold text-2xl text-blue-800 mb-6">On this page</h2>
          <ul className="space-y-3 text-gray-700 border-4 w-fit p-5 border-blue-200 rounded-lg">
            {tocSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="font-semibold text-sm hover:text-blue-600 transition-colors duration-200 block py-1"
                >
                  {section.heading}
                </a>
                {section.children.length > 0 && (
                  <ul className="ml-5 mt-2 space-y-1 text-gray-600 border-l-2 border-blue-100 pl-4">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className="hover:text-blue-600 transition-colors duration-200 block py-1"
                        >
                          {child.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div> 


        <div className="space-y-8 sm:space-y-10">
          {tocSections.map((section) => (
            <article key={section.id} id={section.id} className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">{section.heading}</h2>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                {section.content}
              </p>

              {section.children.map((child, idx) => (
                <div key={child.id} id={child.id} className="mt-6 sm:mt-8 ml-4 sm:ml-8 pl-4 border-l-4 border-blue-200">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">{child.heading}</h3>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
                    {child.content}
                  </p>
                </div>
              ))}
            </article>
          ))}
        </div>

        {selectedCondition.images && selectedCondition.images.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">Image Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCondition.images.map((image, index) => (
                <figure key={index} className="group relative overflow-hidden rounded-lg shadow-md bg-white border border-gray-100">
                  <img
                    src={`http://localhost:4000${image.localPath}`}
                    alt={image.alt || 'Skin condition image'}
                    title={image.title || image.alt || 'Skin condition image'}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  />
                  <figcaption className="p-3 text-sm text-gray-600">
                    {image.title || image.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Right-aligned Table of Contents (TOC) sidebar */}
      <aside className="hidden lg:block fixed right-0 top-0 h-screen w-80 bg-white shadow-xl border-l border-gray-100 p-8 overflow-y-auto z-30">
        <div className="pt-24"> 
          <h2 className="font-bold text-3xl text-blue-800 mb-6">On this page</h2>
          <ul className="space-y-3 text-gray-700">
            {tocSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="font-semibold text-lg hover:text-blue-600 transition-colors duration-200 block py-1"
                >
                  {section.heading}
                </a>
                {section.children.length > 0 && (
                  <ul className="ml-5 mt-2 space-y-2 text-gray-600 border-l-2 border-blue-100 pl-4">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className="hover:text-blue-600 transition-colors duration-200 block py-1"
                        >
                          {child.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
export const Overviewinfo = () => {
  return (
    <section className="p-5 flex flex-col gap-5 bg-[#E9F3F4]">
      <h1 className={' text-4xl font-quicksand font-bold'}>Introduction</h1>
      <h1 className={' text-2xl font-quicksand'}>Understanding Skin Diseases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <MessageCircleQuestion className="h-10 w-10" />
            <CardTitle className="text-2xl font-bold">What is a Skin Disease?</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Skin diseases are a wide range of conditions that affect the skin, including infections, inflammation, allergic reactions, and autoimmune disorders.
            <br />
            <br />
            These conditions may cause rashes, itching, redness, swelling, blisters, or other changes in skin appearance or texture. While some skin diseases are temporary and harmless, others may require long-term treatment or signal
            deeper health issues.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <AlertCircle className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">Why is Skin Health Important?</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Your skin is the largest organ in your body and acts as the first line of defense against pathogens and harmful environmental factors.
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>It regulates body temperature and prevents water loss.</li>
              <li>Healthy skin reflects overall well-being and self-confidence.</li>
              <li>Neglected skin can lead to chronic diseases and infections.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <User className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">Who Can Be Affected?</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Skin diseases can affect anyone regardless of age, gender, or ethnicity.
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <Badge>Infants:</Badge> Conditions like diaper rash and cradle cap.
              </li>
              <li>
                <Badge>Teens:</Badge> Acne due to hormonal changes.
              </li>
              <li>
                <Badge>Adults:</Badge> Eczema, psoriasis, infections, or sun damage.
              </li>
              <li>
                <Badge>Seniors:</Badge> Age-related conditions such as dry skin and skin cancer.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Sun className="w-10 h-10" />
            <CardTitle className="text-2xl font-bold">Most Common Skin Conditions</CardTitle>
          </CardHeader>
          <CardContent className="text-base leading-relaxed text-muted-foreground">
            Millions suffer from various skin conditions every year. The most common include:
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <Badge variant={'destructive'}>Acne:</Badge> Pores clogged with oil and dead skin cells.
              </li>
              <li>
                <Badge variant={'destructive'}>Eczema:</Badge> Itchy and inflamed patches caused by environmental or genetic factors.
              </li>
              <li>
                <Badge variant={'destructive'}>Psoriasis:</Badge> Autoimmune condition that causes thick, scaly skin.
              </li>
              <li>
                <Badge variant={'destructive'}>Rosacea:</Badge> Redness and visible blood vessels often on the face.
              </li>
              <li>
                <Badge variant={'destructive'}>Fungal infections:</Badge> Like athlete’s foot or ringworm, usually due to moisture and bacteria.
              </li>
              <li>
                <Badge variant={'destructive'}>Skin cancer:</Badge> Often due to long-term sun exposure and UV damage.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="p-5">
        <h1></h1>
      </div>
    </section>
  );
};

export const DailySkincareRoutine = () => {
  return (
    <div className="">
      <Card className={' p-6 '}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">🕐 Daily Skincare Routine</CardTitle>
        </CardHeader>

        <CardContent className="text-base leading-relaxed text-muted-foreground space-y-4">
          <section>
            <p>A consistent daily skincare routine helps maintain a clean, hydrated, and balanced skin barrier. It prevents breakouts, early signs of aging, and protects your skin from environmental stress like pollution or UV rays.</p>
          </section>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className={'ring-2 ring-amber-200 '}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-1">
                  <Sun /> Morning Skincare Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-3 space-y-1">
                  <li>
                    <Badge className={'bg-amber-300'}>1</Badge> <strong>Cleanser:</strong> Gently wash your face to remove oil and sweat from sleep.
                  </li>
                  <li>
                    <Badge className={'bg-amber-300'}>2</Badge> <strong>Toner:</strong> Balances your skin's pH and preps it for moisturizers.
                  </li>
                  <li>
                    <Badge className={'bg-amber-300'}>3</Badge> <strong>Moisturizer:</strong> Keeps the skin hydrated and smooth.
                  </li>
                  <li>
                    <Badge className={'bg-amber-300'}>4</Badge> <strong>Sunscreen (SPF 30+):</strong> Essential to protect from UV damage, even indoors.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className={'ring-2 ring-fuchsia-200 '}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-1">
                  <Moon /> Evening Skincare Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-3 space-y-1">
                  <li>
                    <Badge className={'bg-fuchsia-200'}>1</Badge> <strong>Makeup Remover/Cleansing Oil:</strong> Removes makeup and impurities.
                  </li>
                  <li>
                    <Badge className={'bg-fuchsia-200'}>2</Badge> <strong>Gentle Cleanser:</strong> Follow up to deeply clean pores.
                  </li>
                  <li>
                    <Badge className={'bg-fuchsia-200'}>3</Badge> <strong>Night Moisturizer:</strong> Heals and hydrates overnight.
                  </li>
                  <li>
                    <Badge className={'bg-fuchsia-200'}>4</Badge> <strong>Serum or Treatment:</strong> Use products with ingredients like Vitamin C or Retinol based on your skin type.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <section className="bg-cold-3 p-4 rounded-md border border-cold-4 mt-6">
            <h3 className="text-lg font-semibold mb-1">Helpful Habits & Tips</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Clean pillowcases and face towels regularly.</li>
              <li>Avoid touching your face during the day.</li>
              <li>Drink at least 8 glasses of water daily.</li>
              <li>Don’t over-exfoliate – 1–2 times a week is enough.</li>
              <li>Choose products based on your skin type (oily, dry, sensitive, combination).</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const HygieneAdvice = () => {
  return (
    <div className="p-6 mx-auto ">
      <h2 className="text-3xl font-bold mb-4">🧼 Personal Hygiene for Healthy Skin</h2>
      <p className="text-muted-foreground mb-6">Maintaining good hygiene helps prevent bacterial build-up, clogged pores, and inflammation. Here are essential habits to keep your skin clean, balanced, and resilient.</p>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="1">
          <AccordionTrigger>Wash Your Face Twice Daily</AccordionTrigger>
          <AccordionContent>Morning cleansing removes oils and sweat from the night, while evening washing eliminates pollutants, sunscreen, and debris. Use a gentle cleanser tailored to your skin type.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="2">
          <AccordionTrigger>Change Pillowcases and Towels Frequently</AccordionTrigger>
          <AccordionContent>Dirty fabrics accumulate oil, bacteria, and skin cells. Change pillowcases every 2–3 days and towels at least twice a week.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="3">
          <AccordionTrigger>Keep Hands and Nails Clean</AccordionTrigger>
          <AccordionContent>Touching your face with unwashed hands transfers microbes. Regularly clip and clean nails, which often harbor dirt and germs.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="4">
          <AccordionTrigger>Sanitize Personal Tools</AccordionTrigger>
          <AccordionContent>Razors, tweezers, and makeup brushes can introduce bacteria if not cleaned. Sanitize tools weekly to avoid infection or acne breakouts.</AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-10 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h3 className="font-semibold mb-2 text-blue-800">💡 Pro Tip:</h3>
        <p className="text-blue-700">Avoid over-washing your skin — stripping away natural oils can cause dryness and even trigger more oil production.</p>
      </div>
    </div>
  );
};

import { Heart, BedDouble, Droplet, Dumbbell, Utensils, Smile } from 'lucide-react';

const tips = [
  {
    title: 'Hydrate Daily',
    desc: 'Drink at least 2 liters of water daily. Hydration supports cell regeneration and detoxification.',
    icon: <Droplet className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Get Enough Sleep',
    desc: 'Sleep helps repair skin, balances hormones, and reduces puffiness or dullness.',
    icon: <BedDouble className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Exercise Regularly',
    desc: 'Boosts circulation, delivering oxygen to the skin and promoting healthy tone.',
    icon: <Dumbbell className="w-6 h-6 text-green-500" />,
  },
  {
    title: 'Eat a Balanced Diet',
    desc: 'Fruits, vegetables, healthy fats, and lean proteins support your skin from within.',
    icon: <Utensils className="w-6 h-6 text-amber-500" />,
  },
  {
    title: 'Avoid Smoking & Alcohol',
    desc: 'They damage collagen, dry your skin, and promote premature aging.',
    icon: <Heart className="w-6 h-6 text-red-500" />,
  },
  {
    title: 'Manage Stress',
    desc: 'Chronic stress can lead to flare-ups, acne, or eczema. Practice mindfulness and relaxation.',
    icon: <Smile className="w-6 h-6 text-pink-500" />,
  },
];

export const LifestyleChoices = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-4">🌿 Lifestyle Habits for Radiant Skin</h2>
      <p className="text-muted-foreground mb-8">Your daily choices shape your skin’s health. These long-term strategies help prevent flare-ups, irritation, and premature aging — supporting a natural glow.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <Card key={index} className="flex items-start p-4 space-x-4">
            <div className="shrink-0">{tip.icon}</div>
            <CardContent className="p-0">
              <h3 className="font-semibold text-lg mb-1">{tip.title}</h3>
              <p className="text-muted-foreground text-sm">{tip.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 bg-green-50 p-4 rounded-xl border border-green-100">
        <h3 className="font-semibold mb-2 text-green-800">🧠 Mental Note:</h3>
        <p className="text-green-700">Consistency is key — small daily improvements lead to significant long-term changes in your skin’s resilience and clarity.</p>
      </div>
    </div>
  );
};

import { CheckCircle, Shield, Glasses, Clock3 } from 'lucide-react';

const steps = [
  {
    title: 'Apply Sunscreen Daily',
    desc: 'Choose a broad-spectrum SPF 30+ and apply generously to exposed skin — even on overcast days.',
    icon: <Sun className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: 'Reapply Every 2 Hours',
    desc: 'Sunscreen loses its effectiveness over time, especially after sweating or swimming.',
    icon: <Clock3 className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Wear Protective Clothing',
    desc: 'Use wide-brimmed hats, UV-protective sunglasses, and long sleeves when outdoors.',
    icon: <Shield className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Avoid Peak UV Hours',
    desc: 'The sun’s rays are strongest from 10 AM – 4 PM. Seek shade when possible.',
    icon: <Glasses className="w-6 h-6 text-purple-500" />,
  },
];

export const SunProtection = () => {
  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold mb-4">☀️ Sun Protection Essentials</h2>
      <p className="text-muted-foreground mb-6">UV exposure is the #1 cause of premature aging, hyperpigmentation, and skin cancer. Here's how to guard your skin every day.</p>

      <div className="space-y-6 border-l-4 border-yellow-400 pl-9 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-6 top-1">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
            <p className="text-muted-foreground text-sm">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
        <h3 className="font-semibold mb-2 text-yellow-800">⚠️ Did You Know?</h3>
        <p className="text-yellow-700">Even short sun exposure (like walking to class or work) adds up. Make sunscreen a non-negotiable habit!</p>
      </div>
    </div>
  );
};

export const OverTheCounter = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-cold-7">Over-the-Counter (OTC) Treatments for Skin Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base text-muted-foreground">
          <p>
            Over-the-counter (OTC) treatments are non-prescription medications available at pharmacies, drugstores, and online. They’re often the first line of defense for managing common skin conditions like acne, eczema, and fungal
            infections. OTC products vary by active ingredients, purpose, and skin compatibility.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">Acne Treatments</AccordionTrigger>
              <AccordionContent>
                <p>
                  Ingredients like <strong>benzoyl peroxide</strong> (kills acne-causing bacteria), <strong>salicylic acid</strong> (exfoliates pores), and <strong>adapalene</strong> (a retinoid) are commonly used. These are available as
                  cleansers, creams, and gels.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">Eczema Relief</AccordionTrigger>
              <AccordionContent>
                <p>
                  OTC creams containing <strong>colloidal oatmeal</strong>, <strong>ceramides</strong>, or <strong>hydrocortisone</strong> help soothe inflammation, itchiness, and dryness.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">Fungal Infections</AccordionTrigger>
              <AccordionContent>
                <p>
                  <strong>Clotrimazole</strong>, <strong>miconazole</strong>, and <strong>terbinafine</strong> are common antifungal creams for athlete's foot, ringworm, and yeast infections.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-cold-2 p-4 rounded-md border-l-4 border-cold-4">
            <p>
              <strong>Important:</strong> Always read product labels and perform a patch test before trying a new OTC treatment. If symptoms persist, consult a healthcare provider.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Prescription = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-cold-7">Prescription Treatments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-base text-muted-foreground">
          <p>When OTC medications are not effective, doctors may prescribe stronger topical or oral medications. These are tailored to the individual’s condition and health history, and often require careful monitoring.</p>

          <ul className="list-disc list-inside space-y-3">
            <li>
              <strong>Topical Steroids:</strong> For severe eczema or psoriasis, corticosteroids reduce inflammation and redness.
            </li>
            <li>
              <strong>Oral Antibiotics:</strong> Used for infected acne or bacterial skin infections.
            </li>
            <li>
              <strong>Biologics:</strong> Advanced injectable treatments for chronic conditions like psoriasis.
            </li>
            <li>
              <strong>Retinoids:</strong> Prescription-strength retinoids like tretinoin help with acne and aging.
            </li>
            <li>
              <strong>Immunosuppressants:</strong> For autoimmune skin diseases like lupus.
            </li>
          </ul>

          <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
            <p>
              <strong>Note:</strong> Always follow your doctor’s instructions and inform them about side effects. Some prescriptions can interact with other medications or require blood work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const NaturalRemedies = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Leaf className="text-green-500 w-8 h-8" />
          <CardTitle className="text-3xl font-semibold text-green-800">Natural Remedies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base text-muted-foreground">
          <p>Some people prefer natural or home remedies to treat mild skin conditions. While not always scientifically proven, many of these options can offer relief when used safely.</p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li>
              <strong>Aloe Vera:</strong> Soothes burns, sunburn, and irritation.
            </li>
            <li>
              <strong>Tea Tree Oil:</strong> Antiseptic and anti-inflammatory, useful for acne and fungal infections.
            </li>
            <li>
              <strong>Oatmeal Baths:</strong> Calms itchiness and eczema flare-ups.
            </li>
            <li>
              <strong>Coconut Oil:</strong> Moisturizing and has mild antimicrobial properties.
            </li>
          </ul>

          <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-400">
            <p>
              <strong>Caution:</strong> Always do a patch test before using essential oils. Avoid using natural remedies as a substitute for professional care if the condition worsens.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const WhenToSeekHelp = () => {
  return (
    <div className="px-6 py-10 space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Stethoscope className="text-red-500 w-8 h-8" />
          <CardTitle className="text-3xl font-semibold text-red-700">When to Seek Medical Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base text-muted-foreground">
          <p>Not all skin problems can be treated at home. In some cases, it’s crucial to consult a dermatologist or primary care physician.</p>

          <ul className="space-y-3">
            <li>
              <strong>Rapid Spread:</strong> If a rash or infection spreads quickly or is accompanied by fever.
            </li>
            <li>
              <strong>Persistent Symptoms:</strong> When conditions don’t improve with OTC treatment.
            </li>
            <li>
              <strong>Pain or Bleeding:</strong> Open wounds, sores, or moles that bleed or change shape.
            </li>
            <li>
              <strong>Systemic Symptoms:</strong> Such as fatigue, swelling, or joint pain—may indicate underlying issues.
            </li>
          </ul>

          <div className="bg-red-50 p-4 rounded-md border-l-4 border-red-400">
            <p>
              <strong>Reminder:</strong> Early diagnosis can prevent serious complications. Don’t hesitate to seek professional care.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const MythsFact = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Skin Health Myths & Facts</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Myth: Acne only affects teenagers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fact:</strong> While it’s most common during adolescence, many adults continue to experience acne into their 30s, 40s, and beyond. Hormonal changes, stress, and skincare products can all trigger breakouts.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Myth: You don’t need sunscreen on cloudy days</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fact:</strong> UV rays can penetrate clouds and still damage your skin. Daily sunscreen use is crucial for skin health and cancer prevention.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Myth: Tanning clears up acne</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fact:</strong> Tanning can temporarily mask acne but actually worsens it in the long run and increases skin cancer risk.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Myth: Natural remedies are always safe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Fact:</strong> Even natural substances can cause irritation, allergic reactions, or interact with medications. Always consult a dermatologist before trying new treatments.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Faqs = () => {
  const faqs = [
    {
      q: 'What causes acne?',
      a: 'Acne is caused by clogged pores, bacteria, hormonal changes, and excess oil production.',
    },
    {
      q: 'Can skin diseases be cured permanently?',
      a: 'Some can be cured, while others like eczema or psoriasis are managed long-term with treatment.',
    },
    {
      q: 'Is it okay to pop pimples?',
      a: 'It’s best to avoid popping pimples as it can lead to scarring and infection.',
    },
    {
      q: 'What is the best sunscreen to use?',
      a: 'Look for a broad-spectrum sunscreen with at least SPF 30. Reapply every 2 hours if outdoors.',
    },
  ];
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="p-4 border rounded-md bg-white shadow">
            <summary className="cursor-pointer text-lg font-semibold text-accent-foreground">{faq.q}</summary>
            <p className="mt-2 text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export const ResourcesReferences = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-primary">Resources & References</h1>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <a className="text-blue-600 underline" href="https://www.aad.org/" target="_blank">
            American Academy of Dermatology (aad.org)
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="https://www.skincancer.org/" target="_blank">
            Skin Cancer Foundation
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank">
            PubMed Central (PMC) – Dermatology Studies
          </a>
        </li>
        <li>
          <a className="text-blue-600 underline" href="https://www.who.int/news-room/fact-sheets/detail/skin-diseases" target="_blank">
            World Health Organization – Skin Disease Facts
          </a>
        </li>
      </ul>
    </div>
  );
};

export const AskDermatologist = () => {
  return (
    <div className="p-6 space-y-8  ">
      <h1 className="text-4xl font-bold text-primary">Contact / Ask a Dermatologist</h1>
      <p className="text-muted-foreground">Have questions about your skin health? Fill out the form below and our dermatology expert will respond within 24–48 hours.</p>
      <form className="space-y-4">
        <div>
          <label className="block font-medium" htmlFor="name">
            Full Name
          </label>
          <input id="name" type="text" className="w-full border rounded p-2" placeholder="John Doe" />
        </div>
        <div>
          <label className="block font-medium" htmlFor="email">
            Email Address
          </label>
          <input id="email" type="email" className="w-full border rounded p-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block font-medium" htmlFor="question">
            Your Question
          </label>
          <textarea id="question" rows={5} className="w-full border rounded p-2" placeholder="Describe your concern in detail..." />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};
