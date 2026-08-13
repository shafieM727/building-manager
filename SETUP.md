# برج الرسالة — Complete package

## 1) Frontend
Replace your GitHub/Vercel frontend with `index.html` and `manifest.json`.

## 2) Database
In Supabase SQL Editor run:
`supabase/migrations/001_complete.sql`
This adds attachments/notification_log and private Storage bucket.

## 3) Edge Function: create-user
Deploy `supabase/functions/create-user`.
Set the Supabase secrets/environment variables:
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

The service-role key MUST exist only in the Edge Function secret environment, never in index.html.

## 4) Edge Function: send-reminders
Deploy `supabase/functions/send-reminders`.
Schedule it with Supabase Cron/pg_cron or an external scheduler to run daily.
It queues due reminders in notification_log. To actually send WhatsApp automatically, configure a WhatsApp Business API provider and add its secret to the Edge Function.

## 5) User creation
The frontend calls create-user. Admin can create resident/admin accounts and link a resident to an apartment.

## 6) Test order
Admin login -> create apartment -> create resident -> resident login -> forced password change -> add violation -> resident sees it -> admin records payment -> violation paid -> upload attachment -> check RLS.

## Important
Do not expose service-role credentials in frontend or GitHub.
