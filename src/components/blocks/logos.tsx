

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

        <div className="flex w-full flex-col items-center gap-8">
          {/* Top row - 5 logos */}
          <LogoRow companies={topRowCompanies} gridClassName="grid-cols-5" />

          {/* Bottom row - 6 logos */}
          <LogoRow
            companies={bottomRowCompanies}
            gridClassName="grid-cols-6"
            direction="right"
          />
        </div>
      </div>
    </section>
  );
};

type LogoRowProps = {
  companies: Company[];
  gridClassName: string;
  direction?: "left" | "right";
};

const LogoRow = ({ companies, gridClassName, direction }: LogoRowProps) => {
  return (
    <>
      {/* Desktop static version */}
      <div className="hidden md:block">
        <div
          className={cn(
            "grid items-center justify-items-center gap-x-20 lg:gap-x-28",
            gridClassName,
          )}
        >
          {companies.map((company, index) => (
            <a href={company.href} target="_blank" key={index} title={company.name}>
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="object-contain transition-opacity hover:opacity-70"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile CSS marquee version */}
      <div className="md:hidden overflow-hidden">
        <div
          className={cn(
            "flex gap-12 w-max",
            direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
          )}
        >
          {[...companies, ...companies].map((company, index) => (
            <a
              href={company.href}
              target="_blank"
              key={index}
              className="mx-4 inline-block transition-opacity hover:opacity-70 flex-shrink-0"
              title={company.name}
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
    </>
  );
};
