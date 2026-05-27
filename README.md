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

During development, Vite proxies `/api` calls to the Central Docs API at
`http://127.0.0.1:8080`. Override it only when using a different API:

```bash
VITE_API_URL=http://127.0.0.1:8090 npm start
```

## Vehicle Sale Flow

The `/compra-venta` wizard gathers the notary, buyer, vehicle, seller, and
signing details. The last screen provides a review before calling
`POST /api/v1/documents/car-sale` and downloading `compra-venta.docx`.

Central Docs does not store submitted personal data in this application.

## Desktop Distribution

Production builds use relative `/api` URLs so the compiled React interface can
be served by the Spring Boot desktop application without an internet
connection. The Windows installer build is orchestrated from the backend
repository and embeds this application's `dist` output inside the executable
application package.
