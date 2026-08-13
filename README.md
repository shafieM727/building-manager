# برج الرسالة — Complete Mobile/PWA Build

هذه النسخة مبنية على الـFinal Version التي كان Login فيها يعمل، وتحافظ على convention: `admin` => `admin@building.local`.

## ما تم تنفيذه
- Admin / Resident مع صلاحيات مختلفة.
- إجبار تغيير الباسورد أول Login.
- إدارة الشقق: إضافة/تعديل/تفاصيل.
- إدارة المستخدمين: إنشاء عبر Edge Function، تعديل، تفعيل/تعطيل وربط بالشقة.
- اشتراكات شهرية واستحقاقات لكل شقة + توليد شهر كامل.
- مخالفات: إضافة/تعديل/دفع/موعد تحصيل/WhatsApp يدوي.
- مدفوعات مرتبطة بالشقة والاستحقاق.
- مصروفات.
- مرفقات صور/PDF/فيديو عبر Storage خاص.
- سجل تنبيهات.
- Edge Function للتذكيرات اليومية، وتدعم WhatsApp Cloud API عند إضافة الأسرار.
- Audit Log موجود من الـschema القديم.
- Resident يرى شقته فقط.
- تقارير شهرية: كام شقة دفعت الاشتراك وبكام، كام مخالفة اتحصلت وبكام، المصروفات، وصافي الشهر، مع رصيد تراكمي بيتجمع شهر فوق شهر (ورصيد افتتاحي يتحدد مرة واحدة).
- أرقام صيانة البرج (نجار/سباك/أسانسير/كاميرات...) مع اتصال وواتساب مباشر من التطبيق. Admin يضيف/يعدّل، الكل يقدر يتصل.

## Deploy
1. ارفع `index.html` و`manifest.json` إلى GitHub/Vercel.
2. نفّذ `supabase/migrations/001_complete.sql` مرة واحدة في Supabase SQL Editor.
2ب. نفّذ `supabase/migrations/002_reports_maintenance.sql` بعده (يضيف تاريخ دفع المخالفات + جدول أرقام الصيانة + جدول الرصيد الافتتاحي). آمن للتشغيل حتى لو عندك بيانات موجودة.
3. Deploy `create-user` و`send-reminders` كـEdge Functions.
4. ضع `SUPABASE_SERVICE_ROLE_KEY` كSecret للـcreate-user/send-reminders فقط.
5. للتذكيرات الحقيقية عبر WhatsApp Cloud API أضف `WHATSAPP_ACCESS_TOKEN` و`WHATSAPP_PHONE_NUMBER_ID` للـsend-reminders.
6. شغّل `send-reminders` يوميًا عبر Supabase Cron/External scheduler.

لا تضع service-role key في Frontend.
