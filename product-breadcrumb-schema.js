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

document.addEventListener('DOMContentLoaded', function() {
  try {
    if (location.pathname !== '/jizvy/') return;
    var faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Jak dlouho trvá, než uvidím na jizvě zlepšení?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Při pravidelném denním používání bývá první viditelné zlepšení patrné po 2–3 měsících. Jizvy se hojí postupně, proto je důležitá trpělivost a pravidelnost."
          }
        },
        {
          "@type": "Question",
          "name": "Můžu krém použít na čerstvou jizvu po operaci?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Krém je vhodné začít používat až ve chvíli, kdy je rána zcela zhojená a uzavřená. Pokud si nejste jistí stavem hojení, poraďte se se svým lékařem."
          }
        },
        {
          "@type": "Question",
          "name": "Je krém s aloe vera vhodný i na jizvy po akné?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ano, hydratační a zklidňující složky pomáhají zjemnit strukturu pokožky i po zánětlivých jizvách po akné. U akutních zánětů doporučujeme nejprve počkat na zklidnění pokožky."
          }
        },
        {
          "@type": "Question",
          "name": "Hodí se přípravek i pro citlivou pokožku?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Díky přírodnímu složení s aloe vera je krém vhodný i pro citlivější pleť. Jako u každého nového produktu doporučujeme nejprve vyzkoušet na malé ploše kůže."
          }
        },
        {
          "@type": "Question",
          "name": "Funguje krém i na starší, již zhojené jizvy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ano, pravidelná hydratace a péče mohou zlepšit vzhled i starších jizev, i když efekt bývá u déle trvajících jizev postupnější."
          }
        }
        ]
    };
    var s3 = document.createElement('script');
    s3.type = 'application/ld+json';
    s3.text = JSON.stringify(faq);
    document.head.appendChild(s3);
  } catch (e) {}
});


document.addEventListener('DOMContentLoaded', function() {
try {
if (location.pathname !== '/intimni-pece/') return;
var faq2 = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Jsou přípravky v této kategorii léky?", "acceptedAnswer": {"@type": "Answer", "text": "Ne, jde o kosmetické přípravky určené k péči a hydrataci pokožky a sliznice v intimní oblasti. Nejsou určeny k léčbě onemocnění – při zdravotních potížích se prosím obraťte na lékaře nebo gynekologa."}},
    {"@type": "Question", "name": "Jak často mohu krém používat?", "acceptedAnswer": {"@type": "Answer", "text": "Přípravky lze používat dle potřeby, obvykle 1–2× denně, jako součást běžné hydratační péče. Vždy se řiďte návodem k použití konkrétního produktu."}},
    {"@type": "Question", "name": "Je krém vhodný i pro citlivou pokožku?", "acceptedAnswer": {"@type": "Answer", "text": "Ano, formule obsahuje Aloe vera a další zklidňující složky a neobsahuje parfemaci ani konzervanty. Přesto doporučujeme před prvním použitím vyzkoušet menší množství na malé ploše pokožky."}},
    {"@type": "Question", "name": "Můžu přípravek používat i v období menopauzy nebo hormonálních změn?", "acceptedAnswer": {"@type": "Answer", "text": "Přípravek je vhodný k běžné hydratační péči v jakémkoli životním období. Pokud řešíte konkrétní zdravotní potíže spojené s hormonálními změnami, doporučujeme poradit se s gynekologem."}},
    {"@type": "Question", "name": "Pomůže krém při pocitu vaginální suchosti?", "acceptedAnswer": {"@type": "Answer", "text": "Přípravek je určen k hydrataci a zklidnění pokožky a sliznice, takže může přispět ke zmírnění pocitu suchosti a k dennímu komfortu. Pokud suchost přetrvává nebo je spojena s dalšími obtížemi, doporučujeme konzultaci s gynekologem."}},
    {"@type": "Question", "name": "Co dělat, pokud se po použití objeví podráždění?", "acceptedAnswer": {"@type": "Answer", "text": "V případě neobvyklé reakce přípravek přestaňte používat. Pokud potíže přetrvávají, obraťte se na svého lékaře nebo gynekologa."}}
  ]
};
var s4 = document.createElement('script');
s4.type = 'application/ld+json';
s4.text = JSON.stringify(faq2);
document.head.appendChild(s4);
} catch (e) {}
});


document.addEventListener('DOMContentLoaded', function() {
  try {
    if (location.pathname !== '/') return;
    var faqHome = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type": "Question", "name": "Co dělá aloe vera z Atlantia jinou?", "acceptedAnswer": {"@type": "Answer", "text": "Naše aloe vera pochází z vlastních ekologických plantáží na Kanárských ostrovech. Každá šarže je certifikována s obsahem acemannanu nad 1700 mg/l a garantovaně nízkým obsahem aloinu pod 10 ppm."}},
          {"@type": "Question", "name": "Jsou produkty Atlantia vhodné pro citlivou pokožku?", "acceptedAnswer": {"@type": "Answer", "text": "Ano, produkty jsou 100% přírodní, bez parabenů a konzervantů, a mnohé jsou vhodné i pro velmi citlivou nebo podrážděnou pokožku. U konkrétních produktů doporučujeme vždy zkontrolovat složení a vyzkoušet nejprve na malé ploše kůže."}},
          {"@type": "Question", "name": "Na co se aloe vera nejčastěji používá?", "acceptedAnswer": {"@type": "Answer", "text": "Aloe vera se využívá k hydrataci a zklidnění pokožky, péči o jizvy a popáleniny, intimní hygienu, i jako doplněk stravy ve formě nápojů. V naší nabídce najdete produkty pro tělo, obličej i specializovanou péči."}},
          {"@type": "Question", "name": "Jsou produkty testované na zvířatech?", "acceptedAnswer": {"@type": "Answer", "text": "Ne, všechny produkty Atlantia jsou 100% netestované na zvířatech."}},
          {"@type": "Question", "name": "Odkud pochází aloe vera použitá v produktech?", "acceptedAnswer": {"@type": "Answer", "text": "Pěstujeme ji na vlastních ekologických plantážích na Kanárských ostrovech ve Španělsku a kontrolujeme celý výrobní proces od pěstování až po balení hotových výrobků."}}
            ]
    };
    var s7 = document.createElement('script');
    s7.type = 'application/ld+json';
    s7.text = JSON.stringify(faqHome);
    document.head.appendChild(s7);
  } catch (e) {}
});
