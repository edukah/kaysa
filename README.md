# 🎠 Kaysa - Lightweight JavaScript Slider

[![GitHub](https://img.shields.io/badge/View_on_GitHub-blue?logo=github)](https://github.com/edukah/kaysa)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Demo-View%20Live-orange?logo=google-chrome)](https://edukah.github.io/kaysa/)

✨ Kaysa: Modular horizontal slider with touch controls, custom scrollbars, and responsive gap settings. Built with pure JavaScript for seamless integration.

## ✨ Features
- 🎨 **Dual Configuration** (JS + HTML attributes)
- 🌓 **Dark/Light Mode Support** (via CSS class)
- 📱 **Mobile-friendly** touch support
- ⚡ **Minimal footprint, zero dependencies**
- 🔍 **Interactive Help** (`Kaysa.manual()`)

---

## 📦 Installation & ⚙️ Initialization

> **Note:** The `target` parameter is required and must be a valid DOM element or selector. All other options are optional.

### Include in your HTML `<head>`

Make sure to include the stylesheet and the script:

```html
<head>
  <link rel="stylesheet" href="dist/kaysa.min.css" />
  <script type="text/javascript" src="dist/kaysa.min.js"></script>
</head>
```

### Understanding HTML Structure

Minyatur also allows configuring behavior using `data-*` attributes directly in HTML. This is ideal for simple use-cases without writing JavaScript.

**Example:**

```html
<div class="slider"
     data-kaysa-scroll-speed="0.7"
     data-kaysa-gap="20px"
     data-kaysa-enhanced-scrollbar="true">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Dark Mode Integration

Add `.dark-mode` class to `<body>` to activate dark theme:

```html
<body class="dark-mode">
  <div class="slider">...</div>
</body>
```

---

## 🚀 Basic Usage

### JavaScript Configuration

```javascript
new Kaysa({
  target: '.slider',        // Required - selector or element
  scrollSpeed: 0.7,
  gap: '20px',
  enhancedScrollbar: true,
  prevButtonContent: '←',
  nextButtonContent: '→'
});
```

### HTML Attribute Configuration

```html
<div class="slider"
     data-kaysa-scroll-speed="0.7"
     data-kaysa-gap="20px"
     data-kaysa-enhanced-scrollbar="true"
     data-kaysa-prev-button-content="←"
     data-kaysa-next-button-content="→">
  <!-- slider items here -->
</div>
```

---

## ⚙️ Configuration Options

| Option               | Type      | Default   | Description                                                                                   | HTML Attribute                   |
|----------------------|-----------|-----------|-----------------------------------------------------------------------------------------------|----------------------------------|
| `scrollSpeed`        | `number`  | `0.8`     | Determines the scrolling speed (value between 0.1–1).                                         | `data-kaysa-scroll-speed`        |
| `gap`                | `string`  | `'15px'`  | Sets the gap between items (CSS value).                                                       | `data-kaysa-gap`                 |
| `enhancedScrollbar` | `boolean` | `false`   | Enables/disables the custom scrollbar.                                                        | `data-kaysa-enhanced-scrollbar`|
| `prevButtonContent`  | `string`  | `'<'`     | Content of the previous button.                                                               | `data-kaysa-prev-button-content` |
| `nextButtonContent`  | `string`  | `'>'`     | Content of the next button.                                                                   | `data-kaysa-next-button-content` |

---

## 🌟 Interactive Help

Run the following command in the browser console to view interactive documentation:

```javascript
Kaysa.manual(); // Shows both syntax options
```

---

## 🌐 GitHub Links

- 🐞 [Report Issues](https://github.com/edukah/kaysa/issues)
- 🌟 [Star Project](https://github.com/edukah/kaysa)
- 🤝 [Contribute](https://github.com/edukah/kaysa/pulls)

---

## 📜 License

MIT © 2024 [edukah](https://github.com/edukah)