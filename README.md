# برج الرسالة — Monthly Subscription Update

## Subscription model
لا يتم إنشاء اشتراك شهري يدويًا. قيمة الاشتراك مأخوذة مباشرة من `apartments.monthly_fee`، والاستحقاق يوم 10 من كل شهر.

لوحة التحكم تحسب تلقائيًا:
- إجمالي المستحق للشهر الحالي
- إجمالي تحصيل الاشتراكات للشهر الحالي
- المتبقي
- عدد الشقق التي لم تسدد
- حالة التحصيل قبل/بعد يوم 10

## Database migration
نفّذ مرة واحدة:
`supabase/migrations/002_monthly_subscription_logic.sql`

يضيف `payment_type` إلى `payments` لتمييز الاشتراك عن المخالفة والمبالغ الأخرى.
