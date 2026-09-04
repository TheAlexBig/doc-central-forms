# Central Docs Web

React application for generating Salvadoran legal documents through guided
forms. It supports vehicle purchase-and-sale agreements and simple mutual
agreements with notarial authentication.

Central Docs is licensed under the [Apache License 2.0](LICENSE). See the
[privacy policy](PRIVACY.md), [security policy](SECURITY.md), and
[code signing policy](CODE_SIGNING_POLICY.md).

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
`POST /api/v1/documents/car-sale/history` and downloading Word or PDF.

The browser interface sends form data only to the configured Central Docs API.
In the packaged desktop application that API runs locally and stores selected
people, vehicles, agents, document history, and generated documents on the
user's computer as described in the privacy policy.

The workflow's **Configuración** tab also includes saved-person management,
portable backup and restore, validated legal-template editing, and an explicit
online update check. Routine document creation remains fully offline.
The form is automatically saved in the local browser profile, and document
history provides date and text filters. A sanitized support package can be
downloaded from the diagnostics section without including customer documents
or license files.

Global navigation separates the document catalog (`/`), history
(`/historial`), and configuration (`/configuracion`) from individual document
workflows. The car-sale workflow only contains its guided form. Its legal text
editor represents the generated document as an ordered list of editable
template blocks rather than a single template selector.
The block editor provides insertable variable controls, live missing-variable
validation, a monospaced editing surface, and a highlighted preview.

## Mutual Agreement Flow

The `/mutuo` wizard gathers the preparer, responsible notary, debtor, creditor,
principal, term, installments, payment account, optional interest, optional
bill-of-exchange guarantee, jurisdiction, signing place, and authentication
details. Department, municipality, and district use the same dependent
territorial selectors as the vehicle-sale workflow.

The workflow prevents the same normalized DUI from being used for debtor and
creditor. It maintains an independent local autosave, restores saved drafts,
uses the same sectioned and editable review as vehicle sales, and generates
Word or PDF through `POST /api/v1/documents/mutual/history`.

Both document types appear in the global `/historial` table. Mutual agreements
can be searched by party, DUI, bank, account, notary, or preparer. Opening a
history row restores its draft at the corresponding workflow route.

## Tests

```bash
npm test -- --run
npm run lint
npm run build
```

Payload conversion, workflow rules, history presentation, and independent
draft storage have automated Vitest coverage.

## Desktop Distribution

Production builds use relative `/api` URLs so the compiled React interface can
be served by the Spring Boot desktop application without an internet
connection. The Windows installer build is orchestrated from the backend
repository and embeds this application's `dist` output inside the executable
application package.
