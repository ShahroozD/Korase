
# React Markdown Blog with Dynamic Sidebar

- [English Version](#english)
- [نسخه فارسی](#فارسی)

---

<a name="english"></a>

## English

This project is a simple React-based Markdown blog with support for dynamic sidebar navigation and customizable templates. You can add Markdown files to the `docs` folder, and they will automatically be accessible in the blog. Additionally, you can choose different templates to render the blog, which are stored in the `templates/` folder.

### Project Structure
The primary focus of this project is the `docs` folder, which is where all your Markdown files are stored. The `templates/` folder contains different templates for customizing the blog's appearance.

```
project-root/
├── docs/                    # Folder with Markdown files
│   ├── README.md            # Main page content
│   ├── guide.md             # Additional content page
│   ├── _sidebar.md          # Sidebar links
├── src/
│   ├── App.js               # Main application file
│   ├── Sidebar.js           # Sidebar navigation component
│   ├── MarkdownLoader.js    # Component to load Markdown files
│   ├── templates/           # Folder containing blog templates
│   │   ├── BlogTemplate/    # Example blog template
│   │   └── DefaultTemplate/ # Default blog template
│   └── utils/               # Utility functions
└── public/
```

### Usage

1. **Adding New Pages**: 
   - Simply add a new Markdown file to the `docs` folder.
   - For example, if you add `tutorial.md` in `docs`, it will be accessible at `/tutorial`.
   - You can also add nested folders, like `docs/tutorials/intro.md`, which will be accessible at `/tutorials/intro`.

2. **Configuring Sidebar**:
   - In this simplified version, the sidebar navigation is manually managed in `_sidebar.md`. 
   - To add a link for the new file, add a new entry to the `_sidebar.md` file with the path and label.

3. **Selecting a Template**:
   - You can choose a template for your blog by setting the `VITE_TEMPLATE_NAME` environment variable.
   - In the root of your project, create a `.env` file with the following content:
     ```bash
     VITE_TEMPLATE_NAME=BlogTemplate
     ```
   - You can choose between the `BlogTemplate` or the `DefaultTemplate` (or any other templates you add to the `templates/` folder).

4. **Modifying Templates**:
   - The templates are located in the `src/templates/` folder. You can modify the templates there or add new templates to customize the look and feel of your blog.

5. **Adding Plugins and Customization**:
   - For an example of how to integrate plugins, templates, and handle rendering and building, refer to the [korase-irantimeline repository](https://github.com/barnevis/korase-irantimeline). This repository provides a practical example of how to set up a project with plugins and templates, handle rendering, and build the project.
   - Check the `install.sh` script for setup instructions, and explore how templates are structured and utilized for rendering and building.

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

- You can add custom styles in `styles.css` and modify the templates in the `templates` folder if needed.
- If you want to change the behavior of the application, you can create utility functions in the `utils/` folder.

---

<a name="فارسی"></a>

## فارسی

این پروژه یک وبلاگ ساده مبتنی بر ری‌اکت است که از Markdown و ناوبری داینامیک از طریق نوار کناری (Sidebar) پشتیبانی می‌کند. با افزودن فایل‌های Markdown به پوشه‌ی `docs`، این فایل‌ها به‌طور خودکار در وبلاگ در دسترس قرار می‌گیرند. همچنین، می‌توانید قالب‌های مختلف برای نمایش وبلاگ انتخاب کنید که در پوشه‌ی `templates/` ذخیره شده‌اند.

### ساختار پروژه
بخش اصلی این پروژه روی پوشه‌ی `docs` تمرکز دارد که تمامی فایل‌های Markdown در آن ذخیره می‌شوند. پوشه‌ی `templates/` حاوی قالب‌های مختلف برای سفارشی‌سازی ظاهر وبلاگ است.

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
│   ├── templates/          # پوشه‌ای برای قالب‌ها
│   │   ├── BlogTemplate/   # قالب وبلاگ
│   │   └── DefaultTemplate/# قالب پیش‌فرض وبلاگ
│   └── utils/              # توابع کمکی
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

3. **انتخاب قالب**:
   - می‌توانید قالب وبلاگ خود را با تنظیم متغیر محیطی `VITE_TEMPLATE_NAME` انتخاب کنید.
   - در ریشه پروژه خود، یک فایل `.env` ایجاد کنید و محتویات زیر را وارد کنید:
     ```bash
     VITE_TEMPLATE_NAME=BlogTemplate
     ```
   - شما می‌توانید بین `BlogTemplate` یا `DefaultTemplate` (یا هر قالب دیگری که به پوشه‌ی `templates/` اضافه می‌کنید) انتخاب کنید.

4. **تغییر قالب‌ها**:
   - قالب‌ها در پوشه‌ی `src/templates/` قرار دارند. شما می‌توانید قالب‌ها را در آنجا تغییر دهید یا قالب‌های جدیدی برای سفارشی‌سازی ظاهر وبلاگ اضافه کنید.

5. **اضافه کردن افزونه‌ها و سفارشی‌سازی**:
   - برای یک مثال از چگونگی افزودن افزونه‌ها، قالب‌ها، و مدیریت رندرینگ و ساخت پروژه، به مخزن [korase-irantimeline](https://github.com/barnevis/korase-irantimeline) مراجعه کنید. این مخزن نمونه‌ای از نحوه تنظیم پروژه با افزونه‌ها و قالب‌ها، مدیریت رندرینگ و ساخت پروژه را فراهم می‌کند.
   - برای دستورالعمل‌های نصب، اسکریپت `install.sh` را بررسی کنید و نحوه ساختاردهی قالب‌ها و استفاده از آن‌ها در رندر و ساخت پروژه را مشاهده کنید.

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

### سفارشی‌سازی

- شما می‌توانید استایل‌های سفارشی را در `styles.css` اضافه کنید و قالب‌ها را در پوشه‌ی `templates` تغییر دهید.
- اگر می‌خواهید رفتار برنامه را تغییر دهید، می‌توانید توابع کمکی را در پوشه‌ی `utils/` ایجاد کنید.

