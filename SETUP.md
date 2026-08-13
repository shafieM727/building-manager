# تشغيل برج الرسالة خطوة بخطوة

## A) GitHub + Vercel
- استبدل `index.html` و`manifest.json` في repository.
- Commit + Push.
- Vercel سيعيد الـDeploy.
- جرّب `admin` بنفس الباسورد الحالي.

## B) Database
Supabase > SQL Editor > New query > الصق محتوى:
`supabase/migrations/001_complete.sql`
ثم Run.

الـSQL لا يحذف جداولك القديمة. ينشئ فقط `monthly_charges`, `attachments`, `notification_log` ويضيف Storage bucket/policies.

## C) Edge Function create-user
Deploy function `create-user`.
ضع `SUPABASE_SERVICE_ROLE_KEY` في Secrets فقط.

## D) Edge Function send-reminders
Deploy `send-reminders`.
ضع:
- `SUPABASE_SERVICE_ROLE_KEY`
- `WHATSAPP_ACCESS_TOKEN` (اختياري للإرسال الحقيقي)
- `WHATSAPP_PHONE_NUMBER_ID` (اختياري للإرسال الحقيقي)

بدون WhatsApp credentials، الوظيفة تسجل التنبيه كـqueued بدل الإرسال.

## E) الجدولة اليومية
اجعل `send-reminders` يعمل مرة يوميًا من Supabase Cron أو أي scheduler يستدعي الـEdge Function.

## F) أول اختبار
1. Login admin.
2. الشقق > إضافة/تعديل شقة.
3. المستخدمون > إنشاء Resident وربطه بالشقة.
4. افتح بحساب Resident؛ سيطلب تغيير الباسورد.
5. Admin > الاشتراكات > إنشاء شهر.
6. Admin > المخالفات > أضف مخالفة وموعد تحصيل.
7. استخدم WhatsApp للتجربة اليدوية.
8. سجّل دفعة واربطها بالاستحقاق.
9. ارفع PDF/صورة/فيديو.
10. راجع التنبيهات.
