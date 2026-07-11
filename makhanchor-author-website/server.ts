/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { BLOG_POSTS } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Contact / Letters Route
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    try {
      const lettersFile = path.resolve(process.cwd(), "letters.json");
      let letters: any[] = [];
      
      if (fs.existsSync(lettersFile)) {
        const fileContent = fs.readFileSync(lettersFile, "utf-8");
        try {
          letters = JSON.parse(fileContent || "[]");
        } catch (parseErr) {
          letters = [];
        }
      }

      letters.push({
        name,
        email: email.toLowerCase(),
        message,
        sentAt: new Date().toISOString()
      });
      
      fs.writeFileSync(lettersFile, JSON.stringify(letters, null, 2), "utf-8");

      return res.status(200).json({ status: "success", message: "Letter sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // API Admin Letters Route
  app.get("/api/admin/letters", (req, res) => {
    try {
      const lettersFile = path.resolve(process.cwd(), "letters.json");
      if (fs.existsSync(lettersFile)) {
        const fileContent = fs.readFileSync(lettersFile, "utf-8");
        return res.json(JSON.parse(fileContent || "[]"));
      }
      return res.json([]);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch letters" });
    }
  });

  // API Guestbook (Public/Anonymous) Route
  app.get("/api/guestbook", (req, res) => {
    try {
      const lettersFile = path.resolve(process.cwd(), "letters.json");
      let letters: any[] = [];
      
      if (fs.existsSync(lettersFile)) {
        const fileContent = fs.readFileSync(lettersFile, "utf-8");
        try {
          letters = JSON.parse(fileContent || "[]");
        } catch (err) {
          letters = [];
        }
      }

      // Default soulful starter guestbook notes
      const starterNotes = [
        {
          name: "Ananya S.",
          message: "The poem about the wet raincoat pocket made me weep. It perfectly captures how we carry unrequited love like a secret weight, hoping it never dries.",
          sentAt: "2026-07-08T22:15:00.000Z"
        },
        {
          name: "Kabir",
          message: "Makhanchor's prose reads like a slow, bittersweet song. 'Loss is a silent companion' is a phrase that will live in my notebook forever.",
          sentAt: "2026-07-09T01:40:00.000Z"
        },
        {
          name: "Meera Nair",
          message: "Just finished reading the three-page excerpt. The transition from grieving to finding sunrise on pebbles is breathtaking. Ordered my physical copy immediately!",
          sentAt: "2026-07-09T18:05:00.000Z"
        },
        {
          name: "Aarav",
          message: "To love, to lose, and to live again... Yogesh has bottled the exact aroma of midnight thoughts and unread letters in this gorgeous novel.",
          sentAt: "2026-07-10T04:12:00.000Z"
        }
      ];

      // Map real guestbook submissions to anonymous, safe structures
      const userNotes = letters.map(l => ({
        name: l.name || "Anonymous",
        message: l.message,
        sentAt: l.sentAt || new Date().toISOString()
      }));

      // Combine user submissions first, then starter notes
      const combined = [...userNotes, ...starterNotes];
      return res.json(combined);
    } catch (error) {
      return res.status(500).json({ error: "Failed to load guestbook" });
    }
  });

  // API Subscribe Route
  app.post("/api/subscribe", (req, res) => {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      const subscribersFile = path.resolve(process.cwd(), "subscribers.json");
      let subscribers: any[] = [];
      
      if (fs.existsSync(subscribersFile)) {
        const fileContent = fs.readFileSync(subscribersFile, "utf-8");
        try {
          subscribers = JSON.parse(fileContent || "[]");
        } catch (parseErr) {
          subscribers = [];
        }
      }

      // Check if already exists
      const exists = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
      if (!exists) {
        subscribers.push({
          email: email.toLowerCase(),
          name: name || "",
          subscribedAt: new Date().toISOString()
        });
        fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2), "utf-8");
      }

      return res.status(200).json({ status: "success", message: "Subscribed successfully" });
    } catch (error) {
      console.error("Subscription error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // API Admin Subscribers Route
  app.get("/api/admin/subscribers", (req, res) => {
    try {
      const subscribersFile = path.resolve(process.cwd(), "subscribers.json");
      if (fs.existsSync(subscribersFile)) {
        const fileContent = fs.readFileSync(subscribersFile, "utf-8");
        return res.json(JSON.parse(fileContent || "[]"));
      }
      return res.json([]);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  let vite: any;
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    // Integrate Vite in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Handle HTML rendering ourselves for dynamic SEO
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false })); // Let the wildcard route handle index.html
  }

  // Intercept HTML/SEO requests
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip assets or API routes
    if (url.includes(".") && !url.startsWith("/blog/")) {
      return next();
    }

    try {
      let template: string;

      if (!isProd) {
        const templatePath = path.resolve(process.cwd(), "index.html");
        template = fs.readFileSync(templatePath, "utf-8");
        // Apply Vite HTML transformations
        template = await vite.transformIndexHtml(url, template);
      } else {
        const templatePath = path.resolve(process.cwd(), "dist", "index.html");
        template = fs.readFileSync(templatePath, "utf-8");
      }

      let html = template;

      // Inject SEO Meta tags depending on path
      if (url.startsWith("/blog/")) {
        const slug = url.split("/blog/")[1]?.split("?")[0]?.split("#")[0];
        if (slug) {
          const blog = BLOG_POSTS.find((b) => b.slug === slug);
          if (blog) {
            html = injectBlogMeta(html, blog);
          }
        }
      } else if (url === "/blog" || url.startsWith("/blog?")) {
        html = injectPageMeta(
          html,
          "Midnight Whispers Blog | Makhanchor",
          "Read the latest essays, poetry, and stories on unrequited love, midnight loneliness, and healing by Makhanchor (Yogesh Bhavsar).",
          "https://www.makhanchor.in/blog"
        );
      } else if (url === "/about" || url.startsWith("/about?")) {
        html = injectPageMeta(
          html,
          "About the Author | Makhanchor",
          "Meet Yogesh Bhavsar (Makhanchor), a poet and novelist writing novels and words to map the silent architecture of the human heart, unrequited love, and emotional healing.",
          "https://www.makhanchor.in/about"
        );
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

function replaceMetaTags(html: string, title: string, description: string, url: string, image?: string, type = "website"): string {
  let result = html;
  
  // Replace Title
  result = result.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace standard description
  result = result.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${description}" />`);

  // Replace Open Graph metadata
  result = result.replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${title}" />`);
  result = result.replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${description}" />`);
  if (image) {
    result = result.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${image}" />`);
  }
  result = result.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${url}" />`);
  result = result.replace(/<meta property="og:type" content=".*?"\s*\/?>/g, `<meta property="og:type" content="${type}" />`);

  // Replace Twitter Card metadata
  result = result.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${title}" />`);
  result = result.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${description}" />`);
  if (image) {
    result = result.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/g, `<meta name="twitter:image" content="${image}" />`);
  }
  result = result.replace(/<meta name="twitter:url" content=".*?"\s*\/?>/g, `<meta name="twitter:url" content="${url}" />`);

  return result;
}

function injectBlogMeta(html: string, blog: any): string {
  const displayTitle = `${blog.title} | Blog by Makhanchor`;
  const displayDesc = blog.excerpt || blog.subtitle;
  const displayImage = blog.imageUrl;
  const currentUrl = `https://www.makhanchor.in/blog/${blog.slug}`;
  return replaceMetaTags(html, displayTitle, displayDesc, currentUrl, displayImage, "article");
}

function injectPageMeta(html: string, title: string, description: string, url: string): string {
  const defaultImage = "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&h=630&q=80";
  return replaceMetaTags(html, title, description, url, defaultImage, "website");
}

startServer();
