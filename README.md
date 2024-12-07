
# React Markdown Blog with Dynamic Sidebar

- [English Version](#english)
- [نسخه فارسی](#فارسی)

---

<a name="english"></a>

## English

This project is a simple React-based Markdown blog with support for dynamic sidebar navigation. You can add Markdown files to the `docs` folder, and they will automatically be accessible in the blog. 

### Project Structure
The primary focus of this project is the `docs` folder, which is where all your Markdown files are stored.

```
project-root/
├── docs/                  # Folder with Markdown files
│   ├── README.md          # Main page content
│   ├── guide.md           # Additional content page
│   ├── _sidebar.md        # Sidebar links
├── src/
│   ├── App.js             # Main application file
│   ├── Sidebar.js         # Sidebar navigation component
│   ├── MarkdownLoader.js  # Component to load Markdown files
└── public/
```

### Usage

1. **Adding New Pages**: 
   - Simply add a new Markdown file to the `docs` folder.
   - For example, if you add `tutorial.md` in `docs`, it will be accessible at `/tutorial`.
   - You can also add nested folders, like `docs/tutorials/intro.md`, which will be accessible at `/tutorials/intro`.

2. **Configuring Sidebar**:
   - In this simplified version, the sidebar navigation is manually managed in `_sidebar.md`. 
   - To add a link for the new file, add a new entry to the _sidebar markdown with the path and label.

### Installation

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Start the development server**:
    ```bash
    npm run dev
    ```

3. **Access your blog**: Open [http://localhost:5173](http://localhost:5173) in your browser.

### Example Directory Structure for `docs` Folder

You can organize your `docs` folder as shown below:

```
docs/
├── README.md               # Home page content
├── guide.md                # Guide page content
└── tutorials/              # Folder for tutorial content
    ├── intro.md            # Intro tutorial
    └── advanced.md         # Advanced tutorial
```

### Customization

You can add custom styles in `styles.css` and modify the templates in the `templates` folder if needed.

---

<a name="فارسی"></a>

## فارسی

این پروژه یک وبلاگ ساده مبتنی بر ری‌اکت است که از Markdown و ناوبری داینامیک از طریق نوار کناری (Sidebar) پشتیبانی می‌کند. با افزودن فایل‌های Markdown به پوشه‌ی `docs`، این فایل‌ها به‌طور خودکار در وبلاگ در دسترس قرار می‌گیرند.

### ساختار پروژه
بخش اصلی این پروژه روی پوشه‌ی `docs` تمرکز دارد که تمامی فایل‌های Markdown در آن ذخیره می‌شوند.

```
project-root/
├── docs/                   # پوشه‌ای برای فایل‌های Markdown
│   ├── README.md           # محتوای صفحه اصلی
│   ├── guide.md            # صفحه‌ی راهنما
│   ├── _sidebar.md         # پیوندهای نوار کناری
├── src/
│   ├── App.js              # فایل اصلی برنامه
│   ├── Sidebar.js          # کامپوننت نوار کناری برای ناوبری
│   ├── MarkdownLoader.js   # کامپوننت برای بارگذاری فایل‌های Markdown
└── public/
```

### استفاده

1. **افزودن صفحات جدید**: 
   - یک فایل Markdown جدید در پوشه‌ی `docs` اضافه کنید.
   - به‌عنوان مثال، اگر فایل `tutorial.md` را در پوشه‌ی `docs` اضافه کنید، در آدرس `/tutorial` در دسترس خواهد بود.
   - همچنین می‌توانید پوشه‌های تودرتو اضافه کنید، مثل `docs/tutorials/intro.md` که در آدرس `/tutorials/intro` قابل دسترسی خواهد بود.

2. **پیکربندی نوار کناری**:
   - در این نسخه ساده، ناوبری نوار کناری به‌صورت دستی در `_sidebar.md` مدیریت می‌شود.
   - برای اضافه کردن لینک جدید، یک پیوند جدید با مسیر و برچسب (label) اضافه کنید.

### نصب

1. **نصب وابستگی‌ها**:
    ```bash
    npm install
    ```

2. **اجرای سرور توسعه**:
    ```bash
    npm run dev
    ```

3. **دسترسی به وبلاگ**: مرورگر خود را باز کنید و به [http://localhost:5173](http://localhost:5173) بروید.

### نمونه‌ای از ساختار پوشه‌ی `docs`

شما می‌توانید پوشه‌ی `docs` را به صورت زیر سازماندهی کنید:

```
docs/
├── README.md               # محتوای صفحه اصلی
├── guide.md                # محتوای صفحه راهنما
└── tutorials/              # پوشه‌ای برای محتوای آموزشی
    ├── intro.md            # آموزش مقدماتی
    └── advanced.md         # آموزش پیشرفته
```

### شخصی‌سازی

می‌توانید استایل‌های دلخواه خود را در `styles.css` اضافه کنید و در صورت نیاز، قالب‌های موجود در پوشه‌ی `templates` را ویرایش کنید.

