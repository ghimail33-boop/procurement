# Supabase setup

The browser app uses Supabase Auth and the publishable key only. It does not use
or contain a database password or a Supabase secret/service-role key.

## 1. Configure the app

For local development, copy `.env.example` to `.env.local` and set:

- `VITE_SUPABASE_URL` to the project URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key.

For Vercel, import `vitamindipak-cyber/procurement` into the `vitamindipak`
team and add those values to the project's Environment Variables as
`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Redeploy after
changing them. The publishable key is public client configuration; the database
password and Supabase secret/service-role key are not.

Never place a Supabase secret key or database connection string in a `VITE_*`
variable, frontend file, or deployment artifact.

## 2. Create the schema and access policies

With the Supabase CLI installed and authenticated, link this repository to the
project and apply the migration:

```powershell
supabase login
supabase link --project-ref umjwglcybhwjfkoththh
supabase db push
```

The migration creates `user_profiles` and `procurement_projects`, plus
row-level security policies. Each user can read and update only their own
projects; admins can read and manage all projects. Deleted users' project rows
are retained as unassigned records that only admins can access. Existing
browser/localStorage records are intentionally not imported.

## 3. Create the initial admin

In Supabase Dashboard → **Authentication → Users**, create a confirmed user:

- Email: `admin@accounts.procurement-guide.example`
- Password: choose a new strong password

Then run this once in **SQL Editor** to grant the admin role:

```sql
update public.user_profiles
set role = 'admin'
where username = 'admin';
```

The app login maps username `admin` to
`admin@accounts.procurement-guide.example`. Do not reuse
the old demo password.

The app does not provision an `admin` account or the old `admin123` password
automatically. Use the password assigned in Supabase Dashboard. The login form
accepts either the username or the account's exact email address, so an admin
created with a real email in the Dashboard can sign in with that email.

## 4. Deploy username login and admin user management

Deploy the `manage-users` Edge Function. Username login uses the function to
resolve the profile's linked Auth account without exposing email addresses.
All user-management actions still require the caller's authenticated session
and admin role. The function uses the server-side `SUPABASE_SERVICE_ROLE_KEY`
for account lookup and Supabase Auth Admin API operations. Supabase provides
this variable to Edge Functions. If it is not present for the project, set it
as an Edge Function secret from Supabase Dashboard → **Edge Functions → Secrets**.
Never expose this key to the frontend.

```powershell
supabase functions deploy manage-users
```

The function's JWT verification is disabled so it can accept a username login
before a session exists. Its login action authenticates the supplied password
through Supabase Auth and returns only the resulting authenticated session.
Every user-management action independently verifies the caller's session and
database role. Only admins can create, edit, promote/demote, or delete accounts.
The user list is read through the database's admin-only row-level security
policy. New users are confirmed immediately and can log in using their username
and the password assigned by the admin. Passwords are managed by Supabase Auth,
never stored in the application profile table.

These app-managed accounts use the reserved `.example` email domain and are
auto-confirmed, so this workflow does not send verification emails. To deliver
verification messages, configure Supabase Auth SMTP and implement accounts with
real email addresses; do not use the placeholder `.example` address for email
verification.

## 6. Enable the source-grounded Gemini procurement chatbot

The chatbot retrieves relevant local Act/Rules, SBD/DBD, PPMO opinion, PPRC
decision, and app content in the browser. It sends the current question, up to
six recent chat turns, and up to five retrieved excerpts to the authenticated
`procurement-chat` Edge Function. That function validates the Supabase user
session and calls Google's Gemini 3.8 Flash API. On temporary server overload,
it retries once with a short backoff, then tries Gemini 3.6 Flash with one
retry. The browser never receives the Gemini key. The chatbot UI discloses this
data flow to users.

Create a Gemini API key in Google AI Studio, then add it as an Edge Function
secret in Supabase Dashboard → **Edge Functions → Secrets** using the name
`GEMINI_API_KEY`. Do not put it in `.env.local`, a `VITE_*` variable, source
code, or a chat message. Supabase supplies `SUPABASE_URL` and
`SUPABASE_ANON_KEY` to the Edge Function; no service-role key is needed by this
function.

Deploy the function after linking the repository to the intended Supabase
project:

```powershell
supabase functions deploy procurement-chat
```

The function accepts authenticated POST requests only, bounds request and
context size, returns bounded upstream diagnostics, and does not log question
text, source excerpts, or API key values. Google processes the submitted prompt under
the Gemini API terms and data settings for the key's project.

If the chatbot displays a Gemini 400/404 error after deployment, the response
now includes Google's short error explanation so the model/request configuration
can be corrected. Other provider failures include their HTTP status; timeouts
are reported separately. The Edge Function logs include the provider status and
provider error message, but never the submitted prompt or API key.

## 5. Enable public email verification

The login page also supports public user registration with a username, real
email address, and password. New registrations receive the default `user` role
from the profile trigger. In Supabase Dashboard:

1. Under **Authentication → Providers → Email**, enable email confirmations.
2. Configure a working SMTP provider under **Authentication → SMTP Settings**.
   Supabase's default email service is rate-limited and is not suitable for
   reliable production delivery.
3. Under **Authentication → URL Configuration**, set the deployed Vercel
   production URL as the Site URL. Add the deployed URL to Redirect URLs. The
   app sends the current site origin as the confirmation redirect, so also add
   Vercel preview URLs if using them, and `http://localhost:3000/**` for local
   development.

Publicly registered users must verify their email and then log in with that
email address and password. Admin-created accounts remain auto-confirmed and
can log in using their username. Verification emails are never sent to the
placeholder `.example` addresses.

## Data model

- `user_profiles`: Supabase Auth user ID, unique username, `admin`/`user` role.
- `procurement_projects`: project details, checklist JSON, and owner Auth ID.
- Auth profile trigger: creates a `user` profile for each new Auth account.
- RLS: project visibility is per-user, with admin access across users.
