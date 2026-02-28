import type { APIRoute } from "astro";
import { readdir } from "fs/promises";
import { writeFile } from "fs/promises";
import { join } from "path";

const RESOURCES_DIR = join(process.cwd(), "public", "resources");
const ADMIN_TOKEN = import.meta.env.PUBLIC_ADMIN_TOKEN;

// GET — list all files in /public/resources/
export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("admin");

  if (!token || token !== ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const files = await readdir(RESOURCES_DIR);
    const pdfFiles = files.filter((f) => f.endsWith(".pdf"));

    const fileDetails = await Promise.all(
      pdfFiles.map(async (filename) => {
        const { stat } = await import("fs/promises");
        const stats = await stat(join(RESOURCES_DIR, filename));
        return {
          filename,
          url: `/resources/${filename}`,
          sizeKB: Math.round(stats.size / 1024),
          uploadedAt: stats.mtime.toISOString(),
        };
      })
    );

    return new Response(JSON.stringify({ files: fileDetails }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to read directory" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// POST — upload new PDF file
export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("admin");

  if (!token || token !== ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!file.name.endsWith(".pdf")) {
      return new Response(
        JSON.stringify({ error: "Only PDF files are allowed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Max 20MB
    if (file.size > 20 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "File too large (max 20MB)" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const savePath = join(RESOURCES_DIR, file.name);
    await writeFile(savePath, buffer);

    return new Response(
      JSON.stringify({ success: true, filename: file.name }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const prerender = false;
