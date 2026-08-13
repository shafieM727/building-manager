# برج الرسالة — Corrected Final

هذه النسخة مبنية على **Final Version التي كان Login فيها يعمل**. لم نغيّر طريقة تسجيل الدخول أو Supabase URL/key.

## 1. Frontend
ارفع `index.html` و `manifest.json` إلى GitHub ثم Deploy على Vercel.

## 2. Database
شغّل `supabase/migrations/001_complete.sql` مرة واحدة في Supabase SQL Editor.
الـSQL يستخدم `CREATE TABLE IF NOT EXISTS` ولا يحذف البيانات الموجودة.

## 3. Create User Edge Function
انشر `supabase/functions/create-user/index.ts` باسم `create-user`.
يجب أن تكون `SUPABASE_SERVICE_ROLE_KEY` Secret داخل Edge Function فقط.

## 4. Daily reminders
انشر `supabase/functions/send-reminders/index.ts` باسم `send-reminders`.
هذه الوظيفة تسجل الحالات المستحقة في notification_log. الإرسال الحقيقي على WhatsApp يحتاج WhatsApp Business API/provider credentials، ولا يجب وضعها في المتصفح.

## 5. Login
تم الحفاظ على Login القديم: `admin` يتحول إلى `admin@building.local`، لذلك نفس حسابك الحالي ونفس الباسورد يظل مستخدمًا.

## 6. اختبار
1) Admin login
2) إنشاء شقة
3) إنشاء Resident وربطه بالشقة
4) Resident login + تغيير الباسورد
5) إضافة مخالفة + موعد تحصيل
6) تسجيل الدفع
7) رفع ملف
8) تجربة زر WhatsApp
9) مراجعة RLS
