"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Download,
  FileText,
  BookOpen,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resourceFormSchema } from "@/lib/resource-form-schema";

type Schema = z.infer<typeof resourceFormSchema>;

// ============================================================
// Resource Data — tambahkan file PDF kamu di /public/resources/
// ============================================================
const resources = [
  {
    title: "Panduan Automasi Bisnis untuk Pemula",
    description:
      "Pelajari 5 langkah praktis untuk mulai mengotomasi proses bisnis Anda hari ini.",
    icon: BookOpen,
    file: "/resources/panduan-automasi-bisnis.pdf",
    tag: "PDF Guide",
  },
  {
    title: "Checklist: Apakah Bisnis Anda Siap untuk AI?",
    description:
      "10 pertanyaan kunci untuk menilai kesiapan bisnis Anda dalam mengadopsi AI.",
    icon: FileText,
    file: "/resources/checklist-ai-readiness.pdf",
    tag: "Checklist",
  },
  {
    title: "Studi Kasus: Hemat 90% Waktu Rekonsiliasi Bank",
    description:
      "Bagaimana automasi mengubah proses rekonsiliasi dari berhari-hari menjadi hitungan menit.",
    icon: Zap,
    file: "/resources/studi-kasus-rekonsiliasi.pdf",
    tag: "Case Study",
  },
];

// ============================================================
// Main Component
// ============================================================
export function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section className="py-28 lg:pt-44 lg:pb-32">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center">
          <span className="text-primary font-mono text-sm font-medium tracking-wider uppercase">
            Free Resources
          </span>
          <h1 className="text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Belajar Automasi Gratis
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
            Download panduan, checklist, dan studi kasus dari project nyata.
            Cukup isi form singkat di bawah untuk mengakses semua resource.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LeadForm onSuccess={() => setIsUnlocked(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ResourceGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================
// Lead Capture Form
// ============================================================
function LeadForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<Schema>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      type: undefined,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    setIsSubmitting(true);

    try {
      // ⬇️ GANTI URL ini dengan n8n webhook URL kamu
      // Contoh: https://your-n8n.com/webhook/resources-lead
      const WEBHOOK_URL = "";

      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            source: "resources-page",
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch {
      // Tetap unlock resources meskipun webhook gagal
      console.warn("Webhook failed, but unlocking resources anyway");
    }

    // Simpan ke localStorage agar tidak perlu isi ulang
    localStorage.setItem("seriaflow_lead", JSON.stringify(data));
    setIsSubmitting(false);
    onSuccess();
  });

  return (
    <Card className="mx-auto max-w-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-bold">🔓 Unlock Free Resources</h2>
          <p className="text-muted-foreground text-sm">
            Isi form singkat ini untuk mengakses semua resource gratis kami.
            Data Anda aman dan tidak akan di-spam.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nama lengkap Anda"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="email@perusahaan.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp (opsional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="08xxxxxxxxxx"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anda seorang... *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih yang sesuai" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="company">
                        Pemilik / Karyawan Perusahaan
                      </SelectItem>
                      <SelectItem value="freelancer">
                        Freelancer / Konsultan
                      </SelectItem>
                      <SelectItem value="student">
                        Mahasiswa / Pelajar
                      </SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Membuka akses..."
              ) : (
                <>
                  Akses Resources Gratis
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// ============================================================
// Resource Grid (shown after form submit)
// ============================================================
function ResourceGrid() {
  return (
    <div className="space-y-8">
      {/* Success banner */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="flex items-center justify-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-6 py-4"
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20">
          <Check className="size-5 text-green-500" />
        </div>
        <p className="font-medium text-green-700 dark:text-green-400">
          Akses terbuka! Download semua resource di bawah ini.
        </p>
      </motion.div>

      {/* Resource cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="group h-full transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {resource.tag}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    asChild
                  >
                    <a
                      href={resource.file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="size-4" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-muted-foreground mt-8 text-center text-sm">
        <p>
          Butuh solusi yang lebih spesifik?{" "}
          <a
            href="/contact"
            className="text-primary font-medium underline underline-offset-4"
          >
            Konsultasi gratis dengan kami
          </a>
        </p>
      </div>
    </div>
  );
}
