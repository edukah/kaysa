# 🎠 Kaysa

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![GitHub](https://img.shields.io/badge/View_on_GitHub-blue?logo=github)](https://github.com/edukah/kaysa)
[![Live Demo](https://img.shields.io/badge/Demo-View%20Live-orange?logo=google-chrome)](https://edukah.github.io/kaysa/)

Modular horizontal slider with touch controls, custom scrollbars, and responsive gap settings. Built with pure JavaScript for seamless integration.

## ✨ Features

- **Dual Configuration** (JS + HTML attributes)
- **Dark/Light Mode Support** (via CSS class)
- **Mobile-friendly** touch support
- **Minimal footprint, zero dependencies**
- **Interactive Help** (`Kaysa.help()`)

---

## 📦 Installation & Initialization

> **Note:** The `target` parameter is required and must be a valid DOM element or selector. All other options are optional.

### Include in your HTML `<head>`

Make sure to include the stylesheet and the script:

```html
<head>
  <link rel="stylesheet" href="dist/kaysa.min.css">
  <script type="text/javascript" src="dist/kaysa.min.js"></script>
</head>
```

### Understanding HTML Structure

Kaysa also allows configuring behavior using `data-*` attributes directly in HTML. This is ideal for simple use-cases without writing JavaScript.

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

## Basic Usage

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
| `onError`            | `function\|null` | `null` | Error callback: `(error, context) => {}`                                                     | —                                |

---

## 🔧 API Methods

After initialization, you can dynamically manage slider items:

```javascript
const slider = new Kaysa({ target: '.slider' });

// Add an element to the end
const item = document.createElement('div');
item.textContent = 'New Item';
slider.add(item);

// Add an element at a specific position
slider.add(item, 0);  // Insert at the beginning

// Remove the last element
slider.remove();

// Remove an element at a specific index
slider.remove(2);  // Remove 3rd item
```

| Method                    | Description                                                      |
|---------------------------|------------------------------------------------------------------|
| `add(element, index?)`    | Adds an element to the slider. Appends to end if index omitted.  |
| `remove(index?)`          | Removes an element. Removes last item if index omitted.          |
| `scroll(direction)`       | Scrolls the slider (`'left'` or `'right'`).                      |

> **Note:** Navigation buttons are automatically hidden when content doesn't overflow. They reappear dynamically as items are added or the container is resized.

---

## Error Handling

Kaysa provides a centralized error handling mechanism via the `onError` callback. All recoverable errors (`initScrollbar`, `add()`, `remove()`) are routed through this callback.

```javascript
new Kaysa({
  target: '.slider',
  onError: (error, context) => {
    // context: { module, operation, element? }
    console.log(error, context);
  }
});
```

If `onError` is not provided, errors are logged to `console.error` by default. If the callback itself throws, the slider remains stable.

---

## 💡 Tips

### Lazy Loading Images

Kaysa uses native browser scroll, so you can use the built-in `loading="lazy"` attribute on images. The browser will only load images as they scroll into view — no extra configuration needed.

```html
<div class="slider">
  <img src="photo-1.jpg" loading="lazy" alt="Photo 1">
  <img src="photo-2.jpg" loading="lazy" alt="Photo 2">
  <img src="photo-3.jpg" loading="lazy" alt="Photo 3">
  <img src="photo-4.jpg" loading="lazy" alt="Photo 4">
  <img src="photo-5.jpg" loading="lazy" alt="Photo 5">
</div>
```

### Touch & Swipe

No configuration needed. Kaysa relies on native `overflow-x` scrolling, so touch, swipe, and trackpad gestures work out of the box on all devices.

---

## Interactive Help

Run the following command in the browser console to view interactive documentation:

```javascript
Kaysa.help(); // Shows both syntax options
```

---

## Links

- [Report Issues](https://github.com/edukah/kaysa/issues)
- [Star Project](https://github.com/edukah/kaysa)
- [Contribute](https://github.com/edukah/kaysa/pulls)

---

## 📜 License

MIT © 2024 [edukah](https://github.com/edukah)
