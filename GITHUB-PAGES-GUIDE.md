# دليل نشر المشروع على GitHub Pages

## خطوات النشر:

### 1. إنشاء Repository جديد
1. اذهب إلى [GitHub](https://github.com)
2. اضغط على "New repository"
3. اختر اسم مناسب مثل `companies-tracker`
4. اختر "Public" (مطلوب للـ GitHub Pages المجاني)
5. اضغط "Create repository"

### 2. رفع الملفات
```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit: Companies tracker project"
git branch -M main
git remote add origin https://github.com/[username]/[repository-name].git
git push -u origin main
```

### 3. تفعيل GitHub Pages
1. اذهب إلى Settings في الـ repository
2. ابحث عن "Pages" في القائمة الجانبية
3. تحت "Source" اختر "Deploy from a branch"
4. اختر "main" branch
5. اضغط "Save"

### 4. انتظار النشر
- سيظهر رابط المشروع بعد بضع دقائق
- الرابط سيكون: `https://[username].github.io/[repository-name]`

## تحسينات للأداء:

### 1. استخدام النسخة المحسنة
استبدل `script.js` بـ `script-optimized.js` في ملف HTML:

```html
<script src="script-optimized.js"></script>
```

### 2. تحديث رابط البيانات
في `script-optimized.js` غير هذا السطر:
```javascript
const response = await fetch('https://raw.githubusercontent.com/[username]/[repository]/main/companies-data.json');
```

### 3. ضغط الملفات (اختياري)
يمكنك ضغط ملفات CSS و JS لتحسين الأداء.

## المميزات التي ستعمل:

✅ **جميع الوظائف الأساسية**
✅ **localStorage للتتبع**
✅ **التصميم المتجاوب**
✅ **البحث والتصنيف**
✅ **تتبع الشركات المحولة**

## المشاكل المحتملة:

⚠️ **حجم ملف JSON**: قد يكون بطيء في التحميل الأول
⚠️ **CORS**: قد تحتاج لاستخدام GitHub Raw URLs
⚠️ **الأداء**: قد يكون أبطأ من الاستضافة العادية

## الحلول:

1. **استخدام النسخة المحسنة** مع error handling
2. **تقسيم البيانات** إلى ملفات أصغر
3. **استخدام CDN** لتحسين الأداء

## مثال على الرابط النهائي:
```
https://yourusername.github.io/companies-tracker/
```
