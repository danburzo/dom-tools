# DOM tools

DOM helper functions to debug web pages.

## Usage

In the browser's console, import the module:

```js
// import and assign to the global `dt` variable:
import('https://danburzo.github.io/dom-tools/api.js').then(m => dt = m);

// use the API:
dt.highlight(el => el.tagName === 'LI');
```

> __Note:__ This will not work on web pages whose CSP settings disable loading external scripts. Currently looking for a workaround!

### API

* `stackingCtx()` 
* `highlight()`