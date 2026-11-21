# Content Hub

A premium-content application with article and video catalogs, access quotas,
membership plans, upgrades, payment instructions and payment-status simulation.
The existing PostgreSQL/Neon database and Google/Facebook authentication
integrations are retained for further development and have not been replaced
with mocks.

## Stack and setup

Use Node.js 22 or newer and pnpm 9.15.4. The application uses Next.js 14, React,
TypeScript, Tailwind CSS, shadcn/ui, the Neon serverless PostgreSQL driver,
bcrypt password hashing and JWT sessions through jose.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Database-backed pages require an isolated development
PostgreSQL database configured through `DATABASE_URL`. Authentication requires a
privately supplied `JWT_SECRET` of at least 32 characters. No secret or environment
file is included in this source edition.

Google sign-in uses `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and
`GOOGLE_CLIENT_ID` where referenced by server routes. Facebook sign-in uses
`NEXT_PUBLIC_FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`.
`NEXTAUTH_URL` is the existing optional server callback-base setting.
Configure provider callbacks for your own development application. Do not place
provider credentials or production records inside source archives.

Apply the schema scripts under `scripts/` to a development database only. The
seed script uses reserved `example.com` addresses, Demo Editor/Demo Member
identities and fictional content. It does not include passwords or existing
customer accounts. The thumbnail illustrations are generic vector fixtures.

## Checks

```sh
pnpm lint
pnpm build
```

There is no existing standalone unit suite in this snapshot. Full application,
build and authentication checks require configured development services.
The payment-status endpoint remains a simulator for development; it is not a
production payment gateway. Generated payment codes are synthetic and do not
route payments to real accounts.

## License

MIT. Required third-party notices are preserved in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
