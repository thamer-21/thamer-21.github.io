# RealCut — موقع الناشر (Unity Asset Publisher Site)

موقع تعريفي ثابت (HTML/CSS/JS فقط — بدون أي frameworks) لعرضه كصفحة ناشر في Unity Asset Store.

## تشغيل الموقع محليًا

افتح `index.html` مباشرة في المتصفح، أو شغّل سيرفر محلي (أفضل لصفحات المنتجات):

```
python -m http.server 8123
```

ثم افتح: http://localhost:8123

## هيكل المشروع

| الملف / المجلد | الوظيفة |
|---|---|
| `index.html` | الصفحة الرئيسية (الشعار + النبذة + الأزرار) |
| `products.html` | صفحة عرض جميع المنتجات (بطاقات) |
| `product.html` | صفحة المنتج التفصيلية — تُفتح بـ `product.html?id=smart-save` |
| `support.html` | الدعم: الإيميل، طريقة الإبلاغ، FAQ، مدة الرد |
| `docs.html` | التوثيق: التثبيت، البداية السريعة، الإعدادات، أمثلة |
| `about.html` | من نحن |
| `contact.html` | التواصل: إيميل + نموذج رسالة + GitHub |
| `privacy.html` / `terms.html` | الخصوصية والشروط |
| `css/style.css` | كل التصميم (الألوان في متغيرات `:root` أول الملف) |
| `js/main.js` | الهيدر والفوتر المشترك + الشعار (SVG) |
| `js/products.js` | **بيانات المنتجات** — عدّل هنا لإضافة/تغيير المنتجات |
| `assets/img/` | صور المنتجات (SVG مؤقتة — استبدلها بلقطات حقيقية) |

## كيف تضيف منتج جديد؟

افتح `js/products.js` وأضف عنصر جديد داخل `PRODUCTS` بنفس شكل المنتجات الموجودة
(الاسم، الوصف، الإصدار، الصور، المميزات، الـ changelog، الـ FAQ، رابط المتجر).
البطاقة وصفحة التفاصيل تنبنيان تلقائيًا.

## قبل النشر الفعلي

1. استبدل الصور في `assets/img/` بلقطات شاشة حقيقية من أدواتك.
2. حدّث روابط `storeUrl` في `js/products.js` لروابط صفحاتك الفعلية في Unity Asset Store.
3. أضف رابط فيديو (YouTube embed) مكان الـ placeholder في صفحة المنتج.
4. المنتجات الحالية (Smart Save System / Advanced Inventory System) **أمثلة للعرض فقط**.

## النشر المجاني

أسهل خيار: **GitHub Pages** — ارفع المجلد لمستودع على حسابك (github.com/thamer-21)
وفعّل Pages من الإعدادات، وبيكون الموقع على `https://thamer-21.github.io/<repo>`.
يشتغل أيضًا على Netlify أو Cloudflare Pages بدون أي تعديل.
