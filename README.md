# برج الرسالة — Complete Mobile/PWA Build

نظام إدارة عمارة سكنية (Admin / Resident / Viewer) مبني كملف HTML واحد + Supabase.
convention تسجيل الدخول: `username` => `username@building.local`.

## ما تم تنفيذه
- Admin / Resident / Viewer (مشاهد فقط) بصلاحيات مختلفة.
- إجبار تغيير الباسورد أول Login.
- إدارة الشقق: إضافة/تعديل/تفاصيل، مع رقم الدور (floor).
- إدارة المستخدمين: إنشاء عبر Edge Function، تعديل، تفعيل/تعطيل وربط بالشقة.
- اشتراكات شهرية تلقائية: بمجرد فتح الصفحة، كل شقة نشطة بياخد استحقاق الشهر الحالي
  تلقائيًا (بدون أي زرار يدوي)، مع بحث بالشقة/الساكن وHistory كامل لكل شقة.
- مخالفات: إضافة/تعديل/دفع/موعد تحصيل/WhatsApp يدوي وتلقائي، وتتحول لحالة
  "متأخرة" تلقائيًا لو فات موعد تحصيلها.
- مدفوعات مرتبطة بالشقة والاستحقاق والمخالفة، بطريقة دفع (كاش/تحويل/محفظة/أخرى).
- مصروفات.
- مرفقات صور/PDF/فيديو عبر Storage خاص.
- تنبيهات فعلية من جدول `notifications`.
- Edge Function للتذكيرات اليومية عبر WhatsApp Cloud API، مبنية على أعمدة التذكير
  الموجودة في `violations` وجدول `whatsapp_reminders`.
- Audit Log تلقائي بالكامل (Triggers على كل الجداول المهمة).
- تقارير شهرية: كام شقة دفعت الاشتراك وبكام، كام مخالفة اتحصلت وبكام، المصروفات،
  وصافي الشهر، مع رصيد تراكمي بيتجمع شهر فوق شهر (ورصيد افتتاحي يتحدد مرة واحدة)
  وتصدير Excel/CSV.
- أرقام صيانة البرج (نجار/سباك/أسانسير/كاميرات...) مع اتصال وواتساب مباشر من التطبيق.
- رسائل خطأ بالعربي، شاشات تحميل، Empty states.
- Resident يرى شقته فقط.

## Deploy
راجع `SETUP.md` للخطوات التفصيلية بالترتيب الصحيح.

ملخص سريع:
1. ارفع `index.html` و`manifest.json` إلى GitHub/Vercel.
2. نفّذ `supabase/migrations/002_reports_maintenance.sql` ثم `003_audit_log_triggers.sql`
   في Supabase SQL Editor (بنفس الترتيب، على الـSchema الأصلي اللي عندك بالفعل).
3. Deploy `create-user` و`send-reminders` (النسخة الجديدة) كـEdge Functions.
4. ضع `SUPABASE_SERVICE_ROLE_KEY` كSecret للـcreate-user/send-reminders فقط.
5. للتذكيرات الحقيقية عبر WhatsApp Cloud API أضف `WHATSAPP_ACCESS_TOKEN` و`WHATSAPP_PHONE_NUMBER_ID` للـsend-reminders.
6. شغّل `send-reminders` يوميًا عبر Supabase Cron/External scheduler.

لا تضع service-role key في Frontend.
