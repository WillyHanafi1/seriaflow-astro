import type { APIRoute } from "astro";
import { unlink } from "fs/promises";
import { join } from "path";

const RESOURCES_DIR = join(process.cwd(), "public", "resources");
const ADMIN_TOKEN = import.meta.env.PUBLIC_ADMIN_TOKEN;

// DELETE — remove a file by filename
export const DELETE: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("admin");

  if (!token || token !== ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const filename = params.filename;

  if (!filename || !filename.endsWith(".pdf")) {
    return new Response(JSON.stringify({ error: "Invalid filename" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Security: prevent path traversal attacks
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return new Response(JSON.stringify({ error: "Invalid filename" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const filePath = join(RESOURCES_DIR, filename);
    await unlink(filePath);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "File not found or delete failed" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const prerender = false;
