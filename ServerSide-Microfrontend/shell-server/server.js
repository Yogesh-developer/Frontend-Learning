import express from "express";

const app = express();

app.get("/", async (req, res) => {
  try {
    // ⚡ Fetch all 3 microfrontends in parallel
    const [headerRes, productsRes, cartRes] = await Promise.all([
      fetch("http://localhost:4001"),
      fetch("http://localhost:4002"),
      fetch("http://localhost:4003"),
    ]);

    const [headerHtml, productsHtml, cartHtml] = await Promise.all([
      headerRes.text(),
      productsRes.text(),
      cartRes.text(),
    ]);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Modern Store</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <!-- Microfrontend Stylesheets -->
          <link rel="stylesheet" href="http://localhost:4001/header.css" />
          <link rel="stylesheet" href="http://localhost:4002/product.css" />
          <link rel="stylesheet" href="http://localhost:4003/cart.css" />
        </head>

        <body style="margin: 0; font-family: system-ui, sans-serif; background: #f9fafb;">
          ${headerHtml}

          <main style="display: flex; gap: 32px; padding: 32px; max-width: 1400px; margin: 0 auto; align-items: flex-start;">
            <div style="flex: 1;">
              ${productsHtml}
            </div>
            <div style="width: 420px; position: sticky; top: 20px;">
              ${cartHtml}
            </div>
          </main>

          <!-- Microfrontend Client-Side Hydration -->
          <script type="module" src="http://localhost:4001/client.js"></script>
          <script type="module" src="http://localhost:4002/client.js"></script>
          <script type="module" src="http://localhost:4003/client.js"></script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Error assembling microfrontends: ${error.message}`);
  }
});

app.listen(4000, () => {
  console.log("Shell server running on http://localhost:4000");
});
