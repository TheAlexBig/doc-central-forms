# Central Docs Web

React application for generating legal documents through guided forms. The
first template is the Salvadoran vehicle purchase-and-sale document with
notarial authentication.

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
`POST /api/v1/documents/car-sale` and downloading `compra-venta.docx`.

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

## Desktop Distribution

Production builds use relative `/api` URLs so the compiled React interface can
be served by the Spring Boot desktop application without an internet
connection. The Windows installer build is orchestrated from the backend
repository and embeds this application's `dist` output inside the executable
application package.
