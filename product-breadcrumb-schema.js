document.addEventListener('DOMContentLoaded', function() {
try {
var p = document.querySelector('[itemtype="https://schema.org/Product"]');
if (!/\/produkty\//.test(location.pathname) || !p) return;
function gv(scope, key) {
if (!scope) return null;
var el = scope.querySelector('[itemprop="' + key + '"]');
if (!el) return null;
if (el.hasAttribute('content')) return el.getAttribute('content');
var t = el.textContent ? el.textContent.trim() : '';
return t || null;
}
function absUrl(u) {
if (!u) return null;
try { return new URL(u, location.origin).href; } catch (e) { return u; }
}
var name = gv(p, 'name');
if (!name) return;
var product = { "@context": "https://schema.org", "@type": "Product", "name": name };
var image = gv(p, 'image'); if (image) product.image = absUrl(image);
var sku = gv(p, 'sku'); if (sku) product.sku = sku;
var offerScope = p.querySelector('[itemprop="offers"][itemtype="https://schema.org/Offer"]');
if (offerScope) {
var price = gv(offerScope, 'price'), currency = gv(offerScope, 'priceCurrency');
if (price && currency) {
var offer = { "@type": "Offer", "price": price, "priceCurrency": currency };
var availEl = offerScope.querySelector('[itemprop="availability"]');
if (availEl) offer.availability = availEl.getAttribute('href');
product.offers = offer;
}
}
var ratingScope = p.querySelector('[itemprop="aggregateRating"][itemtype="https://schema.org/AggregateRating"]');
if (ratingScope) {
var ratingValue = gv(ratingScope, 'ratingValue'), ratingCount = gv(ratingScope, 'ratingCount');
if (ratingValue && ratingCount && !isNaN(parseFloat(ratingValue)) && !isNaN(parseInt(ratingCount, 10))) {
product.aggregateRating = { "@type": "AggregateRating", "ratingValue": ratingValue, "ratingCount": ratingCount };
}
}
var s1 = document.createElement('script');
s1.type = 'application/ld+json';
s1.text = JSON.stringify(product);
document.head.appendChild(s1);
var bcScope = document.querySelector('[itemtype="https://schema.org/BreadcrumbList"]');
if (bcScope) {
var items = bcScope.querySelectorAll('[itemprop="itemListElement"]'), list = [];
items.forEach(function(li) {
var nameEl = li.querySelector('[itemprop="name"]');
var posEl = li.querySelector('[itemprop="position"]');
var itemEl = li.querySelector('[itemprop="item"]');
var liName = nameEl ? nameEl.textContent.trim() : null;
var liPos = posEl ? parseInt(posEl.getAttribute('content'), 10) : null;
var liUrl = itemEl ? (itemEl.tagName === 'A' ? itemEl.getAttribute('href') : itemEl.getAttribute('content')) : null;
if (liName && liPos) {
var entry = { "@type": "ListItem", "position": liPos, "name": liName };
if (liUrl) entry.item = absUrl(liUrl);
list.push(entry);
}
});
if (list.length) {
var breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": list };
var s2 = document.createElement('script');
s2.type = 'application/ld+json';
s2.text = JSON.stringify(breadcrumb);
document.head.appendChild(s2);
}
}
} catch (e) {}
});
