// Interface text for the custom components, per language.
// Page content is translated in src/content/docs/<locale>/.
// Rules for translators: tools/i18n/STYLE.md

export const LOCALES = ['es', 'ja', 'zh-cn', 'pt-br', 'fr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

const en = {
  contact: 'Contact us',
  goTo: 'Go to KoreaHaul',
  searchLabel: 'Search the guide',
  searchText: 'Search fees, shipping, stores...',
  home: 'Home',
  popularStores: 'Popular stores',
  'sec.news': 'News & Updates',
  'sec.getting-started': 'Getting Started & Services',
  'sec.shipping': 'International Shipping Tips',
  'sec.country-guide': 'Country Guide',
  'sec.shopping-tips': 'Shopping Tips',
  'sec.what-to-buy': 'What to Buy',
  ctaTitle: 'Ready to start?',
  ctaButton: 'Create a request',
  ctaText: 'Add your Buy For Me link, or contact us with any questions.',
  ctaDisclaimer:
    'We do our best to keep this guide accurate and up to date, but customs rules change often and mistakes can happen. For the final and most accurate information, please confirm with your customs authority before you request our services.',
  reportTitle: 'Spotted something wrong?',
  reportText: 'Let us know. The first person to report an error that we correct gets a $10 coupon.',
  policiesTitle: 'Our services are governed by these policies:',
  tos: 'Terms of Service',
  privacy: 'Privacy Policy',
  shippingPolicy: 'Shipping Policy',
  refundPolicy: 'Refund Policy',
  followA: 'Follow us on',
  followAnd: 'and',
  followB: '',
  translatedNote: 'This page was translated from English. If anything differs, the English version applies.',
  translatedLink: 'Read in English',
};
type Dict = typeof en;

const es: Dict = {
  contact: 'Contáctanos',
  goTo: 'Ir a KoreaHaul',
  searchLabel: 'Buscar en la guía',
  searchText: 'Busca tarifas, envíos, tiendas...',
  home: 'Inicio',
  popularStores: 'Tiendas populares',
  'sec.news': 'Noticias y novedades',
  'sec.getting-started': 'Primeros pasos y servicios',
  'sec.shipping': 'Consejos de envío internacional',
  'sec.country-guide': 'Guía por país',
  'sec.shopping-tips': 'Consejos de compra',
  'sec.what-to-buy': 'Qué comprar',
  ctaTitle: '¿Listo para empezar?',
  ctaButton: 'Crear una solicitud',
  ctaText: 'Agrega tu enlace de Buy For Me o contáctanos si tienes alguna pregunta.',
  ctaDisclaimer:
    'Hacemos todo lo posible para que esta guía sea precisa y esté actualizada, pero las normas aduaneras cambian a menudo y pueden ocurrir errores. Para obtener la información final y más precisa, confirma con la autoridad aduanera de tu país antes de solicitar nuestros servicios.',
  reportTitle: '¿Encontraste un error?',
  reportText: 'Avísanos. La primera persona que reporte un error que corrijamos recibe un cupón de $10.',
  policiesTitle: 'Nuestros servicios se rigen por estas políticas:',
  tos: 'Términos del servicio',
  privacy: 'Política de privacidad',
  shippingPolicy: 'Política de envío',
  refundPolicy: 'Política de reembolso',
  followA: 'Síguenos en',
  followAnd: 'y',
  followB: '',
  translatedNote: 'Esta página fue traducida del inglés. Si algo no coincide, se aplica la versión en inglés.',
  translatedLink: 'Leer en inglés',
};

const ja: Dict = {
  contact: 'お問い合わせ',
  goTo: 'KoreaHaulへ',
  searchLabel: 'ガイドを検索',
  searchText: '料金、配送、ショップを検索...',
  home: 'ホーム',
  popularStores: '人気のショップ',
  'sec.news': 'ニュースとお知らせ',
  'sec.getting-started': 'はじめに・サービス',
  'sec.shipping': '国際配送のヒント',
  'sec.country-guide': '国別ガイド',
  'sec.shopping-tips': 'ショッピングのヒント',
  'sec.what-to-buy': 'おすすめの商品',
  ctaTitle: 'さっそく始めましょう',
  ctaButton: 'リクエストを作成',
  ctaText: 'Buy For Meのリンクを追加するか、ご質問があればお問い合わせください。',
  ctaDisclaimer:
    '本ガイドは正確で最新の内容になるよう努めていますが、税関の規則は頻繁に変わり、誤りが含まれる場合もあります。最終的で最も正確な情報については、サービスをご依頼になる前に、お住まいの国の税関にご確認ください。',
  reportTitle: '誤りを見つけましたか？',
  reportText: 'ぜひお知らせください。私たちが修正した誤りを最初に報告してくださった方に、$10のクーポンを差し上げます。',
  policiesTitle: '当社のサービスには以下のポリシーが適用されます：',
  tos: '利用規約',
  privacy: 'プライバシーポリシー',
  shippingPolicy: '配送ポリシー',
  refundPolicy: '返金ポリシー',
  followA: '',
  followAnd: 'と',
  followB: 'でフォローしてください',
  translatedNote: 'このページは英語から翻訳されています。内容に相違がある場合は、英語版が優先されます。',
  translatedLink: '英語で読む',
};

const zhCN: Dict = {
  contact: '联系我们',
  goTo: '前往 KoreaHaul',
  searchLabel: '搜索指南',
  searchText: '搜索费用、运输、商店...',
  home: '首页',
  popularStores: '热门商店',
  'sec.news': '新闻与公告',
  'sec.getting-started': '入门与服务',
  'sec.shipping': '国际运输指南',
  'sec.country-guide': '国家/地区指南',
  'sec.shopping-tips': '购物技巧',
  'sec.what-to-buy': '选购推荐',
  ctaTitle: '准备好开始了吗？',
  ctaButton: '创建请求',
  ctaText: '添加您的 Buy For Me 链接，或在有任何问题时联系我们。',
  ctaDisclaimer:
    '我们会尽力确保本指南准确且及时更新，但海关规定经常变化，也可能出现错误。如需最终且最准确的信息，请在申请我们的服务前向您所在国家/地区的海关确认。',
  reportTitle: '发现错误了吗？',
  reportText: '请告诉我们。第一位报告错误并经我们更正的用户将获得一张 $10 优惠券。',
  policiesTitle: '我们的服务受以下政策约束：',
  tos: '服务条款',
  privacy: '隐私政策',
  shippingPolicy: '运输政策',
  refundPolicy: '退款政策',
  followA: '在',
  followAnd: '和',
  followB: '上关注我们',
  translatedNote: '本页面译自英文。如有任何不一致，以英文版本为准。',
  translatedLink: '阅读英文版',
};

const ptBR: Dict = {
  contact: 'Fale conosco',
  goTo: 'Ir para a KoreaHaul',
  searchLabel: 'Pesquisar no guia',
  searchText: 'Pesquise taxas, envio, lojas...',
  home: 'Início',
  popularStores: 'Lojas populares',
  'sec.news': 'Notícias e atualizações',
  'sec.getting-started': 'Primeiros passos e serviços',
  'sec.shipping': 'Dicas de envio internacional',
  'sec.country-guide': 'Guia por país',
  'sec.shopping-tips': 'Dicas de compras',
  'sec.what-to-buy': 'O que comprar',
  ctaTitle: 'Pronto para começar?',
  ctaButton: 'Criar uma solicitação',
  ctaText: 'Adicione seu link do Buy For Me ou fale conosco se tiver alguma dúvida.',
  ctaDisclaimer:
    'Fazemos o possível para manter este guia correto e atualizado, mas as regras alfandegárias mudam com frequência e erros podem acontecer. Para obter a informação final e mais precisa, confirme com a autoridade alfandegária do seu país antes de solicitar nossos serviços.',
  reportTitle: 'Encontrou algo errado?',
  reportText: 'Avise a gente. A primeira pessoa a informar um erro que corrigirmos ganha um cupom de $10.',
  policiesTitle: 'Nossos serviços são regidos por estas políticas:',
  tos: 'Termos de Serviço',
  privacy: 'Política de Privacidade',
  shippingPolicy: 'Política de Envio',
  refundPolicy: 'Política de Reembolso',
  followA: 'Siga a gente no',
  followAnd: 'e no',
  followB: '',
  translatedNote: 'Esta página foi traduzida do inglês. Se houver alguma diferença, vale a versão em inglês.',
  translatedLink: 'Ler em inglês',
};

const fr: Dict = {
  contact: 'Nous contacter',
  goTo: 'Aller sur KoreaHaul',
  searchLabel: 'Rechercher dans le guide',
  searchText: 'Rechercher frais, expédition, boutiques...',
  home: 'Accueil',
  popularStores: 'Boutiques populaires',
  'sec.news': 'Actualités',
  'sec.getting-started': 'Premiers pas et services',
  'sec.shipping': "Conseils d'expédition internationale",
  'sec.country-guide': 'Guide par pays',
  'sec.shopping-tips': "Conseils d'achat",
  'sec.what-to-buy': 'Quoi acheter',
  ctaTitle: 'Prêt à commencer ?',
  ctaButton: 'Créer une demande',
  ctaText: 'Ajoutez votre lien Buy For Me, ou contactez-nous pour toute question.',
  ctaDisclaimer:
    "Nous faisons de notre mieux pour que ce guide reste exact et à jour, mais les règles douanières changent souvent et des erreurs peuvent se produire. Pour obtenir l'information finale et la plus précise, veuillez vérifier auprès de votre autorité douanière avant de faire appel à nos services.",
  reportTitle: 'Vous avez repéré une erreur ?',
  reportText: "Dites-le-nous. La première personne qui signale une erreur que nous corrigeons reçoit un coupon de $10.",
  policiesTitle: 'Nos services sont régis par ces politiques :',
  tos: "Conditions d'utilisation",
  privacy: 'Politique de confidentialité',
  shippingPolicy: "Politique d'expédition",
  refundPolicy: 'Politique de remboursement',
  followA: 'Suivez-nous sur',
  followAnd: 'et',
  followB: '',
  translatedNote: "Cette page a été traduite de l'anglais. En cas de différence, la version anglaise s'applique.",
  translatedLink: 'Lire en anglais',
};

const de: Dict = {
  contact: 'Kontakt',
  goTo: 'Zu KoreaHaul',
  searchLabel: 'Im Guide suchen',
  searchText: 'Gebühren, Versand, Shops suchen...',
  home: 'Startseite',
  popularStores: 'Beliebte Shops',
  'sec.news': 'Neuigkeiten',
  'sec.getting-started': 'Erste Schritte und Services',
  'sec.shipping': 'Tipps zum internationalen Versand',
  'sec.country-guide': 'Länderguide',
  'sec.shopping-tips': 'Einkaufstipps',
  'sec.what-to-buy': 'Was kaufen',
  ctaTitle: 'Bereit loszulegen?',
  ctaButton: 'Anfrage erstellen',
  ctaText: 'Fügen Sie Ihren Buy For Me Link hinzu oder kontaktieren Sie uns bei Fragen.',
  ctaDisclaimer:
    'Wir tun unser Bestes, um diesen Guide korrekt und aktuell zu halten, aber Zollvorschriften ändern sich oft und Fehler können vorkommen. Die endgültigen und genauesten Informationen erhalten Sie bei Ihrer Zollbehörde. Bitte prüfen Sie diese, bevor Sie unsere Services beauftragen.',
  reportTitle: 'Einen Fehler entdeckt?',
  reportText: 'Sagen Sie uns Bescheid. Die erste Person, die einen Fehler meldet, den wir korrigieren, erhält einen $10 Gutschein.',
  policiesTitle: 'Für unsere Services gelten diese Richtlinien:',
  tos: 'Nutzungsbedingungen',
  privacy: 'Datenschutzrichtlinie',
  shippingPolicy: 'Versandrichtlinie',
  refundPolicy: 'Erstattungsrichtlinie',
  followA: 'Folgen Sie uns auf',
  followAnd: 'und',
  followB: '',
  translatedNote: 'Diese Seite wurde aus dem Englischen übersetzt. Bei Abweichungen gilt die englische Version.',
  translatedLink: 'Auf Englisch lesen',
};

const DICTS: Record<string, Dict> = { en, es, ja, 'zh-cn': zhCN, 'pt-br': ptBR, fr, de };

/** Locale key ('es', 'zh-cn', ...) or undefined for English. */
export function localeOf(locale: string | undefined) {
  return locale && locale in DICTS && locale !== 'en' ? locale : undefined;
}

export function useT(locale: string | undefined) {
  const d = DICTS[localeOf(locale) ?? 'en'];
  return (key: keyof Dict) => d[key];
}

/** Prefix an internal path like '/getting-started/fees/' with the locale. */
export function localePath(path: string, locale: string | undefined) {
  const l = localeOf(locale);
  return l ? `/${l}${path}` : path;
}

/** Sidebar group label translations, keyed by the English label. */
export const SIDEBAR: Record<string, Record<string, string>> = {
  Home: { es: 'Inicio', ja: 'ホーム', 'zh-CN': '首页', 'pt-BR': 'Início', fr: 'Accueil', de: 'Startseite' },
  'News & Updates': { es: es['sec.news'], ja: ja['sec.news'], 'zh-CN': zhCN['sec.news'], 'pt-BR': ptBR['sec.news'], fr: fr['sec.news'], de: de['sec.news'] },
  'Getting Started & Services': { es: es['sec.getting-started'], ja: ja['sec.getting-started'], 'zh-CN': zhCN['sec.getting-started'], 'pt-BR': ptBR['sec.getting-started'], fr: fr['sec.getting-started'], de: de['sec.getting-started'] },
  'International Shipping Tips': { es: es['sec.shipping'], ja: ja['sec.shipping'], 'zh-CN': zhCN['sec.shipping'], 'pt-BR': ptBR['sec.shipping'], fr: fr['sec.shipping'], de: de['sec.shipping'] },
  'Country Guide': { es: es['sec.country-guide'], ja: ja['sec.country-guide'], 'zh-CN': zhCN['sec.country-guide'], 'pt-BR': ptBR['sec.country-guide'], fr: fr['sec.country-guide'], de: de['sec.country-guide'] },
  'Shopping Tips': { es: es['sec.shopping-tips'], ja: ja['sec.shopping-tips'], 'zh-CN': zhCN['sec.shopping-tips'], 'pt-BR': ptBR['sec.shopping-tips'], fr: fr['sec.shopping-tips'], de: de['sec.shopping-tips'] },
  'What to Buy': { es: es['sec.what-to-buy'], ja: ja['sec.what-to-buy'], 'zh-CN': zhCN['sec.what-to-buy'], 'pt-BR': ptBR['sec.what-to-buy'], fr: fr['sec.what-to-buy'], de: de['sec.what-to-buy'] },
  Overview: { es: 'Resumen', ja: '概要', 'zh-CN': '概览', 'pt-BR': 'Visão geral', fr: 'Aperçu', de: 'Überblick' },
  Asia: { es: 'Asia', ja: 'アジア', 'zh-CN': '亚洲', 'pt-BR': 'Ásia', fr: 'Asie', de: 'Asien' },
  Oceania: { es: 'Oceanía', ja: 'オセアニア', 'zh-CN': '大洋洲', 'pt-BR': 'Oceania', fr: 'Océanie', de: 'Ozeanien' },
  'North America': { es: 'Norteamérica', ja: '北米', 'zh-CN': '北美洲', 'pt-BR': 'América do Norte', fr: 'Amérique du Nord', de: 'Nordamerika' },
  'South America': { es: 'Sudamérica', ja: '南米', 'zh-CN': '南美洲', 'pt-BR': 'América do Sul', fr: 'Amérique du Sud', de: 'Südamerika' },
  Europe: { es: 'Europa', ja: 'ヨーロッパ', 'zh-CN': '欧洲', 'pt-BR': 'Europa', fr: 'Europe', de: 'Europa' },
  Stores: { es: 'Tiendas', ja: 'ショップ', 'zh-CN': '商店', 'pt-BR': 'Lojas', fr: 'Boutiques', de: 'Shops' },
};
