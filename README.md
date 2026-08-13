# برج الرسالة — Final test build

1. Replace the existing GitHub project files with `index.html` and `manifest.json`.
2. Commit/push to GitHub.
3. Vercel redeploys automatically.
4. Login accepts either `admin` or `admin@building.local` and converts `admin` to the existing Supabase Auth email convention.
5. Existing Supabase schema expected: profiles, apartments, violations, payments, expenses, audit_logs.
6. Storage upload expects a Supabase Storage bucket named `building-files`.
7. Automatic WhatsApp messages cannot safely be sent from browser code. Use WhatsApp Business API + Supabase Edge Function + scheduled job for daily/monthly reminders.
8. User creation also needs an Edge Function using the Supabase service-role key; never put that key in frontend code.
