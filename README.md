# إدارة البرج
هذه نسخة PWA أولية متصلة بـ Supabase.

## أول Admin
من Supabase > Authentication > Users > Add user:
- Email: admin@building.local
- Password: اختر كلمة مرور مؤقتة
ثم انسخ User UUID ونفذ في SQL Editor:
insert into public.profiles (id,username,full_name,role,is_active,must_change_password)
values ('USER_UUID','admin','Building Admin','admin',true,true);

بعدها افتح التطبيق واستخدم:
username: admin
password: كلمة المرور التي أنشأتها.

## ملاحظات
- لا يوجد أي service_role key في الواجهة.
- إنشاء المستخدمين من داخل التطبيق يحتاج Edge Function آمنة، وهي الخطوة التالية.
- WhatsApp الحالي يفتح رسالة جاهزة ولا يرسل تلقائياً.
