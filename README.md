# 🎠 Kaysa - Lightweight JavaScript Slider

[![GitHub](https://img.shields.io/badge/View_on_GitHub-blue?logo=github)](https://github.com/edukah/kaysa)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Bundle Size](https://img.shields.io/badge/minified%20size-8KB-yellow)](dist/kaysa.min.js)

## ✨ Features
- 🔍 **Interactive Help** (`Kaysa.manual()`)
- ⚡ **8KB Gzipped** (Zero dependencies)
- 🎨 **Dual Configuration** (JS + HTML attributes)
- 📱 **Mobile-friendly** touch support

## 📦 Installation
```bash
npm install kaysa
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
</div>
```

## ⚙️ Configuration Options
| Option | Type | Default | HTML Attribute |
|--------|------|---------|-----------------|
| `scrollSpeed` | `number` | `0.8` | `data-kaysa-scroll-speed` |
| `gap` | `string` | `'15px'` | `data-kaysa-gap` |
| `useCustomScrollbar` | `boolean` | `false` | `data-kaysa-use-custom-scrollbar` |

## 🔄 Backward Compatibility
```javascript
// Still works (but deprecated):
new Kaysa('.slider', { scrollSpeed: 0.7 });
```

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