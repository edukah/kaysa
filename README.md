# 🎠 Kaysa - Lightweight JavaScript Slider

[![GitHub](https://img.shields.io/badge/View_on_GitHub-blue?logo=github)](https://github.com/edukah/kaysa)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()

✨ Kaysa: Modular horizontal slider with touch controls, custom scrollbars, and responsive gap settings. Built with pure JavaScript for seamless integration.

## ✨ Features
- 🔍 **Interactive Help** (`Kaysa.manual()`)
- ⚡ **8KB Gzipped** (Zero dependencies)
- 🎨 **Dual Configuration** (JS + HTML attributes)
- 📱 **Mobile-friendly** touch support


## 📦 Installation & ⚙️Initialization

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
     data-kaysa-use-custom-scrollbar="true">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## 🚀 Basic Usage
### JavaScript Configuration 
```javascript
new Kaysa({
  target: '.slider',        // Required - selector or element
  scrollSpeed: 0.7,         // 0.1 (slow) - 1 (fast)
  gap: '20px',              // CSS valid spacing
  useCustomScrollbar: true  
});
```
### HTML Attribute Configuration 
```html
<div class="slider"
     data-kaysa-scroll-speed="0.7"
     data-kaysa-gap="20px"
     data-kaysa-use-custom-scrollbar="true">
  <!-- slider items here -->
</div>
```

## ⚙️ Configuration Options
| Option | Type | Default | HTML Attribute |
|--------|------|---------|-----------------|
| `scrollSpeed` | `number` | `0.8` | `data-kaysa-scroll-speed` |
| `gap` | `string` | `'15px'` | `data-kaysa-gap` |
| `useCustomScrollbar` | `boolean` | `false` | `data-kaysa-use-custom-scrollbar` |

## 🌟 Interactive Help
Run in console:
```javascript
Kaysa.manual(); // Shows both syntax options
```

## 🌐 GitHub Links
- 🐞 [Report Issues](https://github.com/edukah/kaysa/issues)
- 🌟 [Star Project](https://github.com/edukah/kaysa)
- 🤝 [Contribute](https://github.com/edukah/kaysa/pulls)

## 📜 License
MIT © 2024 [edukah](https://github.com/edukah)