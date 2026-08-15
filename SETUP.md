# تشغيل برج الرسالة خطوة بخطوة

## A) GitHub + Vercel
- استبدل `index.html` و`manifest.json` في repository.
- Commit + Push.
- Vercel سيعيد الـDeploy.
- جرّب `admin` بنفس الباسورد الحالي.

## B) Database — بالترتيب ده بالظبط
شغّل الملفات دي في Supabase SQL Editor **بالترتيب**:

1. `supabase/migrations/002_reports_maintenance.sql`
   - يضيف عمود `period_month` محسوب تلقائيًا لجدول `monthly_charges` (من `billing_year`/`billing_month` الموجودين عندك أصلًا).
   - ينشئ جدول `maintenance_contacts` لأرقام الصيانة.
   - ينشئ جدول `building_settings` لتخزين الرصيد الافتتاحي.
   - يستخدم دالة `public.is_admin()` الموجودة عندك بالفعل — متوافق 100% مع الـSchema اللي عندك.

2. `supabase/migrations/003_audit_log_triggers.sql`
   - يفعّل تسجيل تلقائي في `audit_logs` لأي إضافة/تعديل/حذف على: الشقق، المخالفات، الاشتراكات، المدفوعات، المصروفات، المستخدمين.

كلاهما آمن للتشغيل حتى لو عندك بيانات موجودة بالفعل (كله `IF NOT EXISTS`).

## C) Edge Function create-user
Deploy function `create-user` (موجودة عندك بالفعل، مفيش تغيير عليها).
ضع `SUPABASE_SERVICE_ROLE_KEY` في Secrets فقط.

## D) Edge Function send-reminders — نسخة جديدة
النسخة الجديدة في `supabase/functions/send-reminders/index.ts` بتستخدم أعمدة التذكير
الموجودة في `violations` (`reminder_enabled`, `reminder_frequency`, `next_reminder_at`)
وجدول `whatsapp_reminders` الموجود عندك، وبتسجل كل تذكير في `notifications`.

⚠️ الملف ده اتكتب بناءً على الـSchema اللي بعتهولي، لكن معنديش وصول مباشر لبيئة
Supabase بتاعتك عشان أختبره فعليًا. اختبره على مخالفة تجريبية واحدة الأول قبل ما
تعتمد عليه بشكل يومي.

Deploy `send-reminders` (هيستبدل أي نسخة قديمة)، وضع:
- `SUPABASE_SERVICE_ROLE_KEY`
- `WHATSAPP_ACCESS_TOKEN` (اختياري للإرسال الحقيقي)
- `WHATSAPP_PHONE_NUMBER_ID` (اختياري للإرسال الحقيقي)

بدون WhatsApp credentials، الوظيفة تسجل التذكير في `notifications` كـ"queued" بدل الإرسال الفعلي.

## E) الجدولة اليومية
اجعل `send-reminders` يعمل مرة يوميًا من Supabase Cron أو أي scheduler يستدعي الـEdge Function.

## F) أول اختبار
1. Login admin.
2. الشقق > إضافة شقة (جرّب حقل "الدور" الجديد).
3. المستخدمون > إنشاء مستخدم، جرّب دور "مشاهد فقط (Viewer)" الجديد.
4. الاشتراكات > افتح الصفحة وشوف إنها بتنشئ استحقاق الشهر تلقائيًا لكل الشقق النشطة من غير ما تدوس أي زرار.
5. افتح بحساب Resident؛ سيطلب تغيير الباسورد.
6. Admin > المخالفات > أضف مخالفة، فعّل "تذكير WhatsApp تلقائي"، واختبر أنها بتتحول لـ"متأخرة" تلقائيًا لو فات موعد تحصيلها.
7. استخدم WhatsApp للتجربة اليدوية (زرار 💬).
8. سجّل دفعة واربطها بالاستحقاق، جرّب طريقة الدفع (كاش/تحويل/محفظة).
9. ارفع PDF/صورة/فيديو.
10. راجع التنبيهات (بقت من جدول `notifications` الحقيقي).
11. Admin > الصيانة > أضف رقم فني (نجار/سباك/أسانسير) وجرّب زرار الاتصال والواتساب.
12. Admin > التقارير > حدّد الرصيد الافتتاحي، وجرّب "تصدير Excel".
13. جرّب الدخول بحساب Viewer وتأكد إن أزرار الإضافة/التعديل مختفية بس البيانات ظاهرة.
14. Admin > السجل > تأكد إن العمليات اللي عملتها فوق ظهرت تلقائيًا.
