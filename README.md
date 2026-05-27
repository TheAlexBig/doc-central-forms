# Central Docs Web

React application for generating legal documents through guided forms. The
first template is the Salvadoran vehicle purchase-and-sale document with
notarial authentication.

## Run Locally

```bash
npm install
npm start
```

The web application is built with Vite and requires Node.js 18 or newer.

The application expects the Central Docs API at `http://localhost:8080` by
default. Override it with:

```bash
VITE_API_URL=https://api.example.com npm run build
```

## Vehicle Sale Flow

The `/compra-venta` wizard gathers the notary, buyer, vehicle, seller, and
signing details. The last screen provides a review before calling
`POST /api/v1/documents/car-sale` and downloading `compra-venta.docx`.

Central Docs does not store submitted personal data in this application.
