

import { cn } from "@/lib/utils";


type Company = {
  name: string;
  logo: string;
  width: number;
  height: number;
  href: string;
};

export const Logos = () => {
  const topRowCompanies = [
    {
      name: "n8n",
      logo: "/logos/n8n.svg",
      width: 100,
      height: 100,
      href: "https://n8n.io",
    },
    {
      name: "Odoo",
      logo: "/logos/odoo.svg",
      width: 100,
      height: 100,
      href: "https://odoo.com",
    },
    {
      name: "OpenAI",
      logo: "/logos/openai.svg",
      width: 130,
      height: 130,
      href: "https://openai.com",
    },
    {
      name: "WhatsApp",
      logo: "/logos/whatsapp.svg",
      width: 60,
      height: 60,
      href: "https://business.whatsapp.com",
    },
    {
      name: "Salesforce",
      logo: "/logos/salesforce.svg",
      width: 80,
      height: 80,
      href: "https://salesforce.com",
    },
  ];

  const bottomRowCompanies = [
    {
      name: "Slack",
      logo: "/logos/slack.svg",
      width: 80,
      height: 80,
      href: "https://slack.com",
    },
    {
      name: "Next.js",
      logo: "/logos/nextjs.svg",
      width: 80,
      height: 80,
      href: "https://nextjs.org",
    },
    {
      name: "DigitalOcean",
      logo: "/logos/digitalocean.svg",
      width: 80,
      height: 80,
      href: "https://digitalocean.com",
    },
    {
      name: "Scikit-learn",
      logo: "/logos/scikitlearn.svg",
      width: 80,
      height: 80,
      href: "https://scikit-learn.org",
    },
    {
      name: "Google Sheets",
      logo: "/logos/googlesheets.svg",
      width: 80,
      height: 80,
      href: "https://sheets.google.com",
    },
    {
      name: "Gemini",
      logo: "/logos/gemini.svg",
      width: 80,
      height: 80,
      href: "https://deepmind.google/technologies/gemini/",
    },
  ];

  const allCompanies = [...topRowCompanies, ...bottomRowCompanies];
  const firstRow = allCompanies.slice(0, 6);
  const secondRow = allCompanies.slice(6);

  return (
    <section className="pb-28 lg:pb-32 overflow-hidden">
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            Didukung oleh Teknologi Terdepan.
            <br className="max-md:hidden" />
            <span className="text-muted-foreground">
              Tools enterprise-grade untuk hasil yang maksimal.
            </span>
          </h2>
        </div>

        {/* Desktop: animated marquee (scrolling left and right) */}
        <div className="hidden md:block">
          <div className="relative overflow-hidden w-full max-w-[100vw]">
            <div className="flex flex-col gap-18 items-center">
              {/* First row - scrolling left */}
              <div className="flex w-max animate-marquee gap-20 pr-20">
                {[...firstRow, ...firstRow].map((company, i) => (
                  <a
                    href={company.href}
                    target="_blank"
                    key={i}
                    title={company.name}
                    className="dark:bg-[#D3D3D3] grid aspect-square size-16 flex-shrink-0 place-items-center rounded-2xl p-2 transition-opacity hover:opacity-70 lg:size-20"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={company.width}
                      height={company.height}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
              {/* Second row - scrolling right */}
              <div className="flex w-max animate-marquee-reverse gap-20 pr-20">
                {[...secondRow, ...secondRow].map((company, i) => (
                  <a
                    href={company.href}
                    target="_blank"
                    key={i}
                    title={company.name}
                    className="dark:bg-[#D3D3D3] grid aspect-square size-16 flex-shrink-0 place-items-center rounded-2xl p-2 transition-opacity hover:opacity-70 lg:size-20"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={company.width}
                      height={company.height}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
            {/* Gradient fades removed as requested */}
          </div>
        </div>

        {/* Mobile: marquee */}
        <div className="md:hidden overflow-hidden">
          <div className="flex flex-col gap-6">
            <div className="flex w-max animate-marquee gap-8 pr-8">
              {[...firstRow, ...firstRow].map((company, index) => (
                <a
                  href={company.href}
                  target="_blank"
                  key={index}
                  title={company.name}
                  className="dark:bg-[#D3D3D3] grid aspect-square size-16 flex-shrink-0 place-items-center rounded-2xl p-2"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={company.width}
                    height={company.height}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
            <div className="flex w-max animate-marquee-reverse gap-8 pr-8">
              {[...secondRow, ...secondRow].map((company, index) => (
                <a
                  href={company.href}
                  target="_blank"
                  key={index}
                  title={company.name}
                  className="dark:bg-[#D3D3D3] grid aspect-square size-16 flex-shrink-0 place-items-center rounded-2xl p-2"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={company.width}
                    height={company.height}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
