
import { DashedLine } from "../dashed-line";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    emoji: "🏦",
    title: "Otomasi Rekonsiliasi Bank",
    description:
      "Proses rekonsiliasi bank yang dulunya memakan waktu berhari-hari kini selesai dalam hitungan menit. Sistem kami otomatis mencocokkan transaksi, mendeteksi selisih, dan menghasilkan laporan siap audit.",
    result: "Hemat 90% waktu kerja",
    tags: ["Python", "n8n", "Spreadsheet"],
  },
  {
    emoji: "💬",
    title: "WhatsApp AI Chatbot",
    description:
      "Chatbot cerdas yang terintegrasi langsung dengan WhatsApp Business. Mampu menjawab pertanyaan pelanggan, memproses pesanan, dan mengarahkan leads ke tim sales — 24 jam non-stop.",
    result: "Respon pelanggan 24/7",
    tags: ["OpenAI", "WhatsApp API", "n8n"],
  },
  {
    emoji: "🎯",
    title: "Lead Generation & Enrichment",
    description:
      "Otomasi pencarian prospek dari berbagai sumber, pengkayaan data kontak, dan scoring leads secara otomatis. Tim sales Anda hanya perlu fokus pada leads yang sudah berkualitas.",
    result: "Pipeline terisi otomatis",
    tags: ["AI", "n8n", "CRM"],
  },
  {
    emoji: "⚙️",
    title: "Odoo + n8n Integration",
    description:
      "Integrasi end-to-end antara Odoo ERP dan n8n untuk mengotomasi proses Sales, HR, Invoicing, dan Finance. Data mengalir tanpa campur tangan manual dari satu departemen ke departemen lain.",
    result: "Operasional terhubung end-to-end",
    tags: ["Odoo", "n8n", "Automation"],
  },
  {
    emoji: "🚀",
    title: "Custom Automation Workflows",
    description:
      "Berbagai workflow automation yang disesuaikan dengan kebutuhan spesifik bisnis. Dari notifikasi otomatis, pembuatan laporan, hingga integrasi antar-aplikasi yang kompleks.",
    result: "Efisiensi operasional 10x",
    tags: ["n8n", "API", "Custom"],
  },
];

export const Testimonials = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Hasil Nyata, Bukan Janji
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              Setiap solusi yang kami bangun dirancang untuk memberikan dampak
              terukur. Berikut beberapa project yang sudah kami selesaikan.
            </p>
          </div>

          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {caseStudies.map((study, index) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="flex h-[120px] items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 lg:h-[140px]">
                          <span className="text-6xl">{study.emoji}</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                          <div className="space-y-3">
                            <h3 className="font-display text-lg leading-tight font-bold md:text-xl">
                              {study.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {study.description}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
                              <span className="text-primary text-sm font-semibold">
                                📊 {study.result}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {study.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-muted-foreground rounded-md border px-2 py-0.5 text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
