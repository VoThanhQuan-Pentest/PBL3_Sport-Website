document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = '/api';
    const TOKEN_KEY = 'pbl3_token';
    const USER_KEY = 'pbl3_user';
    const CART_KEY = 'pbl3_cart';
    const WISHLIST_KEY = 'pbl3_wishlist';
    const ADDRESS_BOOK_KEY = 'pbl3_address_book';
    const ORDER_HISTORY_KEY = 'pbl3_order_history';
    const ORDER_DATA_RESET_VERSION = '2026-04-23-sample-orders-v1';
    const ANALYTICS_SESSION_KEY = 'pbl3_analytics_session';
    const LOCAL_ANALYTICS_EVENTS_KEY = 'pbl3_local_behavior_events';
    const HOME_SHOWCASE_STORAGE_KEY = 'pbl3_home_showcase_visible';
    const RECOMMENDATION_CACHE_KEY = 'pbl3_recommendation_cache_v1';
    const RECOMMENDATION_CACHE_TTL_MS = 2 * 60 * 60 * 1000;
    const PASSWORD_RULE_MESSAGE = 'Mật khẩu phải có chữ hoa, chữ thường, chữ số và ký tự đặc biệt như @ hoặc #.';
    const PAYMENT_STATUS_PENDING_COD = 'Chờ khách trả tiền khi nhận hàng';
    const PAYMENT_STATUS_DELIVERED_WAITING_CONFIRMATION = 'Đã giao - chờ nhân viên xác nhận đã thu tiền';
    const PAYMENT_STATUS_PAID = 'Thanh toán thành công';
    const PAYMENT_STATUS_CANCELLED = 'Không ghi nhận thanh toán';

    const VOUCHER_KEY = 'pbl3_voucher';
    const MANAGED_VOUCHERS_KEY = 'pbl3_managed_vouchers';
    const MANAGED_VOUCHERS_VERSION_KEY = 'pbl3_managed_vouchers_version';
    const MANAGED_VOUCHERS_VERSION = '2026-04-30-category-expiry-v1';
    const VOUCHER_ASSIGNMENTS_KEY = 'pbl3_voucher_assignments';
    const VOUCHER_ASSIGNMENTS_VERSION_KEY = 'pbl3_voucher_assignments_version';
    const VOUCHER_ASSIGNMENTS_VERSION = '2026-05-07-account-voucher-quantity-v1';
    const DEFAULT_VOUCHER_ASSIGNMENT_QUANTITY = 1;
    const PROMO_HUNT_KEY = 'pbl3_promo_hunt_campaigns';
    const PROMO_HUNT_CLAIMS_KEY = 'pbl3_promo_hunt_claims';
    const PROMO_HUNT_VERSION_KEY = 'pbl3_promo_hunt_version';
    const PROMO_HUNT_VERSION = '2026-05-07-promo-hunt-v1';
    const AVAILABLE_VOUCHERS = [
        {
            code: 'HOTDEAL10',
            label: 'Giảm 10%',
            percent: 0.10,
            minOrder: 600000,
            maxDiscount: 120000,
            categories: ['Tất cả'],
            expiresAt: '2026-06-30',
            status: 'Hoạt động'
        },
        {
            code: 'SEAGAMES15',
            label: 'Giảm 15%',
            percent: 0.15,
            minOrder: 1200000,
            maxDiscount: 220000,
            categories: ['Bóng đá', 'Bóng chuyền', 'Bóng rổ', 'Bóng bàn', 'Cầu lông'],
            expiresAt: '2026-05-31',
            status: 'Hoạt động'
        },
        {
            code: 'SPORT25',
            label: 'Giảm 25%',
            percent: 0.25,
            minOrder: 2000000,
            maxDiscount: 350000,
            categories: ['Tất cả'],
            expiresAt: '2026-07-31',
            status: 'Hoạt động'
        },
        {
            code: 'FOOTBALL12',
            label: 'Giảm 12% cho bóng đá',
            percent: 0.12,
            minOrder: 500000,
            maxDiscount: 180000,
            categories: ['Bóng đá'],
            expiresAt: '2026-06-15',
            status: 'Hoạt động'
        },
        {
            code: 'VOLLEY10',
            label: 'Giảm 10% cho bóng chuyền',
            percent: 0.10,
            minOrder: 450000,
            maxDiscount: 150000,
            categories: ['Bóng chuyền'],
            expiresAt: '2026-06-20',
            status: 'Hoạt động'
        },
        {
            code: 'BASKET15',
            label: 'Giảm 15% cho bóng rổ',
            percent: 0.15,
            minOrder: 800000,
            maxDiscount: 240000,
            categories: ['Bóng rổ'],
            expiresAt: '2026-06-25',
            status: 'Hoạt động'
        },
        {
            code: 'TABLE08',
            label: 'Giảm 8% cho bóng bàn',
            percent: 0.08,
            minOrder: 400000,
            maxDiscount: 120000,
            categories: ['Bóng bàn'],
            expiresAt: '2026-06-10',
            status: 'Hoạt động'
        },
        {
            code: 'BADMINTON12',
            label: 'Giảm 12% cho cầu lông',
            percent: 0.12,
            minOrder: 500000,
            maxDiscount: 170000,
            categories: ['Cầu lông'],
            expiresAt: '2026-06-18',
            status: 'Hoạt động'
        },
        {
            code: 'RUNGYM18',
            label: 'Giảm 18% cho chạy bộ và tập gym',
            percent: 0.18,
            minOrder: 700000,
            maxDiscount: 260000,
            categories: ['Chạy bộ', 'Tập gym'],
            expiresAt: '2026-07-15',
            status: 'Hoạt động'
        },
        {
            code: 'APRILSALE',
            label: 'Ưu đãi tháng 4 đã hết hạn',
            percent: 0.20,
            minOrder: 500000,
            maxDiscount: 200000,
            categories: ['Tất cả'],
            expiresAt: '2026-04-20',
            status: 'Hoạt động'
        }
    ];

    const ADDRESS_STREET_RULES = [
        {
            provinces: ['Đà Nẵng'],
            wards: ['Hải Châu', 'Thạch Thang', 'Hòa Cường', 'Thanh Bình', 'Phước Ninh'],
            streets: ['Bạch Đằng', 'Trần Phú', 'Lê Lợi', 'Hùng Vương', 'Nguyễn Chí Thanh', 'Hoàng Diệu', 'Ông Ích Khiêm', 'Nguyễn Văn Linh']
        },
        {
            provinces: ['Đà Nẵng'],
            wards: ['Thanh Khê', 'Xuân Hà', 'Tam Thuận', 'Chính Gián', 'An Khê'],
            streets: ['Nguyễn Tất Thành', 'Điện Biên Phủ', 'Hà Huy Tập', 'Lê Độ', 'Trần Cao Vân', 'Nguyễn Tri Phương', 'Dũng Sĩ Thanh Khê']
        },
        {
            provinces: ['Đà Nẵng'],
            wards: ['Sơn Trà', 'An Hải', 'Mân Thái', 'Thọ Quang', 'Nại Hiên Đông'],
            streets: ['Ngô Quyền', 'Võ Nguyên Giáp', 'Hoàng Sa', 'Lê Văn Duyệt', 'Nguyễn Công Trứ', 'Phạm Văn Đồng', 'Hồ Nghinh']
        },
        {
            provinces: ['Đà Nẵng'],
            wards: ['Cẩm Lệ', 'Hòa Xuân', 'Khuê Trung', 'Hòa Thọ', 'Hòa An'],
            streets: ['Cách Mạng Tháng Tám', 'Nguyễn Hữu Thọ', 'Lê Đại Hành', 'Ông Ích Đường', 'Trường Sơn', 'Võ Chí Công']
        },
        {
            provinces: ['Đà Nẵng'],
            streets: ['2 Tháng 9', '30 Tháng 4', 'Nguyễn Văn Linh', 'Nguyễn Tất Thành', 'Điện Biên Phủ', 'Lê Duẩn', 'Trường Chinh', 'Tôn Đức Thắng']
        },
        {
            provinces: ['Hà Nội'],
            wards: ['Hoàn Kiếm', 'Hàng Bạc', 'Hàng Bông', 'Cửa Nam', 'Tràng Tiền'],
            streets: ['Hàng Bài', 'Tràng Tiền', 'Đinh Tiên Hoàng', 'Lý Thường Kiệt', 'Hai Bà Trưng', 'Phan Chu Trinh', 'Bà Triệu']
        },
        {
            provinces: ['Hà Nội'],
            wards: ['Cầu Giấy', 'Dịch Vọng', 'Quan Hoa', 'Yên Hòa', 'Nghĩa Đô'],
            streets: ['Xuân Thủy', 'Cầu Giấy', 'Trần Thái Tông', 'Duy Tân', 'Trung Kính', 'Nguyễn Phong Sắc', 'Hoàng Quốc Việt']
        },
        {
            provinces: ['Hà Nội'],
            wards: ['Đống Đa', 'Láng', 'Ô Chợ Dừa', 'Kim Liên', 'Văn Miếu'],
            streets: ['Tôn Đức Thắng', 'Nguyễn Lương Bằng', 'Tây Sơn', 'Chùa Bộc', 'Xã Đàn', 'Phạm Ngọc Thạch', 'Giảng Võ']
        },
        {
            provinces: ['Hà Nội'],
            streets: ['Giải Phóng', 'Nguyễn Trãi', 'Láng Hạ', 'Kim Mã', 'Phạm Văn Đồng', 'Võ Chí Công', 'Trần Duy Hưng', 'Lê Văn Lương']
        },
        {
            provinces: ['Hồ Chí Minh', 'TP Hồ Chí Minh', 'Thành phố Hồ Chí Minh'],
            wards: ['Bến Nghé', 'Sài Gòn', 'Bến Thành', 'Tân Định', 'Cầu Ông Lãnh'],
            streets: ['Đồng Khởi', 'Nguyễn Huệ', 'Lê Lợi', 'Hai Bà Trưng', 'Nam Kỳ Khởi Nghĩa', 'Pasteur', 'Lê Thánh Tôn']
        },
        {
            provinces: ['Hồ Chí Minh', 'TP Hồ Chí Minh', 'Thành phố Hồ Chí Minh'],
            wards: ['Phú Nhuận', 'Gia Định', 'Tân Sơn Hòa', 'Tân Sơn Nhất'],
            streets: ['Phan Đăng Lưu', 'Hoàng Văn Thụ', 'Nguyễn Văn Trỗi', 'Phan Xích Long', 'Trường Sa', 'Nguyễn Kiệm']
        },
        {
            provinces: ['Hồ Chí Minh', 'TP Hồ Chí Minh', 'Thành phố Hồ Chí Minh'],
            streets: ['Võ Văn Kiệt', 'Điện Biên Phủ', 'Nguyễn Văn Linh', 'Cách Mạng Tháng Tám', 'Trường Chinh', 'Xa lộ Hà Nội', 'Phạm Văn Đồng']
        }
    ];

    const PRODUCT_PROMOTION_MAP = {
        'FB-010': 10,
        'FB-011': 15,
        'FB-013': 8,
        'FB-017': 12,
        'FB-019': 10,
        'FB-028': 5,
        'VB-011': 10,
        'VB-012': 12,
        'VB-015': 8,
        'VB-017': 15,
        'VB-018': 10,
        'BB-010': 9,
        'BB-011': 12,
        'BB-021': 10,
        'BB-024': 8,
        'TT-018': 8,
        'TT-028': 15,
        'TT-029': 10,
        'BM-014': 10,
        'BM-015': 12,
        'BM-023': 8,
        'BM-024': 8
    };

    const SPORT_SECTIONS = normalizePayload([
        {
            sport: 'Bóng đá',
            icon: 'fa-futbol',
            items: [
                { id: 'football-ball', label: 'Bóng thi đấu', panels: ['sports'], keywords: ['bong', 'numero'], exclude: ['giay', 'ao ', 'quan ', 'balo', 'tui', 'ong dong', 'gang tay', 'backpack', 'duffel', 'tat ', 'khan lau', 'towel'] },
                { id: 'football-shoes', label: 'Giày bóng đá', panels: ['sports', 'accessories'], keywords: ['giay'] },
                { id: 'football-apparel', label: 'Quần áo', panels: ['sports', 'apparel'], keywords: ['ao ', 'jersey', 'drill top', 'training pants', 'training jersey', 'quan '] },
                { id: 'football-gloves', label: 'Găng tay', panels: ['accessories'], keywords: ['gang tay'] },
                { id: 'football-shinguards', label: 'Bịt ống đồng', panels: ['accessories'], keywords: ['ong dong', 'guard'] },
                { id: 'football-socks', label: 'Tất bóng đá', panels: ['accessories'], keywords: ['tat '] },
                { id: 'football-towels', label: 'Khăn lau', panels: ['accessories'], keywords: ['khan lau', 'towel'] },
                { id: 'football-backpacks', label: 'Balo thể thao', panels: ['accessories'], keywords: ['balo', 'backpack', 'tui', 'duffel'] }
            ]
        },
        {
            sport: 'Bóng chuyền',
            icon: 'fa-volleyball',
            items: [
                { id: 'volleyball-ball', label: 'Bóng thi đấu', panels: ['sports'], keywords: ['bong'], exclude: ['giay', 'ao ', 'quan ', 'bao ve goi', 'kneepad', 'tat ', 'balo', 'backpack', 'tui', 'khan lau', 'towel'] },
                { id: 'volleyball-shoes', label: 'Giày bóng chuyền', panels: ['sports', 'accessories'], keywords: ['giay'] },
                { id: 'volleyball-apparel', label: 'Quần áo', panels: ['sports', 'apparel'], keywords: ['ao ', 'jersey', 'quan '] },
                { id: 'volleyball-kneepads', label: 'Bảo vệ gối', panels: ['accessories'], keywords: ['bao ve goi', 'kneepad'] },
                { id: 'volleyball-socks', label: 'Tất bóng chuyền', panels: ['accessories'], keywords: ['tat '] },
                { id: 'volleyball-towels', label: 'Khăn lau', panels: ['accessories'], keywords: ['khan lau', 'towel'] },
                { id: 'volleyball-backpacks', label: 'Balo thể thao', panels: ['accessories'], keywords: ['balo', 'backpack', 'tui'] }
            ]
        },
        {
            sport: 'Bóng rổ',
            icon: 'fa-basketball',
            items: [
                { id: 'basketball-ball', label: 'Bóng thi đấu', panels: ['sports'], keywords: ['bong'], exclude: ['giay', 'ao ', 'balo', 'ong tay', 'tat ', 'mini hoop', 'backpack', 'khan lau', 'towel'] },
                { id: 'basketball-shoes', label: 'Giày bóng rổ', panels: ['sports', 'accessories'], keywords: ['giay'] },
                { id: 'basketball-apparel', label: 'Quần áo', panels: ['sports', 'apparel'], keywords: ['ao ', 'sleeveless', 'jersey'] },
                { id: 'basketball-socks', label: 'Tất bóng rổ', panels: ['accessories'], keywords: ['tat '] },
                { id: 'basketball-arm-sleeves', label: 'Ống tay', panels: ['accessories'], keywords: ['ong tay', 'arm sleeve'] },
                { id: 'basketball-towels', label: 'Khăn lau', panels: ['accessories'], keywords: ['khan lau', 'towel'] },
                { id: 'basketball-backpacks', label: 'Balo thể thao', panels: ['accessories'], keywords: ['balo', 'backpack'] },
                { id: 'basketball-training-gear', label: 'Phụ kiện tập luyện', panels: ['accessories'], keywords: ['mini hoop'] }
            ]
        },
        {
            sport: 'Bóng bàn',
            icon: 'fa-table-tennis-paddle-ball',
            items: [
                { id: 'tabletennis-racket', label: 'Vợt bóng bàn', panels: ['sports'], keywords: ['vot'] },
                { id: 'tabletennis-rubber', label: 'Mặt vợt', panels: ['sports', 'accessories'], keywords: ['mat vot'] },
                { id: 'tabletennis-ball', label: 'Bóng thi đấu', panels: ['sports', 'accessories'], keywords: ['bong bong ban', 'premium 40', 'dj40', 'r40'] },
                { id: 'tabletennis-accessories', label: 'Phụ kiện bóng bàn', panels: ['sports', 'accessories'], keywords: ['luoi', 'keo'] },
                { id: 'tabletennis-apparel', label: 'Quần áo', panels: ['apparel'], keywords: ['shirt', 'polo'] }
            ]
        },
        {
            sport: 'Cầu lông',
            icon: 'fa-shuttlecock',
            items: [
                { id: 'badminton-racket', label: 'Vợt cầu lông', panels: ['sports'], keywords: ['vot'] },
                { id: 'badminton-shuttlecock', label: 'Cầu thi đấu', panels: ['sports', 'accessories'], keywords: ['cau long', 'aerosensa', 'mavis', 'master ace', 'no.1'], exclude: ['vot', 'giay', 'cuoc', 'quan can', 'tui'] },
                { id: 'badminton-shoes', label: 'Giày cầu lông', panels: ['sports'], keywords: ['giay'] },
                { id: 'badminton-strings', label: 'Cước và quấn cán', panels: ['sports', 'accessories'], keywords: ['cuoc', 'quan can'] },
                { id: 'badminton-accessories', label: 'Túi và phụ kiện', panels: ['sports', 'accessories'], keywords: ['tui'] },
                { id: 'badminton-apparel', label: 'Quần áo', panels: ['apparel'], keywords: ['shirt', 'shorts'] }
            ]
        }
    ]);

    const COLLECTION_SECTIONS = normalizePayload([
        {
            id: 'hot',
            label: 'Sản phẩm hot',
            eyebrow: 'Xu hướng nổi bật',
            icon: 'fa-fire-flame-curved',
            breadcrumb: 'Trang chủ / Sản phẩm hot',
            description: 'Tuyển chọn các dòng nổi bật đang được hãng đẩy mạnh hoặc xuất hiện trong nhóm top seller, official game ball và current lineup.'
        },
        {
            id: 'shock-sale',
            label: 'Giảm giá cực sâu',
            eyebrow: 'Deal trong ngày',
            icon: 'fa-tags',
            breadcrumb: 'Trang chủ / Giảm giá cực sâu',
            description: 'Tập hợp các mẫu đang bám theo các trang sale, markdown hoặc ưu đãi rõ ràng từ hãng để người dùng săn deal nhanh.'
        },
        {
            id: 'worldcup-2026',
            label: 'WorldCup 2026',
            eyebrow: 'Không khí bóng đá',
            icon: 'fa-trophy',
            breadcrumb: 'Trang chủ / WorldCup 2026',
            description: 'Bộ sưu tập theo tinh thần World Cup: giày, bóng, áo tập và phụ kiện bóng đá từ các line thi đấu và training nổi bật.'
        },
        {
            id: 'seagames-2025',
            label: 'SEAGAMES 2025',
            eyebrow: 'Bộ sưu tập thi đấu',
            icon: 'fa-medal',
            breadcrumb: 'Trang chủ / SEAGAMES 2025',
            description: 'Bộ sưu tập gợi ý theo tinh thần SEA Games, ưu tiên trang phục thi đấu, giày indoor court và phụ kiện vận động viên. Đây là collection biên tập theo ngữ cảnh thi đấu, không phải nhãn chính thức của hãng.'
        },
        {
            id: 'superstar-signatures',
            label: 'Chữ ký siêu sao',
            eyebrow: 'Memorabilia cao cấp',
            icon: 'fa-signature',
            breadcrumb: 'Trang chủ / Chữ ký siêu sao',
            description: 'Tập hợp các sản phẩm sưu tầm có chữ ký của những siêu sao nổi bật trong từng bộ môn. Đây là dòng premium thiên về trưng bày, quà tặng và sưu tầm.'
        }
    ]);

    const COLLECTION_PRODUCT_MAP = {
        hot: [
            'FB-027',
            'FB-010',
            'FB-011',
            'VB-002',
            'VB-011',
            'BM-022',
            'BM-005',
            'TT-017'
        ],
        'shock-sale': [
            'FB-010',
            'FB-011',
            'FB-013',
            'FB-017',
            'FB-019',
            'TT-028'
        ],
        'worldcup-2026': [
            'FB-007',
            'FB-008',
            'FB-009',
            'FB-010',
            'FB-011',
            'FB-012',
            'FB-013',
            'FB-014',
            'FB-015',
            'FB-016',
            'FB-017',
            'FB-018',
            'FB-020',
            'FB-023',
            'FB-025',
            'FB-026',
            'FB-027'
        ],
        'seagames-2025': [
            'VB-010',
            'VB-011',
            'VB-012',
            'VB-015',
            'VB-016',
            'VB-017',
            'VB-018',
            'VB-027',
            'BM-014',
            'BM-015',
            'BM-023',
            'BM-024',
            'TT-028',
            'TT-029',
            'BB-021',
            'BB-024'
        ],
        'superstar-signatures': [
            'FB-132',
            'FB-133',
            'FB-134',
            'FB-135',
            'BB-126',
            'BB-127',
            'VB-129',
            'VB-130',
            'TT-130',
            'TT-131',
            'BM-128',
            'BM-129'
        ]
    };

    const SEARCH_SUGGESTION_LIMIT = 6;
    const SEARCH_FALLBACK_LIMIT = 6;

    const productContainer = document.getElementById('product-container');
    const navCollectionLinks = Array.from(document.querySelectorAll('#nav a[data-collection]'));
    const promoHuntLink = document.getElementById('promo-hunt-link');
    const searchBox = document.getElementById('search_box');
    const searchInput = document.getElementById('search-input');
    const searchSubmitButton = searchBox?.querySelector('button') || null;
    let searchSuggestions = document.getElementById('search-suggestions');
    if (!searchSuggestions && searchBox) {
        searchSuggestions = document.createElement('div');
        searchSuggestions.id = 'search-suggestions';
        searchSuggestions.className = 'search-suggestions hidden';
        searchSuggestions.setAttribute('aria-live', 'polite');
        searchBox.appendChild(searchSuggestions);
    }
    const banner = document.getElementById('banner');
    const accountIcon = document.getElementById('account-icon');
    const cartLink = document.getElementById('cart-link');
    const cartCount = document.getElementById('cart-count');
    const wishlistLink = document.getElementById('wishlist-link');
    const wishlistCount = document.getElementById('wishlist-count');
    const catalogTrigger = document.getElementById('catalog-trigger');
    const clearFiltersButton = document.getElementById('clear-filters');
    const activeFilters = document.getElementById('active-filters');
    const catalogToolbar = document.getElementById('catalog-toolbar');
    const catalogTitle = document.getElementById('catalog-title');
    const catalogDescription = document.getElementById('catalog-description');
    const catalogCount = document.getElementById('catalog-count');
    const collectionView = document.getElementById('collection-view');
    const collectionBreadcrumb = document.getElementById('collection-breadcrumb');
    const collectionShortcuts = document.getElementById('collection-shortcuts');
    const collectionEyebrow = document.getElementById('collection-eyebrow');
    const collectionTitle = document.getElementById('collection-title');
    const collectionDescription = document.getElementById('collection-description');
    const collectionCount = document.getElementById('collection-count');
    const promoHuntView = document.getElementById('promo-hunt-view');
    const promoHuntGrid = document.getElementById('promo-hunt-grid');
    const promoHuntCount = document.getElementById('promo-hunt-count');
    const homeSaleShowcase = document.getElementById('home-sale-showcase');
    const homeSaleTrack = document.getElementById('home-sale-track');
    const homeSaleDots = document.getElementById('home-sale-dots');
    const homeFeatureStrip = document.getElementById('home-feature-strip');
    const personalizedHomeView = document.getElementById('personalized-home-view');
    const personalizedHomeGrid = document.getElementById('personalized-home-grid');
    const personalizedHomeChip = document.getElementById('personalized-home-chip');
    const personalizedHomeCount = document.getElementById('personalized-home-count');
    const homePersonalizedPriceFilter = document.getElementById('home-personalized-price-filter');
    const homePersonalizedTypeFilter = document.getElementById('home-personalized-type-filter');
    const homePersonalizedBrandFilter = document.getElementById('home-personalized-brand-filter');
    const homePersonalizedSizeFilter = document.getElementById('home-personalized-size-filter');
    const homePersonalizedSortFilter = document.getElementById('home-personalized-sort-filter');
    const priceFilter = document.getElementById('price-filter');
    const typeFilter = document.getElementById('type-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sizeFilter = document.getElementById('size-filter');
    const sortFilter = document.getElementById('sort-filter');
    const logo = document.getElementById('logo');
    const cartView = document.getElementById('cart-view');
    const cartContent = document.getElementById('cart-content');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartRecommendationsSection = document.getElementById('cart-recommendations-section');
    const cartRecommendationsGrid = document.getElementById('cart-recommendations-grid');
    const cartSelectAllCheckbox = document.getElementById('cart-select-all');
    const cartSelectionSummary = document.getElementById('cart-selection-summary');
    const cartSummaryCount = document.getElementById('cart-summary-count');
    const cartSummarySubtotal = document.getElementById('cart-summary-subtotal');
    const cartSummaryShipping = document.getElementById('cart-summary-shipping');
    const cartDiscountLine = document.getElementById('cart-discount-line');
    const cartSummaryDiscount = document.getElementById('cart-summary-discount');
    const cartSummaryTotal = document.getElementById('cart-summary-total');
    const voucherList = document.getElementById('voucher-list');
    const voucherAppliedNote = document.getElementById('voucher-applied-note');
    const clearVoucherBtn = document.getElementById('clear-voucher-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const removeSelectedBtn = document.getElementById('remove-selected-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    const emptyCartContinueBtn = document.getElementById('empty-cart-continue-btn');
    const cartEyebrow = cartView.querySelector('.cart-view-header .catalog-eyebrow');
    const cartTitle = cartView.querySelector('.cart-view-header .section-title');
    const cartDescription = cartView.querySelector('.cart-view-header .catalog-description');
    const cartSelectAllText = cartView.querySelector('.cart-check-label span');
    const cartTableHeadings = cartView.querySelectorAll('.cart-table-head > div');
    const cartEmptyTitle = cartEmptyState.querySelector('h3');
    const cartEmptyDescription = cartEmptyState.querySelector('p');
    const cartSummaryTitle = cartView.querySelector('.cart-summary-card h3');
    const cartDiscountLabel = cartDiscountLine.querySelector('span');
    const cartVoucherEyebrow = cartView.querySelector('.voucher-panel .voucher-eyebrow');
    const cartVoucherTitle = cartView.querySelector('.voucher-panel h4');
    const wishlistView = document.getElementById('wishlist-view');
    const wishlistGrid = document.getElementById('wishlist-grid');
    const wishlistEmptyState = document.getElementById('wishlist-empty-state');
    const continueFromWishlistBtn = document.getElementById('continue-from-wishlist-btn');
    const wishlistEmptyContinueBtn = document.getElementById('wishlist-empty-continue-btn');
    const wishlistEyebrow = wishlistView.querySelector('.cart-view-header .catalog-eyebrow');
    const wishlistTitle = wishlistView.querySelector('.cart-view-header .section-title');
    const wishlistDescription = wishlistView.querySelector('.cart-view-header .catalog-description');
    const wishlistEmptyTitle = wishlistEmptyState.querySelector('h3');
    const wishlistEmptyDescription = wishlistEmptyState.querySelector('p');
    const checkoutView = document.getElementById('checkout-view');
    const checkoutBackBtn = document.getElementById('checkout-back-btn');
    const checkoutBackText = document.getElementById('checkout-back-text');
    const checkoutEyebrow = document.getElementById('checkout-eyebrow');
    const checkoutTitle = document.getElementById('checkout-title');
    const checkoutDescription = document.getElementById('checkout-description');
    const checkoutAddressList = document.getElementById('checkout-address-list');
    const checkoutManageAddressesBtn = document.getElementById('checkout-manage-addresses-btn');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSummaryTitle = document.getElementById('checkout-summary-title');
    const checkoutCountLabel = document.getElementById('checkout-count-label');
    const checkoutSummaryCount = document.getElementById('checkout-summary-count');
    const checkoutSubtotalLabel = document.getElementById('checkout-subtotal-label');
    const checkoutSummarySubtotal = document.getElementById('checkout-summary-subtotal');
    const checkoutShippingLabel = document.getElementById('checkout-shipping-label');
    const checkoutSummaryShipping = document.getElementById('checkout-summary-shipping');
    const checkoutDiscountLine = document.getElementById('checkout-discount-line');
    const checkoutDiscountLabel = document.getElementById('checkout-discount-label');
    const checkoutSummaryDiscount = document.getElementById('checkout-summary-discount');
    const checkoutVoucherEyebrow = document.getElementById('checkout-voucher-eyebrow');
    const checkoutVoucherTitle = document.getElementById('checkout-voucher-title');
    const checkoutClearVoucherBtn = document.getElementById('checkout-clear-voucher-btn');
    const checkoutVoucherAppliedNote = document.getElementById('checkout-voucher-applied-note');
    const checkoutVoucherList = document.getElementById('checkout-voucher-list');
    const checkoutTotalLabel = document.getElementById('checkout-total-label');
    const checkoutSummaryTotal = document.getElementById('checkout-summary-total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const addressBookView = document.getElementById('address-book-view');
    const ordersView = document.getElementById('orders-view');
    const productDetailView = document.getElementById('product-detail-view');
    const addressBookBackBtn = document.getElementById('address-book-back-btn');
    const ordersBackBtn = document.getElementById('orders-back-btn');
    const productDetailBackBtn = document.getElementById('product-detail-back-btn');
    const addAddressBtn = document.getElementById('add-address-btn');
    const cancelAddressEditBtn = document.getElementById('cancel-address-edit');
    const addressEmptyState = document.getElementById('address-empty-state');
    const addressList = document.getElementById('address-list');
    const addressForm = document.getElementById('address-form');
    const addressFormTitle = document.getElementById('address-form-title');
    const addressFormError = document.getElementById('address-form-error');
    const addressWardSelect = document.getElementById('address-ward');
    const addressDistrictSelect = document.getElementById('address-district');
    const addressCitySelect = document.getElementById('address-city');
    const addressStreetSelect = document.getElementById('address-street');
    const addressHouseNumberInput = document.getElementById('address-house-number');
    const ordersTableHeader = document.getElementById('orders-table-header');
    const ordersEmptyState = document.getElementById('orders-empty-state');
    const ordersList = document.getElementById('orders-list');
    const productDetailBreadcrumb = document.getElementById('product-detail-breadcrumb');
    const productDetailMainImage = document.getElementById('product-detail-main-image');
    const productDetailThumbnails = document.getElementById('product-detail-thumbnails');
    const productDetailCategory = document.getElementById('product-detail-category');
    const productDetailTitle = document.getElementById('product-detail-title');
    const productDetailBrand = document.getElementById('product-detail-brand');
    const productDetailRating = document.getElementById('product-detail-rating');
    const productDetailStock = document.getElementById('product-detail-stock');
    const productDetailPrice = document.getElementById('product-detail-price');
    const productDetailShortDescription = document.getElementById('product-detail-short-description');
    const productDetailTypeWrap = document.getElementById('product-detail-type-wrap');
    const productDetailTypeOptions = document.getElementById('product-detail-type-options');
    const productDetailSizeWrap = document.getElementById('product-detail-size-wrap');
    const productDetailSizeOptions = document.getElementById('product-detail-size-options');
    const productDetailQuantityInput = document.getElementById('product-detail-quantity');
    const productDetailQtyMinus = document.getElementById('product-detail-qty-minus');
    const productDetailQtyPlus = document.getElementById('product-detail-qty-plus');
    const productDetailWishlistBtn = document.getElementById('product-detail-wishlist-btn');
    const productDetailAddCartBtn = document.getElementById('product-detail-add-cart-btn');
    const productDetailBuyNowBtn = document.getElementById('product-detail-buy-now-btn');
    const productDetailError = document.getElementById('product-detail-error');
    const productDetailDescription = document.getElementById('product-detail-description');
    const productDetailReviews = document.getElementById('product-detail-reviews');
    const productDetailReviewCount = document.getElementById('product-detail-review-count');
    const productDetailReviewForm = document.getElementById('product-detail-review-form');
    const productDetailReviewRating = document.getElementById('product-review-rating');
    const productDetailReviewContent = document.getElementById('product-review-content');
    const productDetailReviewError = document.getElementById('product-review-error');
    const productDetailRelated = document.getElementById('product-detail-related');

    const megaMenu = document.getElementById('mega-menu');
    const megaTabs = Array.from(document.querySelectorAll('.mega-tab'));
    const megaPanels = {
        sports: document.getElementById('mega-panel-sports'),
        apparel: document.getElementById('mega-panel-apparel'),
        accessories: document.getElementById('mega-panel-accessories'),
        brands: document.getElementById('mega-panel-brands')
    };
    const megaMenuSummary = document.getElementById('mega-menu-summary');
    const megaReset = document.getElementById('mega-reset');

    const loginOverlay = document.getElementById('login-overlay');
    const registerOverlay = document.getElementById('register-overlay');
    const registerOtpOverlay = document.getElementById('register-otp-overlay');
    const forgotPasswordOverlay = document.getElementById('forgot-password-overlay');
    const profileOverlay = document.getElementById('profile-overlay');
    const passwordOverlay = document.getElementById('password-overlay');
    const policyOverlay = document.getElementById('policy-overlay');
    const productOverlay = document.getElementById('product-overlay');
    const cartItemOverlay = document.getElementById('cart-item-overlay');
    const overlays = [loginOverlay, registerOverlay, registerOtpOverlay, forgotPasswordOverlay, profileOverlay, passwordOverlay, policyOverlay, productOverlay, cartItemOverlay];
    const policyTitle = document.getElementById('policy-title');
    const policyContent = document.getElementById('policy-content');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerOtpForm = document.getElementById('register-otp-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    const productForm = document.getElementById('product-form');

    const userDropdown = document.getElementById('user-dropdown');
    const dropName = document.getElementById('dropdown-user-name');
    const dropRole = document.getElementById('dropdown-user-role');
    const logoutLink = document.getElementById('logout-link');
    const adminLink = document.getElementById('admin-link');
    const addressBookLinkWrap = document.getElementById('address-book-link-wrap');
    const ordersLinkWrap = document.getElementById('orders-link-wrap');
    const editProfileLink = document.getElementById('edit-profile-link');
    const changePassLink = document.getElementById('change-pass-link');
    const addressBookLink = document.getElementById('address-book-link');
    const ordersLink = document.getElementById('orders-link');

    const adminPanel = document.getElementById('admin-panel');
    const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
    const tabContents = Array.from(document.querySelectorAll('.tab-content'));
    const userListBody = document.getElementById('admin-user-list');
    const productListBody = document.getElementById('admin-product-list');
    const addProductBtn = document.getElementById('add-product-btn');

    const productFormTitle = document.getElementById('product-form-title');
    const productError = document.getElementById('product-error');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const registerOtpError = document.getElementById('register-otp-error');
    const registerOtpEmail = document.getElementById('register-otp-email');
    const forgotPasswordError = document.getElementById('forgot-password-error');
    const passError = document.getElementById('pass-error');
    const cartItemForm = document.getElementById('cart-item-form');
    const cartItemError = document.getElementById('cart-item-error');
    const cartConfigProductId = document.getElementById('cart-config-product-id');
    const cartConfigImage = document.getElementById('cart-config-image');
    const cartConfigCategory = document.getElementById('cart-config-category');
    const cartConfigName = document.getElementById('cart-config-name');
    const cartConfigBrand = document.getElementById('cart-config-brand');
    const cartConfigPrice = document.getElementById('cart-config-price');
    const cartConfigStock = document.getElementById('cart-config-stock');
    const cartConfigSize = document.getElementById('cart-config-size');
    const cartConfigQuantity = document.getElementById('cart-config-quantity');
    const cartConfigMinus = document.getElementById('cart-config-minus');
    const cartConfigPlus = document.getElementById('cart-config-plus');

    const openRegisterButton = document.getElementById('open-register');
    const openForgotPasswordButton = document.getElementById('open-forgot-password');
    const backToLoginFromRegisterButton = document.getElementById('back-to-login-from-register');
    const backToLoginFromForgotButton = document.getElementById('back-to-login-from-forgot');
    const backToRegisterInfoButton = document.getElementById('back-to-register-info');
    const resendRegisterOtpButton = document.getElementById('resend-register-otp');

    let token = localStorage.getItem(TOKEN_KEY) || '';
    let pendingRegisterPayload = null;
    let analyticsSessionId = ensureAnalyticsSessionId();
    let currentUser = normalizeUserProfile(readStorage(USER_KEY));
    let promoHuntSyncPromise = null;
    let promoHuntBackendAvailable = true;
    let promoHuntManagerSyncedAt = 0;
    let allProducts = [];
    let currentCollectionId = '';
    let currentCategory = 'all';
    let currentMenuItemId = '';
    let currentBrand = '';
    let currentQuery = '';
    let currentPriceRange = 'all';
    let currentTypeFilter = 'all';
    let currentSizeFilter = 'all';
    let currentSortOption = 'featured';
    let activeMegaTab = 'sports';
    let editingProduct = null;
    let currentView = 'home';
    let pendingWishlistMoveProductId = '';
    let currentDetailProductId = '';
    let currentDetailSelectedSize = '';
    let currentDetailSelectedType = '';
    let currentDetailQuantity = 1;
    let currentDetailImageIndex = 0;
    let currentCheckoutAddressId = '';
    let administrativeUnitsCache = [];
    let administrativeUnitsPromise = null;
    let productRenderToken = 0;
    let pendingProductContainerClearTimer = null;
    let personalizedHomeProducts = [];
    let homeShowcaseProducts = [];
    let homeShowcaseIndex = 0;
    let homeShowcaseTimer = null;
    let homeShowcaseResetTimer = null;
    let homeShowcaseRenderSignature = '';
    let personalizedHomeRenderSignature = '';
    let bodyRepairTimer = null;
    let centeredMessageTimer = null;
    let homePersonalizedPriceRange = 'all';
    let homePersonalizedType = 'all';
    let homePersonalizedBrand = 'all';
    let homePersonalizedSize = 'all';
    let homePersonalizedSort = 'featured';
    let cartRecommendationProducts = [];
    let detailRecommendationProducts = [];
    let homeRecommendationSignature = '';
    let cartRecommendationSignature = '';
    let detailRecommendationSignature = '';
    let recommendationFetchPromises = new Map();
    let adminBehaviorOverview = null;
    let adminBehaviorOverviewError = '';
    let trackedPageContext = {
        pageType: '',
        pageKey: '',
        extra: {},
        startedAt: Date.now()
    };

    bindEvents();
    bootstrap();

    async function bootstrap() {
        ensureSampleOrderDataVersion();
        updateCartCount();
        updateWishlistCount();
        await loadAdministrativeUnits();
        await restoreSession();
        updateAuthUI();
        await loadProducts();
    }

    function bindEvents() {
        accountIcon.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            if (!currentUser) {
                openOverlay(loginOverlay);
                return;
            }

            userDropdown.classList.toggle('hidden');
        });

        userDropdown?.addEventListener('click', event => {
            event.stopPropagation();
            if (event.target.closest('a')) {
                userDropdown.classList.add('hidden');
            }
        });

        cartLink.addEventListener('click', event => {
            event.preventDefault();
            openCartView();
        });

        wishlistLink.addEventListener('click', event => {
            event.preventDefault();
            openWishlistView();
        });

        logo.addEventListener('click', event => {
            event.preventDefault();
            goToHomePage();
        });

        document.getElementById('about_list')?.addEventListener('click', event => {
            const actionLink = event.target.closest('[data-footer-action]');
            if (!actionLink) {
                return;
            }

            event.preventDefault();
            if (actionLink.dataset.footerAction === 'home') {
                goToHomePage();
                return;
            }

            if (actionLink.dataset.footerAction === 'products') {
                closeMegaMenu();
                currentView = 'catalog';
                resetCatalogState({ clearQuery: true, skipRender: true });
                renderCatalog();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        document.getElementById('policies_list')?.addEventListener('click', event => {
            const policyLink = event.target.closest('[data-policy]');
            if (!policyLink) {
                return;
            }

            event.preventDefault();
            openPolicyModal(policyLink.dataset.policy);
        });

        catalogTrigger.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            toggleMegaMenu();
        });

        megaTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                activeMegaTab = tab.dataset.tab;
                syncMegaTabState();
            });
        });

        megaReset.addEventListener('click', () => {
            currentView = 'catalog';
            resetCatalogState({ clearQuery: false });
            closeMegaMenu();
        });

        megaMenu.addEventListener('click', event => {
            const actionTarget = event.target.closest('[data-filter-type]');
            if (!actionTarget) {
                return;
            }

            event.preventDefault();
            const filterType = actionTarget.dataset.filterType;

            if (filterType === 'category') {
                applyCategoryFilter(actionTarget.dataset.category);
            }

            if (filterType === 'item') {
                applyMenuItemFilter(actionTarget.dataset.itemId);
            }

            if (filterType === 'brand') {
                applyBrandFilter(actionTarget.dataset.brand);
            }

            closeMegaMenu();
        });

        clearFiltersButton.addEventListener('click', () => {
            resetCatalogState({ clearQuery: true });
        });

        [priceFilter, typeFilter, brandFilter, sizeFilter, sortFilter].forEach(control => {
            control.addEventListener('change', () => {
                currentPriceRange = priceFilter.value;
                currentTypeFilter = typeFilter.value;
                currentBrand = brandFilter.value === 'all' ? '' : brandFilter.value;
                currentSizeFilter = sizeFilter.value;
                currentSortOption = sortFilter.value;
                renderCatalog();
            });
        });

        [homePersonalizedPriceFilter, homePersonalizedTypeFilter, homePersonalizedBrandFilter, homePersonalizedSizeFilter, homePersonalizedSortFilter]
            .filter(Boolean)
            .forEach(control => {
                control.addEventListener('change', () => {
                    homePersonalizedPriceRange = homePersonalizedPriceFilter?.value || 'all';
                    homePersonalizedType = homePersonalizedTypeFilter?.value || 'all';
                    homePersonalizedBrand = homePersonalizedBrandFilter?.value || 'all';
                    homePersonalizedSize = homePersonalizedSizeFilter?.value || 'all';
                    homePersonalizedSort = homePersonalizedSortFilter?.value || 'featured';
                    renderPersonalizedHomeRecommendations();
                });
            });

        homeSaleTrack?.addEventListener('click', event => {
            const favoriteButton = event.target.closest('[data-favorite-toggle]');
            if (favoriteButton) {
                event.preventDefault();
                toggleWishlistProduct(favoriteButton.dataset.productId);
                syncHomeShowcaseWishlistButtons();
                return;
            }

            const addButton = event.target.closest('.add-to-cart-btn');
            if (addButton) {
                event.preventDefault();
                openCartConfigurator(addButton.dataset.productId);
                return;
            }

            const card = event.target.closest('[data-product-open]');
            if (card) {
                event.preventDefault();
                openProductDetailView(card.dataset.productOpen);
            }
        });

        homeSaleDots?.addEventListener('click', event => {
            const dot = event.target.closest('[data-home-slide]');
            if (!dot) {
                return;
            }

            homeShowcaseIndex = Number(dot.dataset.homeSlide || 0);
            clearHomeShowcaseLoopReset();
            syncHomeShowcasePosition();
            startHomeShowcaseRotation();
        });

        homeSaleShowcase?.addEventListener('mouseenter', stopHomeShowcaseRotation);
        homeSaleShowcase?.addEventListener('mouseleave', startHomeShowcaseRotation);

        activeFilters.addEventListener('click', event => {
            const chipButton = event.target.closest('button[data-clear]');
            if (!chipButton) {
                return;
            }

            const action = chipButton.dataset.clear;
            if (action === 'query') {
                currentQuery = '';
                searchInput.value = '';
                closeSearchSuggestions();
            }
            if (action === 'brand') {
                currentBrand = '';
            }
            if (action === 'item') {
                currentMenuItemId = '';
            }
            if (action === 'category') {
                currentCategory = 'all';
            }
            if (action === 'collection') {
                currentCollectionId = '';
                currentPriceRange = 'all';
                currentTypeFilter = 'all';
                currentSizeFilter = 'all';
                currentSortOption = 'featured';
            }
            if (action === 'price') {
                currentPriceRange = 'all';
            }
            if (action === 'type') {
                currentTypeFilter = 'all';
            }
            if (action === 'size') {
                currentSizeFilter = 'all';
            }

            renderCatalog();
        });

        navCollectionLinks.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                applyCollectionFilter(link.dataset.collection);
                closeMegaMenu();
            });
        });

        promoHuntLink?.addEventListener('click', event => {
            event.preventDefault();
            openPromoHuntView();
        });

        promoHuntView?.addEventListener('click', event => {
            const claimButton = event.target.closest('[data-promo-hunt-claim]');
            if (!claimButton || claimButton.disabled) {
                return;
            }
            void claimPromoHuntCampaign(claimButton.dataset.promoHuntClaim);
        });

        window.addEventListener('storage', event => {
            if (![PROMO_HUNT_KEY, PROMO_HUNT_CLAIMS_KEY, VOUCHER_ASSIGNMENTS_KEY].includes(event.key)) {
                return;
            }
            if (currentView === 'promo-hunt') {
                renderPromoHuntView();
            }
            renderCartView();
            renderCheckoutView();
        });

        searchInput.addEventListener('input', () => {
            renderSearchSuggestions(searchInput.value);
        });

        searchInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                applySearchQuery(searchInput.value);
            }
        });

        searchInput.addEventListener('focus', () => {
            closeMegaMenu();
            renderSearchSuggestions(searchInput.value);
        });

        searchSubmitButton?.addEventListener('click', () => {
            applySearchQuery(searchInput.value);
        });

        searchSuggestions?.addEventListener('click', event => {
            const suggestionButton = event.target.closest('[data-search-suggestion]');
            if (!suggestionButton) {
                return;
            }

            const suggestedQuery = suggestionButton.dataset.searchSuggestion || '';
            searchInput.value = suggestedQuery;
            applySearchQuery(suggestedQuery);
        });

        window.addEventListener('click', event => {
            if (!userDropdown.contains(event.target) && !accountIcon.contains(event.target)) {
                userDropdown.classList.add('hidden');
            }

            if (searchBox && !searchBox.contains(event.target)) {
                closeSearchSuggestions();
            }

            const clickedInsideMegaMenu = megaMenu.contains(event.target);
            const clickedCatalogTrigger = catalogTrigger.contains(event.target);
            if (!clickedInsideMegaMenu && !clickedCatalogTrigger) {
                closeMegaMenu();
            }

            overlays.forEach(overlay => {
                if (event.target === overlay) {
                    if (!isRegisterFlowOverlay(overlay)) {
                        closeOverlay(overlay);
                    }
                }
            });
        });

        window.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                closeSearchSuggestions();
                closeMegaMenu();
                overlays.forEach(overlay => {
                    if (!isRegisterFlowOverlay(overlay)) {
                        closeOverlay(overlay);
                    }
                });
                userDropdown.classList.add('hidden');
            }
        });

        window.addEventListener('resize', () => {
            if (homeSaleShowcase && !homeSaleShowcase.classList.contains('hidden')) {
                renderHomeSaleShowcase();
            }
        });

        document.querySelectorAll('.close-btn').forEach(button => {
            button.addEventListener('click', () => {
                const overlay = button.closest('.overlay');
                if (overlay) {
                    if (isRegisterFlowOverlay(overlay)) {
                        resetPendingRegisterState();
                    }
                    closeOverlay(overlay);
                }
            });
        });

        document.getElementById('cancel-product').addEventListener('click', () => closeOverlay(productOverlay));
        document.getElementById('cancel-cart-item').addEventListener('click', () => {
            resetCartConfiguratorState();
            closeOverlay(cartItemOverlay);
        });

        continueShoppingBtn.addEventListener('click', showCatalogView);
        emptyCartContinueBtn.addEventListener('click', showCatalogView);
        continueFromWishlistBtn.addEventListener('click', showCatalogView);
        wishlistEmptyContinueBtn.addEventListener('click', showCatalogView);

        cartSelectAllCheckbox.addEventListener('change', () => {
            const cartItems = getCartItems().map(item => ({ ...item, selected: cartSelectAllCheckbox.checked }));
            saveCartItems(cartItems);
            renderCartView();
        });

        checkoutBtn.addEventListener('click', handleCheckout);
        removeSelectedBtn.addEventListener('click', removeSelectedCartItems);
        clearVoucherBtn.addEventListener('click', () => {
            saveAppliedVoucherCode('');
            renderCartView();
            if (currentView === 'checkout') {
                renderCheckoutView();
            }
        });

        voucherList.addEventListener('click', event => {
            const applyButton = event.target.closest('[data-voucher-apply]');
            if (!applyButton || applyButton.disabled) {
                return;
            }

            applyVoucherCode(applyButton.dataset.voucherApply);
        });

        checkoutClearVoucherBtn.addEventListener('click', () => {
            saveAppliedVoucherCode('');
            renderCartView();
            renderCheckoutView();
        });

        checkoutVoucherList.addEventListener('click', event => {
            const applyButton = event.target.closest('[data-voucher-apply]');
            if (!applyButton || applyButton.disabled) {
                return;
            }

            applyVoucherCode(applyButton.dataset.voucherApply);
            renderCheckoutView();
        });

        checkoutBackBtn.addEventListener('click', () => {
            openCartView();
        });
        checkoutManageAddressesBtn.addEventListener('click', openAddressBookView);
        checkoutAddressList.addEventListener('change', event => {
            const selector = event.target.closest('input[name="checkout-address"]');
            if (!selector) {
                return;
            }

            currentCheckoutAddressId = selector.value;
            renderCheckoutView();
        });

        placeOrderBtn.addEventListener('click', placeOrder);

        cartConfigMinus.addEventListener('click', () => {
            const currentValue = Number(cartConfigQuantity.value || 1);
            cartConfigQuantity.value = String(Math.max(1, currentValue - 1));
        });

        cartConfigPlus.addEventListener('click', () => {
            const selectedProduct = allProducts.find(item => item.id === cartConfigProductId.value);
            const maxQuantity = Math.max(1, selectedProduct?.ton_kho ?? 1);
            const currentValue = Number(cartConfigQuantity.value || 1);
            cartConfigQuantity.value = String(Math.min(maxQuantity, currentValue + 1));
        });

        cartItemForm.addEventListener('submit', event => {
            event.preventDefault();
            confirmAddToCart();
        });

        openRegisterButton.addEventListener('click', () => {
            registerForm.reset();
            registerOtpForm?.reset();
            registerError.classList.add('hidden');
            hideInlineError(registerOtpError);
            pendingRegisterPayload = null;
            switchAuthOverlay(registerOverlay);
        });

        openForgotPasswordButton.addEventListener('click', () => {
            forgotPasswordForm.reset();
            forgotPasswordError.classList.add('hidden');
            switchAuthOverlay(forgotPasswordOverlay);
        });

        document.getElementById('send-forgot-otp')?.addEventListener('click', async () => {
            await sendOtpEmail({
                endpoint: '/auth/forgot-password/otp',
                errorBox: forgotPasswordError,
                button: document.getElementById('send-forgot-otp'),
                payload: {
                    username: document.getElementById('forgot-username').value.trim(),
                    email: document.getElementById('forgot-email').value.trim()
                },
                successMessage: 'Mã OTP đặt lại mật khẩu đã được gửi đến email của bạn.'
            });
        });

        backToRegisterInfoButton?.addEventListener('click', () => {
            hideInlineError(registerOtpError);
            switchAuthOverlay(registerOverlay);
        });

        resendRegisterOtpButton?.addEventListener('click', async () => {
            if (!pendingRegisterPayload) {
                showInlineError(registerOtpError, 'Không tìm thấy thông tin đăng ký. Vui lòng nhập lại.');
                return;
            }

            await sendOtpEmail({
                endpoint: '/auth/register/otp',
                errorBox: registerOtpError,
                button: resendRegisterOtpButton,
                payload: {
                    username: pendingRegisterPayload.username,
                    email: pendingRegisterPayload.email
                },
                successMessage: 'Mã OTP mới đã được gửi đến email của bạn.'
            });
        });

        backToLoginFromRegisterButton.addEventListener('click', () => {
            loginError.classList.add('hidden');
            resetPendingRegisterState();
            switchAuthOverlay(loginOverlay);
        });

        backToLoginFromForgotButton.addEventListener('click', () => {
            loginError.classList.add('hidden');
            switchAuthOverlay(loginOverlay);
        });

        editProfileLink.addEventListener('click', async event => {
            event.preventDefault();
            if (!currentUser) {
                return;
            }

            try {
                const profile = await apiRequest('/profile');
                document.getElementById('edit-name').value = profile.ho_ten || '';
                document.getElementById('edit-email').value = profile.email || '';
                document.getElementById('edit-phone').value = profile.sdt || '';
                openOverlay(profileOverlay);
            } catch (error) {
                alert(error.message);
            }
        });

        changePassLink.addEventListener('click', event => {
            event.preventDefault();
            passwordForm.reset();
            passError.classList.add('hidden');
            openOverlay(passwordOverlay);
        });

        addressBookLink.addEventListener('click', event => {
            event.preventDefault();
            openAddressBookView();
        });

        ordersLink.addEventListener('click', event => {
            event.preventDefault();
            openOrdersView();
        });

        addressBookBackBtn.addEventListener('click', showCatalogView);
        ordersBackBtn.addEventListener('click', showCatalogView);
        addAddressBtn.addEventListener('click', () => openAddressForm());
        cancelAddressEditBtn.addEventListener('click', closeAddressForm);
        addressCitySelect.addEventListener('change', handleAddressProvinceChange);
        addressWardSelect?.addEventListener('change', () => populateStreetOptions());
        addressForm.addEventListener('submit', event => {
            event.preventDefault();
            saveAddressFromForm();
        });

        addressList.addEventListener('click', event => {
            const actionButton = event.target.closest('button[data-address-action]');
            if (!actionButton) {
                return;
            }

            const addressId = actionButton.dataset.addressId;
            const action = actionButton.dataset.addressAction;

            if (action === 'edit') {
                openAddressForm(addressId);
                return;
            }

            if (action === 'delete') {
                removeAddress(addressId);
                return;
            }

            if (action === 'default') {
                setDefaultAddress(addressId);
            }
        });

        logoutLink.addEventListener('click', async event => {
            event.preventDefault();
            try {
                if (token) {
                    await apiRequest('/auth/logout', { method: 'POST' });
                }
            } catch (error) {
                console.warn(error);
            } finally {
                clearSession();
                updateAuthUI();
                renderCatalog();
            }
        });

        loginForm.addEventListener('submit', async event => {
            event.preventDefault();
            loginError.classList.add('hidden');

            try {
                const response = await apiRequest('/auth/login', {
                    method: 'POST',
                    auth: false,
                    body: {
                        username: document.getElementById('username').value.trim(),
                        password: document.getElementById('password').value
                    }
                });

                applyLoginSession(response);
                closeOverlay(loginOverlay);
                loginForm.reset();
                updateAuthUI();
                await loadProducts();
                await promptCustomerAddressIfMissing();
            } catch (error) {
                loginError.textContent = error.message;
                loginError.classList.remove('hidden');
            }
        });

        registerForm.addEventListener('submit', async event => {
            event.preventDefault();
            registerError.classList.add('hidden');

            const registerPassword = document.getElementById('register-password').value;
            const registerConfirmPassword = document.getElementById('register-confirm-password').value;
            const submitButton = registerForm.querySelector('button[type="submit"]');

            if (!isStrongPassword(registerPassword)) {
                registerError.textContent = PASSWORD_RULE_MESSAGE;
                registerError.classList.remove('hidden');
                return;
            }

            if (registerPassword !== registerConfirmPassword) {
                registerError.textContent = 'Mật khẩu xác nhận không khớp.';
                registerError.classList.remove('hidden');
                return;
            }

            const registerPhone = normalizePhoneInput(document.getElementById('register-phone').value);
            if (!isValidVietnamMobilePhone(registerPhone)) {
                registerError.textContent = 'Số điện thoại không hợp lệ. Hãy nhập số di động Việt Nam, ví dụ 0935250037 hoặc +84935250037.';
                registerError.classList.remove('hidden');
                return;
            }

            const registerPayload = {
                username: document.getElementById('register-username').value.trim(),
                ho_ten: document.getElementById('register-name').value.trim(),
                email: document.getElementById('register-email').value.trim(),
                sdt: registerPhone,
                password: registerPassword,
                confirm_password: registerConfirmPassword
            };

            const otpSent = await sendOtpEmail({
                endpoint: '/auth/register/otp',
                errorBox: registerError,
                button: submitButton,
                payload: {
                    username: registerPayload.username,
                    email: registerPayload.email
                },
                successMessage: 'Mã OTP đăng ký đã được gửi đến email của bạn.',
                showSuccessAlert: false,
                cooldown: false,
                loadingText: 'Đang gửi OTP...'
            });

            if (!otpSent) {
                return;
            }

            pendingRegisterPayload = registerPayload;
            if (registerOtpEmail) {
                registerOtpEmail.textContent = registerPayload.email;
            }
            document.getElementById('register-otp-code').value = '';
            hideInlineError(registerOtpError);
            switchAuthOverlay(registerOtpOverlay);
        });

        registerOtpForm?.addEventListener('submit', async event => {
            event.preventDefault();
            hideInlineError(registerOtpError);

            if (!pendingRegisterPayload) {
                showInlineError(registerOtpError, 'Không tìm thấy thông tin đăng ký. Vui lòng nhập lại.');
                return;
            }

            const registerOtpCode = document.getElementById('register-otp-code').value.trim();
            if (!/^\d{6}$/.test(registerOtpCode)) {
                showInlineError(registerOtpError, 'Vui lòng nhập mã OTP gồm 6 chữ số.');
                return;
            }

            try {
                const response = await apiRequest('/auth/register', {
                    method: 'POST',
                    auth: false,
                    body: {
                        ...pendingRegisterPayload,
                        otp_code: registerOtpCode
                    }
                });

                applyLoginSession(response);
                closeOverlay(registerOtpOverlay);
                registerForm.reset();
                registerOtpForm.reset();
                pendingRegisterPayload = null;
                updateAuthUI();
                await loadProducts();
                alert('Đăng ký thành công. Vui lòng thêm địa chỉ giao hàng cho tài khoản mới.');
                await promptCustomerAddressIfMissing();
            } catch (error) {
                showInlineError(registerOtpError, error.message);
            }
        });

        forgotPasswordForm.addEventListener('submit', async event => {
            event.preventDefault();
            forgotPasswordError.classList.add('hidden');

            const forgotNewPassword = document.getElementById('forgot-new-password').value;
            if (!isStrongPassword(forgotNewPassword)) {
                forgotPasswordError.textContent = PASSWORD_RULE_MESSAGE;
                forgotPasswordError.classList.remove('hidden');
                return;
            }

            const forgotOtpCode = document.getElementById('forgot-otp').value.trim();
            if (!/^\d{6}$/.test(forgotOtpCode)) {
                forgotPasswordError.textContent = 'Vui lòng nhập mã OTP gồm 6 chữ số.';
                forgotPasswordError.classList.remove('hidden');
                return;
            }

            try {
                const response = await apiRequest('/auth/forgot-password', {
                    method: 'POST',
                    auth: false,
                    body: {
                        username: document.getElementById('forgot-username').value.trim(),
                        email: document.getElementById('forgot-email').value.trim(),
                        new_password: forgotNewPassword,
                        confirm_password: document.getElementById('forgot-confirm-password').value,
                        otp_code: forgotOtpCode
                    }
                });

                closeOverlay(forgotPasswordOverlay);
                forgotPasswordForm.reset();
                loginForm.reset();
                switchAuthOverlay(loginOverlay);
                alert('Đặt lại mật khẩu thành công. Hãy đăng nhập lại với mật khẩu mới.');
            } catch (error) {
                forgotPasswordError.textContent = error.message;
                forgotPasswordError.classList.remove('hidden');
            }
        });

        profileForm.addEventListener('submit', async event => {
            event.preventDefault();

            const profilePhone = normalizePhoneInput(document.getElementById('edit-phone').value);
            if (profilePhone && !isValidVietnamMobilePhone(profilePhone)) {
                alert('Số điện thoại không hợp lệ. Hãy nhập số di động Việt Nam, ví dụ 0935250037 hoặc +84935250037.');
                return;
            }

            try {
                currentUser = normalizeUserProfile(await apiRequest('/profile', {
                    method: 'PUT',
                    body: {
                        ho_ten: document.getElementById('edit-name').value.trim(),
                        email: document.getElementById('edit-email').value.trim(),
                        sdt: profilePhone
                    }
                }));
                localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
                closeOverlay(profileOverlay);
                updateAuthUI();
                alert('Cập nhật thông tin thành công.');
            } catch (error) {
                alert(error.message);
            }
        });

        passwordForm.addEventListener('submit', async event => {
            event.preventDefault();
            passError.classList.add('hidden');

            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                passError.textContent = 'Mật khẩu xác nhận không khớp.';
                passError.classList.remove('hidden');
                return;
            }

            if (!isStrongPassword(newPassword)) {
                passError.textContent = PASSWORD_RULE_MESSAGE;
                passError.classList.remove('hidden');
                return;
            }

            try {
                await apiRequest('/profile/password', {
                    method: 'PUT',
                    body: {
                        current_password: currentPassword,
                        new_password: newPassword,
                        confirm_password: confirmPassword
                    }
                });
                closeOverlay(passwordOverlay);
                passwordForm.reset();
                alert('Đổi mật khẩu thành công.');
            } catch (error) {
                passError.textContent = error.message;
                passError.classList.remove('hidden');
            }
        });

        addProductBtn.addEventListener('click', () => {
            editingProduct = null;
            productForm.reset();
            document.getElementById('product-id').value = '';
            productFormTitle.textContent = 'Thêm sản phẩm';
            productError.classList.add('hidden');
            openOverlay(productOverlay);
        });

        productForm.addEventListener('submit', async event => {
            event.preventDefault();
            productError.classList.add('hidden');

            const payload = {
                ten_san_pham: document.getElementById('product-name').value.trim(),
                sku: document.getElementById('product-sku').value.trim(),
                danh_muc: document.getElementById('product-category').value.trim(),
                thuong_hieu: document.getElementById('product-brand').value.trim(),
                size: document.getElementById('product-size').value.trim(),
                mau: document.getElementById('product-color').value.trim(),
                gia_nhap: Number(document.getElementById('product-cost').value || 0),
                gia_ban: Number(document.getElementById('product-price').value || 0),
                ton_kho: Number(document.getElementById('product-stock').value || 0),
                trang_thai: document.getElementById('product-status').value.trim(),
                link_san_pham: document.getElementById('product-link').value.trim(),
                hinh_anh_url: document.getElementById('product-image-url').value.trim(),
                ghi_chu: document.getElementById('product-note').value.trim()
            };

            try {
                if (editingProduct) {
                    await apiRequest(`/admin/products/${editingProduct.id}`, {
                        method: 'PUT',
                        body: payload
                    });
                } else {
                    await apiRequest('/admin/products', {
                        method: 'POST',
                        body: payload
                    });
                }

                closeOverlay(productOverlay);
                await loadProducts();
            } catch (error) {
                productError.textContent = error.message;
                productError.classList.remove('hidden');
            }
        });

        productListBody.addEventListener('click', async event => {
            const button = event.target.closest('button[data-action]');
            if (!button) {
                return;
            }

            const productId = button.dataset.productId;
            const product = allProducts.find(item => item.id === productId);
            if (!product) {
                return;
            }

            if (button.dataset.action === 'edit') {
                editingProduct = product;
                fillProductForm(product);
                productError.classList.add('hidden');
                productFormTitle.textContent = 'Cập nhật sản phẩm';
                openOverlay(productOverlay);
                return;
            }

            if (button.dataset.action === 'delete') {
                const confirmed = confirm(`Xóa sản phẩm "${product.ten_san_pham}"?`);
                if (!confirmed) {
                    return;
                }

                try {
                    await apiRequest(`/admin/products/${productId}`, { method: 'DELETE' });
                    await loadProducts();
                } catch (error) {
                    alert(error.message);
                }
            }
        });

        tabBtns.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.tab;
                tabBtns.forEach(item => item.classList.toggle('active', item === button));
                tabContents.forEach(content => content.classList.toggle('active', content.id === target));
            });
        });

        productContainer.addEventListener('click', event => {
            const favoriteButton = event.target.closest('[data-favorite-toggle]');
            if (favoriteButton) {
                event.preventDefault();
                toggleWishlistProduct(favoriteButton.dataset.productId);
                return;
            }

            const button = event.target.closest('.add-to-cart-btn');
            if (button) {
                openCartConfigurator(button.dataset.productId);
                return;
            }

            const card = event.target.closest('[data-product-open]');
            if (card) {
                openProductDetailView(card.dataset.productOpen);
            }
        });

        productDetailRelated?.addEventListener('click', event => {
            const favoriteButton = event.target.closest('[data-favorite-toggle]');
            if (favoriteButton) {
                event.preventDefault();
                event.stopPropagation();
                toggleWishlistProduct(favoriteButton.dataset.productId);
                return;
            }

            const addButton = event.target.closest('.add-to-cart-btn');
            if (addButton) {
                event.preventDefault();
                openCartConfigurator(addButton.dataset.productId);
                return;
            }

            const card = event.target.closest('[data-product-open]');
            if (card) {
                event.preventDefault();
                openProductDetailView(card.dataset.productOpen);
            }
        });

        personalizedHomeGrid?.addEventListener('click', event => {
            const favoriteButton = event.target.closest('[data-favorite-toggle]');
            if (favoriteButton) {
                event.preventDefault();
                event.stopPropagation();
                toggleWishlistProduct(favoriteButton.dataset.productId);
                return;
            }

            const addButton = event.target.closest('.add-to-cart-btn');
            if (addButton) {
                event.preventDefault();
                openCartConfigurator(addButton.dataset.productId);
                return;
            }

            const card = event.target.closest('[data-product-open]');
            if (card) {
                event.preventDefault();
                openProductDetailView(card.dataset.productOpen);
            }
        });

        cartRecommendationsGrid?.addEventListener('click', event => {
            const favoriteButton = event.target.closest('[data-favorite-toggle]');
            if (favoriteButton) {
                event.preventDefault();
                toggleWishlistProduct(favoriteButton.dataset.productId);
                renderCartRecommendations();
                return;
            }

            const addButton = event.target.closest('.add-to-cart-btn');
            if (addButton) {
                event.preventDefault();
                openCartConfigurator(addButton.dataset.productId);
                return;
            }

            const card = event.target.closest('[data-product-open]');
            if (card) {
                event.preventDefault();
                openProductDetailView(card.dataset.productOpen);
            }
        });

        productDetailReviewForm?.addEventListener('submit', event => {
            event.preventDefault();
            submitProductReview();
        });

        wishlistGrid.addEventListener('click', event => {
            const openCard = event.target.closest('[data-wishlist-open]');
            if (openCard) {
                event.preventDefault();
                openProductDetailView(openCard.dataset.wishlistOpen);
                return;
            }

            const moveButton = event.target.closest('[data-wishlist-move]');
            if (moveButton) {
                event.preventDefault();
                openCartConfigurator(moveButton.dataset.productId, { removeFromWishlist: true });
                return;
            }

            const removeButton = event.target.closest('[data-wishlist-remove]');
            if (removeButton) {
                event.preventDefault();
                removeFromWishlist(removeButton.dataset.productId);
            }
        });

        cartItemsContainer.addEventListener('click', event => {
            const actionButton = event.target.closest('[data-cart-action]');
            if (!actionButton) {
                return;
            }

            const action = actionButton.dataset.cartAction;
            const lineId = actionButton.dataset.lineId;
            if (!lineId) {
                return;
            }

            if (action === 'remove') {
                removeCartLine(lineId);
                return;
            }

            if (action === 'decrease') {
                updateCartLineQuantity(lineId, -1);
                return;
            }

            if (action === 'increase') {
                updateCartLineQuantity(lineId, 1);
            }
        });

        cartItemsContainer.addEventListener('change', event => {
            const checkbox = event.target.closest('[data-cart-select]');
            if (checkbox) {
                toggleCartLineSelection(checkbox.dataset.lineId, checkbox.checked);
                return;
            }

            const quantityInput = event.target.closest('[data-cart-quantity-input]');
            if (quantityInput) {
                setCartLineQuantity(quantityInput.dataset.lineId, quantityInput.value);
                return;
            }

            const sizeSelect = event.target.closest('[data-cart-size-select]');
            if (sizeSelect) {
                updateCartLineSize(sizeSelect.dataset.lineId, sizeSelect.value);
            }
        });

        productDetailBackBtn?.addEventListener('click', showCatalogView);
        productDetailQtyMinus?.addEventListener('click', () => updateProductDetailQuantity(-1));
        productDetailQtyPlus?.addEventListener('click', () => updateProductDetailQuantity(1));
        productDetailQuantityInput?.addEventListener('input', () => syncProductDetailQuantityInput());
        productDetailWishlistBtn?.addEventListener('click', () => {
            if (!currentDetailProductId) {
                return;
            }
            toggleWishlistProduct(currentDetailProductId);
        });
        productDetailAddCartBtn?.addEventListener('click', () => {
            addCurrentDetailSelectionToCart();
        });
        productDetailBuyNowBtn?.addEventListener('click', () => {
            addCurrentDetailSelectionToCart({ openCheckout: true, exclusiveSelection: true });
        });
        productDetailTypeOptions?.addEventListener('click', event => {
            const option = event.target.closest('[data-detail-type]');
            if (!option) {
                return;
            }
            currentDetailSelectedType = option.dataset.detailType || '';
            renderProductDetailView();
        });
        productDetailSizeOptions?.addEventListener('click', event => {
            const option = event.target.closest('[data-detail-size]');
            if (!option) {
                return;
            }
            currentDetailSelectedSize = option.dataset.detailSize || '';
            renderProductDetailView();
        });
        productDetailThumbnails?.addEventListener('click', event => {
            const thumb = event.target.closest('[data-detail-image-index]');
            if (!thumb) {
                return;
            }
            currentDetailImageIndex = Number(thumb.dataset.detailImageIndex || 0);
            renderProductDetailView();
        });
    }

    async function restoreSession() {
        if (!token) {
            currentUser = null;
            invalidateRecommendationCache();
            updateCartCount();
            updateWishlistCount();
            if (currentView === 'wishlist' || currentView === 'cart' || currentView === 'checkout') {
                showCatalogView();
            } else {
                void loadHomeRecommendations(true);
            }
            return;
            /*
            panel.insertAdjacentHTML('beforeend', `
                <div class="workspace-card">
                    <div class="workspace-card-head">
                        <div>
                            <h3>Sáº£n pháº©m Ä‘Æ°á»£c quan tĂ¢m nhiá»u</h3>
                            <p class="customer-card-meta">Xáº¿p háº¡ng theo lÆ°á»£t xem, thĂªm giá», mua hĂ ng vĂ  tÆ°Æ¡ng tĂ¡c hĂ nh vi tá»•ng há»£p.</p>
                        </div>
                        <span class="workspace-chip">${behaviorTopProducts.length} sáº£n pháº©m</span>
                    </div>
                    ${adminBehaviorOverviewError ? `
                        <div class="workspace-empty">${escapeHtml(adminBehaviorOverviewError)}</div>
                    ` : behaviorTopProducts.length ? `
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Sáº£n pháº©m</th>
                                    <th>Äiá»ƒm quan tĂ¢m</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${behaviorTopProducts.slice(0, 10).map(item => `
                                    <tr>
                                        <td>${escapeHtml(item.label || 'Sáº£n pháº©m')}</td>
                                        <td>${Number(item.value ?? item.score ?? 0)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : '<div class="workspace-empty">ChÆ°a Ä‘á»§ dá»¯ liá»‡u hĂ nh vi Ä‘á»ƒ xáº¿p háº¡ng sáº£n pháº©m quan tĂ¢m.</div>'}
                </div>
            `);
            */
            return;
        }

        try {
            currentUser = normalizeUserProfile(await apiRequest('/auth/me'));
            localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
            invalidateRecommendationCache();
            updateCartCount();
            updateWishlistCount();
            if (currentView === 'product-detail' && currentDetailProductId) {
                void loadDetailRecommendations(currentDetailProductId, true);
            } else if (currentView === 'cart') {
                void loadCartRecommendations(true);
            } else {
                void loadHomeRecommendations(true);
            }
        } catch (error) {
            clearSession();
        }
    }

    function getOrderSeedVersionKey() {
        return 'pbl3_order_seed_version';
    }

    function getSampleWorkspaceOrdersSeed() {
        return [
            {
                id: 'sample-order-001',
                code: 'DH-20260423-1001',
                createdAt: '2026-04-22T09:15:00.000Z',
                status: 'Đã giao',
                paymentStatus: 'Đã ghi nhận thanh toán',
                supportRequest: '',
                supportStatus: '',
                supportNote: '',
                totalItems: 2,
                subtotal: 3160000,
                shipping: 0,
                discount: 0,
                total: 3160000,
                voucherCode: '',
                voucherLabel: '',
                address: {
                    id: 'seed-address-001',
                    recipient: 'Nguyễn Văn A',
                    phone: '0901234567',
                    line: '123 Lê Lợi',
                    ward: 'Phường Hải Châu',
                    wardCode: '',
                    district: 'Không áp dụng (mô hình 2 cấp)',
                    city: 'Đà Nẵng',
                    provinceCode: '',
                    note: '',
                    isDefault: true
                },
                customer: {
                    id: 'user-customer-001',
                    name: 'Nguyễn Văn A',
                    username: 'khachhang01',
                    email: 'nguyenvana@email.com',
                    phone: '0901234567'
                },
                accountKey: 'user-customer-001',
                items: [
                    {
                        productId: 'product-010',
                        sku: 'FB-010',
                        name: 'Giày bóng đá adidas Predator League Turf',
                        image: '',
                        size: '42',
                        quantity: 1,
                        unitPrice: 1980000,
                        subtotal: 1980000
                    },
                    {
                        productId: 'product-109',
                        sku: 'VB-022',
                        name: 'Mikasa V390W',
                        image: '',
                        size: 'Số 5',
                        quantity: 1,
                        unitPrice: 1180000,
                        subtotal: 1180000
                    }
                ]
            },
            {
                id: 'sample-order-002',
                code: 'DH-20260423-1002',
                createdAt: '2026-04-22T14:30:00.000Z',
                status: 'Đã xác nhận',
                paymentStatus: 'Đã ghi nhận thanh toán',
                supportRequest: '',
                supportStatus: '',
                supportNote: '',
                totalItems: 3,
                subtotal: 5390000,
                shipping: 0,
                discount: 0,
                total: 5390000,
                voucherCode: '',
                voucherLabel: '',
                address: {
                    id: 'seed-address-002',
                    recipient: 'Trần Thị B',
                    phone: '0987654321',
                    line: '456 Nguyễn Văn Linh',
                    ward: 'Phường Thanh Khê',
                    wardCode: '',
                    district: 'Không áp dụng (mô hình 2 cấp)',
                    city: 'Đà Nẵng',
                    provinceCode: '',
                    note: '',
                    isDefault: true
                },
                customer: {
                    id: 'user-customer-002',
                    name: 'Trần Thị B',
                    username: 'khachhang02',
                    email: 'tranthib@email.com',
                    phone: '0987654321'
                },
                accountKey: 'user-customer-002',
                items: [
                    {
                        productId: 'product-140',
                        sku: 'RUN-001',
                        name: 'Nike Pegasus 41',
                        image: '',
                        size: '42',
                        quantity: 1,
                        unitPrice: 3490000,
                        subtotal: 3490000
                    },
                    {
                        productId: 'product-149',
                        sku: 'GYM-003',
                        name: 'Nike Dri-FIT Primary Men\'s Training T-Shirt',
                        image: '',
                        size: 'L',
                        quantity: 2,
                        unitPrice: 950000,
                        subtotal: 1900000
                    }
                ]
            },
            {
                id: 'sample-order-003',
                code: 'DH-20260423-1003',
                createdAt: '2026-04-23T08:00:00.000Z',
                status: 'Đã hủy',
                paymentStatus: 'Hoàn tiền / không ghi nhận',
                supportRequest: '',
                supportStatus: '',
                supportNote: '',
                totalItems: 1,
                subtotal: 2050000,
                shipping: 0,
                discount: 0,
                total: 2050000,
                voucherCode: '',
                voucherLabel: '',
                address: {
                    id: 'seed-address-001',
                    recipient: 'Nguyễn Văn A',
                    phone: '0901234567',
                    line: '123 Lê Lợi',
                    ward: 'Phường Hải Châu',
                    wardCode: '',
                    district: 'Không áp dụng (mô hình 2 cấp)',
                    city: 'Đà Nẵng',
                    provinceCode: '',
                    note: '',
                    isDefault: true
                },
                customer: {
                    id: 'user-customer-001',
                    name: 'Nguyễn Văn A',
                    username: 'khachhang01',
                    email: 'nguyenvana@email.com',
                    phone: '0901234567'
                },
                accountKey: 'user-customer-001',
                items: [
                    {
                        productId: 'product-111',
                        sku: 'BM-022',
                        name: 'Yonex Astrox 77 Play',
                        image: '',
                        size: '4U-G5',
                        quantity: 1,
                        unitPrice: 2050000,
                        subtotal: 2050000
                    }
                ]
            }
        ].map(order => normalizeWorkspaceOrder(order));
    }

    function applySampleOrderDataReset() {
        const scopedPrefix = `${ORDER_HISTORY_KEY}_`;
        const removableKeys = [];

        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key) {
                continue;
            }

            if (key === getWorkspaceOrdersStorageKey() || key.startsWith(scopedPrefix)) {
                removableKeys.push(key);
            }
        }

        removableKeys.forEach(key => localStorage.removeItem(key));

        const sampleOrders = getSampleWorkspaceOrdersSeed();
        saveWorkspaceOrders(sampleOrders);

        const groupedOrders = new Map();
        sampleOrders.forEach(order => {
            const accountKey = String(order.accountKey || '').trim();
            if (!accountKey) {
                return;
            }
            if (!groupedOrders.has(accountKey)) {
                groupedOrders.set(accountKey, []);
            }
            groupedOrders.get(accountKey).push(order);
        });

        groupedOrders.forEach((orders, accountKey) => {
            localStorage.setItem(`${ORDER_HISTORY_KEY}_${accountKey}`, JSON.stringify(orders));
        });

        localStorage.setItem(getOrderSeedVersionKey(), ORDER_DATA_RESET_VERSION);
    }

    function ensureSampleOrderDataVersion() {
        const currentVersion = String(localStorage.getItem(getOrderSeedVersionKey()) || '').trim();
        if (currentVersion === ORDER_DATA_RESET_VERSION) {
            return;
        }

        applySampleOrderDataReset();
    }

    async function loadProducts() {
        productContainer.innerHTML = '<p class="loading-text">Đang tải sản phẩm...</p>';

        try {
            const products = await apiRequest('/products', { auth: false });
            allProducts = products.map(enrichProduct);
            renderCatalog();
            renderAdminProductList();
            if (isAdmin()) {
                await renderUserList();
            } else {
                userListBody.innerHTML = '';
            }
        } catch (error) {
            productContainer.innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
        }
    }

    function scheduleProductContainerClear() {
        productRenderToken += 1;
        productContainer.classList.add('hidden');

        if (pendingProductContainerClearTimer) {
            window.clearTimeout(pendingProductContainerClearTimer);
        }

        const clearToken = productRenderToken;
        pendingProductContainerClearTimer = window.setTimeout(() => {
            if (currentView === 'home' && clearToken === productRenderToken) {
                productContainer.innerHTML = '';
            }
            pendingProductContainerClearTimer = null;
        }, 500);
    }

    function renderCatalog() {
        const baseProducts = getBaseProducts();
        const filteredProducts = getFilteredProducts(baseProducts);
        renderProducts(filteredProducts);
        renderCatalogHeader(filteredProducts);
        renderCollectionView(baseProducts, filteredProducts);
        renderActiveFilters();
        renderMegaMenu();
        renderCartView();
        syncMainView();
        syncNavState();
        repairRenderedContent();
    }

    function renderCatalogHeader(filteredProducts) {
        const currentItem = getCurrentMenuItem();
        const currentHeading = currentBrand
            ? `${currentBrand} chính hãng`
            : currentItem
                ? `${currentItem.label} · ${currentItem.sport}`
                : currentCategory !== 'all'
                    ? currentCategory
                    : 'Toàn bộ sản phẩm';

        const currentDescription = currentBrand
            ? `Hiển thị các sản phẩm thuộc thương hiệu ${currentBrand}, bao gồm giày, bóng, vợt và phụ kiện liên quan.`
            : currentItem
                ? `Lọc nhanh nhóm ${currentItem.label.toLowerCase()} trong danh mục ${currentItem.sport.toLowerCase()} để khách hàng chọn đúng loại sản phẩm cần mua.`
                : currentCategory !== 'all'
                    ? `Khám phá đầy đủ sản phẩm thuộc danh mục ${currentCategory.toLowerCase()}, từ mặt hàng chủ lực đến phụ kiện đi kèm.`
                    : 'Khám phá đầy đủ giày, bóng, vợt, trang phục và phụ kiện thể thao theo đúng nhu cầu của khách hàng.';

        catalogTitle.textContent = currentHeading;
        catalogDescription.textContent = currentDescription;
        catalogCount.textContent = `${filteredProducts.length} sản phẩm`;
        clearFiltersButton.classList.toggle('hidden', !hasActiveFilters());
    }

    function renderActiveFilters() {
        const chips = [];
        const currentItem = getCurrentMenuItem();

        if (currentCategory !== 'all') {
            chips.push(renderFilterChip('Danh mục', currentCategory, 'category'));
        }

        if (currentItem) {
            chips.push(renderFilterChip('Nhóm', currentItem.label, 'item'));
        }

        if (currentBrand) {
            chips.push(renderFilterChip('Thương hiệu', currentBrand, 'brand'));
        }

        if (currentQuery) {
            chips.push(renderFilterChip('Từ khóa', currentQuery, 'query'));
        }

        activeFilters.classList.toggle('hidden', chips.length === 0);
        activeFilters.innerHTML = chips.join('');
    }

    function renderFilterChip(label, value, action) {
        return `
            <span class="filter-chip">
                <span class="filter-chip-label">${escapeHtml(label)}:</span>
                <span>${escapeHtml(value)}</span>
                <button type="button" data-clear="${escapeHtml(action)}" aria-label="Xóa bộ lọc">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </span>
        `;
    }

    function renderMegaMenu() {
        renderMegaPanel('sports');
        renderMegaPanel('apparel');
        renderMegaPanel('accessories');
        renderBrandPanel();
        syncMegaTabState();
        megaMenuSummary.textContent = getMegaMenuSummary();
    }

    function renderMegaPanel(panelName) {
        const sections = SPORT_SECTIONS.map(section => {
            const mappedItems = section.items
                .filter(item => item.panels.includes(panelName))
                .map(item => {
                    const fullItem = { ...item, sport: section.sport };
                    return { ...fullItem, count: countProductsForMenuItem(fullItem) };
                });
            const items = panelName === 'accessories'
                ? mappedItems
                : mappedItems.filter(item => item.count > 0);

            if (!items.length) {
                return '';
            }

            const itemLinks = items.map(item => `
                <li>
                    <a
                        href="#"
                        class="mega-link ${item.count === 0 ? 'disabled' : ''} ${currentMenuItemId === item.id ? 'active' : ''}"
                        ${item.count > 0 ? `data-filter-type="item" data-item-id="${item.id}"` : ''}
                    >
                        <span>${escapeHtml(item.label)}</span>
                        <strong>${item.count > 0 ? item.count : '0'}</strong>
                    </a>
                </li>
            `).join('');

            const categoryCount = countProductsForCategory(section.sport);
            return `
                <article class="mega-section-card">
                    <div class="mega-section-header">
                        <div class="mega-section-title">
                            <i class="fa-solid ${section.icon}"></i>
                            <h3>${escapeHtml(section.sport)}</h3>
                        </div>
                        <a
                            href="#"
                            class="mega-section-view ${currentCategory === section.sport && !currentMenuItemId && !currentBrand ? 'active' : ''}"
                            data-filter-type="category"
                            data-category="${escapeHtml(section.sport)}"
                        >
                            Xem tất cả <strong>${categoryCount}</strong>
                        </a>
                    </div>
                    <ul class="mega-link-list">
                        ${itemLinks}
                    </ul>
                </article>
            `;
        }).filter(Boolean);

        megaPanels[panelName].innerHTML = sections.length
            ? sections.join('')
            : '<p class="mega-empty">Chưa có nhóm sản phẩm phù hợp.</p>';
    }

    function renderBrandPanel() {
        const brandMap = new Map();

        allProducts.forEach(product => {
            const brand = String(product.thuong_hieu || '').trim();
            if (!brand) {
                return;
            }

            if (!brandMap.has(brand)) {
                brandMap.set(brand, { count: 0, sports: new Set() });
            }

            const current = brandMap.get(brand);
            current.count += 1;
            current.sports.add(getCanonicalSportFromProduct(product));
        });

        const brandCards = Array.from(brandMap.entries())
            .sort((left, right) => {
                if (right[1].count !== left[1].count) {
                    return right[1].count - left[1].count;
                }
                return left[0].localeCompare(right[0], 'vi');
            })
            .map(([brand, meta]) => `
                <a
                    href="#"
                    class="brand-card ${currentBrand === brand ? 'active' : ''}"
                    data-filter-type="brand"
                    data-brand="${escapeHtml(brand)}"
                >
                    <span class="brand-card-name">${escapeHtml(brand)}</span>
                    <span class="brand-card-sports">${escapeHtml(Array.from(meta.sports).join(' · '))}</span>
                    <strong>${meta.count} sản phẩm</strong>
                </a>
            `)
            .join('');

        megaPanels.brands.innerHTML = brandCards || '<p class="mega-empty">Chưa có thương hiệu để hiển thị.</p>';
    }

    function renderProducts(products) {
        if (!products.length) {
            productContainer.innerHTML = '<p class="loading-text">Không có sản phẩm phù hợp với bộ lọc hiện tại.</p>';
            return;
        }

        productContainer.innerHTML = products.map(product => {
            const badge = product.ton_kho <= 3
                ? '<span class="badge danger">Sắp hết</span>'
                : (product.ton_kho <= 10 ? '<span class="badge warning">Bán chạy</span>' : '');

            return `
                <article class="product-card">
                    <div class="product-img">
                        ${badge}
                        <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham)}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                        <h3 class="product-name">${escapeHtml(product.ten_san_pham || '')}</h3>
                        <p class="product-subcategory">${escapeHtml(getProductGroupLabel(product))}</p>
                        <div class="product-meta">
                            <span>${escapeHtml(product.thuong_hieu || 'Không rõ')}</span>
                            <span>${escapeHtml(product.size || '--')}</span>
                        </div>
                        ${renderPriceDisplay(product, { wrapperClass: 'price-stack product-price-block', currentClass: 'product-price' })}
                        <p class="product-stock">Tồn kho: ${product.ton_kho ?? 0}</p>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                </article>
            `;
        }).join('');
    }

    function renderAdminProductList() {
        const productCountChip = document.getElementById('staff-product-filter-count');

        if (!canManageProducts()) {
            productListBody.innerHTML = '';
            if (productCountChip) {
                productCountChip.textContent = '0 sản phẩm';
            }
            return;
        }

        syncStaffProductFilterInputs(allProducts);

        const filteredProducts = getFilteredAdminProducts(allProducts);

        if (productCountChip) {
            productCountChip.textContent = `${filteredProducts.length} sản phẩm`;
        }

        if (!filteredProducts.length) {
            productListBody.innerHTML = '<tr><td colspan="6"><div class="workspace-empty">Không có sản phẩm phù hợp với bộ lọc hiện tại.</div></td></tr>';
            return;
        }

        productListBody.innerHTML = filteredProducts.map(product => `
            <tr>
                <td>${escapeHtml(product.sku || '')}</td>
                <td>${escapeHtml(product.ten_san_pham || '')}</td>
                <td>${escapeHtml(product.danh_muc || '')}</td>
                <td>${formatCurrency(product.gia_ban)}</td>
                <td>${product.ton_kho ?? 0}</td>
                <td>
                    <button class="edit-btn" type="button" data-action="edit" data-product-id="${product.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" type="button" data-action="delete" data-product-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
        repairTextNodes(productListBody);
        repairTextNodes(document.getElementById('products-mgmt'));
    }

    async function renderUserList() {
        try {
            const users = await apiRequest('/admin/users');
            userListBody.innerHTML = users.map(user => `
                <tr>
                    <td>${escapeHtml(user.id || '')}</td>
                    <td>${escapeHtml(user.ho_ten || '')}</td>
                    <td>${escapeHtml(user.username || '')}</td>
                    <td>${escapeHtml(user.email || '')}</td>
                    <td>${escapeHtml(user.sdt || '')}</td>
                    <td><span class="role-badge ${getRoleClass(user.role)}">${escapeHtml(user.role || '')}</span></td>
                </tr>
            `).join('');
            repairTextNodes(userListBody);
        } catch (error) {
            userListBody.innerHTML = `<tr><td colspan="6" class="error-text">${escapeHtml(error.message)}</td></tr>`;
        }
    }

    function updateAuthUI() {
        const authenticated = Boolean(currentUser);

        if (!authenticated) {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
            userDropdown.classList.add('hidden');
            dropName.textContent = 'Khách';
            dropRole.textContent = 'Vai trò';
            return;
        }

        dropName.textContent = currentUser.ho_ten || 'Người dùng';
        dropRole.textContent = currentUser.role || 'Thành viên';

        if (canManageProducts()) {
            adminPanel.classList.remove('hidden');
            adminLink.classList.remove('hidden');
        } else {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
        }

        document.getElementById('users-tab-btn').classList.toggle('hidden', !isAdmin());
        repairRenderedContent();
    }

    function getFilteredProducts() {
        return allProducts.filter(product => {
            const matchesCategory = currentCategory === 'all'
                || normalizeText(getCanonicalSportFromProduct(product)) === normalizeText(currentCategory);
            const matchesMenuItem = !currentMenuItemId || matchesMenuItemRule(product, getCurrentMenuItem());
            const matchesBrand = !currentBrand || normalizeText(product.thuong_hieu) === normalizeText(currentBrand);

            const haystack = normalizeText([
                product.ten_san_pham,
                product.danh_muc,
                product.thuong_hieu,
                product.sku
            ].filter(Boolean).join(' '));
            const matchesQuery = !currentQuery || haystack.includes(normalizeText(currentQuery));
            return matchesCategory && matchesMenuItem && matchesBrand && matchesQuery;
        });
    }

    function applyCategoryFilter(category) {
        currentCategory = category || 'all';
        currentMenuItemId = '';
        currentBrand = '';
        renderCatalog();
    }

    function applyMenuItemFilter(itemId) {
        const item = findMenuItemById(itemId);
        if (!item) {
            return;
        }

        currentCategory = item.sport;
        currentMenuItemId = itemId;
        currentBrand = '';
        renderCatalog();
    }

    function applyBrandFilter(brand) {
        currentBrand = brand || '';
        currentMenuItemId = '';
        currentCategory = 'all';
        renderCatalog();
    }

    function resetCatalogState(options = {}) {
        const { clearQuery = false } = options;
        currentCategory = 'all';
        currentMenuItemId = '';
        currentBrand = '';
        if (clearQuery) {
            currentQuery = '';
            searchInput.value = '';
        }
        renderCatalog();
    }

    function fillProductForm(product) {
        document.getElementById('product-id').value = product.id || '';
        document.getElementById('product-name').value = product.ten_san_pham || '';
        document.getElementById('product-sku').value = product.sku || '';
        document.getElementById('product-category').value = product.danh_muc || '';
        document.getElementById('product-brand').value = product.thuong_hieu || '';
        document.getElementById('product-size').value = product.size || '';
        document.getElementById('product-color').value = product.mau || '';
        document.getElementById('product-cost').value = product.gia_nhap ?? 0;
        document.getElementById('product-price').value = product.gia_ban ?? 0;
        document.getElementById('product-stock').value = product.ton_kho ?? 0;
        document.getElementById('product-status').value = product.trang_thai || 'Đang bán';
        document.getElementById('product-link').value = product.link_san_pham || '';
        document.getElementById('product-image-url').value = product.hinh_anh_url || '';
        document.getElementById('product-note').value = product.ghi_chu || '';
    }

    function addToCart(productId) {
        const product = allProducts.find(item => item.id === productId);
        if (!product) {
            return;
        }

        const cartItems = readStorage(CART_KEY, []);
        cartItems.push({
            id: product.id,
            ten_san_pham: product.ten_san_pham,
            gia_ban: product.gia_ban
        });
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        updateCartCount();
        showCenteredMessage(`\u0110\u00e3 th\u00eam "${sanitizeProductText(product.ten_san_pham || 's\u1ea3n ph\u1ea9m')}" v\u00e0o gi\u1ecf h\u00e0ng.`);
    }

    function updateCartCount() {
        const cartItems = readStorage(CART_KEY, []);
        cartCount.textContent = String(cartItems.length);
    }

    function toggleMegaMenu() {
        const shouldOpen = megaMenu.classList.contains('hidden');
        if (shouldOpen) {
            renderMegaMenu();
            megaMenu.classList.remove('hidden');
            megaMenu.setAttribute('aria-hidden', 'false');
        } else {
            closeMegaMenu();
        }
        syncNavState();
    }

    function closeMegaMenu() {
        megaMenu.classList.add('hidden');
        megaMenu.setAttribute('aria-hidden', 'true');
        syncNavState();
    }

    function syncMegaTabState() {
        megaTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === activeMegaTab);
        });

        Object.entries(megaPanels).forEach(([panelName, panel]) => {
            panel.classList.toggle('active', panelName === activeMegaTab);
        });
    }

    function syncNavState() {
        const isMegaMenuOpen = !megaMenu.classList.contains('hidden');
        catalogTrigger.classList.toggle('active', isMegaMenuOpen || Boolean(currentMenuItemId) || Boolean(currentBrand) || currentCategory === 'all');

        navLinks.forEach(link => {
            const category = link.dataset.category;
            const active = currentCategory === category;
            link.classList.toggle('active', active);
        });
    }

    function clearSession() {
        saveAppliedVoucherCode('');
        token = '';
        currentUser = null;
        currentCheckoutAddressId = '';
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        userDropdown.classList.add('hidden');
        updateCartCount();
        updateWishlistCount();
        if (currentView === 'wishlist' || currentView === 'cart' || currentView === 'checkout') {
            showCatalogView();
        }
    }

    function applyLoginSession(response) {
        token = response?.access_token || '';
        currentUser = normalizeUserProfile(response?.user || null);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
        invalidateRecommendationCache();
        updateCartCount();
        updateWishlistCount();
        if (currentView === 'product-detail' && currentDetailProductId) {
            void loadDetailRecommendations(currentDetailProductId, true);
        } else if (currentView === 'cart') {
            void loadCartRecommendations(true);
        } else {
            void loadHomeRecommendations(true);
        }
    }

    function switchAuthOverlay(targetOverlay) {
        [loginOverlay, registerOverlay, registerOtpOverlay, forgotPasswordOverlay].forEach(overlay => {
            if (overlay !== targetOverlay) {
                closeOverlay(overlay);
            }
        });
        openOverlay(targetOverlay);
    }

    function openOverlay(overlay) {
        overlay.classList.remove('hidden');
    }

    function closeOverlay(overlay) {
        overlay.classList.add('hidden');
    }

    function isRegisterFlowOverlay(overlay) {
        return overlay === registerOverlay || overlay === registerOtpOverlay;
    }

    function resetPendingRegisterState() {
        pendingRegisterPayload = null;
        hideInlineError(registerError);
        hideInlineError(registerOtpError);
        registerForm?.reset();
        registerOtpForm?.reset();
    }

    function canManageProducts() {
        return currentUser && ['Quản trị viên', 'Nhân viên'].includes(currentUser.role);
    }

    function isAdmin() {
        return currentUser && currentUser.role === 'Quản trị viên';
    }

    function getRoleClass(role) {
        if (role === 'Quản trị viên') {
            return 'role-admin';
        }
        if (role === 'Nhân viên') {
            return 'role-employee';
        }
        return 'role-customer';
    }

    function findMenuItemById(itemId) {
        for (const section of SPORT_SECTIONS) {
            for (const item of section.items) {
                if (item.id === itemId) {
                    return { ...item, sport: section.sport, icon: section.icon };
                }
            }
        }
        return null;
    }

    function getCurrentMenuItem() {
        return currentMenuItemId ? findMenuItemById(currentMenuItemId) : null;
    }

    function countProductsForCategory(category) {
        return allProducts.filter(product => normalizeText(getCanonicalSportFromProduct(product)) === normalizeText(category)).length;
    }

    function countProductsForMenuItem(item) {
        return allProducts.filter(product => matchesMenuItemRule(product, item)).length;
    }

    function matchesMenuItemRule(product, item) {
        if (!item) {
            return true;
        }

        if (normalizeText(getCanonicalSportFromProduct(product)) !== normalizeText(item.sport)) {
            return false;
        }

        return getMenuItemIdsForProduct(product).includes(item.id);
    }

    function getProductGroupLabel(product) {
        const itemIds = getMenuItemIdsForProduct(product);
        for (const section of SPORT_SECTIONS) {
            for (const item of section.items) {
                if (itemIds.includes(item.id)) {
                    return item.label;
                }
            }
        }
        return getCanonicalSportFromProduct(product);
    }

    function getMegaMenuSummary() {
        const currentItem = getCurrentMenuItem();
        if (currentBrand) {
            return `Đang xem theo thương hiệu ${currentBrand}. Chọn thương hiệu khác hoặc quay lại toàn bộ sản phẩm.`;
        }
        if (currentItem) {
            return `Đang lọc nhóm ${currentItem.label.toLowerCase()} trong danh mục ${currentItem.sport.toLowerCase()}.`;
        }
        if (currentCategory !== 'all') {
            return `Đang xem toàn bộ sản phẩm thuộc danh mục ${currentCategory.toLowerCase()}.`;
        }
        return 'Chọn nhanh theo môn thể thao, trang phục, phụ kiện hoặc thương hiệu.';
    }

    function getCurrentCollection() {
        if (currentQuery) {
            return {
                id: 'search-results',
                label: 'Kết quả tìm kiếm',
                icon: 'fa-magnifying-glass',
                eyebrow: 'Kết quả theo từ khóa',
                breadcrumb: `Trang chủ > Tìm kiếm > ${currentQuery}`,
                description: `Hiển thị kết quả cho từ khóa "${currentQuery}". Bạn có thể tiếp tục lọc theo mức giá, loại sản phẩm, thương hiệu và size giống như các bộ sưu tập nổi bật.`
            };
        }

        return COLLECTION_SECTIONS.find(collection => collection.id === currentCollectionId) || null;
    }

    function getBaseProducts() {
        return currentCollectionId ? buildCollectionProducts(currentCollectionId) : allProducts;
    }

    function buildCollectionProducts(collectionId) {
        const curatedSkus = COLLECTION_PRODUCT_MAP[collectionId] || [];
        if (!curatedSkus.length) {
            return [...allProducts];
        }

        const skuOrder = new Map(curatedSkus.map((sku, index) => [sku, index]));
        return allProducts
            .filter(product => skuOrder.has(String(product.sku || '').trim().toUpperCase()))
            .sort((left, right) => skuOrder.get(String(left.sku || '').trim().toUpperCase()) - skuOrder.get(String(right.sku || '').trim().toUpperCase()));
    }

    function sortProductList(products, sortOption = 'featured') {
        if (sortOption === 'price-asc') {
            return [...products].sort((left, right) => getProductCurrentPrice(left) - getProductCurrentPrice(right));
        }
        if (sortOption === 'price-desc') {
            return [...products].sort((left, right) => getProductCurrentPrice(right) - getProductCurrentPrice(left));
        }
        if (sortOption === 'stock-desc') {
            return [...products].sort((left, right) => (right.ton_kho ?? 0) - (left.ton_kho ?? 0));
        }
        if (sortOption === 'name-asc') {
            return [...products].sort((left, right) => String(left.ten_san_pham || '').localeCompare(String(right.ten_san_pham || ''), 'vi'));
        }
        return [...products];
    }

    function isHomeShowcaseEnabled() {
        const stored = localStorage.getItem(HOME_SHOWCASE_STORAGE_KEY);
        return stored === null ? true : stored === 'true';
    }

    function setHomeShowcaseEnabled(visible) {
        localStorage.setItem(HOME_SHOWCASE_STORAGE_KEY, visible ? 'true' : 'false');
    }

    function getHomeShowcaseVisibleCount() {
        if (window.innerWidth <= 640) {
            return 1;
        }
        if (window.innerWidth <= 900) {
            return 2;
        }
        if (window.innerWidth <= 1240) {
            return 3;
        }
        if (window.innerWidth <= 1480) {
            return 4;
        }
        return 5;
    }

    function mergeUniqueProducts(...groups) {
        const productMap = new Map();
        groups.flat().forEach(product => {
            if (!product?.id) {
                return;
            }
            const productId = String(product.id);
            if (!productMap.has(productId)) {
                productMap.set(productId, product);
            }
        });
        return Array.from(productMap.values());
    }

    function getProductSoldQuantityMap() {
        const soldMap = new Map();
        getWorkspaceOrders().forEach(order => {
            (order.items || []).forEach(item => {
                const productId = String(item.productId || '');
                if (!productId) {
                    return;
                }
                soldMap.set(productId, (soldMap.get(productId) || 0) + Number(item.quantity || 0));
            });
        });
        return soldMap;
    }

    function getHomeShowcaseProducts() {
        const soldMap = getProductSoldQuantityMap();
        const topDiscountProducts = [...allProducts]
            .sort((left, right) => {
                const discountGap = getProductDiscountPercent(right) - getProductDiscountPercent(left);
                if (discountGap !== 0) {
                    return discountGap;
                }
                return getProductCurrentPrice(right) - getProductCurrentPrice(left);
            })
            .slice(0, 12);
        const topSellingProducts = [...allProducts]
            .sort((left, right) => {
                const soldGap = (soldMap.get(String(right.id)) || 0) - (soldMap.get(String(left.id)) || 0);
                if (soldGap !== 0) {
                    return soldGap;
                }
                return getProductDiscountPercent(right) - getProductDiscountPercent(left);
            })
            .slice(0, 12);
        const personalizedPool = personalizedHomeProducts.slice(0, 12);
        const fallbackProducts = sortProductList([...allProducts], 'featured')
            .sort((left, right) => {
                const stockGap = (right.ton_kho ?? 0) - (left.ton_kho ?? 0);
                if (stockGap !== 0) {
                    return stockGap;
                }
                return getProductCurrentPrice(right) - getProductCurrentPrice(left);
            })
            .slice(0, 12);

        return mergeUniqueProducts(personalizedPool, topDiscountProducts, topSellingProducts, fallbackProducts).slice(0, 12);
    }

    function getCyclicProductSlice(products, startIndex, visibleCount) {
        if (!products.length) {
            return [];
        }

        return Array.from({ length: Math.min(visibleCount, products.length) }, (_, offset) => (
            products[(startIndex + offset) % products.length]
        ));
    }

    function buildHomeShowcaseCardMarkup(product) {
        const discountPercent = getProductDiscountPercent(product);
        const originalPrice = getProductOriginalPrice(product);
        const currentPrice = getProductCurrentPrice(product);
        const isInStock = Number(product.ton_kho || 0) > 0;
        const favoriteActive = isWishlisted(product.id) ? 'active' : '';
        const favoriteLabel = isWishlisted(product.id) ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích';
        const saleLabel = discountPercent > 0 ? 'GIẢM SỐC' : 'HOT';

        return `
            <article class="home-sale-card" data-product-open="${product.id}">
                <div class="home-sale-card-image">
                    <button
                        class="wishlist-toggle-btn ${favoriteActive}"
                        type="button"
                        data-favorite-toggle
                        data-product-id="${product.id}"
                        aria-label="${favoriteLabel}"
                        title="${favoriteLabel}"
                    >
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <span class="home-sale-badge">${saleLabel}</span>
                    <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham || 'Sản phẩm')}" loading="lazy" decoding="async">
                </div>
                <div class="home-sale-card-body">
                    <p class="home-sale-category">${escapeHtml(product.danh_muc || '')}</p>
                    <h3 class="home-sale-title" title="${escapeHtml(product.ten_san_pham || '')}">${escapeHtml(product.ten_san_pham || '')}</h3>
                    <div class="home-sale-pricing">
                        <div class="home-sale-price-group">
                            <strong class="home-sale-current-price">${formatCurrency(currentPrice)}</strong>
                            ${discountPercent > 0 ? `<span class="home-sale-original-price">${formatCurrency(originalPrice)}</span>` : ''}
                        </div>
                        <span class="home-sale-discount-pill">${discountPercent > 0 ? `-${discountPercent}%` : 'HOT'}</span>
                    </div>
                    <button class="add-to-cart-btn home-sale-action ${isInStock ? '' : 'disabled'}" type="button" data-product-id="${product.id}" ${isInStock ? '' : 'disabled'}>
                        ${isInStock ? 'Xem nhanh / thêm giỏ' : 'Tạm hết hàng'}
                    </button>
                </div>
            </article>
        `;
    }

    function getHomeShowcaseRail() {
        return homeSaleTrack?.querySelector('.home-sale-rail') || null;
    }

    function getHomeShowcaseGap() {
        const rail = getHomeShowcaseRail();
        const gap = rail ? Number.parseFloat(window.getComputedStyle(rail).columnGap) : 18;
        return Number.isFinite(gap) ? gap : 18;
    }

    function getHomeShowcaseCardBasis(visibleCount) {
        const gap = getHomeShowcaseGap();
        const totalGap = Math.max(0, visibleCount - 1) * gap;
        return `calc((100% - ${totalGap}px) / ${visibleCount})`;
    }

    function getHomeShowcaseDotIndex() {
        if (!homeShowcaseProducts.length) {
            return 0;
        }

        return ((homeShowcaseIndex % homeShowcaseProducts.length) + homeShowcaseProducts.length) % homeShowcaseProducts.length;
    }

    function syncHomeShowcaseDots() {
        if (!homeSaleDots) {
            return;
        }

        const activeIndex = getHomeShowcaseDotIndex();
        homeSaleDots.querySelectorAll('.home-sale-dot').forEach((dot, index) => {
            const isActive = index === activeIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    function syncHomeShowcaseWishlistButtons() {
        const wishlistSet = new Set(getWishlistIds());
        homeSaleTrack?.querySelectorAll('[data-favorite-toggle]').forEach(button => {
            const productId = button.dataset.productId;
            const active = wishlistSet.has(String(productId));
            const label = active ? 'B\u1ecf kh\u1ecfi y\u00eau th\u00edch' : 'Th\u00eam v\u00e0o y\u00eau th\u00edch';
            button.classList.toggle('active', active);
            button.setAttribute('aria-label', label);
            button.setAttribute('title', label);
        });
    }

    function syncFavoriteButtons(productId = '', scope = null) {
        const roots = scope
            ? [scope]
            : (currentView === 'home' ? [homeSaleShowcase, personalizedHomeView] : [document]);
        const wishlistSet = new Set(getWishlistIds());

        roots
            .filter(Boolean)
            .forEach(root => root.querySelectorAll('[data-favorite-toggle]').forEach(button => {
                if (productId && String(button.dataset.productId || '') !== String(productId)) {
                    return;
                }

                const active = wishlistSet.has(String(button.dataset.productId));
                const label = active ? 'B\u1ecf kh\u1ecfi y\u00eau th\u00edch' : 'Th\u00eam v\u00e0o y\u00eau th\u00edch';
                button.classList.toggle('active', active);
                button.setAttribute('aria-label', label);
                button.setAttribute('title', label);
            }));
    }

    function syncHomeShowcasePosition(options = {}) {
        const { animate = true } = options;
        const rail = getHomeShowcaseRail();
        if (!homeSaleTrack || !rail || !homeShowcaseProducts.length) {
            return;
        }

        const visibleCount = getHomeShowcaseVisibleCount();
        const canSlide = homeShowcaseProducts.length > visibleCount;
        homeSaleTrack.style.setProperty('--home-sale-card-basis', getHomeShowcaseCardBasis(visibleCount));
        if (!canSlide) {
            homeShowcaseIndex = 0;
        }

        const firstCard = rail.querySelector('.home-sale-card');
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 0;
        const offset = canSlide ? Math.max(0, homeShowcaseIndex) * (cardWidth + getHomeShowcaseGap()) : 0;

        if (!animate) {
            rail.classList.add('no-transition');
        }
        rail.style.transform = `translate3d(${-offset}px, 0, 0)`;
        syncHomeShowcaseDots();

        if (!animate) {
            window.requestAnimationFrame(() => rail.classList.remove('no-transition'));
        }
    }

    function clearHomeShowcaseLoopReset() {
        if (!homeShowcaseResetTimer) {
            return;
        }

        window.clearTimeout(homeShowcaseResetTimer);
        homeShowcaseResetTimer = null;
    }

    function queueHomeShowcaseLoopReset() {
        clearHomeShowcaseLoopReset();
        if (homeShowcaseIndex < homeShowcaseProducts.length) {
            return;
        }

        homeShowcaseResetTimer = window.setTimeout(() => {
            homeShowcaseIndex = 0;
            syncHomeShowcasePosition({ animate: false });
            homeShowcaseResetTimer = null;
        }, 680);
    }

    function stopHomeShowcaseRotation() {
        if (homeShowcaseTimer) {
            window.clearInterval(homeShowcaseTimer);
            homeShowcaseTimer = null;
        }
    }

    function startHomeShowcaseRotation() {
        stopHomeShowcaseRotation();
        const shouldRotate = shouldShowHomeRecommendations()
            && isHomeShowcaseEnabled()
            && homeShowcaseProducts.length > getHomeShowcaseVisibleCount();
        if (!shouldRotate) {
            return;
        }

        homeShowcaseTimer = window.setInterval(() => {
            homeShowcaseIndex += 1;
            syncHomeShowcasePosition();
            queueHomeShowcaseLoopReset();
        }, 7000);
    }

    function renderHomeSaleShowcase() {
        if (!homeSaleShowcase || !homeSaleTrack || !homeSaleDots) {
            return;
        }

        const shouldShow = shouldShowHomeRecommendations();
        if (!shouldShow || !isHomeShowcaseEnabled()) {
            homeShowcaseProducts = [];
            homeShowcaseRenderSignature = '';
            homeSaleShowcase.classList.add('hidden');
            homeSaleTrack.innerHTML = '';
            homeSaleDots.innerHTML = '';
            stopHomeShowcaseRotation();
            clearHomeShowcaseLoopReset();
            return;
        }

        const visibleCount = getHomeShowcaseVisibleCount();
        if (homeShowcaseProducts.length && homeShowcaseRenderSignature && getHomeShowcaseRail()) {
            const cachedRenderSignature = [
                homeShowcaseProducts.map(product => product.id).join('|'),
                `visible:${visibleCount}`
            ].join('::');
            if (cachedRenderSignature === homeShowcaseRenderSignature) {
                homeSaleShowcase.classList.remove('hidden');
                syncHomeShowcaseWishlistButtons();
                syncHomeShowcasePosition({ animate: false });
                startHomeShowcaseRotation();
                return;
            }
        }

        homeShowcaseProducts = getHomeShowcaseProducts();
        const canRender = shouldShow && isHomeShowcaseEnabled() && homeShowcaseProducts.length > 0;

        homeSaleShowcase.classList.toggle('hidden', !canRender);
        if (!canRender) {
            homeShowcaseRenderSignature = '';
            homeSaleTrack.innerHTML = '';
            homeSaleDots.innerHTML = '';
            stopHomeShowcaseRotation();
            clearHomeShowcaseLoopReset();
            return;
        }

        const canSlide = homeShowcaseProducts.length > visibleCount;
        const nextRenderSignature = [
            homeShowcaseProducts.map(product => product.id).join('|'),
            `visible:${visibleCount}`
        ].join('::');
        if (nextRenderSignature === homeShowcaseRenderSignature && getHomeShowcaseRail()) {
            homeSaleShowcase.classList.remove('hidden');
            syncHomeShowcaseWishlistButtons();
            syncHomeShowcasePosition({ animate: false });
            startHomeShowcaseRotation();
            return;
        }
        homeShowcaseRenderSignature = nextRenderSignature;
        homeShowcaseIndex = canSlide
            ? ((homeShowcaseIndex % homeShowcaseProducts.length) + homeShowcaseProducts.length) % homeShowcaseProducts.length
            : 0;
        const loopProducts = canSlide
            ? [...homeShowcaseProducts, ...homeShowcaseProducts.slice(0, visibleCount)]
            : homeShowcaseProducts;

        homeSaleTrack.innerHTML = `
            <div class="home-sale-rail">
                ${loopProducts.map(buildHomeShowcaseCardMarkup).join('')}
            </div>
        `;
        homeSaleDots.innerHTML = canSlide ? homeShowcaseProducts.map((_, index) => `
            <button
                class="home-sale-dot ${index === homeShowcaseIndex ? 'active' : ''}"
                type="button"
                data-home-slide="${index}"
                aria-label="Đi tới nhóm sản phẩm ${index + 1}"
            ></button>
        `).join('') : '';

        repairRenderedContent();
        syncHomeShowcasePosition({ animate: false });
        startHomeShowcaseRotation();
    }

    function renderHomeFeatureStrip() {
        if (!homeFeatureStrip) {
            return;
        }

        homeFeatureStrip.classList.add('hidden');
    }

    function appendHomeShowcaseManagerCard() {
        const panel = document.getElementById('vouchers-mgmt-panel');
        const sideCard = panel?.querySelector('.workspace-side-card');
        if (!sideCard) {
            return;
        }

        sideCard.insertAdjacentHTML('beforeend', `
            <div class="workspace-side-divider"></div>
            <section class="workspace-form workspace-mini-panel">
                <div class="workspace-side-head">
                    <h3>Thiết lập trang chủ</h3>
                    <span class="workspace-chip">${isHomeShowcaseEnabled() ? 'Đang hiển thị' : 'Đang ẩn'}</span>
                </div>
                <p class="customer-card-meta">Quản lí có thể ẩn hoặc hiện khung Special Sale ở trang chủ. Khi tắt khung này, các phần bên dưới sẽ tự động dồn lên.</p>
                <button
                    class="secondary-btn text-bold"
                    type="button"
                    data-home-showcase-toggle="${isHomeShowcaseEnabled() ? 'hide' : 'show'}"
                >
                    ${isHomeShowcaseEnabled() ? 'Ẩn khung Special Sale' : 'Hiện khung Special Sale'}
                </button>
            </section>
        `);
    }

    function getPersonalizedHomeBaseProducts() {
        const recommendationPool = personalizedHomeProducts.slice(0, 18);
        const relatedPool = mergeUniqueProducts(
            recommendationPool,
            getHomeShowcaseProducts(),
            allProducts
        );
        return relatedPool.slice(0, 24);
    }

    function getFilteredPersonalizedHomeProducts(baseProducts) {
        const filteredProducts = (Array.isArray(baseProducts) ? baseProducts : []).filter(product => {
            const matchesPrice = matchesPriceRange(getProductCurrentPrice(product), homePersonalizedPriceRange);
            const matchesType = homePersonalizedType === 'all' || normalizeText(getProductGroupLabel(product)) === normalizeText(homePersonalizedType);
            const matchesBrand = homePersonalizedBrand === 'all' || normalizeText(product.thuong_hieu) === normalizeText(homePersonalizedBrand);
            const matchesSize = homePersonalizedSize === 'all' || normalizeText(normalizeSizeValue(product.size)) === normalizeText(homePersonalizedSize);
            return matchesPrice && matchesType && matchesBrand && matchesSize;
        });

        return sortProductList(filteredProducts, homePersonalizedSort);
    }

    function isHotCollectionProduct(product) {
        const hotBrands = ['nike', 'adidas', 'yonex', 'mizuno', 'puma'];
        return hotBrands.includes(normalizeText(product.thuong_hieu)) || (product.ton_kho ?? 0) <= 10;
    }

    function isSeagamesCollectionProduct(product) {
        const group = normalizeText(getProductGroupLabel(product));
        return group.includes('quan ao')
            || group.includes('giay')
            || group.includes('tat')
            || group.includes('balo')
            || group.includes('gang tay')
            || group.includes('phu kien')
            || group.includes('bao ve');
    }

    function normalizeSizeValue(size) {
        const normalized = String(size || '').trim();
        if (!normalized || normalized === '--' || normalizeText(normalized) === 'khong ro') {
            return '';
        }
        return normalized;
    }

    function getUniqueValues(values) {
        return Array.from(new Set(values.filter(Boolean)))
            .sort((left, right) => left.localeCompare(right, 'vi', { numeric: true }));
    }

    function hasOption(selectElement, value) {
        return Array.from(selectElement.options).some(option => option.value === value);
    }

    function getPriceRangeLabel(range) {
        const labels = {
            'under-500': 'Dưới 500.000đ',
            '500-1000': '500.000đ - 1.000.000đ',
            '1000-1500': '1.000.000đ - 1.500.000đ',
            'over-1500': 'Trên 1.500.000đ'
        };
        return labels[range] || 'Tất cả mức giá';
    }

    function matchesPriceRange(price, range) {
        const value = Number(price || 0);
        if (range === 'under-500') {
            return value < 500000;
        }
        if (range === '500-1000') {
            return value >= 500000 && value <= 1000000;
        }
        if (range === '1000-1500') {
            return value > 1000000 && value <= 1500000;
        }
        if (range === 'over-1500') {
            return value > 1500000;
        }
        return true;
    }

    function sortProducts(products) {
        return sortProductList(products, currentSortOption);
    }

    function renderCatalogHeader(filteredProducts) {
        if (getCurrentCollection()) {
            catalogToolbar.classList.add('hidden');
            clearFiltersButton.classList.add('hidden');
            return;
        }

        catalogToolbar.classList.remove('hidden');
        const currentItem = getCurrentMenuItem();
        const currentHeading = currentQuery
            ? 'Kết quả tìm kiếm'
            : currentBrand
            ? `${currentBrand} chính hãng`
            : currentItem
                ? `${currentItem.label} · ${currentItem.sport}`
                : currentCategory !== 'all'
                    ? currentCategory
                    : 'Toàn bộ sản phẩm';

        const currentDescription = currentQuery
            ? `Hiển thị kết quả cho từ khóa "${currentQuery}". Nhấn Enter để tìm kiếm mới hoặc chọn một gợi ý bên dưới ô tìm kiếm.`
            : currentBrand
            ? `Hiển thị các sản phẩm thuộc thương hiệu ${currentBrand}, bao gồm giày, bóng, vợt và phụ kiện liên quan.`
            : currentItem
                ? `Lọc nhanh nhóm ${currentItem.label.toLowerCase()} trong danh mục ${currentItem.sport.toLowerCase()} để khách hàng chọn đúng loại sản phẩm cần mua.`
                : currentCategory !== 'all'
                    ? `Khám phá đầy đủ sản phẩm thuộc danh mục ${currentCategory.toLowerCase()}, từ mặt hàng chủ lực đến phụ kiện đi kèm.`
                    : 'Khám phá đầy đủ giày, bóng, vợt, trang phục và phụ kiện thể thao theo đúng nhu cầu của khách hàng.';

        catalogTitle.textContent = currentHeading;
        catalogDescription.textContent = currentDescription;
        catalogCount.textContent = `${filteredProducts.length} sản phẩm`;
        clearFiltersButton.classList.toggle('hidden', !hasActiveFilters());
    }

    function renderCatalogHeader(filteredProducts) {
        if (getCurrentCollection()) {
            catalogToolbar.classList.add('hidden');
            clearFiltersButton.classList.add('hidden');
            return;
        }

        catalogToolbar.classList.remove('hidden');
        const currentItem = getCurrentMenuItem();
        const currentHeading = currentQuery
            ? '\u004b\u1ebf\u0074\u0020\u0071\u0075\u1ea3\u0020\u0074\u00ec\u006d\u0020\u006b\u0069\u1ebf\u006d'
            : currentBrand
                ? `${currentBrand} chính hãng`
                : currentItem
                    ? `${currentItem.label} · ${currentItem.sport}`
                    : currentCategory !== 'all'
                        ? currentCategory
                        : 'Toàn bộ sản phẩm';

        const currentDescription = currentQuery
            ? '\u0048\u0069\u1ec3\u006e\u0020\u0074\u0068\u1ecb\u0020\u006b\u1ebf\u0074\u0020\u0071\u0075\u1ea3\u0020\u0063\u0068\u006f\u0020\u0074\u1eeb\u0020\u006b\u0068\u00f3\u0061\u0020"' + currentQuery + '".\u0020\u004e\u0068\u1ea5\u006e\u0020\u0045\u006e\u0074\u0065\u0072\u0020\u0111\u1ec3\u0020\u0074\u00ec\u006d\u0020\u006b\u0069\u1ebf\u006d\u0020\u006d\u1edb\u0069\u0020\u0068\u006f\u1eb7\u0063\u0020\u0063\u0068\u1ecd\u006e\u0020\u006d\u1ed9\u0074\u0020\u0067\u1ee3\u0069\u0020\u00fd\u0020\u0062\u00ea\u006e\u0020\u0064\u01b0\u1edb\u0069\u0020\u00f4\u0020\u0074\u00ec\u006d\u0020\u006b\u0069\u1ebf\u006d.'
            : currentBrand
                ? `Hiển thị các sản phẩm thuộc thương hiệu ${currentBrand}, bao gồm giày, bóng, vợt và phụ kiện liên quan.`
                : currentItem
                    ? `Lọc nhanh nhóm ${currentItem.label.toLowerCase()} trong danh mục ${currentItem.sport.toLowerCase()} để khách hàng chọn đúng loại sản phẩm cần mua.`
                    : currentCategory !== 'all'
                        ? `Khám phá đầy đủ sản phẩm thuộc danh mục ${currentCategory.toLowerCase()}, từ mặt hàng chủ lực đến phụ kiện đi kèm.`
                        : 'Khám phá đầy đủ giày, bóng, vợt, trang phục và phụ kiện thể thao theo đúng nhu cầu của khách hàng.';

        catalogTitle.textContent = currentHeading;
        catalogDescription.textContent = currentDescription;
        catalogCount.textContent = `${filteredProducts.length} sản phẩm`;
        clearFiltersButton.classList.toggle('hidden', !hasActiveFilters());
    }

    function renderCollectionView(baseProducts, filteredProducts) {
        const currentCollection = getCurrentCollection();
        collectionView.classList.toggle('hidden', !currentCollection);

        if (!currentCollection) {
            return;
        }

        collectionBreadcrumb.textContent = currentCollection.breadcrumb;
        collectionEyebrow.textContent = currentCollection.eyebrow;
        collectionTitle.textContent = currentCollection.label;
        collectionDescription.textContent = currentCollection.description;
        collectionCount.textContent = `${filteredProducts.length} sản phẩm`;

        collectionShortcuts.classList.toggle('hidden', Boolean(currentQuery));
        collectionShortcuts.innerHTML = currentQuery
            ? ''
            : COLLECTION_SECTIONS.map(collection => `
                <button
                    type="button"
                    class="collection-shortcut ${collection.id === currentCollectionId ? 'active' : ''}"
                    data-collection-shortcut="${collection.id}"
                >
                    <i class="fa-solid ${collection.icon}"></i>
                    <span>${escapeHtml(collection.label)}</span>
                </button>
            `).join('');

        collectionShortcuts.querySelectorAll('[data-collection-shortcut]').forEach(button => {
            button.addEventListener('click', () => applyCollectionFilter(button.dataset.collectionShortcut));
        });

        fillSelectOptions(
            typeFilter,
            'all',
            'Tất cả loại sản phẩm',
            getUniqueValues(baseProducts.map(product => getProductGroupLabel(product)))
        );
        fillSelectOptions(
            brandFilter,
            'all',
            'Tất cả thương hiệu',
            getUniqueValues(baseProducts.map(product => product.thuong_hieu))
        );
        fillSelectOptions(
            sizeFilter,
            'all',
            'Tất cả size',
            getUniqueValues(baseProducts.map(product => normalizeSizeValue(product.size)))
        );

        priceFilter.value = currentPriceRange;
        typeFilter.value = hasOption(typeFilter, currentTypeFilter) ? currentTypeFilter : 'all';
        brandFilter.value = hasOption(brandFilter, currentBrand) ? currentBrand : 'all';
        sizeFilter.value = hasOption(sizeFilter, currentSizeFilter) ? currentSizeFilter : 'all';
        sortFilter.value = currentSortOption;
    }

    function fillSelectOptions(selectElement, allValue, allLabel, values) {
        const options = [`<option value="${allValue}">${escapeHtml(allLabel)}</option>`];
        values.forEach(value => {
            options.push(`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`);
        });
        selectElement.innerHTML = options.join('');
    }

    function renderActiveFilters() {
        const chips = [];
        const currentItem = getCurrentMenuItem();
        const currentCollection = getCurrentCollection();

        if (currentCollection) {
            chips.push(renderFilterChip('Bộ sưu tập', currentCollection.label, 'collection'));
        }

        if (currentCategory !== 'all') {
            chips.push(renderFilterChip('Danh mục', currentCategory, 'category'));
        }

        if (currentItem) {
            chips.push(renderFilterChip('Nhóm', currentItem.label, 'item'));
        }

        if (currentBrand) {
            chips.push(renderFilterChip('Thương hiệu', currentBrand, 'brand'));
        }

        if (currentPriceRange !== 'all') {
            chips.push(renderFilterChip('Giá', getPriceRangeLabel(currentPriceRange), 'price'));
        }

        if (currentTypeFilter !== 'all') {
            chips.push(renderFilterChip('Loại sản phẩm', currentTypeFilter, 'type'));
        }

        if (currentSizeFilter !== 'all') {
            chips.push(renderFilterChip('Size', currentSizeFilter, 'size'));
        }

        if (currentQuery) {
            chips.push(renderFilterChip('Từ khóa', currentQuery, 'query'));
        }

        activeFilters.classList.toggle('hidden', chips.length === 0);
        activeFilters.innerHTML = chips.join('');
    }

    function getFilteredProducts(baseProducts = getBaseProducts()) {
        const filteredProducts = baseProducts.filter(product => {
            const matchesCategory = currentCollectionId
                ? true
                : currentCategory === 'all' || normalizeText(getCanonicalSportFromProduct(product)) === normalizeText(currentCategory);
            const matchesMenuItem = currentCollectionId
                ? true
                : !currentMenuItemId || matchesMenuItemRule(product, getCurrentMenuItem());
            const matchesBrand = !currentBrand || normalizeText(product.thuong_hieu) === normalizeText(currentBrand);
            const matchesType = currentTypeFilter === 'all' || normalizeText(getProductGroupLabel(product)) === normalizeText(currentTypeFilter);
            const matchesSize = currentSizeFilter === 'all' || normalizeText(normalizeSizeValue(product.size)) === normalizeText(currentSizeFilter);
            const matchesPrice = matchesPriceRange(getProductCurrentPrice(product), currentPriceRange);

            const haystack = normalizeText([
                product.ten_san_pham,
                product.danh_muc,
                product.thuong_hieu,
                product.sku,
                getProductGroupLabel(product)
            ].filter(Boolean).join(' '));
            const matchesQuery = !currentQuery || haystack.includes(normalizeText(currentQuery));

            return matchesCategory && matchesMenuItem && matchesBrand && matchesType && matchesSize && matchesPrice && matchesQuery;
        });

        return sortProducts(filteredProducts);
    }

    function applyCollectionFilter(collectionId) {
        currentQuery = '';
        if (searchInput) {
            searchInput.value = '';
        }
        currentCollectionId = collectionId || '';
        currentCategory = 'all';
        currentMenuItemId = '';
        currentBrand = '';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        closeSearchSuggestions();
        trackBehaviorEvent({
            eventType: 'CATEGORY_CLICK',
            pageType: 'COLLECTION',
            pageKey: `collection:${collectionId || 'all'}`,
            categoryKey: collectionId || ''
        });
        renderCatalog();
    }

    function applyCategoryFilter(category) {
        currentQuery = '';
        if (searchInput) {
            searchInput.value = '';
        }
        currentCollectionId = '';
        currentCategory = category || 'all';
        currentMenuItemId = '';
        currentBrand = '';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        closeSearchSuggestions();
        trackBehaviorEvent({
            eventType: 'CATEGORY_CLICK',
            pageType: 'CATALOG',
            pageKey: `category:${category || 'all'}`,
            categoryKey: category || ''
        });
        closeMegaMenu();
        renderCatalog();
    }

    function applyMenuItemFilter(itemId) {
        const item = findMenuItemById(itemId);
        if (!item) {
            return;
        }

        currentQuery = '';
        if (searchInput) {
            searchInput.value = '';
        }
        currentCollectionId = '';
        currentCategory = item.sport;
        currentMenuItemId = itemId;
        currentBrand = '';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        closeSearchSuggestions();
        trackBehaviorEvent({
            eventType: 'CATEGORY_CLICK',
            pageType: 'CATALOG',
            pageKey: `menu-item:${itemId}`,
            categoryKey: item.sport || '',
            metadata: {
                menuItemId: itemId,
                menuItemLabel: item.label || ''
            }
        });
        closeMegaMenu();
        renderCatalog();
    }

    function applyBrandFilter(brand) {
        currentQuery = '';
        if (searchInput) {
            searchInput.value = '';
        }
        currentCollectionId = '';
        currentBrand = brand || '';
        currentMenuItemId = '';
        currentCategory = 'all';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        closeSearchSuggestions();
        trackBehaviorEvent({
            eventType: 'CATEGORY_CLICK',
            pageType: 'CATALOG',
            pageKey: `brand:${brand || 'all'}`,
            brandKey: brand || ''
        });
        closeMegaMenu();
        renderCatalog();
    }

    function resetCatalogState(options = {}) {
        const { clearQuery = false, skipRender = false } = options;
        currentCollectionId = '';
        currentCategory = 'all';
        currentMenuItemId = '';
        currentBrand = '';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        if (clearQuery) {
            currentQuery = '';
            searchInput.value = '';
        }
        closeSearchSuggestions();
        if (!skipRender) {
            renderCatalog();
        }
    }

    function syncNavState() {
        const isMegaMenuOpen = !megaMenu.classList.contains('hidden');
        catalogTrigger.classList.toggle('active', !currentCollectionId && (isMegaMenuOpen || Boolean(currentMenuItemId) || Boolean(currentBrand) || (currentView === 'catalog' && currentCategory === 'all')));

        navCollectionLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.collection === currentCollectionId);
        });
        promoHuntLink?.classList.toggle('active', currentView === 'promo-hunt');
    }

    function getMegaMenuSummary() {
        const currentItem = getCurrentMenuItem();
        if (currentBrand && !currentCollectionId) {
            return `Đang xem theo thương hiệu ${currentBrand}. Chọn thương hiệu khác hoặc quay lại toàn bộ sản phẩm.`;
        }
        if (currentItem && !currentCollectionId) {
            return `Đang lọc nhóm ${currentItem.label.toLowerCase()} trong danh mục ${currentItem.sport.toLowerCase()}.`;
        }
        if (currentCategory !== 'all' && !currentCollectionId) {
            return `Đang xem toàn bộ sản phẩm thuộc danh mục ${currentCategory.toLowerCase()}.`;
        }
        return 'Chọn nhanh theo môn thể thao, trang phục, phụ kiện hoặc thương hiệu.';
    }

    function hasActiveFilters() {
        return Boolean(currentCollectionId)
            || currentCategory !== 'all'
            || Boolean(currentMenuItemId)
            || Boolean(currentBrand)
            || currentPriceRange !== 'all'
            || currentTypeFilter !== 'all'
            || currentSizeFilter !== 'all'
            || Boolean(currentQuery);
    }

    async function loadProducts() {
        productContainer.innerHTML = '<p class="loading-text">Đang tải sản phẩm...</p>';

        try {
            const products = await apiRequest('/products', { auth: false });
            allProducts = products.map(enrichProduct);
            renderCatalog();
            renderAdminProductList();
            if (isAdmin()) {
                await renderUserList();
            } else {
                userListBody.innerHTML = '';
            }
        } catch (error) {
            productContainer.innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
        }
    }

    function renderProducts(products) {
        if (!products.length) {
            productContainer.innerHTML = '<p class="loading-text">Không có sản phẩm phù hợp với bộ lọc hiện tại.</p>';
            return;
        }

        productContainer.innerHTML = products.map(product => {
            const badge = product.ton_kho <= 3
                ? '<span class="badge danger">Sắp hết</span>'
                : (product.ton_kho <= 10 ? '<span class="badge warning">Bán chạy</span>' : '');

            return `
                <article class="product-card">
                    <div class="product-img">
                        ${badge}
                        <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham)}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                        <h3 class="product-name">${escapeHtml(product.ten_san_pham || '')}</h3>
                        <p class="product-subcategory">${escapeHtml(getProductGroupLabel(product))}</p>
                        <div class="product-meta">
                            <span>${escapeHtml(product.thuong_hieu || 'Không rõ')}</span>
                            <span>${escapeHtml(normalizeSizeValue(product.size) || '--')}</span>
                        </div>
                        ${renderPriceDisplay(product, { wrapperClass: 'price-stack wishlist-price-block', currentClass: 'product-price' })}
                        <p class="product-stock">Tồn kho: ${product.ton_kho ?? 0}</p>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                </article>
            `;
        }).join('');
    }

    function addToCart(productId) {
        const product = allProducts.find(item => item.id === productId);
        if (!product) {
            return;
        }

        const cartItems = readStorage(CART_KEY, []);
        cartItems.push({
            id: product.id,
            ten_san_pham: product.ten_san_pham,
            gia_ban: product.gia_ban
        });
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        updateCartCount();
        showCenteredMessage(`\u0110\u00e3 th\u00eam "${sanitizeProductText(product.ten_san_pham || 's\u1ea3n ph\u1ea9m')}" v\u00e0o gi\u1ecf h\u00e0ng.`);
    }

    function updateAuthUI() {
        const authenticated = Boolean(currentUser);

        if (!authenticated) {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
            userDropdown.classList.add('hidden');
            dropName.textContent = 'Khách';
            dropRole.textContent = 'Vai trò';
            return;
        }

        dropName.textContent = currentUser.ho_ten || 'Người dùng';
        dropRole.textContent = currentUser.role || 'Thành viên';

        if (canManageProducts()) {
            adminPanel.classList.remove('hidden');
            adminLink.classList.remove('hidden');
        } else {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
        }

        document.getElementById('users-tab-btn').classList.toggle('hidden', !isAdmin());
        repairRenderedContent();
    }

    async function apiRequest(path, options = {}) {
        const {
            method = 'GET',
            body,
            auth = true
        } = options;

        const headers = {
            'Content-Type': 'application/json'
        };

        if (auth && token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        if (response.status === 204) {
            return null;
        }

        const text = await response.text();
        const data = text ? safeJsonParse(text) : null;

        if (!response.ok) {
            const message = buildApiErrorMessage(path, response, text, data);
            if (response.status === 401) {
                clearSession();
                updateAuthUI();
            }
            throw new Error(message);
        }

        return data;
    }

    function safeJsonParse(text) {
        try {
            return JSON.parse(text);
        } catch (error) {
            return null;
        }
    }

    function readStorage(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function normalizeText(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function formatCurrency(value) {
        return `${new Intl.NumberFormat('vi-VN').format(Number(value || 0))}đ`;
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    function getProductImageUrl(product) {
        const explicitUrl = String(product.hinh_anh_url || '').trim();
        if (explicitUrl) {
            return explicitUrl;
        }
        return buildProductPoster(product);
    }

    function buildProductPoster(product) {
        const [startColor, endColor] = getCategoryPalette(product.danh_muc);
        const brand = escapeSvgText(product.thuong_hieu || 'Flare Fitness');
        const category = escapeSvgText(product.danh_muc || 'Thể thao');
        const name = escapeSvgText((product.ten_san_pham || 'Sản phẩm').slice(0, 56));
        const sku = escapeSvgText(product.sku || '');
        const price = escapeSvgText(formatCurrency(getProductCurrentPrice(product)));
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                <defs>
                    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stop-color="${startColor}"/>
                        <stop offset="100%" stop-color="${endColor}"/>
                    </linearGradient>
                </defs>
                <rect width="800" height="800" fill="url(#g)"/>
                <circle cx="660" cy="140" r="110" fill="rgba(255,255,255,0.12)"/>
                <circle cx="120" cy="680" r="150" fill="rgba(255,255,255,0.08)"/>
                <rect x="52" y="52" width="696" height="696" rx="36" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
                <text x="80" y="122" fill="#F9FAFB" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700">${brand}</text>
                <text x="80" y="168" fill="#DBEAFE" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600">${category}</text>
                <foreignObject x="80" y="220" width="640" height="270">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Segoe UI,Arial,sans-serif;font-size:44px;line-height:1.15;color:#FFFFFF;font-weight:800;">
                        ${name}
                    </div>
                </foreignObject>
                <text x="80" y="636" fill="#E5E7EB" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600">${sku}</text>
                <text x="80" y="698" fill="#FDE68A" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="800">${price}</text>
            </svg>
        `;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function getCategoryPalette(category) {
        const normalized = normalizeText(category);
        if (normalized.includes('bong da')) {
            return ['#0B2E59', '#1D8348'];
        }
        if (normalized.includes('bong ban')) {
            return ['#7C2D12', '#DC2626'];
        }
        if (normalized.includes('bong chuyen')) {
            return ['#0F766E', '#0EA5E9'];
        }
        if (normalized.includes('bong ro')) {
            return ['#7C2D12', '#EA580C'];
        }
        if (normalized.includes('cau long')) {
            return ['#1D4ED8', '#4F46E5'];
        }
        return ['#1E3A8A', '#BF3828'];
    }

    function escapeSvgText(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function enrichProduct(product) {
        const sku = String(product.sku || '').trim().toUpperCase();
        const originalPrice = Number(product.gia_ban || 0);
        const discountPercent = getPromotionPercentBySku(sku);
        const discountedPrice = discountPercent > 0
            ? roundPromotionPrice(originalPrice * ((100 - discountPercent) / 100))
            : originalPrice;

        return {
            ...product,
            gia_goc: originalPrice,
            gia_hien_thi: discountedPrice,
            phan_tram_giam: discountPercent,
            ten_san_pham: normalizeProductName(product.ten_san_pham, sku),
            danh_muc: getCanonicalSportFromSku(product.sku, product.danh_muc),
            thuong_hieu: normalizeBrand(product.thuong_hieu, sku),
            size: normalizeProductSize(product.size, sku),
            mau: normalizeProductColor(product.mau, sku),
            ghi_chu: sanitizeProductText(product.ghi_chu),
            mo_ta_ngan: sanitizeProductText(product.mo_ta_ngan),
            trang_thai: sanitizeProductText(product.trang_thai)
        };
    }

    function getPromotionPercentBySku(sku) {
        return Number(PRODUCT_PROMOTION_MAP[String(sku || '').trim().toUpperCase()] || 0);
    }

    function roundPromotionPrice(value) {
        return Math.max(0, Math.round(Number(value || 0) / 1000) * 1000);
    }

    function getProductOriginalPrice(product) {
        return Number(product?.gia_goc ?? product?.gia_ban ?? 0);
    }

    function getProductVoucherDiscountAmount(voucher, productPrice) {
        const price = Number(productPrice || 0);
        if (!voucher || price <= 0 || price < Number(voucher.minOrder || 0)) {
            return 0;
        }

        const rawDiscount = price * Number(voucher.percent || 0);
        const maxDiscount = Number(voucher.maxDiscount || 0);
        return maxDiscount > 0 ? Math.min(rawDiscount, maxDiscount) : rawDiscount;
    }

    function voucherAppliesToProduct(voucher, product) {
        const categories = getVoucherCategories(voucher);
        if (!categories.length || categories.some(category => normalizeText(category) === 'tat ca')) {
            return true;
        }

        const productTargets = [
            product?.danh_muc,
            getCanonicalSportFromProduct(product),
            getProductGroupLabel(product)
        ].map(value => normalizeText(value)).filter(Boolean);

        return categories.some(category => productTargets.includes(normalizeText(category)));
    }

    function getBestProductVoucher(product) {
        const originalPrice = getProductOriginalPrice(product);
        if (originalPrice <= 0) {
            return null;
        }

        return getCustomerVisibleVouchers()
            .filter(voucher => voucherAppliesToProduct(voucher, product))
            .map(voucher => ({
                voucher,
                discount: getProductVoucherDiscountAmount(voucher, originalPrice)
            }))
            .filter(item => item.discount > 0)
            .sort((left, right) => right.discount - left.discount)[0]?.voucher || null;
    }

    function getProductCurrentPrice(product) {
        const originalPrice = getProductOriginalPrice(product);
        const basePrice = Number(product?.gia_hien_thi ?? product?.gia_ban ?? 0);
        const productVoucher = getBestProductVoucher(product);
        if (!productVoucher) {
            return basePrice;
        }

        const voucherDiscount = getProductVoucherDiscountAmount(productVoucher, originalPrice);
        const voucherPrice = roundPromotionPrice(originalPrice - voucherDiscount);
        return Math.max(0, Math.min(basePrice, voucherPrice));
    }

    function getProductDiscountPercent(product) {
        const originalPrice = getProductOriginalPrice(product);
        const currentPrice = getProductCurrentPrice(product);
        if (originalPrice <= 0 || currentPrice >= originalPrice) {
            return 0;
        }

        return Math.max(0, Math.round(((originalPrice - currentPrice) / originalPrice) * 100));
    }

    function hasProductPromotion(product) {
        return getProductDiscountPercent(product) > 0 && getProductCurrentPrice(product) < getProductOriginalPrice(product);
    }

    function renderPriceDisplay(product, options = {}) {
        const {
            wrapperClass = 'price-stack',
            currentClass = 'price-current',
            oldClass = 'price-old',
            tagClass = 'price-discount-tag'
        } = options;

        const currentPrice = getProductCurrentPrice(product);
        const originalPrice = getProductOriginalPrice(product);
        const discountPercent = getProductDiscountPercent(product);

        if (!hasProductPromotion(product)) {
            return `
                <div class="${wrapperClass}">
                    <span class="${currentClass}">${formatCurrency(currentPrice)}</span>
                </div>
            `;
        }

        return `
            <div class="${wrapperClass}">
                <span class="${oldClass}">${formatCurrency(originalPrice)}</span>
                <div class="price-current-row">
                    <span class="${currentClass}">${formatCurrency(currentPrice)}</span>
                    <span class="${tagClass}">-${discountPercent}%</span>
                </div>
            </div>
        `;
    }

    function normalizeProductName(value, sku = '') {
        const overrides = {
            'VB-001': 'Bóng chuyền hơi Động Lực',
            'BB-017': 'Bảng rổ mini Spalding Slam Jam Over-The-Door Mini Hoop',
            'TT-001': 'Vợt bóng bàn 7 lớp gỗ',
            'FB-132': 'Áo Argentina có chữ ký Lionel Messi',
            'FB-133': 'Áo Bồ Đào Nha có chữ ký Cristiano Ronaldo',
            'FB-134': 'Áo Brazil có chữ ký Neymar Jr',
            'FB-135': 'Áo Pháp có chữ ký Kylian Mbappe',
            'BB-126': 'Áo bóng rổ có chữ ký Michael Jordan',
            'BB-127': 'Áo bóng rổ có chữ ký LeBron James',
            'VB-129': 'Áo bóng chuyền có chữ ký Earvin Ngapeth',
            'VB-130': 'Áo bóng chuyền có chữ ký Yuji Nishida',
            'TT-130': 'Vợt bóng bàn có chữ ký Ma Long',
            'TT-131': 'Vợt bóng bàn có chữ ký Fan Zhendong',
            'BM-128': 'Vợt cầu lông có chữ ký Lin Dan',
            'BM-129': 'Vợt cầu lông có chữ ký Viktor Axelsen'
        };
        if (overrides[sku]) {
            return overrides[sku];
        }

        const cleaned = sanitizeProductText(value);
        const skuPrefix = getSkuPrefix(sku);
        const skuNumber = getSkuNumber(sku);

        if (skuPrefix === 'FB') {
            const tail = extractProductTail(cleaned, ['Nike', 'adidas', 'Puma', 'PUMA', 'Mizuno', 'Select']);
            if (skuNumber === 1) return 'Giày bóng đá cỏ nhân tạo Nike';
            if (skuNumber === 3) return 'Áo thi đấu CLB Manchester City 2024';
            if (skuNumber >= 7 && skuNumber <= 15) return `Giày bóng đá ${tail}`;
            if (skuNumber === 16 || skuNumber === 27) return `Bóng đá ${tail}`;
            if (skuNumber === 17 || skuNumber === 18) return `Áo tập bóng đá ${tail}`;
            if (skuNumber === 19) return `Áo bóng đá ${tail}`;
            if (skuNumber === 20) return `Áo khoác bóng đá ${tail}`;
            if (skuNumber === 21 || skuNumber === 22) return `Quần tập bóng đá ${tail}`;
            if (skuNumber === 23) return `Balo bóng đá ${tail}`;
            if (skuNumber === 24) return `Túi trống bóng đá ${tail}`;
            if (skuNumber === 25) return `Bịt ống đồng bóng đá ${tail}`;
            if (skuNumber === 26) return `Găng tay thủ môn ${tail}`;
            if (skuNumber === 28 || skuNumber === 29) return `Tất bóng đá ${tail}`;
            if (skuNumber === 30 || skuNumber === 31) return `${tail}`;
        }

        if (skuPrefix === 'VB') {
            const tail = extractProductTail(cleaned, ['Mikasa', 'Molten', 'Wilson', 'Tachikara', 'adidas', 'Mizuno', 'ASICS', 'Nike', 'Puma', 'McDavid']);
            if (skuNumber >= 2 && skuNumber <= 5) return `Bóng chuyền ${tail}`;
            if (skuNumber === 6 || skuNumber === 8 || skuNumber === 9) return `Bóng chuyền bãi biển ${tail}`;
            if (skuNumber === 7) return `Bóng chuyền ${tail}`;
            if (skuNumber >= 10 && skuNumber <= 14) return `Giày bóng chuyền ${tail}`;
            if (skuNumber === 15 || skuNumber === 16 || skuNumber === 19) return `Bảo vệ gối bóng chuyền ${tail}`;
            if (skuNumber === 17) return 'Áo thi đấu bóng chuyền adidas Tabela 23 Jersey';
            if (skuNumber === 18) return 'Áo bóng chuyền Puma teamLIGA Jersey';
            if (skuNumber === 20) return 'Bóng chuyền mini Mikasa VQ2000';
            if (skuNumber === 21) return `Giày bóng chuyền ${tail}`;
        }

        if (skuPrefix === 'BB') {
            const tail = extractProductTail(cleaned, ['Spalding', 'Molten', 'Wilson', 'Nike', 'adidas', 'PUMA', 'Under Armour', 'Jordan', 'McDavid']);
            if ((skuNumber >= 2 && skuNumber <= 8) || skuNumber === 15 || skuNumber === 16 || skuNumber === 18 || skuNumber === 23) return `Bóng rổ ${tail}`;
            if (skuNumber >= 9 && skuNumber <= 14) return `Giày bóng rổ ${tail}`;
            if (skuNumber === 19) return `Ống tay bóng rổ ${tail}`;
            if (skuNumber === 20) return `Tất bóng rổ ${tail}`;
            if (skuNumber === 21) return `Áo bóng rổ ${tail}`;
            if (skuNumber === 22) return `Balo bóng rổ ${tail}`;
        }

        if (skuPrefix === 'TT') {
            const tail = extractProductTail(cleaned, ['Butterfly', 'DHS', '729 Focus 1', '729', 'STIGA', 'Donic', 'JOOLA', 'Nittaku', 'Xiom']);
            if ((skuNumber >= 7 && skuNumber <= 16) || skuNumber === 27) return `Vợt bóng bàn ${tail}`;
            if (skuNumber >= 17 && skuNumber <= 21) return `Mặt vợt bóng bàn ${tail}`;
            if (skuNumber >= 22 && skuNumber <= 24) return `Bóng bóng bàn ${tail}`;
            if (skuNumber === 25) return `Bộ lưới bóng bàn ${tail}`;
            if (skuNumber === 26) return `Keo dán mặt vợt ${tail}`;
        }

        if (skuPrefix === 'BM') {
            const tail = extractProductTail(cleaned, ['Yonex', 'Li-Ning', 'Victor', 'VICTOR']);
            if ((skuNumber >= 2 && skuNumber <= 9) || skuNumber === 22) return `Vợt cầu lông ${tail}`;
            if (skuNumber === 10 || skuNumber === 12 || skuNumber === 13) return `Cầu lông lông vũ ${tail}`;
            if (skuNumber === 11) return `Cầu lông nhựa ${tail}`;
            if (skuNumber >= 14 && skuNumber <= 17) return `Giày cầu lông ${tail}`;
            if (skuNumber === 18 || skuNumber === 19) return `Cước cầu lông ${tail}`;
            if (skuNumber === 20) return `Túi cầu lông ${tail}`;
            if (skuNumber === 21) return `Quấn cán cầu lông ${tail}`;
        }

        return repairQuestionMarkText(cleaned, sku, 'name');
    }

    function normalizeBrand(value, sku = '') {
        const skuOverrides = {
            'VB-001': 'Động Lực'
        };

        if (skuOverrides[sku]) {
            return skuOverrides[sku];
        }

        const cleaned = sanitizeProductText(value);
        const aliasMap = {
            'puma': 'Puma',
            'joola': 'JOOLA',
            'stiga': 'STIGA',
            'asics': 'ASICS',
            'dhs': 'DHS',
            'li-ning': 'Li-Ning',
            'li ning': 'Li-Ning',
            'under armour': 'Under Armour',
            '729-focus': '729-Focus',
            '729': '729'
        };
        return aliasMap[normalizeText(cleaned)] || cleaned;
    }

    function normalizeProductSize(value, sku = '') {
        const cleaned = sanitizeProductText(value);
        const skuPrefix = getSkuPrefix(sku);
        const skuNumber = getSkuNumber(sku);

        if (skuPrefix === 'FB') {
            if (skuNumber === 16 || skuNumber === 27) return 'Số 5';
        }

        if (skuPrefix === 'VB') {
            if (skuNumber === 1) return 'Tiêu chuẩn / Mềm';
            if ((skuNumber >= 2 && skuNumber <= 9) || skuNumber === 22) return 'Số 5';
        }

        if (skuPrefix === 'BB') {
            if ((skuNumber >= 2 && skuNumber <= 8) || skuNumber === 15 || skuNumber === 16 || skuNumber === 18 || skuNumber === 23) return 'Số 7';
        }

        if (skuPrefix === 'TT') {
            if ((skuNumber >= 7 && skuNumber <= 16) || skuNumber === 25 || skuNumber === 27 || skuNumber === 1) return 'Tiêu chuẩn';
        }

        if (skuPrefix === 'BM') {
            if (skuNumber === 10 || skuNumber === 12 || skuNumber === 13) return '12 quả';
            if (skuNumber === 11) return '6 quả';
            if (skuNumber === 20) return '6 cây';
            if (skuNumber === 21) return '3 cuộn';
        }

        return repairQuestionMarkText(cleaned, sku, 'size');
    }

    function normalizeProductColor(value, sku = '') {
        const overrides = {
            'TT-001': 'Gỗ / Đen',
            'TT-007': 'Đỏ / Đen',
            'TT-008': 'Đỏ / Đen',
            'TT-009': 'Đỏ / Đen',
            'TT-010': 'Đỏ / Đen',
            'TT-011': 'Đỏ / Đen',
            'TT-012': 'Đỏ / Đen',
            'TT-013': 'Đỏ / Đen',
            'TT-014': 'Đen / Đỏ',
            'TT-015': 'Đỏ / Đen',
            'TT-016': 'Đỏ / Đen',
            'TT-017': 'Đỏ',
            'TT-018': 'Đen',
            'TT-019': 'Đỏ',
            'TT-020': 'Đen',
            'TT-021': 'Đỏ',
            'TT-022': 'Trắng',
            'TT-023': 'Trắng',
            'TT-024': 'Trắng',
            'TT-025': 'Đen',
            'TT-026': 'Trắng',
            'TT-027': 'Gỗ tự nhiên',
            'TT-028': 'Đen / Xanh',
            'FB-001': 'Xanh / Trắng',
            'FB-003': 'Xanh dương',
            'FB-007': 'Đen / Xanh ngọc',
            'FB-008': 'Trắng / Hồng',
            'FB-009': 'Xanh lam / Trắng',
            'FB-010': 'Đỏ / Đen',
            'FB-011': 'Trắng / Xanh',
            'FB-012': 'Trắng / Đen',
            'FB-013': 'Xanh navy / Bạc',
            'FB-014': 'Vàng / Đen',
            'FB-015': 'Trắng / Đỏ',
            'FB-016': 'Trắng / Xanh',
            'FB-017': 'Đen',
            'FB-018': 'Xanh navy',
            'FB-019': 'Trắng / Đen',
            'FB-020': 'Xám / Đen',
            'FB-021': 'Đen',
            'FB-022': 'Đen',
            'FB-023': 'Đen / Trắng',
            'FB-024': 'Đen',
            'FB-025': 'Trắng / Đen',
            'FB-026': 'Đen / Đỏ',
            'FB-027': 'Trắng / Đen',
            'FB-028': 'Trắng / Đen',
            'FB-029': 'Xanh navy / Trắng',
            'FB-030': 'Đen / Trắng',
            'FB-031': 'Trắng / Đỏ',
            'VB-004': 'Xanh / Đỏ / Trắng',
            'VB-002': 'Vàng / Xanh',
            'VB-003': 'Vàng / Xanh',
            'VB-005': 'Xanh / Trắng',
            'VB-006': 'Vàng / Xanh',
            'VB-008': 'Vàng / Xanh',
            'VB-009': 'Xanh / Trắng',
            'VB-010': 'Trắng / Xanh',
            'VB-011': 'Trắng / Tím',
            'VB-007': 'Trắng / Đỏ / Xanh',
            'VB-012': 'Trắng / Đỏ',
            'VB-013': 'Đen / Bạc',
            'VB-014': 'Đen / Volt',
            'VB-015': 'Đen',
            'VB-016': 'Đen',
            'VB-017': 'Đỏ / Trắng',
            'VB-018': 'Trắng / Đen',
            'VB-019': 'Đen',
            'VB-020': 'Vàng / Xanh',
            'VB-022': 'Vàng / Xanh',
            'VB-023': 'Trắng / Xanh',
            'VB-024': 'Đen / Trắng',
            'VB-026': 'Trắng / Xanh',
            'VB-027': 'Đen / Xanh',
            'VB-028': 'Đen',
            'BB-009': 'Trắng / Xanh',
            'BB-010': 'Đen / Vàng',
            'BB-011': 'Đen / Trắng',
            'BB-012': 'Đỏ / Đen',
            'BB-013': 'Trắng / Cam',
            'BB-014': 'Xanh / Bạc',
            'BB-015': 'Cam / Đen',
            'BB-016': 'Cam / Đen',
            'BB-017': 'Đen / Đỏ',
            'BB-018': 'Nâu cam',
            'BB-019': 'Đen',
            'BB-020': 'Trắng / Đen',
            'BB-021': 'Đen',
            'BB-022': 'Đen / Xám',
            'BB-024': 'Đen / Đỏ',
            'BB-025': 'Xám / Đen',
            'BM-002': 'Đen / Bạc',
            'BM-006': 'Trắng / Xanh',
            'BM-007': 'Đen / Vàng',
            'BM-009': 'Xanh / Đen',
            'BM-010': 'Trắng',
            'BM-011': 'Vàng',
            'BM-012': 'Trắng',
            'BM-013': 'Trắng',
            'BM-014': 'Trắng / Xanh',
            'BM-016': 'Trắng / Xanh',
            'BM-017': 'Đen / Đỏ',
            'BM-018': 'Trắng',
            'BM-019': 'Vàng',
            'BM-020': 'Đen',
            'BM-021': 'Vàng',
            'BM-017': 'Đen / Đỏ'
        };

        if (overrides[sku]) {
            return overrides[sku];
        }

        const cleaned = sanitizeProductText(value);
        return repairQuestionMarkText(cleaned, sku, 'color');
    }

    function extractProductTail(value, keywords = []) {
        const cleaned = sanitizeProductText(value);
        for (const keyword of keywords) {
            const index = cleaned.indexOf(keyword);
            if (index >= 0) {
                return cleaned.slice(index).trim();
            }
        }
        return repairQuestionMarkText(cleaned, '', 'name');
    }

    function applyTextReplacements(value, replacements) {
        return replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), value);
    }

    function applyLiteralReplacements(value, replacements) {
        return replacements.reduce((result, [from, to]) => result.split(from).join(to), value);
    }

    function repairQuestionMarkText(value, sku = '', field = 'text') {
        let result = String(value || '').trim();
        if (!result.includes('?')) {
            return result;
        }

        const literalCommonReplacements = [
            ['B?ng chuy?n', 'Bóng chuyền'],
            ['B?ng r?', 'Bóng rổ'],
            ['B?ng b?n', 'Bóng bàn'],
            ['c?u l?ng', 'cầu lông'],
            ['C?u l?ng', 'Cầu lông'],
            ['V?t', 'Vợt'],
            ['M?t v?t', 'Mặt vợt'],
            ['Gi?y', 'Giày'],
            ['B?o v? g?i', 'Bảo vệ gối'],
            ['B? l??i', 'Bộ lưới'],
            ['Keo d?n', 'Keo dán'],
            ['Balo b?ng r?', 'Balo bóng rổ'],
            ['?ng tay', 'Ống tay'],
            ['T?t', 'Tất'],
            ['T?i', 'Túi'],
            ['Qu?n c?n', 'Quấn cán'],
            ['C??c', 'Cước'],
            ['?o thi ??u', 'Áo thi đấu'],
            ['?o thi ?u', 'Áo thi đấu'],
            ['?o ', 'Áo '],
            ['b?i bi?n', 'bãi biển'],
            ['l?ng v?', 'lông vũ'],
            ['nh?a', 'nhựa'],
            ['l?p', 'lớp'],
            ['h?i', 'hơi'],
            ['Đ?ng L?c', 'Động Lực'],
            ['B?ng b?ng b?n', 'Bóng bóng bàn'],
            ['B?ng b?ng b????n', 'Bóng bóng bàn']
        ];

        const commonReplacements = [
            [/B\?+ng chuy\?+n/gi, 'Bóng chuyền'],
            [/B\?+ng r\?+/gi, 'Bóng rổ'],
            [/B\?+ng b\?+n/gi, 'Bóng bàn'],
            [/C\?+u l\?+ng/gi, 'Cầu lông'],
            [/c\?+u l\?+ng/gi, 'cầu lông'],
            [/V\?+t/gi, 'Vợt'],
            [/M\?+t v\?+t/gi, 'Mặt vợt'],
            [/Gi\?+y/gi, 'Giày'],
            [/B\?+o v\?+ g\?+i/gi, 'Bảo vệ gối'],
            [/B\?+ l\?+i/gi, 'Bộ lưới'],
            [/Keo d\?+n/gi, 'Keo dán'],
            [/Balo b\?+ng r\?+/gi, 'Balo bóng rổ'],
            [/\?+ng tay/gi, 'Ống tay'],
            [/T\?+t/gi, 'Tất'],
            [/T\?+i/gi, 'Túi'],
            [/Qu\?+n c\?+n/gi, 'Quấn cán'],
            [/C\?+c/gi, 'Cước'],
            [/\?+o thi \?+u/gi, 'Áo thi đấu'],
            [/\?+o\b/gi, 'Áo'],
            [/b\?+i bi\?+n/gi, 'bãi biển'],
            [/l\?+ng v\?+/gi, 'lông vũ'],
            [/nh\?+a/gi, 'nhựa'],
            [/l\?+p/gi, 'lớp']
        ];

        const literalSizeReplacements = [
            ['Ti?u chu?n / M?m', 'Tiêu chuẩn / Mềm'],
            ['Ti?u chu?n', 'Tiêu chuẩn'],
            ['S? 7', 'Số 7'],
            ['S? 5', 'Số 5'],
            ['12 qu?', '12 quả'],
            ['6 qu?', '6 quả'],
            ['6 c?y', '6 cây'],
            ['3 cu?n', '3 cuộn']
        ];

        const sizeReplacements = [
            [/Ti\?+u chu\?+n \/\s*M\?+m/gi, 'Tiêu chuẩn / Mềm'],
            [/Ti\?+u chu\?+n/gi, 'Tiêu chuẩn'],
            [/S\?+\s*7/gi, 'Số 7'],
            [/S\?+\s*5/gi, 'Số 5'],
            [/12 qu\?+/gi, '12 quả'],
            [/6 qu\?+/gi, '6 quả'],
            [/6 c\?+y/gi, '6 cây'],
            [/3 cu\?+n/gi, '3 cuộn']
        ];

        const literalColorReplacements = [
            ['Tr?ngng', 'Trắng'],
            ['Tr?ng', 'Trắng'],
            ['?en', 'Đen'],
            ['V?ng', 'Vàng'],
            ['X?m', 'Xám'],
            ['B?c', 'Bạc'],
            ['N??u cam', 'Nâu cam'],
            ['T??m', 'Tím'],
            ['?? / ?en', 'Đỏ / Đen'],
            ['?en / ??', 'Đen / Đỏ'],
            ['?? / Trắng', 'Đỏ / Trắng'],
            ['Trắng / ??', 'Trắng / Đỏ'],
            ['??', 'Đỏ']
        ];

        const colorReplacements = [
            [/Tr\?+/gi, 'Trắng'],
            [/V\?+ng/gi, 'Vàng'],
            [/X\?+m/gi, 'Xám'],
            [/B\?+c/gi, 'Bạc'],
            [/\?+en/gi, 'Đen'],
            [/\?{4,}/g, 'Đỏ']
        ];

        for (let round = 0; round < 3; round += 1) {
            const previous = result;

            result = applyLiteralReplacements(result, literalCommonReplacements);
            result = applyTextReplacements(result, commonReplacements);

            if (field === 'size') {
                result = applyLiteralReplacements(result, literalSizeReplacements);
                result = applyTextReplacements(result, sizeReplacements);
            }

            if (field === 'color') {
                result = applyLiteralReplacements(result, literalColorReplacements);
                result = applyTextReplacements(result, colorReplacements);
            }

            if (field === 'name') {
                result = applyLiteralReplacements(result, literalSizeReplacements);
                result = applyTextReplacements(result, sizeReplacements);
            }

            if (result === previous) {
                break;
            }
        }

        const sportPrefix = getSkuPrefix(sku);
        if (sportPrefix === 'VB' && result === 'Mikasa V390W') {
            return 'Bóng chuyền Mikasa V390W';
        }

        return result.replace(/\s+/g, ' ').trim();
    }

    function sanitizeProductText(value) {
        if (value === null || value === undefined) {
            return '';
        }

        let result = decodeMojibake(value);
        const phraseReplacements = [
            [/\u0002\uFFFDo khoác b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'Áo khoác bóng đá'],
            [/\u0002\uFFFDo tập b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'Áo tập bóng đá'],
            [/\u0002\uFFFDo b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'Áo bóng đá'],
            [/\u0002\uFFFDo thi \uFFFD\u0018ấu b\u0002\uFFFDng chuyền/g, 'Áo thi đấu bóng chuyền'],
            [/\u0002\uFFFDo b\u0002\uFFFDng chuyền/g, 'Áo bóng chuyền'],
            [/\u0002\uFFFDo b\u0002\uFFFDng r\uFFFD"/g, 'Áo bóng rổ'],
            [/Gi\u0002\uFFFDy b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'Giày bóng đá'],
            [/Gi\u0002\uFFFDy b\u0002\uFFFDng chuyền/g, 'Giày bóng chuyền'],
            [/Gi\u0002\uFFFDy b\u0002\uFFFDng r\uFFFD"/g, 'Giày bóng rổ'],
            [/Gi\u0002\uFFFDy cầu l\u0002\uFFFDng/g, 'Giày cầu lông'],
            [/Vợt b\u0002\uFFFDng b\u0002\uFFFDn/g, 'Vợt bóng bàn'],
            [/Mặt vợt b\u0002\uFFFDng b\u0002\uFFFDn/g, 'Mặt vợt bóng bàn'],
            [/B\u0002\uFFFDng b\u0002\uFFFDng b\u0002\uFFFDn/g, 'Bóng bóng bàn'],
            [/Bảo v\uFFFD! g\uFFFD\u0018i/g, 'Bảo vệ gối'],
            [/B\uFFFD" lư\uFFFD:i b\u0002\uFFFDng b\u0002\uFFFDn/g, 'Bộ lưới bóng bàn'],
            [/Keo d\u0002\uFFFDn mặt vợt/g, 'Keo dán mặt vợt'],
            [/T\u0002\uFFFDi tr\uFFFD\u0018ng b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'Túi trống bóng đá'],
            [/T\u0002\uFFFDi cầu l\u0002\uFFFDng/g, 'Túi cầu lông'],
            [/Quấn c\u0002\uFFFDn cầu l\u0002\uFFFDng/g, 'Quấn cán cầu lông'],
            [/Cư\uFFFD:c cầu l\u0002\uFFFDng/g, 'Cước cầu lông'],
            [/Ống \uFFFD\u0018\uFFFD\u001Cng b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'Ống đồng bóng đá'],
            [/b\u0002\uFFFDng chuyền/g, 'bóng chuyền'],
            [/b\u0002\uFFFDng b\u0002\uFFFDn/g, 'bóng bàn'],
            [/b\u0002\uFFFDng r\uFFFD"/g, 'bóng rổ'],
            [/b\u0002\uFFFDng \uFFFD\u0018\u0002\uFFFD/g, 'bóng đá'],
            [/cầu l\u0002\uFFFDng/g, 'cầu lông']
        ];

        phraseReplacements.forEach(([pattern, replacement]) => {
            result = result.replace(pattern, replacement);
        });

        result = result
            .replace(/[\u0000-\u001F]/g, '')
            .replace(/\uFFFD/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        return result;
    }

    function hasBrokenTextArtifacts(value) {
        const text = String(value || '');
        return /[�]/.test(text)
            || /\?/.test(text)
            || /(?:Ă|Â|Ä|Æ|áº|á»|â€¦|â€“|â€”|â€)/.test(text);
    }

    function getUserDisplayName(user) {
        const fallbackNames = {
            admin: 'Hệ Thống',
            nhanvien01: 'Nguyễn Nhân Viên',
            khachhang01: 'Nguyễn Văn A',
            khachhang02: 'Trần Thị B'
        };
        const rawName = String(user?.display_name || user?.ho_ten || user?.hoTen || user?.full_name || user?.name || '').trim();
        const cleanedName = sanitizeProductText(rawName).trim();
        const usernameKey = normalizeText(user?.username);

        if (cleanedName && !hasBrokenTextArtifacts(cleanedName) && normalizeText(cleanedName) !== 'khong ro') {
            return cleanedName;
        }

        if (fallbackNames[usernameKey]) {
            return fallbackNames[usernameKey];
        }

        const normalizedRole = normalizeText(user?.role || '');
        if (normalizedRole === 'quan tri vien') {
            return 'Hệ Thống';
        }
        if (normalizedRole === 'nhan vien') {
            return 'Nhân viên';
        }

        const usernameLabel = sanitizeProductText(user?.username || '').trim();
        return usernameLabel || 'Người dùng';
    }

    function normalizeUserProfile(user) {
        if (!user || typeof user !== 'object') {
            return null;
        }

        return {
            ...user,
            ho_ten: getUserDisplayName(user),
            name: getUserDisplayName(user),
            display_name: getUserDisplayName(user),
            username: sanitizeProductText(user.username || '').trim() || String(user.username || '').trim(),
            role: sanitizeProductText(user.role || '').trim() || String(user.role || '').trim(),
            email: String(user.email || '').trim(),
            sdt: sanitizeProductText(user.sdt || user.phone || '').trim() || String(user.sdt || user.phone || '').trim()
        };
    }

    function getCanonicalSportFromProduct(product) {
        return getCanonicalSportFromSku(product?.sku, product?.danh_muc);
    }

    function getCanonicalSportFromSku(sku, fallback = '') {
        const sportMap = {
            FB: 'Bóng đá',
            VB: 'Bóng chuyền',
            BB: 'Bóng rổ',
            TT: 'Bóng bàn',
            BM: 'Cầu lông'
        };
        return sportMap[getSkuPrefix(sku)] || sanitizeProductText(fallback) || 'Khác';
    }

    function getMenuItemIdsForProduct(product) {
        const skuPrefix = getSkuPrefix(product?.sku);
        const skuNumber = getSkuNumber(product?.sku);
        const itemIds = [];

        if (!skuPrefix || !Number.isFinite(skuNumber)) {
            return itemIds;
        }

        if (skuPrefix === 'FB') {
            pushItemId(itemIds, skuNumber === 16 || skuNumber === 27, 'football-ball');
            pushItemId(itemIds, skuNumber === 1 || isSkuBetween(skuNumber, 7, 15), 'football-shoes');
            pushItemId(itemIds, skuNumber === 3 || isSkuBetween(skuNumber, 17, 22) || isSkuBetween(skuNumber, 132, 135), 'football-apparel');
            pushItemId(itemIds, skuNumber === 26, 'football-gloves');
            pushItemId(itemIds, skuNumber === 25, 'football-shinguards');
            pushItemId(itemIds, skuNumber === 28 || skuNumber === 29, 'football-socks');
            pushItemId(itemIds, skuNumber === 30 || skuNumber === 31, 'football-towels');
            pushItemId(itemIds, skuNumber === 23 || skuNumber === 24, 'football-backpacks');
        }

        if (skuPrefix === 'VB') {
            pushItemId(itemIds, skuNumber === 1 || isSkuBetween(skuNumber, 2, 9) || skuNumber === 20 || skuNumber === 22, 'volleyball-ball');
            pushItemId(itemIds, isSkuBetween(skuNumber, 10, 14) || skuNumber === 21, 'volleyball-shoes');
            pushItemId(itemIds, skuNumber === 17 || skuNumber === 18 || isSkuBetween(skuNumber, 129, 130), 'volleyball-apparel');
            pushItemId(itemIds, skuNumber === 15 || skuNumber === 16 || skuNumber === 19, 'volleyball-kneepads');
            pushItemId(itemIds, skuNumber === 23 || skuNumber === 24, 'volleyball-socks');
            pushItemId(itemIds, skuNumber === 25 || skuNumber === 26, 'volleyball-towels');
            pushItemId(itemIds, skuNumber === 27 || skuNumber === 28, 'volleyball-backpacks');
        }

        if (skuPrefix === 'BB') {
            pushItemId(itemIds, skuNumber === 2 || isSkuBetween(skuNumber, 3, 8) || skuNumber === 15 || skuNumber === 16 || skuNumber === 18 || skuNumber === 23, 'basketball-ball');
            pushItemId(itemIds, isSkuBetween(skuNumber, 9, 14), 'basketball-shoes');
            pushItemId(itemIds, skuNumber === 21 || isSkuBetween(skuNumber, 126, 127), 'basketball-apparel');
            pushItemId(itemIds, skuNumber === 20, 'basketball-socks');
            pushItemId(itemIds, skuNumber === 19, 'basketball-arm-sleeves');
            pushItemId(itemIds, skuNumber === 24 || skuNumber === 25, 'basketball-towels');
            pushItemId(itemIds, skuNumber === 22, 'basketball-backpacks');
            pushItemId(itemIds, skuNumber === 17, 'basketball-training-gear');
        }

        if (skuPrefix === 'TT') {
            pushItemId(itemIds, skuNumber === 1 || isSkuBetween(skuNumber, 7, 16) || skuNumber === 27 || isSkuBetween(skuNumber, 130, 131), 'tabletennis-racket');
            pushItemId(itemIds, isSkuBetween(skuNumber, 17, 21), 'tabletennis-rubber');
            pushItemId(itemIds, isSkuBetween(skuNumber, 22, 24), 'tabletennis-ball');
            pushItemId(itemIds, skuNumber === 25 || skuNumber === 26, 'tabletennis-accessories');
            pushItemId(itemIds, skuNumber === 28 || skuNumber === 29, 'tabletennis-apparel');
        }

        if (skuPrefix === 'BM') {
            pushItemId(itemIds, isSkuBetween(skuNumber, 1, 9) || skuNumber === 22 || isSkuBetween(skuNumber, 128, 129), 'badminton-racket');
            pushItemId(itemIds, isSkuBetween(skuNumber, 10, 13), 'badminton-shuttlecock');
            pushItemId(itemIds, isSkuBetween(skuNumber, 14, 17), 'badminton-shoes');
            pushItemId(itemIds, skuNumber === 18 || skuNumber === 19 || skuNumber === 21, 'badminton-strings');
            pushItemId(itemIds, skuNumber === 20, 'badminton-accessories');
            pushItemId(itemIds, skuNumber === 23 || skuNumber === 24, 'badminton-apparel');
        }

        return itemIds;
    }

    function pushItemId(itemIds, condition, itemId) {
        if (condition) {
            itemIds.push(itemId);
        }
    }

    function getSkuPrefix(sku) {
        return String(sku || '').trim().toUpperCase().split('-')[0] || '';
    }

    function getSkuNumber(sku) {
        const parts = String(sku || '').trim().toUpperCase().split('-');
        return parts.length > 1 ? Number(parts[1]) : NaN;
    }

    function isSkuBetween(value, start, end) {
        return Number.isFinite(value) && value >= start && value <= end;
    }

    async function apiRequest(path, options = {}) {
        const {
            method = 'GET',
            body,
            auth = true
        } = options;

        const headers = {
            'Content-Type': 'application/json'
        };

        if (auth && token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        if (response.status === 204) {
            return null;
        }

        const text = await response.text();
        const data = text ? normalizePayload(safeJsonParse(text)) : null;

        if (!response.ok) {
            const message = buildApiErrorMessage(path, response, text, data);
            if (response.status === 401) {
                clearSession();
                updateAuthUI();
            }
            throw new Error(message);
        }

        return data;
    }

    function normalizeText(value) {
        return decodeMojibake(value)
            .replaceAll('Đ', 'D')
            .replaceAll('đ', 'd')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function formatCurrency(value) {
        return `${new Intl.NumberFormat('vi-VN').format(Number(value || 0))}\u0111`;
    }

    function showCenteredMessage(message, type = 'success') {
        let messageBox = document.getElementById('centered-message');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'centered-message';
            messageBox.className = 'centered-message hidden';
            messageBox.setAttribute('role', 'status');
            messageBox.setAttribute('aria-live', 'polite');
            document.body.appendChild(messageBox);
        }

        if (centeredMessageTimer) {
            window.clearTimeout(centeredMessageTimer);
        }

        messageBox.textContent = message;
        messageBox.className = `centered-message ${type}`;
        repairTextNodes(messageBox);

        centeredMessageTimer = window.setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 1800);
    }

    function getPolicyContent(policyKey) {
        const policyMap = {
            privacy: {
                title: 'Chính sách bảo mật',
                sections: [
                    {
                        heading: 'Thông tin thu thập',
                        items: [
                            'Flare Fitness thu thập thông tin tài khoản, họ tên, số điện thoại, email, địa chỉ giao hàng và lịch sử đơn hàng để xử lý mua bán.',
                            'Dữ liệu hành vi như tìm kiếm, xem sản phẩm, thêm giỏ hàng và đánh giá được dùng để cá nhân hóa gợi ý sản phẩm.'
                        ]
                    },
                    {
                        heading: 'Cách sử dụng và bảo vệ dữ liệu',
                        items: [
                            'Thông tin khách hàng chỉ dùng cho vận hành đơn hàng, chăm sóc khách hàng, chống gian lận và cải thiện trải nghiệm.',
                            'Mật khẩu được lưu ở dạng mã hóa; không chia sẻ dữ liệu cá nhân cho bên thứ ba nếu không phục vụ giao hàng, thanh toán hoặc yêu cầu pháp lý.'
                        ]
                    }
                ]
            },
            shipping: {
                title: 'Chính sách vận chuyển',
                sections: [
                    {
                        heading: 'Phạm vi và thời gian giao hàng',
                        items: [
                            'Hỗ trợ giao hàng toàn quốc. Thời gian dự kiến 1-3 ngày tại khu vực nội thành và 3-7 ngày với khu vực xa hơn.',
                            'Đơn hàng có thể được nhân viên xác nhận trước khi đóng gói và bàn giao cho đơn vị vận chuyển.'
                        ]
                    },
                    {
                        heading: 'Trách nhiệm khi giao nhận',
                        items: [
                            'Khách hàng cần cung cấp đúng số điện thoại và địa chỉ nhận hàng để tránh giao thất bại.',
                            'Nếu kiện hàng có dấu hiệu móp méo, rách hoặc sai thông tin, khách hàng có quyền từ chối nhận và liên hệ bộ phận hỗ trợ.'
                        ]
                    }
                ]
            },
            return: {
                title: 'Chính sách đổi trả / hoàn tiền',
                sections: [
                    {
                        heading: 'Điều kiện đổi trả',
                        items: [
                            'Hỗ trợ đổi trả khi sản phẩm lỗi kỹ thuật, sai mẫu, sai size, thiếu phụ kiện hoặc không đúng mô tả trên website.',
                            'Sản phẩm cần còn tem, nhãn, hóa đơn hoặc bằng chứng mua hàng; không áp dụng với lỗi phát sinh do sử dụng sai hướng dẫn.'
                        ]
                    },
                    {
                        heading: 'Thời hạn xử lý',
                        items: [
                            'Yêu cầu đổi trả nên được gửi trong 7 ngày kể từ khi nhận hàng.',
                            'Sau khi kiểm tra điều kiện, cửa hàng sẽ hỗ trợ đổi sản phẩm tương đương hoặc hoàn tiền theo giá trị thanh toán thực tế.'
                        ]
                    }
                ]
            },
            payment: {
                title: 'Chính sách thanh toán COD',
                sections: [
                    {
                        heading: 'Quy trình thanh toán',
                        items: [
                            'Đơn hàng mặc định là COD: khách nhận hàng trước, thanh toán cho nhân viên giao hàng hoặc nhân viên cửa hàng.',
                            'Trạng thái thanh toán chỉ chuyển thành thành công sau khi nhân viên xác nhận đã giao hàng và đã thu tiền.'
                        ]
                    },
                    {
                        heading: 'Lưu ý',
                        items: [
                            'Khách hàng cần kiểm tra đúng số tiền phải thanh toán sau ưu đãi trước khi nhận hàng.',
                            'Nếu đơn bị hủy hoặc giao thất bại, hệ thống không ghi nhận doanh thu cho đơn đó.'
                        ]
                    }
                ]
            },
            inspection: {
                title: 'Chính sách kiểm hàng',
                sections: [
                    {
                        heading: 'Quyền kiểm tra',
                        items: [
                            'Khách hàng được kiểm tra ngoại quan, số lượng, size, màu sắc và phụ kiện đi kèm trước khi thanh toán.',
                            'Việc kiểm hàng không bao gồm sử dụng thử dài hạn hoặc làm ảnh hưởng tình trạng mới của sản phẩm.'
                        ]
                    },
                    {
                        heading: 'Xử lý sai lệch',
                        items: [
                            'Nếu phát hiện sai mẫu, sai size hoặc thiếu sản phẩm, khách hàng có thể từ chối nhận và tạo yêu cầu hỗ trợ.',
                            'Cửa hàng sẽ đối chiếu đơn hàng và cập nhật hướng xử lý đổi, giao lại hoặc hủy đơn.'
                        ]
                    }
                ]
            },
            warranty: {
                title: 'Chính sách bảo hành',
                sections: [
                    {
                        heading: 'Phạm vi bảo hành',
                        items: [
                            'Sản phẩm được hỗ trợ bảo hành theo chính sách của hãng hoặc nhà phân phối nếu có lỗi sản xuất.',
                            'Không bảo hành hao mòn tự nhiên, trầy xước do va chạm, hư hỏng do bảo quản sai hoặc sử dụng sai mục đích.'
                        ]
                    },
                    {
                        heading: 'Cách gửi yêu cầu',
                        items: [
                            'Khách hàng gửi mã đơn hàng, ảnh/video lỗi và mô tả tình trạng qua kênh tư vấn.',
                            'Nhân viên sẽ kiểm tra điều kiện và thông báo phương án tiếp nhận, sửa chữa, đổi mới hoặc từ chối bảo hành.'
                        ]
                    }
                ]
            },
            terms: {
                title: 'Quy định sử dụng',
                sections: [
                    {
                        heading: 'Quy định tài khoản',
                        items: [
                            'Khách hàng chịu trách nhiệm bảo mật thông tin đăng nhập và các thao tác đặt hàng phát sinh từ tài khoản của mình.',
                            'Không sử dụng website để đặt hàng giả, spam tư vấn, khai báo thông tin sai lệch hoặc can thiệp trái phép vào hệ thống.'
                        ]
                    },
                    {
                        heading: 'Quyền vận hành',
                        items: [
                            'Cửa hàng có quyền tạm khóa tài khoản, hủy đơn hoặc từ chối phục vụ nếu phát hiện gian lận hoặc hành vi gây ảnh hưởng hệ thống.',
                            'Nội dung chính sách có thể được cập nhật để phù hợp vận hành thực tế và sẽ được hiển thị trên website.'
                        ]
                    }
                ]
            }
        };

        return policyMap[policyKey] || policyMap.terms;
    }

    function openPolicyModal(policyKey) {
        if (!policyOverlay || !policyTitle || !policyContent) {
            return;
        }

        const policy = getPolicyContent(policyKey);
        policyTitle.textContent = policy.title;
        policyContent.innerHTML = `
            <p class="customer-card-meta">Nội dung tham khảo theo cách các sàn thương mại điện tử lớn trình bày. Khi triển khai thật, nhóm nên rà soát lại với quy định pháp lý và chính sách vận hành riêng.</p>
            ${policy.sections.map(section => `
                <section>
                    <h3>${escapeHtml(section.heading)}</h3>
                    <ul>
                        ${section.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </section>
            `).join('')}
        `;
        openOverlay(policyOverlay);
        repairTextNodes(policyOverlay);
    }

    function isStrongPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(String(password || ''));
    }

    function normalizePhoneInput(value) {
        return String(value || '').trim().replace(/[\s.-]/g, '');
    }

    function isValidVietnamMobilePhone(value) {
        return /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(normalizePhoneInput(value));
    }

    function buildApiErrorMessage(path, response, text, data) {
        const explicitMessage = data?.message || data?.error || data?.detail;
        if (explicitMessage) {
            return explicitMessage;
        }

        if (response.status === 404 && path.includes('/auth/register/otp')) {
            return 'Backend chưa có API gửi OTP đăng ký. Hãy chạy lại: docker compose up -d --build';
        }

        if (response.status === 404 && path.includes('/auth/forgot-password/otp')) {
            return 'Backend chưa có API gửi OTP quên mật khẩu. Hãy chạy lại: docker compose up -d --build';
        }

        if (response.status >= 500 && path.includes('/auth')) {
            return 'Backend đang lỗi khi xử lý xác thực. Hãy kiểm tra log container app và cấu hình APP_MAIL_PASSWORD.';
        }

        const plainText = String(text || '').trim();
        if (plainText && !plainText.startsWith('<')) {
            return plainText.slice(0, 220);
        }

        return `Yêu cầu không thành công (${response.status}).`;
    }

    async function sendOtpEmail({
        endpoint,
        payload,
        errorBox,
        button,
        successMessage,
        showSuccessAlert = true,
        cooldown = true,
        loadingText = 'Đang gửi...'
    }) {
        const email = String(payload?.email || '').trim();
        const username = String(payload?.username || '').trim();
        const originalText = button?.textContent || 'Gửi OTP';

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showInlineError(errorBox, 'Vui lòng nhập email hợp lệ trước khi gửi OTP.');
            return false;
        }

        if (endpoint.includes('forgot-password') && !username) {
            showInlineError(errorBox, 'Vui lòng nhập tên đăng nhập trước khi gửi OTP.');
            return false;
        }

        hideInlineError(errorBox);
        if (button) {
            button.disabled = true;
            button.textContent = loadingText;
        }

        try {
            const response = await apiRequest(endpoint, {
                method: 'POST',
                auth: false,
                body: {
                    ...payload,
                    email,
                    username
                }
            });

            if (showSuccessAlert) {
                alert(response?.message || successMessage);
            }

            if (cooldown) {
                startOtpCooldown(button, 60, originalText);
            } else if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }

            return true;
        } catch (error) {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }
            showInlineError(errorBox, error.message || 'Không thể gửi OTP.');
            return false;
        }
    }

    function startOtpCooldown(button, seconds = 60, originalText = 'Gửi OTP') {
        if (!button) {
            return;
        }

        let remainingSeconds = seconds;
        button.disabled = true;
        button.textContent = `${remainingSeconds}s`;

        const timer = window.setInterval(() => {
            remainingSeconds -= 1;
            if (remainingSeconds <= 0) {
                window.clearInterval(timer);
                button.disabled = false;
                button.textContent = originalText;
                return;
            }
            button.textContent = `${remainingSeconds}s`;
        }, 1000);
    }

    function showInlineError(errorBox, message) {
        if (!errorBox) {
            return;
        }
        errorBox.textContent = message;
        errorBox.classList.remove('hidden');
    }

    function hideInlineError(errorBox) {
        if (!errorBox) {
            return;
        }
        errorBox.textContent = '';
        errorBox.classList.add('hidden');
    }

    function canManageProducts() {
        const role = getCanonicalRole(currentUser?.role);
        return ['Qu\u1ea3n tr\u1ecb vi\u00ean', 'Nh\u00e2n vi\u00ean'].includes(role);
    }

    function isAdmin() {
        return getCanonicalRole(currentUser?.role) === 'Qu\u1ea3n tr\u1ecb vi\u00ean';
    }

    function getRoleClass(role) {
        const canonicalRole = getCanonicalRole(role);
        if (canonicalRole === 'Qu\u1ea3n tr\u1ecb vi\u00ean') {
            return 'role-admin';
        }
        if (canonicalRole === 'Nh\u00e2n vi\u00ean') {
            return 'role-employee';
        }
        return 'role-customer';
    }

    function getCanonicalRole(role) {
        const normalizedRole = normalizeText(role);
        if (normalizedRole.includes('quan tri')) {
            return 'Qu\u1ea3n tr\u1ecb vi\u00ean';
        }
        if (normalizedRole.includes('nhan vien')) {
            return 'Nh\u00e2n vi\u00ean';
        }
        if (normalizedRole.includes('khach hang')) {
            return 'Kh\u00e1ch h\u00e0ng';
        }
        return decodeMojibake(role || '');
    }

    function decodeMojibake(value) {
        let result = String(value ?? '');
        const mojibakeMarkers = [
            '\u00c3', '\u00c2', '\u00c4', '\u00c5', '\u00c6',
            '\u00e1\u00bb', '\u00e1\u00ba', '\u00c4\u0091'
        ];

        for (let attempt = 0; attempt < 3; attempt += 1) {
            if (!mojibakeMarkers.some(marker => result.includes(marker))) {
                break;
            }

            try {
                const bytes = Uint8Array.from(Array.from(result, char => char.charCodeAt(0) & 0xff));
                const decoded = new TextDecoder('utf-8').decode(bytes);
                if (!decoded || decoded === result) {
                    break;
                }
                result = decoded;
            } catch (error) {
                break;
            }
        }
        return result;
    }

    function normalizePayload(value) {
        if (Array.isArray(value)) {
            return value.map(item => normalizePayload(item));
        }

        if (value && typeof value === 'object') {
            return Object.fromEntries(
                Object.entries(value).map(([key, item]) => [key, normalizePayload(item)])
            );
        }

        if (typeof value === 'string') {
            return sanitizeProductText(value);
        }

        return value;
    }

    function repairTextNodes(root = document.body) {
        if (!root) {
            return;
        }

        const target = root.nodeType === Node.ELEMENT_NODE ? root : document.body;
        const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(node => {
            const repaired = sanitizeProductText(node.nodeValue);
            if (repaired !== node.nodeValue) {
                node.nodeValue = repaired;
            }
        });

        if (!(target instanceof Element)) {
            return;
        }

        target.querySelectorAll('*').forEach(element => {
            ['alt', 'aria-label', 'placeholder', 'title'].forEach(attribute => {
                if (!element.hasAttribute(attribute)) {
                    return;
                }

                const currentValue = element.getAttribute(attribute);
                const repaired = sanitizeProductText(currentValue);
                if (repaired !== currentValue) {
                    element.setAttribute(attribute, repaired);
                }
            });
        });
    }

    function getWishlistIds() {
        const wishlistStorageKey = getCurrentWishlistStorageKey();
        if (!wishlistStorageKey) {
            return [];
        }

        const wishlistIds = readStorage(wishlistStorageKey, []);
        if (!Array.isArray(wishlistIds)) {
            return [];
        }

        return Array.from(new Set(
            wishlistIds
                .map(item => String(item || '').trim())
                .filter(Boolean)
        ));
    }

    function saveWishlistIds(ids) {
        const wishlistStorageKey = getCurrentWishlistStorageKey();
        if (!wishlistStorageKey) {
            updateWishlistCount();
            return;
        }

        const normalizedIds = Array.from(new Set(
            (Array.isArray(ids) ? ids : [])
                .map(item => String(item || '').trim())
                .filter(Boolean)
        ));

        if (!normalizedIds.length) {
            localStorage.removeItem(wishlistStorageKey);
            updateWishlistCount();
            return;
        }

        localStorage.setItem(wishlistStorageKey, JSON.stringify(normalizedIds));
        updateWishlistCount();
    }

    function updateWishlistCount() {
        wishlistCount.textContent = String(getWishlistIds().length);
    }

    function isWishlisted(productId) {
        return getWishlistIds().includes(String(productId));
    }

    function getWishlistProducts() {
        const wishlistIds = getWishlistIds();
        const wishlistOrder = new Map(wishlistIds.map((id, index) => [id, index]));

        return allProducts
            .filter(product => wishlistOrder.has(String(product.id)))
            .sort((left, right) => wishlistOrder.get(String(left.id)) - wishlistOrder.get(String(right.id)));
    }

    function generateRecordId(prefix) {
        const randomPart = Math.random().toString(36).slice(2, 8);
        return `${prefix}-${Date.now()}-${randomPart}`;
    }

    function formatDateTimeDisplay(value) {
        const date = value ? new Date(value) : null;
        if (!date || Number.isNaN(date.getTime())) {
            return 'Không rõ thời gian';
        }

        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function getAddressBook() {
        const storageKey = getCurrentAddressBookStorageKey();
        if (!storageKey) {
            return [];
        }

        const addresses = readStorage(storageKey, []);
        return Array.isArray(addresses) ? addresses : [];
    }

    function saveAddressBook(addresses) {
        const storageKey = getCurrentAddressBookStorageKey();
        if (!storageKey) {
            return;
        }

        const normalizedAddresses = (Array.isArray(addresses) ? addresses : [])
            .map(address => {
                const street = String(address?.street || '').trim();
                const houseNumber = String(address?.houseNumber || '').trim();
                const line = String(address?.line || buildAddressLine(houseNumber, street)).trim();

                return {
                    id: String(address?.id || generateRecordId('address')),
                    recipient: String(address?.recipient || '').trim(),
                    phone: String(address?.phone || '').trim(),
                    line,
                    houseNumber,
                    street,
                    ward: String(address?.ward || '').trim(),
                    wardCode: String(address?.wardCode || '').trim(),
                    district: String(address?.district || '').trim(),
                    city: String(address?.city || '').trim(),
                    provinceCode: String(address?.provinceCode || '').trim(),
                    note: String(address?.note || '').trim(),
                    isDefault: Boolean(address?.isDefault)
                };
            })
            .filter(address => address.recipient && address.phone && address.line && address.ward && address.district && address.city);

        const hasDefault = normalizedAddresses.some(address => address.isDefault);
        if (normalizedAddresses.length && !hasDefault) {
            normalizedAddresses[0].isDefault = true;
        }

        localStorage.setItem(storageKey, JSON.stringify(normalizedAddresses));
    }

    function getDefaultAddress() {
        const addresses = getAddressBook();
        return addresses.find(address => address.isDefault) || addresses[0] || null;
    }

    function getOrderHistory() {
        const storageKey = getCurrentOrderHistoryStorageKey();
        if (!storageKey) {
            return [];
        }

        const orders = readStorage(storageKey, []);
        return Array.isArray(orders) ? orders : [];
    }

    function saveOrderHistory(orders) {
        const storageKey = getCurrentOrderHistoryStorageKey();
        if (!storageKey) {
            return;
        }

        localStorage.setItem(storageKey, JSON.stringify(Array.isArray(orders) ? orders : []));
    }

    function buildAddressLine(houseNumber = '', street = '') {
        return [houseNumber, street]
            .map(value => String(value || '').trim())
            .filter(Boolean)
            .join(' ');
    }

    function getAddressLineText(address) {
        const composedLine = buildAddressLine(address?.houseNumber, address?.street);
        return composedLine || String(address?.line || '').trim();
    }

    function buildAddressText(address) {
        if (!address) {
            return 'Chưa cập nhật địa chỉ giao hàng';
        }

        const district = String(address?.district || '').trim();
        const shouldShowDistrict = district
            && normalizeText(district) !== normalizeText('Không áp dụng (mô hình 2 cấp)');

        return [
            getAddressLineText(address),
            address.ward,
            shouldShowDistrict ? district : '',
            address.city
        ].filter(Boolean).join(', ');
    }

    function normalizeAdministrativeUnitName(value) {
        return String(value || '')
            .replace(/^Thành phố\s+/i, '')
            .replace(/^Tỉnh\s+/i, '')
            .trim();
    }

    function normalizeAdministrativeUnits(rawUnits) {
        return (Array.isArray(rawUnits) ? rawUnits : []).map(unit => ({
            code: String(unit?.Code || unit?.code || '').trim(),
            fullName: String(unit?.FullName || unit?.fullName || '').trim(),
            shortName: normalizeAdministrativeUnitName(unit?.FullName || unit?.fullName || ''),
            wards: (Array.isArray(unit?.Wards) ? unit.Wards : []).map(ward => ({
                code: String(ward?.Code || ward?.code || '').trim(),
                fullName: String(ward?.FullName || ward?.fullName || '').trim()
            }))
        })).filter(unit => unit.code && unit.fullName);
    }

    async function loadAdministrativeUnits() {
        if (administrativeUnitsCache.length) {
            return administrativeUnitsCache;
        }

        if (!administrativeUnitsPromise) {
            administrativeUnitsPromise = fetch('assets/data/vn-units.json', { cache: 'force-cache' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Không thể tải danh sách đơn vị hành chính.');
                    }

                    return response.json();
                })
                .then(units => {
                    administrativeUnitsCache = normalizeAdministrativeUnits(units);
                    return administrativeUnitsCache;
                })
                .catch(() => {
                    administrativeUnitsCache = [
                        { code: '01', fullName: 'Thành phố Hà Nội', shortName: 'Hà Nội', wards: [] },
                        { code: '31', fullName: 'Thành phố Hồ Chí Minh', shortName: 'Hồ Chí Minh', wards: [] },
                        { code: '48', fullName: 'Thành phố Đà Nẵng', shortName: 'Đà Nẵng', wards: [] }
                    ];
                    return administrativeUnitsCache;
                });
        }

        return administrativeUnitsPromise;
    }

    function setSelectOptions(selectElement, options, placeholder, selectedValue = '') {
        if (!selectElement) {
            return;
        }

        const normalizedSelected = normalizeText(selectedValue);
        const optionMarkup = options.map(option => {
            const value = String(option?.value ?? '').trim();
            const label = String(option?.label ?? value).trim();
            const selected = normalizedSelected && normalizeText(value) === normalizedSelected;
            return `<option value="${escapeHtml(value)}" ${selected ? 'selected' : ''}>${escapeHtml(label)}</option>`;
        }).join('');

        selectElement.innerHTML = `
            <option value="">${escapeHtml(placeholder)}</option>
            ${optionMarkup}
        `;

        if (!selectElement.value && selectedValue) {
            const fallbackOption = Array.from(selectElement.options).find(option => normalizeText(option.value) === normalizedSelected);
            if (fallbackOption) {
                fallbackOption.selected = true;
            }
        }
    }

    function getSelectedAddressProvince() {
        const provinceCode = addressCitySelect?.value || '';
        return administrativeUnitsCache.find(unit => unit.code === provinceCode) || null;
    }

    function getSelectedAddressWardName(address = null) {
        if (address?.ward) {
            return String(address.ward || '').trim();
        }
        if (!addressWardSelect?.value) {
            return '';
        }
        const selectedWardText = String(addressWardSelect?.selectedOptions?.[0]?.textContent || '').trim();
        return selectedWardText;
    }

    function getStreetOptionsForAddress(province = null, wardName = '') {
        const provinceText = normalizeText([
            province?.fullName,
            province?.shortName,
            addressCitySelect?.selectedOptions?.[0]?.textContent
        ].filter(Boolean).join(' '));
        const wardText = normalizeText(wardName);
        if (!provinceText || !wardText) {
            return [];
        }

        const matchedByWard = [];

        ADDRESS_STREET_RULES.forEach(rule => {
            const matchesProvince = (rule.provinces || []).some(name => provinceText.includes(normalizeText(name)));
            if (!matchesProvince) {
                return;
            }

            const ruleStreets = Array.isArray(rule.streets) ? rule.streets : [];
            if (Array.isArray(rule.wards) && rule.wards.length) {
                const matchesWard = rule.wards.some(name => wardText.includes(normalizeText(name)));
                if (matchesWard) {
                    matchedByWard.push(...ruleStreets);
                }
            }
        });

        return Array.from(new Set(matchedByWard))
            .sort((left, right) => left.localeCompare(right, 'vi'));
    }

    function inferStreetFromAddressLine(line = '', streetOptions = []) {
        const normalizedLine = normalizeText(line);
        return streetOptions.find(street => normalizedLine.includes(normalizeText(street))) || '';
    }

    function inferHouseNumberFromAddressLine(line = '', street = '') {
        const rawLine = String(line || '').trim();
        const rawStreet = String(street || '').trim();
        if (!rawLine || !rawStreet) {
            return rawLine;
        }

        const streetIndex = normalizeText(rawLine).indexOf(normalizeText(rawStreet));
        if (streetIndex === -1) {
            return rawLine;
        }

        return rawLine.slice(0, streetIndex).replace(/[,\s]+$/g, '').trim();
    }

    function populateStreetOptions(address = null, province = null) {
        if (!addressStreetSelect) {
            return;
        }

        const selectedProvince = province || getProvinceByAddress(address) || getSelectedAddressProvince();
        const wardName = getSelectedAddressWardName(address);
        const streetOptions = getStreetOptionsForAddress(selectedProvince, wardName);
        const selectedStreet = String(address?.street || '').trim()
            || inferStreetFromAddressLine(address?.line || '', streetOptions);
        const finalStreetOptions = streetOptions;

        if (!selectedProvince) {
            setSelectOptions(addressStreetSelect, [], 'Chọn tỉnh/thành phố trước', '');
            addressStreetSelect.disabled = true;
            return;
        }

        if (!wardName) {
            setSelectOptions(addressStreetSelect, [], 'Chọn phường/xã trước', '');
            addressStreetSelect.disabled = true;
            return;
        }

        if (!finalStreetOptions.length) {
            setSelectOptions(addressStreetSelect, [], 'Chưa có dữ liệu đường cho phường/xã này', '');
            addressStreetSelect.disabled = true;
            return;
        }

        setSelectOptions(
            addressStreetSelect,
            finalStreetOptions.map(street => ({ value: street, label: street })),
            'Chọn tên đường',
            selectedStreet
        );
        addressStreetSelect.disabled = false;
    }

    function getAdministrativeDistrictPlaceholder(address = null) {
        const legacyValue = String(address?.district || '').trim();
        if (legacyValue && normalizeText(legacyValue) !== normalizeText('Không áp dụng (mô hình 2 cấp)')) {
            return legacyValue;
        }

        return 'Không áp dụng (mô hình 2 cấp)';
    }

    function getProvinceByAddress(address = null) {
        const cityValue = String(address?.city || '').trim();
        const provinceCode = String(address?.provinceCode || '').trim();

        return administrativeUnitsCache.find(unit => (
            unit.code === provinceCode
            || normalizeText(unit.fullName) === normalizeText(cityValue)
            || normalizeText(unit.shortName) === normalizeText(cityValue)
        )) || null;
    }

    function populateProvinceOptions(address = null, fallbackProvince = null) {
        const selectedProvince = getProvinceByAddress(address) || fallbackProvince;
        setSelectOptions(
            addressCitySelect,
            administrativeUnitsCache.map(unit => ({ value: unit.code, label: unit.fullName })),
            'Chọn tỉnh/thành phố',
            selectedProvince?.code || ''
        );
    }

    function populateDistrictOptions(address = null, province = null) {
        if (!addressDistrictSelect) {
            return;
        }

        const districtLabel = getAdministrativeDistrictPlaceholder(address);
        const hasLegacyDistrict = districtLabel && normalizeText(districtLabel) !== normalizeText('Không áp dụng (mô hình 2 cấp)');

        if (!province && !hasLegacyDistrict) {
            setSelectOptions(addressDistrictSelect, [], 'Chọn quận/huyện', '');
            addressDistrictSelect.disabled = true;
            return;
        }

        const options = [
            {
                value: districtLabel,
                label: hasLegacyDistrict
                    ? districtLabel
                    : `${districtLabel}${province ? ` - ${province.shortName}` : ''}`
            }
        ];

        setSelectOptions(addressDistrictSelect, options, 'Chọn quận/huyện', districtLabel);
        addressDistrictSelect.disabled = false;
    }

    function populateWardOptions(address = null, province = null) {
        if (!addressWardSelect) {
            return;
        }

        if (!province) {
            setSelectOptions(addressWardSelect, [], 'Chọn phường/xã', '');
            addressWardSelect.disabled = true;
            return;
        }

        const wards = province?.wards || [];
        const selectedWardCode = String(address?.wardCode || '').trim();
        const selectedWardName = String(address?.ward || '').trim();
        const selectedWardValue = selectedWardCode || selectedWardName;

        setSelectOptions(
            addressWardSelect,
            wards.map(ward => ({ value: ward.code, label: ward.fullName })),
            'Chọn phường/xã',
            selectedWardValue
        );
        addressWardSelect.disabled = false;

        if (!addressWardSelect.value && selectedWardName) {
            const wardOption = Array.from(addressWardSelect.options).find(option => normalizeText(option.textContent) === normalizeText(selectedWardName));
            if (wardOption) {
                wardOption.selected = true;
            }
        }
    }

    async function syncAddressAdministrativeSelects(address = null) {
        await loadAdministrativeUnits();
        const province = getProvinceByAddress(address);
        populateProvinceOptions(address, province);
        populateDistrictOptions(address, province);
        populateWardOptions(address, province);
        populateStreetOptions(address, province);
    }

    function handleAddressProvinceChange() {
        const provinceCode = addressCitySelect?.value || '';
        const province = administrativeUnitsCache.find(unit => unit.code === provinceCode) || null;
        populateDistrictOptions(null, province);
        populateWardOptions(null, province);
        populateStreetOptions(null, province);
    }

    function getSelectedCheckoutAddress() {
        const addresses = getAddressBook();
        return addresses.find(address => address.id === currentCheckoutAddressId) || getDefaultAddress();
    }

    function ensureCheckoutAddressSelection() {
        const selectedAddress = getSelectedCheckoutAddress();
        currentCheckoutAddressId = selectedAddress?.id || '';
        return selectedAddress;
    }

    function closeSearchSuggestions() {
        if (!searchSuggestions) {
            return;
        }

        searchSuggestions.innerHTML = '';
        searchSuggestions.classList.add('hidden');
    }

    function applySearchQuery(nextQuery = searchInput.value) {
        currentQuery = String(nextQuery || '').trim();
        currentView = 'catalog';
        currentCollectionId = '';
        currentCategory = 'all';
        currentMenuItemId = '';
        currentBrand = '';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        searchInput.value = currentQuery;
        closeSearchSuggestions();
        closeMegaMenu();
        if (currentQuery) {
            trackBehaviorEvent({
                eventType: 'PRODUCT_SEARCH',
                pageType: 'SEARCH_RESULTS',
                pageKey: `search:${normalizeText(currentQuery) || 'empty'}`,
                searchKeyword: currentQuery
            });
        }
        renderCatalog();
    }

    function getSearchableProductText(product) {
        return normalizeText([
            product?.ten_san_pham,
            product?.thuong_hieu,
            product?.danh_muc,
            product?.sku,
            getProductGroupLabel(product)
        ].filter(Boolean).join(' '));
    }

    function createCharacterBigrams(value) {
        const normalized = normalizeText(value).replace(/\s+/g, ' ').trim();
        if (!normalized) {
            return [];
        }
        if (normalized.length === 1) {
            return [normalized];
        }

        const bigrams = [];
        for (let index = 0; index < normalized.length - 1; index += 1) {
            bigrams.push(normalized.slice(index, index + 2));
        }
        return bigrams;
    }

    function getDiceCoefficient(left, right) {
        const leftBigrams = createCharacterBigrams(left);
        const rightBigrams = createCharacterBigrams(right);

        if (!leftBigrams.length || !rightBigrams.length) {
            return 0;
        }

        const rightPool = [...rightBigrams];
        let intersections = 0;

        leftBigrams.forEach(item => {
            const matchIndex = rightPool.indexOf(item);
            if (matchIndex >= 0) {
                intersections += 1;
                rightPool.splice(matchIndex, 1);
            }
        });

        return (2 * intersections) / (leftBigrams.length + rightBigrams.length);
    }

    function scoreProductAgainstQuery(product, query) {
        const normalizedQuery = normalizeText(query);
        if (!normalizedQuery) {
            return 0;
        }

        const normalizedName = normalizeText(product?.ten_san_pham);
        const normalizedBrand = normalizeText(product?.thuong_hieu);
        const searchable = getSearchableProductText(product);
        const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
        let score = 0;

        if (normalizedName === normalizedQuery) {
            score += 240;
        }
        if (normalizedName.startsWith(normalizedQuery)) {
            score += 150;
        }
        if (normalizedName.includes(normalizedQuery)) {
            score += 100;
        }
        if (searchable.includes(normalizedQuery)) {
            score += 70;
        }
        if (normalizedBrand && normalizedBrand.includes(normalizedQuery)) {
            score += 40;
        }

        tokens.forEach(token => {
            if (!token) {
                return;
            }

            if (normalizedName.includes(token)) {
                score += 18;
            } else if (searchable.includes(token)) {
                score += 10;
            }
        });

        score += Math.round(getDiceCoefficient(normalizedName, normalizedQuery) * 80);
        score += Math.round(getDiceCoefficient(searchable, normalizedQuery) * 30);
        return score;
    }

    function getSearchSuggestions(query, sourceProducts = allProducts, limit = SEARCH_SUGGESTION_LIMIT) {
        const normalizedQuery = normalizeText(query);
        if (!normalizedQuery) {
            return [];
        }

        return (Array.isArray(sourceProducts) ? sourceProducts : [])
            .map(product => ({
                product,
                score: scoreProductAgainstQuery(product, normalizedQuery)
            }))
            .filter(item => item.score > 18)
            .sort((left, right) => {
                if (right.score !== left.score) {
                    return right.score - left.score;
                }
                return String(left.product?.ten_san_pham || '').localeCompare(String(right.product?.ten_san_pham || ''), 'vi');
            })
            .slice(0, limit)
            .map(item => item.product);
    }

    function renderSearchSuggestions(query) {
        if (!searchSuggestions) {
            return;
        }

        const normalizedQuery = String(query || '').trim();
        if (!normalizedQuery) {
            closeSearchSuggestions();
            return;
        }

        const suggestions = getSearchSuggestions(normalizedQuery, allProducts, SEARCH_SUGGESTION_LIMIT);
        if (!suggestions.length) {
            searchSuggestions.innerHTML = '<div class="search-suggestion-empty">Kh\u00f4ng c\u00f3 g\u1ee3i \u00fd ph\u00f9 h\u1ee3p</div>';
            searchSuggestions.classList.remove('hidden');
            return;
        }

        searchSuggestions.innerHTML = suggestions.map(product => `
            <button class="search-suggestion-item" type="button" data-search-suggestion="${escapeHtml(product.ten_san_pham || '')}">
                <strong>${escapeHtml(product.ten_san_pham || '')}</strong>
                <span>${escapeHtml([product.thuong_hieu, getProductGroupLabel(product)].filter(Boolean).join(' · '))}</span>
            </button>
        `).join('');
        searchSuggestions.classList.remove('hidden');
    }

    function syncProductDetailWishlistState(productId = currentDetailProductId) {
        if (!productDetailWishlistBtn || !productId) {
            return;
        }

        const active = isWishlisted(productId);
        productDetailWishlistBtn.classList.toggle('active', active);
        productDetailWishlistBtn.innerHTML = `<i class="fa-solid fa-heart"></i> ${active ? 'Bỏ khỏi yêu thích' : 'Yêu thích'}`;
        productDetailWishlistBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    function renderProductDetailRelatedProducts(product = findProductById(currentDetailProductId)) {
        if (!productDetailRelated || !product) {
            return;
        }

        const hasFreshDetailRecommendations = detailRecommendationSignature.endsWith(`:detail:${String(product.id)}`);
        const relatedProducts = hasFreshDetailRecommendations && detailRecommendationProducts.length
            ? detailRecommendationProducts
            : getRelatedProductsForDetail(product);

        productDetailRelated.innerHTML = relatedProducts.length
            ? relatedProducts.map(buildProductCardMarkup).join('')
            : '<p class="workspace-empty">Chưa có thêm sản phẩm cùng nhóm để gợi ý.</p>';
        syncFavoriteButtons('', productDetailRelated);
        syncCommerceAccessUI(productDetailRelated);
        repairRenderedContent(productDetailRelated);
    }

    function buildProductCardMarkup(product) {
        const badge = product.ton_kho <= 3
            ? '<span class="badge danger">Sap het</span>'
            : (product.ton_kho <= 10 ? '<span class="badge warning">Ban chay</span>' : '');
        const favoriteActive = isWishlisted(product.id) ? 'active' : '';
        const favoriteLabel = isWishlisted(product.id) ? 'B\u1ecf kh\u1ecfi y\u00eau th\u00edch' : 'Th\u00eam v\u00e0o y\u00eau th\u00edch';

        return `
            <article class="product-card">
                <div class="product-img">
                    ${badge}
                    <button
                        class="wishlist-toggle-btn ${favoriteActive}"
                        type="button"
                        data-favorite-toggle
                        data-product-id="${product.id}"
                        aria-label="${favoriteLabel}"
                        title="${favoriteLabel}"
                    >
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham)}" loading="lazy">
                </div>
                <div class="product-info">
                    <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                    <h3 class="product-name">${escapeHtml(product.ten_san_pham || '')}</h3>
                    <p class="product-subcategory">${escapeHtml(getProductGroupLabel(product))}</p>
                    <div class="product-meta">
                        <span>${escapeHtml(product.thuong_hieu || 'Khong ro')}</span>
                        <span>${escapeHtml(normalizeSizeValue(product.size) || '--')}</span>
                    </div>
                    ${renderPriceDisplay(product, { wrapperClass: 'price-stack product-price-block', currentClass: 'product-price' })}
                    <p class="product-stock">Ton kho: ${product.ton_kho ?? 0}</p>
                    <button class="add-to-cart-btn" type="button" data-product-id="${product.id}">Th\u00eam v\u00e0o gi\u1ecf</button>
                </div>
            </article>
        `;
    }

    function renderProducts(products) {
        if (!products.length) {
            productContainer.innerHTML = '<p class="loading-text">Không có sản phẩm phù hợp với bộ lọc hiện tại.</p>';
            return;
        }

        productContainer.innerHTML = products.map(product => {
            const badge = product.ton_kho <= 3
                ? '<span class="badge danger">Sap het</span>'
                : (product.ton_kho <= 10 ? '<span class="badge warning">Ban chay</span>' : '');
            const favoriteActive = isWishlisted(product.id) ? 'active' : '';
            const favoriteLabel = isWishlisted(product.id) ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích';

            return `
                <article class="product-card">
                    <div class="product-img">
                        ${badge}
                        <button
                            class="wishlist-toggle-btn ${favoriteActive}"
                            type="button"
                            data-favorite-toggle
                            data-product-id="${product.id}"
                            aria-label="${favoriteLabel}"
                            title="${favoriteLabel}"
                        >
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham)}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                        <h3 class="product-name">${escapeHtml(product.ten_san_pham || '')}</h3>
                        <p class="product-subcategory">${escapeHtml(getProductGroupLabel(product))}</p>
                        <div class="product-meta">
                            <span>${escapeHtml(product.thuong_hieu || 'Khong ro')}</span>
                            <span>${escapeHtml(normalizeSizeValue(product.size) || '--')}</span>
                        </div>
                        ${renderPriceDisplay(product, { wrapperClass: 'price-stack product-price-block', currentClass: 'product-price' })}
                        <p class="product-stock">Ton kho: ${product.ton_kho ?? 0}</p>
                        <button class="add-to-cart-btn" type="button" data-product-id="${product.id}">Thêm vào giỏ</button>
                    </div>
                </article>
            `;
        }).join('');
    }

    function renderProducts(products) {
        if (!products.length) {
            if (currentQuery) {
                const similarProducts = getSearchSuggestions(currentQuery, allProducts, SEARCH_FALLBACK_LIMIT)
                    .filter(product => !normalizeText(product?.ten_san_pham).includes(normalizeText(currentQuery)));
                const similarMarkup = similarProducts.length
                    ? `
                        <div class="search-similar-block">
                            <p class="search-similar-title">Sản phẩm gần giống từ khóa nhất</p>
                            <div class="search-similar-grid">
                                ${similarProducts.map(buildProductCardMarkup).join('')}
                            </div>
                        </div>
                    `
                    : '';

                productContainer.innerHTML = `
                    <div class="search-empty-state">
                        <h3>Không có sản phẩm cần tìm</h3>
                        <p>Không tìm thấy kết quả phù hợp cho từ khóa <strong>${escapeHtml(currentQuery)}</strong>.</p>
                        ${similarMarkup}
                    </div>
                `;
                return;
            }

            productContainer.innerHTML = '<p class="loading-text">Không có sản phẩm phù hợp với bộ lọc hiện tại.</p>';
            return;
        }

        const renderToken = ++productRenderToken;
        const batchSize = 36;
        let renderedCount = Math.min(batchSize, products.length);
        productContainer.innerHTML = products.slice(0, renderedCount).map(buildProductCardMarkup).join('');

        const renderNextBatch = () => {
            if (renderToken !== productRenderToken || renderedCount >= products.length) {
                if (renderToken === productRenderToken) {
                    window.requestAnimationFrame(() => repairTextNodes(productContainer));
                }
                return;
            }

            const nextCount = Math.min(renderedCount + batchSize, products.length);
            productContainer.insertAdjacentHTML('beforeend', products.slice(renderedCount, nextCount).map(buildProductCardMarkup).join(''));
            renderedCount = nextCount;
            window.requestAnimationFrame(renderNextBatch);
        };

        if (renderedCount < products.length) {
            window.requestAnimationFrame(renderNextBatch);
        }
    }

    function renderProducts(products) {
        const renderToken = ++productRenderToken;
        if (!products.length) {
            if (currentQuery) {
                const similarProducts = getSearchSuggestions(currentQuery, allProducts, SEARCH_FALLBACK_LIMIT)
                    .filter(product => !normalizeText(product?.ten_san_pham).includes(normalizeText(currentQuery)));
                const similarMarkup = similarProducts.length
                    ? `
                        <div class="search-similar-block">
                            <p class="search-similar-title">\u0053\u1ea3\u006e\u0020\u0070\u0068\u1ea9\u006d\u0020\u0067\u1ea7\u006e\u0020\u0067\u0069\u1ed1\u006e\u0067\u0020\u0074\u1eeb\u0020\u006b\u0068\u00f3\u0061\u0020\u006e\u0068\u1ea5\u0074</p>
                            <div class="search-similar-grid">
                                ${similarProducts.map(buildProductCardMarkup).join('')}
                            </div>
                        </div>
                    `
                    : '';

                productContainer.innerHTML = `
                    <div class="search-empty-state">
                        <h3>\u004b\u0068\u00f4\u006e\u0067\u0020\u0063\u00f3\u0020\u0073\u1ea3\u006e\u0020\u0070\u0068\u1ea9\u006d\u0020\u0063\u1ea7\u006e\u0020\u0074\u00ec\u006d</h3>
                        <p>\u004b\u0068\u00f4\u006e\u0067\u0020\u0074\u00ec\u006d\u0020\u0074\u0068\u1ea5\u0079\u0020\u006b\u1ebf\u0074\u0020\u0071\u0075\u1ea3\u0020\u0070\u0068\u00f9\u0020\u0068\u1ee3\u0070\u0020\u0063\u0068\u006f\u0020\u0074\u1eeb\u0020\u006b\u0068\u00f3\u0061\u0020<strong>${escapeHtml(currentQuery)}</strong>.</p>
                        ${similarMarkup}
                    </div>
                `;
                return;
            }

            productContainer.innerHTML = '<p class="loading-text">Kh\u00f4ng c\u00f3 s\u1ea3n ph\u1ea9m ph\u00f9 h\u1ee3p v\u1edbi b\u1ed9 l\u1ecdc hi\u1ec7n t\u1ea1i.</p>';
            return;
        }

        const batchSize = 36;
        let renderedCount = Math.min(batchSize, products.length);
        productContainer.innerHTML = products.slice(0, renderedCount).map(buildProductCardMarkup).join('');

        const renderNextBatch = () => {
            if (renderToken !== productRenderToken || renderedCount >= products.length) {
                if (renderToken === productRenderToken) {
                    window.requestAnimationFrame(() => repairTextNodes(productContainer));
                }
                return;
            }

            const nextCount = Math.min(renderedCount + batchSize, products.length);
            productContainer.insertAdjacentHTML('beforeend', products.slice(renderedCount, nextCount).map(buildProductCardMarkup).join(''));
            renderedCount = nextCount;
            window.requestAnimationFrame(renderNextBatch);
        };

        if (renderedCount < products.length) {
            window.requestAnimationFrame(renderNextBatch);
        }
    }

    function renderWishlistView() {
        syncWishlistStaticText();
        const wishlistProducts = getWishlistProducts();
        const hasItems = wishlistProducts.length > 0;

        wishlistEmptyState.classList.toggle('hidden', hasItems);
        wishlistGrid.classList.toggle('hidden', !hasItems);

        if (!hasItems) {
            wishlistGrid.innerHTML = '';
            return;
        }

        wishlistGrid.innerHTML = wishlistProducts.map(product => `
            <article class="wishlist-card">
                <button
                    class="wishlist-card-remove"
                    type="button"
                    data-wishlist-remove
                    data-product-id="${product.id}"
                    aria-label="Xóa khỏi yêu thích"
                    title="Xóa khỏi yêu thích"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="wishlist-card-image">
                    <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham || 'San pham')}" loading="lazy">
                </div>
                <div class="wishlist-card-body">
                    <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                    <h3 class="wishlist-card-title" title="${escapeHtml(product.ten_san_pham || '')}">${escapeHtml(product.ten_san_pham || '')}</h3>
                    <p class="product-subcategory wishlist-card-group" title="${escapeHtml(getProductGroupLabel(product))}">${escapeHtml(getProductGroupLabel(product))}</p>
                    <div class="wishlist-card-meta">
                        <span>${escapeHtml(product.thuong_hieu || 'Khong ro')}</span>
                        <span>${escapeHtml(normalizeSizeValue(product.size) || 'Tieu chuan')}</span>
                    </div>
                    <div class="wishlist-card-footer">
                        ${renderPriceDisplay(product, { wrapperClass: 'price-stack wishlist-price-block', currentClass: 'product-price' })}
                        <div class="wishlist-card-actions">
                            <button class="secondary-btn text-bold" type="button" data-wishlist-remove data-product-id="${product.id}">Xóa</button>
                            <button class="login-submit-btn text-bold" type="button" data-wishlist-move data-product-id="${product.id}">Bỏ vào giỏ</button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        repairRenderedContent();
    }

    function renderCatalog() {
        const shouldUseCatalogView = currentView === 'catalog'
            || Boolean(currentCollectionId)
            || currentCategory !== 'all'
            || Boolean(currentMenuItemId)
            || Boolean(currentBrand)
            || currentPriceRange !== 'all'
            || currentTypeFilter !== 'all'
            || currentSizeFilter !== 'all'
            || currentSortOption !== 'featured'
            || Boolean(currentQuery);

        currentView = shouldUseCatalogView ? 'catalog' : 'home';

        const shouldShowHomeLanding = shouldShowHomeRecommendations();
        const baseProducts = shouldShowHomeLanding ? [] : getBaseProducts();
        const filteredProducts = shouldShowHomeLanding ? [] : getFilteredProducts(baseProducts);
        const isMegaMenuOpen = megaMenu && !megaMenu.classList.contains('hidden');
        if (shouldShowHomeLanding) {
            scheduleProductContainerClear();
            collectionView.classList.add('hidden');
            activeFilters.classList.add('hidden');
        } else {
            renderProducts(filteredProducts);
            renderCatalogHeader(filteredProducts);
            renderCollectionView(baseProducts, filteredProducts);
            renderActiveFilters();
        }
        if (isMegaMenuOpen) {
            renderMegaMenu();
        }
        if (shouldShowHomeLanding) {
            renderHomeFeatureStrip();
            renderHomeSaleShowcase();
        }
        const catalogContext = buildCatalogTrackingContext();
        setTrackedPageContext(catalogContext.pageType, catalogContext.pageKey, catalogContext.extra);
        if (shouldShowHomeLanding) {
            void loadHomeRecommendations();
        }
        syncMainView();
        syncNavState();
        syncCommerceAccessUI();
        if (!shouldShowHomeLanding) {
            window.requestAnimationFrame(() => repairTextNodes(productContainer));
        }
    }

    function updateCartCount() {
        const totalItems = getCartItems().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
        cartCount.textContent = String(totalItems);
    }

    function addToCart(productId) {
        if (!ensureCartAccess('Hãy đăng nhập trước khi thêm sản phẩm vào giỏ hàng.')) {
            return;
        }
        openCartConfigurator(productId);
    }

    function getCurrentAccountStorageSuffix() {
        const sourceValue = currentUser?.id
            ?? currentUser?.username
            ?? currentUser?.ten_dang_nhap
            ?? currentUser?.tenDangNhap
            ?? currentUser?.email
            ?? currentUser?.sdt
            ?? currentUser?.phone
            ?? '';

        return String(sourceValue).trim();
    }

    function getScopedStorageKey(baseKey) {
        const accountSuffix = getCurrentAccountStorageSuffix();
        if (!accountSuffix) {
            return '';
        }

        return `${baseKey}_${accountSuffix}`;
    }

    function getCurrentCartStorageKey() {
        return getScopedStorageKey(CART_KEY);
    }

    function getCurrentVoucherStorageKey() {
        return getScopedStorageKey(VOUCHER_KEY);
    }

    function getCurrentWishlistStorageKey() {
        return getScopedStorageKey(WISHLIST_KEY);
    }

    function getCurrentAddressBookStorageKey() {
        return getScopedStorageKey(ADDRESS_BOOK_KEY);
    }

    function getCurrentOrderHistoryStorageKey() {
        return getScopedStorageKey(ORDER_HISTORY_KEY);
    }

    function ensureCartAccess(message = 'Hãy đăng nhập để sử dụng giỏ hàng.') {
        if (currentUser) {
            return true;
        }

        loginError.textContent = message;
        loginError.classList.remove('hidden');
        openOverlay(loginOverlay);
        return false;
    }

    function ensureCustomerAccess(message = 'Hãy đăng nhập để sử dụng tính năng tài khoản khách hàng.') {
        if (currentUser) {
            return true;
        }

        loginError.textContent = message;
        loginError.classList.remove('hidden');
        openOverlay(loginOverlay);
        return false;
    }

    function ensureWishlistAccess(message = 'Hãy đăng nhập để sử dụng sản phẩm yêu thích.') {
        if (currentUser) {
            return true;
        }

        loginError.textContent = message;
        loginError.classList.remove('hidden');
        openOverlay(loginOverlay);
        return false;
    }

    function getCartItems() {
        const cartStorageKey = getCurrentCartStorageKey();
        if (!cartStorageKey) {
            return [];
        }

        const storedItems = readStorage(cartStorageKey, []);
        if (!Array.isArray(storedItems)) {
            return [];
        }

        const cartMap = new Map();

        storedItems.forEach(rawItem => {
            const productId = String(rawItem?.productId ?? rawItem?.id ?? '').trim();
            if (!productId) {
                return;
            }

            const product = findProductById(productId);
            const sizeOptions = getProductSizeOptions(product);
            const fallbackSize = sizeOptions[0] || 'Tieu chuan';
            const size = String(rawItem?.size || fallbackSize).trim() || fallbackSize;
            const lineId = buildCartLineId(productId, size);
            const quantity = Math.max(1, Math.round(Number(rawItem?.quantity || 1)));
            const selected = rawItem?.selected !== false;

            if (cartMap.has(lineId)) {
                const existing = cartMap.get(lineId);
                existing.quantity += quantity;
                existing.selected = existing.selected || selected;
                return;
            }

            cartMap.set(lineId, {
                lineId,
                productId,
                size,
                quantity,
                selected
            });
        });

        return Array.from(cartMap.values());
    }

    function saveCartItems(items) {
        const cartStorageKey = getCurrentCartStorageKey();
        if (!cartStorageKey) {
            updateCartCount();
            return;
        }

        if (!Array.isArray(items) || !items.length) {
            localStorage.removeItem(cartStorageKey);
            updateCartCount();
            return;
        }

        const normalizedItems = items.map(item => ({
            lineId: String(item.lineId || buildCartLineId(item.productId, item.size)),
            productId: String(item.productId),
            size: String(item.size || 'Tieu chuan'),
            quantity: Math.max(1, Math.round(Number(item.quantity || 1))),
            selected: item.selected !== false
        }));

        localStorage.setItem(cartStorageKey, JSON.stringify(normalizedItems));
        updateCartCount();
    }

    function findProductById(productId) {
        return allProducts.find(product => String(product.id) === String(productId)) || null;
    }

    function buildCartLineId(productId, size) {
        const sizeKey = normalizeText(size || 'Tieu chuan').replace(/\s+/g, '-') || 'tieu-chuan';
        return `${String(productId)}::${sizeKey}`;
    }

    function getProductSizeOptions(product) {
        const rawSize = normalizeSizeValue(product?.size);
        if (!rawSize) {
            return ['Tieu chuan'];
        }

        const compact = rawSize.replace(/\s+/g, ' ').trim();
        const numericRange = compact.match(/^(\d+)\s*-\s*(\d+)$/);
        if (numericRange) {
            const start = Number(numericRange[1]);
            const end = Number(numericRange[2]);
            if (end >= start && end - start <= 10) {
                return Array.from({ length: end - start + 1 }, (_, index) => String(start + index));
            }
        }

        const apparelScale = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '2XL', '3XL'];
        const apparelRange = compact.toUpperCase().match(/^(XXS|XS|S|M|L|XL|XXL|XXXL|2XL|3XL)\s*-\s*(XXS|XS|S|M|L|XL|XXL|XXXL|2XL|3XL)$/);
        if (apparelRange) {
            const startIndex = apparelScale.indexOf(apparelRange[1]);
            const endIndex = apparelScale.indexOf(apparelRange[2]);
            if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
                return apparelScale.slice(startIndex, endIndex + 1);
            }
        }

        if (/[\/,|]/.test(compact)) {
            return compact
                .split(/[\/,|]/)
                .map(part => part.trim())
                .filter(Boolean);
        }

        return [compact];
    }

    function getAppliedVoucherCode() {
        const voucherStorageKey = getCurrentVoucherStorageKey();
        if (!voucherStorageKey) {
            return '';
        }

        return String(localStorage.getItem(voucherStorageKey) || '').trim().toUpperCase();
    }

    function saveAppliedVoucherCode(code) {
        const voucherStorageKey = getCurrentVoucherStorageKey();
        if (!voucherStorageKey) {
            return;
        }

        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!normalizedCode) {
            localStorage.removeItem(voucherStorageKey);
            return;
        }

        localStorage.setItem(voucherStorageKey, normalizedCode);
    }

    function getVoucherByCode(code) {
        return AVAILABLE_VOUCHERS.find(voucher => voucher.code === String(code || '').trim().toUpperCase()) || null;
    }

    function getVoucherDiscountAmount(voucher, subtotal) {
        if (!voucher || subtotal < Number(voucher.minOrder || 0)) {
            return 0;
        }

        const rawDiscount = subtotal * Number(voucher.percent || 0);
        const maxDiscount = Number(voucher.maxDiscount || 0);
        return maxDiscount > 0 ? Math.min(rawDiscount, maxDiscount) : rawDiscount;
    }

    function getResolvedVoucher(subtotal) {
        const voucher = getVoucherByCode(getAppliedVoucherCode());
        if (!voucher) {
            saveAppliedVoucherCode('');
            return null;
        }

        if (subtotal < Number(voucher.minOrder || 0) || !voucherAppliesToCurrentCart(voucher)) {
            saveAppliedVoucherCode('');
            return null;
        }

        return voucher;
    }

    function applyVoucherCode(code) {
        const voucher = getVoucherByCode(code);
        if (!voucher) {
            return;
        }

        const subtotal = getHydratedCartItems()
            .filter(item => item.selected)
            .reduce((sum, item) => sum + item.subtotal, 0);

        if (subtotal < Number(voucher.minOrder || 0)) {
            return;
        }

        saveAppliedVoucherCode(voucher.code);
        renderCartView();
    }

    function syncCartViewStaticText() {
        cartEyebrow.textContent = '\u0047i\u1ecf h\u00e0ng';
        cartTitle.textContent = 'Gi\u1ecf h\u00e0ng c\u1ee7a b\u1ea1n';
        cartDescription.textContent = 'Ki\u1ec3m tra l\u1ea1i s\u1ea3n ph\u1ea9m \u0111\u00e3 ch\u1ecdn, thay \u0111\u1ed5i size ho\u1eb7c s\u1ed1 l\u01b0\u1ee3ng tr\u01b0\u1edbc khi thanh to\u00e1n.';
        continueShoppingBtn.textContent = 'Ti\u1ebfp t\u1ee5c mua s\u1eafm';
        cartEmptyTitle.textContent = 'Gi\u1ecf h\u00e0ng \u0111ang tr\u1ed1ng';
        cartEmptyDescription.textContent = 'Th\u00eam v\u00e0i s\u1ea3n ph\u1ea9m \u0111\u1ec3 b\u1eaft \u0111\u1ea7u \u0111\u01a1n h\u00e0ng c\u1ee7a b\u1ea1n.';
        emptyCartContinueBtn.textContent = 'Kh\u00e1m ph\u00e1 s\u1ea3n ph\u1ea9m';
        cartSelectAllText.textContent = 'Ch\u1ecdn t\u1ea5t c\u1ea3 s\u1ea3n ph\u1ea9m';
        if (cartTableHeadings[0]) cartTableHeadings[0].textContent = 'S\u1ea3n ph\u1ea9m';
        if (cartTableHeadings[1]) cartTableHeadings[1].textContent = '\u0110\u01a1n gi\u00e1';
        if (cartTableHeadings[2]) cartTableHeadings[2].textContent = 'S\u1ed1 l\u01b0\u1ee3ng';
        if (cartTableHeadings[3]) cartTableHeadings[3].textContent = 'S\u1ed1 ti\u1ec1n';
        if (cartTableHeadings[4]) cartTableHeadings[4].textContent = '';
    }

    function syncWishlistStaticText() {
        wishlistEyebrow.textContent = 'Y\u00eau th\u00edch';
        wishlistTitle.textContent = 'S\u1ea3n ph\u1ea9m y\u00eau th\u00edch';
        wishlistDescription.textContent = 'L\u01b0u l\u1ea1i nh\u1eefng s\u1ea3n ph\u1ea9m b\u1ea1n mu\u1ed1n mua sau, c\u00f3 th\u1ec3 x\u00f3a ho\u1eb7c chuy\u1ec3n nhanh sang gi\u1ecf h\u00e0ng.';
        continueFromWishlistBtn.textContent = 'Ti\u1ebfp t\u1ee5c mua s\u1eafm';
        wishlistEmptyTitle.textContent = 'Ch\u01b0a c\u00f3 s\u1ea3n ph\u1ea9m y\u00eau th\u00edch';
        wishlistEmptyDescription.textContent = 'Nh\u1ea5n v\u00e0o bi\u1ec3u t\u01b0\u1ee3ng tr\u00e1i tim tr\u00ean s\u1ea3n ph\u1ea9m \u0111\u1ec3 l\u01b0u l\u1ea1i nh\u1eefng m\u00f3n b\u1ea1n mu\u1ed1n xem l\u1ea1i sau.';
        wishlistEmptyContinueBtn.textContent = 'Kh\u00e1m ph\u00e1 s\u1ea3n ph\u1ea9m';
    }

    function syncCartSummaryStaticText() {
        const cartSummaryLabels = cartView.querySelectorAll('.cart-summary-card .cart-summary-line span');
        cartSummaryTitle.textContent = 'Tóm tắt đơn hàng';
        if (cartSummaryLabels[0]) cartSummaryLabels[0].textContent = 'Sản phẩm đã chọn';
        if (cartSummaryLabels[1]) cartSummaryLabels[1].textContent = 'Tạm tính';
        if (cartSummaryLabels[2]) cartSummaryLabels[2].textContent = 'Phí vận chuyển';
        cartDiscountLabel.textContent = 'Ưu đãi';
        if (cartSummaryLabels[4]) cartSummaryLabels[4].textContent = 'Tổng thanh toán';
        cartVoucherEyebrow.textContent = 'Ưu đãi của bạn';
        cartVoucherTitle.textContent = 'Mã khuyến mãi';
        clearVoucherBtn.textContent = 'Bỏ mã';
        checkoutBtn.textContent = 'Thanh toán sản phẩm đã chọn';
        removeSelectedBtn.textContent = 'Xóa sản phẩm đã chọn';
    }

    function syncCheckoutStaticText() {
        checkoutBackText.textContent = 'Quay lại giỏ hàng';
        checkoutEyebrow.textContent = 'Thanh toán';
        checkoutTitle.textContent = 'Xác nhận đơn hàng';
        checkoutDescription.textContent = 'Kiểm tra sản phẩm, thay đổi mã khuyến mãi và hoàn tất bước thanh toán.';
        checkoutSummaryTitle.textContent = 'Chi tiết thanh toán';
        checkoutCountLabel.textContent = 'Sản phẩm đã chọn';
        checkoutSubtotalLabel.textContent = 'Tạm tính';
        checkoutShippingLabel.textContent = 'Phí vận chuyển';
        checkoutDiscountLabel.textContent = 'Ưu đãi';
        checkoutVoucherEyebrow.textContent = 'Ưu đãi của bạn';
        checkoutVoucherTitle.textContent = 'Mã khuyến mãi';
        checkoutClearVoucherBtn.textContent = 'Bỏ mã';
        checkoutTotalLabel.textContent = 'Tổng thanh toán';
        placeOrderBtn.textContent = 'Xác nhận thanh toán';
    }

    function renderVoucherList(subtotal, appliedVoucher, options = {}) {
        const {
            listElement = voucherList,
            noteElement = voucherAppliedNote,
            clearButton = clearVoucherBtn
        } = options;

        listElement.innerHTML = AVAILABLE_VOUCHERS.map(voucher => {
            const minOrder = Number(voucher.minOrder || 0);
            const maxDiscount = Number(voucher.maxDiscount || 0);
            const discountAmount = getVoucherDiscountAmount(voucher, subtotal);
            const isEligible = subtotal >= minOrder && subtotal > 0;
            const isActive = appliedVoucher?.code === voucher.code;

            return `
                <article class="voucher-card ${isEligible ? '' : 'disabled'} ${isActive ? 'active' : ''}">
                    <div class="voucher-card-main">
                        <div class="voucher-code-row">
                            <strong class="voucher-code">${voucher.code}</strong>
                            ${isActive ? '<span class="voucher-active-badge">Đang dùng</span>' : ''}
                        </div>
                        <p class="voucher-label">${voucher.label} - tối đa ${formatCurrency(maxDiscount)}</p>
                        <p class="voucher-meta">Đơn tối thiểu ${formatCurrency(minOrder)}</p>
                        <p class="voucher-meta">Ước tính giảm ${formatCurrency(discountAmount)}</p>
                        <p class="voucher-meta">Danh mục: ${escapeHtml(categories)}</p>
                        <p class="voucher-meta">${escapeHtml(expiryText)}</p>
                    </div>
                    <button
                        class="voucher-use-btn"
                        type="button"
                        data-voucher-apply="${voucher.code}"
                        ${!isEligible || isActive ? 'disabled' : ''}
                    >
                        ${isActive ? 'Đã áp dụng' : 'Sử dụng'}
                    </button>
                </article>
            `;
        }).join('');

        if (appliedVoucher) {
            noteElement.textContent = `Đang áp dụng mã ${appliedVoucher.code}. Đơn hàng được giảm tối đa ${formatCurrency(appliedVoucher.maxDiscount)}.`;
            noteElement.classList.remove('hidden');
            clearButton.classList.remove('hidden');
        } else {
            noteElement.textContent = '';
            noteElement.classList.add('hidden');
            clearButton.classList.add('hidden');
        }
    }

    function getHydratedCartItems() {
        return getCartItems()
            .map(item => {
                const product = findProductById(item.productId);
                if (!product) {
                    return null;
                }

                const sizeOptions = getProductSizeOptions(product);
                const resolvedSize = sizeOptions.includes(item.size) ? item.size : (sizeOptions[0] || 'Tieu chuan');
                const maxQuantity = getCartLineMaxQuantity(product);
                const quantity = Math.min(Math.max(1, Number(item.quantity || 1)), maxQuantity);

                return {
                    ...item,
                    lineId: buildCartLineId(item.productId, resolvedSize),
                    size: resolvedSize,
                    quantity,
                    sizeOptions,
                    product,
                    unitPrice: getProductCurrentPrice(product),
                    originalUnitPrice: getProductOriginalPrice(product),
                    discountPercent: getProductDiscountPercent(product),
                    subtotal: getProductCurrentPrice(product) * quantity,
                    originalSubtotal: getProductOriginalPrice(product) * quantity
                };
            })
            .filter(Boolean);
    }

    function getCartLineMaxQuantity(product) {
        const stock = Number(product?.ton_kho ?? 0);
        return Math.max(1, stock > 0 ? stock : 1);
    }

    function openCartConfigurator(productId, options = {}) {
        if (!ensureCartAccess('Hãy đăng nhập trước khi thêm sản phẩm vào giỏ hàng.')) {
            return;
        }

        const product = findProductById(productId);
        if (!product) {
            return;
        }

        if (Number(product.ton_kho || 0) <= 0) {
            alert('San pham nay da het hang.');
            return;
        }

        const maxQuantity = getCartLineMaxQuantity(product);
        const sizeOptions = getProductSizeOptions(product);

        cartConfigProductId.value = String(product.id);
        cartConfigImage.src = getProductImageUrl(product);
        cartConfigImage.alt = product.ten_san_pham || 'San pham';
        cartConfigCategory.textContent = product.danh_muc || getCanonicalSportFromProduct(product);
        cartConfigName.textContent = product.ten_san_pham || 'San pham';
        cartConfigBrand.textContent = product.thuong_hieu || 'Khong ro thuong hieu';
        cartConfigPrice.innerHTML = renderPriceDisplay(product, {
            wrapperClass: 'price-stack cart-config-price-block',
            currentClass: 'product-price'
        });
        cartConfigStock.textContent = `Con lai ${product.ton_kho ?? 0} san pham.`;
        cartConfigSize.innerHTML = sizeOptions.map(size => `<option value="${escapeHtml(size)}">${escapeHtml(size)}</option>`).join('');
        cartConfigQuantity.value = '1';
        cartConfigQuantity.max = String(maxQuantity);
        cartItemError.textContent = '';
        cartItemError.classList.add('hidden');
        pendingWishlistMoveProductId = options.removeFromWishlist ? String(product.id) : '';
        openOverlay(cartItemOverlay);
    }

    function confirmAddToCart() {
        const product = findProductById(cartConfigProductId.value);
        if (!product) {
            return;
        }

        if (Number(product.ton_kho || 0) <= 0) {
            cartItemError.textContent = 'San pham nay tam thoi da het hang.';
            cartItemError.classList.remove('hidden');
            return;
        }

        const quantity = Math.max(1, Math.round(Number(cartConfigQuantity.value || 1)));
        const size = String(cartConfigSize.value || getProductSizeOptions(product)[0] || 'Tieu chuan').trim();
        const lineId = buildCartLineId(product.id, size);
        const maxQuantity = getCartLineMaxQuantity(product);
        const cartItems = getCartItems();
        const existingLine = cartItems.find(item => item.lineId === lineId);
        const nextQuantity = (existingLine?.quantity || 0) + quantity;

        if (nextQuantity > maxQuantity) {
            cartItemError.textContent = `So luong toi da cho san pham nay la ${maxQuantity}.`;
            cartItemError.classList.remove('hidden');
            return;
        }

        if (existingLine) {
            existingLine.quantity = nextQuantity;
            existingLine.selected = true;
        } else {
            cartItems.push({
                lineId,
                productId: String(product.id),
                size,
                quantity,
                selected: true
            });
        }

        saveCartItems(cartItems);
        trackBehaviorEvent({
            eventType: 'ADD_TO_CART',
            pageType: currentView === 'product-detail' ? 'PRODUCT_DETAIL' : 'CATALOG',
            pageKey: currentView === 'product-detail' ? (product.sku || String(product.id)) : 'catalog',
            productId: product.id,
            categoryKey: product.danh_muc,
            brandKey: product.thuong_hieu,
            priceValue: getProductCurrentPrice(product),
            metadata: {
                quantity,
                size,
                fromWishlist: pendingWishlistMoveProductId === String(product.id)
            }
        });
        if (pendingWishlistMoveProductId === String(product.id)) {
            const nextWishlistIds = getWishlistIds().filter(id => id !== String(product.id));
            saveWishlistIds(nextWishlistIds);
        }
        resetCartConfiguratorState();
        renderCartView();
        renderWishlistView();
        closeOverlay(cartItemOverlay);
        if (currentView === 'wishlist') {
            syncMainView();
        } else {
            renderCatalog();
        }
        showCenteredMessage(`\u0110\u00e3 th\u00eam "${sanitizeProductText(product.ten_san_pham || 's\u1ea3n ph\u1ea9m')}" v\u00e0o gi\u1ecf h\u00e0ng.`);
    }

    function renderCartView() {
        syncCartSummaryStaticText();
        const cartItems = getHydratedCartItems();
        const selectedItems = cartItems.filter(item => item.selected);
        const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = 0;
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal + shipping - discount);

        const hasItems = cartItems.length > 0;
        cartEmptyState.classList.toggle('hidden', hasItems);
        cartContent.classList.toggle('hidden', !hasItems);

        if (!hasItems) {
            saveAppliedVoucherCode('');
            cartRecommendationProducts = [];
            cartRecommendationSignature = '';
            cartItemsContainer.innerHTML = '';
            voucherList.innerHTML = '';
            voucherAppliedNote.textContent = '';
            voucherAppliedNote.classList.add('hidden');
            clearVoucherBtn.classList.add('hidden');
            cartSelectAllCheckbox.checked = false;
            cartSelectAllCheckbox.indeterminate = false;
            cartSelectionSummary.textContent = '0 san pham duoc chon';
            cartSummaryCount.textContent = '0';
            cartSummarySubtotal.textContent = formatCurrency(0);
            cartSummaryShipping.textContent = formatCurrency(0);
            cartDiscountLine.classList.add('hidden');
            cartSummaryDiscount.textContent = `-${formatCurrency(0)}`;
            cartSummaryTotal.textContent = formatCurrency(0);
            checkoutBtn.disabled = true;
            removeSelectedBtn.disabled = true;
            renderCartRecommendations();
            return;
        }

        cartItemsContainer.innerHTML = cartItems.map(item => {
            const sizeOptions = item.sizeOptions.map(size => `
                <option value="${escapeHtml(size)}" ${size === item.size ? 'selected' : ''}>${escapeHtml(size)}</option>
            `).join('');

            return `
                <article class="cart-item cart-table">
                    <div class="cart-col-product">
                        <div class="cart-product-cell">
                            <label class="cart-row-check">
                                <input type="checkbox" data-cart-select data-line-id="${escapeHtml(item.lineId)}" ${item.selected ? 'checked' : ''}>
                            </label>
                            <div class="cart-product-image">
                                <img src="${escapeHtml(getProductImageUrl(item.product))}" alt="${escapeHtml(item.product.ten_san_pham || 'San pham')}" loading="lazy">
                            </div>
                            <div class="cart-product-info">
                                <p class="product-category cart-product-category">${escapeHtml(item.product.danh_muc || '')}</p>
                                <h3 class="cart-product-title" title="${escapeHtml(item.product.ten_san_pham || '')}">${escapeHtml(item.product.ten_san_pham || '')}</h3>
                                <p class="product-subcategory cart-product-group" title="${escapeHtml(getProductGroupLabel(item.product))}">${escapeHtml(getProductGroupLabel(item.product))}</p>
                                <div class="cart-product-meta">
                                    <span title="${escapeHtml(item.product.thuong_hieu || 'Khong ro')}">${escapeHtml(item.product.thuong_hieu || 'Khong ro')}</span>
                                    <span>Ton kho: ${item.product.ton_kho ?? 0}</span>
                                </div>
                                <div class="cart-size-row">
                                    <label for="cart-size-${escapeHtml(item.lineId)}">Size</label>
                                    <select id="cart-size-${escapeHtml(item.lineId)}" data-cart-size-select data-line-id="${escapeHtml(item.lineId)}">
                                        ${sizeOptions}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-col-price cart-mobile-field" data-label="Don gia">
                        <p class="cart-price">${formatCurrency(item.unitPrice)}</p>
                    </div>
                    <div class="cart-col-quantity cart-mobile-field" data-label="So luong">
                        <div class="quantity-editor">
                            <button class="qty-btn" type="button" data-cart-action="decrease" data-line-id="${escapeHtml(item.lineId)}"><i class="fa-solid fa-minus"></i></button>
                            <input
                                type="number"
                                min="1"
                                max="${getCartLineMaxQuantity(item.product)}"
                                value="${item.quantity}"
                                data-cart-quantity-input
                                data-line-id="${escapeHtml(item.lineId)}"
                            >
                            <button class="qty-btn" type="button" data-cart-action="increase" data-line-id="${escapeHtml(item.lineId)}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="cart-col-subtotal cart-mobile-field" data-label="So tien">
                        <p class="cart-subtotal">${formatCurrency(item.subtotal)}</p>
                    </div>
                    <div class="cart-col-action cart-mobile-field" data-label="Thao tac">
                        <div class="cart-actions">
                            <button class="cart-text-btn" type="button" data-cart-action="remove" data-line-id="${escapeHtml(item.lineId)}">Xóa</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        const allSelected = cartItems.every(item => item.selected);
        const hasSelected = cartItems.some(item => item.selected);
        cartSelectAllCheckbox.checked = allSelected;
        cartSelectAllCheckbox.indeterminate = !allSelected && hasSelected;
        cartSelectionSummary.textContent = `${selectedQuantity} san pham duoc chon`;
        cartSummaryCount.textContent = String(selectedQuantity);
        cartSummarySubtotal.textContent = formatCurrency(subtotal);
        cartSummaryShipping.textContent = formatCurrency(shipping);
        cartDiscountLine.classList.toggle('hidden', discount <= 0);
        cartSummaryDiscount.textContent = `-${formatCurrency(discount)}`;
        cartSummaryTotal.textContent = formatCurrency(total);
        checkoutBtn.disabled = !hasSelected;
        removeSelectedBtn.disabled = !hasSelected;
        renderVoucherList(subtotal, appliedVoucher);
        if (currentView === 'cart') {
            void loadCartRecommendations();
        } else {
            renderCartRecommendations();
        }
        repairRenderedContent();
    }

    function renderCheckoutAddressOptions(addresses, selectedAddressId = '') {
        if (!checkoutAddressList) {
            return;
        }

        if (!addresses.length) {
            checkoutAddressList.innerHTML = `
                <div class="checkout-address-empty">
                    <p>Chưa có địa chỉ giao hàng. Hãy mở Sổ địa chỉ để thêm nơi nhận hàng trước khi đặt đơn.</p>
                </div>
            `;
            return;
        }

        checkoutAddressList.innerHTML = addresses.map(address => {
            const isSelected = String(address.id) === String(selectedAddressId);
            return `
                <label class="checkout-address-option ${isSelected ? 'active' : ''}">
                    <input type="radio" name="checkout-address" value="${escapeHtml(address.id)}" ${isSelected ? 'checked' : ''}>
                    <div class="checkout-address-option-body">
                        <div class="checkout-address-option-head">
                            <strong>${escapeHtml(address.recipient)}</strong>
                            <span>${escapeHtml(address.phone)}</span>
                        </div>
                        <p>${escapeHtml(buildAddressText(address))}</p>
                        <div class="checkout-address-option-badges">
                            ${address.isDefault ? '<span class="default-badge">Mặc định</span>' : ''}
                            ${isSelected ? '<span class="default-badge secondary-badge">Đang dùng</span>' : ''}
                        </div>
                    </div>
                </label>
            `;
        }).join('');
    }

    function renderCheckoutView() {
        syncCheckoutStaticText();
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        const addresses = getAddressBook();
        const selectedAddress = ensureCheckoutAddressSelection();
        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = 0;
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal + shipping - discount);

        renderCheckoutAddressOptions(addresses, selectedAddress?.id || '');

        if (!selectedItems.length) {
            checkoutItems.innerHTML = '<p class="loading-text">Không có sản phẩm nào để thanh toán.</p>';
            checkoutSummaryCount.textContent = '0';
            checkoutSummarySubtotal.textContent = formatCurrency(0);
            checkoutSummaryShipping.textContent = formatCurrency(0);
            checkoutDiscountLine.classList.add('hidden');
            checkoutSummaryDiscount.textContent = `-${formatCurrency(0)}`;
            checkoutSummaryTotal.textContent = formatCurrency(0);
            placeOrderBtn.disabled = true;
            renderVoucherList(0, null, {
                listElement: checkoutVoucherList,
                noteElement: checkoutVoucherAppliedNote,
                clearButton: checkoutClearVoucherBtn
            });
            return;
        }

        checkoutItems.innerHTML = selectedItems.map(item => `
            <article class="checkout-item-card">
                <div class="checkout-item-image">
                    <img src="${escapeHtml(getProductImageUrl(item.product))}" alt="${escapeHtml(item.product.ten_san_pham || 'Sản phẩm')}" loading="lazy">
                </div>
                <div class="checkout-item-body">
                    <div class="checkout-item-head">
                        <div>
                            <p class="product-category">${escapeHtml(item.product.danh_muc || '')}</p>
                            <h3 class="checkout-item-title" title="${escapeHtml(item.product.ten_san_pham || '')}">${escapeHtml(item.product.ten_san_pham || '')}</h3>
                            <p class="product-subcategory">${escapeHtml(getProductGroupLabel(item.product))}</p>
                        </div>
                        <p class="checkout-item-subtotal">${formatCurrency(item.subtotal)}</p>
                    </div>
                    <div class="checkout-item-meta">
                        <span>Thương hiệu: ${escapeHtml(item.product.thuong_hieu || 'Không rõ')}</span>
                        <span>Size: ${escapeHtml(item.size || 'Tiêu chuẩn')}</span>
                        <span>Số lượng: ${item.quantity}</span>
                        <span>Đơn giá: ${formatCurrency(item.unitPrice)}</span>
                    </div>
                </div>
            </article>
        `).join('');

        checkoutSummaryCount.textContent = String(selectedItems.reduce((sum, item) => sum + item.quantity, 0));
        checkoutSummarySubtotal.textContent = formatCurrency(subtotal);
        checkoutSummaryShipping.textContent = formatCurrency(shipping);
        checkoutDiscountLine.classList.toggle('hidden', discount <= 0);
        checkoutSummaryDiscount.textContent = `-${formatCurrency(discount)}`;
        checkoutSummaryTotal.textContent = formatCurrency(total);
        placeOrderBtn.disabled = !selectedAddress;
        renderVoucherList(subtotal, appliedVoucher, {
            listElement: checkoutVoucherList,
            noteElement: checkoutVoucherAppliedNote,
            clearButton: checkoutClearVoucherBtn
        });
        repairRenderedContent();
    }

    function syncMainView() {
        const isCartView = currentView === 'cart';
        const isWishlistView = currentView === 'wishlist';
        const isCheckoutView = currentView === 'checkout';

        cartView.classList.toggle('hidden', !isCartView);
        wishlistView.classList.toggle('hidden', !isWishlistView);
        checkoutView.classList.toggle('hidden', !isCheckoutView);

        if (isCartView || isWishlistView || isCheckoutView) {
            catalogToolbar.classList.add('hidden');
            collectionView.classList.add('hidden');
            activeFilters.classList.add('hidden');
            productContainer.classList.add('hidden');
            closeMegaMenu();
            return;
        }

        productContainer.classList.remove('hidden');
    }

    function openCartView() {
        if (!ensureCartAccess('Hãy đăng nhập để xem giỏ hàng của bạn.')) {
            return;
        }

        currentView = 'cart';
        setTrackedPageContext('CART', 'cart');
        renderCartView();
        void loadCartRecommendations(true);
        syncMainView();
    }

    function openCheckoutView() {
        currentView = 'checkout';
        ensureCheckoutAddressSelection();
        setTrackedPageContext('CHECKOUT', 'checkout');
        renderCheckoutView();
        syncMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openWishlistView() {
        if (!ensureWishlistAccess('Hãy đăng nhập để xem sản phẩm yêu thích của bạn.')) {
            return;
        }

        currentView = 'wishlist';
        setTrackedPageContext('WISHLIST', 'wishlist');
        renderWishlistView();
        syncMainView();
    }

    function showCatalogView() {
        currentView = 'catalog';
        renderCatalog();
    }

    function restoreCachedHomeLanding() {
        if (!shouldShowHomeRecommendations()) {
            return false;
        }

        const cachedHomeSaleVisibleCount = getHomeShowcaseVisibleCount();
        const hasCachedSale = Boolean(
            homeSaleShowcase
            && isHomeShowcaseEnabled()
            && homeShowcaseRenderSignature
            && homeShowcaseRenderSignature.endsWith(`visible:${cachedHomeSaleVisibleCount}`)
            && getHomeShowcaseRail()
        );
        const hasCachedPersonalized = Boolean(
            personalizedHomeView
            && personalizedHomeRenderSignature
            && personalizedHomeGrid?.children.length
        );

        if (!hasCachedSale && !hasCachedPersonalized) {
            return false;
        }

        scheduleProductContainerClear();
        collectionView.classList.add('hidden');
        activeFilters.classList.add('hidden');
        catalogToolbar.classList.add('hidden');
        renderHomeFeatureStrip();

        if (homeSaleShowcase) {
            homeSaleShowcase.classList.toggle('hidden', !hasCachedSale);
        }
        if (hasCachedSale) {
            syncHomeShowcaseWishlistButtons();
            syncHomeShowcasePosition({ animate: false });
            startHomeShowcaseRotation();
        }

        if (personalizedHomeView) {
            personalizedHomeView.classList.toggle('hidden', !hasCachedPersonalized);
        }
        if (hasCachedPersonalized) {
            syncFavoriteButtons();
        }

        const catalogContext = buildCatalogTrackingContext();
        setTrackedPageContext(catalogContext.pageType, catalogContext.pageKey, catalogContext.extra);
        syncMainView();
        syncNavState();
        syncCommerceAccessUI();
        return true;
    }

    function goToHomePage() {
        userDropdown.classList.add('hidden');
        closeMegaMenu();
        productRenderToken += 1;
        currentView = 'home';
        productContainer.classList.add('hidden');
        catalogToolbar.classList.add('hidden');
        collectionView.classList.add('hidden');
        activeFilters.classList.add('hidden');
        resetCatalogState({ clearQuery: true, skipRender: true });
        window.scrollTo({ top: 0, behavior: 'auto' });
        window.requestAnimationFrame(() => {
            if (restoreCachedHomeLanding()) {
                window.setTimeout(() => {
                    if (currentView === 'home') {
                        renderHomeSaleShowcase();
                        void loadHomeRecommendations();
                    }
                }, 300);
                return;
            }
            renderCatalog();
        });
    }

    function removeFromWishlist(productId, options = {}) {
        const nextWishlistIds = getWishlistIds().filter(id => id !== String(productId));
        saveWishlistIds(nextWishlistIds);

        if (options.skipRender) {
            return;
        }

        if (currentView === 'wishlist') {
            renderWishlistView();
            syncMainView();
            return;
        }

        renderCatalog();
    }

    function toggleWishlistProduct(productId) {
        if (!ensureWishlistAccess('Hãy đăng nhập trước khi thêm sản phẩm vào yêu thích.')) {
            return;
        }

        const productIdString = String(productId);
        const wishlistIds = getWishlistIds();

        if (wishlistIds.includes(productIdString)) {
            removeFromWishlist(productIdString);
            return;
        }

        wishlistIds.unshift(productIdString);
        saveWishlistIds(wishlistIds);

        if (currentView === 'wishlist') {
            renderWishlistView();
            syncMainView();
            return;
        }

        renderCatalog();
    }

    function removeCartLine(lineId) {
        const removedItem = getHydratedCartItems().find(item => item.lineId === lineId);
        const nextItems = getCartItems().filter(item => item.lineId !== lineId);
        saveCartItems(nextItems);
        if (removedItem) {
            trackBehaviorEvent({
                eventType: 'REMOVE_FROM_CART',
                pageType: 'CART',
                pageKey: 'cart',
                productId: removedItem.productId,
                categoryKey: removedItem.product?.danh_muc || '',
                brandKey: removedItem.product?.thuong_hieu || '',
                priceValue: getProductCurrentPrice(removedItem.product),
                metadata: {
                    lineId: removedItem.lineId,
                    quantity: removedItem.quantity,
                    size: removedItem.size || ''
                }
            });
        }
        renderCartView();
        syncMainView();
    }

    function updateCartLineQuantity(lineId, delta) {
        const cartItems = getCartItems();
        const targetItem = cartItems.find(item => item.lineId === lineId);
        if (!targetItem) {
            return;
        }

        setCartLineQuantity(lineId, Number(targetItem.quantity || 1) + delta);
    }

    function setCartLineQuantity(lineId, value) {
        const cartItems = getCartItems();
        const targetItem = cartItems.find(item => item.lineId === lineId);
        if (!targetItem) {
            return;
        }

        const product = findProductById(targetItem.productId);
        const maxQuantity = getCartLineMaxQuantity(product);
        const normalizedValue = Math.round(Number(value || 1));

        if (normalizedValue <= 0) {
            removeCartLine(lineId);
            return;
        }

        targetItem.quantity = Math.min(Math.max(1, normalizedValue), maxQuantity);
        saveCartItems(cartItems);
        renderCartView();
    }

    function updateCartLineSize(lineId, size) {
        const cartItems = getCartItems();
        const targetIndex = cartItems.findIndex(item => item.lineId === lineId);
        if (targetIndex === -1) {
            return;
        }

        const targetItem = cartItems[targetIndex];
        const nextSize = String(size || '').trim() || targetItem.size;
        const nextLineId = buildCartLineId(targetItem.productId, nextSize);

        if (nextLineId === lineId) {
            return;
        }

        const duplicateIndex = cartItems.findIndex(item => item.lineId === nextLineId);
        if (duplicateIndex !== -1) {
            cartItems[duplicateIndex].quantity += targetItem.quantity;
            cartItems[duplicateIndex].selected = cartItems[duplicateIndex].selected || targetItem.selected;
            cartItems.splice(targetIndex, 1);
        } else {
            targetItem.size = nextSize;
            targetItem.lineId = nextLineId;
        }

        saveCartItems(cartItems);
        renderCartView();
    }

    function toggleCartLineSelection(lineId, checked) {
        const cartItems = getCartItems();
        const targetItem = cartItems.find(item => {
            if (item.lineId === lineId) {
                return true;
            }

            const product = findProductById(item.productId);
            const sizeOptions = getProductSizeOptions(product);
            const typeOptions = getProductTypeOptions(product);
            const resolvedSize = sizeOptions.includes(item.size) ? item.size : (sizeOptions[0] || 'Tieu chuan');
            const resolvedVariantType = typeOptions.length
                ? (typeOptions.includes(item.variantType) ? item.variantType : (item.variantType || typeOptions[0]))
                : '';
            return buildCartLineId(item.productId, resolvedSize, resolvedVariantType) === lineId;
        });
        if (!targetItem) {
            return;
        }

        targetItem.selected = Boolean(checked);
        saveCartItems(cartItems);
        renderCartView();
        if (currentView === 'checkout') {
            renderCheckoutView();
        }
    }

    function removeSelectedCartItems() {
        const cartItems = getCartItems();
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Hay chon it nhat mot san pham de xoa.');
            return;
        }

        if (!confirm(`Ban muon xoa ${selectedItems.length} dong san pham da chon khoi gio hang?`)) {
            return;
        }

        saveCartItems(cartItems.filter(item => !item.selected));
        selectedItems.forEach(item => {
            trackBehaviorEvent({
                eventType: 'REMOVE_FROM_CART',
                pageType: 'CART',
                pageKey: 'cart',
                productId: item.productId,
                categoryKey: item.product?.danh_muc || '',
                brandKey: item.product?.thuong_hieu || '',
                priceValue: getProductCurrentPrice(item.product),
                metadata: {
                    lineId: item.lineId,
                    quantity: item.quantity,
                    size: item.size || ''
                }
            });
        });
        renderCartView();
        syncMainView();
    }

    function handleCheckout() {
        const cartItems = getHydratedCartItems();
        const selectedItems = cartItems.filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Hãy chọn ít nhất một sản phẩm để thanh toán.');
            return;
        }

        if (!currentUser) {
            loginError.textContent = 'Hãy đăng nhập trước khi thanh toán.';
            loginError.classList.remove('hidden');
            openOverlay(loginOverlay);
            return;
        }

        openCheckoutView();
    }

    function placeOrder() {
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Không có sản phẩm nào để thanh toán.');
            return;
        }

        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal - discount);

        if (!confirm(`Xác nhận thanh toán ${selectedItems.length} dòng sản phẩm với tổng giá trị ${formatCurrency(total)}?`)) {
            return;
        }

        const remainingItems = getCartItems().filter(item => !normalizeCartSelectionFlag(item.selected));
        saveCartItems(remainingItems);
        saveAppliedVoucherCode('');
        renderCartView();
        renderCheckoutView();
        openCartView();
        syncMainView();
        alert('Thanh toán thành công. Đơn hàng của bạn đã được ghi nhận ở frontend demo.');
    }

    function buildOrderCode() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const suffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        return `DH-${y}${m}${d}-${suffix}`;
    }

    async function openAddressForm(addressId = '') {
        const addresses = getAddressBook();
        const editingAddress = addresses.find(address => address.id === addressId);

        addressForm.reset();
        addressFormError.classList.add('hidden');
        document.getElementById('address-id').value = editingAddress?.id || '';
        document.getElementById('address-recipient').value = editingAddress?.recipient || currentUser?.ho_ten || '';
        document.getElementById('address-phone').value = editingAddress?.phone || currentUser?.sdt || '';
        document.getElementById('address-line').value = editingAddress?.line || '';
        document.getElementById('address-note').value = editingAddress?.note || '';
        document.getElementById('address-default').checked = editingAddress?.isDefault || (!editingAddress && !addresses.length);
        addressFormTitle.textContent = editingAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới';
        await syncAddressAdministrativeSelects(editingAddress || null);
        const selectedStreet = addressStreetSelect?.value || editingAddress?.street || '';
        if (addressHouseNumberInput) {
            addressHouseNumberInput.value = editingAddress?.houseNumber
                || inferHouseNumberFromAddressLine(editingAddress?.line || '', selectedStreet)
                || '';
        }
        addressForm.classList.remove('hidden');
    }

    function closeAddressForm() {
        addressForm.reset();
        addressFormError.classList.add('hidden');
        addressForm.classList.add('hidden');
        document.getElementById('address-id').value = '';
    }

    function saveAddressFromForm() {
        if (!ensureCustomerAccess('Hãy đăng nhập để quản lý sổ địa chỉ.')) {
            return;
        }

        addressFormError.classList.add('hidden');

        const addressId = document.getElementById('address-id').value.trim();
        const selectedProvinceOption = addressCitySelect?.selectedOptions?.[0];
        const selectedWardOption = addressWardSelect?.selectedOptions?.[0];
        const districtValue = String(addressDistrictSelect?.value || '').trim();
        const houseNumber = String(addressHouseNumberInput?.value || '').trim();
        const street = String(addressStreetSelect?.value || '').trim();
        if (addressStreetSelect?.disabled) {
            addressFormError.textContent = 'Phường/xã đang chọn chưa có dữ liệu tên đường hợp lệ. Hãy chọn phường/xã khác hoặc bổ sung dữ liệu đường phố.';
            addressFormError.classList.remove('hidden');
            return;
        }

        const addressLine = buildAddressLine(houseNumber, street);
        const nextAddress = {
            id: addressId || generateRecordId('address'),
            recipient: document.getElementById('address-recipient').value.trim(),
            phone: document.getElementById('address-phone').value.trim(),
            line: addressLine,
            houseNumber,
            street,
            ward: String(selectedWardOption?.textContent || '').trim(),
            wardCode: String(addressWardSelect?.value || '').trim(),
            district: districtValue,
            city: String(selectedProvinceOption?.textContent || '').trim(),
            provinceCode: String(addressCitySelect?.value || '').trim(),
            note: document.getElementById('address-note').value.trim(),
            isDefault: document.getElementById('address-default').checked
        };
        document.getElementById('address-line').value = nextAddress.line;

        if (!nextAddress.recipient || !nextAddress.phone || !nextAddress.houseNumber || !nextAddress.street || !nextAddress.ward || !nextAddress.district || !nextAddress.city) {
            addressFormError.textContent = 'Hãy nhập đầy đủ thông tin địa chỉ giao hàng.';
            addressFormError.classList.remove('hidden');
            return;
        }

        const addresses = getAddressBook();
        const nextAddresses = addresses.filter(address => address.id !== nextAddress.id);

        if (nextAddress.isDefault) {
            nextAddresses.forEach(address => {
                address.isDefault = false;
            });
        }

        nextAddresses.unshift(nextAddress);
        saveAddressBook(nextAddresses);
        renderAddressBookView();
        closeAddressForm();
    }

    function removeAddress(addressId) {
        const addresses = getAddressBook();
        const targetAddress = addresses.find(address => address.id === addressId);
        if (!targetAddress) {
            return;
        }

        if (!confirm(`Xóa địa chỉ của "${targetAddress.recipient}"?`)) {
            return;
        }

        const nextAddresses = addresses.filter(address => address.id !== addressId);
        if (targetAddress.isDefault && nextAddresses.length) {
            nextAddresses[0].isDefault = true;
        }

        saveAddressBook(nextAddresses);
        renderAddressBookView();
        if (document.getElementById('address-id').value === addressId) {
            closeAddressForm();
        }
    }

    function setDefaultAddress(addressId) {
        const addresses = getAddressBook().map(address => ({
            ...address,
            isDefault: address.id === addressId
        }));
        saveAddressBook(addresses);
        renderAddressBookView();
    }

    function renderAddressBookView() {
        const addresses = getAddressBook();
        const hasAddresses = addresses.length > 0;

        addressEmptyState.classList.toggle('hidden', hasAddresses);
        addressList.classList.toggle('hidden', !hasAddresses);

        if (!hasAddresses) {
            addressList.innerHTML = '';
            openAddressForm();
            repairRenderedContent();
            return;
        }

        if (addressForm.classList.contains('hidden')) {
            closeAddressForm();
        }

        addressList.innerHTML = addresses.map(address => `
            <article class="customer-card address-card ${address.isDefault ? 'default' : ''}">
                <div class="customer-card-head">
                    <div>
                        <h3>${escapeHtml(address.recipient)}</h3>
                        <p class="customer-card-meta">${escapeHtml(address.phone)}</p>
                    </div>
                    <div class="address-card-badges">
                        ${address.isDefault ? '<span class="default-badge">Mặc định</span>' : ''}
                    </div>
                </div>
                <p class="address-line-text">${escapeHtml(buildAddressText(address))}</p>
                ${address.note ? `<p class="customer-card-note">${escapeHtml(address.note)}</p>` : ''}
                <div class="customer-card-actions">
                    <button class="secondary-btn text-bold" type="button" data-address-action="edit" data-address-id="${escapeHtml(address.id)}">Chỉnh sửa</button>
                    <button class="secondary-btn text-bold" type="button" data-address-action="default" data-address-id="${escapeHtml(address.id)}" ${address.isDefault ? 'disabled' : ''}>Đặt mặc định</button>
                    <button class="cart-text-btn danger" type="button" data-address-action="delete" data-address-id="${escapeHtml(address.id)}">Xóa</button>
                </div>
            </article>
        `).join('');

        repairRenderedContent();
    }

    function renderOrdersView() {
        const orders = getOrderHistory()
            .slice()
            .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
        const hasOrders = orders.length > 0;

        ordersEmptyState.classList.toggle('hidden', hasOrders);
        ordersList.classList.toggle('hidden', !hasOrders);

        if (!hasOrders) {
            ordersList.innerHTML = '';
            repairRenderedContent();
            return;
        }

        ordersList.innerHTML = orders.map(order => `
            <article class="customer-card order-card">
                <div class="customer-card-head order-card-head">
                    <div>
                        <p class="catalog-eyebrow small-eyebrow">${escapeHtml(order.code || 'Đơn hàng')}</p>
                        <h3>${escapeHtml(order.status || 'Đã ghi nhận')}</h3>
                        <p class="customer-card-meta">${escapeHtml(formatDateTimeDisplay(order.createdAt))}</p>
                    </div>
                    <div class="order-total-block">
                        <span class="order-status-badge">${escapeHtml(order.paymentStatus || 'Đã thanh toán')}</span>
                        <strong>${formatCurrency(Number(order.total || 0))}</strong>
                    </div>
                </div>
                <div class="order-summary-grid">
                    <div><span>Sản phẩm:</span><strong>${Number(order.totalItems || 0)}</strong></div>
                    <div><span>Tạm tính:</span><strong>${formatCurrency(Number(order.subtotal || 0))}</strong></div>
                    <div><span>Ưu đãi:</span><strong>${order.discount > 0 ? `-${formatCurrency(Number(order.discount || 0))}` : '0đ'}</strong></div>
                    <div><span>Mã giảm giá:</span><strong>${escapeHtml(order.voucherCode || 'Không áp dụng')}</strong></div>
                </div>
                <div class="order-address-box">
                    <h4>Địa chỉ giao hàng</h4>
                    <p>${escapeHtml(buildAddressText(order.address))}</p>
                    <p class="customer-card-meta">${escapeHtml(order.address?.recipient || 'Chưa cập nhật')} · ${escapeHtml(order.address?.phone || '')}</p>
                </div>
                <div class="order-item-list">
                    ${(order.items || []).map(item => `
                        <div class="order-item-row">
                            <img src="${escapeHtml(item.image || getProductImageUrl(item.product || {}))}" alt="${escapeHtml(item.name || 'Sản phẩm')}" loading="lazy">
                            <div class="order-item-body">
                                <h4 title="${escapeHtml(item.name || '')}">${escapeHtml(item.name || '')}</h4>
                                <p>${escapeHtml(item.sku || '')} · Size ${escapeHtml(item.size || 'Tiêu chuẩn')} · SL ${Number(item.quantity || 0)}</p>
                            </div>
                            <strong>${formatCurrency(Number(item.subtotal || 0))}</strong>
                        </div>
                    `).join('')}
                </div>
            </article>
        `).join('');

        repairRenderedContent();
    }

    function renderOrdersView() {
        const orders = getOrderHistory()
            .slice()
            .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
        const hasOrders = orders.length > 0;

        ordersTableHeader.classList.toggle('hidden', !hasOrders);
        ordersEmptyState.classList.toggle('hidden', hasOrders);
        ordersList.classList.toggle('hidden', !hasOrders);

        if (!hasOrders) {
            ordersList.innerHTML = '';
            repairRenderedContent();
            return;
        }

        ordersList.innerHTML = orders.map(order => {
            const orderCode = order.code || `DH-${String(order.id || '').slice(-6).toUpperCase()}`;
            const orderAddress = buildAddressText(order.address);
            const orderRecipient = [order.address?.recipient || '', order.address?.phone || '']
                .filter(Boolean)
                .join(' · ');

            return `
                <article class="customer-card order-card">
                    <div class="order-table-summary">
                        <div class="order-table-cell order-cell-id">
                            <strong title="${escapeHtml(orderCode)}">${escapeHtml(orderCode)}</strong>
                            <span>${escapeHtml(order.status || 'Đã xác nhận')}</span>
                        </div>
                        <div class="order-table-cell order-cell-date">
                            <span>${escapeHtml(formatDateTimeDisplay(order.createdAt))}</span>
                        </div>
                        <div class="order-table-cell order-cell-address">
                            <span title="${escapeHtml(orderAddress || '')}">${escapeHtml(orderAddress || 'Chưa cập nhật địa chỉ')}</span>
                        </div>
                        <div class="order-table-cell order-cell-total">
                            <strong>${formatCurrency(Number(order.total || 0))}</strong>
                            <span>${Number(order.totalItems || 0)} sản phẩm</span>
                        </div>
                        <div class="order-table-cell order-cell-payment">
                            <span class="order-status-badge">${escapeHtml(order.paymentStatus || 'Đã thanh toán')}</span>
                        </div>
                    </div>
                    <div class="order-summary-grid">
                        <div><span>Sản phẩm:</span><strong>${Number(order.totalItems || 0)}</strong></div>
                        <div><span>Tạm tính:</span><strong>${formatCurrency(Number(order.subtotal || 0))}</strong></div>
                        <div><span>Ưu đãi:</span><strong>${order.discount > 0 ? `-${formatCurrency(Number(order.discount || 0))}` : '0đ'}</strong></div>
                        <div><span>Mã giảm giá:</span><strong>${escapeHtml(order.voucherCode || 'Không áp dụng')}</strong></div>
                    </div>
                    <div class="order-address-box">
                        <h4>Địa chỉ giao hàng</h4>
                        <p>${escapeHtml(orderAddress || 'Chưa cập nhật địa chỉ giao hàng')}</p>
                        <p class="customer-card-meta">${escapeHtml(orderRecipient || 'Chưa cập nhật người nhận')}</p>
                    </div>
                    <div class="order-item-list">
                        ${(order.items || []).map(item => `
                            <div class="order-item-row">
                                <img src="${escapeHtml(item.image || getProductImageUrl(item.product || {}))}" alt="${escapeHtml(item.name || 'Sản phẩm')}" loading="lazy">
                                <div class="order-item-body">
                                    <h4 title="${escapeHtml(item.name || '')}">${escapeHtml(item.name || '')}</h4>
                                    <p>${escapeHtml(item.sku || '')} · Size ${escapeHtml(item.size || 'Tiêu chuẩn')} · SL ${Number(item.quantity || 0)}</p>
                                </div>
                                <strong>${formatCurrency(Number(item.subtotal || 0))}</strong>
                            </div>
                        `).join('')}
                    </div>
                </article>
            `;
        }).join('');

        repairRenderedContent();
    }

    function shouldShowBanner() {
        return currentView === 'home';
    }

    function openAddressBookView() {
        if (!ensureCustomerAccess('Hãy đăng nhập để xem sổ địa chỉ của bạn.')) {
            return;
        }

        userDropdown.classList.add('hidden');
        currentView = 'address-book';
        setTrackedPageContext('ADDRESS_BOOK', 'address-book');
        renderAddressBookView();
        syncMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function promptCustomerAddressIfMissing() {
        if (!currentUser || canAccessWorkspace() || getAddressBook().length) {
            return false;
        }

        openAddressBookView();
        await openAddressForm();
        addressFormTitle.textContent = 'Thêm địa chỉ giao hàng đầu tiên';
        return true;
    }

    function openOrdersView() {
        if (!ensureCustomerAccess('Hãy đăng nhập để xem đơn hàng của bạn.')) {
            return;
        }

        userDropdown.classList.add('hidden');
        currentView = 'orders';
        setTrackedPageContext('ORDERS', 'orders');
        renderOrdersView();
        syncMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateAuthUI() {
        const authenticated = Boolean(currentUser);
        const customerFeaturesVisible = authenticated && !canManageProducts();

        addressBookLinkWrap.classList.toggle('hidden', !customerFeaturesVisible);
        ordersLinkWrap.classList.toggle('hidden', !customerFeaturesVisible);

        if (!authenticated) {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
            userDropdown.classList.add('hidden');
            dropName.textContent = 'Khách';
            dropRole.textContent = 'Vai trò';
            return;
        }

        dropName.textContent = currentUser.ho_ten || 'Người dùng';
        dropRole.textContent = getCanonicalRole(currentUser.role || 'Thành viên');

        if (canManageProducts()) {
            adminPanel.classList.remove('hidden');
            adminLink.classList.remove('hidden');
        } else {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
        }

        document.getElementById('users-tab-btn').classList.toggle('hidden', !isAdmin());
        repairRenderedContent();
    }

    function syncMainView() {
        const isCartView = currentView === 'cart';
        const isWishlistView = currentView === 'wishlist';
        const isCheckoutView = currentView === 'checkout';
        const isAddressBookView = currentView === 'address-book';
        const isOrdersView = currentView === 'orders';
        const isBannerVisible = shouldShowBanner();

        cartView.classList.toggle('hidden', !isCartView);
        wishlistView.classList.toggle('hidden', !isWishlistView);
        checkoutView.classList.toggle('hidden', !isCheckoutView);
        addressBookView.classList.toggle('hidden', !isAddressBookView);
        ordersView.classList.toggle('hidden', !isOrdersView);
        banner.classList.toggle('hidden', !isBannerVisible);

        if (isCartView || isWishlistView || isCheckoutView || isAddressBookView || isOrdersView) {
            catalogToolbar.classList.add('hidden');
            collectionView.classList.add('hidden');
            activeFilters.classList.add('hidden');
            productContainer.classList.add('hidden');
            closeMegaMenu();
            return;
        }

        productContainer.classList.remove('hidden');
    }

    function clearSession() {
        saveAppliedVoucherCode('');
        token = '';
        currentUser = null;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        userDropdown.classList.add('hidden');
        updateCartCount();
        updateWishlistCount();
        updateAuthUI();
        if (currentView === 'wishlist' || currentView === 'cart' || currentView === 'checkout' || currentView === 'address-book' || currentView === 'orders') {
            showCatalogView();
        }
    }

    function placeOrder() {
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Không có sản phẩm nào để thanh toán.');
            return;
        }

        if (!ensureCustomerAccess('Hãy đăng nhập trước khi thanh toán.')) {
            return;
        }

        const selectedAddress = ensureCheckoutAddressSelection();
        if (!selectedAddress) {
            alert('Hãy thêm ít nhất một địa chỉ giao hàng trong Sổ địa chỉ trước khi thanh toán.');
            openAddressBookView();
            return;
        }

        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const shipping = 0;
        const total = Math.max(0, subtotal + shipping - discount);

        if (!confirm(`Xác nhận thanh toán ${selectedItems.length} dòng sản phẩm với tổng giá trị ${formatCurrency(total)}?`)) {
            return;
        }

        const nextOrder = {
            id: generateRecordId('order'),
            code: buildOrderCode(),
            createdAt: new Date().toISOString(),
            status: 'Đã xác nhận',
            paymentStatus: 'Đã ghi nhận thanh toán',
            totalItems: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            shipping,
            discount,
            total,
            voucherCode: appliedVoucher?.code || '',
            voucherLabel: appliedVoucher?.label || '',
            address: { ...defaultAddress },
            items: selectedItems.map(item => ({
                productId: item.productId,
                sku: item.product?.sku || '',
                name: item.product?.ten_san_pham || '',
                image: getProductImageUrl(item.product),
                size: item.size,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal
            }))
        };

        const existingOrders = getOrderHistory();
        saveOrderHistory([nextOrder, ...existingOrders]);

        const remainingItems = getCartItems().filter(item => !normalizeCartSelectionFlag(item.selected));
        saveCartItems(remainingItems);
        saveAppliedVoucherCode('');
        renderCartView();
        renderCheckoutView();
        openOrdersView();
        alert('Đặt hàng thành công. Đơn hàng sẽ được giao COD, chỉ hiển thị thanh toán thành công sau khi nhân viên xác nhận đã thu tiền.');
        return;
        alert('Thanh toán thành công. Đơn hàng của bạn đã được lưu trong mục "Đơn hàng của bạn".');
    }

    function syncCartSummaryStaticText() {
        const cartSummaryLabels = cartView.querySelectorAll('.cart-summary-card .cart-summary-line span');
        syncCartViewStaticText();
        cartSummaryTitle.textContent = 'T\u00f3m t\u1eaft \u0111\u01a1n h\u00e0ng';
        if (cartSummaryLabels[0]) cartSummaryLabels[0].textContent = 'S\u1ea3n ph\u1ea9m \u0111\u00e3 ch\u1ecdn';
        if (cartSummaryLabels[1]) cartSummaryLabels[1].textContent = 'T\u1ea1m t\u00ednh';
        if (cartSummaryLabels[2]) cartSummaryLabels[2].textContent = 'Ph\u00ed v\u1eadn chuy\u1ec3n';
        cartDiscountLabel.textContent = '\u01afu \u0111\u00e3i';
        if (cartSummaryLabels[4]) cartSummaryLabels[4].textContent = 'T\u1ed5ng thanh to\u00e1n';
        cartVoucherEyebrow.textContent = '\u01afu \u0111\u00e3i c\u1ee7a b\u1ea1n';
        cartVoucherTitle.textContent = 'M\u00e3 khuy\u1ebfn m\u00e3i';
        clearVoucherBtn.textContent = 'B\u1ecf m\u00e3';
        checkoutBtn.textContent = 'Thanh to\u00e1n s\u1ea3n ph\u1ea9m \u0111\u00e3 ch\u1ecdn';
        removeSelectedBtn.textContent = 'X\u00f3a s\u1ea3n ph\u1ea9m \u0111\u00e3 ch\u1ecdn';
    }

    function syncCheckoutStaticText() {
        checkoutBackText.textContent = 'Quay l\u1ea1i gi\u1ecf h\u00e0ng';
        checkoutEyebrow.textContent = 'Thanh to\u00e1n';
        checkoutTitle.textContent = 'X\u00e1c nh\u1eadn \u0111\u01a1n h\u00e0ng';
        checkoutDescription.textContent = 'Ki\u1ec3m tra s\u1ea3n ph\u1ea9m, thay \u0111\u1ed5i m\u00e3 khuy\u1ebfn m\u00e3i v\u00e0 ho\u00e0n t\u1ea5t b\u01b0\u1edbc thanh to\u00e1n.';
        checkoutSummaryTitle.textContent = 'Chi ti\u1ebft thanh to\u00e1n';
        checkoutCountLabel.textContent = 'S\u1ea3n ph\u1ea9m \u0111\u00e3 ch\u1ecdn';
        checkoutSubtotalLabel.textContent = 'T\u1ea1m t\u00ednh';
        checkoutShippingLabel.textContent = 'Ph\u00ed v\u1eadn chuy\u1ec3n';
        checkoutDiscountLabel.textContent = '\u01afu \u0111\u00e3i';
        checkoutVoucherEyebrow.textContent = '\u01afu \u0111\u00e3i c\u1ee7a b\u1ea1n';
        checkoutVoucherTitle.textContent = 'M\u00e3 khuy\u1ebfn m\u00e3i';
        checkoutClearVoucherBtn.textContent = 'B\u1ecf m\u00e3';
        checkoutTotalLabel.textContent = 'T\u1ed5ng thanh to\u00e1n';
        placeOrderBtn.textContent = 'X\u00e1c nh\u1eadn thanh to\u00e1n';
    }

    function renderVoucherList(subtotal, appliedVoucher, options = {}) {
        const {
            listElement = voucherList,
            noteElement = voucherAppliedNote,
            clearButton = clearVoucherBtn
        } = options;

        listElement.innerHTML = AVAILABLE_VOUCHERS.map(voucher => {
            const minOrder = Number(voucher.minOrder || 0);
            const maxDiscount = Number(voucher.maxDiscount || 0);
            const discountAmount = getVoucherDiscountAmount(voucher, subtotal);
            const isEligible = subtotal >= minOrder && subtotal > 0;
            const isActive = appliedVoucher?.code === voucher.code;

            return `
                <article class="voucher-card ${isEligible ? '' : 'disabled'} ${isActive ? 'active' : ''}">
                    <div class="voucher-card-main">
                        <div class="voucher-code-row">
                            <strong class="voucher-code">${voucher.code}</strong>
                            ${isActive ? '<span class="voucher-active-badge">\u0110ang d\u00f9ng</span>' : ''}
                        </div>
                        <p class="voucher-label">${escapeHtml(voucher.label)} - t\u1ed1i \u0111a ${formatCurrency(maxDiscount)}</p>
                        <p class="voucher-meta">\u0110\u01a1n t\u1ed1i thi\u1ec3u ${formatCurrency(minOrder)}</p>
                        <p class="voucher-meta">\u01af\u1edbc t\u00ednh gi\u1ea3m ${formatCurrency(discountAmount)}</p>
                    </div>
                    <button
                        class="voucher-use-btn"
                        type="button"
                        data-voucher-apply="${voucher.code}"
                        ${!isEligible || isActive ? 'disabled' : ''}
                    >
                        ${isActive ? '\u0110\u00e3 \u00e1p d\u1ee5ng' : 'S\u1eed d\u1ee5ng'}
                    </button>
                </article>
            `;
        }).join('');

        if (appliedVoucher) {
            noteElement.textContent = `\u0110ang \u00e1p d\u1ee5ng m\u00e3 ${appliedVoucher.code}. \u0110\u01a1n h\u00e0ng \u0111\u01b0\u1ee3c gi\u1ea3m t\u1ed1i \u0111a ${formatCurrency(appliedVoucher.maxDiscount)}.`;
            noteElement.classList.remove('hidden');
            clearButton.classList.remove('hidden');
        } else {
            noteElement.textContent = '';
            noteElement.classList.add('hidden');
            clearButton.classList.add('hidden');
        }
    }

    function renderCartView() {
        syncCartSummaryStaticText();
        const cartItems = getHydratedCartItems();
        const selectedItems = cartItems.filter(item => item.selected);
        const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = 0;
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal + shipping - discount);

        const hasItems = cartItems.length > 0;
        cartEmptyState.classList.toggle('hidden', hasItems);
        cartContent.classList.toggle('hidden', !hasItems);

        if (!hasItems) {
            saveAppliedVoucherCode('');
            cartItemsContainer.innerHTML = '';
            voucherList.innerHTML = '';
            voucherAppliedNote.textContent = '';
            voucherAppliedNote.classList.add('hidden');
            clearVoucherBtn.classList.add('hidden');
            cartSelectAllCheckbox.checked = false;
            cartSelectAllCheckbox.indeterminate = false;
            cartSelectionSummary.textContent = '0 s\u1ea3n ph\u1ea9m \u0111\u01b0\u1ee3c ch\u1ecdn';
            cartSummaryCount.textContent = '0';
            cartSummarySubtotal.textContent = formatCurrency(0);
            cartSummaryShipping.textContent = formatCurrency(0);
            cartDiscountLine.classList.add('hidden');
            cartSummaryDiscount.textContent = `-${formatCurrency(0)}`;
            cartSummaryTotal.textContent = formatCurrency(0);
            checkoutBtn.disabled = true;
            removeSelectedBtn.disabled = true;
            cartRecommendationProducts = [];
            cartRecommendationSignature = '';
            renderCartRecommendations();
            return;
        }

        const priceLabel = '\u0110\u01a1n gi\u00e1';
        const quantityLabel = 'S\u1ed1 l\u01b0\u1ee3ng';
        const subtotalLabel = 'S\u1ed1 ti\u1ec1n';

        cartItemsContainer.innerHTML = cartItems.map(item => {
            const sizeOptions = item.sizeOptions.map(size => `
                <option value="${escapeHtml(size)}" ${size === item.size ? 'selected' : ''}>${escapeHtml(size)}</option>
            `).join('');

            return `
                <article class="cart-item cart-table">
                    <div class="cart-col-product">
                        <div class="cart-product-cell">
                            <label class="cart-row-check">
                                <input type="checkbox" data-cart-select data-line-id="${escapeHtml(item.lineId)}" ${item.selected ? 'checked' : ''}>
                            </label>
                            <div class="cart-product-image">
                                <img src="${escapeHtml(getProductImageUrl(item.product))}" alt="${escapeHtml(item.product.ten_san_pham || 'S\u1ea3n ph\u1ea9m')}" loading="lazy">
                            </div>
                            <div class="cart-product-info">
                                <p class="product-category cart-product-category">${escapeHtml(item.product.danh_muc || '')}</p>
                                <h3 class="cart-product-title" title="${escapeHtml(item.product.ten_san_pham || '')}">${escapeHtml(item.product.ten_san_pham || '')}</h3>
                                <p class="product-subcategory cart-product-group" title="${escapeHtml(getProductGroupLabel(item.product))}">${escapeHtml(getProductGroupLabel(item.product))}</p>
                                <div class="cart-product-meta">
                                    <span title="${escapeHtml(item.product.thuong_hieu || 'Kh\u00f4ng r\u00f5')}">${escapeHtml(item.product.thuong_hieu || 'Kh\u00f4ng r\u00f5')}</span>
                                    <span>T\u1ed3n kho: ${item.product.ton_kho ?? 0}</span>
                                </div>
                                <div class="cart-size-row">
                                    <label for="cart-size-${escapeHtml(item.lineId)}">Size</label>
                                    <select id="cart-size-${escapeHtml(item.lineId)}" data-cart-size-select data-line-id="${escapeHtml(item.lineId)}">
                                        ${sizeOptions}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-col-price cart-mobile-field" data-label="${escapeHtml(priceLabel)}">
                        ${renderPriceDisplay({
                            gia_goc: item.originalUnitPrice,
                            gia_hien_thi: item.unitPrice,
                            phan_tram_giam: item.discountPercent
                        }, { wrapperClass: 'price-stack cart-price-block', currentClass: 'cart-price' })}
                    </div>
                    <div class="cart-col-quantity cart-mobile-field" data-label="${escapeHtml(quantityLabel)}">
                        <div class="quantity-editor">
                            <button class="qty-btn" type="button" data-cart-action="decrease" data-line-id="${escapeHtml(item.lineId)}"><i class="fa-solid fa-minus"></i></button>
                            <input
                                type="number"
                                min="1"
                                max="${getCartLineMaxQuantity(item.product)}"
                                value="${item.quantity}"
                                data-cart-quantity-input
                                data-line-id="${escapeHtml(item.lineId)}"
                            >
                            <button class="qty-btn" type="button" data-cart-action="increase" data-line-id="${escapeHtml(item.lineId)}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="cart-col-subtotal cart-mobile-field" data-label="${escapeHtml(subtotalLabel)}">
                        ${renderPriceDisplay({
                            gia_goc: item.originalSubtotal,
                            gia_hien_thi: item.subtotal,
                            phan_tram_giam: item.discountPercent
                        }, { wrapperClass: 'price-stack cart-subtotal-block', currentClass: 'cart-subtotal' })}
                    </div>
                    <div class="cart-col-action cart-mobile-field" data-label="">
                        <div class="cart-actions">
                            <button class="cart-text-btn" type="button" data-cart-action="remove" data-line-id="${escapeHtml(item.lineId)}">X\u00f3a</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        const allSelected = cartItems.every(item => item.selected);
        const hasSelected = cartItems.some(item => item.selected);
        cartSelectAllCheckbox.checked = allSelected;
        cartSelectAllCheckbox.indeterminate = !allSelected && hasSelected;
        cartSelectionSummary.textContent = `${selectedQuantity} s\u1ea3n ph\u1ea9m \u0111\u01b0\u1ee3c ch\u1ecdn`;
        cartSummaryCount.textContent = String(selectedQuantity);
        cartSummarySubtotal.textContent = formatCurrency(subtotal);
        cartSummaryShipping.textContent = formatCurrency(shipping);
        cartDiscountLine.classList.toggle('hidden', discount <= 0);
        cartSummaryDiscount.textContent = `-${formatCurrency(discount)}`;
        cartSummaryTotal.textContent = formatCurrency(total);
        checkoutBtn.disabled = !hasSelected;
        removeSelectedBtn.disabled = !hasSelected;
        renderVoucherList(subtotal, appliedVoucher);
        if (currentView === 'cart') {
            void loadCartRecommendations();
        } else {
            renderCartRecommendations();
        }
        repairRenderedContent();
    }

    function handleCheckout() {
        const cartItems = getHydratedCartItems();
        const selectedItems = cartItems.filter(item => item.selected);
        if (!selectedItems.length) {
            alert('H\u00e3y ch\u1ecdn \u00edt nh\u1ea5t m\u1ed9t s\u1ea3n ph\u1ea9m \u0111\u1ec3 thanh to\u00e1n.');
            return;
        }

        if (!currentUser) {
            loginError.textContent = 'H\u00e3y \u0111\u0103ng nh\u1eadp tr\u01b0\u1edbc khi thanh to\u00e1n.';
            loginError.classList.remove('hidden');
            openOverlay(loginOverlay);
            return;
        }

        openCheckoutView();
    }

    function renderCheckoutView() {
        syncCheckoutStaticText();
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = 0;
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal + shipping - discount);

        if (!selectedItems.length) {
            checkoutItems.innerHTML = '<p class="loading-text">Kh\u00f4ng c\u00f3 s\u1ea3n ph\u1ea9m n\u00e0o \u0111\u1ec3 thanh to\u00e1n.</p>';
            checkoutSummaryCount.textContent = '0';
            checkoutSummarySubtotal.textContent = formatCurrency(0);
            checkoutSummaryShipping.textContent = formatCurrency(0);
            checkoutDiscountLine.classList.add('hidden');
            checkoutSummaryDiscount.textContent = `-${formatCurrency(0)}`;
            checkoutSummaryTotal.textContent = formatCurrency(0);
            placeOrderBtn.disabled = true;
            renderVoucherList(0, null, {
                listElement: checkoutVoucherList,
                noteElement: checkoutVoucherAppliedNote,
                clearButton: checkoutClearVoucherBtn
            });
            return;
        }

        checkoutItems.innerHTML = selectedItems.map(item => `
            <article class="checkout-item-card">
                <div class="checkout-item-image">
                    <img src="${escapeHtml(getProductImageUrl(item.product))}" alt="${escapeHtml(item.product.ten_san_pham || 'S\u1ea3n ph\u1ea9m')}" loading="lazy">
                </div>
                <div class="checkout-item-body">
                    <div class="checkout-item-head">
                        <div>
                            <p class="product-category">${escapeHtml(item.product.danh_muc || '')}</p>
                            <h3 class="checkout-item-title" title="${escapeHtml(item.product.ten_san_pham || '')}">${escapeHtml(item.product.ten_san_pham || '')}</h3>
                            <p class="product-subcategory">${escapeHtml(getProductGroupLabel(item.product))}</p>
                        </div>
                        ${renderPriceDisplay({
                            gia_goc: item.originalSubtotal,
                            gia_hien_thi: item.subtotal,
                            phan_tram_giam: item.discountPercent
                        }, { wrapperClass: 'price-stack checkout-item-price-stack', currentClass: 'checkout-item-subtotal' })}
                    </div>
                    <div class="checkout-item-meta">
                        <span>Th\u01b0\u01a1ng hi\u1ec7u: ${escapeHtml(item.product.thuong_hieu || 'Kh\u00f4ng r\u00f5')}</span>
                        <span>Size: ${escapeHtml(item.size || 'Ti\u00eau chu\u1ea9n')}</span>
                        <span>S\u1ed1 l\u01b0\u1ee3ng: ${item.quantity}</span>
                        <span>\u0110\u01a1n gi\u00e1: ${formatCurrency(item.unitPrice)}${item.discountPercent > 0 ? ` (g\u1ed1c ${formatCurrency(item.originalUnitPrice)})` : ''}</span>
                    </div>
                </div>
            </article>
        `).join('');

        checkoutSummaryCount.textContent = String(selectedItems.reduce((sum, item) => sum + item.quantity, 0));
        checkoutSummarySubtotal.textContent = formatCurrency(subtotal);
        checkoutSummaryShipping.textContent = formatCurrency(shipping);
        checkoutDiscountLine.classList.toggle('hidden', discount <= 0);
        checkoutSummaryDiscount.textContent = `-${formatCurrency(discount)}`;
        checkoutSummaryTotal.textContent = formatCurrency(total);
        placeOrderBtn.disabled = false;
        renderVoucherList(subtotal, appliedVoucher, {
            listElement: checkoutVoucherList,
            noteElement: checkoutVoucherAppliedNote,
            clearButton: checkoutClearVoucherBtn
        });
        repairRenderedContent();
    }

    function placeOrder() {
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Kh\u00f4ng c\u00f3 s\u1ea3n ph\u1ea9m n\u00e0o \u0111\u1ec3 thanh to\u00e1n.');
            return;
        }

        if (!ensureCustomerAccess('H\u00e3y \u0111\u0103ng nh\u1eadp tr\u01b0\u1edbc khi thanh to\u00e1n.')) {
            return;
        }

        const defaultAddress = getDefaultAddress();
        if (!defaultAddress) {
            alert('H\u00e3y th\u00eam \u00edt nh\u1ea5t m\u1ed9t \u0111\u1ecba ch\u1ec9 giao h\u00e0ng trong S\u1ed5 \u0111\u1ecba ch\u1ec9 tr\u01b0\u1edbc khi thanh to\u00e1n.');
            openAddressBookView();
            return;
        }

        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const shipping = 0;
        const total = Math.max(0, subtotal + shipping - discount);

        if (!confirm(`X\u00e1c nh\u1eadn thanh to\u00e1n ${selectedItems.length} d\u00f2ng s\u1ea3n ph\u1ea9m v\u1edbi t\u1ed5ng gi\u00e1 tr\u1ecb ${formatCurrency(total)}?`)) {
            return;
        }

        const nextOrder = {
            id: generateRecordId('order'),
            code: buildOrderCode(),
            createdAt: new Date().toISOString(),
            status: '\u0110\u00e3 x\u00e1c nh\u1eadn',
            paymentStatus: '\u0110\u00e3 ghi nh\u1eadn thanh to\u00e1n',
            totalItems: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            shipping,
            discount,
            total,
            voucherCode: appliedVoucher?.code || '',
            voucherLabel: appliedVoucher?.label || '',
            address: { ...defaultAddress },
            items: selectedItems.map(item => ({
                productId: item.productId,
                sku: item.product?.sku || '',
                name: item.product?.ten_san_pham || '',
                image: getProductImageUrl(item.product),
                size: item.size,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal
            }))
        };

        const existingOrders = getOrderHistory();
        saveOrderHistory([nextOrder, ...existingOrders]);

        const remainingItems = getCartItems().filter(item => !normalizeCartSelectionFlag(item.selected));
        saveCartItems(remainingItems);
        saveAppliedVoucherCode('');
        renderCartView();
        renderCheckoutView();
        openOrdersView();
        alert('Thanh to\u00e1n th\u00e0nh c\u00f4ng. \u0110\u01a1n h\u00e0ng c\u1ee7a b\u1ea1n \u0111\u00e3 \u0111\u01b0\u1ee3c l\u01b0u trong m\u1ee5c "\u0110\u01a1n h\u00e0ng c\u1ee7a b\u1ea1n".');
    }

    function resetCartConfiguratorState() {
        pendingWishlistMoveProductId = '';
        cartItemError.textContent = '';
        cartItemError.classList.add('hidden');
    }

    function closeOverlay(overlay) {
        if (!overlay) {
            return;
        }

        if (overlay === cartItemOverlay) {
            resetCartConfiguratorState();
        }

        overlay.classList.add('hidden');
    }

    cartConfigQuantity.addEventListener('input', () => {
        const product = findProductById(cartConfigProductId.value);
        const maxQuantity = getCartLineMaxQuantity(product);
        const nextValue = Math.min(Math.max(1, Number(cartConfigQuantity.value || 1)), maxQuantity);
        cartConfigQuantity.value = String(nextValue);
    });

    function getWorkspaceState() {
        if (!window.__pbl3WorkspaceState) {
            window.__pbl3WorkspaceState = {
                activeWorkspaceTab: '',
                activeSupportThreadId: '',
                supportThreadSearchQuery: '',
                supportReplyDrafts: {},
                supportReplySelectionStart: 0,
                supportReplySelectionEnd: 0,
                supportComposerFocusedThreadId: '',
                pendingSupportPanelRefresh: false,
                editingCategoryId: '',
                editingVoucherCode: '',
                managerVoucherCategoryFilter: 'all',
                managerVoucherStatusFilter: 'all',
                voucherAssignmentAccountKey: '',
                managerBaseUsers: [],
                managerBaseLoaded: false,
                statsPreset: 'month',
                statsStartDate: '',
                statsEndDate: '',
                accountSearchQuery: '',
                accountCreatedPreset: 'custom',
                accountCreatedStartDate: '',
                accountCreatedEndDate: '',
                staffProductSearchQuery: '',
                staffProductBrandFilter: 'all',
                staffProductCategoryFilter: 'all',
                staffProductPriceFilter: 'all',
                staffProductStockFilter: 'all',
                staffOrderSearchQuery: '',
                staffOrderStatusFilter: 'all',
                staffOrderStartDate: '',
                staffOrderEndDate: '',
                staffCategorySearchQuery: '',
                staffCategorySportFilter: 'all',
                staffCategoryLabelFilter: 'all',
                staffCategoryStatusFilter: 'all',
                staffReviewSearchQuery: '',
                staffReviewCategoryFilter: 'all',
                staffReviewTypeFilter: 'all',
                staffReviewRatingFilter: 'all',
                staffReviewStatusFilter: 'all',
                visibleAccountPasswords: {}
            };
        }
        return window.__pbl3WorkspaceState;
    }

    function getSupportReplyDraft(threadId) {
        const state = getWorkspaceState();
        const normalizedThreadId = String(threadId || '').trim();
        if (!normalizedThreadId) {
            return '';
        }

        const drafts = state.supportReplyDrafts && typeof state.supportReplyDrafts === 'object'
            ? state.supportReplyDrafts
            : {};
        state.supportReplyDrafts = drafts;
        return String(drafts[normalizedThreadId] || '');
    }

    function setSupportReplyDraft(threadId, value) {
        const state = getWorkspaceState();
        const normalizedThreadId = String(threadId || '').trim();
        if (!normalizedThreadId) {
            return;
        }

        const drafts = state.supportReplyDrafts && typeof state.supportReplyDrafts === 'object'
            ? state.supportReplyDrafts
            : {};
        drafts[normalizedThreadId] = String(value || '');
        state.supportReplyDrafts = drafts;
    }

    function clearSupportReplyDraft(threadId) {
        const state = getWorkspaceState();
        const normalizedThreadId = String(threadId || '').trim();
        if (!normalizedThreadId || !state.supportReplyDrafts || typeof state.supportReplyDrafts !== 'object') {
            return;
        }

        delete state.supportReplyDrafts[normalizedThreadId];
        if (state.supportComposerFocusedThreadId === normalizedThreadId) {
            state.supportComposerFocusedThreadId = '';
        }
        state.supportReplySelectionStart = 0;
        state.supportReplySelectionEnd = 0;
    }

    function captureSupportComposerState() {
        const input = document.getElementById('support-staff-input');
        const threadId = document.getElementById('support-thread-id')?.value
            || getWorkspaceState().activeSupportThreadId
            || '';
        if (!input || !threadId) {
            return;
        }

        const state = getWorkspaceState();
        setSupportReplyDraft(threadId, input.value || '');
        state.supportReplySelectionStart = Number.isInteger(input.selectionStart)
            ? input.selectionStart
            : String(input.value || '').length;
        state.supportReplySelectionEnd = Number.isInteger(input.selectionEnd)
            ? input.selectionEnd
            : state.supportReplySelectionStart;
        state.supportComposerFocusedThreadId = document.activeElement === input ? threadId : '';
    }

    function shouldDeferSupportPanelRefresh() {
        return document.activeElement?.id === 'support-staff-input';
    }

    function restoreSupportComposerState(threadId) {
        const normalizedThreadId = String(threadId || '').trim();
        const input = document.getElementById('support-staff-input');
        if (!normalizedThreadId || !input) {
            return;
        }

        const state = getWorkspaceState();
        const draft = getSupportReplyDraft(normalizedThreadId);
        if (input.value !== draft) {
            input.value = draft;
        }

        if (state.supportComposerFocusedThreadId !== normalizedThreadId) {
            return;
        }

        input.focus();
        const start = Math.min(Number(state.supportReplySelectionStart ?? draft.length), input.value.length);
        const end = Math.min(Number(state.supportReplySelectionEnd ?? start), input.value.length);
        input.setSelectionRange(start, end);
    }

    function flushPendingSupportPanelRefresh() {
        const state = getWorkspaceState();
        if (!state.pendingSupportPanelRefresh || shouldDeferSupportPanelRefresh()) {
            return;
        }

        state.pendingSupportPanelRefresh = false;
        renderSupportManagementPanel();
    }

    function getAccountKeyForUser(user) {
        return String(
            user?.id
            ?? user?.username
            ?? user?.ten_dang_nhap
            ?? user?.tenDangNhap
            ?? user?.email
            ?? user?.phone
            ?? user?.sdt
            ?? ''
        ).trim();
    }

    function normalizeAccountIdentity(value) {
        return normalizeText(value).replace(/[^a-z0-9@._+-]/g, '');
    }

    function normalizePhoneIdentity(value) {
        const digits = String(value || '').replace(/\D/g, '');
        if (!digits) {
            return '';
        }
        if (digits.startsWith('84') && digits.length === 11) {
            return `0${digits.slice(2)}`;
        }
        return digits;
    }

    function getAccountIdentityCandidates(user = currentUser) {
        const username = user?.username || user?.ten_dang_nhap || user?.tenDangNhap || '';
        const phone = user?.sdt || user?.phone || user?.so_dien_thoai || user?.soDienThoai || '';
        const candidates = [
            user?.id,
            username,
            user?.email,
            phone,
            user?.ho_ten,
            user?.hoTen,
            user?.name,
            user?.display_name,
            username ? `user-customer-${username}` : '',
            username ? `customer-${username}` : ''
        ];

        return new Set(
            candidates
                .map(normalizeAccountIdentity)
                .filter(Boolean)
        );
    }

    function getAccountPhoneCandidates(user = currentUser) {
        return new Set([
            user?.sdt,
            user?.phone,
            user?.so_dien_thoai,
            user?.soDienThoai
        ].map(normalizePhoneIdentity).filter(Boolean));
    }

    function orderBelongsToUser(order, user = currentUser) {
        if (!user || !order) {
            return false;
        }

        const candidates = getAccountIdentityCandidates(user);
        const phoneCandidates = getAccountPhoneCandidates(user);
        const customer = order.customer || {};
        const orderIdentities = [
            order.accountKey,
            ...(Array.isArray(order.accountKeyAliases) ? order.accountKeyAliases : []),
            customer.id,
            customer.username,
            customer.ten_dang_nhap,
            customer.tenDangNhap,
            customer.email,
            customer.phone,
            customer.sdt,
            customer.so_dien_thoai,
            customer.soDienThoai,
            customer.name,
            customer.ho_ten,
            customer.hoTen,
            order.address?.recipient,
            order.address?.phone
        ]
            .map(normalizeAccountIdentity)
            .filter(Boolean);

        if (orderIdentities.some(identity => candidates.has(identity))) {
            return true;
        }

        const orderPhoneIdentities = [
            customer.phone,
            customer.sdt,
            customer.so_dien_thoai,
            customer.soDienThoai,
            order.address?.phone
        ].map(normalizePhoneIdentity).filter(Boolean);

        if (orderPhoneIdentities.some(phone => phoneCandidates.has(phone))) {
            return true;
        }

        const usernameIdentity = normalizeAccountIdentity(user?.username || user?.ten_dang_nhap || user?.tenDangNhap || '');
        if (!usernameIdentity) {
            return false;
        }

        const technicalOrderIdentities = [
            order.accountKey,
            ...(Array.isArray(order.accountKeyAliases) ? order.accountKeyAliases : []),
            customer.id,
            customer.username,
            customer.ten_dang_nhap,
            customer.tenDangNhap,
            customer.email
        ].map(normalizeAccountIdentity).filter(Boolean);

        return technicalOrderIdentities.some(identity => identity.includes(usernameIdentity));
    }

    function isStaffWorkspaceUser(user = currentUser) {
        return getCanonicalRole(user?.role) === 'Nhân viên';
    }

    function isManagerWorkspaceUser(user = currentUser) {
        return getCanonicalRole(user?.role) === 'Quản trị viên';
    }

    function canAccessWorkspace(user = currentUser) {
        if (isStaffWorkspaceUser(user) || isManagerWorkspaceUser(user)) {
            return true;
        }

        const identity = normalizeText([
            user?.id,
            user?.username,
            user?.ten_dang_nhap,
            user?.tenDangNhap,
            user?.email
        ].filter(Boolean).join(' '));

        return identity.includes('user admin')
            || identity.includes('user staff')
            || identity === 'admin'
            || identity.startsWith('admin ')
            || identity.includes(' nhanvien')
            || identity.includes(' staff');
    }

    function getWorkspaceRoleType(user = currentUser) {
        if (isManagerWorkspaceUser(user)) {
            return 'manager';
        }
        if (isStaffWorkspaceUser(user)) {
            return 'staff';
        }
        return 'customer';
    }

    function getWorkspaceRoleLabel(user = currentUser) {
        if (isManagerWorkspaceUser(user)) {
            return 'Quản lí';
        }
        if (isStaffWorkspaceUser(user)) {
            return 'Nhân viên';
        }
        return 'Khách hàng';
    }

    function getCurrentCustomerProfile() {
        return {
            id: currentUser?.id || '',
            name: currentUser?.ho_ten || currentUser?.hoTen || currentUser?.name || '',
            username: currentUser?.username || currentUser?.ten_dang_nhap || currentUser?.tenDangNhap || '',
            email: currentUser?.email || '',
            phone: currentUser?.sdt || currentUser?.phone || currentUser?.so_dien_thoai || currentUser?.soDienThoai || ''
        };
    }

    function getWorkspaceDefaultTab(roleType = getWorkspaceRoleType()) {
        return roleType === 'manager' ? 'users-mgmt' : 'products-mgmt';
    }

    function normalizeDateInputValue(value) {
        const date = value ? new Date(value) : new Date();
        if (Number.isNaN(date.getTime())) {
            return new Date().toISOString().slice(0, 10);
        }
        return date.toISOString().slice(0, 10);
    }

    function normalizeWorkspaceOrder(order, meta = {}) {
        const customer = order?.customer || meta.customer || {};
        const accountKey = String(order?.accountKey || meta.accountKey || getAccountKeyForUser(customer) || '').trim();
        const accountKeyAliases = [
            accountKey,
            order?.accountKey,
            meta.accountKey,
            ...(Array.isArray(order?.accountKeyAliases) ? order.accountKeyAliases : [])
        ].map(value => String(value || '').trim()).filter(Boolean);
        const normalizedItems = Array.isArray(order?.items)
            ? order.items.map(item => ({
                productId: String(item?.productId || ''),
                sku: String(item?.sku || ''),
                name: String(item?.name || ''),
                image: String(item?.image || ''),
                size: String(item?.size || 'Tiêu chuẩn'),
                quantity: Number(item?.quantity || 0),
                unitPrice: Number(item?.unitPrice || 0),
                subtotal: Number(item?.subtotal || 0)
            }))
            : [];

        return {
            id: String(order?.id || generateRecordId('order')),
            code: String(order?.code || buildOrderCode()),
            createdAt: order?.createdAt || new Date().toISOString(),
            status: String(order?.status || 'Chờ xác nhận'),
            paymentStatus: String(order?.paymentStatus || PAYMENT_STATUS_PENDING_COD),
            paidAt: String(order?.paidAt || ''),
            paymentConfirmedBy: String(order?.paymentConfirmedBy || ''),
            supportRequest: String(order?.supportRequest || ''),
            supportStatus: String(order?.supportStatus || ''),
            supportNote: String(order?.supportNote || ''),
            totalItems: Number(order?.totalItems || normalizedItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0)),
            subtotal: Number(order?.subtotal || 0),
            shipping: Number(order?.shipping || 0),
            discount: Number(order?.discount || 0),
            total: Number(order?.total || 0),
            voucherCode: String(order?.voucherCode || ''),
            voucherLabel: String(order?.voucherLabel || ''),
            address: order?.address || {},
            customer: {
                id: customer?.id || '',
                name: customer?.name || customer?.ho_ten || customer?.hoTen || order?.address?.recipient || '',
                username: customer?.username || customer?.ten_dang_nhap || customer?.tenDangNhap || '',
                email: customer?.email || '',
                phone: customer?.phone || customer?.sdt || customer?.so_dien_thoai || customer?.soDienThoai || order?.address?.phone || ''
            },
            accountKey,
            accountKeyAliases: Array.from(new Set(accountKeyAliases)),
            items: normalizedItems
        };
    }

    function getWorkspaceOrdersStorageKey() {
        return 'pbl3_workspace_orders';
    }

    function readAllScopedOrders() {
        const prefix = `${ORDER_HISTORY_KEY}_`;
        const collected = [];

        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key || !key.startsWith(prefix)) {
                continue;
            }

            const accountKey = key.slice(prefix.length);
            const orders = readStorage(key, []);
            if (!Array.isArray(orders)) {
                continue;
            }

            orders.forEach(order => {
                collected.push(normalizeWorkspaceOrder(order, { accountKey }));
            });
        }

        return collected;
    }

    function saveWorkspaceOrders(orders) {
        localStorage.setItem(
            getWorkspaceOrdersStorageKey(),
            JSON.stringify(Array.isArray(orders) ? orders.map(order => normalizeWorkspaceOrder(order)) : [])
        );
    }

    function syncWorkspaceOrderToScopedHistory(order) {
        const normalizedOrder = normalizeWorkspaceOrder(order);
        if (!normalizedOrder.accountKey) {
            return;
        }

        const storageKey = `${ORDER_HISTORY_KEY}_${normalizedOrder.accountKey}`;
        const scopedOrders = readStorage(storageKey, []);
        const nextScopedOrders = Array.isArray(scopedOrders) ? [...scopedOrders] : [];
        const currentIndex = nextScopedOrders.findIndex(item => String(item?.id) === normalizedOrder.id);

        if (currentIndex >= 0) {
            nextScopedOrders[currentIndex] = {
                ...nextScopedOrders[currentIndex],
                ...normalizedOrder
            };
        } else {
            nextScopedOrders.unshift(normalizedOrder);
        }

        localStorage.setItem(storageKey, JSON.stringify(nextScopedOrders));
    }

    function getWorkspaceOrders() {
        const storedOrders = readStorage(getWorkspaceOrdersStorageKey(), []);
        const merged = new Map();

        (Array.isArray(storedOrders) ? storedOrders : []).forEach(order => {
            const normalized = normalizeWorkspaceOrder(order);
            merged.set(normalized.id, normalized);
        });

        readAllScopedOrders().forEach(order => {
            if (!merged.has(order.id)) {
                merged.set(order.id, order);
                return;
            }

            const existing = merged.get(order.id);
            merged.set(order.id, normalizeWorkspaceOrder({
                ...order,
                ...existing,
                accountKey: existing.accountKey || order.accountKey,
                accountKeyAliases: [
                    existing.accountKey,
                    order.accountKey,
                    ...(Array.isArray(existing.accountKeyAliases) ? existing.accountKeyAliases : []),
                    ...(Array.isArray(order.accountKeyAliases) ? order.accountKeyAliases : [])
                ],
                customer: {
                    ...(order.customer || {}),
                    ...(existing.customer || {}),
                    id: existing.customer?.id || order.customer?.id || '',
                    name: existing.customer?.name || order.customer?.name || '',
                    username: existing.customer?.username || order.customer?.username || '',
                    email: existing.customer?.email || order.customer?.email || '',
                    phone: existing.customer?.phone || order.customer?.phone || ''
                }
            }));
        });

        return Array.from(merged.values())
            .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
    }

    function upsertWorkspaceOrder(order) {
        const normalizedOrder = normalizeWorkspaceOrder(order);
        const orders = getWorkspaceOrders();
        const nextOrders = orders.filter(item => item.id !== normalizedOrder.id);
        nextOrders.unshift(normalizedOrder);
        saveWorkspaceOrders(nextOrders);
        syncWorkspaceOrderToScopedHistory(normalizedOrder);
    }

    function isOrderPaymentConfirmed(order = {}) {
        const paymentText = normalizeText(order.paymentStatus || '');
        return paymentText.includes('thanh toan thanh cong')
            || paymentText.includes('da ghi nhan thanh toan')
            || paymentText.includes('da thu tien');
    }

    function isRevenueOrder(order = {}) {
        return normalizeText(order.status || '') !== 'da huy' && isOrderPaymentConfirmed(order);
    }

    function buildOrderPaymentPatchForStatus(status, order = {}) {
        const normalizedStatus = normalizeText(status || '');
        if (normalizedStatus === 'da huy') {
            return {
                paymentStatus: PAYMENT_STATUS_CANCELLED,
                paidAt: '',
                paymentConfirmedBy: ''
            };
        }

        if (normalizedStatus === 'da giao' && !isOrderPaymentConfirmed(order)) {
            return {
                paymentStatus: PAYMENT_STATUS_DELIVERED_WAITING_CONFIRMATION,
                paidAt: '',
                paymentConfirmedBy: ''
            };
        }

        if (!isOrderPaymentConfirmed(order) && normalizeText(order.paymentStatus || '') === 'khong ghi nhan thanh toan') {
            return {
                paymentStatus: PAYMENT_STATUS_PENDING_COD,
                paidAt: '',
                paymentConfirmedBy: ''
            };
        }

        return {};
    }

    function buildConfirmCodPaymentPatch() {
        return {
            paymentStatus: PAYMENT_STATUS_PAID,
            paidAt: new Date().toISOString(),
            paymentConfirmedBy: currentUser?.username || currentUser?.ten_dang_nhap || currentUser?.ho_ten || 'staff'
        };
    }

    function updateWorkspaceOrder(orderId, patch = {}) {
        const orders = getWorkspaceOrders();
        const nextOrders = orders.map(order => (
            String(order.id) === String(orderId)
                ? normalizeWorkspaceOrder({
                    ...order,
                    ...patch,
                    ...(Object.prototype.hasOwnProperty.call(patch, 'status') && !Object.prototype.hasOwnProperty.call(patch, 'paymentStatus')
                        ? buildOrderPaymentPatchForStatus(patch.status, order)
                        : {})
                })
                : order
        ));
        saveWorkspaceOrders(nextOrders);
        const updatedOrder = nextOrders.find(order => String(order.id) === String(orderId));
        if (updatedOrder) {
            syncWorkspaceOrderToScopedHistory(updatedOrder);
        }
        renderInternalWorkspace();
        if (currentView === 'orders') {
            renderOrdersView();
        }
    }

    function getOrderHistory() {
        const storageKey = getCurrentOrderHistoryStorageKey();
        if (!storageKey) {
            return [];
        }

        const scopedOrders = readStorage(storageKey, []);
        const mergedOrders = new Map();

        (Array.isArray(scopedOrders) ? scopedOrders : []).forEach(order => {
            const normalized = normalizeWorkspaceOrder(order, {
                accountKey: getCurrentAccountStorageSuffix(),
                customer: getCurrentCustomerProfile()
            });
            mergedOrders.set(String(normalized.id), normalized);
        });

        getWorkspaceOrders()
            .filter(order => orderBelongsToUser(order))
            .forEach(order => {
                const orderId = String(order.id);
                const existingOrder = mergedOrders.get(orderId) || {};
                mergedOrders.set(orderId, normalizeWorkspaceOrder({
                    ...existingOrder,
                    ...order,
                    accountKey: order.accountKey || existingOrder.accountKey || getCurrentAccountStorageSuffix(),
                    customer: {
                        ...getCurrentCustomerProfile(),
                        ...(existingOrder.customer || {}),
                        ...(order.customer || {})
                    }
                }));
            });

        const nextOrders = Array.from(mergedOrders.values())
            .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));

        localStorage.setItem(storageKey, JSON.stringify(nextOrders));
        return nextOrders;
    }

    function saveOrderHistory(orders) {
        const storageKey = getCurrentOrderHistoryStorageKey();
        if (!storageKey) {
            return;
        }

        const normalizedOrders = (Array.isArray(orders) ? orders : []).map(order => normalizeWorkspaceOrder(order, {
            accountKey: getCurrentAccountStorageSuffix(),
            customer: getCurrentCustomerProfile()
        }));
        localStorage.setItem(storageKey, JSON.stringify(normalizedOrders));
        normalizedOrders.forEach(order => upsertWorkspaceOrder(order));
    }

    function getAccountRegistryStore() {
        const raw = readStorage('pbl3_account_registry', null);
        return {
            created: Array.isArray(raw?.created) ? raw.created : [],
            updated: raw?.updated && typeof raw.updated === 'object' ? raw.updated : {},
            deleted: Array.isArray(raw?.deleted) ? raw.deleted : []
        };
    }

    function saveAccountRegistryStore(store) {
        localStorage.setItem('pbl3_account_registry', JSON.stringify({
            created: Array.isArray(store?.created) ? store.created : [],
            updated: store?.updated && typeof store.updated === 'object' ? store.updated : {},
            deleted: Array.isArray(store?.deleted) ? store.deleted : []
        }));
    }

    function getAccountRecordKey(account) {
        return String(account?.id || account?.username || account?.email || '').trim();
    }

    function normalizeAccountRecord(account = {}) {
        const normalizedRole = getCanonicalRole(account.role || account.vai_tro || 'Khách hàng');
        return {
            id: String(account.id || generateRecordId('account')),
            ho_ten: String(account.ho_ten || account.name || '').trim(),
            username: String(account.username || account.ten_dang_nhap || '').trim(),
            email: String(account.email || '').trim(),
            sdt: String(account.sdt || account.so_dien_thoai || '').trim(),
            role: normalizedRole,
            status: String(account.status || account.trang_thai || 'Hoạt động').trim() || 'Hoạt động',
            localOnly: Boolean(account.localOnly)
        };
    }

    async function ensureManagerAccountsLoaded(force = false) {
        const state = getWorkspaceState();
        if (state.managerBaseLoaded && !force) {
            return state.managerBaseUsers || [];
        }

        if (!isManagerWorkspaceUser()) {
            state.managerBaseUsers = [];
            state.managerBaseLoaded = true;
            return [];
        }

        try {
            const users = await apiRequest('/admin/users');
            state.managerBaseUsers = Array.isArray(users) ? users.map(user => normalizeAccountRecord(user)) : [];
        } catch (error) {
            state.managerBaseUsers = Array.isArray(state.managerBaseUsers) ? state.managerBaseUsers : [];
        }

        state.managerBaseLoaded = true;
        return state.managerBaseUsers || [];
    }

    function getManagedAccounts() {
        const state = getWorkspaceState();
        const baseAccounts = Array.isArray(state.managerBaseUsers) ? state.managerBaseUsers : [];
        const registry = getAccountRegistryStore();
        const accountMap = new Map();

        baseAccounts.forEach(account => {
            const normalized = normalizeAccountRecord(account);
            accountMap.set(getAccountRecordKey(normalized), normalized);
        });

        Object.values(registry.updated).forEach(account => {
            const recordKey = getAccountRecordKey(account);
            const previousAccount = accountMap.get(recordKey) || {};
            const normalized = normalizeAccountRecord({
                ...previousAccount,
                ...account,
                password: account?.password || previousAccount?.password || '',
                createdAt: account?.createdAt || previousAccount?.createdAt || ''
            });
            accountMap.set(getAccountRecordKey(normalized), normalized);
        });

        registry.created.forEach(account => {
            const normalized = normalizeAccountRecord({ ...account, localOnly: true });
            accountMap.set(getAccountRecordKey(normalized), normalized);
        });

        registry.deleted.forEach(key => {
            accountMap.delete(String(key || '').trim());
        });

        return Array.from(accountMap.values()).sort((left, right) => {
            const roleCompare = getWorkspaceRoleLabel(right).localeCompare(getWorkspaceRoleLabel(left), 'vi');
            if (roleCompare !== 0) {
                return roleCompare;
            }
            return String(left.ho_ten || '').localeCompare(String(right.ho_ten || ''), 'vi');
        });
    }

    function getBaseVoucherCatalog() {
        return (Array.isArray(AVAILABLE_VOUCHERS) ? AVAILABLE_VOUCHERS : []).map((voucher, index) => normalizeVoucherRecord(voucher, index));
    }

    function normalizeVoucherCategories(categories) {
        const source = Array.isArray(categories)
            ? categories
            : String(categories || 'Tất cả').split(/[,\n/|;]+/);
        const normalized = getUniqueValues(source
            .map(category => sanitizeProductText(category).trim())
            .filter(Boolean));
        return normalized.length ? normalized : ['Tất cả'];
    }

    function normalizeVoucherRecord(voucher = {}, index = 0) {
        const code = String(voucher.code || `VC${index + 1}`).trim().toUpperCase();
        return {
            code,
            label: sanitizeProductText(voucher.label || '').trim(),
            percent: Number(voucher.percent || 0),
            minOrder: Number(voucher.minOrder || 0),
            maxDiscount: Number(voucher.maxDiscount || 0),
            categories: normalizeVoucherCategories(voucher.categories || voucher.category || voucher.danh_muc),
            expiresAt: String(voucher.expiresAt || voucher.expiredAt || voucher.expiryDate || '').trim(),
            status: String(voucher.status || 'Hoạt động').trim() || 'Hoạt động'
        };
    }

    function getManagedVoucherCatalog() {
        const stored = readStorage(MANAGED_VOUCHERS_KEY, null);
        const baseCatalog = getBaseVoucherCatalog();
        const storedVersion = localStorage.getItem(MANAGED_VOUCHERS_VERSION_KEY) || '';

        if (!Array.isArray(stored) || !stored.length) {
            return baseCatalog;
        }

        const storedCatalog = stored.map((voucher, index) => normalizeVoucherRecord(voucher, index));
        if (storedVersion === MANAGED_VOUCHERS_VERSION) {
            return storedCatalog;
        }

        const mergedCatalog = new Map(baseCatalog.map(voucher => [voucher.code, voucher]));
        storedCatalog.forEach(voucher => {
            const baseVoucher = mergedCatalog.get(voucher.code) || {};
            mergedCatalog.set(voucher.code, normalizeVoucherRecord({
                ...baseVoucher,
                ...voucher,
                categories: voucher.categories?.length ? voucher.categories : baseVoucher.categories,
                expiresAt: voucher.expiresAt || baseVoucher.expiresAt,
                status: voucher.status || baseVoucher.status
            }));
        });
        const merged = Array.from(mergedCatalog.values());
        saveManagedVoucherCatalog(merged);
        return merged;
    }

    function saveManagedVoucherCatalog(vouchers) {
        localStorage.setItem(MANAGED_VOUCHERS_KEY, JSON.stringify(
            (Array.isArray(vouchers) ? vouchers : []).map((voucher, index) => normalizeVoucherRecord(voucher, index))
        ));
        localStorage.setItem(MANAGED_VOUCHERS_VERSION_KEY, MANAGED_VOUCHERS_VERSION);
    }

    function getVoucherCategories(voucher = {}) {
        return normalizeVoucherCategories(voucher.categories || voucher.category || voucher.danh_muc);
    }

    function getVoucherExpiryTimestamp(voucher = {}) {
        const expiresAt = String(voucher.expiresAt || '').trim();
        if (!expiresAt) {
            return null;
        }

        const date = new Date(`${expiresAt}T23:59:59.999`);
        return Number.isNaN(date.getTime()) ? null : date.getTime();
    }

    function isVoucherExpired(voucher = {}) {
        const expiryTimestamp = getVoucherExpiryTimestamp(voucher);
        return expiryTimestamp !== null && expiryTimestamp < Date.now();
    }

    function isVoucherTemporarilyDisabled(voucher = {}) {
        return normalizeText(voucher.status || '') === 'tam khoa';
    }

    function isVoucherUsable(voucher = {}) {
        return !isVoucherTemporarilyDisabled(voucher) && !isVoucherExpired(voucher);
    }

    function getVoucherDisplayStatus(voucher = {}) {
        if (isVoucherExpired(voucher)) {
            return 'Hết hạn';
        }
        return sanitizeProductText(voucher.status || 'Hoạt động').trim() || 'Hoạt động';
    }

    function getVoucherAssignmentAccountKey(user = currentUser) {
        if (!user || canAccessWorkspace(user)) {
            return '';
        }
        return getAccountKeyForUser(user);
    }

    function getVoucherAssignmentAccountLabel(user = {}) {
        const fullName = sanitizeProductText(user.ho_ten || user.name || user.display_name || '').trim();
        const username = String(user.username || user.ten_dang_nhap || user.email || user.id || '').trim();
        if (fullName && username) {
            return `${fullName} (${username})`;
        }
        return fullName || username || 'Khách hàng';
    }

    function getVoucherAssignmentQuantity(value) {
        const parsed = Math.floor(Number(value));
        return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_VOUCHER_ASSIGNMENT_QUANTITY;
    }

    function normalizeVoucherAssignmentGrant(grant = {}, fallbackCode = '') {
        const isObject = grant && typeof grant === 'object' && !Array.isArray(grant);
        const code = String(isObject ? (grant.code || fallbackCode) : (fallbackCode || grant || '')).trim().toUpperCase();
        if (!code) {
            return null;
        }

        const rawQuantity = isObject
            ? (grant.quantity ?? grant.total ?? grant.limit ?? grant.count)
            : (typeof grant === 'number' ? grant : DEFAULT_VOUCHER_ASSIGNMENT_QUANTITY);
        const quantity = getVoucherAssignmentQuantity(rawQuantity);
        const rawUsed = isObject ? (grant.used ?? grant.usedCount ?? 0) : 0;
        const used = Math.min(quantity, Math.max(0, Math.floor(Number(rawUsed) || 0)));

        return {
            code,
            quantity,
            used,
            assignedAt: String(isObject ? (grant.assignedAt || '') : '').trim()
        };
    }

    function getVoucherAssignmentGrantList(entry = {}) {
        if (Array.isArray(entry)) {
            return entry.map(code => ({ code }));
        }

        if (!entry || typeof entry !== 'object') {
            return [];
        }

        if (Array.isArray(entry.grants)) {
            return entry.grants;
        }

        if (entry.grants && typeof entry.grants === 'object') {
            return Object.entries(entry.grants).map(([code, grant]) => (
                grant && typeof grant === 'object'
                    ? { ...grant, code: grant.code || code }
                    : { code, quantity: grant }
            ));
        }

        const rawCodes = Array.isArray(entry.codes)
            ? entry.codes
            : String(entry.codes || '').split(/[,\s]+/);
        const quantities = entry.quantities && typeof entry.quantities === 'object' ? entry.quantities : {};
        const usedCounts = entry.used && typeof entry.used === 'object' ? entry.used : {};
        return rawCodes.map(code => {
            const normalizedCode = String(code || '').trim().toUpperCase();
            return {
                code: normalizedCode,
                quantity: quantities[normalizedCode],
                used: usedCounts[normalizedCode]
            };
        });
    }

    function normalizeVoucherAssignmentEntry(entry = {}, fallbackKey = '') {
        const source = entry && typeof entry === 'object' && !Array.isArray(entry) ? entry : {};
        const accountKey = String(source.accountKey || fallbackKey || '').trim();
        const grantMap = new Map();

        getVoucherAssignmentGrantList(entry).forEach(grant => {
            const normalizedGrant = normalizeVoucherAssignmentGrant(grant);
            if (!normalizedGrant) {
                return;
            }

            const existingGrant = grantMap.get(normalizedGrant.code);
            grantMap.set(normalizedGrant.code, existingGrant
                ? {
                    ...existingGrant,
                    quantity: Math.max(existingGrant.quantity, normalizedGrant.quantity),
                    used: Math.max(existingGrant.used, normalizedGrant.used),
                    assignedAt: existingGrant.assignedAt || normalizedGrant.assignedAt
                }
                : normalizedGrant);
        });

        const grants = Object.fromEntries(Array.from(grantMap.entries()).map(([code, grant]) => [code, grant]));
        const codes = Array.from(grantMap.keys());

        return {
            accountKey,
            accountLabel: sanitizeProductText(source.accountLabel || '').trim(),
            codes,
            grants,
            updatedAt: String(source.updatedAt || '').trim()
        };
    }

    function getVoucherAssignmentStore() {
        const stored = readStorage(VOUCHER_ASSIGNMENTS_KEY, null);
        if (!stored || typeof stored !== 'object' || Array.isArray(stored)) {
            return {};
        }

        return Object.entries(stored).reduce((store, [accountKey, entry]) => {
            const normalized = normalizeVoucherAssignmentEntry(entry, accountKey);
            if (normalized.accountKey) {
                store[normalized.accountKey] = normalized;
            }
            return store;
        }, {});
    }

    function saveVoucherAssignmentStore(store = {}) {
        const normalizedStore = Object.entries(store).reduce((result, [accountKey, entry]) => {
            const normalized = normalizeVoucherAssignmentEntry(entry, accountKey);
            if (normalized.accountKey) {
                result[normalized.accountKey] = normalized;
            }
            return result;
        }, {});
        localStorage.setItem(VOUCHER_ASSIGNMENTS_KEY, JSON.stringify(normalizedStore));
        localStorage.setItem(VOUCHER_ASSIGNMENTS_VERSION_KEY, VOUCHER_ASSIGNMENTS_VERSION);
    }

    function getDefaultVoucherCodesForAccount(account = currentUser) {
        const accountKey = getVoucherAssignmentAccountKey(account);
        const accountSignature = normalizeText([
            accountKey,
            account?.username,
            account?.ten_dang_nhap,
            account?.email
        ].filter(Boolean).join(' '));

        if (accountSignature.includes('khachhang01') || accountSignature.includes('customer-001')) {
            return ['HOTDEAL10', 'FOOTBALL12', 'BADMINTON12', 'SEAGAMES15'];
        }

        if (accountSignature.includes('khachhang02') || accountSignature.includes('customer-002')) {
            return ['VOLLEY10', 'BASKET15', 'TABLE08', 'SPORT25'];
        }

        const categoryCodes = ['FOOTBALL12', 'VOLLEY10', 'BASKET15', 'TABLE08', 'BADMINTON12', 'RUNGYM18'];
        const hash = accountSignature.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return getUniqueValues([
            'HOTDEAL10',
            categoryCodes[hash % categoryCodes.length],
            categoryCodes[(hash + 3) % categoryCodes.length]
        ]);
    }

    function pruneExpiredVoucherAssignments(store = getVoucherAssignmentStore()) {
        const voucherMap = new Map(getManagedVoucherCatalog().map(voucher => [voucher.code, voucher]));
        let changed = false;
        const nextStore = Object.entries(store).reduce((result, [accountKey, entry]) => {
            const normalized = normalizeVoucherAssignmentEntry(entry, accountKey);
            const nextCodes = normalized.codes.filter(code => {
                const voucher = voucherMap.get(code);
                return voucher && !isVoucherExpired(voucher);
            });
            const nextGrants = Object.fromEntries(nextCodes.map(code => [code, normalized.grants[code]]).filter(([, grant]) => grant));

            if (nextCodes.length !== normalized.codes.length) {
                changed = true;
            }

            result[normalized.accountKey] = {
                ...normalized,
                codes: nextCodes,
                grants: nextGrants
            };
            return result;
        }, {});

        if (changed) {
            saveVoucherAssignmentStore(nextStore);
        }

        return nextStore;
    }

    function ensureVoucherAssignmentsForAccount(account = currentUser) {
        const accountKey = getVoucherAssignmentAccountKey(account);
        if (!accountKey) {
            return [];
        }

        const store = pruneExpiredVoucherAssignments(getVoucherAssignmentStore());
        if (!store[accountKey]) {
            store[accountKey] = normalizeVoucherAssignmentEntry({
                accountKey,
                accountLabel: getVoucherAssignmentAccountLabel(account),
                codes: getDefaultVoucherCodesForAccount(account),
                updatedAt: new Date().toISOString()
            }, accountKey);
            saveVoucherAssignmentStore(store);
        } else if (!store[accountKey].accountLabel || !store[accountKey].grants) {
            store[accountKey] = normalizeVoucherAssignmentEntry({
                ...store[accountKey],
                accountLabel: store[accountKey].accountLabel || getVoucherAssignmentAccountLabel(account)
            }, accountKey);
            saveVoucherAssignmentStore(store);
        }

        return store[accountKey].codes || [];
    }

    function getVoucherAssignmentGrantForAccount(accountKey, code) {
        const normalizedAccountKey = String(accountKey || '').trim();
        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!normalizedAccountKey || !normalizedCode) {
            return null;
        }

        const store = pruneExpiredVoucherAssignments(getVoucherAssignmentStore());
        const entry = normalizeVoucherAssignmentEntry(store[normalizedAccountKey] || {}, normalizedAccountKey);
        return entry.grants[normalizedCode] || null;
    }

    function getVoucherUsageForAccount(accountKey, code) {
        const grant = getVoucherAssignmentGrantForAccount(accountKey, code);
        if (!grant) {
            return {
                quantity: 0,
                used: 0,
                remaining: 0
            };
        }

        const quantity = getVoucherAssignmentQuantity(grant?.quantity);
        const used = Math.min(quantity, Math.max(0, Math.floor(Number(grant?.used || 0))));
        return {
            quantity,
            used,
            remaining: Math.max(0, quantity - used)
        };
    }

    function getVoucherUsageForCurrentAccount(code) {
        return getVoucherUsageForAccount(getVoucherAssignmentAccountKey(), code);
    }

    function getVoucherUsageStatsByCode() {
        const stats = {};
        const ensureStats = code => {
            const normalizedCode = String(code || '').trim().toUpperCase();
            if (!normalizedCode) {
                return null;
            }

            if (!stats[normalizedCode]) {
                stats[normalizedCode] = {
                    granted: 0,
                    assignmentUsed: 0,
                    orderUsed: 0,
                    usedCount: 0,
                    discountTotal: 0,
                    accountKeys: new Set()
                };
            }

            return stats[normalizedCode];
        };

        Object.entries(pruneExpiredVoucherAssignments(getVoucherAssignmentStore())).forEach(([accountKey, entry]) => {
            const normalizedEntry = normalizeVoucherAssignmentEntry(entry, accountKey);
            Object.values(normalizedEntry.grants || {}).forEach(grant => {
                const item = ensureStats(grant.code);
                if (!item) {
                    return;
                }

                item.granted += getVoucherAssignmentQuantity(grant.quantity);
                item.assignmentUsed += Math.max(0, Math.floor(Number(grant.used || 0)));
                if (accountKey) {
                    item.accountKeys.add(accountKey);
                }
            });
        });

        getWorkspaceOrders().forEach(order => {
            const code = String(order.voucherCode || '').trim().toUpperCase();
            if (!code || Number(order.discount || 0) <= 0 || normalizeText(order.status || '') === 'da huy') {
                return;
            }

            const item = ensureStats(code);
            if (!item) {
                return;
            }

            item.orderUsed += 1;
            item.discountTotal += Number(order.discount || 0);
            if (order.accountKey) {
                item.accountKeys.add(order.accountKey);
            }
        });

        Object.values(stats).forEach(item => {
            item.usedCount = Math.max(item.assignmentUsed, item.orderUsed);
            item.accountCount = item.accountKeys.size;
            delete item.accountKeys;
        });

        return stats;
    }

    function getAssignedVoucherCodesForCurrentAccount() {
        const accountKey = getVoucherAssignmentAccountKey();
        if (!accountKey) {
            return [];
        }

        ensureVoucherAssignmentsForAccount(currentUser);
        const store = pruneExpiredVoucherAssignments(getVoucherAssignmentStore());
        const entry = normalizeVoucherAssignmentEntry(store[accountKey] || {}, accountKey);
        return (entry.codes || []).filter(code => getVoucherUsageForAccount(accountKey, code).remaining > 0);
    }

    function consumeVoucherForCurrentAccount(code) {
        const accountKey = getVoucherAssignmentAccountKey();
        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!accountKey || !normalizedCode) {
            return false;
        }

        const store = pruneExpiredVoucherAssignments(getVoucherAssignmentStore());
        const currentEntry = normalizeVoucherAssignmentEntry(store[accountKey] || {}, accountKey);
        const currentGrant = currentEntry.grants[normalizedCode];
        if (!currentGrant || currentGrant.used >= currentGrant.quantity) {
            return false;
        }

        store[accountKey] = {
            ...currentEntry,
            grants: {
                ...currentEntry.grants,
                [normalizedCode]: {
                    ...currentGrant,
                    used: Math.min(currentGrant.quantity, currentGrant.used + 1)
                }
            },
            updatedAt: new Date().toISOString()
        };
        saveVoucherAssignmentStore(store);
        return true;
    }

    function assignVoucherToAccount(accountKey, code, quantity = DEFAULT_VOUCHER_ASSIGNMENT_QUANTITY) {
        const normalizedAccountKey = String(accountKey || '').trim();
        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!normalizedAccountKey || !normalizedCode) {
            return false;
        }

        const account = getManagedAccounts().find(item => getAccountKeyForUser(item) === normalizedAccountKey) || {};
        const voucher = getManagedVoucherCatalog().find(item => item.code === normalizedCode);
        if (!voucher || isVoucherExpired(voucher)) {
            return false;
        }

        const store = pruneExpiredVoucherAssignments(getVoucherAssignmentStore());
        const currentEntry = normalizeVoucherAssignmentEntry(store[normalizedAccountKey] || {}, normalizedAccountKey);
        const assignmentQuantity = getVoucherAssignmentQuantity(quantity);
        const currentGrant = currentEntry.grants[normalizedCode] || {
            code: normalizedCode,
            quantity: assignmentQuantity,
            used: 0,
            assignedAt: new Date().toISOString()
        };
        store[normalizedAccountKey] = {
            ...currentEntry,
            accountKey: normalizedAccountKey,
            accountLabel: getVoucherAssignmentAccountLabel(account),
            codes: getUniqueValues([...currentEntry.codes, normalizedCode]),
            grants: {
                ...currentEntry.grants,
                [normalizedCode]: {
                    ...currentGrant,
                    quantity: Math.max(currentGrant.quantity || 0, currentGrant.used + assignmentQuantity),
                    assignedAt: currentGrant.assignedAt || new Date().toISOString()
                }
            },
            updatedAt: new Date().toISOString()
        };
        saveVoucherAssignmentStore(store);
        return true;
    }

    function unassignVoucherFromAccount(accountKey, code) {
        const normalizedAccountKey = String(accountKey || '').trim();
        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!normalizedAccountKey || !normalizedCode) {
            return false;
        }

        const store = getVoucherAssignmentStore();
        const currentEntry = normalizeVoucherAssignmentEntry(store[normalizedAccountKey] || {}, normalizedAccountKey);
        const nextGrants = { ...currentEntry.grants };
        delete nextGrants[normalizedCode];
        store[normalizedAccountKey] = {
            ...currentEntry,
            codes: currentEntry.codes.filter(item => item !== normalizedCode),
            grants: nextGrants,
            updatedAt: new Date().toISOString()
        };
        saveVoucherAssignmentStore(store);

        if (getVoucherAssignmentAccountKey() === normalizedAccountKey && getAppliedVoucherCode() === normalizedCode) {
            saveAppliedVoucherCode('');
        }

        return true;
    }

    function removeVoucherCodeFromAllAssignments(code) {
        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!normalizedCode) {
            return;
        }

        const store = getVoucherAssignmentStore();
        let changed = false;
        Object.entries(store).forEach(([accountKey, entry]) => {
            const normalized = normalizeVoucherAssignmentEntry(entry, accountKey);
            const nextCodes = normalized.codes.filter(item => item !== normalizedCode);
            if (nextCodes.length !== normalized.codes.length) {
                const nextGrants = { ...normalized.grants };
                delete nextGrants[normalizedCode];
                store[accountKey] = {
                    ...normalized,
                    codes: nextCodes,
                    grants: nextGrants,
                    updatedAt: new Date().toISOString()
                };
                changed = true;
            }
        });

        if (changed) {
            saveVoucherAssignmentStore(store);
        }
    }

    function replaceVoucherCodeInAssignments(oldCode, newCode) {
        const normalizedOldCode = String(oldCode || '').trim().toUpperCase();
        const normalizedNewCode = String(newCode || '').trim().toUpperCase();
        if (!normalizedOldCode || !normalizedNewCode || normalizedOldCode === normalizedNewCode) {
            return;
        }

        const store = getVoucherAssignmentStore();
        let changed = false;
        Object.entries(store).forEach(([accountKey, entry]) => {
            const normalized = normalizeVoucherAssignmentEntry(entry, accountKey);
            if (!normalized.codes.includes(normalizedOldCode)) {
                return;
            }

            store[accountKey] = {
                ...normalized,
                codes: getUniqueValues(normalized.codes.map(code => code === normalizedOldCode ? normalizedNewCode : code)),
                grants: Object.fromEntries(Object.entries(normalized.grants).map(([code, grant]) => (
                    code === normalizedOldCode
                        ? [normalizedNewCode, { ...grant, code: normalizedNewCode }]
                        : [code, grant]
                ))),
                updatedAt: new Date().toISOString()
            };
            changed = true;
        });

        if (changed) {
            saveVoucherAssignmentStore(store);
        }
    }

    function formatDateTimeLocalInputValue(value) {
        const date = value ? new Date(value) : new Date();
        if (Number.isNaN(date.getTime())) {
            return '';
        }

        const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return offsetDate.toISOString().slice(0, 16);
    }

    function getDefaultPromoHuntCampaigns() {
        const now = new Date();
        const startAt = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        const endAt = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString();
        return [
            { id: 'hunt-hotdeal10', voucherCode: 'HOTDEAL10', totalQuantity: 30, startAt, endAt, status: 'ACTIVE' },
            { id: 'hunt-seagames15', voucherCode: 'SEAGAMES15', totalQuantity: 20, startAt, endAt, status: 'ACTIVE' },
            { id: 'hunt-rungym18', voucherCode: 'RUNGYM18', totalQuantity: 15, startAt, endAt, status: 'ACTIVE' }
        ];
    }

    function parseOptionalNonNegativeInteger(value) {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const numericValue = Number(value);
        return Number.isFinite(numericValue) ? Math.max(0, Math.floor(numericValue)) : null;
    }

    function normalizePromoHuntCampaign(campaign = {}, index = 0) {
        const voucherCode = String(campaign.voucherCode || campaign.voucher_code || campaign.code || '').trim().toUpperCase();
        const id = String(campaign.id || `hunt-${voucherCode || index + 1}`).trim();
        const totalQuantity = Math.max(0, Math.floor(Number(campaign.totalQuantity || campaign.total_quantity || campaign.quantity || campaign.limit || 0)));
        const claimedCount = parseOptionalNonNegativeInteger(campaign.claimedCount ?? campaign.claimed_count);
        const remaining = parseOptionalNonNegativeInteger(campaign.remaining ?? campaign.remaining_count ?? campaign.remainingQuantity ?? campaign.remaining_quantity);
        return {
            id,
            voucherCode,
            totalQuantity,
            claimedCount,
            remaining,
            userClaimed: Boolean(campaign.userClaimed ?? campaign.user_claimed),
            startAt: String(campaign.startAt || campaign.start_at || campaign.startsAt || campaign.starts_at || '').trim(),
            endAt: String(campaign.endAt || campaign.end_at || campaign.endsAt || campaign.ends_at || '').trim(),
            status: String(campaign.status || 'ACTIVE').trim() || 'ACTIVE',
            createdAt: String(campaign.createdAt || campaign.created_at || new Date().toISOString()),
            updatedAt: String(campaign.updatedAt || campaign.updated_at || new Date().toISOString())
        };
    }

    function getPromoHuntCampaigns() {
        const stored = readStorage(PROMO_HUNT_KEY, null);
        if (!Array.isArray(stored) || !stored.length) {
            const defaults = getDefaultPromoHuntCampaigns().map(normalizePromoHuntCampaign);
            savePromoHuntCampaigns(defaults);
            return defaults;
        }

        const normalized = stored
            .map(normalizePromoHuntCampaign)
            .filter(campaign => campaign.id && campaign.voucherCode);
        if (localStorage.getItem(PROMO_HUNT_VERSION_KEY) !== PROMO_HUNT_VERSION) {
            savePromoHuntCampaigns(normalized);
        }
        return normalized;
    }

    function savePromoHuntCampaigns(campaigns = []) {
        const normalized = (Array.isArray(campaigns) ? campaigns : [])
            .map(normalizePromoHuntCampaign)
            .map(campaign => ({ ...campaign, userClaimed: false }))
            .filter(campaign => campaign.id && campaign.voucherCode);
        localStorage.setItem(PROMO_HUNT_KEY, JSON.stringify(normalized));
        localStorage.setItem(PROMO_HUNT_VERSION_KEY, PROMO_HUNT_VERSION);
    }

    function getPromoHuntClaims() {
        const stored = readStorage(PROMO_HUNT_CLAIMS_KEY, {});
        return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
    }

    function savePromoHuntClaims(claims = {}) {
        localStorage.setItem(PROMO_HUNT_CLAIMS_KEY, JSON.stringify(
            claims && typeof claims === 'object' && !Array.isArray(claims) ? claims : {}
        ));
    }

    function syncPromoHuntUserClaimsFromServer(campaigns = []) {
        const accountKey = getVoucherAssignmentAccountKey();
        if (!accountKey || !Array.isArray(campaigns)) {
            return;
        }

        const claims = getPromoHuntClaims();
        let changed = false;
        campaigns.forEach((campaign, index) => {
            const normalized = normalizePromoHuntCampaign(campaign, index);
            if (!normalized.id) {
                return;
            }

            const serverUserClaimed = Boolean(campaign.userClaimed ?? campaign.user_claimed);
            const campaignClaims = getPromoHuntCampaignClaims(normalized.id);
            if (serverUserClaimed && !campaignClaims[accountKey]) {
                campaignClaims[accountKey] = new Date().toISOString();
                claims[normalized.id] = campaignClaims;
                changed = true;
            } else if (!serverUserClaimed && campaignClaims[accountKey]) {
                delete campaignClaims[accountKey];
                claims[normalized.id] = campaignClaims;
                changed = true;
            }
        });

        if (changed) {
            savePromoHuntClaims(claims);
        }
    }

    function replacePromoHuntCampaignsFromServer(campaigns = []) {
        if (!Array.isArray(campaigns)) {
            return getPromoHuntCampaigns();
        }
        syncPromoHuntUserClaimsFromServer(campaigns);
        const normalized = campaigns
            .map(normalizePromoHuntCampaign)
            .filter(campaign => campaign.id && campaign.voucherCode);
        savePromoHuntCampaigns(normalized);
        return normalized;
    }

    function upsertPromoHuntCampaignFromServer(campaign = {}) {
        syncPromoHuntUserClaimsFromServer([campaign]);
        const normalized = normalizePromoHuntCampaign(campaign);
        if (!normalized.id || !normalized.voucherCode) {
            return;
        }
        const campaigns = getPromoHuntCampaigns();
        const nextCampaigns = campaigns.some(item => item.id === normalized.id)
            ? campaigns.map(item => item.id === normalized.id ? normalized : item)
            : [normalized, ...campaigns];
        savePromoHuntCampaigns(nextCampaigns);
    }

    async function syncPromoHuntCampaignsFromApi(options = {}) {
        if (promoHuntSyncPromise) {
            return promoHuntSyncPromise;
        }

        promoHuntSyncPromise = apiRequest('/promo-hunt/campaigns', { auth: Boolean(token) })
            .then(campaigns => {
                promoHuntBackendAvailable = true;
                const normalized = replacePromoHuntCampaignsFromServer(Array.isArray(campaigns) ? campaigns : []);
                if (options.render && currentView === 'promo-hunt') {
                    renderPromoHuntView();
                }
                if (canAccessWorkspace() && document.getElementById('vouchers-mgmt-panel')) {
                    renderVouchersPanel();
                }
                return normalized;
            })
            .catch(() => {
                promoHuntBackendAvailable = false;
                return getPromoHuntCampaigns();
            })
            .finally(() => {
                promoHuntSyncPromise = null;
            });

        return promoHuntSyncPromise;
    }

    function getPromoHuntCampaignClaims(campaignId) {
        const claims = getPromoHuntClaims();
        const campaignClaims = claims[String(campaignId || '').trim()];
        return campaignClaims && typeof campaignClaims === 'object' && !Array.isArray(campaignClaims)
            ? campaignClaims
            : {};
    }

    function getPromoHuntClaimCount(campaignId) {
        return Object.keys(getPromoHuntCampaignClaims(campaignId)).length;
    }

    function getPromoHuntCampaignState(campaign = {}, accountKey = getVoucherAssignmentAccountKey()) {
        const voucher = getManagedVoucherCatalog().find(item => item.code === campaign.voucherCode) || null;
        const now = Date.now();
        const startTime = campaign.startAt ? new Date(campaign.startAt).getTime() : 0;
        const endTime = campaign.endAt ? new Date(campaign.endAt).getTime() : Number.POSITIVE_INFINITY;
        const serverClaimedCount = parseOptionalNonNegativeInteger(campaign.claimedCount);
        const serverRemaining = parseOptionalNonNegativeInteger(campaign.remaining);
        const claimedCount = serverClaimedCount ?? getPromoHuntClaimCount(campaign.id);
        const totalQuantity = Number(campaign.totalQuantity || 0);
        const computedRemaining = Math.max(0, totalQuantity - claimedCount);
        let remaining = serverRemaining ?? computedRemaining;
        if (totalQuantity > 0 && remaining === 0 && claimedCount < totalQuantity) {
            remaining = computedRemaining;
        }
        const userClaimed = Boolean(campaign.userClaimed) || Boolean(accountKey && getPromoHuntCampaignClaims(campaign.id)[accountKey]);
        const normalizedStatus = normalizeText(campaign.status);
        const disabledByStatus = !['active', 'hoat dong', 'dang mo', 'ho t ng', 'hoa t a ng'].includes(normalizedStatus);
        const notStarted = Number.isFinite(startTime) && startTime > now;
        const expired = Number.isFinite(endTime) && endTime < now;
        const voucherUnavailable = !voucher || !isVoucherUsable(voucher);
        const exhausted = remaining <= 0;

        let reason = '';
        if (userClaimed) {
            reason = 'Bạn đã nhận mã này';
        } else if (exhausted) {
            reason = 'Mã khuyến mãi đã hết';
        } else if (notStarted) {
            reason = 'Chưa đến giờ săn mã';
        } else if (expired) {
            reason = 'Đã hết thời gian săn mã';
        } else if (disabledByStatus) {
            reason = 'Chiến dịch đang tạm khóa';
        } else if (voucherUnavailable) {
            reason = 'Voucher không còn hiệu lực';
        }

        return {
            voucher,
            claimedCount,
            remaining,
            userClaimed,
            notStarted,
            expired,
            disabledByStatus,
            voucherUnavailable,
            exhausted,
            canClaim: Boolean(voucher && accountKey && !userClaimed && !exhausted && !notStarted && !expired && !disabledByStatus && !voucherUnavailable),
            reason
        };
    }

    async function claimPromoHuntCampaign(campaignId) {
        if (currentUser && canAccessWorkspace()) {
            showCenteredMessage('Tài khoản nhân viên và quản lý chỉ được xem săn khuyến mãi, không được nhận mã.', 'error');
            renderPromoHuntView();
            return;
        }

        if (!ensureCustomerAccess('Hãy đăng nhập bằng tài khoản khách hàng để săn khuyến mãi.')) {
            return;
        }

        const campaign = getPromoHuntCampaigns().find(item => item.id === String(campaignId || '').trim());
        if (!campaign) {
            return;
        }

        const accountKey = getVoucherAssignmentAccountKey();
        const state = getPromoHuntCampaignState(campaign, accountKey);
        if (!state.canClaim) {
            showCenteredMessage(state.reason || 'Không thể nhận mã khuyến mãi này.', 'error');
            renderPromoHuntView();
            return;
        }

        if (promoHuntBackendAvailable && token) {
            try {
                const response = await apiRequest(`/promo-hunt/campaigns/${encodeURIComponent(campaign.id)}/claim`, {
                    method: 'POST'
                });
                upsertPromoHuntCampaignFromServer(response);
                assignVoucherToAccount(accountKey, campaign.voucherCode, 1);
                showCenteredMessage(`Đã nhận mã ${campaign.voucherCode}. Mã đã được thêm vào ví ưu đãi của tài khoản.`);
                renderPromoHuntView();
                renderCartView();
                if (currentView === 'checkout') {
                    renderCheckoutView();
                }
                return;
            } catch (error) {
                if (promoHuntBackendAvailable) {
                    showCenteredMessage(error.message || 'Không thể nhận mã khuyến mãi này.', 'error');
                    await syncPromoHuntCampaignsFromApi({ render: true });
                    return;
                }
            }
        }

        const claims = getPromoHuntClaims();
        const campaignClaims = getPromoHuntCampaignClaims(campaign.id);
        campaignClaims[accountKey] = new Date().toISOString();
        claims[campaign.id] = campaignClaims;
        savePromoHuntClaims(claims);
        assignVoucherToAccount(accountKey, campaign.voucherCode, 1);
        showCenteredMessage(`Đã nhận mã ${campaign.voucherCode}. Mã đã được thêm vào ví ưu đãi của tài khoản.`);
        renderPromoHuntView();
        renderCartView();
        if (currentView === 'checkout') {
            renderCheckoutView();
        }
    }

    async function savePromoHuntCampaignFromForm() {
        const voucherCode = document.getElementById('promo-hunt-voucher-code')?.value || '';
        const totalQuantity = Number(document.getElementById('promo-hunt-quantity')?.value || 0);
        const startAt = document.getElementById('promo-hunt-start-at')?.value || '';
        const endAt = document.getElementById('promo-hunt-end-at')?.value || '';
        const status = document.getElementById('promo-hunt-status')?.value || 'ACTIVE';
        if (!voucherCode || totalQuantity < 1 || !startAt || !endAt) {
            return;
        }
        const startDate = new Date(startAt);
        const endDate = new Date(endAt);
        if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
            showCenteredMessage('Thời gian kết thúc phải sau thời gian bắt đầu.', 'error');
            return;
        }

        if (promoHuntBackendAvailable && token) {
            try {
                const response = await apiRequest('/admin/promo-hunt/campaigns', {
                    method: 'POST',
                    body: {
                        voucher_code: voucherCode,
                        total_quantity: totalQuantity,
                        start_at: startAt,
                        end_at: endAt,
                        status
                    }
                });
                upsertPromoHuntCampaignFromServer(response);
                renderVouchersPanel();
                if (currentView === 'promo-hunt') {
                    renderPromoHuntView();
                }
                return;
            } catch (error) {
                showCenteredMessage(error.message || 'Không thể mở chiến dịch săn khuyến mãi.', 'error');
                return;
            }
        }

        const campaign = normalizePromoHuntCampaign({
            id: generateRecordId('hunt'),
            voucherCode,
            totalQuantity,
            startAt: startDate.toISOString(),
            endAt: endDate.toISOString(),
            status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        savePromoHuntCampaigns([campaign, ...getPromoHuntCampaigns()]);
        renderVouchersPanel();
        if (currentView === 'promo-hunt') {
            renderPromoHuntView();
        }
    }

    async function deletePromoHuntCampaign(campaignId) {
        const normalizedId = String(campaignId || '').trim();
        if (!normalizedId) {
            return;
        }

        if (promoHuntBackendAvailable && token) {
            try {
                await apiRequest(`/admin/promo-hunt/campaigns/${encodeURIComponent(normalizedId)}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                showCenteredMessage(error.message || 'Không thể xóa chiến dịch săn khuyến mãi.', 'error');
                return;
            }
        }

        savePromoHuntCampaigns(getPromoHuntCampaigns().filter(campaign => campaign.id !== normalizedId));
        const claims = getPromoHuntClaims();
        delete claims[normalizedId];
        savePromoHuntClaims(claims);
        renderVouchersPanel();
        if (currentView === 'promo-hunt') {
            renderPromoHuntView();
        }
    }

    function replacePromoHuntVoucherCode(oldCode, newCode) {
        const normalizedOldCode = String(oldCode || '').trim().toUpperCase();
        const normalizedNewCode = String(newCode || '').trim().toUpperCase();
        if (!normalizedOldCode || !normalizedNewCode || normalizedOldCode === normalizedNewCode) {
            return;
        }

        savePromoHuntCampaigns(getPromoHuntCampaigns().map(campaign => (
            campaign.voucherCode === normalizedOldCode
                ? { ...campaign, voucherCode: normalizedNewCode, updatedAt: new Date().toISOString() }
                : campaign
        )));
    }

    function removePromoHuntVoucherCode(code) {
        const normalizedCode = String(code || '').trim().toUpperCase();
        if (!normalizedCode) {
            return;
        }
        const removedCampaignIds = getPromoHuntCampaigns()
            .filter(campaign => campaign.voucherCode === normalizedCode)
            .map(campaign => campaign.id);
        savePromoHuntCampaigns(getPromoHuntCampaigns().filter(campaign => campaign.voucherCode !== normalizedCode));
        if (removedCampaignIds.length) {
            const claims = getPromoHuntClaims();
            removedCampaignIds.forEach(id => {
                delete claims[id];
            });
            savePromoHuntClaims(claims);
        }
    }

    function renderPromoHuntView() {
        if (!promoHuntView || !promoHuntGrid) {
            return;
        }

        const campaigns = getPromoHuntCampaigns()
            .map(campaign => ({
                campaign,
                state: getPromoHuntCampaignState(campaign)
            }))
            .filter(item => item.state.voucher)
            .sort((left, right) => {
                const leftExpired = left.state.expired ? 1 : 0;
                const rightExpired = right.state.expired ? 1 : 0;
                if (leftExpired !== rightExpired) {
                    return leftExpired - rightExpired;
                }
                return new Date(left.campaign.endAt || 0) - new Date(right.campaign.endAt || 0);
            });

        if (promoHuntCount) {
            promoHuntCount.textContent = `${campaigns.length} ưu đãi`;
        }

        if (!campaigns.length) {
            promoHuntGrid.innerHTML = '<div class="cart-empty-state"><h3>Chưa có mã khuyến mãi để săn</h3><p>Quản trị viên chưa mở chiến dịch săn mã nào trong thời điểm này.</p></div>';
            repairTextNodes(promoHuntGrid);
            return;
        }

        const isWorkspaceUser = canAccessWorkspace();
        const canSeePromoHuntInventory = isWorkspaceUser;
        promoHuntGrid.innerHTML = campaigns.map(({ campaign, state }) => {
            const voucher = state.voucher;
            const categories = getVoucherCategories(voucher).join(', ');
            const isDisabled = isWorkspaceUser || (!state.canClaim && Boolean(currentUser || state.exhausted || state.notStarted || state.expired || state.disabledByStatus || state.voucherUnavailable));
            const reason = isWorkspaceUser
                ? 'Tài khoản nhân viên và quản lý chỉ được xem ưu đãi.'
                : state.reason;
            const publicStatus = state.userClaimed
                ? 'Đã nhận'
                : state.exhausted
                    ? 'Đã hết'
                    : state.notStarted
                        ? 'Sắp mở'
                        : state.expired
                            ? 'Hết hạn'
                            : state.disabledByStatus
                                ? 'Tạm khóa'
                                : state.voucherUnavailable
                                    ? 'Không hiệu lực'
                                    : 'Đang mở';
            const inventoryMarkup = canSeePromoHuntInventory
                ? `
                    <div class="promo-hunt-progress">
                        <span>Đã nhận ${state.claimedCount}/${campaign.totalQuantity}</span>
                        <strong>${state.remaining > 0 ? `Còn ${state.remaining}` : 'Đã hết'}</strong>
                    </div>
                `
                : `
                    <div class="promo-hunt-progress">
                        <span>Trạng thái</span>
                        <strong>${escapeHtml(publicStatus)}</strong>
                    </div>
                `;
            const buttonText = isWorkspaceUser
                ? 'Chỉ dành cho khách hàng'
                : state.userClaimed
                ? 'Đã nhận'
                : state.exhausted
                    ? 'Mã khuyến mãi đã hết'
                    : currentUser
                        ? 'Nhận mã'
                        : 'Đăng nhập để nhận';
            return `
                <article class="promo-hunt-card ${state.exhausted ? 'exhausted' : ''} ${state.userClaimed ? 'claimed' : ''}">
                    <div class="promo-hunt-card-head">
                        <span class="promo-hunt-badge">${escapeHtml(voucher.code)}</span>
                        <span class="workspace-chip">${escapeHtml(getVoucherDisplayStatus(voucher))}</span>
                    </div>
                    <h3>${escapeHtml(voucher.label)}</h3>
                    <p class="promo-hunt-discount">Giảm ${Math.round(Number(voucher.percent || 0) * 100)}% · tối đa ${formatCurrency(voucher.maxDiscount)}</p>
                    <p class="voucher-meta">Đơn tối thiểu ${formatCurrency(voucher.minOrder)}</p>
                    <p class="promo-hunt-note"><strong>Áp dụng cho:</strong> ${escapeHtml(categories)}</p>
                    <p class="voucher-meta">Thời gian: ${escapeHtml(formatDateTimeDisplay(campaign.startAt))} - ${escapeHtml(formatDateTimeDisplay(campaign.endAt))}</p>
                    ${inventoryMarkup}
                    ${reason ? `<p class="promo-hunt-reason">${escapeHtml(reason)}</p>` : ''}
                    <button class="login-submit-btn text-bold" type="button" data-promo-hunt-claim="${escapeHtml(campaign.id)}" ${isDisabled ? 'disabled' : ''}>
                        ${buttonText}
                    </button>
                </article>
            `;
        }).join('');
        repairTextNodes(promoHuntGrid);
    }

    function openPromoHuntView() {
        currentView = 'promo-hunt';
        currentCollectionId = '';
        resetCatalogState({ clearQuery: true, skipRender: true });
        closeMegaMenu();
        closeSearchSuggestions();
        renderPromoHuntView();
        void syncPromoHuntCampaignsFromApi({ render: true });
        syncMainView();
        syncNavState();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function getCustomerVisibleVouchers() {
        const assignedCodes = getAssignedVoucherCodesForCurrentAccount();
        if (!assignedCodes.length) {
            return [];
        }

        const catalogByCode = new Map(getManagedVoucherCatalog().map(voucher => [voucher.code, voucher]));
        return assignedCodes
            .map(code => catalogByCode.get(code))
            .filter(Boolean)
            .filter(isVoucherUsable);
    }

    function voucherAppliesToCurrentCart(voucher = {}) {
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        if (!selectedItems.length) {
            return true;
        }

        return selectedItems.some(item => voucherAppliesToProduct(voucher, item.product));
    }

    function getVoucherByCode(code) {
        return getCustomerVisibleVouchers().find(voucher => voucher.code === String(code || '').trim().toUpperCase()) || null;
    }

    function renderVoucherList(subtotal, appliedVoucher, options = {}) {
        const {
            listElement = voucherList,
            noteElement = voucherAppliedNote,
            clearButton = clearVoucherBtn
        } = options;
        const vouchers = getCustomerVisibleVouchers();

        listElement.innerHTML = vouchers.map(voucher => {
            const minOrder = Number(voucher.minOrder || 0);
            const maxDiscount = Number(voucher.maxDiscount || 0);
            const discountAmount = getVoucherDiscountAmount(voucher, subtotal);
            const matchesCart = voucherAppliesToCurrentCart(voucher);
            const usage = getVoucherUsageForCurrentAccount(voucher.code);
            const hasRemaining = usage.remaining > 0;
            const isEligible = subtotal >= minOrder && subtotal > 0 && matchesCart && hasRemaining;
            const isActive = appliedVoucher?.code === voucher.code;
            const categories = getVoucherCategories(voucher).join(', ');
            const usageText = `Còn ${usage.remaining}/${usage.quantity} lượt dùng`;
            const expiryText = voucher.expiresAt ? `Hết hạn: ${formatDateTimeDisplay(`${voucher.expiresAt}T23:59:59`)}` : 'Không giới hạn hạn dùng';

            return `
                <article class="voucher-card ${isEligible ? '' : 'disabled'} ${isActive ? 'active' : ''}">
                    <p class="voucher-meta voucher-usage-meta">${escapeHtml(usageText)}</p>
                    <div class="voucher-card-main">
                        <div class="voucher-code-row">
                            <strong class="voucher-code">${voucher.code}</strong>
                            ${isActive ? '<span class="voucher-active-badge">Đang dùng</span>' : ''}
                        </div>
                        <p class="voucher-label">${escapeHtml(voucher.label)} - tối đa ${formatCurrency(maxDiscount)}</p>
                        <p class="voucher-meta">Đơn tối thiểu ${formatCurrency(minOrder)}</p>
                        <p class="voucher-meta">Ước tính giảm ${formatCurrency(discountAmount)}</p>
                    </div>
                    <button
                        class="voucher-use-btn"
                        type="button"
                        data-voucher-apply="${voucher.code}"
                        ${!isEligible || isActive ? 'disabled' : ''}
                    >
                        ${isActive ? 'Đã áp dụng' : 'Sử dụng'}
                    </button>
                </article>
            `;
        }).join('');

        if (appliedVoucher) {
            noteElement.textContent = `Đang áp dụng mã ${appliedVoucher.code}. Đơn hàng được giảm tối đa ${formatCurrency(appliedVoucher.maxDiscount)}.`;
            noteElement.classList.remove('hidden');
            clearButton.classList.remove('hidden');
        } else {
            noteElement.textContent = '';
            noteElement.classList.add('hidden');
            clearButton.classList.add('hidden');
        }
    }

    function getCategoryRegistryStore() {
        const raw = readStorage('pbl3_category_registry', null);
        return {
            created: Array.isArray(raw?.created) ? raw.created : [],
            updated: raw?.updated && typeof raw.updated === 'object' ? raw.updated : {},
            deleted: Array.isArray(raw?.deleted) ? raw.deleted : []
        };
    }

    function saveCategoryRegistryStore(store) {
        localStorage.setItem('pbl3_category_registry', JSON.stringify({
            created: Array.isArray(store?.created) ? store.created : [],
            updated: store?.updated && typeof store.updated === 'object' ? store.updated : {},
            deleted: Array.isArray(store?.deleted) ? store.deleted : []
        }));
    }

    function getBaseCategoryRegistry() {
        return SPORT_SECTIONS.flatMap(section => section.items.map(item => ({
            id: String(item.id || generateRecordId('category')),
            label: String(item.label || '').trim(),
            sport: String(section.sport || '').trim(),
            status: 'Đang dùng',
            source: 'seed'
        })));
    }

    function getManagedCategories() {
        const store = getCategoryRegistryStore();
        const categoryMap = new Map();

        getBaseCategoryRegistry().forEach(category => {
            categoryMap.set(category.id, category);
        });

        Object.entries(store.updated).forEach(([key, value]) => {
            categoryMap.set(key, {
                ...categoryMap.get(key),
                ...value
            });
        });

        store.created.forEach(category => {
            categoryMap.set(category.id, {
                ...category,
                source: 'custom'
            });
        });

        store.deleted.forEach(id => categoryMap.delete(String(id || '')));

        return Array.from(categoryMap.values())
            .map(category => ({
                ...category,
                count: allProducts.filter(product => (
                    normalizeText(getCanonicalSportFromProduct(product)) === normalizeText(category.sport)
                    && normalizeText(getProductGroupLabel(product)) === normalizeText(category.label)
                )).length
            }))
            .sort((left, right) => {
                if (normalizeText(left.sport) !== normalizeText(right.sport)) {
                    return String(left.sport || '').localeCompare(String(right.sport || ''), 'vi');
                }
                return String(left.label || '').localeCompare(String(right.label || ''), 'vi');
            });
    }

    function buildSeedReviews() {
        return allProducts.slice(0, Math.min(8, allProducts.length)).map((product, index) => ({
            id: generateRecordId('review'),
            productId: String(product.id || ''),
            reviewer: `Khách ${index + 1}`,
            rating: 5 - (index % 2),
            content: `Đánh giá nhanh cho ${product.ten_san_pham || 'sản phẩm'}: chất lượng ổn, đóng gói gọn và phù hợp để demo quản lý đánh giá.`,
            status: index % 3 === 0 ? 'Ẩn' : 'Hiển thị',
            createdAt: new Date(Date.now() - index * 86400000).toISOString()
        }));
    }

    function getManagedReviews() {
        const stored = readStorage('pbl3_managed_reviews', null);
        const reviews = Array.isArray(stored) && stored.length ? stored : buildSeedReviews();
        if (!Array.isArray(stored) || !stored.length) {
            localStorage.setItem('pbl3_managed_reviews', JSON.stringify(reviews));
        }
        return reviews;
    }

    function saveManagedReviews(reviews) {
        localStorage.setItem('pbl3_managed_reviews', JSON.stringify(Array.isArray(reviews) ? reviews : []));
    }

    function normalizeSupportThreadRecord(thread = {}) {
        return {
            id: String(thread.id || generateRecordId('support')),
            accountKey: String(thread.accountKey || '').trim(),
            customer: {
                id: thread.customer?.id || '',
                name: thread.customer?.name || '',
                username: thread.customer?.username || '',
                email: thread.customer?.email || '',
                phone: thread.customer?.phone || ''
            },
            status: String(thread.status || 'Đang mở'),
            createdAt: thread.createdAt || new Date().toISOString(),
            updatedAt: thread.updatedAt || thread.createdAt || new Date().toISOString(),
            messages: Array.isArray(thread.messages) ? thread.messages.map(message => ({
                id: String(message.id || generateRecordId('message')),
                sender: String(message.sender || 'customer'),
                text: String(message.text || '').trim(),
                createdAt: message.createdAt || new Date().toISOString()
            })).filter(message => message.text) : []
        };
    }

    function mergeSupportCustomerInfo(primary = {}, fallback = {}) {
        return {
            id: primary.id || fallback.id || '',
            name: primary.name || fallback.name || '',
            username: primary.username || fallback.username || '',
            email: primary.email || fallback.email || '',
            phone: primary.phone || fallback.phone || ''
        };
    }

    function dedupeSupportThreadsByAccount(threads = []) {
        const threadMap = new Map();

        (Array.isArray(threads) ? threads : [])
            .map(thread => normalizeSupportThreadRecord(thread))
            .filter(thread => thread.accountKey)
            .forEach(thread => {
                const existing = threadMap.get(thread.accountKey);
                if (!existing) {
                    threadMap.set(thread.accountKey, thread);
                    return;
                }

                const messages = [...(existing.messages || []), ...(thread.messages || [])]
                    .sort((left, right) => new Date(left.createdAt || 0) - new Date(right.createdAt || 0));
                const updatedAt = new Date(existing.updatedAt || 0) > new Date(thread.updatedAt || 0)
                    ? existing.updatedAt
                    : thread.updatedAt;

                threadMap.set(thread.accountKey, normalizeSupportThreadRecord({
                    ...existing,
                    ...thread,
                    id: existing.id || thread.id,
                    accountKey: thread.accountKey,
                    customer: mergeSupportCustomerInfo(existing.customer, thread.customer),
                    updatedAt,
                    messages
                }));
            });

        return Array.from(threadMap.values())
            .sort((left, right) => new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0));
    }

    function getSupportThreads() {
        const stored = readStorage('pbl3_support_threads', []);
        return dedupeSupportThreadsByAccount(stored);
    }

    function saveSupportThreads(threads) {
        localStorage.setItem('pbl3_support_threads', JSON.stringify(
            dedupeSupportThreadsByAccount(threads)
        ));
    }

    function replaceSupportThreads(threads) {
        saveSupportThreads(Array.isArray(threads) ? threads : []);
        return getSupportThreads();
    }

    function upsertSupportThread(thread) {
        if (!thread) {
            return null;
        }

        const normalizedThread = normalizeSupportThreadRecord(thread);
        const nextThreads = getSupportThreads().filter(item => (
            String(item.id) !== String(normalizedThread.id)
            && String(item.accountKey) !== String(normalizedThread.accountKey)
        ));
        nextThreads.unshift(normalizedThread);
        saveSupportThreads(nextThreads);
        return normalizedThread;
    }

    async function syncCustomerSupportThreadFromApi(createIfMissing = false) {
        if (!currentUser || canAccessWorkspace()) {
            return null;
        }

        try {
            const response = await apiRequest(`/support/me?createIfMissing=${createIfMissing ? 'true' : 'false'}`);
            return response ? upsertSupportThread(response) : null;
        } catch (error) {
            return getCustomerSupportThread(createIfMissing);
        }
    }

    async function syncWorkspaceSupportThreadsFromApi() {
        if (!canAccessWorkspace()) {
            return [];
        }

        try {
            const response = await apiRequest('/support/threads');
            return replaceSupportThreads(response);
        } catch (error) {
            return getSupportThreads();
        }
    }

    async function sendCustomerSupportMessageToApi(text) {
        const content = String(text || '').trim();
        if (!content) {
            return null;
        }

        try {
            const response = await apiRequest('/support/me/messages', {
                method: 'POST',
                body: { text: content }
            });
            return response ? upsertSupportThread(response) : null;
        } catch (error) {
            const thread = getCustomerSupportThread(true);
            if (thread) {
                appendSupportMessage(thread.id, 'customer', content);
                return getCustomerSupportThread(false);
            }
            throw error;
        }
    }

    async function sendWorkspaceSupportMessageToApi(threadId, text) {
        const content = String(text || '').trim();
        if (!threadId || !content) {
            return null;
        }

        try {
            const response = await apiRequest(`/support/threads/${encodeURIComponent(threadId)}/messages`, {
                method: 'POST',
                body: { text: content }
            });
            return response ? upsertSupportThread(response) : null;
        } catch (error) {
            appendSupportMessage(threadId, 'staff', content);
            return getSupportThreads().find(thread => String(thread.id) === String(threadId)) || null;
        }
    }

    async function updateSupportThreadStatusToApi(threadId, status) {
        const nextStatus = String(status || '').trim();
        if (!threadId || !nextStatus) {
            return null;
        }

        try {
            const response = await apiRequest(`/support/threads/${encodeURIComponent(threadId)}/status`, {
                method: 'PUT',
                body: { status: nextStatus }
            });
            return response ? upsertSupportThread(response) : null;
        } catch (error) {
            const threads = getSupportThreads().map(thread => (
                String(thread.id) === String(threadId)
                    ? normalizeSupportThreadRecord({ ...thread, status: nextStatus, updatedAt: new Date().toISOString() })
                    : thread
            ));
            saveSupportThreads(threads);
            return getSupportThreads().find(thread => String(thread.id) === String(threadId)) || null;
        }
    }

    async function refreshSupportUiFromApi() {
        if (canAccessWorkspace() && currentView === 'workspace' && getWorkspaceState().activeWorkspaceTab === 'support-mgmt') {
            const deferRefresh = shouldDeferSupportPanelRefresh();
            await syncWorkspaceSupportThreadsFromApi();
            if (deferRefresh) {
                getWorkspaceState().pendingSupportPanelRefresh = true;
                return;
            }
            renderSupportManagementPanel();
            return;
        }

        const supportPanel = document.getElementById('support-chat-panel');
        if (currentUser && !canAccessWorkspace() && supportPanel && !supportPanel.classList.contains('hidden')) {
            await syncCustomerSupportThreadFromApi(false);
            renderCustomerSupportChat();
        }
    }

    function isSupportBusinessHours(date = new Date()) {
        const minutes = date.getHours() * 60 + date.getMinutes();
        return minutes >= (8 * 60) && minutes <= (21 * 60);
    }

    function getSupportAutoReply(text = '', date = new Date()) {
        if (!isSupportBusinessHours(date)) {
            return 'Xin lỗi, hiện đã ngoài giờ làm việc của Flare Fitness (08:00 - 21:00 hằng ngày). Tin nhắn của bạn đã được ghi nhận và nhân viên sẽ phản hồi trong giờ làm việc gần nhất.';
        }

        const normalizedText = normalizeText(text);
        if (/(^|\s)(xin chao|chao|hello|hi|alo)(\s|$)/.test(normalizedText)) {
            return 'Xin chào, Flare Fitness đã nhận được tin nhắn của bạn. Nhân viên tư vấn sẽ hỗ trợ bạn trong cuộc trò chuyện này.';
        }

        return '';
    }

    function getCustomerSupportThread(createIfMissing = false) {
        if (!currentUser || canAccessWorkspace()) {
            return null;
        }

        const accountKey = getCurrentAccountStorageSuffix();
        if (!accountKey) {
            return null;
        }

        const threads = getSupportThreads();
        let thread = threads.find(item => item.accountKey === accountKey) || null;
        const customerProfile = getCurrentCustomerProfile();

        if (!thread && createIfMissing) {
            thread = normalizeSupportThreadRecord({
                id: `support-${accountKey}`,
                accountKey,
                customer: customerProfile,
                status: 'Đang mở',
                messages: [{
                    sender: 'staff',
                    text: 'Xin chào, Flare Fitness đã sẵn sàng hỗ trợ bạn. Hãy gửi nội dung cần tư vấn.',
                    createdAt: new Date().toISOString()
                }]
            });
            threads.unshift(thread);
            saveSupportThreads(threads);
        }

        if (thread) {
            const mergedCustomer = mergeSupportCustomerInfo(customerProfile, thread.customer);
            if (JSON.stringify(mergedCustomer) !== JSON.stringify(thread.customer)) {
                thread = normalizeSupportThreadRecord({ ...thread, customer: mergedCustomer });
                saveSupportThreads(threads.map(item => item.id === thread.id ? thread : item));
            }
        }

        return thread;
    }

    function appendSupportMessage(threadId, sender, text) {
        const content = String(text || '').trim();
        if (!content) {
            return;
        }

        const createdAt = new Date();
        let foundThread = false;
        const threads = getSupportThreads().map(thread => {
            if (String(thread.id) !== String(threadId)) {
                return thread;
            }

            foundThread = true;
            const messages = [
                ...(Array.isArray(thread.messages) ? thread.messages : []),
                {
                    id: generateRecordId('message'),
                    sender,
                    text: content,
                    createdAt: createdAt.toISOString()
                }
            ];
            const autoReply = sender === 'customer' ? getSupportAutoReply(content, createdAt) : '';
            if (autoReply) {
                messages.push({
                    id: generateRecordId('message'),
                    sender: 'staff',
                    text: autoReply,
                    createdAt: new Date(createdAt.getTime() + 1000).toISOString()
                });
            }

            return normalizeSupportThreadRecord({
                ...thread,
                updatedAt: new Date(createdAt.getTime() + (autoReply ? 1000 : 0)).toISOString(),
                messages
            });
        });

        if (!foundThread) {
            return;
        }

        saveSupportThreads(threads);
        renderCustomerSupportChat();
        renderInternalWorkspace();
    }

    function getSupportThreadCustomerName(thread = {}) {
        return sanitizeProductText(thread.customer?.name || thread.customer?.username || 'Khách hàng').trim() || 'Khách hàng';
    }

    function getSupportThreadPreview(thread = {}) {
        const messages = Array.isArray(thread.messages) ? thread.messages : [];
        const lastMessage = messages[messages.length - 1];
        return sanitizeProductText(lastMessage?.text || 'Chưa có nội dung').trim() || 'Chưa có nội dung';
    }

    function getSupportThreadInitials(thread = {}) {
        const name = getSupportThreadCustomerName(thread);
        const initials = name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map(part => part.charAt(0).toUpperCase())
            .join('');
        return initials || 'KH';
    }

    function getSupportThreadSearchTarget(thread = {}) {
        return normalizeText([
            thread.id,
            thread.accountKey,
            thread.status,
            thread.customer?.id,
            thread.customer?.name,
            thread.customer?.username,
            thread.customer?.email,
            thread.customer?.phone,
            getSupportThreadPreview(thread)
        ].filter(Boolean).join(' '));
    }

    function hasCustomerSupportMessage(thread = {}) {
        return (Array.isArray(thread.messages) ? thread.messages : [])
            .some(message => message.sender === 'customer' && String(message.text || '').trim());
    }

    function isCustomerSupportThread(thread = {}) {
        const accountKey = String(thread.accountKey || '').trim();
        if (!accountKey) {
            return false;
        }

        const account = getManagedAccounts().find(item => {
            const itemKeys = [
                getAccountKeyForUser(item),
                item.id,
                item.username,
                item.email
            ].map(value => String(value || '').trim()).filter(Boolean);
            return itemKeys.includes(accountKey);
        });

        return !account || getCanonicalRole(account.role) === 'Khách hàng';
    }

    function getCustomerSummaries() {
        const accountMap = new Map();
        const accounts = getManagedAccounts().filter(account => getCanonicalRole(account.role) === 'Khách hàng');
        const addressBooks = [];

        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key || !key.startsWith(`${ADDRESS_BOOK_KEY}_`)) {
                continue;
            }
            const accountKey = key.slice(`${ADDRESS_BOOK_KEY}_`.length);
            const addresses = readStorage(key, []);
            addressBooks.push({ accountKey, addresses: Array.isArray(addresses) ? addresses : [] });
        }

        accounts.forEach(account => {
            const accountKey = getAccountKeyForUser(account);
            accountMap.set(accountKey, {
                accountKey,
                name: account.ho_ten || '',
                username: account.username || '',
                email: account.email || '',
                phone: account.sdt || '',
                status: account.status || 'Hoạt động',
                orderCount: 0,
                totalSpent: 0,
                lastOrderDate: '',
                defaultAddress: ''
            });
        });

        getWorkspaceOrders().forEach(order => {
            const accountKey = order.accountKey || getAccountKeyForUser(order.customer);
            if (!accountKey) {
                return;
            }

            if (!accountMap.has(accountKey)) {
                accountMap.set(accountKey, {
                    accountKey,
                    name: order.customer?.name || order.address?.recipient || '',
                    username: order.customer?.username || '',
                    email: order.customer?.email || '',
                    phone: order.customer?.phone || order.address?.phone || '',
                    status: 'Hoạt động',
                    orderCount: 0,
                    totalSpent: 0,
                    lastOrderDate: '',
                    defaultAddress: ''
                });
            }

            const current = accountMap.get(accountKey);
            current.orderCount += 1;
            if (isRevenueOrder(order)) {
                current.totalSpent += Number(order.total || 0);
            }
            if (!current.lastOrderDate || new Date(order.createdAt) > new Date(current.lastOrderDate)) {
                current.lastOrderDate = order.createdAt;
            }
        });

        addressBooks.forEach(entry => {
            const current = accountMap.get(entry.accountKey);
            const defaultAddress = entry.addresses.find(address => address.isDefault) || entry.addresses[0];
            if (!current || !defaultAddress) {
                return;
            }
            current.defaultAddress = buildAddressText(defaultAddress);
            current.phone = current.phone || defaultAddress.phone || '';
        });

        return Array.from(accountMap.values()).sort((left, right) => right.totalSpent - left.totalSpent);
    }

    function getStatsFilterState() {
        const state = getWorkspaceState();
        if (!state.statsStartDate || !state.statsEndDate) {
            const today = new Date();
            const start = new Date();
            start.setDate(today.getDate() - 29);
            state.statsStartDate = normalizeDateInputValue(start);
            state.statsEndDate = normalizeDateInputValue(today);
        }
        return state;
    }

    function applyStatsPreset(preset) {
        const state = getWorkspaceState();
        const today = new Date();
        const start = new Date(today);

        if (preset === 'day') {
            start.setDate(today.getDate() - 1);
        } else if (preset === 'week') {
            start.setDate(today.getDate() - 6);
        } else {
            start.setDate(today.getDate() - 29);
        }

        state.statsPreset = preset;
        state.statsStartDate = normalizeDateInputValue(start);
        state.statsEndDate = normalizeDateInputValue(today);
    }

    function getOrdersInStatsRange() {
        const state = getStatsFilterState();
        const start = new Date(`${state.statsStartDate}T00:00:00`);
        const end = new Date(`${state.statsEndDate}T23:59:59`);
        return getWorkspaceOrders().filter(order => {
            const createdAt = new Date(order.createdAt || 0);
            return createdAt >= start && createdAt <= end;
        });
    }

    function getBestSellerRows() {
        const productMap = new Map();

        getOrdersInStatsRange()
            .filter(isRevenueOrder)
            .forEach(order => {
                (order.items || []).forEach(item => {
                    const key = item.sku || item.productId || item.name;
                    if (!productMap.has(key)) {
                        productMap.set(key, {
                            key,
                            name: item.name || 'Sản phẩm',
                            sku: item.sku || '',
                            quantity: 0,
                            revenue: 0
                        });
                    }
                    const current = productMap.get(key);
                    current.quantity += Number(item.quantity || 0);
                    current.revenue += Number(item.subtotal || 0);
                });
            });

        return Array.from(productMap.values()).sort((left, right) => {
            if (right.quantity !== left.quantity) {
                return right.quantity - left.quantity;
            }
            return right.revenue - left.revenue;
        });
    }

    function normalizeOrderStatusClass(status) {
        const value = normalizeText(status);
        if (value.includes('cho xac nhan')) return 'pending';
        if (value.includes('dang chuan bi')) return 'preparing';
        if (value.includes('dang giao')) return 'shipping';
        if (value.includes('da giao')) return 'delivered';
        if (value.includes('da huy')) return 'cancelled';
        if (value.includes('doi tra') || value.includes('hoan')) return 'return';
        return 'closed';
    }

    function renderStaffOrdersPanel() {
        const panel = document.getElementById('staff-orders-panel');
        if (!panel) {
            return;
        }

        const orders = getWorkspaceOrders();
        if (!orders.length) {
            panel.innerHTML = '<div class="workspace-empty">Chưa có đơn hàng nào để nhân viên xử lý.</div>';
            return;
        }

        const statusOptions = ['Chờ xác nhận', 'Đang chuẩn bị', 'Đang giao', 'Đã giao', 'Đã hủy'];
        panel.innerHTML = `
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Danh sách đơn hàng</h3>
                        <p class="customer-card-meta">Nhân viên có thể theo dõi đơn mới, cập nhật trạng thái và hỗ trợ xử lý hủy / đổi trả ngay tại đây.</p>
                    </div>
                    <span class="workspace-chip">${orders.length} đơn</span>
                </div>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Ngày tạo</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Xử lý nhanh</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>
                                    <strong>${escapeHtml(order.code)}</strong>
                                    <div class="customer-card-meta">${escapeHtml(order.voucherCode || 'Không áp mã')}</div>
                                </td>
                                <td>
                                    <strong>${escapeHtml(order.customer?.name || order.address?.recipient || 'Khách lẻ')}</strong>
                                    <div class="customer-card-meta">${escapeHtml(order.customer?.phone || order.address?.phone || '')}</div>
                                </td>
                                <td>${escapeHtml(formatDateTimeDisplay(order.createdAt))}</td>
                                <td><strong>${formatCurrency(order.total)}</strong></td>
                                <td>
                                    <select class="workspace-inline-select" data-order-status-select data-order-id="${escapeHtml(order.id)}">
                                        ${statusOptions.map(status => `<option value="${escapeHtml(status)}" ${status === order.status ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}
                                    </select>
                                </td>
                                <td>
                                    <div class="workspace-row-actions">
                                        <button class="secondary-btn text-bold" type="button" data-order-action="request-return" data-order-id="${escapeHtml(order.id)}">Đổi trả</button>
                                        <button class="secondary-btn text-bold" type="button" data-order-action="cancel-order" data-order-id="${escapeHtml(order.id)}">Hủy đơn</button>
                                    </div>
                                    ${order.supportRequest ? `<div class="customer-card-meta">Yêu cầu: ${escapeHtml(order.supportRequest)} · ${escapeHtml(order.supportStatus || 'Mới tạo')}</div>` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderStaffOrdersPanel = function renderStaffOrdersPanel() {
        const panel = document.getElementById('staff-orders-panel');
        if (!panel) {
            return;
        }

        const state = getWorkspaceState();
        const allOrders = getWorkspaceOrders();
        const orders = filterStaffOrders(allOrders);
        const today = formatDateInputValue(new Date());
        const statusOptions = ['Chờ xác nhận', 'Đang chuẩn bị', 'Đang giao', 'Đã giao', 'Đã hủy'];

        panel.innerHTML = `
            <div class="workspace-table-card order-filter-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Tìm và lọc đơn hàng</h3>
                        <p class="customer-card-meta">Tìm theo mã đơn, khách hàng, số điện thoại hoặc voucher; lọc theo ngày tạo và trạng thái.</p>
                    </div>
                    <span class="workspace-chip">${orders.length}/${allOrders.length} đơn</span>
                </div>
                <div class="workspace-toolbar order-toolbar">
                    <div class="workspace-toolbar-search form-group">
                        <label for="staff-order-search-input">Tìm kiếm đơn hàng</label>
                        <input id="staff-order-search-input" class="workspace-inline-input" type="search" value="${escapeHtml(state.staffOrderSearchQuery || '')}" placeholder="Nhập mã đơn / khách hàng / SĐT / voucher">
                    </div>
                    <div class="workspace-toolbar-inline order-toolbar-inline">
                        <div class="form-group">
                            <label for="staff-order-status-filter">Trạng thái</label>
                            <select id="staff-order-status-filter" class="workspace-inline-select">
                                <option value="all">Tất cả trạng thái</option>
                                ${statusOptions.map(status => `<option value="${escapeHtml(status)}" ${normalizeText(state.staffOrderStatusFilter || 'all') === normalizeText(status) ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="staff-order-start-date">Từ ngày</label>
                            <input id="staff-order-start-date" class="workspace-inline-input" type="date" max="${today}" value="${escapeHtml(state.staffOrderStartDate || '')}">
                        </div>
                        <div class="form-group">
                            <label for="staff-order-end-date">Đến ngày</label>
                            <input id="staff-order-end-date" class="workspace-inline-input" type="date" max="${today}" value="${escapeHtml(state.staffOrderEndDate || '')}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Danh sách đơn hàng</h3>
                        <p class="customer-card-meta">Nhân viên có thể theo dõi đơn mới, cập nhật trạng thái và hỗ trợ xử lý hủy / đổi trả ngay tại đây.</p>
                    </div>
                    <span class="workspace-chip">${orders.length} đơn</span>
                </div>
                ${orders.length ? `
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Ngày tạo</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Xử lý nhanh</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td>
                                        <strong>${escapeHtml(order.code)}</strong>
                                        <div class="customer-card-meta">${escapeHtml(order.voucherCode || 'Không áp mã')}</div>
                                    </td>
                                    <td>
                                        <strong>${escapeHtml(order.customer?.name || order.address?.recipient || 'Khách lẻ')}</strong>
                                        <div class="customer-card-meta">${escapeHtml(order.customer?.phone || order.address?.phone || '')}</div>
                                    </td>
                                    <td>${escapeHtml(formatDateTimeDisplay(order.createdAt))}</td>
                                    <td>
                                        <strong>${formatCurrency(order.total)}</strong>
                                        <div class="customer-card-meta">${escapeHtml(order.paymentStatus || PAYMENT_STATUS_PENDING_COD)}</div>
                                        ${order.paidAt ? `<div class="customer-card-meta">Thu tiền: ${escapeHtml(formatDateTimeDisplay(order.paidAt))}</div>` : ''}
                                    </td>
                                    <td>
                                        <select class="workspace-inline-select" data-order-status-select data-order-id="${escapeHtml(order.id)}">
                                            ${statusOptions.map(status => `<option value="${escapeHtml(status)}" ${normalizeText(status) === normalizeText(order.status) ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}
                                        </select>
                                    </td>
                                    <td>
                                        <div class="workspace-row-actions">
                                            ${normalizeText(order.status) === 'da giao' && !isOrderPaymentConfirmed(order) ? `<button class="login-submit-btn text-bold" type="button" data-order-action="confirm-cod-payment" data-order-id="${escapeHtml(order.id)}">Xác nhận đã thu tiền</button>` : ''}
                                            <button class="secondary-btn text-bold" type="button" data-order-action="request-return" data-order-id="${escapeHtml(order.id)}">Đổi trả</button>
                                            <button class="secondary-btn text-bold" type="button" data-order-action="cancel-order" data-order-id="${escapeHtml(order.id)}">Hủy đơn</button>
                                        </div>
                                        ${order.supportRequest ? `<div class="customer-card-meta">Yêu cầu: ${escapeHtml(order.supportRequest)} · ${escapeHtml(order.supportStatus || 'Mới tạo')}</div>` : ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<div class="workspace-empty">Không có đơn hàng phù hợp với bộ lọc hiện tại.</div>'}
            </div>
        `;
        repairTextNodes(panel);
    };

    function renderCategoriesPanel() {
        const panel = document.getElementById('categories-mgmt-panel');
        if (!panel) {
            return;
        }

        const state = getWorkspaceState();
        const categories = getManagedCategories();
        const editing = categories.find(category => category.id === state.editingCategoryId) || null;

        panel.innerHTML = `
            <div class="workspace-grid">
                <div class="workspace-table-card">
                    <div class="workspace-card-head">
                        <div>
                            <h3>Danh mục sản phẩm</h3>
                            <p class="customer-card-meta">Nhân viên có thể thêm, sửa hoặc ẩn danh mục để quản lý nội bộ.</p>
                        </div>
                        <span class="workspace-chip">${categories.length} danh mục</span>
                    </div>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Môn</th>
                                <th>Nhóm danh mục</th>
                                <th>Số sản phẩm</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categories.map(category => `
                                <tr>
                                    <td>${escapeHtml(category.sport || '')}</td>
                                    <td>${escapeHtml(category.label || '')}</td>
                                    <td>${Number(category.count || 0)}</td>
                                    <td><span class="workspace-chip">${escapeHtml(category.status || 'Đang dùng')}</span></td>
                                    <td>
                                        <div class="workspace-row-actions">
                                            <button class="secondary-btn text-bold" type="button" data-category-action="edit" data-category-id="${escapeHtml(category.id)}">Sửa</button>
                                            <button class="cart-text-btn danger" type="button" data-category-action="delete" data-category-id="${escapeHtml(category.id)}">Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <aside class="workspace-side-card">
                    <form id="category-form" class="workspace-form">
                        <div class="workspace-side-head">
                            <h3>${editing ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</h3>
                            <button id="reset-category-form" class="cart-text-btn secondary" type="button">Làm mới</button>
                        </div>
                        <input id="category-id" type="hidden" value="${escapeHtml(editing?.id || '')}">
                        <div class="form-grid compact-grid">
                            <div class="form-group">
                                <label class="text-14" for="category-sport">Môn thể thao</label>
                                <input id="category-sport" type="text" value="${escapeHtml(editing?.sport || '')}" required>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="category-label">Tên danh mục</label>
                                <input id="category-label" type="text" value="${escapeHtml(editing?.label || '')}" required>
                            </div>
                            <div class="form-group form-group-full">
                                <label class="text-14" for="category-status">Trạng thái</label>
                                <select id="category-status">
                                    <option value="Đang dùng" ${editing?.status === 'Đang dùng' ? 'selected' : ''}>Đang dùng</option>
                                    <option value="Tạm ẩn" ${editing?.status === 'Tạm ẩn' ? 'selected' : ''}>Tạm ẩn</option>
                                </select>
                            </div>
                        </div>
                        <button class="login-submit-btn text-bold" type="submit">${editing ? 'Lưu thay đổi' : 'Thêm danh mục'}</button>
                    </form>
                    <div class="workspace-side-divider"></div>
                    <section class="workspace-form workspace-mini-panel">
                        <div class="workspace-side-head">
                            <h3>Thiết lập trang chủ</h3>
                            <span class="workspace-chip">${isHomeShowcaseEnabled() ? 'Đang hiển thị' : 'Đang ẩn'}</span>
                        </div>
                        <p class="customer-card-meta">Quản lí có thể ẩn hoặc hiện khung Special Sale ở trang chủ. Khi tắt khung này, các phần bên dưới sẽ tự động dồn lên.</p>
                        <button
                            class="secondary-btn text-bold"
                            type="button"
                            data-home-showcase-toggle="${isHomeShowcaseEnabled() ? 'hide' : 'show'}"
                        >
                            ${isHomeShowcaseEnabled() ? 'Ẩn khung Special Sale' : 'Hiện khung Special Sale'}
                        </button>
                    </section>
                </aside>
            </div>
        `;
        repairRenderedContent();
    }

    renderCategoriesPanel = function renderCategoriesPanel() {
        const panel = document.getElementById('categories-mgmt-panel');
        if (!panel) {
            return;
        }

        const state = getWorkspaceState();
        const allCategories = getManagedCategories();
        const categories = filterStaffCategories(allCategories);
        const editing = allCategories.find(category => category.id === state.editingCategoryId) || null;
        const uniqueSports = [...new Set(allCategories.map(category => String(category.sport || '').trim()).filter(Boolean))]
            .sort((left, right) => left.localeCompare(right, 'vi'));
        const uniqueLabels = [...new Set(allCategories.map(category => String(category.label || '').trim()).filter(Boolean))]
            .sort((left, right) => left.localeCompare(right, 'vi'));
        const uniqueStatuses = [...new Set(allCategories.map(category => String(category.status || 'Đang dùng').trim()).filter(Boolean))]
            .sort((left, right) => left.localeCompare(right, 'vi'));

        panel.innerHTML = `
            <div class="workspace-grid">
                <div class="workspace-table-card">
                    <div class="workspace-card-head">
                        <div>
                            <h3>Danh mục sản phẩm</h3>
                            <p class="customer-card-meta">Nhân viên có thể thêm, sửa hoặc ẩn danh mục để quản lý nội bộ.</p>
                        </div>
                        <span class="workspace-chip">${categories.length}/${allCategories.length} danh mục</span>
                    </div>
                    <div class="workspace-toolbar category-toolbar">
                        <div class="workspace-toolbar-search form-group">
                            <label for="staff-category-search-input">Tìm kiếm danh mục</label>
                            <input id="staff-category-search-input" class="workspace-inline-input" type="search" value="${escapeHtml(state.staffCategorySearchQuery || '')}" placeholder="Nhập môn / tên danh mục / trạng thái">
                        </div>
                        <div class="workspace-toolbar-inline category-toolbar-inline">
                            <div class="form-group">
                                <label for="staff-category-sport-filter">Môn</label>
                                <select id="staff-category-sport-filter" class="workspace-inline-select">
                                    <option value="all">Tất cả môn</option>
                                    ${uniqueSports.map(sport => `<option value="${escapeHtml(sport)}" ${normalizeText(state.staffCategorySportFilter || 'all') === normalizeText(sport) ? 'selected' : ''}>${escapeHtml(sport)}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="staff-category-label-filter">Danh mục</label>
                                <select id="staff-category-label-filter" class="workspace-inline-select">
                                    <option value="all">Tất cả danh mục</option>
                                    ${uniqueLabels.map(label => `<option value="${escapeHtml(label)}" ${normalizeText(state.staffCategoryLabelFilter || 'all') === normalizeText(label) ? 'selected' : ''}>${escapeHtml(label)}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="staff-category-status-filter">Trạng thái</label>
                                <select id="staff-category-status-filter" class="workspace-inline-select">
                                    <option value="all">Tất cả trạng thái</option>
                                    ${uniqueStatuses.map(status => `<option value="${escapeHtml(status)}" ${normalizeText(state.staffCategoryStatusFilter || 'all') === normalizeText(status) ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                    ${categories.length ? `
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Môn</th>
                                    <th>Nhóm danh mục</th>
                                    <th>Số sản phẩm</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${categories.map(category => `
                                    <tr>
                                        <td>${escapeHtml(category.sport || '')}</td>
                                        <td>${escapeHtml(category.label || '')}</td>
                                        <td>${Number(category.count || 0)}</td>
                                        <td><span class="workspace-chip">${escapeHtml(category.status || 'Đang dùng')}</span></td>
                                        <td>
                                            <div class="workspace-row-actions">
                                                <button class="secondary-btn text-bold" type="button" data-category-action="edit" data-category-id="${escapeHtml(category.id)}">Sửa</button>
                                                <button class="cart-text-btn danger" type="button" data-category-action="delete" data-category-id="${escapeHtml(category.id)}">Xóa</button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : '<div class="workspace-empty">Không có danh mục phù hợp với bộ lọc hiện tại.</div>'}
                </div>
                <aside class="workspace-side-card">
                    <form id="category-form" class="workspace-form">
                        <div class="workspace-side-head">
                            <h3>${editing ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</h3>
                            <button id="reset-category-form" class="cart-text-btn secondary" type="button">Làm mới</button>
                        </div>
                        <input id="category-id" type="hidden" value="${escapeHtml(editing?.id || '')}">
                        <div class="form-grid compact-grid">
                            <div class="form-group">
                                <label class="text-14" for="category-sport">Môn thể thao</label>
                                <input id="category-sport" type="text" value="${escapeHtml(editing?.sport || '')}" required>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="category-label">Tên danh mục</label>
                                <input id="category-label" type="text" value="${escapeHtml(editing?.label || '')}" required>
                            </div>
                            <div class="form-group form-group-full">
                                <label class="text-14" for="category-status">Trạng thái</label>
                                <select id="category-status">
                                    <option value="Đang dùng" ${normalizeText(editing?.status || 'Đang dùng') === 'dang dung' ? 'selected' : ''}>Đang dùng</option>
                                    <option value="Tạm ẩn" ${normalizeText(editing?.status || '') === 'tam an' ? 'selected' : ''}>Tạm ẩn</option>
                                </select>
                            </div>
                        </div>
                        <button class="login-submit-btn text-bold" type="submit">${editing ? 'Lưu thay đổi' : 'Thêm danh mục'}</button>
                    </form>
                    <div class="workspace-side-divider"></div>
                    <section class="workspace-form workspace-mini-panel">
                        <div class="workspace-side-head">
                            <h3>Thiết lập trang chủ</h3>
                            <span class="workspace-chip">${isHomeShowcaseEnabled() ? 'Đang hiển thị' : 'Đang ẩn'}</span>
                        </div>
                        <p class="customer-card-meta">Quản lí có thể ẩn hoặc hiện khung Special Sale ở trang chủ. Khi tắt khung này, các phần bên dưới sẽ tự động dồn lên.</p>
                        <button
                            class="secondary-btn text-bold"
                            type="button"
                            data-home-showcase-toggle="${isHomeShowcaseEnabled() ? 'hide' : 'show'}"
                        >
                            ${isHomeShowcaseEnabled() ? 'Ẩn khung Special Sale' : 'Hiện khung Special Sale'}
                        </button>
                    </section>
                </aside>
            </div>
        `;
        repairTextNodes(panel);
    };

    function renderReturnsPanel() {
        const panel = document.getElementById('returns-mgmt-panel');
        if (!panel) {
            return;
        }

        const orders = getWorkspaceOrders().filter(order => order.supportRequest || normalizeText(order.status) === 'da huy');
        if (!orders.length) {
            panel.innerHTML = '<div class="workspace-empty">Hiện chưa có yêu cầu đổi trả hoặc hủy đơn nào cần xử lý.</div>';
            return;
        }

        panel.innerHTML = `
            <div class="workspace-cards">
                ${orders.map(order => `
                    <article class="workspace-card">
                        <div class="workspace-card-head">
                            <div>
                                <h3>${escapeHtml(order.code)}</h3>
                                <p class="customer-card-meta">${escapeHtml(order.customer?.name || order.address?.recipient || 'Khách hàng')} · ${escapeHtml(formatDateTimeDisplay(order.createdAt))}</p>
                            </div>
                            <span class="status-pill ${normalizeOrderStatusClass(order.supportRequest || order.status)}">${escapeHtml(order.supportRequest || order.status)}</span>
                        </div>
                        <p class="customer-card-note">${escapeHtml(order.supportNote || 'Nhân viên có thể ghi nhận hủy đơn hoặc đánh dấu xử lý đổi trả tại đây.')}</p>
                        <div class="workspace-row-actions">
                            <button class="secondary-btn text-bold" type="button" data-return-action="processing" data-order-id="${escapeHtml(order.id)}">Đang xử lý</button>
                            <button class="secondary-btn text-bold" type="button" data-return-action="resolved" data-order-id="${escapeHtml(order.id)}">Hoàn tất</button>
                            <button class="cart-text-btn danger" type="button" data-return-action="clear" data-order-id="${escapeHtml(order.id)}">Xóa yêu cầu</button>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }

    function renderReviewsPanel() {
        const panel = document.getElementById('reviews-mgmt-panel');
        if (!panel) {
            return;
        }

        const state = getWorkspaceState();
        const allReviews = getManagedReviews();
        const reviews = filterStaffReviews(allReviews);
        const reviewProducts = allReviews.map(review => getReviewProduct(review));
        const uniqueCategories = getUniqueValues(reviewProducts
            .map(product => sanitizeProductText(product.danh_muc || getCanonicalSportFromProduct(product)).trim())
            .filter(Boolean))
            .sort((left, right) => left.localeCompare(right, 'vi'));
        const uniqueTypes = getUniqueValues(reviewProducts
            .map(product => getReviewProductTypeLabel(product))
            .filter(Boolean))
            .sort((left, right) => left.localeCompare(right, 'vi'));
        const uniqueStatuses = getUniqueValues(allReviews
            .map(review => sanitizeProductText(review.status || 'Hiển thị').trim())
            .filter(Boolean))
            .sort((left, right) => left.localeCompare(right, 'vi'));
        panel.innerHTML = `
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Quản lý đánh giá</h3>
                        <p class="customer-card-meta">Tìm theo sản phẩm, khách đánh giá hoặc nội dung; lọc theo danh mục, loại sản phẩm, điểm và trạng thái.</p>
                    </div>
                    <span class="workspace-chip">${reviews.length}/${allReviews.length} đánh giá</span>
                </div>
                <div class="workspace-toolbar review-toolbar">
                    <div class="workspace-toolbar-search form-group">
                        <label for="staff-review-search-input">Tìm kiếm đánh giá</label>
                        <input id="staff-review-search-input" class="workspace-inline-input" type="search" value="${escapeHtml(state.staffReviewSearchQuery || '')}" placeholder="Nhập sản phẩm / khách / nội dung đánh giá">
                    </div>
                    <div class="workspace-toolbar-inline review-toolbar-inline">
                        <div class="form-group">
                            <label for="staff-review-category-filter">Danh mục</label>
                            <select id="staff-review-category-filter" class="workspace-inline-select">
                                <option value="all">Tất cả danh mục</option>
                                ${uniqueCategories.map(category => `<option value="${escapeHtml(category)}" ${normalizeText(state.staffReviewCategoryFilter || 'all') === normalizeText(category) ? 'selected' : ''}>${escapeHtml(category)}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="staff-review-type-filter">Loại sản phẩm</label>
                            <select id="staff-review-type-filter" class="workspace-inline-select">
                                <option value="all">Tất cả loại sản phẩm</option>
                                ${uniqueTypes.map(type => `<option value="${escapeHtml(type)}" ${normalizeText(state.staffReviewTypeFilter || 'all') === normalizeText(type) ? 'selected' : ''}>${escapeHtml(type)}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="staff-review-rating-filter">Điểm</label>
                            <select id="staff-review-rating-filter" class="workspace-inline-select">
                                <option value="all">Tất cả điểm</option>
                                ${[5, 4, 3, 2, 1].map(rating => `<option value="${rating}" ${String(state.staffReviewRatingFilter || 'all') === String(rating) ? 'selected' : ''}>${rating} sao</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="staff-review-status-filter">Trạng thái</label>
                            <select id="staff-review-status-filter" class="workspace-inline-select">
                                <option value="all">Tất cả trạng thái</option>
                                ${uniqueStatuses.map(status => `<option value="${escapeHtml(status)}" ${normalizeText(state.staffReviewStatusFilter || 'all') === normalizeText(status) ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                ${reviews.length ? `
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Danh mục</th>
                                <th>Loại</th>
                                <th>Khách đánh giá</th>
                                <th>Điểm</th>
                                <th>Nội dung</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reviews.map(review => {
                                const product = getReviewProduct(review);
                                return `
                                    <tr>
                                        <td>${escapeHtml(product.ten_san_pham || 'Sản phẩm đã ẩn')}</td>
                                        <td>${escapeHtml(product.danh_muc || getCanonicalSportFromProduct(product) || 'Không rõ')}</td>
                                        <td>${escapeHtml(getReviewProductTypeLabel(product) || 'Không rõ')}</td>
                                        <td>${escapeHtml(review.reviewer || 'Khách hàng')}</td>
                                        <td>${'★'.repeat(Math.max(0, Math.min(5, Number(review.rating || 0))))}</td>
                                        <td>${escapeHtml(review.content || '')}</td>
                                        <td><span class="workspace-chip">${escapeHtml(review.status || 'Hiển thị')}</span></td>
                                        <td>
                                            <div class="workspace-row-actions">
                                                <button class="secondary-btn text-bold" type="button" data-review-action="toggle" data-review-id="${escapeHtml(review.id)}">${review.status === 'Hiển thị' ? 'Ẩn' : 'Hiển thị'}</button>
                                                <button class="cart-text-btn danger" type="button" data-review-action="delete" data-review-id="${escapeHtml(review.id)}">Xóa</button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                ` : '<div class="workspace-empty">Không có đánh giá phù hợp với bộ lọc hiện tại.</div>'}
            </div>
        `;
        repairTextNodes(panel);
    }

    function renderSupportManagementPanel() {
        const panel = document.getElementById('support-mgmt-panel');
        if (!panel) {
            return;
        }

        captureSupportComposerState();

        const threads = getSupportThreads().filter(thread => hasCustomerSupportMessage(thread) && isCustomerSupportThread(thread));
        const state = getWorkspaceState();
        if (!threads.length) {
            panel.innerHTML = '<div class="workspace-empty">Chưa có khách hàng nào gửi tin nhắn hỗ trợ. Khi khách hàng đăng nhập và nhắn tin, hệ thống sẽ tạo một cuộc trò chuyện riêng cho tài khoản đó.</div>';
            repairTextNodes(panel);
            return;
        }

        const searchQuery = normalizeText(state.supportThreadSearchQuery || '');
        const visibleThreads = searchQuery
            ? threads.filter(thread => getSupportThreadSearchTarget(thread).includes(searchQuery))
            : threads;
        const activeThread = visibleThreads.find(thread => thread.id === state.activeSupportThreadId)
            || threads.find(thread => thread.id === state.activeSupportThreadId)
            || visibleThreads[0]
            || threads[0];
        state.activeSupportThreadId = activeThread?.id || '';
        const activeCustomerName = getSupportThreadCustomerName(activeThread);
        const activeCustomerContact = [activeThread.customer?.email, activeThread.customer?.phone]
            .filter(Boolean)
            .join(' · ');

        panel.innerHTML = `
            <div class="support-message-page">
                <aside class="support-sidebar">
                    <div class="support-sidebar-head">
                        <div>
                            <p class="section-eyebrow">Hỗ trợ khách hàng</p>
                            <h3>Đoạn chat</h3>
                        </div>
                        <span class="workspace-chip">${visibleThreads.length}/${threads.length}</span>
                    </div>
                    <div class="support-thread-search">
                        <span aria-hidden="true">⌕</span>
                        <input id="support-thread-search-input" type="search" value="${escapeHtml(state.supportThreadSearchQuery || '')}" placeholder="Tìm tên, email, tài khoản...">
                    </div>
                    <div class="support-thread-list">
                        ${visibleThreads.length ? visibleThreads.map(thread => {
                            const isActive = thread.id === activeThread.id;
                            return `
                                <button class="support-thread-item ${isActive ? 'active' : ''}" type="button" data-support-thread="${escapeHtml(thread.id)}">
                                    <span class="support-thread-avatar">${escapeHtml(getSupportThreadInitials(thread))}</span>
                                    <span class="support-thread-summary">
                                        <span class="support-thread-name">${escapeHtml(getSupportThreadCustomerName(thread))}</span>
                                        <span class="support-thread-preview">${escapeHtml(getSupportThreadPreview(thread))}</span>
                                        <span class="support-thread-meta">Tài khoản: ${escapeHtml(thread.accountKey)} · ${escapeHtml(formatDateTimeDisplay(thread.updatedAt))}</span>
                                    </span>
                                    <span class="support-thread-status">${escapeHtml(thread.status)}</span>
                                </button>
                            `;
                        }).join('') : '<div class="workspace-empty compact">Không tìm thấy cuộc trò chuyện phù hợp.</div>'}
                    </div>
                </aside>
                <section class="support-conversation">
                    <header class="support-conversation-head">
                        <div class="support-conversation-profile">
                            <span class="support-thread-avatar large">${escapeHtml(getSupportThreadInitials(activeThread))}</span>
                            <div>
                                <h3>${escapeHtml(activeCustomerName)}</h3>
                                <p class="customer-card-meta">${escapeHtml(activeCustomerContact || activeThread.accountKey || 'Tài khoản khách hàng')}</p>
                            </div>
                        </div>
                        <select id="support-thread-status" class="workspace-inline-select" data-support-thread-status>
                            <option value="Đang mở" ${activeThread.status === 'Đang mở' ? 'selected' : ''}>Đang mở</option>
                            <option value="Đang xử lý" ${activeThread.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                            <option value="Đã đóng" ${activeThread.status === 'Đã đóng' ? 'selected' : ''}>Đã đóng</option>
                        </select>
                    </header>
                    <div class="support-conversation-body">
                        ${activeThread.messages.map(message => `
                            <article class="support-message ${message.sender === 'staff' ? 'staff' : 'customer'}">
                                <div>${escapeHtml(message.text)}</div>
                                <small>${escapeHtml(formatDateTimeDisplay(message.createdAt))}</small>
                            </article>
                        `).join('')}
                    </div>
                    <form id="support-staff-form" class="support-composer">
                        <input id="support-thread-id" type="hidden" value="${escapeHtml(activeThread.id)}">
                        <textarea id="support-staff-input" rows="3" placeholder="Nhập nội dung phản hồi cho khách hàng..." required></textarea>
                        <button class="login-submit-btn text-bold" type="submit">Gửi phản hồi</button>
                    </form>
                </section>
            </div>
        `;
        repairTextNodes(panel);
        const supportStaffInput = document.getElementById('support-staff-input');
        if (supportStaffInput) {
            supportStaffInput.value = getSupportReplyDraft(activeThread.id);
        }
        restoreSupportComposerState(activeThread.id);
    }

    function renderCustomersPanel() {
        const panel = document.getElementById('customers-mgmt-panel');
        if (!panel) {
            return;
        }

        const customers = getCustomerSummaries();
        if (!customers.length) {
            panel.innerHTML = '<div class="workspace-empty">Chưa có dữ liệu khách hàng để thống kê.</div>';
            return;
        }

        panel.innerHTML = `
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Thông tin khách hàng</h3>
                        <p class="customer-card-meta">Tổng hợp từ đơn hàng, sổ địa chỉ và danh sách tài khoản đang có trên frontend demo.</p>
                    </div>
                    <span class="workspace-chip">${customers.length} khách hàng</span>
                </div>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Khách hàng</th>
                            <th>Liên hệ</th>
                            <th>Đơn hàng</th>
                            <th>Tổng chi tiêu</th>
                            <th>Địa chỉ mặc định</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customers.map(customer => `
                            <tr>
                                <td>
                                    <strong>${escapeHtml(customer.name || customer.username || 'Khách hàng')}</strong>
                                    <div class="customer-card-meta">${escapeHtml(customer.status || 'Hoạt động')}</div>
                                </td>
                                <td>${escapeHtml([customer.phone, customer.email].filter(Boolean).join(' · ') || 'Chưa cập nhật')}</td>
                                <td>${Number(customer.orderCount || 0)}</td>
                                <td><strong>${formatCurrency(customer.totalSpent || 0)}</strong></td>
                                <td>${escapeHtml(customer.defaultAddress || 'Chưa cập nhật')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderStatsPanel() {
        const panel = document.getElementById('stats-mgmt-panel');
        if (!panel) {
            return;
        }

        const state = getStatsFilterState();
        const orders = getOrdersInStatsRange();
        const revenueOrders = orders.filter(isRevenueOrder);
        const revenue = revenueOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
        const averageOrder = revenueOrders.length ? revenue / revenueOrders.length : 0;
        const deliveredOrders = orders.filter(order => normalizeText(order.status) === 'da giao').length;
        const cancelledOrders = orders.filter(order => normalizeText(order.status) === 'da huy').length;
        const behaviorOverviewMarkup = adminBehaviorOverviewError
            ? `
                <div class="workspace-card">
                    <div class="workspace-card-head">
                        <div>
                            <h3>Phân tích hành vi người dùng</h3>
                            <p class="customer-card-meta">Tổng hợp lượt xem, tìm kiếm, thêm giỏ, mua hàng, đánh giá và thời gian ở lại trên từng trang.</p>
                        </div>
                        <span class="workspace-chip">0 sự kiện</span>
                    </div>
                    <div class="workspace-empty">${escapeHtml(adminBehaviorOverviewError)}</div>
                </div>
            `
            : adminBehaviorOverview
                ? `
                    <div class="workspace-card">
                        <div class="workspace-card-head">
                            <div>
                                <h3>Phân tích hành vi người dùng</h3>
                                <p class="customer-card-meta">Tổng hợp lượt xem, tìm kiếm, thêm giỏ, mua hàng, đánh giá và thời gian ở lại trên từng trang.</p>
                            </div>
                            <span class="workspace-chip">${Number(adminBehaviorOverview.totalEvents || 0)} sự kiện</span>
                        </div>
                        <div class="workspace-metric-grid">
                            <article class="workspace-metric-card">
                                <div class="metric-label">Người dùng hoạt động</div>
                                <div class="metric-value">${Number(adminBehaviorOverview.uniqueUsers || 0)}</div>
                                <div class="metric-note">${Number(adminBehaviorOverview.totalSearches || 0)} lượt tìm kiếm</div>
                            </article>
                            <article class="workspace-metric-card">
                                <div class="metric-label">Lượt xem / thêm giỏ</div>
                                <div class="metric-value">${Number(adminBehaviorOverview.totalProductViews || 0)} / ${Number(adminBehaviorOverview.totalCartAdds || 0)}</div>
                                <div class="metric-note">${Number(adminBehaviorOverview.totalPurchases || 0)} lượt mua</div>
                            </article>
                            <article class="workspace-metric-card">
                                <div class="metric-label">Đánh giá / thời gian TB</div>
                                <div class="metric-value">${Number(adminBehaviorOverview.totalReviews || 0)} / ${Number(adminBehaviorOverview.averageStaySeconds || 0)}s</div>
                                <div class="metric-note">Dựa trên dữ liệu hành vi đã ghi nhận</div>
                            </article>
                        </div>
                        <div class="workspace-grid">
                            <div class="workspace-card">
                                <div class="workspace-card-head">
                                    <h3>Danh mục được quan tâm</h3>
                                </div>
                                ${adminBehaviorOverview.topCategories?.length ? `
                                    <ul class="workspace-simple-list">
                                        ${adminBehaviorOverview.topCategories.slice(0, 6).map(item => `
                                            <li><span>${escapeHtml(item.label || 'Không rõ')}</span><strong>${Number(item.value ?? item.score ?? 0)}</strong></li>
                                        `).join('')}
                                    </ul>
                                ` : '<div class="workspace-empty">Chưa đủ dữ liệu để xếp hạng danh mục.</div>'}
                            </div>
                            <div class="workspace-card">
                                <div class="workspace-card-head">
                                    <h3>Từ khóa tìm kiếm nổi bật</h3>
                                </div>
                                ${adminBehaviorOverview.topKeywords?.length ? `
                                    <ul class="workspace-simple-list">
                                        ${adminBehaviorOverview.topKeywords.slice(0, 6).map(item => `
                                            <li><span>${escapeHtml(item.label || 'Không rõ')}</span><strong>${Number(item.value ?? item.score ?? 0)}</strong></li>
                                        `).join('')}
                                    </ul>
                                ` : '<div class="workspace-empty">Chưa đủ dữ liệu từ khóa tìm kiếm.</div>'}
                            </div>
                            <div class="workspace-card">
                                <div class="workspace-card-head">
                                    <h3>Khoảng giá được quan tâm</h3>
                                </div>
                                ${adminBehaviorOverview.topPriceBuckets?.length ? `
                                    <ul class="workspace-simple-list">
                                        ${adminBehaviorOverview.topPriceBuckets.slice(0, 6).map(item => `
                                            <li><span>${escapeHtml(item.label || 'Không rõ')}</span><strong>${Number(item.value ?? item.score ?? 0)}</strong></li>
                                        `).join('')}
                                    </ul>
                                ` : '<div class="workspace-empty">Chưa đủ dữ liệu theo khoảng giá.</div>'}
                            </div>
                        </div>
                    </div>
                `
                : `
                    <div class="workspace-card">
                        <div class="workspace-card-head">
                            <div>
                                <h3>Phân tích hành vi người dùng</h3>
                                <p class="customer-card-meta">Tổng hợp lượt xem, tìm kiếm, thêm giỏ, mua hàng, đánh giá và thời gian ở lại trên từng trang.</p>
                            </div>
                            <span class="workspace-chip">0 sự kiện</span>
                        </div>
                        <div class="workspace-empty">Đang chờ dữ liệu hành vi từ backend.</div>
                    </div>
                `;

        panel.innerHTML = `
            <form id="stats-filter-form" class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Thống kê doanh thu</h3>
                        <p class="customer-card-meta">Chọn mốc thời gian theo ngày, tuần hoặc tháng. Bạn cũng có thể tự nhập ngày bắt đầu và kết thúc.</p>
                    </div>
                    <div class="workspace-row-actions">
                        <select id="stats-preset" class="workspace-inline-select">
                            <option value="day" ${state.statsPreset === 'day' ? 'selected' : ''}>1 ngày</option>
                            <option value="week" ${state.statsPreset === 'week' ? 'selected' : ''}>1 tuần</option>
                            <option value="month" ${state.statsPreset === 'month' ? 'selected' : ''}>1 tháng</option>
                            <option value="custom" ${state.statsPreset === 'custom' ? 'selected' : ''}>Tùy chọn</option>
                        </select>
                        <input id="stats-start-date" class="workspace-inline-select" type="date" max="${normalizeDateInputValue(new Date())}" value="${escapeHtml(state.statsStartDate)}">
                        <input id="stats-end-date" class="workspace-inline-select" type="date" max="${normalizeDateInputValue(new Date())}" value="${escapeHtml(state.statsEndDate)}">
                        <button class="secondary-btn text-bold" type="submit">Áp dụng</button>
                    </div>
                </div>
            </form>
            <div class="workspace-metric-grid">
                <article class="workspace-metric-card">
                    <div class="metric-label">Doanh thu hợp lệ</div>
                    <div class="metric-value">${formatCurrency(revenue)}</div>
                    <div class="metric-note">${revenueOrders.length} đơn được tính doanh thu</div>
                </article>
                <article class="workspace-metric-card">
                    <div class="metric-label">Đơn trong khoảng</div>
                    <div class="metric-value">${orders.length}</div>
                    <div class="metric-note">Bao gồm cả đơn đã hủy</div>
                </article>
                <article class="workspace-metric-card">
                    <div class="metric-label">Giá trị trung bình</div>
                    <div class="metric-value">${formatCurrency(averageOrder)}</div>
                    <div class="metric-note">Trung bình trên mỗi đơn hợp lệ</div>
                </article>
                <article class="workspace-metric-card">
                    <div class="metric-label">Đã giao / đã hủy</div>
                    <div class="metric-value">${deliveredOrders} / ${cancelledOrders}</div>
                    <div class="metric-note">Đếm theo trạng thái đơn trong khoảng đang chọn</div>
                </article>
            </div>
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <h3>Đơn hàng trong khoảng thống kê</h3>
                    <span class="workspace-chip">${orders.length} dòng dữ liệu</span>
                </div>
                ${orders.length ? `
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Ngày</th>
                                <th>Trạng thái</th>
                                <th>Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                                <tr>
                                    <td>${escapeHtml(order.code)}</td>
                                    <td>${escapeHtml(order.customer?.name || order.address?.recipient || 'Khách hàng')}</td>
                                    <td>${escapeHtml(formatDateTimeDisplay(order.createdAt))}</td>
                                    <td><span class="status-pill ${normalizeOrderStatusClass(order.status)}">${escapeHtml(order.status)}</span></td>
                                    <td>${formatCurrency(order.total)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<div class="workspace-empty">Không có đơn hàng nào phù hợp với khoảng thời gian này.</div>'}
            </div>
        `;
        panel.insertAdjacentHTML('beforeend', behaviorOverviewMarkup);
    }

    function renderBestsellerPanel() {
        const panel = document.getElementById('bestseller-mgmt-panel');
        if (!panel) {
            return;
        }

        const bestsellers = getBestSellerRows();
        const behaviorTopProducts = Array.isArray(adminBehaviorOverview?.topProducts) ? adminBehaviorOverview.topProducts : [];
        const behaviorTopProductsMarkup = `
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Sản phẩm được quan tâm nhiều</h3>
                        <p class="customer-card-meta">Xếp hạng theo lượt xem, thêm giỏ, mua hàng và tương tác hành vi tổng hợp.</p>
                    </div>
                    <span class="workspace-chip">${behaviorTopProducts.length} sản phẩm</span>
                </div>
                ${adminBehaviorOverviewError ? `
                    <div class="workspace-empty">${escapeHtml(adminBehaviorOverviewError)}</div>
                ` : behaviorTopProducts.length ? `
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Điểm quan tâm</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${behaviorTopProducts.slice(0, 10).map(item => `
                                <tr>
                                    <td>${escapeHtml(item.label || 'Sản phẩm')}</td>
                                    <td>${Number(item.value ?? item.score ?? 0)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<div class="workspace-empty">Chưa đủ dữ liệu hành vi để xếp hạng sản phẩm quan tâm.</div>'}
            </div>
        `;
        if (!bestsellers.length) {
            panel.innerHTML = `
                <div class="workspace-card">
                    <div class="workspace-empty">Chưa có dữ liệu bán chạy trong khoảng thời gian đang chọn.</div>
                </div>
                ${behaviorTopProductsMarkup}
            `;
            return;
        }
        if (!bestsellers.length) {
            panel.innerHTML = '<div class="workspace-empty">Chưa có dữ liệu bán chạy trong khoảng thời gian đang chọn.</div>';
            return;
        }

        panel.innerHTML = `
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Sản phẩm bán chạy nhất</h3>
                        <p class="customer-card-meta">Bảng này dùng cùng khoảng thời gian với thống kê doanh thu. Cột số lượng là tổng số món đã bán trong các đơn chưa hủy, nên có thể lớn hơn số đơn.</p>
                    </div>
                    <span class="workspace-chip">${bestsellers.length} sản phẩm</span>
                </div>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Sản phẩm</th>
                                <th>Số món đã bán</th>
                                <th>Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bestsellers.slice(0, 15).map(item => `
                            <tr>
                                <td>${escapeHtml(item.sku || '')}</td>
                                <td>${escapeHtml(item.name || 'Sản phẩm')}</td>
                                <td>${Number(item.quantity || 0)}</td>
                                <td>${formatCurrency(item.revenue || 0)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        panel.insertAdjacentHTML('beforeend', `
            <div class="workspace-card">
                <div class="workspace-card-head">
                    <div>
                        <h3>Sản phẩm được quan tâm nhiều</h3>
                        <p class="customer-card-meta">Xếp hạng theo lượt xem, thêm giỏ, mua hàng và tương tác hành vi tổng hợp.</p>
                    </div>
                    <span class="workspace-chip">${behaviorTopProducts.length} sản phẩm</span>
                </div>
                ${adminBehaviorOverviewError ? `
                    <div class="workspace-empty">${escapeHtml(adminBehaviorOverviewError)}</div>
                ` : behaviorTopProducts.length ? `
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Điểm quan tâm</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${behaviorTopProducts.slice(0, 10).map(item => `
                                <tr>
                                    <td>${escapeHtml(item.label || 'Sản phẩm')}</td>
                                    <td>${Number(item.value ?? item.score ?? 0)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<div class="workspace-empty">Chưa đủ dữ liệu hành vi để xếp hạng sản phẩm quan tâm.</div>'}
            </div>
        `);
    }

    function renderVouchersPanel() {
        const panel = document.getElementById('vouchers-mgmt-panel');
        if (!panel) {
            return;
        }

        if (canAccessWorkspace() && promoHuntBackendAvailable && Date.now() - promoHuntManagerSyncedAt > 30000) {
            promoHuntManagerSyncedAt = Date.now();
            void syncPromoHuntCampaignsFromApi({ render: true });
        }

        const state = getWorkspaceState();
        const allVouchers = getManagedVoucherCatalog();
        const voucherUsageStats = getVoucherUsageStatsByCode();
        const categoryFilter = normalizeText(state.managerVoucherCategoryFilter || 'all');
        const statusFilter = String(state.managerVoucherStatusFilter || 'all');
        const vouchers = allVouchers.filter(voucher => {
            const matchesCategory = categoryFilter === 'all'
                || getVoucherCategories(voucher).some(category => normalizeText(category) === categoryFilter);
            const expired = isVoucherExpired(voucher);
            const matchesStatus = statusFilter === 'all'
                || (statusFilter === 'active' && !expired && !isVoucherTemporarilyDisabled(voucher))
                || (statusFilter === 'expired' && expired);
            return matchesCategory && matchesStatus;
        });
        const uniqueVoucherCategories = getUniqueValues(allVouchers.flatMap(voucher => getVoucherCategories(voucher)));
        const editing = allVouchers.find(voucher => voucher.code === state.editingVoucherCode) || null;
        if (isManagerWorkspaceUser() && !state.managerBaseLoaded) {
            void ensureManagerAccountsLoaded().then(() => {
                if (document.getElementById('vouchers-mgmt-panel')) {
                    renderVouchersPanel();
                }
            });
        }
        const customerAccounts = getManagedAccounts().filter(account => !canAccessWorkspace(account));
        const voucherAssignments = pruneExpiredVoucherAssignments(getVoucherAssignmentStore());
        const activeAssignableVouchers = allVouchers.filter(isVoucherUsable);
        const fallbackAssignmentAccountKey = customerAccounts.length ? getAccountKeyForUser(customerAccounts[0]) : '';
        const selectedAssignmentAccountKey = customerAccounts.some(account => getAccountKeyForUser(account) === state.voucherAssignmentAccountKey)
            ? state.voucherAssignmentAccountKey
            : fallbackAssignmentAccountKey;
        state.voucherAssignmentAccountKey = selectedAssignmentAccountKey;
        const selectedAssignment = normalizeVoucherAssignmentEntry(voucherAssignments[selectedAssignmentAccountKey] || { codes: [] }, selectedAssignmentAccountKey);
        const selectedAssignedCodes = Array.isArray(selectedAssignment.codes) ? selectedAssignment.codes : [];
        const selectedAssignedCodeSet = new Set(selectedAssignedCodes);
        const selectedAssignedVouchers = selectedAssignedCodes
            .map(code => allVouchers.find(voucher => voucher.code === code))
            .filter(Boolean);
        const unassignedAssignableVouchers = activeAssignableVouchers.filter(voucher => !selectedAssignedCodeSet.has(voucher.code));
        const promoHuntCampaigns = getPromoHuntCampaigns();
        const promoHuntStartDefault = formatDateTimeLocalInputValue(new Date());
        const promoHuntEndDefault = formatDateTimeLocalInputValue(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

        panel.innerHTML = `
            <div class="workspace-grid">
                <div class="workspace-table-card">
                    <div class="workspace-card-head">
                        <div>
                            <h3>Quản lý ưu đãi</h3>
                            <p class="customer-card-meta">Tạo hoặc chỉnh sửa mã khuyến mãi dùng ngay trong giỏ hàng và bước thanh toán.</p>
                        </div>
                        <span class="workspace-chip">${vouchers.length}/${allVouchers.length} voucher</span>
                    </div>
                    <div class="workspace-filter-grid">
                        <div class="form-group">
                            <label for="manager-voucher-category-filter">Danh mục</label>
                            <select id="manager-voucher-category-filter" class="workspace-inline-select">
                                <option value="all">Tất cả danh mục</option>
                                ${uniqueVoucherCategories.map(category => `<option value="${escapeHtml(category)}" ${categoryFilter === normalizeText(category) ? 'selected' : ''}>${escapeHtml(category)}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="manager-voucher-status-filter">Thời hạn</label>
                            <select id="manager-voucher-status-filter" class="workspace-inline-select">
                                <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>Tất cả ưu đãi</option>
                                <option value="active" ${statusFilter === 'active' ? 'selected' : ''}>Còn thời hạn</option>
                                <option value="expired" ${statusFilter === 'expired' ? 'selected' : ''}>Đã hết hạn</option>
                            </select>
                        </div>
                    </div>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Mô tả</th>
                                <th>Điều kiện</th>
                                <th>L&#432;&#7907;t d&#249;ng</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${vouchers.map(voucher => {
                                const usageStats = voucherUsageStats[String(voucher.code || '').trim().toUpperCase()] || {
                                    granted: 0,
                                    usedCount: 0,
                                    discountTotal: 0,
                                    accountCount: 0
                                };
                                return `
                                    <tr>
                                        <td><strong>${escapeHtml(voucher.code)}</strong></td>
                                        <td>
                                            <strong>${escapeHtml(voucher.label)}</strong>
                                            <p class="voucher-meta">Danh mục: ${escapeHtml(getVoucherCategories(voucher).join(', '))}</p>
                                            <p class="voucher-meta">${voucher.expiresAt ? `Hết hạn: ${escapeHtml(formatDateTimeDisplay(`${voucher.expiresAt}T23:59:59`))}` : 'Không giới hạn hạn dùng'}</p>
                                        </td>
                                        <td>Đơn tối thiểu ${formatCurrency(voucher.minOrder)} · tối đa ${formatCurrency(voucher.maxDiscount)}</td>
                                        <td>
                                            <strong>${Number(usageStats.usedCount || 0)}</strong> l&#432;&#7907;t
                                            <p class="voucher-meta">&#272;&#227; c&#7845;p: ${Number(usageStats.granted || 0)} &middot; TK: ${Number(usageStats.accountCount || 0)}</p>
                                            <p class="voucher-meta">T&#7893;ng gi&#7843;m: ${formatCurrency(usageStats.discountTotal || 0)}</p>
                                        </td>
                                        <td><span class="workspace-chip">${escapeHtml(getVoucherDisplayStatus(voucher))}</span></td>
                                        <td>
                                            <div class="workspace-row-actions">
                                                <button class="secondary-btn text-bold" type="button" data-voucher-action="edit" data-voucher-code="${escapeHtml(voucher.code)}">Sửa</button>
                                                <button class="cart-text-btn danger" type="button" data-voucher-action="delete" data-voucher-code="${escapeHtml(voucher.code)}">Xóa</button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                <aside class="workspace-side-card">
                    <form id="voucher-form" class="workspace-form">
                        <div class="workspace-side-head">
                            <h3>${editing ? 'Cập nhật voucher' : 'Thêm voucher mới'}</h3>
                            <button id="reset-voucher-form" class="cart-text-btn secondary" type="button">Làm mới</button>
                        </div>
                        <input id="voucher-original-code" type="hidden" value="${escapeHtml(editing?.code || '')}">
                        <div class="form-grid compact-grid">
                            <div class="form-group">
                                <label class="text-14" for="voucher-code">Mã voucher</label>
                                <input id="voucher-code" type="text" value="${escapeHtml(editing?.code || '')}" required>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-percent">Giảm (%)</label>
                                <input id="voucher-percent" type="number" min="1" max="100" value="${editing ? Number(editing.percent) * 100 : 10}" required>
                            </div>
                            <div class="form-group form-group-full">
                                <label class="text-14" for="voucher-label">Mô tả</label>
                                <input id="voucher-label" type="text" value="${escapeHtml(editing?.label || '')}" required>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-min-order">Đơn tối thiểu</label>
                                <input id="voucher-min-order" type="number" min="0" step="1000" value="${editing?.minOrder || 0}" required>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-max-discount">Giảm tối đa</label>
                                <input id="voucher-max-discount" type="number" min="0" step="1000" value="${editing?.maxDiscount || 0}" required>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-categories">Danh mục áp dụng</label>
                                <input id="voucher-categories" type="text" value="${escapeHtml(getVoucherCategories(editing || {}).join(', '))}" placeholder="Tất cả hoặc Bóng đá, Cầu lông">
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-expires-at">Ngày hết hạn</label>
                                <input id="voucher-expires-at" type="date" value="${escapeHtml(editing?.expiresAt || '')}">
                            </div>
                            <div class="form-group form-group-full">
                                <label class="text-14" for="voucher-status">Trạng thái</label>
                                <select id="voucher-status">
                                    <option value="Hoạt động" ${editing?.status === 'Hoạt động' ? 'selected' : ''}>Hoạt động</option>
                                    <option value="Tạm khóa" ${editing?.status === 'Tạm khóa' ? 'selected' : ''}>Tạm khóa</option>
                                </select>
                            </div>
                        </div>
                        <button class="login-submit-btn text-bold" type="submit">${editing ? 'Lưu voucher' : 'Thêm voucher'}</button>
                    </form>
                    <section class="voucher-assignment-card">
                        <div class="workspace-side-head">
                            <div>
                                <h3>Cấp voucher cho tài khoản</h3>
                                <p class="customer-card-meta">Khách hàng chỉ thấy và dùng được các mã đã được cấp cho tài khoản của họ.</p>
                            </div>
                        </div>
                        <form id="voucher-assignment-form" class="workspace-form">
                            <div class="form-group">
                                <label class="text-14" for="voucher-assignment-account">Tài khoản khách hàng</label>
                                <select id="voucher-assignment-account" ${customerAccounts.length ? '' : 'disabled'}>
                                    ${customerAccounts.length
                                        ? customerAccounts.map(account => {
                                            const accountKey = getAccountKeyForUser(account);
                                            return `<option value="${escapeHtml(accountKey)}" ${accountKey === selectedAssignmentAccountKey ? 'selected' : ''}>${escapeHtml(getVoucherAssignmentAccountLabel(account))}</option>`;
                                        }).join('')
                                        : '<option value="">Chưa có tài khoản khách hàng</option>'}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-assignment-code">Mã cần cấp</label>
                                <select id="voucher-assignment-code" ${unassignedAssignableVouchers.length && selectedAssignmentAccountKey ? '' : 'disabled'}>
                                    ${unassignedAssignableVouchers.length
                                        ? unassignedAssignableVouchers.map(voucher => `<option value="${escapeHtml(voucher.code)}">${escapeHtml(voucher.code)} - ${escapeHtml(voucher.label || 'Voucher')}</option>`).join('')
                                        : '<option value="">Không còn voucher có thể cấp</option>'}
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="text-14" for="voucher-assignment-quantity">Số lượt cấp</label>
                                <input id="voucher-assignment-quantity" type="number" min="1" max="99" value="1" ${selectedAssignmentAccountKey && unassignedAssignableVouchers.length ? '' : 'disabled'}>
                            </div>
                            <button class="login-submit-btn text-bold" type="submit" ${selectedAssignmentAccountKey && unassignedAssignableVouchers.length ? '' : 'disabled'}>Cấp voucher</button>
                        </form>
                        <div class="voucher-assignment-list">
                            ${selectedAssignmentAccountKey && selectedAssignedVouchers.length
                                ? selectedAssignedVouchers.map(voucher => `
                                    <article class="voucher-assignment-item">
                                        <div>
                                            <strong>${escapeHtml(voucher.code)}</strong>
                                            <p class="voucher-meta">${escapeHtml(voucher.label || 'Voucher')}</p>
                                            <p class="voucher-meta">Còn ${getVoucherUsageForAccount(selectedAssignmentAccountKey, voucher.code).remaining}/${getVoucherUsageForAccount(selectedAssignmentAccountKey, voucher.code).quantity} lượt dùng</p>
                                            <p class="voucher-meta">${voucher.expiresAt ? `Hết hạn: ${escapeHtml(formatDateTimeDisplay(`${voucher.expiresAt}T23:59:59`))}` : 'Không giới hạn hạn dùng'}</p>
                                        </div>
                                        <button class="cart-text-btn danger" type="button" data-voucher-unassign="${escapeHtml(voucher.code)}" data-voucher-account="${escapeHtml(selectedAssignmentAccountKey)}">Thu hồi</button>
                                    </article>
                                `).join('')
                                : '<p class="voucher-assignment-empty">Tài khoản đang chọn chưa được cấp voucher nào.</p>'}
                        </div>
                    </section>
                    <section class="voucher-assignment-card promo-hunt-manager-card">
                        <div class="workspace-side-head">
                            <div>
                                <h3>Gắn vào Săn khuyến mãi</h3>
                                <p class="customer-card-meta">Mỗi chiến dịch có số lượng và khung thời gian riêng. Mỗi tài khoản khách chỉ nhận được một lần.</p>
                            </div>
                        </div>
                        <form id="promo-hunt-form" class="workspace-form">
                            <div class="form-group">
                                <label class="text-14" for="promo-hunt-voucher-code">Voucher săn</label>
                                <select id="promo-hunt-voucher-code" ${activeAssignableVouchers.length ? '' : 'disabled'}>
                                    ${activeAssignableVouchers.length
                                        ? activeAssignableVouchers.map(voucher => `<option value="${escapeHtml(voucher.code)}">${escapeHtml(voucher.code)} - ${escapeHtml(voucher.label || 'Voucher')}</option>`).join('')
                                        : '<option value="">Không có voucher còn hiệu lực</option>'}
                                </select>
                            </div>
                            <div class="form-grid compact-grid">
                                <div class="form-group">
                                    <label class="text-14" for="promo-hunt-quantity">Số lượng</label>
                                    <input id="promo-hunt-quantity" type="number" min="1" max="999" value="20" ${activeAssignableVouchers.length ? '' : 'disabled'}>
                                </div>
                                <div class="form-group">
                                    <label class="text-14" for="promo-hunt-status">Trạng thái</label>
                                    <select id="promo-hunt-status" ${activeAssignableVouchers.length ? '' : 'disabled'}>
                                        <option value="ACTIVE">Hoạt động</option>
                                        <option value="DISABLED">Tạm khóa</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="text-14" for="promo-hunt-start-at">Bắt đầu</label>
                                    <input id="promo-hunt-start-at" type="datetime-local" value="${escapeHtml(promoHuntStartDefault)}" ${activeAssignableVouchers.length ? '' : 'disabled'} required>
                                </div>
                                <div class="form-group">
                                    <label class="text-14" for="promo-hunt-end-at">Kết thúc</label>
                                    <input id="promo-hunt-end-at" type="datetime-local" value="${escapeHtml(promoHuntEndDefault)}" ${activeAssignableVouchers.length ? '' : 'disabled'} required>
                                </div>
                            </div>
                            <button class="login-submit-btn text-bold" type="submit" ${activeAssignableVouchers.length ? '' : 'disabled'}>Mở săn mã</button>
                        </form>
                        <div class="promo-hunt-manager-list">
                            ${promoHuntCampaigns.length
                                ? promoHuntCampaigns.map(campaign => {
                                    const campaignState = getPromoHuntCampaignState(campaign, '');
                                    const voucher = campaignState.voucher;
                                    const usageStats = voucherUsageStats[String(campaign.voucherCode || '').trim().toUpperCase()] || {
                                        usedCount: 0,
                                        discountTotal: 0
                                    };
                                    return `
                                        <article class="voucher-assignment-item promo-hunt-manager-item">
                                            <div>
                                                <strong>${escapeHtml(campaign.voucherCode)}</strong>
                                                <p class="voucher-meta">${escapeHtml(voucher?.label || 'Voucher không còn trong danh sách')}</p>
                                                <p class="voucher-meta">Áp dụng: ${escapeHtml(voucher ? getVoucherCategories(voucher).join(', ') : 'Không xác định')}</p>
                                                <p class="voucher-meta">&#272;&#227; nh&#7853;n: ${campaignState.claimedCount}/${campaign.totalQuantity} &middot; C&#242;n ${campaignState.remaining}</p>
                                                <p class="voucher-meta">&#272;&#227; d&#249;ng: ${Number(usageStats.usedCount || 0)} &#273;&#417;n &middot; T&#7893;ng gi&#7843;m: ${formatCurrency(usageStats.discountTotal || 0)}</p>
                                                <p class="voucher-meta">Tr&#7841;ng th&#225;i: ${escapeHtml(campaign.status)}</p>
                                                <p class="voucher-meta">${escapeHtml(formatDateTimeDisplay(campaign.startAt))} - ${escapeHtml(formatDateTimeDisplay(campaign.endAt))}</p>
                                            </div>
                                            <button class="cart-text-btn danger" type="button" data-promo-hunt-action="delete" data-promo-hunt-id="${escapeHtml(campaign.id)}">Xóa</button>
                                        </article>
                                    `;
                                }).join('')
                                : '<p class="voucher-assignment-empty">Chưa có chiến dịch săn khuyến mãi nào.</p>'}
                        </div>
                    </section>
                </aside>
            </div>
        `;
        repairRenderedContent();
    }

    async function renderUserList() {
        if (!userListBody) {
            return;
        }

        if (!isManagerWorkspaceUser()) {
            userListBody.innerHTML = '';
            return;
        }

        await ensureManagerAccountsLoaded();
        const accounts = getManagedAccounts();
        const table = userListBody.closest('table');
        if (table) {
            const headerRow = table.querySelector('thead tr');
            if (headerRow) {
                headerRow.innerHTML = '<th>ID</th><th>Họ tên</th><th>Username</th><th>Email</th><th>SĐT</th><th>Quyền hạn</th><th>Trạng thái</th><th>Thao tác</th>';
            }
        }

        userListBody.innerHTML = accounts.map(account => `
            <tr>
                <td>${escapeHtml(account.id || '')}</td>
                <td>${escapeHtml(account.ho_ten || '')}</td>
                <td>${escapeHtml(account.username || '')}</td>
                <td>${escapeHtml(account.email || '')}</td>
                <td>${escapeHtml(account.sdt || '')}</td>
                <td><span class="role-badge ${getRoleClass(account.role)}">${escapeHtml(getWorkspaceRoleLabel(account))}</span></td>
                <td><span class="workspace-chip">${escapeHtml(account.status || 'Hoạt động')}</span></td>
                <td>
                    <div class="workspace-row-actions">
                        <button class="secondary-btn text-bold" type="button" data-account-action="edit" data-account-id="${escapeHtml(account.id)}">Sửa</button>
                        <button class="cart-text-btn danger" type="button" data-account-action="delete" data-account-id="${escapeHtml(account.id)}">Xóa</button>
                    </div>
                </td>
            </tr>
        `).join('');

        repairTextNodes(userListBody);
    }

    function renderCustomerSupportChat() {
        const widget = document.getElementById('support-chat-widget');
        const panel = document.getElementById('support-chat-panel');
        const statusBox = document.getElementById('support-chat-status');
        const messagesBox = document.getElementById('support-chat-messages');
        if (!widget || !panel || !statusBox || !messagesBox) {
            return;
        }

        const thread = getCustomerSupportThread(false);
        if (!thread) {
            statusBox.textContent = 'Đăng nhập bằng tài khoản khách hàng để gửi tin nhắn nhờ tư vấn.';
            messagesBox.innerHTML = '';
            return;
        }

        statusBox.textContent = isSupportBusinessHours()
            ? `Trạng thái phiên hỗ trợ: ${thread.status}. Nhân viên sẽ phản hồi trực tiếp trong cửa sổ này.`
            : `Trạng thái phiên hỗ trợ: ${thread.status}. Hiện ngoài giờ làm việc 08:00 - 21:00 hằng ngày, tin nhắn vẫn được ghi nhận theo tài khoản của bạn.`;
        messagesBox.innerHTML = thread.messages.map(message => `
            <article class="support-message ${message.sender === 'staff' ? 'customer' : 'staff'}">
                <div>${escapeHtml(message.text)}</div>
                <small>${escapeHtml(formatDateTimeDisplay(message.createdAt))}</small>
            </article>
        `).join('');
        repairTextNodes(statusBox);
        repairTextNodes(messagesBox);
    }

    function syncSupportChatVisibility() {
        const widget = document.getElementById('support-chat-widget');
        const panel = document.getElementById('support-chat-panel');
        if (!widget || !panel) {
            return;
        }

        const shouldShow = Boolean(currentUser) && !canAccessWorkspace() && currentView !== 'checkout';
        widget.classList.toggle('hidden', !shouldShow);
        if (!shouldShow) {
            panel.classList.add('hidden');
            return;
        }

        renderCustomerSupportChat();
    }

    function renderInternalWorkspace() {
        if (!canAccessWorkspace()) {
            return;
        }

        if (isStaffWorkspaceUser()) {
            renderStaffOrdersPanel();
            renderCategoriesPanel();
            renderReturnsPanel();
            renderReviewsPanel();
            renderSupportManagementPanel();
        }

        if (isManagerWorkspaceUser()) {
            renderCustomersPanel();
            renderStatsPanel();
            renderBestsellerPanel();
            renderVouchersPanel();
            appendHomeShowcaseManagerCard();
            renderUserList();
        }

        repairRenderedContent();
    }

    function syncWorkspaceTabs() {
        const panel = document.getElementById('admin-panel');
        if (!panel) {
            return;
        }

        panel.querySelectorAll('.admin-tabs .tab-btn:not([data-role-scope])').forEach(node => node.remove());
        panel.querySelectorAll('.admin-container > h2.text-24').forEach(node => node.remove());
        document.getElementById('products-mgmt')?.setAttribute('data-role-scope', 'staff');
        document.getElementById('users-mgmt')?.setAttribute('data-role-scope', 'manager');

        const roleType = getWorkspaceRoleType();
        const buttons = Array.from(panel.querySelectorAll('.admin-tabs .tab-btn[data-role-scope]'));
        const contents = Array.from(panel.querySelectorAll('.tab-content[data-role-scope]'));
        const availableButtons = buttons.filter(button => button.dataset.roleScope === roleType);
        const availableTabIds = availableButtons.map(button => button.dataset.tab);
        const state = getWorkspaceState();
        const activeTab = availableTabIds.includes(state.activeWorkspaceTab)
            ? state.activeWorkspaceTab
            : (availableButtons[0]?.dataset.tab || getWorkspaceDefaultTab(roleType));
        state.activeWorkspaceTab = activeTab;

        buttons.forEach(button => {
            const visible = button.dataset.roleScope === roleType;
            button.classList.toggle('hidden', !visible);
            button.classList.toggle('active', visible && button.dataset.tab === activeTab);
        });

        contents.forEach(content => {
            const visible = content.dataset.roleScope === roleType;
            content.classList.toggle('hidden', !visible);
            content.classList.toggle('active', visible && content.id === activeTab);
        });

        const title = document.getElementById('workspace-title');
        const description = document.getElementById('workspace-description');
        const badge = document.getElementById('workspace-role-badge');
        const eyebrow = document.getElementById('workspace-eyebrow');
        if (eyebrow) eyebrow.textContent = roleType === 'manager' ? 'Trang quản lí' : 'Trang nhân viên';
        if (title) title.textContent = roleType === 'manager' ? 'Bảng điều khiển quản lí' : 'Bảng điều khiển nhân viên';
        if (description) description.textContent = roleType === 'manager'
            ? 'Quản lí danh sách tài khoản, khách hàng, doanh thu, sản phẩm bán chạy và ưu đãi vận hành.'
            : 'Nhân viên có thể xử lý sản phẩm, đơn hàng, trạng thái giao vận, đổi trả, đánh giá và hỗ trợ khách hàng.';
        if (badge) {
            badge.textContent = getWorkspaceRoleLabel();
            badge.className = `role-badge ${getRoleClass(currentUser?.role)}`;
        }
    }

    async function openWorkspaceView(preferredTab = '') {
        if (!canAccessWorkspace()) {
            return;
        }

        const state = getWorkspaceState();
        if (preferredTab) {
            state.activeWorkspaceTab = preferredTab;
        }

        if (isManagerWorkspaceUser()) {
            await ensureManagerAccountsLoaded();
            await loadAdminBehaviorOverview();
        }

        if (canAccessWorkspace()) {
            await syncWorkspaceSupportThreadsFromApi();
        }

        userDropdown.classList.add('hidden');
        currentView = 'workspace';
        setTrackedPageContext('WORKSPACE', `workspace:${preferredTab || getWorkspaceState().activeWorkspaceTab || 'overview'}`);
        syncWorkspaceTabs();
        renderInternalWorkspace();
        syncMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function loadProducts() {
        productContainer.innerHTML = '<p class="loading-text">Đang tải sản phẩm...</p>';

        try {
            const products = await apiRequest('/products', { auth: false });
            allProducts = products.map(enrichProduct);
            renderCatalog();
            renderAdminProductList();
            if (isManagerWorkspaceUser()) {
                await renderUserList();
            } else if (userListBody) {
                userListBody.innerHTML = '';
            }
            renderInternalWorkspace();
            syncSupportChatVisibility();
        } catch (error) {
            productContainer.innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
        }
    }

    function updateAuthUI() {
        const authenticated = Boolean(currentUser);
        const customerFeaturesVisible = authenticated && !canAccessWorkspace();
        const workspaceLink = adminLink?.querySelector('a');

        addressBookLinkWrap.classList.toggle('hidden', !customerFeaturesVisible);
        ordersLinkWrap.classList.toggle('hidden', !customerFeaturesVisible);

        if (!authenticated) {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
            userDropdown.classList.add('hidden');
            dropName.textContent = 'Khách';
            dropRole.textContent = 'Vai trò';
            syncSupportChatVisibility();
            return;
        }

        dropName.textContent = getUserDisplayName(currentUser);
        dropRole.textContent = getWorkspaceRoleLabel(currentUser);

        if (canAccessWorkspace()) {
            adminLink.classList.remove('hidden');
            if (workspaceLink) {
                workspaceLink.innerHTML = `<i class="fa-solid fa-gauge"></i> ${isManagerWorkspaceUser() ? 'Trang quản lí' : 'Trang nhân viên'}`;
            }
        } else {
            adminLink.classList.add('hidden');
        }

        syncWorkspaceTabs();
        adminPanel.classList.toggle('hidden', currentView !== 'workspace' || !canAccessWorkspace());
        syncSupportChatVisibility();
        repairRenderedContent();
    }

    function syncMainView() {
        const isHomeView = currentView === 'home';
        const isWorkspaceView = currentView === 'workspace';
        const isCartView = currentView === 'cart';
        const isWishlistView = currentView === 'wishlist';
        const isCheckoutView = currentView === 'checkout';
        const isAddressBookView = currentView === 'address-book';
        const isOrdersView = currentView === 'orders';
        const isBannerVisible = !isWorkspaceView && shouldShowBanner();
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        adminPanel.classList.toggle('hidden', !isWorkspaceView || !canAccessWorkspace());
        if (mainContent) {
            mainContent.classList.toggle('hidden', isWorkspaceView);
        }
        if (footer) {
            footer.classList.toggle('hidden', isWorkspaceView);
        }

        cartView.classList.toggle('hidden', !isCartView);
        wishlistView.classList.toggle('hidden', !isWishlistView);
        checkoutView.classList.toggle('hidden', !isCheckoutView);
        addressBookView.classList.toggle('hidden', !isAddressBookView);
        ordersView.classList.toggle('hidden', !isOrdersView);
        banner.classList.toggle('hidden', !isBannerVisible);

        if (isWorkspaceView) {
            closeMegaMenu();
            syncSupportChatVisibility();
            return;
        }

        if (isCartView || isWishlistView || isCheckoutView || isAddressBookView || isOrdersView) {
            catalogToolbar.classList.add('hidden');
            collectionView.classList.add('hidden');
            activeFilters.classList.add('hidden');
            productContainer.classList.add('hidden');
            closeMegaMenu();
            syncSupportChatVisibility();
            return;
        }

        productContainer.classList.remove('hidden');
        syncSupportChatVisibility();
    }

    function clearSession() {
        saveAppliedVoucherCode('');
        token = '';
        currentUser = null;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        userDropdown.classList.add('hidden');
        invalidateRecommendationCache();
        updateCartCount();
        updateWishlistCount();
        updateAuthUI();
        if (['wishlist', 'cart', 'checkout', 'address-book', 'orders', 'workspace', 'promo-hunt'].includes(currentView)) {
            showCatalogView();
        } else {
            void loadHomeRecommendations(true);
        }
    }

    function placeOrder() {
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Không có sản phẩm nào để thanh toán.');
            return;
        }

        if (!ensureCustomerAccess('Hãy đăng nhập trước khi thanh toán.')) {
            return;
        }

        const selectedAddress = ensureCheckoutAddressSelection();
        if (!selectedAddress) {
            alert('Hãy thêm ít nhất một địa chỉ giao hàng trong Sổ địa chỉ trước khi thanh toán.');
            openAddressBookView();
            return;
        }

        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const shipping = 0;
        const total = Math.max(0, subtotal + shipping - discount);

        if (!confirm(`Xác nhận thanh toán ${selectedItems.length} dòng sản phẩm với tổng giá trị ${formatCurrency(total)}?`)) {
            return;
        }

        const nextOrder = normalizeWorkspaceOrder({
            id: generateRecordId('order'),
            code: buildOrderCode(),
            createdAt: new Date().toISOString(),
            status: 'Chờ xác nhận',
            paymentStatus: PAYMENT_STATUS_PENDING_COD,
            paidAt: '',
            paymentConfirmedBy: '',
            totalItems: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            shipping,
            discount,
            total,
            voucherCode: appliedVoucher?.code || '',
            voucherLabel: appliedVoucher?.label || '',
            address: { ...selectedAddress },
            accountKey: getCurrentAccountStorageSuffix(),
            customer: getCurrentCustomerProfile(),
            items: selectedItems.map(item => ({
                productId: item.productId,
                sku: item.product?.sku || '',
                name: item.product?.ten_san_pham || '',
                image: getProductImageUrl(item.product),
                size: item.size,
                variantType: item.variantType || '',
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                subtotal: item.subtotal
            }))
        });

        const existingOrders = getOrderHistory();
        saveOrderHistory([nextOrder, ...existingOrders]);
        if (appliedVoucher?.code) {
            consumeVoucherForCurrentAccount(appliedVoucher.code);
        }

        selectedItems.forEach(item => {
            trackBehaviorEvent({
                eventType: 'PURCHASE',
                pageType: 'CHECKOUT',
                pageKey: nextOrder.code || 'checkout',
                productId: item.productId,
                categoryKey: item.product?.danh_muc || '',
                brandKey: item.product?.thuong_hieu || '',
                priceValue: item.unitPrice,
                metadata: {
                    orderCode: nextOrder.code,
                    quantity: item.quantity,
                    size: item.size || '',
                    voucherCode: appliedVoucher?.code || ''
                }
            });
        });

        const remainingItems = getCartItems().filter(item => !normalizeCartSelectionFlag(item.selected));
        saveCartItems(remainingItems);
        saveAppliedVoucherCode('');
        invalidateRecommendationCache();
        renderCartView();
        renderCheckoutView();
        renderInternalWorkspace();
        openOrdersView();
        alert('Đặt hàng thành công. Đơn hàng sẽ được giao COD, chỉ hiển thị thanh toán thành công sau khi nhân viên xác nhận đã thu tiền.');
    }

    function removeLegacyWorkspaceArtifacts() {
        const panel = document.getElementById('admin-panel');
        if (!panel) {
            return;
        }
        panel.querySelectorAll('.admin-tabs .tab-btn:not([data-role-scope])').forEach(node => node.remove());
        panel.querySelectorAll('.admin-container > h2.text-24').forEach(node => node.remove());
        document.getElementById('products-mgmt')?.setAttribute('data-role-scope', 'staff');
        document.getElementById('users-mgmt')?.setAttribute('data-role-scope', 'manager');
    }

    function openAccountForm(account = null) {
        const form = document.getElementById('account-form');
        if (!form) {
            return;
        }
        form.classList.remove('hidden');
        document.getElementById('account-form-title').textContent = account ? 'Cập nhật tài khoản' : 'Thêm tài khoản';
        document.getElementById('account-id').value = account?.id || '';
        document.getElementById('account-created-at').value = account?.createdAt || '';
        document.getElementById('account-name').value = account?.ho_ten || '';
        document.getElementById('account-username').value = account?.username || '';
        document.getElementById('account-email').value = account?.email || '';
        document.getElementById('account-phone').value = account?.sdt || '';
        document.getElementById('account-password').value = account?.password || '';
        document.getElementById('account-role').value = account?.role || 'Khách hàng';
        document.getElementById('account-status').value = account?.status || 'Hoạt động';
        document.getElementById('account-password').type = 'password';
        const toggleButton = document.getElementById('toggle-account-password');
        if (toggleButton) {
            toggleButton.textContent = 'Hiện';
        }
        const error = document.getElementById('account-form-error');
        if (error) {
            error.classList.add('hidden');
            error.textContent = '';
        }
    }

    function closeAccountForm() {
        const form = document.getElementById('account-form');
        if (!form) {
            return;
        }
        form.reset();
        document.getElementById('account-id').value = '';
        document.getElementById('account-created-at').value = '';
        const passwordInput = document.getElementById('account-password');
        if (passwordInput) {
            passwordInput.type = 'password';
        }
        const toggleButton = document.getElementById('toggle-account-password');
        if (toggleButton) {
            toggleButton.textContent = 'Hiện';
        }
        form.classList.add('hidden');
        const error = document.getElementById('account-form-error');
        if (error) {
            error.classList.add('hidden');
            error.textContent = '';
        }
    }

    function saveManagedAccountFromForm() {
        const registry = getAccountRegistryStore();
        const payload = normalizeAccountRecord({
            id: document.getElementById('account-id').value.trim() || generateRecordId('local-account'),
            ho_ten: document.getElementById('account-name').value.trim(),
            username: document.getElementById('account-username').value.trim(),
            email: document.getElementById('account-email').value.trim(),
            sdt: document.getElementById('account-phone').value.trim(),
            role: document.getElementById('account-role').value,
            status: document.getElementById('account-status').value,
            localOnly: true
        });

        if (!payload.ho_ten || !payload.username || !payload.email) {
            const error = document.getElementById('account-form-error');
            if (error) {
                error.textContent = 'Vui lòng nhập đầy đủ họ tên, username và email.';
                error.classList.remove('hidden');
            }
            return;
        }

        const existsInBase = getManagedAccounts().some(account => String(account.id) === payload.id);
        if (existsInBase) {
            registry.updated[payload.id] = payload;
        } else {
            registry.created = [
                ...registry.created.filter(account => String(account.id) !== payload.id),
                payload
            ];
        }

        saveAccountRegistryStore(registry);
        closeAccountForm();
        renderInternalWorkspace();
    }

    function deleteManagedAccount(accountId) {
        const registry = getAccountRegistryStore();
        registry.created = registry.created.filter(account => String(account.id) !== String(accountId));
        delete registry.updated[String(accountId)];
        if (!registry.deleted.includes(String(accountId))) {
            registry.deleted.push(String(accountId));
        }
        saveAccountRegistryStore(registry);
        renderInternalWorkspace();
    }

    function saveCategoryFromForm() {
        const store = getCategoryRegistryStore();
        const id = document.getElementById('category-id')?.value.trim() || generateRecordId('category');
        const record = {
            id,
            sport: document.getElementById('category-sport')?.value.trim() || '',
            label: document.getElementById('category-label')?.value.trim() || '',
            status: document.getElementById('category-status')?.value || 'Đang dùng'
        };

        if (!record.sport || !record.label) {
            return;
        }

        const baseIds = new Set(getBaseCategoryRegistry().map(category => category.id));
        if (baseIds.has(record.id)) {
            store.updated[record.id] = record;
        } else {
            store.created = [...store.created.filter(category => category.id !== record.id), record];
        }

        saveCategoryRegistryStore(store);
        getWorkspaceState().editingCategoryId = '';
        renderCategoriesPanel();
    }

    function deleteManagedCategory(categoryId) {
        const store = getCategoryRegistryStore();
        store.created = store.created.filter(category => String(category.id) !== String(categoryId));
        delete store.updated[String(categoryId)];
        if (!store.deleted.includes(String(categoryId))) {
            store.deleted.push(String(categoryId));
        }
        saveCategoryRegistryStore(store);
        getWorkspaceState().editingCategoryId = '';
        renderCategoriesPanel();
    }

    function saveVoucherFromForm() {
        const originalCode = document.getElementById('voucher-original-code')?.value.trim().toUpperCase();
        const nextVoucher = normalizeVoucherRecord({
            code: document.getElementById('voucher-code')?.value.trim().toUpperCase(),
            label: document.getElementById('voucher-label')?.value.trim(),
            percent: Number(document.getElementById('voucher-percent')?.value || 0) / 100,
            minOrder: Number(document.getElementById('voucher-min-order')?.value || 0),
            maxDiscount: Number(document.getElementById('voucher-max-discount')?.value || 0),
            categories: normalizeVoucherCategories(document.getElementById('voucher-categories')?.value || 'Tất cả'),
            expiresAt: document.getElementById('voucher-expires-at')?.value || '',
            status: document.getElementById('voucher-status')?.value || 'Hoạt động'
        });

        if (!nextVoucher.code || !nextVoucher.label || nextVoucher.percent <= 0) {
            return;
        }

        const nextCatalog = getManagedVoucherCatalog().filter(voucher => voucher.code !== originalCode && voucher.code !== nextVoucher.code);
        nextCatalog.push(nextVoucher);
        saveManagedVoucherCatalog(nextCatalog);
        replaceVoucherCodeInAssignments(originalCode, nextVoucher.code);
        replacePromoHuntVoucherCode(originalCode, nextVoucher.code);
        getWorkspaceState().editingVoucherCode = '';
        renderVouchersPanel();
        renderCartView();
        renderCheckoutView();
        renderCatalog();
    }

    function deleteManagedVoucher(code) {
        const normalizedCode = String(code || '').toUpperCase();
        const nextCatalog = getManagedVoucherCatalog().filter(voucher => voucher.code !== normalizedCode);
        saveManagedVoucherCatalog(nextCatalog);
        removeVoucherCodeFromAllAssignments(normalizedCode);
        removePromoHuntVoucherCode(normalizedCode);
        if (getAppliedVoucherCode() === normalizedCode) {
            saveAppliedVoucherCode('');
        }
        getWorkspaceState().editingVoucherCode = '';
        renderVouchersPanel();
        renderCartView();
        renderCheckoutView();
        renderCatalog();
    }

    function initializeWorkspaceInteractions() {
        removeLegacyWorkspaceArtifacts();

        adminLink?.querySelector('a')?.addEventListener('click', event => {
            event.preventDefault();
            openWorkspaceView();
        });

        document.getElementById('workspace-back-btn')?.addEventListener('click', () => {
            showCatalogView();
        });

        document.getElementById('add-account-btn')?.addEventListener('click', () => {
            openAccountForm();
        });

        document.getElementById('cancel-account-edit')?.addEventListener('click', () => {
            closeAccountForm();
        });

        document.getElementById('toggle-account-password')?.addEventListener('click', () => {
            const passwordInput = document.getElementById('account-password');
            const toggleButton = document.getElementById('toggle-account-password');
            if (!passwordInput || !toggleButton) {
                return;
            }
            const nextVisible = passwordInput.type === 'password';
            passwordInput.type = nextVisible ? 'text' : 'password';
            toggleButton.textContent = nextVisible ? 'Ẩn' : 'Hiện';
        });

        document.getElementById('account-search-input')?.addEventListener('input', event => {
            getWorkspaceState().accountSearchQuery = String(event.target?.value || '').trim();
            renderUserList();
        });

        document.getElementById('account-created-preset')?.addEventListener('change', event => {
            applyAccountCreatedPreset('custom');
            renderUserList();
        });

        document.getElementById('account-created-start')?.addEventListener('change', event => {
            const state = getWorkspaceState();
            state.accountCreatedPreset = 'custom';
            const nextValue = String(event.target?.value || '').trim();
            const today = formatDateInputValue(new Date());
            state.accountCreatedStartDate = nextValue && nextValue > today ? today : nextValue;
            const presetSelect = document.getElementById('account-created-preset');
            if (presetSelect) {
                presetSelect.value = 'custom';
            }
            event.target.value = state.accountCreatedStartDate;
            renderUserList();
        });

        document.getElementById('account-created-end')?.addEventListener('change', event => {
            const state = getWorkspaceState();
            state.accountCreatedPreset = 'custom';
            const nextValue = String(event.target?.value || '').trim();
            const today = formatDateInputValue(new Date());
            state.accountCreatedEndDate = nextValue && nextValue > today ? today : nextValue;
            const presetSelect = document.getElementById('account-created-preset');
            if (presetSelect) {
                presetSelect.value = 'custom';
            }
            event.target.value = state.accountCreatedEndDate;
            renderUserList();
        });

        document.getElementById('staff-product-search-input')?.addEventListener('input', event => {
            getWorkspaceState().staffProductSearchQuery = String(event.target?.value || '').trim();
            renderAdminProductList();
        });

        document.getElementById('staff-product-brand-filter')?.addEventListener('change', event => {
            getWorkspaceState().staffProductBrandFilter = String(event.target?.value || 'all').trim() || 'all';
            renderAdminProductList();
        });

        document.getElementById('staff-product-category-filter')?.addEventListener('change', event => {
            getWorkspaceState().staffProductCategoryFilter = String(event.target?.value || 'all').trim() || 'all';
            renderAdminProductList();
        });

        document.getElementById('staff-product-price-filter')?.addEventListener('change', event => {
            getWorkspaceState().staffProductPriceFilter = String(event.target?.value || 'all').trim() || 'all';
            renderAdminProductList();
        });

        document.getElementById('staff-product-stock-filter')?.addEventListener('change', event => {
            getWorkspaceState().staffProductStockFilter = String(event.target?.value || 'all').trim() || 'all';
            renderAdminProductList();
        });

        adminPanel.addEventListener('click', event => {
            const tabButton = event.target.closest('.tab-btn[data-role-scope]');
            if (tabButton) {
                getWorkspaceState().activeWorkspaceTab = tabButton.dataset.tab || '';
                if (tabButton.dataset.tab === 'support-mgmt') {
                    void syncWorkspaceSupportThreadsFromApi().then(() => {
                        renderSupportManagementPanel();
                    });
                } else {
                    renderInternalWorkspace();
                }
            }

            const accountButton = event.target.closest('[data-account-action]');
            if (accountButton) {
                event.preventDefault();
                const accountId = accountButton.dataset.accountId;
                if (accountButton.dataset.accountAction === 'edit') {
                    if (!confirm('Bạn có muốn chỉnh sửa tài khoản này không?')) {
                        return;
                    }
                    const account = getManagedAccounts().find(item => String(item.id) === String(accountId));
                    openAccountForm(account || null);
                    return;
                }
                if (accountButton.dataset.accountAction === 'delete' && confirm('Bạn có chắc muốn xóa tài khoản này không?')) {
                    deleteManagedAccount(accountId);
                    return;
                }
            }

            if (accountButton && accountButton.dataset.accountAction === 'toggle-password') {
                toggleWorkspaceAccountPasswordVisibility(accountButton.dataset.accountId);
                renderUserList();
                return;
            }

            const orderButton = event.target.closest('[data-order-action]');
            if (orderButton) {
                event.preventDefault();
                const orderId = orderButton.dataset.orderId;
                if (orderButton.dataset.orderAction === 'request-return') {
                    updateWorkspaceOrder(orderId, { supportRequest: 'Yêu cầu đổi trả', supportStatus: 'Mới tạo' });
                    return;
                }
                if (orderButton.dataset.orderAction === 'cancel-order') {
                    updateWorkspaceOrder(orderId, { status: 'Đã hủy', supportRequest: 'Yêu cầu hủy đơn', supportStatus: 'Mới tạo' });
                    return;
                }
            }

            if (orderButton?.dataset.orderAction === 'confirm-cod-payment') {
                const orderId = orderButton.dataset.orderId;
                const order = getWorkspaceOrders().find(item => String(item.id) === String(orderId));
                if (!order || normalizeText(order.status) !== 'da giao') {
                    alert('Chỉ xác nhận thu tiền sau khi đơn hàng đã giao đến tay người nhận.');
                    return;
                }
                updateWorkspaceOrder(orderId, buildConfirmCodPaymentPatch());
                return;
            }

            const categoryButton = event.target.closest('[data-category-action]');
            if (categoryButton) {
                event.preventDefault();
                if (categoryButton.dataset.categoryAction === 'edit') {
                    getWorkspaceState().editingCategoryId = categoryButton.dataset.categoryId || '';
                    renderCategoriesPanel();
                    return;
                }
                if (categoryButton.dataset.categoryAction === 'delete' && confirm('Xóa danh mục này khỏi danh sách quản lý?')) {
                    deleteManagedCategory(categoryButton.dataset.categoryId);
                    return;
                }
            }

            const reviewButton = event.target.closest('[data-review-action]');
            if (reviewButton) {
                event.preventDefault();
                const reviews = getManagedReviews();
                const nextReviews = reviews
                    .map(review => {
                        if (String(review.id) !== String(reviewButton.dataset.reviewId)) {
                            return review;
                        }
                        if (reviewButton.dataset.reviewAction === 'toggle') {
                            return { ...review, status: review.status === 'Hiển thị' ? 'Ẩn' : 'Hiển thị' };
                        }
                        return review;
                    })
                    .filter(review => !(reviewButton.dataset.reviewAction === 'delete' && String(review.id) === String(reviewButton.dataset.reviewId)));
                saveManagedReviews(nextReviews);
                renderReviewsPanel();
                return;
            }

            const returnButton = event.target.closest('[data-return-action]');
            if (returnButton) {
                event.preventDefault();
                const orderId = returnButton.dataset.orderId;
                if (returnButton.dataset.returnAction === 'processing') {
                    updateWorkspaceOrder(orderId, { supportStatus: 'Đang xử lý' });
                    return;
                }
                if (returnButton.dataset.returnAction === 'resolved') {
                    updateWorkspaceOrder(orderId, { supportStatus: 'Hoàn tất', supportRequest: '' });
                    return;
                }
                if (returnButton.dataset.returnAction === 'clear') {
                    updateWorkspaceOrder(orderId, { supportRequest: '', supportStatus: '', supportNote: '' });
                    return;
                }
            }

            const supportThreadButton = event.target.closest('[data-support-thread]');
            if (supportThreadButton) {
                event.preventDefault();
                getWorkspaceState().activeSupportThreadId = supportThreadButton.dataset.supportThread || '';
                renderSupportManagementPanel();
                return;
            }

            const voucherButton = event.target.closest('[data-voucher-action]');
            if (voucherButton) {
                event.preventDefault();
                if (voucherButton.dataset.voucherAction === 'edit') {
                    getWorkspaceState().editingVoucherCode = voucherButton.dataset.voucherCode || '';
                    renderVouchersPanel();
                    return;
                }
                if (voucherButton.dataset.voucherAction === 'delete' && confirm('Xóa voucher này khỏi danh sách ưu đãi?')) {
                    deleteManagedVoucher(voucherButton.dataset.voucherCode);
                    return;
                }
            }

            const voucherUnassignButton = event.target.closest('[data-voucher-unassign]');
            if (voucherUnassignButton) {
                event.preventDefault();
                unassignVoucherFromAccount(voucherUnassignButton.dataset.voucherAccount, voucherUnassignButton.dataset.voucherUnassign);
                renderVouchersPanel();
                renderCartView();
                if (currentView === 'checkout') {
                    renderCheckoutView();
                }
                if (currentView === 'catalog') {
                    renderCatalog();
                }
                return;
            }

            const promoHuntButton = event.target.closest('[data-promo-hunt-action]');
            if (promoHuntButton) {
                event.preventDefault();
                if (promoHuntButton.dataset.promoHuntAction === 'delete' && confirm('Xóa chiến dịch săn khuyến mãi này?')) {
                    void deletePromoHuntCampaign(promoHuntButton.dataset.promoHuntId);
                }
                return;
            }

            const homeShowcaseToggleButton = event.target.closest('[data-home-showcase-toggle]');
            if (homeShowcaseToggleButton) {
                event.preventDefault();
                setHomeShowcaseEnabled(homeShowcaseToggleButton.dataset.homeShowcaseToggle !== 'hide');
                renderVouchersPanel();
                if (currentView === 'catalog') {
                    renderCatalog();
                }
                return;
            }

            if (event.target.id === 'reset-category-form') {
                event.preventDefault();
                getWorkspaceState().editingCategoryId = '';
                renderCategoriesPanel();
                return;
            }

            if (event.target.id === 'reset-voucher-form') {
                event.preventDefault();
                getWorkspaceState().editingVoucherCode = '';
                renderVouchersPanel();
            }
        });

        adminPanel.addEventListener('input', event => {
            if (event.target?.id === 'staff-order-search-input') {
                getWorkspaceState().staffOrderSearchQuery = String(event.target.value || '').trim();
                renderStaffOrdersPanel();
            }

            if (event.target?.id === 'staff-category-search-input') {
                getWorkspaceState().staffCategorySearchQuery = String(event.target.value || '').trim();
                renderCategoriesPanel();
            }

            if (event.target?.id === 'staff-review-search-input') {
                getWorkspaceState().staffReviewSearchQuery = String(event.target.value || '').trim();
                renderReviewsPanel();
            }

            if (event.target?.id === 'support-thread-search-input') {
                const cursorPosition = event.target.selectionStart ?? String(event.target.value || '').length;
                getWorkspaceState().supportThreadSearchQuery = String(event.target.value || '').trim();
                renderSupportManagementPanel();
                const nextInput = document.getElementById('support-thread-search-input');
                if (nextInput) {
                    const nextPosition = Math.min(cursorPosition, nextInput.value.length);
                    nextInput.focus();
                    nextInput.setSelectionRange(nextPosition, nextPosition);
                }
            }

            if (event.target?.id === 'support-staff-input') {
                const threadId = document.getElementById('support-thread-id')?.value
                    || getWorkspaceState().activeSupportThreadId
                    || '';
                setSupportReplyDraft(threadId, event.target.value || '');
                getWorkspaceState().supportReplySelectionStart = Number.isInteger(event.target.selectionStart)
                    ? event.target.selectionStart
                    : String(event.target.value || '').length;
                getWorkspaceState().supportReplySelectionEnd = Number.isInteger(event.target.selectionEnd)
                    ? event.target.selectionEnd
                    : getWorkspaceState().supportReplySelectionStart;
                getWorkspaceState().supportComposerFocusedThreadId = threadId;
            }
        });

        adminPanel.addEventListener('focusout', event => {
            if (event.target?.id !== 'support-staff-input') {
                return;
            }

            captureSupportComposerState();
            window.setTimeout(() => {
                const state = getWorkspaceState();
                if (document.activeElement?.id !== 'support-staff-input') {
                    state.supportComposerFocusedThreadId = '';
                }
                flushPendingSupportPanelRefresh();
            }, 0);
        });

        adminPanel.addEventListener('keydown', event => {
            if (event.target?.id === 'support-staff-input' && event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
                event.preventDefault();
                event.target.form?.requestSubmit();
            }
        });

        adminPanel.addEventListener('change', async event => {
            if (event.target?.id === 'manager-voucher-category-filter') {
                getWorkspaceState().managerVoucherCategoryFilter = String(event.target.value || 'all').trim() || 'all';
                renderVouchersPanel();
                return;
            }

            if (event.target?.id === 'manager-voucher-status-filter') {
                getWorkspaceState().managerVoucherStatusFilter = String(event.target.value || 'all').trim() || 'all';
                renderVouchersPanel();
                return;
            }

            if (event.target?.id === 'voucher-assignment-account') {
                getWorkspaceState().voucherAssignmentAccountKey = String(event.target.value || '').trim();
                renderVouchersPanel();
                return;
            }

            if (event.target?.id === 'staff-order-status-filter') {
                getWorkspaceState().staffOrderStatusFilter = String(event.target.value || 'all').trim() || 'all';
                renderStaffOrdersPanel();
                return;
            }

            if (event.target?.id === 'staff-order-start-date') {
                const today = formatDateInputValue(new Date());
                const nextValue = String(event.target.value || '').trim();
                getWorkspaceState().staffOrderStartDate = nextValue && nextValue > today ? today : nextValue;
                event.target.value = getWorkspaceState().staffOrderStartDate;
                renderStaffOrdersPanel();
                return;
            }

            if (event.target?.id === 'staff-order-end-date') {
                const today = formatDateInputValue(new Date());
                const nextValue = String(event.target.value || '').trim();
                getWorkspaceState().staffOrderEndDate = nextValue && nextValue > today ? today : nextValue;
                event.target.value = getWorkspaceState().staffOrderEndDate;
                renderStaffOrdersPanel();
                return;
            }

            if (event.target?.id === 'staff-category-sport-filter') {
                getWorkspaceState().staffCategorySportFilter = String(event.target.value || 'all').trim() || 'all';
                renderCategoriesPanel();
                return;
            }

            if (event.target?.id === 'staff-category-label-filter') {
                getWorkspaceState().staffCategoryLabelFilter = String(event.target.value || 'all').trim() || 'all';
                renderCategoriesPanel();
                return;
            }

            if (event.target?.id === 'staff-category-status-filter') {
                getWorkspaceState().staffCategoryStatusFilter = String(event.target.value || 'all').trim() || 'all';
                renderCategoriesPanel();
                return;
            }

            if (event.target?.id === 'staff-review-category-filter') {
                getWorkspaceState().staffReviewCategoryFilter = String(event.target.value || 'all').trim() || 'all';
                renderReviewsPanel();
                return;
            }

            if (event.target?.id === 'staff-review-type-filter') {
                getWorkspaceState().staffReviewTypeFilter = String(event.target.value || 'all').trim() || 'all';
                renderReviewsPanel();
                return;
            }

            if (event.target?.id === 'staff-review-rating-filter') {
                getWorkspaceState().staffReviewRatingFilter = String(event.target.value || 'all').trim() || 'all';
                renderReviewsPanel();
                return;
            }

            if (event.target?.id === 'staff-review-status-filter') {
                getWorkspaceState().staffReviewStatusFilter = String(event.target.value || 'all').trim() || 'all';
                renderReviewsPanel();
                return;
            }

            const statusSelect = event.target.closest('[data-order-status-select]');
            if (statusSelect) {
                updateWorkspaceOrder(statusSelect.dataset.orderId, { status: statusSelect.value });
                return;
            }

            if (event.target.matches('[data-support-thread-status]')) {
                const state = getWorkspaceState();
                await updateSupportThreadStatusToApi(state.activeSupportThreadId, event.target.value);
                renderSupportManagementPanel();
            }
        });

        adminPanel.addEventListener('submit', async event => {
            if (event.target.id === 'account-form') {
                event.preventDefault();
                saveManagedAccountFromForm();
                return;
            }

            if (event.target.id === 'category-form') {
                event.preventDefault();
                saveCategoryFromForm();
                return;
            }

            if (event.target.id === 'voucher-form') {
                event.preventDefault();
                saveVoucherFromForm();
                return;
            }

            if (event.target.id === 'voucher-assignment-form') {
                event.preventDefault();
                const accountKey = document.getElementById('voucher-assignment-account')?.value || '';
                const voucherCode = document.getElementById('voucher-assignment-code')?.value || '';
                const voucherQuantity = document.getElementById('voucher-assignment-quantity')?.value || DEFAULT_VOUCHER_ASSIGNMENT_QUANTITY;
                if (assignVoucherToAccount(accountKey, voucherCode, voucherQuantity)) {
                    getWorkspaceState().voucherAssignmentAccountKey = accountKey;
                    renderVouchersPanel();
                    renderCartView();
                    if (currentView === 'checkout') {
                        renderCheckoutView();
                    }
                    if (currentView === 'catalog') {
                        renderCatalog();
                    }
                }
                return;
            }

            if (event.target.id === 'promo-hunt-form') {
                event.preventDefault();
                void savePromoHuntCampaignFromForm();
                return;
            }

            if (event.target.id === 'support-staff-form') {
                event.preventDefault();
                const threadId = document.getElementById('support-thread-id')?.value;
                const input = document.getElementById('support-staff-input');
                if (!threadId || !input?.value.trim()) {
                    return;
                }
                await sendWorkspaceSupportMessageToApi(threadId, input.value.trim());
                clearSupportReplyDraft(threadId);
                getWorkspaceState().pendingSupportPanelRefresh = false;
                input.value = '';
                renderSupportManagementPanel();
                return;
            }

            if (event.target.id === 'stats-filter-form') {
                event.preventDefault();
                const state = getWorkspaceState();
                state.statsPreset = document.getElementById('stats-preset')?.value || 'custom';
                state.statsStartDate = document.getElementById('stats-start-date')?.value || state.statsStartDate;
                state.statsEndDate = document.getElementById('stats-end-date')?.value || state.statsEndDate;
                if (state.statsPreset !== 'custom') {
                    applyStatsPreset(state.statsPreset);
                }
                await loadAdminBehaviorOverview();
                renderStatsPanel();
                renderBestsellerPanel();
            }
        });

        document.getElementById('support-chat-toggle')?.addEventListener('click', async () => {
            if (!ensureCustomerAccess('Hãy đăng nhập bằng tài khoản khách hàng để gửi tin nhắn tư vấn.')) {
                return;
            }
            await syncCustomerSupportThreadFromApi(true);
            document.getElementById('support-chat-panel')?.classList.toggle('hidden');
            renderCustomerSupportChat();
        });

        document.getElementById('support-chat-close')?.addEventListener('click', () => {
            document.getElementById('support-chat-panel')?.classList.add('hidden');
        });

        document.getElementById('support-chat-form')?.addEventListener('submit', async event => {
            event.preventDefault();
            if (!ensureCustomerAccess('Hãy đăng nhập bằng tài khoản khách hàng để gửi tin nhắn tư vấn.')) {
                return;
            }
            const input = document.getElementById('support-chat-input');
            if (!input?.value.trim()) {
                return;
            }
            await sendCustomerSupportMessageToApi(input.value.trim());
            input.value = '';
            renderCustomerSupportChat();
        });

        document.getElementById('support-chat-input')?.addEventListener('keydown', event => {
            if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
                event.preventDefault();
                event.target.form?.requestSubmit();
            }
        });

        window.setInterval(() => {
            void refreshSupportUiFromApi();
        }, 5000);
    }

    function getProductTypeOptions(product) {
        const sources = [
            product?.loai_hang,
            product?.phan_loai,
            product?.variant_options,
            product?.loai_san_pham
        ];

        const colorSource = String(product?.mau || '').trim();
        if (/[/|,;]/.test(colorSource)) {
            sources.push(colorSource);
        }

        const values = sources
            .flatMap(source => String(source || '').split(/[\n/|;,]+/))
            .map(value => sanitizeProductText(value).trim())
            .filter(Boolean)
            .filter(value => normalizeText(value) !== 'khong ro');

        return getUniqueValues(values);
    }

    function getProductGalleryImages(product) {
        const explicitImages = String(product?.hinh_anh_url || '')
            .split(/\r?\n|\|/)
            .map(item => item.trim())
            .filter(Boolean);
        const posterImage = buildProductPoster(product);
        const fallbackImage = getProductImageUrl(product);
        const images = [...explicitImages, fallbackImage];

        if (!images.includes(posterImage)) {
            images.push(posterImage);
        }

        return Array.from(new Set(images)).slice(0, 6);
    }

    function getCuratedProductDescription(product) {
        const sku = String(product?.sku || '').trim().toUpperCase();
        const descriptionMap = {
            'FB-001': {
                short: 'Mẫu giày đá bóng cỏ nhân tạo Nike phổ thông, thiên về sự êm chân và dễ làm quen cho người mới chơi.',
                full: 'Đây là mẫu giày đá bóng cỏ nhân tạo Nike ở phân khúc phổ thông, phù hợp cho người chơi phong trào cần một đôi giày dễ mang, đế bám sân ổn định và cảm giác sử dụng thoải mái trong các buổi tập lẫn thi đấu hằng tuần.'
            },
            'FB-003': {
                short: 'Áo thi đấu Manchester City 2024 mang phong cách fanwear, phù hợp cổ vũ hoặc mặc thể thao hằng ngày.',
                full: 'Áo thi đấu Manchester City 2024 phù hợp cho người hâm mộ muốn mặc theo tinh thần câu lạc bộ trong ngày thường hoặc khi xem bóng đá. Phom áo thể thao gọn gàng, dễ phối cùng quần short, jogger hoặc quần tập theo phong cách bóng đá hiện đại.'
            },
            'FB-007': {
                short: 'Giày turf dòng Tiempo Legend 10 Academy chú trọng cảm giác chạm bóng và kiểm soát trên sân cỏ nhân tạo.',
                full: 'Nike Tiempo Legend 10 Academy TF là mẫu giày sân cỏ nhân tạo dành cho người chơi ưu tiên cảm giác bóng và độ ổn định khi xử lý trong không gian hẹp. Phần upper FlyTouch Lite mềm hơn da tự nhiên, ôm chân tự nhiên và đế TF bám sân tốt cho mặt cỏ nhân tạo ngắn.'
            },
            'FB-008': {
                short: 'Mercurial Vapor 16 Academy TF hướng đến tốc độ bứt phá với form ôm gọn và phản hồi nhanh.',
                full: 'Nike Mercurial Vapor 16 Academy TF thuộc nhóm giày thiên tốc độ, phù hợp người chơi thích tăng tốc và dứt điểm nhanh. Phần upper mỏng cho cảm giác chạm bóng trực diện, bộ đệm Air Zoom tăng độ phản hồi và đế TF giúp đổi hướng nhanh trên sân cỏ nhân tạo.'
            },
            'FB-009': {
                short: 'Phantom GX 2 Academy TF tập trung vào kiểm soát bóng, chuyền và dứt điểm chính xác.',
                full: 'Nike Phantom GX 2 Academy TF được thiết kế cho người chơi thích kiểm soát nhịp độ, chọc khe và ra quyết định trong một chạm. Vùng tiếp xúc phủ NikeSkin hỗ trợ cảm giác bóng tốt hơn, trong khi đế turf giúp bám sân ổn định khi xoay trở và đổi hướng.'
            },
            'FB-010': {
                short: 'Predator League Turf là dòng giày adidas chú trọng kiểm soát bóng và độ chính xác khi xử lý.',
                full: 'adidas Predator League Turf phù hợp cho người chơi ưu tiên cảm giác kiểm soát, rê dắt và dứt điểm chính xác trên sân cỏ nhân tạo. Thân giày có các vùng hỗ trợ bám bóng ở phần upper, còn đế turf giúp trụ vững hơn khi chuyển hướng hoặc pressing cường độ cao.'
            },
            'FB-011': {
                short: 'F50 League Turf là mẫu giày adidas thiên về trọng lượng nhẹ và khả năng tăng tốc.',
                full: 'adidas F50 League Turf được định hướng cho lối chơi tốc độ, thích hợp với tiền đạo cánh và người chơi thường xuyên bứt tốc. Phom giày gọn, upper nhẹ và đế TF hỗ trợ tăng tốc nhanh mà vẫn giữ được độ ổn định trên mặt sân nhân tạo.'
            },
            'FB-013': {
                short: 'PUMA FUTURE 7 PLAY TT là mẫu giày turf linh hoạt, phù hợp người chơi sáng tạo và đổi hướng liên tục.',
                full: 'PUMA FUTURE 7 PLAY TT tập trung vào sự linh hoạt và cảm giác thoải mái khi di chuyển trên sân cỏ ngắn. Upper mềm, phom dễ mang và bộ đế TT bám sân tốt giúp mẫu giày này phù hợp cho người chơi thiên kiến tạo hoặc xử lý bóng trong phạm vi hẹp.'
            },
            'FB-016': {
                short: 'Select Numero 10 là quả bóng quen thuộc cho luyện tập và thi đấu phong trào nhờ cảm giác chạm bóng ổn định.',
                full: 'Select Numero 10 là một trong những dòng bóng nổi tiếng nhất của Select, được dùng rộng rãi cho tập luyện và thi đấu phong trào. Bóng có độ nảy đều, tiếp xúc mềm và độ bền cao, phù hợp cho cả sân cỏ tự nhiên lẫn sân cỏ nhân tạo.'
            },
            'FB-017': {
                short: 'Nike Dri-FIT Academy 23 là áo tập thấm hút mồ hôi, phù hợp cho buổi tập cường độ vừa đến cao.',
                full: 'Nike Dri-FIT Academy 23 sử dụng chất liệu Dri-FIT giúp thoát ẩm và giữ cảm giác khô thoáng khi vận động liên tục. Form áo gọn gàng, dễ phối cùng quần training và phù hợp cho tập bóng đá, gym hoặc chạy bộ nhẹ.'
            },
            'FB-018': {
                short: 'adidas Tiro 24 Training Jersey là áo tập AEROREADY gọn nhẹ, tối ưu cho vận động hàng ngày.',
                full: 'adidas Tiro 24 Training Jersey thuộc dòng training nổi tiếng của adidas dành cho bóng đá và vận động cường độ trung bình. Chất liệu AEROREADY hỗ trợ quản lý mồ hôi, phom áo linh hoạt và phù hợp cho cả tập đội nhóm lẫn mặc thường ngày theo phong cách thể thao.'
            },
            'FB-020': {
                short: 'Nike Dri-FIT Academy 23 Drill Top là lớp áo tập nhẹ với khóa kéo 1/4, phù hợp khi khởi động hoặc tập ngoài trời.',
                full: 'Nike Dri-FIT Academy 23 Drill Top là mẫu áo tay dài mỏng dành cho khởi động, tập kỹ thuật hoặc di chuyển trước trận. Thiết kế khóa kéo 1/4 tiện điều chỉnh nhiệt độ, chất liệu Dri-FIT giúp khô thoáng và phom áo đủ linh hoạt để mặc chồng lớp.'
            },
            'FB-021': {
                short: 'adidas Tiro 24 Training Pants là quần tập phom gọn, phù hợp luyện tập và di chuyển trước giờ thi đấu.',
                full: 'adidas Tiro 24 Training Pants được thiết kế cho môi trường training với phom ôm dần về ống chân và chất liệu hỗ trợ thoát ẩm. Đây là mẫu quần phù hợp khi khởi động, tập kỹ thuật hoặc phối theo set Tiro 24 cho đội bóng và lớp học thể thao.'
            },
            'FB-023': {
                short: 'Nike Academy Team Backpack là balo thể thao đa dụng cho giày, quần áo tập và phụ kiện hằng ngày.',
                full: 'Nike Academy Team Backpack có ngăn chính rộng, bố cục dễ sắp xếp và phù hợp cho học sinh, sinh viên hoặc người tập thể thao thường xuyên. Thiết kế balo thiên về tính tiện dụng, đủ chỗ cho quần áo tập, giày và các vật dụng cá nhân cơ bản.'
            },
            'FB-024': {
                short: 'adidas Tiro League Duffel Bag Medium là túi trống cỡ vừa, phù hợp mang đồ tập, giày và phụ kiện đội nhóm.',
                full: 'adidas Tiro League Duffel Bag Medium phù hợp cho người chơi cần mang theo quần áo, giày và dụng cụ tập trong một buổi luyện tập hoặc chuyến đi ngắn. Dáng túi trống cỡ vừa dễ xách, dễ đeo và thuận tiện cho cả bóng đá lẫn gym.'
            },
            'FB-025': {
                short: 'Nike Guard Lock Elite là phụ kiện giúp cố định ống đồng chắc hơn khi tập luyện hoặc thi đấu.',
                full: 'Nike Guard Lock Elite được thiết kế để giữ ống đồng ổn định trong suốt buổi tập hoặc trận đấu, giảm cảm giác xô lệch khi tăng tốc. Mẫu phụ kiện này gọn nhẹ, dễ mang cùng tất bóng đá và phù hợp cho cả người mới chơi lẫn thi đấu phong trào.'
            },
            'FB-026': {
                short: 'adidas Predator Training là găng tay thủ môn dành cho luyện tập hằng ngày với độ bám và đệm vừa đủ.',
                full: 'adidas Predator Training là mẫu găng tay thủ môn thiên về tập luyện, phù hợp cho các buổi bắt bóng lặp lại với cường độ thường xuyên. Thiết kế ưu tiên cảm giác vừa tay, lớp đệm hỗ trợ bắt bóng ổn định và đủ bền cho môi trường sân cỏ nhân tạo.'
            },
            'FB-027': {
                short: 'Nike Academy Plus là bóng đá cỡ 5 hướng đến tập luyện và thi đấu phong trào với cảm giác chạm ổn định.',
                full: 'Nike Academy Plus Soccer Ball là quả bóng cỡ 5 phù hợp cho tập luyện và thi đấu phong trào hằng tuần. Bóng được định hướng để duy trì quỹ đạo ổn định, cảm giác chạm chắc chân và độ bền đủ tốt cho sân cỏ tự nhiên lẫn sân cỏ nhân tạo.'
            },
            'FB-012': {
                short: 'adidas Copa Pure 3 League Turf là giày đá bóng thiên cảm giác chạm, phù hợp người chơi ưu tiên sự mềm và ôm chân.',
                full: 'adidas Copa Pure 3 League Turf phù hợp cho người chơi muốn cảm giác chạm bóng tự nhiên hơn ở nhóm sân cỏ nhân tạo. Form giày hướng đến sự thoải mái, upper mềm và đế turf hỗ trợ bám sân ổn định cho các buổi tập kỹ thuật hoặc thi đấu phong trào.'
            },
            'FB-014': {
                short: 'PUMA Ultra 5 Play TT là giày turf thiên tốc độ với form gọn và trọng lượng nhẹ.',
                full: 'PUMA Ultra 5 Play TT phù hợp cho người chơi ưa tăng tốc và xử lý nhanh ở biên hoặc khoảng trống hẹp. Mẫu giày này thiên về cảm giác nhẹ chân, đế TT bám mặt sân tốt và phù hợp cho cỏ nhân tạo hoặc sân nén cứng.'
            },
            'FB-015': {
                short: 'Mizuno Monarcida Neo III Select AS là giày sân cỏ nhân tạo theo hướng bền, êm và dễ thích nghi với nhiều kiểu chân.',
                full: 'Mizuno Monarcida Neo III Select AS phù hợp cho người chơi phong trào muốn một đôi giày bền bỉ, ổn định và mang êm trong thời gian dài. Phom giày tương đối dễ fit chân, upper ôm vừa phải và đế AS cho cảm giác trụ tốt trên sân cỏ nhân tạo.'
            },
            'FB-019': {
                short: 'PUMA teamLIGA Jersey là áo bóng đá training/thi đấu phong trào với thiết kế gọn, dễ dùng và dễ phối.',
                full: 'PUMA teamLIGA Jersey phù hợp cho đội bóng phong trào, lớp học thể thao hoặc người dùng muốn một mẫu áo bóng đá cơ bản nhưng gọn gàng. Chất liệu thiên về sự nhẹ và thoáng, giúp áo phù hợp cho tập luyện thường xuyên lẫn thi đấu trong nhà hoặc ngoài trời.'
            },
            'FB-022': {
                short: 'PUMA teamLIGA Training Pants là quần tập bóng đá phom gọn, phù hợp khởi động và mặc di chuyển trước trận.',
                full: 'PUMA teamLIGA Training Pants được thiết kế cho môi trường tập luyện bóng đá với kiểu dáng ôm gọn và tinh thần đội nhóm rõ rệt. Đây là mẫu quần phù hợp để mặc khởi động, tập kỹ thuật hoặc kết hợp với áo training cùng bộ trong các buổi tập đều đặn.'
            },
            'FB-028': {
                short: 'Nike Strike Knee-High Soccer Socks là tất bóng đá dài qua gối, hỗ trợ cảm giác ôm chân và cố định phụ kiện tốt hơn.',
                full: 'Nike Strike Knee-High Soccer Socks phù hợp cho người chơi bóng đá cần một đôi tất dài giúp cố định ống đồng tốt hơn và tăng cảm giác hoàn chỉnh cho set đồ thi đấu. Phần cổ tất và thân tất được định hướng cho sự ôm chân vừa phải, phù hợp cả tập luyện lẫn thi đấu phong trào.'
            },
            'FB-029': {
                short: 'adidas Milano 23 Socks là tất bóng đá cổ cao cơ bản, phù hợp cho đội bóng phong trào và lớp học thể thao.',
                full: 'adidas Milano 23 Socks là mẫu tất bóng đá phổ biến trong nhóm sản phẩm teamwear của adidas. Mẫu tất này phù hợp cho người chơi cần một đôi tất đơn giản, đồng bộ trang phục thi đấu và dễ sử dụng hằng tuần ở cả tập luyện lẫn đá giao hữu.'
            },
            'FB-030': {
                short: 'Nike Fundamental Towel Large là khăn thể thao cỡ lớn tiện cho tập luyện, thi đấu hoặc sử dụng sau buổi vận động.',
                full: 'Nike Fundamental Towel Large phù hợp cho người tập thể thao cần một chiếc khăn kích thước lớn hơn để lau mồ hôi, quàng vai hoặc mang theo sau buổi tập. Đây là phụ kiện đơn giản nhưng thực dụng cho bóng đá, gym, chạy bộ và các hoạt động ngoài trời.'
            },
            'FB-031': {
                short: 'adidas Sports Towel Small là khăn thể thao gọn nhẹ, dễ mang theo trong balo sân cỏ hoặc túi tập luyện.',
                full: 'adidas Sports Towel Small phù hợp cho người chơi cần một chiếc khăn gọn để bỏ trong balo hoặc túi thi đấu. Kích thước nhỏ giúp khăn dễ mang theo, đủ dùng cho những buổi tập ngắn, buổi gym hoặc các hoạt động thể thao hằng ngày.'
            },
            'FB-132': {
                short: 'Áo Argentina có chữ ký Lionel Messi là sản phẩm memorabilia hướng tới người sưu tầm bóng đá đỉnh cao.',
                full: 'Phiên bản signed jersey Lionel Messi được định hướng như một món đồ sưu tầm hơn là sản phẩm mặc tập luyện thông thường. Giá trị của sản phẩm nằm ở yếu tố memorabilia, độ trưng bày và ý nghĩa biểu tượng gắn với nhà vô địch World Cup.'
            },
            'FB-133': {
                short: 'Áo Bồ Đào Nha có chữ ký Cristiano Ronaldo là món đồ sưu tầm nổi bật cho fan CR7 và bóng đá quốc tế.',
                full: 'Signed jersey Cristiano Ronaldo phù hợp cho người sưu tầm hoặc trưng bày trong không gian cá nhân, showroom hoặc phòng làm việc. Đây là dòng sản phẩm thiên giá trị biểu tượng, gắn với hình ảnh một trong những cầu thủ nổi tiếng nhất lịch sử bóng đá hiện đại.'
            },
            'FB-134': {
                short: 'Áo Brazil có chữ ký Neymar Jr là sản phẩm sưu tầm đậm tính biểu tượng cho fan tuyển Brazil.',
                full: 'Signed jersey Neymar Jr được định hướng như một món đồ lưu niệm và trưng bày giá trị cao. Điểm nhấn của sản phẩm nằm ở chữ ký, tinh thần bóng đá Brazil và yếu tố gắn với hình ảnh ngôi sao tấn công nổi bật của thế hệ hiện đại.'
            },
            'FB-135': {
                short: 'Áo Pháp có chữ ký Kylian Mbappe là món đồ sưu tầm cao cấp cho người hâm mộ bóng đá đương đại.',
                full: 'Signed jersey Kylian Mbappe phù hợp cho mục đích sưu tầm, trưng bày và lưu giữ giá trị kỷ niệm. Đây là dạng sản phẩm memorabilia gắn với một trong những cầu thủ tấn công nổi bật nhất của bóng đá thế hệ mới.'
            },
            'VB-001': {
                short: 'Bóng chuyền hơi Động Lực phù hợp cho luyện tập cơ bản, vận động cộng đồng và người chơi cần cảm giác bóng mềm hơn.',
                full: 'Bóng chuyền hơi Động Lực phù hợp cho môi trường thể dục phong trào, trường học, cơ quan hoặc các nhóm vận động cộng đồng. Dòng bóng hơi thường mang lại cảm giác tiếp xúc mềm hơn, dễ làm quen và phù hợp với người chơi không thiên về thi đấu chuyên sâu.'
            },
            'TT-014': {
                short: 'STIGA Pro Carbon+ là vợt 5 sao thiên tấn công, tích hợp carbon để tăng lực và độ ổn định.',
                full: 'STIGA Pro Carbon+ là mẫu vợt bóng bàn thiên hướng offensive, phù hợp người chơi đã có kỹ thuật cơ bản và muốn tăng lực đánh. Công nghệ carbon giúp mặt vợt ổn định hơn khi vào lực, đồng thời vẫn giữ được độ kiểm soát cần thiết cho các pha topspin và counter.'
            },
            'TT-016': {
                short: 'JOOLA Rosskopf Classic là vợt cân bằng giữa tốc độ, độ xoáy và kiểm soát cho người chơi phong trào nâng cao.',
                full: 'JOOLA Rosskopf Classic được xây dựng theo hướng toàn diện, phù hợp người chơi muốn có cảm giác vợt dễ làm quen nhưng vẫn đủ tốc độ cho thi đấu phong trào. Mẫu vợt này cân bằng khá tốt giữa speed, spin và control nên phù hợp để nâng cấp từ nhóm vợt cơ bản.'
            },
            'TT-017': {
                short: 'Butterfly Tenergy 05 là mặt vợt topspin nổi tiếng với độ bám bóng cao và cảm giác bật rõ.',
                full: 'Butterfly Tenergy 05 là một trong những mặt vợt biểu tượng của Butterfly, nổi bật nhờ khả năng tạo xoáy mạnh và quỹ đạo bóng cao. Công nghệ Spring Sponge mang lại cảm giác bật rõ, phù hợp người chơi tấn công hiện đại thiên topspin và mở giao bóng xoáy.'
            },
            'TT-026': {
                short: 'Butterfly Free Chack II là keo dán gốc nước dành cho lắp ráp mặt vợt bóng bàn theo tiêu chuẩn hiện đại.',
                full: 'Butterfly Free Chack II là dòng keo dán mặt vợt gốc nước được nhiều người chơi custom racket lựa chọn. Keo bám tốt, thao tác tương đối dễ và phù hợp cho việc thay mặt vợt định kỳ mà vẫn giữ cảm giác ổn định sau khi dán.'
            },
            'TT-027': {
                short: 'STIGA Allround Evolution là cốt vợt nổi tiếng thiên kiểm soát, phù hợp cho người chơi toàn diện.',
                full: 'STIGA Allround Evolution là mẫu cốt vợt bóng bàn được nhiều người chơi chọn khi muốn cân bằng giữa kiểm soát, cảm giác bóng và khả năng phát triển kỹ thuật lâu dài. Cấu trúc thiên allround giúp mẫu vợt này phù hợp cho cả người chơi phong trào nâng cao lẫn người cần một cốt vợt ổn định để custom.'
            },
            'TT-028': {
                short: 'Butterfly Selasia Shirt là áo bóng bàn thiên về sự nhẹ, thoáng và linh hoạt khi vận động liên tục.',
                full: 'Butterfly Selasia Shirt là mẫu áo bóng bàn chính hãng của Butterfly, phù hợp cho tập luyện và thi đấu phong trào nhờ phom thể thao gọn gàng, chất vải nhẹ và khả năng thoát nhiệt tốt. Áo dễ phối với quần short hoặc jogger thể thao trong những buổi tập kéo dài.'
            },
            'TT-029': {
                short: 'JOOLA Centrela Polo Shirt là áo polo thể thao dành cho bóng bàn với kiểu dáng lịch sự và dễ mặc.',
                full: 'JOOLA Centrela Polo Shirt phù hợp cho người chơi muốn một mẫu áo vừa mang tinh thần bóng bàn vừa đủ lịch sự để mặc tại câu lạc bộ, giải đấu hoặc sự kiện đội nhóm. Phom polo giúp áo dễ mặc, dễ phối và vẫn duy trì sự thoải mái khi vận động.'
            },
            'VB-002': {
                short: 'Mikasa V200W là bóng thi đấu chính thức của FIVB, nổi bật với quỹ đạo ổn định và cảm giác đỡ bóng chắc tay.',
                full: 'Mikasa V200W là bóng thi đấu chính thức ở nhiều giải bóng chuyền cấp cao của FIVB. Thiết kế 18 tấm panel cân bằng hơn về khí động học, giúp đường bay ổn định và mang lại cảm giác tiếp xúc chắc tay trong các pha phát, đệm và chuyền một.'
            },
            'VB-004': {
                short: 'Molten V5M5000 FLISTATEC là bóng chuyền cao cấp nổi tiếng với công nghệ ổn định đường bay.',
                full: 'Molten V5M5000 FLISTATEC là dòng bóng chuyền cao cấp của Molten, được biết đến nhờ bề mặt FLISTATEC hỗ trợ đường bay ổn định hơn. Bóng phù hợp cho tập luyện nghiêm túc lẫn thi đấu trình độ cao, đặc biệt ở những buổi tập thiên kỹ thuật và giao bóng.'
            },
            'VB-006': {
                short: 'Wilson AVP OPTX Official Game Volleyball là bóng beach volley nổi bật với khả năng nhận diện xoáy và quỹ đạo.',
                full: 'Wilson AVP OPTX Official Game Volleyball là mẫu bóng beach volley thuộc dòng AVP nổi tiếng của Wilson. Thiết kế đồ họa giúp người chơi nhìn quỹ đạo và vòng xoáy rõ hơn, trong khi bề mặt bóng phù hợp cho môi trường sân cát và luyện tập ngoài trời.'
            },
            'VB-011': {
                short: 'Mizuno Wave Lightning Z8 là giày bóng chuyền cao cấp thiên về sự nhẹ, bật và phản hồi nhanh.',
                full: 'Mizuno Wave Lightning Z8 phù hợp cho người chơi bóng chuyền thích bước chạy nhẹ và khả năng bật nhảy linh hoạt. Mẫu giày này nổi bật ở cảm giác phản hồi nhanh, độ ôm tốt và sự cân bằng giữa êm chân với tốc độ chuyển trạng thái.'
            },
            'VB-012': {
                short: 'ASICS Sky Elite FF 3 là giày bóng chuyền định hướng cho bật nhảy, ổn định và chuyển lực hiệu quả.',
                full: 'ASICS Sky Elite FF 3 được phát triển cho người chơi thiên tấn công, cần hỗ trợ tốt ở những pha chạy đà và tiếp đất. Mẫu giày mang lại cảm giác ổn định thân dưới, tăng hiệu quả truyền lực và phù hợp cho vị trí đập biên hoặc phụ công.'
            },
            'VB-014': {
                short: 'Nike Zoom Hyperset 2 là giày bóng chuyền thiên về độ bám sàn, ổn định ngang và đệm êm khi tiếp đất.',
                full: 'Nike Zoom Hyperset 2 phù hợp cho bóng chuyền trong nhà với ưu tiên về độ bám, khả năng trụ ngang và cảm giác chắc chân khi di chuyển liên tục. Mẫu giày này đặc biệt hợp với người chơi cần đổi hướng nhanh, bật nhảy nhiều và tiếp đất lặp lại trong cả buổi tập.'
            },
            'VB-022': {
                short: 'Mikasa V390W là bóng chuyền tiêu chuẩn tập luyện, dễ kiểm soát và phù hợp cho lớp học hoặc đội phong trào.',
                full: 'Mikasa V390W là quả bóng chuyền cỡ chuẩn hướng tới nhu cầu tập luyện thường xuyên và thi đấu phong trào. Bóng có cảm giác chạm tương đối dễ chịu, quỹ đạo ổn định và phù hợp cho cả buổi tập kỹ thuật lẫn sinh hoạt câu lạc bộ.'
            },
            'VB-023': {
                short: 'Mizuno Performance Plus Volleyball Crew Socks là tất bóng chuyền cổ cao tăng cảm giác êm và hỗ trợ vận động.',
                full: 'Mizuno Performance Plus Volleyball Crew Socks phù hợp cho người chơi bóng chuyền cần một đôi tất dày vừa phải, ôm chân tốt và tạo cảm giác êm hơn khi bật nhảy, tiếp đất hoặc di chuyển ngang. Đây là phụ kiện bổ trợ đơn giản nhưng hữu ích cho những buổi tập kéo dài.'
            },
            'VB-024': {
                short: 'Nike Everyday Plus Cushioned Crew Socks là tất thể thao đa dụng, êm chân và dễ dùng cho tập luyện hằng ngày.',
                full: 'Nike Everyday Plus Cushioned Crew Socks là mẫu tất crew có lớp đệm giúp tăng cảm giác êm ở những vùng chịu lực chính. Sản phẩm phù hợp cho bóng chuyền, gym, chạy bộ nhẹ hoặc sinh hoạt hằng ngày theo phong cách thể thao.'
            },
            'VB-025': {
                short: 'Mizuno Sports Towel là khăn thể thao gọn nhẹ, phù hợp lau mồ hôi trong buổi tập hoặc thi đấu.',
                full: 'Mizuno Sports Towel là phụ kiện cơ bản nhưng hữu ích cho người chơi bóng chuyền và các môn indoor. Kích thước khăn vừa tay, dễ mang theo trong balo tập luyện và phù hợp để dùng trước, trong hoặc sau trận đấu.'
            },
            'VB-026': {
                short: 'ASICS Sports Towel là khăn thể thao mềm, tiện cho người tập luyện cần phụ kiện gọn nhẹ mang theo mỗi ngày.',
                full: 'ASICS Sports Towel phù hợp cho người chơi thể thao trong nhà muốn một chiếc khăn đơn giản, dễ gấp gọn và dễ cho vào balo. Mẫu khăn này phù hợp cho buổi tập bóng chuyền, gym hoặc các hoạt động vận động ra nhiều mồ hôi.'
            },
            'VB-027': {
                short: 'Mizuno Team Backpack 23 là balo tập luyện dành cho đồ dùng cá nhân, giày và phụ kiện cơ bản.',
                full: 'Mizuno Team Backpack 23 là balo thể thao hướng tới sự gọn gàng và tiện dụng trong môi trường tập luyện hằng ngày. Ngăn chứa vừa đủ cho quần áo tập, giày và những phụ kiện nhỏ, phù hợp cho học sinh, sinh viên hoặc vận động viên phong trào.'
            },
            'VB-028': {
                short: 'Nike Brasilia 9.5 Training Backpack là balo thể thao phổ biến nhờ ngăn chứa rộng và tính đa dụng cao.',
                full: 'Nike Brasilia 9.5 Training Backpack là mẫu balo training quen thuộc của Nike, phù hợp cho người thường xuyên mang theo quần áo, giày và đồ dùng cá nhân tới sân tập. Thiết kế thiên về tính thực dụng, dễ dùng cho cả bóng chuyền, gym và đi học hằng ngày.'
            },
            'VB-003': {
                short: 'Mikasa V330W là bóng chuyền tiêu chuẩn luyện tập với cảm giác tiếp xúc ổn định và dễ kiểm soát.',
                full: 'Mikasa V330W phù hợp cho các buổi tập thường xuyên, lớp học bóng chuyền hoặc đội phong trào cần một quả bóng có độ ổn định tốt. Thiết kế hướng đến sự cân bằng giữa cảm giác chạm, độ bền và khả năng duy trì quỹ đạo đều ở những bài tập kỹ thuật cơ bản.'
            },
            'VB-005': {
                short: 'Molten V5M4000 là bóng chuyền dùng cho tập luyện và thi đấu phong trào với cảm giác bóng chắc và ổn định.',
                full: 'Molten V5M4000 phù hợp cho người chơi cần một quả bóng chuyền tiêu chuẩn để tập luyện lâu dài. Sản phẩm hướng đến sự ổn định về cảm giác phát bóng, đệm bóng và chuyền một trong môi trường tập luyện trường học, câu lạc bộ hoặc đội phong trào.'
            },
            'VB-007': {
                short: 'Tachikara SV5WSC Sensi-Tec là bóng chuyền indoor nổi tiếng với cảm giác tay mềm và độ ổn định cao.',
                full: 'Tachikara SV5WSC Sensi-Tec là mẫu bóng chuyền trong nhà quen thuộc ở môi trường trường học và câu lạc bộ. Bóng được đánh giá cao nhờ cảm giác tiếp xúc êm tay, dễ kiểm soát và phù hợp cho cả tập kỹ thuật lẫn thi đấu ở cấp độ phong trào nghiêm túc.'
            },
            'VB-008': {
                short: 'Mikasa BV550C Beach Pro là bóng chuyền bãi biển dành cho môi trường sân cát và hoạt động ngoài trời.',
                full: 'Mikasa BV550C Beach Pro phù hợp cho beach volleyball nhờ thiết kế bề mặt và độ nảy được định hướng cho điều kiện sân cát. Đây là lựa chọn phù hợp cho luyện tập ngoài trời, giao lưu bãi biển và những buổi chơi thiên cảm giác bay bóng rõ ràng.'
            },
            'VB-009': {
                short: 'Molten V5B5000 là bóng chuyền bãi biển cao cấp cho tập luyện và thi đấu trên cát.',
                full: 'Molten V5B5000 được thiết kế cho beach volleyball với ưu tiên về độ nhận diện bóng, cảm giác chạm và độ ổn định khi chơi ngoài trời. Sản phẩm phù hợp cho nhóm chơi bãi biển thường xuyên hoặc những buổi tập yêu cầu bóng chuyên dụng hơn.'
            },
            'VB-010': {
                short: 'adidas Crazyflight Mid là giày bóng chuyền nổi tiếng nhờ khả năng bật nhảy, nhẹ chân và ổn định khi đáp đất.',
                full: 'adidas Crazyflight Mid phù hợp cho người chơi bóng chuyền cần cảm giác linh hoạt khi chạy đà, bật nhảy và tiếp đất lặp lại. Dòng Crazyflight thường được ưa chuộng nhờ sự cân bằng giữa độ nhẹ, độ bật và độ chắc chân trong môi trường sân trong nhà.'
            },
            'VB-013': {
                short: 'ASICS Gel-Rocket 11 là giày indoor đa năng, phù hợp cho bóng chuyền phong trào và các môn trong nhà.',
                full: 'ASICS Gel-Rocket 11 là mẫu giày indoor quen thuộc nhờ tính đa dụng, dễ tiếp cận và phù hợp cho người chơi phong trào. Mẫu giày này hướng đến sự ổn định, cảm giác êm vừa phải và độ bám sàn đủ dùng cho bóng chuyền, cầu lông hoặc pickleball trong nhà.'
            },
            'VB-015': {
                short: 'Mizuno LR6 Kneepad là bảo vệ gối dành cho bóng chuyền với độ ôm và lớp đệm phù hợp tập luyện thường xuyên.',
                full: 'Mizuno LR6 Kneepad phù hợp cho người chơi bóng chuyền cần hỗ trợ bảo vệ vùng gối khi di chuyển thấp người, lao cứu bóng hoặc tập luyện lặp lại. Thiết kế thiên về sự gọn gàng, ôm chân và đủ đệm cho môi trường sân trong nhà.'
            },
            'VB-016': {
                short: 'Nike Streak Volleyball Knee Pads là bảo vệ gối gọn nhẹ cho tập luyện và thi đấu bóng chuyền.',
                full: 'Nike Streak Volleyball Knee Pads phù hợp cho người chơi cần một đôi bảo vệ gối thiên về độ linh hoạt và cảm giác gọn chân hơn khi di chuyển. Sản phẩm phù hợp cho buổi tập hằng tuần, đấu phong trào và các vị trí thường xuyên lao người cứu bóng.'
            },
            'VB-017': {
                short: 'adidas Tabela 23 Jersey là áo thi đấu thể thao teamwear, phù hợp cho đội bóng chuyền phong trào.',
                full: 'adidas Tabela 23 Jersey là mẫu áo teamwear cơ bản, phù hợp cho đội bóng chuyền, lớp học thể thao hoặc giải phong trào cần đồng phục gọn gàng. Chất áo thiên về sự nhẹ, dễ in ấn và đủ linh hoạt cho vận động trong nhà.'
            },
            'VB-018': {
                short: 'PUMA teamLIGA Jersey là áo thể thao teamwear phù hợp cho tập luyện và thi đấu phong trào.',
                full: 'PUMA teamLIGA Jersey là mẫu áo thể thao theo tinh thần đội nhóm, phù hợp cho bóng chuyền, futsal hoặc các lớp học thể thao. Áo dễ mặc, dễ phối và phù hợp cho cả tập luyện lẫn thi đấu giao hữu nhờ thiết kế cơ bản nhưng thực dụng.'
            },
            'VB-019': {
                short: 'McDavid Hex Knee Pads là bảo vệ gối có lớp đệm hex nổi tiếng, phù hợp cho người chơi cần độ đệm rõ hơn.',
                full: 'McDavid Hex Knee Pads phù hợp cho người chơi bóng chuyền hoặc indoor cần tăng cảm giác an tâm khi tiếp xúc sàn. Lớp đệm hex là điểm nhận diện nổi bật, giúp sản phẩm phù hợp cho những buổi tập cường độ cao hoặc vị trí thường xuyên cứu bóng.'
            },
            'VB-020': {
                short: 'Mikasa VQ2000 là bóng chuyền mini dùng cho tập cảm giác, quà tặng hoặc hoạt động kỹ năng cơ bản.',
                full: 'Mikasa VQ2000 là bóng chuyền mini phù hợp cho nhu cầu giải trí, trưng bày, quà tặng hoặc các hoạt động kỹ năng đơn giản. Kích thước nhỏ giúp bóng dễ sử dụng trong không gian hẹp hoặc cho người dùng muốn một món phụ kiện mang nhận diện thương hiệu Mikasa.'
            },
            'VB-021': {
                short: 'adidas Court Team Bounce 2.0 là giày indoor phù hợp cho bóng chuyền và các môn cần bám sàn tốt.',
                full: 'adidas Court Team Bounce 2.0 phù hợp cho người chơi bóng chuyền phong trào cần sự ổn định, đệm vừa phải và khả năng bám sàn đáng tin cậy. Đây là mẫu giày indoor đa dụng, có thể dùng cho cả tập luyện nhiều buổi mỗi tuần trong nhà thi đấu.'
            },
            'VB-129': {
                short: 'Áo bóng chuyền có chữ ký Earvin Ngapeth là sản phẩm sưu tầm mang giá trị biểu tượng của ngôi sao bóng chuyền Pháp.',
                full: 'Signed jersey Earvin Ngapeth được định hướng như một món đồ memorabilia và trưng bày cao cấp cho người hâm mộ bóng chuyền. Sản phẩm nhấn vào giá trị sưu tầm, ý nghĩa biểu tượng và dấu ấn cá nhân của một trong những tay đập nổi tiếng nhất thế hệ hiện đại.'
            },
            'VB-130': {
                short: 'Áo bóng chuyền có chữ ký Yuji Nishida là món đồ sưu tầm dành cho fan bóng chuyền Nhật Bản và châu Á.',
                full: 'Signed jersey Yuji Nishida phù hợp cho người hâm mộ muốn sở hữu một món đồ lưu niệm gắn với ngôi sao tấn công nổi bật của bóng chuyền Nhật Bản. Đây là sản phẩm thiên sưu tầm và trưng bày hơn là sử dụng tập luyện thông thường.'
            },
            'BB-003': {
                short: 'Spalding React TF-250 là bóng rổ indoor/outdoor phổ thông với cảm giác cầm nắm ổn và độ bền khá tốt.',
                full: 'Spalding React TF-250 là mẫu bóng rổ được thiết kế cho cả sân trong nhà lẫn ngoài trời, phù hợp với nhu cầu tập luyện thường xuyên. Bóng có bề mặt composite cho cảm giác cầm nắm dễ chịu và duy trì độ bền tốt khi sử dụng ở sân bê tông hoặc cao su.'
            },
            'BB-005': {
                short: 'Molten BG3800 là bóng rổ FIBA Approved với bề mặt composite cao cấp và cảm giác kiểm soát ổn định.',
                full: 'Molten BG3800 là mẫu bóng rổ được FIBA phê duyệt, phù hợp cho cả indoor lẫn outdoor ở nhóm người chơi nghiêm túc. Thiết kế bề mặt và rãnh bóng giúp kiểm soát tốt hơn khi rê, chuyền và ném, đồng thời vẫn giữ độ bền trong quá trình tập luyện dài hạn.'
            },
            'BB-007': {
                short: 'Wilson NBA DRV Pro là bóng outdoor thuộc dòng NBA của Wilson, bền và dễ kiểm soát khi chơi sân xi măng.',
                full: 'Wilson NBA DRV Pro hướng đến môi trường chơi ngoài trời, nơi bóng cần vừa bền vừa giữ được cảm giác nảy ổn định. Các rãnh sâu giúp kiểm soát bóng dễ hơn khi rê và lên tay, phù hợp với sân trường học, công viên và sân phong trào.'
            },
            'BB-009': {
                short: 'Nike Giannis Immortality 4 là giày bóng rổ dành cho lối chơi bứt tốc thẳng, euro-step và đổi hướng liên tục.',
                full: 'Nike Giannis Immortality 4 được thiết kế theo tinh thần thi đấu của Giannis, phù hợp người chơi cần tốc độ lao rổ và chuyển hướng gắt. Mẫu giày mang lại cảm giác nhẹ, ổn định theo phương ngang và đủ đệm để dùng cho luyện tập hằng tuần.'
            },
            'BB-023': {
                short: 'Wilson Evolution Game Basketball là bóng rổ nổi tiếng ở sân trong nhà với cảm giác cầm êm và kiểm soát tốt.',
                full: 'Wilson Evolution Game Basketball là một trong những mẫu bóng indoor được ưa chuộng nhất ở nhóm trường học và thi đấu phong trào. Bề mặt composite mềm cho cảm giác cầm bóng tốt hơn, hỗ trợ rê bóng và ném rổ ổn định trong môi trường sân trong nhà.'
            },
            'BB-002': {
                short: 'Spalding NBA là bóng rổ phổ thông mang tinh thần nhận diện giải đấu NBA, phù hợp cho tập luyện hằng ngày.',
                full: 'Spalding NBA phù hợp cho người chơi phong trào cần một quả bóng mang nhận diện quen thuộc của bóng rổ chuyên nghiệp Mỹ. Sản phẩm hướng đến nhu cầu tập luyện và chơi giải trí thường xuyên, với cảm giác cầm bóng thân thiện và dễ sử dụng.'
            },
            'BB-004': {
                short: 'Spalding Excel TF-500 là bóng rổ indoor/outdoor thiên về cảm giác cầm chắc và độ bền cho tập luyện dài hạn.',
                full: 'Spalding Excel TF-500 phù hợp cho người chơi cần một quả bóng rổ composite để dùng thường xuyên ở nhiều mặt sân khác nhau. Bóng được định hướng cho cảm giác kiểm soát ổn định khi rê và chuyền, đồng thời vẫn đủ bền cho môi trường chơi ngoài trời.'
            },
            'BB-006': {
                short: 'Molten BG4500 là bóng rổ cao cấp phù hợp cho thi đấu và tập luyện ở cấp độ nghiêm túc hơn.',
                full: 'Molten BG4500 hướng đến người chơi muốn nâng cấp lên nhóm bóng rổ có cảm giác cầm, quỹ đạo nảy và độ hoàn thiện tốt hơn. Sản phẩm phù hợp cho thi đấu phong trào chất lượng cao, tập luyện đội nhóm hoặc sử dụng trong nhà thi đấu.'
            },
            'BB-008': {
                short: 'Wilson NBA Forge Plus là bóng rổ outdoor thiên độ bền, phù hợp sân công viên và sân trường học.',
                full: 'Wilson NBA Forge Plus phù hợp cho nhu cầu chơi ngoài trời với ưu tiên về độ bền và cảm giác rê bóng ổn định trên mặt sân cứng. Dòng bóng này phù hợp cho những buổi chơi pickup game, tập luyện cá nhân hoặc hoạt động cộng đồng.'
            },
            'BB-010': {
                short: 'Nike LeBron Witness 8 là giày bóng rổ thiên ổn định và hỗ trợ cho người chơi cần lao rổ mạnh mẽ.',
                full: 'Nike LeBron Witness 8 phù hợp cho người chơi bóng rổ cần một đôi giày ổn định, hỗ trợ tốt khi lao vào khu vực trong và đổi hướng ở tốc độ cao. Mẫu giày này theo tinh thần dòng LeBron với ưu tiên cho độ chắc chân và sự tự tin khi thi đấu phong trào.'
            },
            'BB-011': {
                short: 'adidas Own The Game 3.0 là giày bóng rổ phổ thông dễ tiếp cận, phù hợp cho tập luyện và thi đấu phong trào.',
                full: 'adidas Own The Game 3.0 phù hợp cho người mới chơi hoặc người cần một đôi giày bóng rổ cân bằng giữa giá trị sử dụng và sự ổn định. Thiết kế hướng đến tập luyện hằng tuần, chơi indoor hoặc outdoor nhẹ với cảm giác dễ làm quen.'
            },
            'BB-012': {
                short: 'adidas Dame Certified 3 là giày bóng rổ mang tinh thần thi đấu của Damian Lillard, thiên linh hoạt và kiểm soát nhịp chân.',
                full: 'adidas Dame Certified 3 phù hợp cho người chơi thích đổi hướng, tạo khoảng trống và xử lý bóng nhịp cao. Mẫu giày này mang DNA của dòng Dame với ưu tiên cho sự linh hoạt, phản hồi nhanh và cảm giác tin cậy trong thi đấu phong trào.'
            },
            'BB-013': {
                short: 'PUMA Court Pro là giày bóng rổ thiên phong cách sân trong nhà với cảm giác gọn, linh hoạt và hiện đại.',
                full: 'PUMA Court Pro phù hợp cho người chơi cần một đôi giày bóng rổ có thiết kế hiện đại, dễ mang và đủ linh hoạt cho tập luyện thường xuyên. Mẫu giày hướng tới sự gọn chân, dễ chuyển trạng thái và phù hợp với nhiều vị trí chơi khác nhau.'
            },
            'BB-014': {
                short: 'Under Armour Curry 3Z 24 là giày bóng rổ mang tinh thần tốc độ, phản xạ và thay đổi hướng liên tục.',
                full: 'Under Armour Curry 3Z 24 phù hợp cho người chơi thiên xử lý bóng, đổi hướng nhanh và ném trong nhịp độ cao. Dòng Curry thường được ưa chuộng nhờ cảm giác gọn chân và khả năng hỗ trợ các pha chuyển trạng thái nhanh trên sân.'
            },
            'BB-015': {
                short: 'Jordan Playground 2.0 8P là bóng rổ ngoài trời mang phong cách Jordan, phù hợp cho sân bê tông và luyện tập hằng ngày.',
                full: 'Jordan Playground 2.0 8P phù hợp cho người chơi thích bóng rổ outdoor và muốn một quả bóng mang nhận diện thương hiệu Jordan. Bóng hướng tới sự bền bỉ, dễ kiểm soát và phù hợp cho các buổi chơi phong trào hoặc tập ném rổ cá nhân.'
            },
            'BB-016': {
                short: 'Nike Everyday Playground 8P 2.0 là bóng rổ outdoor thiên độ bền và cảm giác kiểm soát ổn định.',
                full: 'Nike Everyday Playground 8P 2.0 phù hợp cho môi trường sân ngoài trời, nơi bóng cần độ bền và độ bám tay đáng tin cậy. Sản phẩm thích hợp cho người chơi phong trào, học sinh sinh viên hoặc các buổi tập kỹ thuật ngoài công viên.'
            },
            'BB-017': {
                short: 'Spalding Slam Jam Over-The-Door Mini Hoop là bộ bảng rổ mini gắn cửa dành cho giải trí và tập cảm giác ném.',
                full: 'Spalding Slam Jam Over-The-Door Mini Hoop phù hợp cho không gian phòng ngủ, ký túc xá hoặc văn phòng cần một bộ rổ mini giải trí. Sản phẩm thiên về trải nghiệm vui nhộn, luyện cảm giác tay và tạo điểm nhấn cho góc trưng bày bóng rổ.'
            },
            'BB-018': {
                short: 'Wilson NBA Authentic Indoor/Outdoor là bóng rổ đa dụng mang phong cách NBA, dùng tốt cho cả sân trong và ngoài nhà.',
                full: 'Wilson NBA Authentic Indoor/Outdoor phù hợp cho người chơi muốn một quả bóng linh hoạt giữa nhiều môi trường mặt sân. Dòng bóng này cân bằng giữa cảm giác cầm, độ nảy và độ bền, phù hợp cho tập luyện hằng ngày lẫn thi đấu phong trào.'
            },
            'BB-019': {
                short: 'McDavid Hex Shooter Arm Sleeve là ống tay bóng rổ hỗ trợ nén nhẹ và bảo vệ phần cánh tay khi thi đấu.',
                full: 'McDavid Hex Shooter Arm Sleeve phù hợp cho người chơi bóng rổ muốn thêm cảm giác hỗ trợ ở cánh tay trong các buổi tập hoặc thi đấu. Lớp đệm hex là điểm nhấn nổi bật, giúp sản phẩm vừa mang tính bảo vệ vừa tạo phong cách thi đấu đặc trưng.'
            },
            'BB-020': {
                short: 'Nike Elite Crew là tất bóng rổ cao cấp với độ ôm chân và đệm tốt cho tập luyện cường độ cao.',
                full: 'Nike Elite Crew là mẫu tất bóng rổ quen thuộc nhờ cảm giác ôm chân, đệm tốt và phù hợp cho những buổi tập có nhiều chuyển hướng, bật nhảy. Đây là phụ kiện giúp hoàn thiện trải nghiệm mang giày bóng rổ trong cả thi đấu và tập luyện.'
            },
            'BB-021': {
                short: 'Jordan Sport Dri-FIT Sleeveless Top là áo bóng rổ không tay thiên thoáng mát và linh hoạt khi vận động.',
                full: 'Jordan Sport Dri-FIT Sleeveless Top phù hợp cho bóng rổ, gym hoặc những buổi tập thể thao cường độ vừa đến cao. Thiết kế không tay tạo biên độ vận động thoải mái, trong khi chất liệu Dri-FIT hỗ trợ thoát ẩm tốt hơn khi luyện tập.'
            },
            'BB-022': {
                short: 'Nike Hoops Elite Backpack là balo bóng rổ nổi tiếng nhờ khả năng chứa giày, bóng và phụ kiện rất thực dụng.',
                full: 'Nike Hoops Elite Backpack là một trong những mẫu balo bóng rổ được ưa chuộng nhất nhờ ngăn chứa rộng, bố cục hợp lý và khả năng mang theo nhiều phụ kiện tập luyện. Mẫu balo này phù hợp cho người chơi thường xuyên di chuyển giữa lớp học, phòng gym và sân bóng.'
            },
            'BB-024': {
                short: 'Jordan Jumpman Sport Towel là khăn thể thao mang nhận diện Jumpman, phù hợp cho tập bóng rổ và gym.',
                full: 'Jordan Jumpman Sport Towel là phụ kiện phù hợp cho người tập bóng rổ hoặc vận động trong nhà cần một chiếc khăn gọn, dễ mang theo và có tính nhận diện thương hiệu cao. Đây là món phụ trợ đơn giản nhưng hữu ích trong mọi buổi tập đổ mồ hôi.'
            },
            'BB-025': {
                short: 'Under Armour Performance Towel là khăn thể thao đa dụng, thích hợp cho tập bóng rổ, gym và vận động hằng ngày.',
                full: 'Under Armour Performance Towel phù hợp cho người tập luyện thường xuyên muốn một chiếc khăn gọn, dễ giặt và dễ cho vào balo thể thao. Sản phẩm phù hợp cho cả bóng rổ, gym và những hoạt động vận động ra nhiều mồ hôi.'
            },
            'BB-126': {
                short: 'Áo Chicago Bulls có chữ ký Michael Jordan là sản phẩm memorabilia biểu tượng ở cấp độ sưu tầm rất cao.',
                full: 'Signed jersey Michael Jordan là dạng sản phẩm trưng bày và sưu tầm giàu giá trị biểu tượng, gắn với một trong những huyền thoại lớn nhất lịch sử bóng rổ. Món đồ này phù hợp cho người sưu tầm nghiêm túc, không gian trưng bày cá nhân hoặc showroom chuyên đề.'
            },
            'BB-127': {
                short: 'Áo Los Angeles Lakers có chữ ký LeBron James là món đồ sưu tầm cao cấp cho fan bóng rổ hiện đại.',
                full: 'Signed jersey LeBron James mang giá trị memorabilia và phù hợp cho người hâm mộ muốn lưu giữ một biểu tượng của bóng rổ đương đại. Sản phẩm thiên về sưu tầm, trưng bày và tạo điểm nhấn cho bộ sưu tập thể thao cao cấp.'
            },
            'TT-001': {
                short: 'Vợt bóng bàn 7 lớp gỗ phù hợp cho người chơi phổ thông cần cảm giác kiểm soát và độ bền cơ bản.',
                full: 'Vợt bóng bàn 7 lớp gỗ phù hợp cho người chơi phong trào hoặc người mới tập cần một mẫu vợt dễ làm quen. Cấu trúc 7 lớp thiên về sự chắc chắn của cốt gỗ, phù hợp cho luyện tập kỹ năng cơ bản và giải trí thường xuyên.'
            },
            'TT-007': {
                short: 'Butterfly Timo Boll CF 1000 là vợt bóng bàn carbon dành cho người chơi muốn tăng tốc độ và độ ổn định.',
                full: 'Butterfly Timo Boll CF 1000 phù hợp cho người chơi phong trào muốn nâng cấp lên một mẫu vợt có cảm giác chắc và tốc độ tốt hơn nhóm cơ bản. Tên gọi Timo Boll CF gắn với phong cách thiên tấn công và cảm giác mặt vợt ổn định hơn khi vào lực.'
            },
            'TT-008': {
                short: 'Butterfly Timo Boll CF 2000 là vợt thiên công mạnh hơn, phù hợp người chơi đã có nền tảng kỹ thuật tốt hơn.',
                full: 'Butterfly Timo Boll CF 2000 hướng tới người chơi muốn thêm lực đánh và độ quyết đoán trong các pha topspin, counter hoặc dứt điểm. So với các mẫu entry-level, cây vợt này phù hợp hơn cho người đã chơi đều và muốn cảm giác mạnh tay hơn.'
            },
            'TT-009': {
                short: 'Butterfly Addoy 2000 là vợt bóng bàn cân bằng giữa kiểm soát và tốc độ cho người chơi phong trào.',
                full: 'Butterfly Addoy 2000 phù hợp cho người chơi muốn một cây vợt dễ tiếp cận nhưng vẫn đủ tốc độ và độ xoáy để nâng dần trình độ. Đây là mẫu vợt thích hợp cho học sinh, sinh viên hoặc người chơi phong trào muốn sử dụng lâu dài.'
            },
            'TT-010': {
                short: 'Butterfly Wakaba 3000 là vợt thiên tấn công hơn, phù hợp cho người chơi đã quen cảm giác topspin cơ bản.',
                full: 'Butterfly Wakaba 3000 phù hợp cho người chơi phong trào muốn tăng thêm lực đánh và khả năng xoáy mà vẫn giữ được mức độ kiểm soát dễ chịu. Mẫu vợt này thường phù hợp cho người đã qua giai đoạn làm quen cơ bản và muốn bước lên nhóm vợt mạnh hơn.'
            },
            'TT-011': {
                short: 'DHS 4002 là vợt bóng bàn phổ thông cân bằng, phù hợp cho tập luyện hằng ngày và học kỹ thuật cơ bản.',
                full: 'DHS 4002 phù hợp cho người chơi phong trào cần một cây vợt dễ chơi, giá trị sử dụng rõ ràng và cảm giác kiểm soát ổn ở nhóm entry-level. Đây là lựa chọn phù hợp cho người mới tập hoặc người chơi giải trí thường xuyên.'
            },
            'TT-012': {
                short: 'DHS 3002 là vợt bóng bàn cơ bản dễ tiếp cận, phù hợp cho người mới bắt đầu hoặc chơi giải trí.',
                full: 'DHS 3002 hướng tới người chơi mới muốn làm quen với kỹ thuật cầm vợt, điều bóng và tập phản xạ cơ bản. Sản phẩm phù hợp cho nhu cầu chơi giải trí, học sinh hoặc sử dụng như cây vợt khởi đầu.'
            },
            'TT-013': {
                short: '729 Focus 1 là vợt bóng bàn phổ thông của 729, phù hợp cho người chơi đề cao kiểm soát nền tảng.',
                full: '729 Focus 1 phù hợp cho người chơi phong trào cần một cây vợt có cảm giác ổn định, dễ làm quen và dùng tốt cho bài tập kỹ thuật cơ bản. Đây là mẫu phù hợp để luyện đều tay, phản xạ và các cú đánh kiểm soát.'
            },
            'TT-015': {
                short: 'Donic Waldner 700 là vợt bóng bàn phong trào nâng cao, thiên cân bằng giữa kiểm soát và sức bật.',
                full: 'Donic Waldner 700 phù hợp cho người chơi muốn một cây vợt dễ nâng cấp từ nhóm cơ bản nhưng vẫn giữ chất kiểm soát. Cây vợt này phù hợp cho môi trường câu lạc bộ, tập luyện định kỳ và người chơi muốn tiến bộ đều đặn.'
            },
            'TT-018': {
                short: 'Butterfly Rozena là mặt vợt dễ tiếp cận hơn trong nhóm hiệu năng cao, thiên cân bằng giữa xoáy và kiểm soát.',
                full: 'Butterfly Rozena phù hợp cho người chơi muốn cảm giác công nghệ của Butterfly nhưng dễ kiểm soát hơn các dòng cao cấp quá mạnh. Mặt vợt này phù hợp cho topspin hiện đại, phản công và nâng cấp từ nhóm rubber trung cấp.'
            },
            'TT-019': {
                short: 'DHS Hurricane 3 Neo là mặt vợt nổi tiếng với độ bám cao, phù hợp cho lối chơi topspin và phát bóng xoáy mạnh.',
                full: 'DHS Hurricane 3 Neo là một trong những mặt vợt được nhắc đến nhiều nhất trong bóng bàn hiện đại, đặc biệt với người chơi thích tạo xoáy và chủ động ra lực. Mặt vợt này phù hợp cho người đã có kỹ thuật cổ tay và topspin tương đối tốt.'
            },
            'TT-020': {
                short: 'Donic Bluefire M1 là mặt vợt thiên tấn công với cảm giác mạnh, phù hợp cho người chơi thích topspin tốc độ cao.',
                full: 'Donic Bluefire M1 hướng tới người chơi thiên công cần sức bật và khả năng tạo xoáy rõ ở tốc độ cao. Đây là loại mặt vợt phù hợp cho người chơi đã có kỹ thuật và muốn một cấu hình mạnh tay hơn để thi đấu hoặc tập cường độ cao.'
            },
            'TT-021': {
                short: 'Xiom Vega X là mặt vợt hiện đại cân bằng giữa xoáy, lực và độ kiểm soát cho người chơi nâng cao.',
                full: 'Xiom Vega X phù hợp cho người chơi muốn một loại mặt vợt toàn diện, đủ xoáy để mở giao bóng nhưng vẫn giữ được độ ổn định trong rally. Đây là lựa chọn phù hợp cho người chơi phong trào nghiêm túc hoặc câu lạc bộ có tần suất tập đều.'
            },
            'TT-022': {
                short: 'Nittaku Premium 40+ 3-Star là bóng thi đấu cao cấp nổi tiếng với độ tròn và quỹ đạo ổn định.',
                full: 'Nittaku Premium 40+ 3-Star thuộc nhóm bóng thi đấu cao cấp được đánh giá cao ở độ ổn định, độ tròn và cảm giác nảy đều. Sản phẩm phù hợp cho tập luyện chất lượng cao, sparring hoặc thi đấu phong trào nghiêm túc.'
            },
            'TT-023': {
                short: 'DHS DJ40+ WTT là bóng bóng bàn 3 sao gắn với hệ sinh thái thi đấu hiện đại của WTT.',
                full: 'DHS DJ40+ WTT phù hợp cho người chơi cần một loại bóng 3 sao có độ ổn định tốt để tập luyện và thi đấu. Sản phẩm gắn với tinh thần thi đấu hiện đại và phù hợp cho môi trường câu lạc bộ hoặc giải phong trào chất lượng cao.'
            },
            'TT-024': {
                short: 'Butterfly R40+ 3-Star là bóng thi đấu chất lượng cao, phù hợp cho luyện tập nâng cao và thi đấu phong trào.',
                full: 'Butterfly R40+ 3-Star được định hướng cho nhu cầu thi đấu và luyện tập chất lượng cao, nơi độ đều và độ ổn định của quả bóng được chú trọng. Đây là lựa chọn phù hợp cho câu lạc bộ hoặc người chơi yêu cầu cảm giác bóng đáng tin cậy.'
            },
            'TT-025': {
                short: 'JOOLA Essentials Table Tennis Net Set là bộ lưới gọn nhẹ, tiện cho bàn tập cơ bản hoặc nhu cầu set-up nhanh.',
                full: 'JOOLA Essentials Table Tennis Net Set phù hợp cho người chơi cần một bộ lưới dễ lắp, dễ tháo để sử dụng tại nhà, trường học hoặc câu lạc bộ nhỏ. Đây là phụ kiện thiên về tính tiện dụng, phù hợp cho bàn tập cơ bản và môi trường luyện tập linh hoạt.'
            },
            'TT-130': {
                short: 'Vợt bóng bàn có chữ ký Ma Long là sản phẩm memorabilia cao cấp cho người sưu tầm bóng bàn.',
                full: 'Signed paddle Ma Long là món đồ sưu tầm thiên về giá trị biểu tượng hơn là sử dụng thi đấu thường xuyên. Sản phẩm gắn với hình ảnh một trong những tay vợt bóng bàn thành công nhất lịch sử hiện đại.'
            },
            'TT-131': {
                short: 'Vợt bóng bàn có chữ ký Fan Zhendong là món đồ sưu tầm dành cho người yêu bóng bàn đỉnh cao.',
                full: 'Signed paddle Fan Zhendong phù hợp cho người hâm mộ muốn sở hữu một món memorabilia gắn với tay vợt hàng đầu thế giới. Điểm nhấn của sản phẩm nằm ở yếu tố trưng bày, lưu niệm và giá trị sưu tầm cá nhân.'
            },
            'BM-002': {
                short: 'Yonex Astrox 88 Play là vợt cầu lông thiên tấn công, hỗ trợ lực đập và giữ cảm giác xoay vợt khá linh hoạt.',
                full: 'Yonex Astrox 88 Play phù hợp cho người chơi muốn làm quen với dòng Astrox theo phong cách thiên tấn công. Cây vợt có xu hướng trợ lực tốt hơn ở những pha đập cầu và ép cuối sân, trong khi vẫn giữ cảm giác đủ thân thiện cho người chơi phong trào.'
            },
            'BM-003': {
                short: 'Yonex Arcsaber 11 Play là vợt cân bằng, nhấn mạnh khả năng điều cầu và giữ nhịp trận đấu.',
                full: 'Yonex Arcsaber 11 Play phù hợp cho người chơi thích kiểm soát, điều cầu và giữ nhịp trong các pha rally thay vì chỉ tập trung đập cầu. Đây là lựa chọn hợp lý cho người chơi phong trào muốn một cây vợt dễ tiếp cận nhưng vẫn rõ chất kiểm soát của dòng Arcsaber.'
            },
            'BM-004': {
                short: 'Yonex Nanoflare 1000 Play là vợt nhẹ đầu, hỗ trợ tốc độ vung nhanh và phản tạt linh hoạt.',
                full: 'Yonex Nanoflare 1000 Play phù hợp cho người chơi thiên tốc độ, phản tạt và xử lý cầu nhanh ở nửa trước sân. Dòng Nanoflare nhấn mạnh cảm giác vung nhanh, thoát vợt tốt và dễ tạo ra những pha chuyển đổi công thủ nhịp cao.'
            },
            'BM-001': {
                short: 'Dòng Yonex Astrox nổi bật với đầu vợt nặng hơn để hỗ trợ smash và những pha tấn công cuối sân.',
                full: 'Yonex Astrox là dòng vợt cầu lông thiên tấn công, phù hợp người chơi thích đập cầu và ép nhịp từ cuối sân. Cân bằng đầu nặng và triết lý Rotational Generator System của Yonex giúp mẫu vợt duy trì lực đánh tốt mà vẫn dễ xoay trở hơn khi đổi nhịp.'
            },
            'BM-005': {
                short: 'Yonex Nanoflare 1000 Game là vợt cầu lông thiên head-light cho tốc độ vung nhanh và phản tạt linh hoạt.',
                full: 'Yonex Nanoflare 1000 Game phù hợp người chơi thích tốc độ vung nhanh, phản tạt và điều cầu liên tục ở tốc độ cao. Đây là phiên bản Game trong dòng Nanoflare 1000, cân bằng nhẹ đầu và cho cảm giác ra cầu nhanh, sắc ở các pha chuyển đổi công thủ.'
            },
            'BM-012': {
                short: 'Victor Master Ace là ống cầu lông lông vũ cao cấp cho thi đấu và những buổi tập yêu cầu độ ổn định cao.',
                full: 'Victor Master Ace thuộc nhóm cầu lông lông vũ cao cấp, được đánh giá cao ở độ ổn định quỹ đạo và cảm giác chạm cầu sạch. Mẫu cầu này phù hợp cho thi đấu, sparring hoặc những buổi tập kỹ thuật cần đường bay đều và tốc độ nhất quán.'
            },
            'BM-022': {
                short: 'Yonex Astrox 77 Play là vợt thiên công mềm hơn, phù hợp cho người chơi muốn lực đánh dễ ra hơn.',
                full: 'Yonex Astrox 77 Play hướng tới người chơi phong trào thích cảm giác trợ lực tốt ở các pha clear và smash nhưng không muốn một cây vợt quá khó thuần. Đây là lựa chọn phù hợp để làm quen với chất vợt tấn công của dòng Astrox trong mức chơi phổ thông.'
            },
            'BM-023': {
                short: 'Yonex Crew Neck Shirt 10627 là áo thể thao chính hãng, nhẹ và thoải mái cho cầu lông lẫn tập luyện hằng ngày.',
                full: 'Yonex Crew Neck Shirt 10627 là mẫu áo thể thao dạng cổ tròn phù hợp cho cầu lông, pickleball hoặc các buổi tập vận động vừa đến cao. Phom áo gọn gàng, chất vải thiên về sự nhẹ và giúp người mặc dễ phối cùng quần short hoặc jogger thể thao.'
            },
            'BM-024': {
                short: 'VICTOR Knitted Shorts R-3096 A là quần short thể thao gọn nhẹ, phù hợp cho cầu lông và các môn trong nhà.',
                full: 'VICTOR Knitted Shorts R-3096 A là quần short thể thao chính hãng của Victor, phù hợp cho tập luyện cầu lông nhờ độ nhẹ, độ thoáng và biên độ vận động tốt. Đây là mẫu quần dễ phối với áo thi đấu hoặc áo training trong môi trường thi đấu và câu lạc bộ.'
            },
            'BM-006': {
                short: 'Li-Ning Windstorm 72 là vợt cầu lông siêu nhẹ, phù hợp cho người chơi thiên tốc độ và phản tạt.',
                full: 'Li-Ning Windstorm 72 phù hợp cho người chơi thích vung vợt nhanh, phản tạt linh hoạt và giảm cảm giác nặng tay khi chơi lâu. Dòng Windstorm nổi bật ở trọng lượng nhẹ, phù hợp cho người chơi phong trào thiên tốc độ hoặc cổ tay chưa quá khỏe.'
            },
            'BM-007': {
                short: 'Li-Ning Halbertec 2000 là vợt cầu lông thiên cân bằng, phù hợp cho người chơi muốn vừa kiểm soát vừa tấn công.',
                full: 'Li-Ning Halbertec 2000 phù hợp cho người chơi cần một cây vợt linh hoạt giữa các pha điều cầu, tì đè và dứt điểm vừa phải. Đây là lựa chọn hợp lý cho người chơi phong trào muốn một cây vợt dễ dùng ở nhiều tình huống hơn.'
            },
            'BM-008': {
                short: 'Victor Thruster K 12 M là vợt cầu lông thiên công, hỗ trợ tốt cho lối chơi cuối sân và những pha smash mạnh.',
                full: 'Victor Thruster K 12 M phù hợp cho người chơi muốn tập trung vào sức mạnh ở những pha đập cầu và ép sân từ cuối sân. Dòng Thruster của Victor thường thiên về cảm giác lực đánh rõ và phù hợp cho người chơi tấn công.'
            },
            'BM-009': {
                short: 'Victor Auraspeed 90K II là vợt cầu lông thiên tốc độ cao, phù hợp cho phản tạt và chuyển đổi công thủ nhanh.',
                full: 'Victor Auraspeed 90K II phù hợp cho người chơi yêu thích nhịp độ cao, phản tạt nhanh và xử lý cầu sớm. Dòng Auraspeed nổi bật nhờ cảm giác vung nhanh, hợp với lối chơi đôi hiện đại hoặc người chơi muốn tăng tốc độ đầu vợt.'
            },
            'BM-010': {
                short: 'Yonex Aerosensa 30 là cầu lông lông vũ cao cấp, phù hợp cho tập kỹ thuật và thi đấu chất lượng cao.',
                full: 'Yonex Aerosensa 30 thuộc nhóm cầu lông lông vũ cao cấp được nhiều người chơi sử dụng cho sparring, giải phong trào hoặc tập kỹ thuật nghiêm túc. Điểm mạnh của sản phẩm nằm ở độ ổn định quỹ đạo và cảm giác cầu tương đối đồng đều.'
            },
            'BM-011': {
                short: 'Yonex Mavis 350 là cầu lông nhựa phổ biến cho tập luyện phong trào nhờ độ bền và chi phí hợp lý.',
                full: 'Yonex Mavis 350 phù hợp cho môi trường luyện tập thường xuyên, câu lạc bộ cơ bản hoặc người chơi phong trào cần một loại cầu nhựa bền. Đây là lựa chọn rất phổ biến cho những buổi đánh đều tay, giao lưu và tập kỹ thuật cơ bản.'
            },
            'BM-013': {
                short: 'Li-Ning No.1 là cầu lông lông vũ cao cấp nổi tiếng với tốc độ và cảm giác đánh ổn định.',
                full: 'Li-Ning No.1 phù hợp cho người chơi cần một ống cầu lông lông vũ chất lượng cao để thi đấu hoặc sparring. Sản phẩm được ưa chuộng nhờ cảm giác cầu sạch, quỹ đạo tương đối ổn định và đáp ứng tốt cho các buổi đánh trình độ cao hơn.'
            },
            'BM-014': {
                short: 'Yonex Power Cushion 65 Z3 là giày cầu lông cao cấp cân bằng giữa êm chân, bám sân và ổn định ngang.',
                full: 'Yonex Power Cushion 65 Z3 phù hợp cho người chơi cầu lông cần một đôi giày toàn diện để dùng lâu dài trong nhà thi đấu. Đây là dòng giày nổi tiếng của Yonex nhờ sự cân bằng giữa đệm êm, độ bám sàn và cảm giác chắc chân khi đổi hướng.'
            },
            'BM-015': {
                short: 'Yonex Aerus Z2 là giày cầu lông thiên nhẹ, phù hợp cho người chơi thích cảm giác nhanh và linh hoạt.',
                full: 'Yonex Aerus Z2 hướng đến người chơi ưu tiên trọng lượng nhẹ và cảm giác di chuyển nhanh trong những pha bứt bước nhỏ liên tục. Mẫu giày này phù hợp với lối chơi tốc độ, phản tạt và các buổi tập cần di chuyển nhiều.'
            },
            'BM-016': {
                short: 'Victor A970 NitroLite là giày cầu lông thiên ổn định và phản hồi tốt cho tập luyện nghiêm túc.',
                full: 'Victor A970 NitroLite phù hợp cho người chơi cần một đôi giày cầu lông chắc chân, bám sàn và đủ linh hoạt cho thi đấu phong trào nghiêm túc. Mẫu giày này hướng đến cảm giác ổn định hơn ở các pha đạp ngang và chuyển hướng nhanh.'
            },
            'BM-017': {
                short: 'Li-Ning Ranger Lite Z1 là giày cầu lông phổ thông dễ tiếp cận, phù hợp cho người chơi phong trào.',
                full: 'Li-Ning Ranger Lite Z1 phù hợp cho người chơi muốn một đôi giày cầu lông dễ tiếp cận, dễ dùng và đủ hỗ trợ cho tập luyện hằng tuần. Sản phẩm thiên về tính thực dụng, phù hợp cho người mới hoặc người chơi phong trào cần một lựa chọn cân bằng.'
            },
            'BM-018': {
                short: 'Yonex BG65 là cước cầu lông kinh điển thiên độ bền, phù hợp cho người chơi đánh thường xuyên.',
                full: 'Yonex BG65 là một trong những mẫu cước cầu lông phổ biến nhất nhờ độ bền tốt và cảm giác đánh dễ làm quen. Sản phẩm phù hợp cho người chơi phong trào, câu lạc bộ hoặc người ưu tiên tuổi thọ mặt cước khi sử dụng lâu dài.'
            },
            'BM-019': {
                short: 'Yonex Nanogy 95 là cước cầu lông cân bằng giữa độ bền và độ phản hồi, phù hợp cho nhiều kiểu người chơi.',
                full: 'Yonex Nanogy 95 phù hợp cho người chơi muốn một mẫu cước vừa bền vừa có cảm giác nảy và repulsion khá tốt. Đây là lựa chọn phù hợp cho người chơi phong trào nâng cao muốn tìm điểm cân bằng giữa lực cầu và tuổi thọ mặt cước.'
            },
            'BM-020': {
                short: 'Yonex Expert Tournament Bag là túi cầu lông sức chứa lớn, phù hợp cho người mang nhiều vợt và đồ thi đấu.',
                full: 'Yonex Expert Tournament Bag phù hợp cho người chơi thường xuyên mang theo nhiều cây vợt, quần áo và phụ kiện tới sân. Đây là mẫu túi thiên về nhu cầu thi đấu hoặc tập luyện nghiêm túc, nơi khả năng sắp xếp và sức chứa được ưu tiên.'
            },
            'BM-021': {
                short: 'Yonex AC102EX Super Grap là quấn cán cầu lông nổi tiếng nhờ độ bám tốt và cảm giác cầm ổn định.',
                full: 'Yonex AC102EX Super Grap là mẫu quấn cán rất phổ biến trong cộng đồng cầu lông nhờ độ bám tay tốt, dễ quấn và phù hợp với nhiều loại cán vợt. Đây là phụ kiện cơ bản nhưng ảnh hưởng rõ rệt tới cảm giác cầm và độ tự tin khi thi đấu.'
            },
            'BM-128': {
                short: 'Vợt cầu lông có chữ ký Lin Dan là món đồ sưu tầm giàu giá trị biểu tượng với fan cầu lông thế giới.',
                full: 'Signed racket Lin Dan là sản phẩm memorabilia phù hợp cho người sưu tầm hoặc trưng bày hơn là dùng thi đấu thực tế. Sản phẩm gắn với hình ảnh một trong những tay vợt cầu lông vĩ đại nhất lịch sử hiện đại.'
            },
            'BM-129': {
                short: 'Vợt cầu lông có chữ ký Viktor Axelsen là sản phẩm sưu tầm cao cấp dành cho fan cầu lông đương đại.',
                full: 'Signed racket Viktor Axelsen phù hợp cho người hâm mộ muốn sở hữu một món đồ lưu niệm gắn với nhà vô địch cầu lông thế hệ hiện đại. Giá trị của sản phẩm nằm ở yếu tố trưng bày, kỷ niệm và sưu tầm lâu dài.'
            }
        };

        return descriptionMap[sku] || null;
    }

    function isReadableProductDescription(value) {
        const cleaned = sanitizeProductText(value).trim();
        if (!cleaned) {
            return false;
        }

        return !hasBrokenTextArtifacts(value) && !/\?/.test(cleaned) && cleaned.length >= 16;
    }

    function getProductShortDescription(product) {
        const explicit = sanitizeProductText(product?.mo_ta_ngan || product?.ghi_chu).trim();
        if (isReadableProductDescription(product?.mo_ta_ngan || product?.ghi_chu) && explicit) {
            return explicit.split(/\r?\n/)[0].trim();
        }

        const curated = getCuratedProductDescription(product);
        if (curated?.short) {
            return curated.short;
        }

        return `${product?.thuong_hieu || 'Flare Fitness'} ${getProductGroupLabel(product).toLowerCase()} dành cho ${String(product?.danh_muc || 'thể thao').toLowerCase()}, phù hợp mua luyện tập hoặc thi đấu.`;
    }

    function getProductDescription(product) {
        const explicit = sanitizeProductText(product?.ghi_chu || '').trim();
        if (isReadableProductDescription(product?.ghi_chu || '') && explicit) {
            return explicit;
        }

        const curated = getCuratedProductDescription(product);
        if (curated?.full) {
            return curated.full;
        }

        const details = [
            `${product?.ten_san_pham || 'Sản phẩm'} thuộc nhóm ${getProductGroupLabel(product).toLowerCase()} của bộ môn ${String(product?.danh_muc || 'thể thao').toLowerCase()}.`,
            `Thương hiệu: ${product?.thuong_hieu || 'Flare Fitness'}.`,
            `Size / quy cách: ${normalizeSizeValue(product?.size) || 'Tiêu chuẩn'}.`,
            `Màu sắc / phiên bản: ${sanitizeProductText(product?.mau) || 'Tùy mẫu thực tế'}.`,
            'Nhân viên có thể cập nhật mô tả chi tiết hơn cho sản phẩm này trong phần quản lý sản phẩm.'
        ];

        return details.join('\n');
    }

    function buildProductReviewStars(rating) {
        const normalized = Math.min(5, Math.max(1, Math.round(Number(rating || 0))));
        return `${'★'.repeat(normalized)}${'☆'.repeat(5 - normalized)}`;
    }

    function buildSampleReviewsForProduct(product) {
        const reviewerSeeds = [
            ['Nguyễn Minh', 5, 'Đóng gói cẩn thận, chất lượng hoàn thiện tốt và đúng mô tả.'],
            ['Trần Huy', 4, 'Cảm giác dùng ổn, phù hợp để tập luyện và giá đang khá hợp lý.'],
            ['Lê An', 5, 'Mẫu đẹp, lên form tốt và giao hàng nhanh hơn dự kiến.']
        ];

        return reviewerSeeds.map(([reviewer, rating, content], index) => ({
            id: `seed-review-${product.id}-${index + 1}`,
            productId: String(product.id || ''),
            reviewer,
            rating,
            content: `${content} Mình chọn ${product.ten_san_pham || 'sản phẩm này'} và thấy khá yên tâm khi mua.`,
            status: 'Hiển thị',
            createdAt: new Date(Date.now() - (index + 1) * 86400000).toISOString()
        }));
    }

    function getProductReviewsForDetail(product) {
        const visibleReviews = getManagedReviews()
            .filter(review => String(review.productId || '') === String(product.id || ''))
            .filter(review => normalizeText(review.status || 'Hiển thị') !== 'an')
            .map(review => ({
                id: review.id,
                productId: String(product.id || ''),
                reviewer: sanitizeProductText(review.reviewer) || 'Khách hàng',
                rating: Math.min(5, Math.max(1, Number(review.rating || 5))),
                content: sanitizeProductText(review.content) || `Đánh giá cho ${product.ten_san_pham || 'sản phẩm'}.`,
                createdAt: review.createdAt || new Date().toISOString()
            }));

        if (visibleReviews.length >= 2) {
            return visibleReviews.slice(0, 3);
        }

        const seedReviews = buildSampleReviewsForProduct(product).filter(seed => (
            !visibleReviews.some(review => normalizeText(review.reviewer) === normalizeText(seed.reviewer))
        ));

        return [...visibleReviews, ...seedReviews].slice(0, 3);
    }

    function getRelatedProductsForDetail(product) {
        const targetGroup = normalizeText(getProductGroupLabel(product));
        const targetSport = normalizeText(getCanonicalSportFromProduct(product));
        const targetBrand = normalizeText(product?.thuong_hieu);

        return allProducts
            .filter(candidate => String(candidate.id) !== String(product.id))
            .map(candidate => {
                let score = 0;
                if (normalizeText(getProductGroupLabel(candidate)) === targetGroup) score += 5;
                if (normalizeText(getCanonicalSportFromProduct(candidate)) === targetSport) score += 3;
                if (normalizeText(candidate.thuong_hieu) === targetBrand) score += 1;
                return { candidate, score };
            })
            .filter(item => item.score > 0)
            .sort((left, right) => {
                if (right.score !== left.score) {
                    return right.score - left.score;
                }
                return Number(right.candidate.ton_kho || 0) - Number(left.candidate.ton_kho || 0);
            })
            .slice(0, 6)
            .map(item => item.candidate);
    }

    function updateProductDetailQuantity(delta) {
        const product = findProductById(currentDetailProductId);
        const maxQuantity = getCartLineMaxQuantity(product);
        currentDetailQuantity = Math.min(maxQuantity, Math.max(1, currentDetailQuantity + Number(delta || 0)));
        if (productDetailQuantityInput) {
            productDetailQuantityInput.value = String(currentDetailQuantity);
        }
    }

    function syncProductDetailQuantityInput() {
        const product = findProductById(currentDetailProductId);
        const maxQuantity = getCartLineMaxQuantity(product);
        const nextValue = Math.round(Number(productDetailQuantityInput?.value || 1));
        currentDetailQuantity = Math.min(maxQuantity, Math.max(1, nextValue || 1));
        if (productDetailQuantityInput) {
            productDetailQuantityInput.value = String(currentDetailQuantity);
        }
    }

    function buildCartLineId(productId, size, variantType = '') {
        const sizeKey = normalizeText(size || 'Tieu chuan').replace(/\s+/g, '-') || 'tieu-chuan';
        const typeKey = normalizeText(variantType || '').replace(/\s+/g, '-') || 'mac-dinh';
        return `${String(productId)}::${sizeKey}::${typeKey}`;
    }

    function normalizeCartSelectionFlag(value) {
        if (value === false || value === 0 || value === null) {
            return false;
        }

        const normalized = normalizeText(value);
        if (['false', '0', 'no', 'off', 'khong', 'bo chon', 'unchecked'].includes(normalized)) {
            return false;
        }

        return true;
    }

    function getCartItems() {
        const cartStorageKey = getCurrentCartStorageKey();
        if (!cartStorageKey) {
            return [];
        }

        const storedItems = readStorage(cartStorageKey, []);
        if (!Array.isArray(storedItems)) {
            return [];
        }

        const cartMap = new Map();

        storedItems.forEach(rawItem => {
            const productId = String(rawItem?.productId ?? rawItem?.id ?? '').trim();
            if (!productId) {
                return;
            }

            const product = findProductById(productId);
            const sizeOptions = getProductSizeOptions(product);
            const typeOptions = getProductTypeOptions(product);
            const fallbackSize = sizeOptions[0] || 'Tieu chuan';
            const size = String(rawItem?.size || fallbackSize).trim() || fallbackSize;
            const fallbackVariantType = typeOptions.length ? typeOptions[0] : '';
            const variantType = String(rawItem?.variantType || rawItem?.type || fallbackVariantType).trim();
            const lineId = buildCartLineId(productId, size, variantType);
            const quantity = Math.max(1, Math.round(Number(rawItem?.quantity || 1)));
            const selected = normalizeCartSelectionFlag(rawItem?.selected);

            if (cartMap.has(lineId)) {
                const existing = cartMap.get(lineId);
                existing.quantity += quantity;
                existing.selected = existing.selected || selected;
                return;
            }

            cartMap.set(lineId, {
                lineId,
                productId,
                size,
                variantType,
                quantity,
                selected
            });
        });

        return Array.from(cartMap.values());
    }

    function saveCartItems(items) {
        const cartStorageKey = getCurrentCartStorageKey();
        if (!cartStorageKey) {
            updateCartCount();
            return;
        }

        if (!Array.isArray(items) || !items.length) {
            localStorage.removeItem(cartStorageKey);
            updateCartCount();
            return;
        }

        const normalizedItems = items.map(item => ({
            lineId: String(item.lineId || buildCartLineId(item.productId, item.size, item.variantType)),
            productId: String(item.productId),
            size: String(item.size || 'Tieu chuan'),
            variantType: String(item.variantType || ''),
            quantity: Math.max(1, Math.round(Number(item.quantity || 1))),
            selected: normalizeCartSelectionFlag(item.selected)
        }));

        localStorage.setItem(cartStorageKey, JSON.stringify(normalizedItems));
        updateCartCount();
    }

    function getHydratedCartItems() {
        return getCartItems()
            .map(item => {
                const product = findProductById(item.productId);
                if (!product) {
                    return null;
                }

                const sizeOptions = getProductSizeOptions(product);
                const typeOptions = getProductTypeOptions(product);
                const resolvedSize = sizeOptions.includes(item.size) ? item.size : (sizeOptions[0] || 'Tieu chuan');
                const resolvedVariantType = typeOptions.length
                    ? (typeOptions.includes(item.variantType) ? item.variantType : (item.variantType || typeOptions[0]))
                    : '';
                const maxQuantity = getCartLineMaxQuantity(product);
                const quantity = Math.min(Math.max(1, Number(item.quantity || 1)), maxQuantity);
                const unitPrice = getProductCurrentPrice(product);

                return {
                    ...item,
                    lineId: buildCartLineId(item.productId, resolvedSize, resolvedVariantType),
                    product,
                    size: resolvedSize,
                    sizeOptions,
                    variantType: resolvedVariantType,
                    typeOptions,
                    quantity,
                    unitPrice,
                    subtotal: unitPrice * quantity,
                    selected: normalizeCartSelectionFlag(item.selected)
                };
            })
            .filter(Boolean);
    }

    function updateCartLineSize(lineId, size) {
        const cartItems = getCartItems();
        const targetIndex = cartItems.findIndex(item => item.lineId === lineId);
        if (targetIndex === -1) {
            return;
        }

        const targetItem = cartItems[targetIndex];
        const nextSize = String(size || '').trim() || targetItem.size;
        const nextLineId = buildCartLineId(targetItem.productId, nextSize, targetItem.variantType);

        if (nextLineId === lineId) {
            return;
        }

        const duplicateIndex = cartItems.findIndex((item, index) => index !== targetIndex && item.lineId === nextLineId);
        if (duplicateIndex !== -1) {
            cartItems[duplicateIndex].quantity += targetItem.quantity;
            cartItems[duplicateIndex].selected = cartItems[duplicateIndex].selected || targetItem.selected;
            cartItems.splice(targetIndex, 1);
        } else {
            cartItems[targetIndex] = {
                ...targetItem,
                size: nextSize,
                lineId: nextLineId
            };
        }

        saveCartItems(cartItems);
        renderCartView();
        syncMainView();
    }

    function addProductSelectionToCart(product, size, quantity, options = {}) {
        if (!ensureCartAccess('Hãy đăng nhập trước khi thêm sản phẩm vào giỏ hàng.')) {
            return null;
        }

        if (!product) {
            return null;
        }

        if (Number(product.ton_kho || 0) <= 0) {
            if (options.errorElement) {
                options.errorElement.textContent = 'Sản phẩm này hiện đã hết hàng.';
                options.errorElement.classList.remove('hidden');
            }
            return null;
        }

        const sizeOptions = getProductSizeOptions(product);
        const typeOptions = getProductTypeOptions(product);
        const resolvedSize = String(size || sizeOptions[0] || 'Tieu chuan').trim() || (sizeOptions[0] || 'Tieu chuan');
        const resolvedVariantType = typeOptions.length
            ? (String(options.variantType || typeOptions[0]).trim() || typeOptions[0])
            : '';
        const nextLineId = buildCartLineId(product.id, resolvedSize, resolvedVariantType);
        const nextQuantity = Math.max(1, Math.round(Number(quantity || 1)));
        const maxQuantity = getCartLineMaxQuantity(product);
        const cartItems = getCartItems();

        if (options.exclusiveSelection) {
            cartItems.forEach(item => {
                item.selected = false;
            });
        }

        const existingLine = cartItems.find(item => item.lineId === nextLineId);
        const mergedQuantity = (existingLine?.quantity || 0) + nextQuantity;
        if (mergedQuantity > maxQuantity) {
            if (options.errorElement) {
                options.errorElement.textContent = `Số lượng tối đa cho sản phẩm này là ${maxQuantity}.`;
                options.errorElement.classList.remove('hidden');
            }
            return null;
        }

        if (existingLine) {
            existingLine.quantity = mergedQuantity;
            existingLine.variantType = resolvedVariantType;
            existingLine.selected = true;
        } else {
            cartItems.push({
                lineId: nextLineId,
                productId: String(product.id),
                size: resolvedSize,
                variantType: resolvedVariantType,
                quantity: nextQuantity,
                selected: true
            });
        }

        saveCartItems(cartItems);
        return nextLineId;
    }

    function addCurrentDetailSelectionToCart(options = {}) {
        const product = findProductById(currentDetailProductId);
        if (!product) {
            return;
        }

        if (productDetailError) {
            productDetailError.textContent = '';
            productDetailError.classList.add('hidden');
        }

        const lineId = addProductSelectionToCart(product, currentDetailSelectedSize, currentDetailQuantity, {
            variantType: currentDetailSelectedType,
            exclusiveSelection: options.exclusiveSelection,
            errorElement: productDetailError
        });

        if (!lineId) {
            return;
        }

        updateCartCount();
        renderCartView();
        renderWishlistView();

        if (options.openCheckout) {
            const nextCartItems = getCartItems().map(item => ({
                ...item,
                selected: item.lineId === lineId
            }));
            saveCartItems(nextCartItems);
            openCheckoutView();
            return;
        }

        renderProductDetailView();
        showCenteredMessage(`\u0110\u00e3 th\u00eam "${sanitizeProductText(product.ten_san_pham || 's\u1ea3n ph\u1ea9m')}" v\u00e0o gi\u1ecf h\u00e0ng.`);
    }

    function openProductDetailView(productId) {
        const product = findProductById(productId);
        if (!product) {
            return;
        }

        const sizeOptions = getProductSizeOptions(product);
        const typeOptions = getProductTypeOptions(product);

        currentDetailProductId = String(product.id);
        currentDetailSelectedSize = sizeOptions[0] || 'Tieu chuan';
        currentDetailSelectedType = typeOptions[0] || '';
        currentDetailQuantity = 1;
        currentDetailImageIndex = 0;
        currentView = 'product-detail';

        userDropdown.classList.add('hidden');
        closeMegaMenu();
        setTrackedPageContext('PRODUCT_DETAIL', `product:${product.id}`, {
            productId: product.id,
            categoryKey: product.danh_muc || '',
            brandKey: product.thuong_hieu || ''
        });
        trackBehaviorEvent({
            eventType: 'PRODUCT_VIEW',
            pageType: 'PRODUCT_DETAIL',
            pageKey: product.sku || String(product.id),
            productId: product.id,
            categoryKey: product.danh_muc,
            brandKey: product.thuong_hieu,
            priceValue: getProductCurrentPrice(product)
        });
        renderProductDetailView();
        void loadDetailRecommendations(product.id, true);
        syncMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderProductDetailView() {
        const product = findProductById(currentDetailProductId);
        if (!product) {
            showCatalogView();
            return;
        }

        const sizeOptions = getProductSizeOptions(product);
        const typeOptions = getProductTypeOptions(product);
        const galleryImages = getProductGalleryImages(product);
        const reviews = getProductReviewsForDetail(product);
        const averageRating = reviews.length
            ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
            : 5;

        if (!sizeOptions.includes(currentDetailSelectedSize)) {
            currentDetailSelectedSize = sizeOptions[0] || 'Tieu chuan';
        }
        if (typeOptions.length) {
            if (!typeOptions.includes(currentDetailSelectedType)) {
                currentDetailSelectedType = typeOptions[0];
            }
        } else {
            currentDetailSelectedType = '';
        }

        currentDetailImageIndex = Math.max(0, Math.min(currentDetailImageIndex, galleryImages.length - 1));
        currentDetailQuantity = Math.min(getCartLineMaxQuantity(product), Math.max(1, currentDetailQuantity));

        if (productDetailMainImage) {
            productDetailMainImage.src = galleryImages[currentDetailImageIndex] || getProductImageUrl(product);
            productDetailMainImage.alt = product.ten_san_pham || 'Sản phẩm';
        }
        if (productDetailThumbnails) {
            productDetailThumbnails.innerHTML = galleryImages.map((imageUrl, index) => `
                <button
                    class="product-detail-thumb ${index === currentDetailImageIndex ? 'active' : ''}"
                    type="button"
                    data-detail-image-index="${index}"
                    aria-label="Xem ảnh ${index + 1}"
                >
                    <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml((product.ten_san_pham || 'Sản phẩm') + ' ' + (index + 1))}" loading="lazy">
                </button>
            `).join('');
        }

        productDetailBreadcrumb.textContent = ['Trang chủ', product.danh_muc || 'Danh mục', getProductGroupLabel(product)].filter(Boolean).join(' > ');
        productDetailCategory.textContent = `${product.danh_muc || 'Sản phẩm'} • ${getProductGroupLabel(product)}`;
        productDetailTitle.textContent = product.ten_san_pham || 'Sản phẩm';
        productDetailBrand.textContent = `Thương hiệu: ${product.thuong_hieu || 'Không rõ'}`;
        productDetailRating.textContent = `${averageRating.toFixed(1)} ${buildProductReviewStars(averageRating)}`;
        productDetailStock.textContent = `Còn ${Number(product.ton_kho || 0)} sản phẩm`;
        productDetailPrice.innerHTML = renderPriceDisplay(product, {
            wrapperClass: 'price-stack product-detail-price-stack',
            currentClass: 'product-price'
        });
        productDetailShortDescription.textContent = getProductShortDescription(product);

        productDetailTypeWrap?.classList.toggle('hidden', !typeOptions.length);
        if (productDetailTypeOptions) {
            productDetailTypeOptions.innerHTML = typeOptions.map(option => `
                <button
                    class="product-detail-option-btn ${option === currentDetailSelectedType ? 'active' : ''}"
                    type="button"
                    data-detail-type="${escapeHtml(option)}"
                >
                    ${escapeHtml(option)}
                </button>
            `).join('');
        }

        productDetailSizeWrap?.classList.toggle('hidden', !sizeOptions.length);
        if (productDetailSizeOptions) {
            productDetailSizeOptions.innerHTML = sizeOptions.map(option => `
                <button
                    class="product-detail-option-btn ${option === currentDetailSelectedSize ? 'active' : ''}"
                    type="button"
                    data-detail-size="${escapeHtml(option)}"
                >
                    ${escapeHtml(option)}
                </button>
            `).join('');
        }

        if (productDetailQuantityInput) {
            productDetailQuantityInput.max = String(getCartLineMaxQuantity(product));
            productDetailQuantityInput.value = String(currentDetailQuantity);
        }

        syncProductDetailWishlistState(product.id);
        if (productDetailAddCartBtn) {
            productDetailAddCartBtn.disabled = Number(product.ton_kho || 0) <= 0;
        }
        if (productDetailBuyNowBtn) {
            productDetailBuyNowBtn.disabled = Number(product.ton_kho || 0) <= 0;
        }
        if (productDetailError) {
            productDetailError.textContent = '';
            productDetailError.classList.add('hidden');
        }

        productDetailDescription.textContent = getProductDescription(product);
        productDetailReviewCount.textContent = `${reviews.length} đánh giá`;
        productDetailReviews.innerHTML = reviews.map(review => `
            <article class="product-review-card">
                <div class="product-review-head">
                    <div>
                        <p class="product-reviewer">${escapeHtml(review.reviewer || 'Khách hàng')}</p>
                        <p class="product-review-stars">${buildProductReviewStars(review.rating)}</p>
                    </div>
                    <p class="product-review-meta">${escapeHtml(new Date(review.createdAt).toLocaleDateString('vi-VN'))}</p>
                </div>
                <p class="product-review-content">${escapeHtml(review.content || '')}</p>
            </article>
        `).join('');

        const hasFreshDetailRecommendations = detailRecommendationSignature.endsWith(`:detail:${String(product.id)}`);
        const relatedProducts = hasFreshDetailRecommendations && detailRecommendationProducts.length
            ? detailRecommendationProducts
            : getRelatedProductsForDetail(product);

        productDetailRelated.innerHTML = relatedProducts.length
            ? relatedProducts.map(buildProductCardMarkup).join('')
            : '<p class="workspace-empty">Chưa có thêm sản phẩm cùng nhóm để gợi ý.</p>';

        repairRenderedContent(productDetailView);
    }

    function buildProductCardMarkup(product) {
        const badge = product.ton_kho <= 3
            ? '<span class="badge danger">Sap het</span>'
            : (product.ton_kho <= 10 ? '<span class="badge warning">Ban chay</span>' : '');
        const favoriteActive = isWishlisted(product.id) ? 'active' : '';
        const favoriteLabel = isWishlisted(product.id) ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích';

        return `
            <article class="product-card" data-product-open="${product.id}">
                <div class="product-img">
                    ${badge}
                    <button
                        class="wishlist-toggle-btn ${favoriteActive}"
                        type="button"
                        data-favorite-toggle
                        data-product-id="${product.id}"
                        aria-label="${favoriteLabel}"
                        title="${favoriteLabel}"
                    >
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham || 'Sản phẩm')}" loading="lazy">
                </div>
                <div class="product-info">
                    <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                    <h3 class="product-name">${escapeHtml(product.ten_san_pham || '')}</h3>
                    <p class="product-subcategory">${escapeHtml(getProductGroupLabel(product))}</p>
                    <div class="product-meta">
                        <span>${escapeHtml(product.thuong_hieu || 'Khong ro')}</span>
                        <span>${escapeHtml(normalizeSizeValue(product.size) || '--')}</span>
                    </div>
                    ${renderPriceDisplay(product, { wrapperClass: 'price-stack product-price-block', currentClass: 'product-price' })}
                    <p class="product-stock">Ton kho: ${product.ton_kho ?? 0}</p>
                    <button class="add-to-cart-btn" type="button" data-product-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </article>
        `;
    }

    function renderWishlistView() {
        syncWishlistStaticText();
        const wishlistProducts = getWishlistProducts();
        const hasItems = wishlistProducts.length > 0;

        wishlistEmptyState.classList.toggle('hidden', hasItems);
        wishlistGrid.classList.toggle('hidden', !hasItems);

        if (!hasItems) {
            wishlistGrid.innerHTML = '';
            return;
        }

        wishlistGrid.innerHTML = wishlistProducts.map(product => `
            <article class="wishlist-card">
                <button
                    class="wishlist-card-remove"
                    type="button"
                    data-wishlist-remove
                    data-product-id="${product.id}"
                    aria-label="Xóa khỏi yêu thích"
                    title="Xóa khỏi yêu thích"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="wishlist-card-image" data-wishlist-open="${product.id}" role="button" tabindex="0">
                    <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham || 'Sản phẩm')}" loading="lazy">
                </div>
                <div class="wishlist-card-body">
                    <p class="product-category">${escapeHtml(product.danh_muc || '')}</p>
                    <h3 class="wishlist-card-title" title="${escapeHtml(product.ten_san_pham || '')}">
                        <span class="wishlist-card-open-trigger" data-wishlist-open="${product.id}" role="button" tabindex="0">${escapeHtml(product.ten_san_pham || '')}</span>
                    </h3>
                    <p class="product-subcategory wishlist-card-group" title="${escapeHtml(getProductGroupLabel(product))}">${escapeHtml(getProductGroupLabel(product))}</p>
                    <div class="wishlist-card-meta">
                        <span>${escapeHtml(product.thuong_hieu || 'Khong ro')}</span>
                        <span>${escapeHtml(normalizeSizeValue(product.size) || 'Tieu chuan')}</span>
                    </div>
                    <div class="wishlist-card-footer">
                        ${renderPriceDisplay(product, { wrapperClass: 'price-stack wishlist-price-block', currentClass: 'product-price' })}
                        <div class="wishlist-card-actions">
                            <button class="secondary-btn text-bold" type="button" data-wishlist-remove data-product-id="${product.id}">Xóa</button>
                            <button class="login-submit-btn text-bold" type="button" data-wishlist-move data-product-id="${product.id}">Bỏ vào giỏ</button>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        repairRenderedContent();
    }

    function renderCartView() {
        if (!getHydratedCartItems().length) {
            cartRecommendationProducts = [];
            cartRecommendationSignature = '';
            renderCartRecommendations();
        }

        syncCartSummaryStaticText();
        const cartItems = getHydratedCartItems();
        const selectedItems = cartItems.filter(item => item.selected);
        const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = 0;
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal + shipping - discount);

        const hasItems = cartItems.length > 0;
        cartEmptyState.classList.toggle('hidden', hasItems);
        cartContent.classList.toggle('hidden', !hasItems);

        if (!hasItems) {
            saveAppliedVoucherCode('');
            cartItemsContainer.innerHTML = '';
            voucherList.innerHTML = '';
            voucherAppliedNote.textContent = '';
            voucherAppliedNote.classList.add('hidden');
            clearVoucherBtn.classList.add('hidden');
            cartSelectAllCheckbox.checked = false;
            cartSelectAllCheckbox.indeterminate = false;
            cartSelectionSummary.textContent = '0 sản phẩm được chọn';
            cartSummaryCount.textContent = '0';
            cartSummarySubtotal.textContent = formatCurrency(0);
            cartSummaryShipping.textContent = formatCurrency(0);
            cartDiscountLine.classList.add('hidden');
            cartSummaryDiscount.textContent = `-${formatCurrency(0)}`;
            cartSummaryTotal.textContent = formatCurrency(0);
            checkoutBtn.disabled = true;
            removeSelectedBtn.disabled = true;
            return;
        }

        cartItemsContainer.innerHTML = cartItems.map(item => {
            const sizeOptions = item.sizeOptions.map(size => `
                <option value="${escapeHtml(size)}" ${size === item.size ? 'selected' : ''}>${escapeHtml(size)}</option>
            `).join('');

            return `
                <article class="cart-item cart-table">
                    <div class="cart-col-product">
                        <div class="cart-product-cell">
                            <label class="cart-row-check">
                                <input type="checkbox" data-cart-select data-line-id="${escapeHtml(item.lineId)}" ${item.selected ? 'checked' : ''}>
                            </label>
                            <div class="cart-product-image">
                                <img src="${escapeHtml(getProductImageUrl(item.product))}" alt="${escapeHtml(item.product.ten_san_pham || 'San pham')}" loading="lazy">
                            </div>
                            <div class="cart-product-info">
                                <p class="product-category cart-product-category">${escapeHtml(item.product.danh_muc || '')}</p>
                                <h3 class="cart-product-title" title="${escapeHtml(item.product.ten_san_pham || '')}">${escapeHtml(item.product.ten_san_pham || '')}</h3>
                                <p class="product-subcategory cart-product-group" title="${escapeHtml(getProductGroupLabel(item.product))}">${escapeHtml(getProductGroupLabel(item.product))}</p>
                                <div class="cart-product-meta">
                                    <span title="${escapeHtml(item.product.thuong_hieu || 'Khong ro')}">${escapeHtml(item.product.thuong_hieu || 'Khong ro')}</span>
                                    <span>Ton kho: ${item.product.ton_kho ?? 0}</span>
                                </div>
                                ${item.variantType ? `<p class="product-subcategory cart-product-group">Loại hàng: ${escapeHtml(item.variantType)}</p>` : ''}
                                <div class="cart-size-row">
                                    <label for="cart-size-${escapeHtml(item.lineId)}">Size</label>
                                    <select id="cart-size-${escapeHtml(item.lineId)}" data-cart-size-select data-line-id="${escapeHtml(item.lineId)}">
                                        ${sizeOptions}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-col-price cart-mobile-field" data-label="Don gia">
                        <p class="cart-price">${formatCurrency(item.unitPrice)}</p>
                    </div>
                    <div class="cart-col-quantity cart-mobile-field" data-label="So luong">
                        <div class="quantity-editor">
                            <button class="qty-btn" type="button" data-cart-action="decrease" data-line-id="${escapeHtml(item.lineId)}"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" min="1" max="${getCartLineMaxQuantity(item.product)}" value="${item.quantity}" data-cart-quantity-input data-line-id="${escapeHtml(item.lineId)}">
                            <button class="qty-btn" type="button" data-cart-action="increase" data-line-id="${escapeHtml(item.lineId)}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="cart-col-subtotal cart-mobile-field" data-label="So tien">
                        <p class="cart-subtotal">${formatCurrency(item.subtotal)}</p>
                    </div>
                    <div class="cart-col-action cart-mobile-field" data-label="Thao tac">
                        <div class="cart-actions">
                            <button class="cart-text-btn" type="button" data-cart-action="remove" data-line-id="${escapeHtml(item.lineId)}">Xóa</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        const allSelected = cartItems.every(item => item.selected);
        const hasSelected = cartItems.some(item => item.selected);
        cartSelectAllCheckbox.checked = allSelected;
        cartSelectAllCheckbox.indeterminate = !allSelected && hasSelected;
        cartSelectionSummary.textContent = `${selectedQuantity} sản phẩm được chọn`;
        cartSummaryCount.textContent = String(selectedQuantity);
        cartSummarySubtotal.textContent = formatCurrency(subtotal);
        cartSummaryShipping.textContent = formatCurrency(shipping);
        cartDiscountLine.classList.toggle('hidden', discount <= 0);
        cartSummaryDiscount.textContent = `-${formatCurrency(discount)}`;
        cartSummaryTotal.textContent = formatCurrency(total);
        checkoutBtn.disabled = !hasSelected;
        removeSelectedBtn.disabled = !hasSelected;
        renderVoucherList(subtotal, appliedVoucher);
        if (currentView === 'cart') {
            void loadCartRecommendations();
        } else {
            renderCartRecommendations();
        }
        repairRenderedContent();
    }

    function renderCheckoutView() {
        syncCheckoutStaticText();
        const selectedItems = getHydratedCartItems().filter(item => item.selected);
        const addresses = getAddressBook();
        const selectedAddress = ensureCheckoutAddressSelection();
        const subtotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shipping = 0;
        const appliedVoucher = getResolvedVoucher(subtotal);
        const discount = appliedVoucher ? getVoucherDiscountAmount(appliedVoucher, subtotal) : 0;
        const total = Math.max(0, subtotal + shipping - discount);

        renderCheckoutAddressOptions(addresses, selectedAddress?.id || '');

        if (!selectedItems.length) {
            checkoutItems.innerHTML = '<p class="loading-text">Không có sản phẩm nào để thanh toán.</p>';
            checkoutSummaryCount.textContent = '0';
            checkoutSummarySubtotal.textContent = formatCurrency(0);
            checkoutSummaryShipping.textContent = formatCurrency(0);
            checkoutDiscountLine.classList.add('hidden');
            checkoutSummaryDiscount.textContent = `-${formatCurrency(0)}`;
            checkoutSummaryTotal.textContent = formatCurrency(0);
            placeOrderBtn.disabled = true;
            renderVoucherList(0, null, {
                listElement: checkoutVoucherList,
                noteElement: checkoutVoucherAppliedNote,
                clearButton: checkoutClearVoucherBtn
            });
            return;
        }

        checkoutItems.innerHTML = selectedItems.map(item => `
            <article class="checkout-item-card">
                <div class="checkout-item-image">
                    <img src="${escapeHtml(getProductImageUrl(item.product))}" alt="${escapeHtml(item.product.ten_san_pham || 'Sản phẩm')}" loading="lazy">
                </div>
                <div class="checkout-item-body">
                    <div class="checkout-item-head">
                        <div>
                            <p class="product-category">${escapeHtml(item.product.danh_muc || '')}</p>
                            <h3 class="checkout-item-title" title="${escapeHtml(item.product.ten_san_pham || '')}">${escapeHtml(item.product.ten_san_pham || '')}</h3>
                            <p class="product-subcategory">${escapeHtml(getProductGroupLabel(item.product))}</p>
                        </div>
                        <p class="checkout-item-subtotal">${formatCurrency(item.subtotal)}</p>
                    </div>
                    <div class="checkout-item-meta">
                        <span>Thương hiệu: ${escapeHtml(item.product.thuong_hieu || 'Không rõ')}</span>
                        <span>Size: ${escapeHtml(item.size || 'Tiêu chuẩn')}</span>
                        ${item.variantType ? `<span>Loại hàng: ${escapeHtml(item.variantType)}</span>` : ''}
                        <span>Số lượng: ${item.quantity}</span>
                        <span>Đơn giá: ${formatCurrency(item.unitPrice)}</span>
                    </div>
                </div>
            </article>
        `).join('');

        checkoutSummaryCount.textContent = String(selectedItems.reduce((sum, item) => sum + item.quantity, 0));
        checkoutSummarySubtotal.textContent = formatCurrency(subtotal);
        checkoutSummaryShipping.textContent = formatCurrency(shipping);
        checkoutDiscountLine.classList.toggle('hidden', discount <= 0);
        checkoutSummaryDiscount.textContent = `-${formatCurrency(discount)}`;
        checkoutSummaryTotal.textContent = formatCurrency(total);
        placeOrderBtn.disabled = !selectedAddress;
        renderVoucherList(subtotal, appliedVoucher, {
            listElement: checkoutVoucherList,
            noteElement: checkoutVoucherAppliedNote,
            clearButton: checkoutClearVoucherBtn
        });
        repairRenderedContent();
    }

    function toggleWishlistProduct(productId) {
        if (!ensureWishlistAccess('Hãy đăng nhập trước khi thêm sản phẩm vào yêu thích.')) {
            return;
        }

        const productIdText = String(productId);
        const wishlistIds = getWishlistIds();
        const nextWishlistIds = wishlistIds.includes(productIdText)
            ? wishlistIds.filter(id => id !== productIdText)
            : [...wishlistIds, productIdText];

        saveWishlistIds(nextWishlistIds);
        updateWishlistCount();

        if (currentView === 'wishlist') {
            renderWishlistView();
            syncMainView();
            return;
        }

        if (currentView === 'product-detail') {
            syncProductDetailWishlistState(currentDetailProductId);
            syncFavoriteButtons(productIdText, productDetailView);
            return;
        }

        syncFavoriteButtons(productIdText);
    }

    function syncMainView() {
        const isHomeView = currentView === 'home';
        const isWorkspaceView = currentView === 'workspace';
        const isCartView = currentView === 'cart';
        const isWishlistView = currentView === 'wishlist';
        const isCheckoutView = currentView === 'checkout';
        const isAddressBookView = currentView === 'address-book';
        const isOrdersView = currentView === 'orders';
        const isProductDetailView = currentView === 'product-detail';
        const isPromoHuntView = currentView === 'promo-hunt';
        const isBannerVisible = !isWorkspaceView && shouldShowBanner();
        const mainContent = document.getElementById('main-content');
        const footer = document.getElementById('footer');

        adminPanel.classList.toggle('hidden', !isWorkspaceView || !canAccessWorkspace());
        if (mainContent) {
            mainContent.classList.toggle('hidden', isWorkspaceView);
        }
        if (footer) {
            footer.classList.toggle('hidden', isWorkspaceView);
        }

        cartView.classList.toggle('hidden', !isCartView);
        wishlistView.classList.toggle('hidden', !isWishlistView);
        checkoutView.classList.toggle('hidden', !isCheckoutView);
        addressBookView.classList.toggle('hidden', !isAddressBookView);
        ordersView.classList.toggle('hidden', !isOrdersView);
        productDetailView?.classList.toggle('hidden', !isProductDetailView);
        promoHuntView?.classList.toggle('hidden', !isPromoHuntView);
        banner.classList.toggle('hidden', !isBannerVisible);
        const shouldShowHomeLanding = shouldShowHomeRecommendations();
        if (homeFeatureStrip) {
            homeFeatureStrip.classList.toggle('hidden', !shouldShowHomeLanding);
        }
        if (homeSaleShowcase && !shouldShowHomeLanding) {
            homeSaleShowcase.classList.add('hidden');
            stopHomeShowcaseRotation();
        }
        if (personalizedHomeView && !shouldShowHomeLanding) {
            personalizedHomeView.classList.add('hidden');
        }
        if (cartRecommendationsSection && currentView !== 'cart') {
            cartRecommendationsSection.classList.add('hidden');
        }

        if (isWorkspaceView) {
            closeMegaMenu();
            syncSupportChatVisibility();
            return;
        }

        if (isCartView || isWishlistView || isCheckoutView || isAddressBookView || isOrdersView || isProductDetailView || isPromoHuntView) {
            catalogToolbar.classList.add('hidden');
            collectionView.classList.add('hidden');
            activeFilters.classList.add('hidden');
            productContainer.classList.add('hidden');
            closeMegaMenu();
            syncSupportChatVisibility();
            return;
        }

        if (isHomeView) {
            catalogToolbar.classList.add('hidden');
            collectionView.classList.add('hidden');
            activeFilters.classList.add('hidden');
            productContainer.classList.add('hidden');
            productDetailView?.classList.add('hidden');
            syncSupportChatVisibility();
            return;
        }

        productContainer.classList.remove('hidden');
        productDetailView?.classList.add('hidden');
        syncSupportChatVisibility();
    }

    async function loadProducts() {
        productContainer.innerHTML = '<p class="loading-text">Đang tải sản phẩm...</p>';

        try {
            const products = await apiRequest('/products', { auth: false });
            allProducts = products.map(enrichProduct);
            invalidateRecommendationCache();
            if (currentView === 'product-detail' && currentDetailProductId) {
                renderProductDetailView();
                syncMainView();
            } else {
                renderCatalog();
            }
            renderAdminProductList();
            if (isManagerWorkspaceUser()) {
                await renderUserList();
            } else if (userListBody) {
                userListBody.innerHTML = '';
            }
            renderInternalWorkspace();
            syncSupportChatVisibility();
        } catch (error) {
            productContainer.innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
        }
    }

    function ensureAnalyticsSessionId() {
        const existing = String(localStorage.getItem(ANALYTICS_SESSION_KEY) || '').trim();
        if (existing) {
            return existing;
        }

        const nextId = `session-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(ANALYTICS_SESSION_KEY, nextId);
        return nextId;
    }

    function invalidateRecommendationCache() {
        personalizedHomeProducts = [];
        homeShowcaseProducts = [];
        homeShowcaseIndex = 0;
        cartRecommendationProducts = [];
        detailRecommendationProducts = [];
        homeRecommendationSignature = '';
        cartRecommendationSignature = '';
        detailRecommendationSignature = '';
        homeShowcaseRenderSignature = '';
        personalizedHomeRenderSignature = '';
        recommendationFetchPromises.clear();
        adminBehaviorOverview = null;
        adminBehaviorOverviewError = '';
    }

    function getAnalyticsHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    function trackBehaviorEvent(payload = {}, options = {}) {
        if (!analyticsSessionId) {
            analyticsSessionId = ensureAnalyticsSessionId();
        }

        const requestBody = {
            session_id: analyticsSessionId,
            event_type: payload.eventType || null,
            page_type: payload.pageType || null,
            page_key: payload.pageKey || '',
            product_id: payload.productId || '',
            order_id: payload.orderId || '',
            category_key: payload.categoryKey || '',
            brand_key: payload.brandKey || '',
            search_keyword: payload.searchKeyword || '',
            price_value: payload.priceValue ?? null,
            quantity: payload.quantity ?? null,
            duration_seconds: payload.durationSeconds ?? null,
            metadata: payload.metadata || null
        };

        persistLocalBehaviorEvent(requestBody);

        fetch(`${API_BASE}/analytics/events`, {
            method: 'POST',
            headers: getAnalyticsHeaders(),
            body: JSON.stringify(requestBody),
            keepalive: Boolean(options.keepalive)
        }).catch(() => null);
    }

    function persistLocalBehaviorEvent(event = {}) {
        if (!event.event_type) {
            return;
        }

        const localEvents = readLocalBehaviorEvents();
        localEvents.unshift({
            ...event,
            id: generateRecordId('behavior'),
            created_at: new Date().toISOString(),
            client_user_id: currentUser?.id || '',
            client_username: currentUser?.username || currentUser?.ten_dang_nhap || '',
            client_role: currentUser?.role || ''
        });
        localStorage.setItem(LOCAL_ANALYTICS_EVENTS_KEY, JSON.stringify(localEvents.slice(0, 1200)));
    }

    function readLocalBehaviorEvents() {
        const events = readStorage(LOCAL_ANALYTICS_EVENTS_KEY, []);
        return Array.isArray(events) ? events.filter(Boolean) : [];
    }

    function getLocalEventCreatedAt(event = {}) {
        const date = new Date(event.created_at || event.createdAt || 0);
        return Number.isNaN(date.getTime()) ? new Date(0) : date;
    }

    function resolveLocalPriceBucket(priceValue) {
        const price = Number(priceValue || 0);
        if (price <= 0) {
            return '';
        }
        if (price < 1000000) {
            return '0-1 triệu';
        }
        if (price <= 3000000) {
            return '1-3 triệu';
        }
        if (price <= 5000000) {
            return '3-5 triệu';
        }
        return 'Trên 5 triệu';
    }

    function getLocalBehaviorWeight(eventType = '') {
        switch (String(eventType || '').toUpperCase()) {
            case 'PURCHASE':
                return 10;
            case 'ADD_TO_CART':
                return 6;
            case 'PRODUCT_REVIEW':
                return 5;
            case 'PRODUCT_VIEW':
                return 3;
            case 'PRODUCT_SEARCH':
            case 'CATEGORY_CLICK':
                return 2;
            default:
                return 1;
        }
    }

    function incrementMetric(map, key, amount = 1) {
        const safeKey = String(key || '').trim();
        if (!safeKey) {
            return;
        }
        map.set(safeKey, (map.get(safeKey) || 0) + amount);
    }

    function metricsMapToList(map, limit = 8, labelResolver = key => key) {
        return Array.from(map.entries())
            .sort((left, right) => right[1] - left[1] || String(left[0]).localeCompare(String(right[0]), 'vi'))
            .slice(0, limit)
            .map(([key, value]) => ({
                key,
                label: labelResolver(key),
                value
            }));
    }

    function buildLocalAdminBehaviorOverview() {
        const state = getStatsFilterState();
        const start = new Date(`${state.statsStartDate}T00:00:00`);
        const end = new Date(`${state.statsEndDate}T23:59:59`);
        const events = readLocalBehaviorEvents().filter(event => {
            const createdAt = getLocalEventCreatedAt(event);
            return createdAt >= start && createdAt <= end;
        });

        const uniqueUsers = new Set();
        const productScores = new Map();
        const categoryScores = new Map();
        const keywordScores = new Map();
        const priceBucketScores = new Map();
        let stayTotal = 0;
        let stayCount = 0;

        events.forEach(event => {
            const eventType = String(event.event_type || event.eventType || '').toUpperCase();
            const weight = getLocalBehaviorWeight(eventType);
            const productId = String(event.product_id || event.productId || '').trim();
            const product = productId ? findProductById(productId) : null;
            const categoryKey = event.category_key || event.categoryKey || product?.danh_muc || '';
            const brandKey = event.brand_key || event.brandKey || product?.thuong_hieu || '';
            const keyword = event.search_keyword || event.searchKeyword || '';
            const priceBucket = event.price_bucket || event.priceBucket || resolveLocalPriceBucket(event.price_value ?? event.priceValue ?? product?.gia_ban);
            const userKey = event.client_user_id || event.user_id || event.userId || event.client_username || event.session_id || event.sessionId;

            incrementMetric(categoryScores, categoryKey, weight);
            incrementMetric(priceBucketScores, priceBucket, weight);
            if (eventType === 'PRODUCT_SEARCH') {
                incrementMetric(keywordScores, keyword, weight);
            }
            if (productId) {
                incrementMetric(productScores, productId, weight);
            }
            if (userKey) {
                uniqueUsers.add(String(userKey));
            }
            if (eventType === 'PAGE_STAY') {
                const duration = Number(event.duration_seconds ?? event.durationSeconds ?? 0);
                if (duration > 0) {
                    stayTotal += duration;
                    stayCount += 1;
                }
            }
        });

        return {
            from: state.statsStartDate,
            to: state.statsEndDate,
            totalEvents: events.length,
            uniqueUsers: uniqueUsers.size,
            totalProductViews: events.filter(event => String(event.event_type || '').toUpperCase() === 'PRODUCT_VIEW').length,
            totalSearches: events.filter(event => String(event.event_type || '').toUpperCase() === 'PRODUCT_SEARCH').length,
            totalCartAdds: events.filter(event => String(event.event_type || '').toUpperCase() === 'ADD_TO_CART').length,
            totalPurchases: events.filter(event => String(event.event_type || '').toUpperCase() === 'PURCHASE').length,
            totalReviews: events.filter(event => String(event.event_type || '').toUpperCase() === 'PRODUCT_REVIEW').length,
            averageStaySeconds: stayCount ? Math.round(stayTotal / stayCount) : 0,
            totalRevenue: 0,
            topProducts: metricsMapToList(productScores, 8, key => findProductById(key)?.ten_san_pham || key),
            topCategories: metricsMapToList(categoryScores, 8),
            topKeywords: metricsMapToList(keywordScores, 8),
            topPriceBuckets: metricsMapToList(priceBucketScores, 8)
        };
    }

    function mergeMetricLists(left = [], right = [], limit = 8) {
        const merged = new Map();
        [...(Array.isArray(left) ? left : []), ...(Array.isArray(right) ? right : [])].forEach(item => {
            const key = String(item?.key || item?.label || '').trim();
            if (!key) {
                return;
            }
            const current = merged.get(key) || { key, label: item.label || key, value: 0 };
            current.value += Number(item.value ?? item.score ?? 0);
            current.label = current.label || item.label || key;
            merged.set(key, current);
        });
        return Array.from(merged.values())
            .sort((leftItem, rightItem) => Number(rightItem.value || 0) - Number(leftItem.value || 0))
            .slice(0, limit);
    }

    function mergeAdminBehaviorOverview(remote = null, local = null) {
        if (!remote) {
            return local;
        }
        if (!local || !Number(local.totalEvents || 0)) {
            return remote;
        }

        return {
            ...remote,
            totalEvents: Number(remote.totalEvents || 0) + Number(local.totalEvents || 0),
            uniqueUsers: Number(remote.uniqueUsers || 0) + Number(local.uniqueUsers || 0),
            totalProductViews: Number(remote.totalProductViews || 0) + Number(local.totalProductViews || 0),
            totalSearches: Number(remote.totalSearches || 0) + Number(local.totalSearches || 0),
            totalCartAdds: Number(remote.totalCartAdds || 0) + Number(local.totalCartAdds || 0),
            totalPurchases: Number(remote.totalPurchases || 0) + Number(local.totalPurchases || 0),
            totalReviews: Number(remote.totalReviews || 0) + Number(local.totalReviews || 0),
            averageStaySeconds: Math.round((
                Number(remote.averageStaySeconds || 0) + Number(local.averageStaySeconds || 0)
            ) / ((Number(remote.averageStaySeconds || 0) && Number(local.averageStaySeconds || 0)) ? 2 : 1)),
            topProducts: mergeMetricLists(remote.topProducts, local.topProducts),
            topCategories: mergeMetricLists(remote.topCategories, local.topCategories),
            topKeywords: mergeMetricLists(remote.topKeywords, local.topKeywords),
            topPriceBuckets: mergeMetricLists(remote.topPriceBuckets, local.topPriceBuckets)
        };
    }

    function buildCatalogTrackingContext() {
        if (currentCollectionId) {
            return {
                pageType: 'COLLECTION',
                pageKey: `collection:${currentCollectionId}`,
                extra: {
                    categoryKey: currentCollectionId
                }
            };
        }

        if (currentQuery) {
            return {
                pageType: 'SEARCH_RESULTS',
                pageKey: `search:${normalizeText(currentQuery) || 'empty'}`,
                extra: {
                    searchKeyword: currentQuery
                }
            };
        }

        if (currentMenuItemId) {
            const currentItem = getCurrentMenuItem();
            return {
                pageType: 'CATALOG',
                pageKey: `menu:${currentMenuItemId}`,
                extra: {
                    categoryKey: currentItem?.sport || currentCategory,
                    brandKey: currentBrand || ''
                }
            };
        }

        if (currentBrand) {
            return {
                pageType: 'CATALOG',
                pageKey: `brand:${normalizeText(currentBrand) || currentBrand}`,
                extra: {
                    brandKey: currentBrand
                }
            };
        }

        if (currentCategory !== 'all') {
            return {
                pageType: 'CATALOG',
                pageKey: `category:${normalizeText(currentCategory) || currentCategory}`,
                extra: {
                    categoryKey: currentCategory
                }
            };
        }

        return {
            pageType: 'HOME',
            pageKey: 'home',
            extra: {}
        };
    }

    function setTrackedPageContext(pageType, pageKey, extra = {}) {
        const normalizedPageType = String(pageType || 'CATALOG').trim();
        const normalizedPageKey = String(pageKey || normalizedPageType.toLowerCase()).trim();

        if (
            trackedPageContext.pageType === normalizedPageType
            && trackedPageContext.pageKey === normalizedPageKey
        ) {
            trackedPageContext.extra = { ...(trackedPageContext.extra || {}), ...extra };
            return;
        }

        flushTrackedPageStay();
        trackedPageContext = {
            pageType: normalizedPageType,
            pageKey: normalizedPageKey,
            extra: { ...extra },
            startedAt: Date.now()
        };
    }

    function flushTrackedPageStay(force = false) {
        if (!trackedPageContext.pageType) {
            trackedPageContext.startedAt = Date.now();
            return;
        }

        const durationSeconds = Math.max(0, Math.round((Date.now() - Number(trackedPageContext.startedAt || Date.now())) / 1000));
        if (!force && durationSeconds < 3) {
            trackedPageContext.startedAt = Date.now();
            return;
        }

        if (durationSeconds <= 0) {
            return;
        }

        trackBehaviorEvent({
            eventType: 'PAGE_STAY',
            pageType: trackedPageContext.pageType,
            pageKey: trackedPageContext.pageKey,
            productId: trackedPageContext.extra?.productId || '',
            categoryKey: trackedPageContext.extra?.categoryKey || '',
            brandKey: trackedPageContext.extra?.brandKey || '',
            searchKeyword: trackedPageContext.extra?.searchKeyword || '',
            durationSeconds
        }, { keepalive: force });

        trackedPageContext.startedAt = Date.now();
    }

    function shouldShowHomeRecommendations() {
        return currentView === 'home'
            && !currentCollectionId
            && currentCategory === 'all'
            && !currentMenuItemId
            && !currentBrand
            && !currentQuery
            && currentPriceRange === 'all'
            && currentTypeFilter === 'all'
            && currentSizeFilter === 'all';
    }

    function getRecommendationScopeKey() {
        const accountSuffix = getCurrentAccountStorageSuffix();
        return accountSuffix ? `user:${accountSuffix}` : `session:${analyticsSessionId}`;
    }

    function getRecommendationCacheKey(context, options = {}) {
        const normalizedContext = normalizeText(context) || 'home';
        const normalizedLimit = Math.max(1, Math.min(Number(options.limit || 6), 24));
        const productId = String(options.productId || '').trim();
        const productIds = (options.productIds || [])
            .map(value => String(value || '').trim())
            .filter(Boolean)
            .sort()
            .join(',');

        return [
            getRecommendationScopeKey(),
            normalizedContext,
            `limit:${normalizedLimit}`,
            `product:${productId}`,
            `items:${productIds}`
        ].join('|');
    }

    function readCachedRecommendationProducts(cacheKey) {
        const cache = readStorage(RECOMMENDATION_CACHE_KEY, {});
        const entry = cache && typeof cache === 'object' ? cache[cacheKey] : null;
        const expiresAt = Number(entry?.expiresAt || 0);
        if (!entry || expiresAt <= Date.now()) {
            if (entry) {
                delete cache[cacheKey];
                try {
                    localStorage.setItem(RECOMMENDATION_CACHE_KEY, JSON.stringify(cache));
                } catch (error) {
                    // Ignore cache cleanup failures; recommendation still works without local cache.
                }
            }
            return null;
        }

        const productIds = Array.isArray(entry.productIds) ? entry.productIds : [];
        const products = productIds
            .map(productId => findProductById(productId))
            .filter(Boolean);

        return products.length ? products : null;
    }

    function writeCachedRecommendationProducts(cacheKey, products) {
        const productIds = (Array.isArray(products) ? products : [])
            .map(product => String(product?.id || '').trim())
            .filter(Boolean);
        if (!productIds.length) {
            return;
        }

        const now = Date.now();
        const cache = readStorage(RECOMMENDATION_CACHE_KEY, {});
        const nextCache = cache && typeof cache === 'object' ? cache : {};
        Object.keys(nextCache).forEach(key => {
            if (Number(nextCache[key]?.expiresAt || 0) <= now) {
                delete nextCache[key];
            }
        });

        nextCache[cacheKey] = {
            productIds,
            createdAt: now,
            expiresAt: now + RECOMMENDATION_CACHE_TTL_MS
        };

        const keys = Object.keys(nextCache)
            .sort((left, right) => Number(nextCache[left]?.createdAt || 0) - Number(nextCache[right]?.createdAt || 0));
        while (keys.length > 50) {
            delete nextCache[keys.shift()];
        }

        try {
            localStorage.setItem(RECOMMENDATION_CACHE_KEY, JSON.stringify(nextCache));
        } catch (error) {
            // LocalStorage may be full or disabled; keep the UI functional without caching.
        }
    }

    async function fetchRecommendationProducts(context, options = {}) {
        const cacheKey = getRecommendationCacheKey(context, options);
        const cachedProducts = readCachedRecommendationProducts(cacheKey);
        if (cachedProducts) {
            return cachedProducts;
        }

        if (recommendationFetchPromises.has(cacheKey)) {
            return recommendationFetchPromises.get(cacheKey);
        }

        const params = new URLSearchParams();
        params.set('context', context);
        params.set('sessionId', analyticsSessionId || ensureAnalyticsSessionId());
        params.set('limit', String(options.limit || 6));

        if (options.productId) {
            params.set('productId', options.productId);
        }

        (options.productIds || []).filter(Boolean).forEach(productId => {
            params.append('productIds', productId);
        });

        const requestPromise = (async () => {
            const response = await fetch(`${API_BASE}/analytics/recommendations?${params.toString()}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (!response.ok) {
                return [];
            }

            const text = await response.text();
            const data = text ? normalizePayload(safeJsonParse(text)) : [];
            const products = (Array.isArray(data) ? data : [])
                .map(product => findProductById(product?.id) || enrichProduct(product))
                .filter(Boolean);
            writeCachedRecommendationProducts(cacheKey, products);
            return products;
        })();

        recommendationFetchPromises.set(cacheKey, requestPromise);
        try {
            return await requestPromise;
        } catch (error) {
            return [];
        } finally {
            recommendationFetchPromises.delete(cacheKey);
        }
    }

    async function loadHomeRecommendations(force = false) {
        const shouldShow = shouldShowHomeRecommendations() && allProducts.length > 0;
        if (!shouldShow) {
            personalizedHomeProducts = [];
            homeShowcaseProducts = [];
            homeRecommendationSignature = '';
            renderHomeSaleShowcase();
            renderHomeFeatureStrip();
            renderPersonalizedHomeRecommendations();
            return;
        }

        const signature = `${getRecommendationScopeKey()}:home`;
        if (!force && signature === homeRecommendationSignature && personalizedHomeProducts.length) {
            renderPersonalizedHomeRecommendations();
            return;
        }

        homeRecommendationSignature = signature;
        personalizedHomeProducts = await fetchRecommendationProducts('home', { limit: 18 });
        renderHomeSaleShowcase();
        renderHomeFeatureStrip();
        renderPersonalizedHomeRecommendations();
    }

    function renderPersonalizedHomeRecommendations() {
        if (!personalizedHomeView || !personalizedHomeGrid) {
            return;
        }

        const shouldShow = shouldShowHomeRecommendations();
        personalizedHomeView.classList.toggle('hidden', !shouldShow);
        if (!shouldShow) {
            personalizedHomeRenderSignature = '';
            personalizedHomeGrid.innerHTML = '';
            return;
        }

        const cachedRenderSignature = [
            personalizedHomeProducts.map(product => product.id).join('|') || 'fallback',
            homePersonalizedPriceRange,
            homePersonalizedType,
            homePersonalizedBrand,
            homePersonalizedSize,
            homePersonalizedSort
        ].join('::');
        if (cachedRenderSignature === personalizedHomeRenderSignature && personalizedHomeGrid.children.length) {
            personalizedHomeView.classList.remove('hidden');
            syncFavoriteButtons();
            return;
        }

        const baseProducts = getPersonalizedHomeBaseProducts();
        const filteredProducts = getFilteredPersonalizedHomeProducts(baseProducts);
        const nextRenderSignature = cachedRenderSignature;
        if (nextRenderSignature === personalizedHomeRenderSignature && personalizedHomeGrid.children.length) {
            if (personalizedHomeCount) {
                personalizedHomeCount.textContent = `${filteredProducts.length} sản phẩm`;
            }
            syncFavoriteButtons();
            return;
        }
        personalizedHomeRenderSignature = nextRenderSignature;

        fillSelectOptions(
            homePersonalizedTypeFilter,
            'all',
            'Tất cả loại sản phẩm',
            getUniqueValues(baseProducts.map(product => getProductGroupLabel(product)))
        );
        fillSelectOptions(
            homePersonalizedBrandFilter,
            'all',
            'Tất cả thương hiệu',
            getUniqueValues(baseProducts.map(product => product.thuong_hieu))
        );
        fillSelectOptions(
            homePersonalizedSizeFilter,
            'all',
            'Tất cả size',
            getUniqueValues(baseProducts.map(product => normalizeSizeValue(product.size)))
        );

        if (homePersonalizedPriceFilter) {
            homePersonalizedPriceFilter.value = homePersonalizedPriceRange;
        }
        if (homePersonalizedTypeFilter) {
            homePersonalizedTypeFilter.value = hasOption(homePersonalizedTypeFilter, homePersonalizedType) ? homePersonalizedType : 'all';
            homePersonalizedType = homePersonalizedTypeFilter.value;
        }
        if (homePersonalizedBrandFilter) {
            homePersonalizedBrandFilter.value = hasOption(homePersonalizedBrandFilter, homePersonalizedBrand) ? homePersonalizedBrand : 'all';
            homePersonalizedBrand = homePersonalizedBrandFilter.value;
        }
        if (homePersonalizedSizeFilter) {
            homePersonalizedSizeFilter.value = hasOption(homePersonalizedSizeFilter, homePersonalizedSize) ? homePersonalizedSize : 'all';
            homePersonalizedSize = homePersonalizedSizeFilter.value;
        }
        if (homePersonalizedSortFilter) {
            homePersonalizedSortFilter.value = homePersonalizedSort;
        }
        if (personalizedHomeCount) {
            personalizedHomeCount.textContent = `${filteredProducts.length} sản phẩm`;
        }
        if (personalizedHomeChip) {
            personalizedHomeChip.textContent = personalizedHomeProducts.length
                ? 'Gợi ý theo hành vi'
                : 'Gợi ý theo xu hướng hiện tại';
        }

        personalizedHomeGrid.innerHTML = filteredProducts.length
            ? filteredProducts.map(buildProductCardMarkup).join('')
            : `
                <div class="home-personalized-empty">
                    <h4>Chưa có sản phẩm phù hợp với bộ lọc hiện tại</h4>
                    <p>Thử đổi mức giá, thương hiệu hoặc size để mở rộng nhóm sản phẩm dành cho bạn.</p>
                </div>
            `;
        repairRenderedContent(personalizedHomeView);
    }

    async function loadDetailRecommendations(productId, force = false) {
        const normalizedProductId = String(productId || '').trim();
        if (!normalizedProductId) {
            detailRecommendationProducts = [];
            detailRecommendationSignature = '';
            return;
        }

        const signature = `${getRecommendationScopeKey()}:detail:${normalizedProductId}`;
        if (!force && signature === detailRecommendationSignature && detailRecommendationProducts.length) {
            return;
        }

        detailRecommendationSignature = signature;
        detailRecommendationProducts = await fetchRecommendationProducts('detail', {
            productId: normalizedProductId,
            limit: 6
        });

        if (currentView === 'product-detail' && String(currentDetailProductId) === normalizedProductId) {
            renderProductDetailRelatedProducts();
        }
    }

    async function loadCartRecommendations(force = false) {
        const cartProductIds = getHydratedCartItems()
            .map(item => item.productId)
            .filter(Boolean)
            .map(String);

        if (!cartProductIds.length) {
            cartRecommendationProducts = [];
            cartRecommendationSignature = '';
            renderCartRecommendations();
            return;
        }

        const signature = `${getRecommendationScopeKey()}:cart:${cartProductIds.slice().sort().join(',')}`;
        if (!force && signature === cartRecommendationSignature && cartRecommendationProducts.length) {
            renderCartRecommendations();
            return;
        }

        cartRecommendationSignature = signature;
        cartRecommendationProducts = await fetchRecommendationProducts('cart', {
            productIds: cartProductIds,
            limit: 6
        });
        renderCartRecommendations();
    }

    function renderCartRecommendations() {
        if (!cartRecommendationsSection || !cartRecommendationsGrid) {
            return;
        }

        const shouldShow = currentView === 'cart' && cartRecommendationProducts.length > 0;
        cartRecommendationsSection.classList.toggle('hidden', !shouldShow);
        cartRecommendationsGrid.innerHTML = shouldShow
            ? cartRecommendationProducts.map(buildProductCardMarkup).join('')
            : '';
    }

    async function loadAdminBehaviorOverview() {
        if (!isManagerWorkspaceUser()) {
            adminBehaviorOverview = null;
            adminBehaviorOverviewError = '';
            return;
        }

        const state = getStatsFilterState();
        const params = new URLSearchParams();
        if (state.statsStartDate) {
            params.set('from', state.statsStartDate);
        }
        if (state.statsEndDate) {
            params.set('to', state.statsEndDate);
        }

        const localOverview = buildLocalAdminBehaviorOverview();

        try {
            const remoteOverview = await apiRequest(`/admin/analytics/overview?${params.toString()}`);
            adminBehaviorOverview = mergeAdminBehaviorOverview(remoteOverview, localOverview);
            adminBehaviorOverviewError = '';
        } catch (error) {
            adminBehaviorOverview = localOverview;
            adminBehaviorOverviewError = Number(localOverview.totalEvents || 0) ? '' : error.message;
        }
    }

    function submitProductReview() {
        const product = findProductById(currentDetailProductId);
        if (!product) {
            return;
        }

        if (!ensureCustomerAccess('Hãy đăng nhập bằng tài khoản khách hàng để gửi đánh giá.')) {
            return;
        }

        const reviewContent = String(productDetailReviewContent?.value || '').trim();
        const reviewRating = Math.min(5, Math.max(1, Number(productDetailReviewRating?.value || 5)));

        if (reviewContent.length < 8) {
            if (productDetailReviewError) {
                productDetailReviewError.textContent = 'Vui lòng nhập nội dung đánh giá tối thiểu 8 ký tự.';
                productDetailReviewError.classList.remove('hidden');
            }
            return;
        }

        if (productDetailReviewError) {
            productDetailReviewError.textContent = '';
            productDetailReviewError.classList.add('hidden');
        }

        const nextReviews = [
            {
                id: generateRecordId('review'),
                productId: String(product.id),
                reviewer: getUserDisplayName(currentUser) || 'Khách hàng',
                rating: reviewRating,
                content: reviewContent,
                status: 'Hiển thị',
                createdAt: new Date().toISOString()
            },
            ...getManagedReviews()
        ];

        saveManagedReviews(nextReviews);
        if (productDetailReviewContent) {
            productDetailReviewContent.value = '';
        }
        if (productDetailReviewRating) {
            productDetailReviewRating.value = '5';
        }

        trackBehaviorEvent({
            eventType: 'PRODUCT_REVIEW',
            pageType: 'PRODUCT_DETAIL',
            pageKey: product.sku || product.id,
            productId: product.id,
            categoryKey: product.danh_muc,
            brandKey: product.thuong_hieu,
            priceValue: getProductCurrentPrice(product),
            metadata: {
                rating: reviewRating
            }
        });

        renderProductDetailView();
        syncMainView();
    }

    function getCanonicalRole(role) {
        const rawRole = String(role || '').trim();
        const decodedRole = decodeMojibake(rawRole);
        const normalizedRole = normalizeText(decodedRole)
            .replace(/[^a-z0-9]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (
            normalizedRole.includes('role admin')
            || normalizedRole === 'admin'
            || normalizedRole.includes('quan tri')
            || normalizedRole.includes('qu n tr')
        ) {
            return 'Qu\u1ea3n tr\u1ecb vi\u00ean';
        }

        if (
            normalizedRole.includes('role staff')
            || normalizedRole === 'staff'
            || normalizedRole.includes('nhan vien')
            || normalizedRole.includes('nh n vi n')
        ) {
            return 'Nh\u00e2n vi\u00ean';
        }

        if (
            normalizedRole.includes('role customer')
            || normalizedRole === 'customer'
            || normalizedRole.includes('khach hang')
        ) {
            return 'Kh\u00e1ch h\u00e0ng';
        }

        return decodedRole || 'Kh\u00e1ch h\u00e0ng';
    }

    function getUserDisplayName(user) {
        const fallbackNames = {
            admin: 'H\u1ec7 Th\u1ed1ng',
            nhanvien01: 'Nguy\u1ec5n Nh\u00e2n Vi\u00ean',
            khachhang01: 'Nguy\u1ec5n V\u0103n A',
            khachhang02: 'Tr\u1ea7n Th\u1ecb B'
        };
        const rawName = String(user?.display_name || user?.ho_ten || user?.hoTen || user?.full_name || user?.name || '').trim();
        const cleanedName = sanitizeProductText(rawName).trim();
        const usernameKey = normalizeText(user?.username);

        if (cleanedName && !hasBrokenTextArtifacts(cleanedName) && normalizeText(cleanedName) !== 'khong ro') {
            return cleanedName;
        }

        if (fallbackNames[usernameKey]) {
            return fallbackNames[usernameKey];
        }

        const canonicalRole = getCanonicalRole(user?.role || '');
        if (canonicalRole === 'Qu\u1ea3n tr\u1ecb vi\u00ean') {
            return 'H\u1ec7 Th\u1ed1ng';
        }
        if (canonicalRole === 'Nh\u00e2n vi\u00ean') {
            return 'Nh\u00e2n vi\u00ean';
        }

        const usernameLabel = sanitizeProductText(user?.username || '').trim();
        return usernameLabel || 'Ng\u01b0\u1eddi d\u00f9ng';
    }

    function normalizeUserProfile(user) {
        if (!user || typeof user !== 'object') {
            return null;
        }

        return {
            ...user,
            ho_ten: getUserDisplayName(user),
            name: getUserDisplayName(user),
            display_name: getUserDisplayName(user),
            username: sanitizeProductText(user.username || user.ten_dang_nhap || user.tenDangNhap || '').trim()
                || String(user.username || user.ten_dang_nhap || user.tenDangNhap || '').trim(),
            role: getCanonicalRole(user.role || user.vai_tro || ''),
            email: String(user.email || '').trim(),
            sdt: sanitizeProductText(user.sdt || user.phone || user.so_dien_thoai || user.soDienThoai || '').trim()
                || String(user.sdt || user.phone || user.so_dien_thoai || user.soDienThoai || '').trim()
        };
    }

    function isStaffWorkspaceUser(user = currentUser) {
        return getCanonicalRole(user?.role) === 'Nh\u00e2n vi\u00ean';
    }

    function isManagerWorkspaceUser(user = currentUser) {
        return getCanonicalRole(user?.role) === 'Qu\u1ea3n tr\u1ecb vi\u00ean';
    }

    function canAccessWorkspace(user = currentUser) {
        if (isStaffWorkspaceUser(user) || isManagerWorkspaceUser(user)) {
            return true;
        }

        const identity = normalizeText([
            user?.id,
            user?.username,
            user?.ten_dang_nhap,
            user?.tenDangNhap,
            user?.email
        ].filter(Boolean).join(' '));

        return identity.includes('user admin')
            || identity.includes('user staff')
            || identity === 'admin'
            || identity.startsWith('admin ')
            || identity.includes(' nhanvien')
            || identity.includes(' staff');
    }

    function getWorkspaceRoleLabel(user = currentUser) {
        if (isManagerWorkspaceUser(user)) {
            return 'Qu\u1ea3n tr\u1ecb vi\u00ean';
        }
        if (isStaffWorkspaceUser(user)) {
            return 'Nh\u00e2n vi\u00ean';
        }
        return 'Kh\u00e1ch h\u00e0ng';
    }

    function getUserIdPrefixByRole(role) {
        const canonicalRole = getCanonicalRole(role);
        if (canonicalRole === 'Qu\u1ea3n tr\u1ecb vi\u00ean') {
            return 'user-admin-';
        }
        if (canonicalRole === 'Nh\u00e2n vi\u00ean') {
            return 'user-staff-';
        }
        return 'user-customer-';
    }

    function extractSequentialIdNumber(value, prefix) {
        const escapedPrefix = String(prefix || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matcher = String(value || '').trim().match(new RegExp(`^${escapedPrefix}(\\d+)$`, 'i'));
        return matcher ? Number(matcher[1]) : 0;
    }

    function generateManagedAccountId(role) {
        const prefix = getUserIdPrefixByRole(role);
        const maxNumber = getManagedAccounts().reduce((maxValue, account) => {
            return Math.max(maxValue, extractSequentialIdNumber(account?.id, prefix));
        }, 0);
        return `${prefix}${String(maxNumber + 1).padStart(3, '0')}`;
    }

    function getDisplayAccountId(account = {}) {
        const rawId = String(account?.id || '').trim();
        if (!rawId) {
            return '';
        }
        if (/^user-(admin|staff|customer)-\d+$/i.test(rawId)) {
            return rawId;
        }

        const prefix = getUserIdPrefixByRole(account?.role);
        const usernameSlug = String(account?.username || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return usernameSlug ? `${prefix}${usernameSlug}` : rawId;
    }

    function normalizeAccountRecord(account = {}) {
        const normalizedRole = getCanonicalRole(account.role || account.vai_tro || 'Kh\u00e1ch h\u00e0ng');
        const sanitizedName = sanitizeProductText(account.ho_ten || account.name || account.display_name || '').trim();

        return {
            id: String(account.id || generateRecordId('account')),
            ho_ten: sanitizedName && !hasBrokenTextArtifacts(sanitizedName)
                ? sanitizedName
                : getUserDisplayName(account),
            username: String(account.username || account.ten_dang_nhap || '').trim(),
            email: String(account.email || '').trim(),
            sdt: String(account.sdt || account.so_dien_thoai || '').trim(),
            role: normalizedRole,
            status: String(account.status || account.trang_thai || 'Ho\u1ea1t \u0111\u1ed9ng').trim() || 'Ho\u1ea1t \u0111\u1ed9ng',
            localOnly: Boolean(account.localOnly)
        };
    }

    async function renderUserList() {
        if (!userListBody) {
            return;
        }

        if (!isManagerWorkspaceUser()) {
            userListBody.innerHTML = '';
            return;
        }

        await ensureManagerAccountsLoaded();
        const accounts = getManagedAccounts();
        const table = userListBody.closest('table');
        if (table) {
            const headerRow = table.querySelector('thead tr');
            if (headerRow) {
                headerRow.innerHTML = '<th>ID</th><th>Họ tên</th><th>Username</th><th>Email</th><th>SĐT</th><th>Quyền hạn</th><th>Trạng thái</th><th>Thao tác</th>';
            }
        }

        userListBody.innerHTML = accounts.map(account => `
            <tr>
                <td>${escapeHtml(getDisplayAccountId(account))}</td>
                <td>${escapeHtml(account.ho_ten || '')}</td>
                <td>${escapeHtml(account.username || '')}</td>
                <td>${escapeHtml(account.email || '')}</td>
                <td>${escapeHtml(account.sdt || '')}</td>
                <td><span class="role-badge ${getRoleClass(account.role)}">${escapeHtml(getWorkspaceRoleLabel(account))}</span></td>
                <td><span class="workspace-chip">${escapeHtml(account.status || 'Hoạt động')}</span></td>
                <td>
                    <div class="workspace-row-actions">
                        <button class="secondary-btn text-bold" type="button" data-account-action="edit" data-account-id="${escapeHtml(account.id)}">Sửa</button>
                        <button class="cart-text-btn danger" type="button" data-account-action="delete" data-account-id="${escapeHtml(account.id)}">Xóa</button>
                    </div>
                </td>
            </tr>
        `).join('');

        repairTextNodes(userListBody);
    }

    function saveManagedAccountFromForm() {
        const registry = getAccountRegistryStore();
        const selectedRole = document.getElementById('account-role').value;
        const existingAccountId = document.getElementById('account-id').value.trim();
        const payload = normalizeAccountRecord({
            id: existingAccountId || generateManagedAccountId(selectedRole),
            ho_ten: document.getElementById('account-name').value.trim(),
            username: document.getElementById('account-username').value.trim(),
            email: document.getElementById('account-email').value.trim(),
            sdt: document.getElementById('account-phone').value.trim(),
            role: selectedRole,
            status: document.getElementById('account-status').value,
            localOnly: true
        });

        if (!payload.ho_ten || !payload.username || !payload.email) {
            const error = document.getElementById('account-form-error');
            if (error) {
                error.textContent = 'Vui lòng nhập đầy đủ họ tên, username và email.';
                error.classList.remove('hidden');
            }
            return;
        }

        const existsInBase = getManagedAccounts().some(account => String(account.id) === payload.id);
        if (existsInBase) {
            registry.updated[payload.id] = payload;
        } else {
            registry.created = [
                ...registry.created.filter(account => String(account.id) !== payload.id),
                payload
            ];
        }

        saveAccountRegistryStore(registry);
        closeAccountForm();
        renderInternalWorkspace();
    }

    async function renderUserList() {
        if (!userListBody) {
            return;
        }

        if (!isManagerWorkspaceUser()) {
            userListBody.innerHTML = '';
            return;
        }

        await ensureManagerAccountsLoaded();
        const accounts = getManagedAccounts();
        const table = userListBody.closest('table');
        if (table) {
            const headerRow = table.querySelector('thead tr');
            if (headerRow) {
                headerRow.innerHTML = '<th>ID</th><th>H\u1ecd t\u00ean</th><th>Username</th><th>Email</th><th>S\u0110T</th><th>Quy\u1ec1n h\u1ea1n</th><th>Tr\u1ea1ng th\u00e1i</th><th>Thao t\u00e1c</th>';
            }
        }

        userListBody.innerHTML = accounts.map(account => `
            <tr>
                <td>${escapeHtml(getDisplayAccountId(account))}</td>
                <td>${escapeHtml(account.ho_ten || '')}</td>
                <td>${escapeHtml(account.username || '')}</td>
                <td>${escapeHtml(account.email || '')}</td>
                <td>${escapeHtml(account.sdt || '')}</td>
                <td><span class="role-badge ${getRoleClass(account.role)}">${escapeHtml(getWorkspaceRoleLabel(account))}</span></td>
                <td><span class="workspace-chip">${escapeHtml(account.status || 'Ho\u1ea1t \u0111\u1ed9ng')}</span></td>
                <td>
                    <div class="workspace-row-actions">
                        <button class="secondary-btn text-bold" type="button" data-account-action="edit" data-account-id="${escapeHtml(account.id)}">S\u1eeda</button>
                        <button class="cart-text-btn danger" type="button" data-account-action="delete" data-account-id="${escapeHtml(account.id)}">X\u00f3a</button>
                    </div>
                </td>
            </tr>
        `).join('');

        repairTextNodes(userListBody);
    }

    function saveManagedAccountFromForm() {
        const registry = getAccountRegistryStore();
        const selectedRole = document.getElementById('account-role').value;
        const existingAccountId = document.getElementById('account-id').value.trim();
        const payload = normalizeAccountRecord({
            id: existingAccountId || generateManagedAccountId(selectedRole),
            ho_ten: document.getElementById('account-name').value.trim(),
            username: document.getElementById('account-username').value.trim(),
            email: document.getElementById('account-email').value.trim(),
            sdt: document.getElementById('account-phone').value.trim(),
            role: selectedRole,
            status: document.getElementById('account-status').value,
            localOnly: true
        });

        if (!payload.ho_ten || !payload.username || !payload.email) {
            const error = document.getElementById('account-form-error');
            if (error) {
                error.textContent = 'Vui l\u00f2ng nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 h\u1ecd t\u00ean, username v\u00e0 email.';
                error.classList.remove('hidden');
            }
            return;
        }

        const existsInBase = getManagedAccounts().some(account => String(account.id) === payload.id);
        if (existsInBase) {
            registry.updated[payload.id] = payload;
        } else {
            registry.created = [
                ...registry.created.filter(account => String(account.id) !== payload.id),
                payload
            ];
        }

        saveAccountRegistryStore(registry);
        closeAccountForm();
        renderInternalWorkspace();
    }

    function normalizeAccountCreatedAt(value, localOnly = false) {
        const trimmedValue = String(value || '').trim();
        if (trimmedValue) {
            return trimmedValue;
        }
        return localOnly ? new Date().toISOString() : '';
    }

    function getAccountTimestamp(account = {}) {
        const rawValue = String(account?.createdAt || '').trim();
        if (!rawValue) {
            return Number.NaN;
        }
        const normalizedValue = rawValue.includes('T') ? rawValue : rawValue.replace(' ', 'T');
        const timestamp = new Date(normalizedValue).getTime();
        return Number.isFinite(timestamp) ? timestamp : Number.NaN;
    }

    function formatDateInputValue(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            return '';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function syncAccountFilterInputs() {
        const state = getWorkspaceState();
        const presetSelect = document.getElementById('account-created-preset');
        const startInput = document.getElementById('account-created-start');
        const endInput = document.getElementById('account-created-end');
        const today = formatDateInputValue(new Date());

        presetSelect?.closest('.form-group')?.classList.add('hidden');

        if (presetSelect) {
            presetSelect.value = 'custom';
        }
        if (startInput) {
            startInput.value = state.accountCreatedStartDate || '';
            startInput.disabled = false;
            startInput.max = today;
        }
        if (endInput) {
            endInput.value = state.accountCreatedEndDate || '';
            endInput.disabled = false;
            endInput.max = today;
        }
    }

    function applyAccountCreatedPreset(preset = 'all') {
        const state = getWorkspaceState();
        state.accountCreatedPreset = preset;

        if (preset === 'all') {
            state.accountCreatedStartDate = '';
            state.accountCreatedEndDate = '';
            syncAccountFilterInputs();
            return;
        }

        if (preset === 'custom') {
            syncAccountFilterInputs();
            return;
        }

        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        const startDate = new Date(endDate);
        if (preset === 'week') {
            startDate.setDate(startDate.getDate() - 6);
        } else if (preset === 'month') {
            startDate.setDate(startDate.getDate() - 29);
        }

        state.accountCreatedStartDate = formatDateInputValue(startDate);
        state.accountCreatedEndDate = formatDateInputValue(endDate);
        syncAccountFilterInputs();
    }

    function getAccountPasswordValue(account = {}) {
        return String(account?.password || account?.mat_khau || '').trim();
    }

    function getAccountSearchTarget(account = {}) {
        return normalizeText([
            getDisplayAccountId(account),
            account.ho_ten,
            account.username,
            account.sdt,
            account.email
        ].filter(Boolean).join(' '));
    }

    function filterManagedAccounts(accounts = []) {
        const state = getWorkspaceState();
        const searchQuery = normalizeText(state.accountSearchQuery || '');
        const hasDateFilter = Boolean(state.accountCreatedStartDate || state.accountCreatedEndDate);
        const startTimestamp = state.accountCreatedStartDate
            ? new Date(`${state.accountCreatedStartDate}T00:00:00`).getTime()
            : null;
        const endTimestamp = state.accountCreatedEndDate
            ? new Date(`${state.accountCreatedEndDate}T23:59:59.999`).getTime()
            : null;

        return [...(Array.isArray(accounts) ? accounts : [])]
            .filter(account => {
                if (searchQuery && !getAccountSearchTarget(account).includes(searchQuery)) {
                    return false;
                }
                if (!hasDateFilter) {
                    return true;
                }
                const createdTimestamp = getAccountTimestamp(account);
                if (!Number.isFinite(createdTimestamp)) {
                    return false;
                }
                if (startTimestamp !== null && createdTimestamp < startTimestamp) {
                    return false;
                }
                if (endTimestamp !== null && createdTimestamp > endTimestamp) {
                    return false;
                }
                return true;
            })
            .sort((left, right) => {
                const rightTimestamp = getAccountTimestamp(right);
                const leftTimestamp = getAccountTimestamp(left);
                const timeDelta = (Number.isFinite(rightTimestamp) ? rightTimestamp : 0) - (Number.isFinite(leftTimestamp) ? leftTimestamp : 0);
                if (timeDelta !== 0) {
                    return timeDelta;
                }
                return String(left.ho_ten || '').localeCompare(String(right.ho_ten || ''), 'vi');
            });
    }

    function getStaffProductSearchTarget(product = {}) {
        return normalizeText([
            product.sku,
            product.ten_san_pham,
            product.thuong_hieu,
            product.danh_muc
        ].join(' '));
    }

    function matchesStaffProductPriceFilter(product = {}, filterValue = 'all') {
        const price = Number(product.gia_ban || 0);
        switch (filterValue) {
            case 'under-500k':
                return price < 500000;
            case '500k-1m':
                return price >= 500000 && price <= 1000000;
            case '1m-3m':
                return price > 1000000 && price <= 3000000;
            case 'above-3m':
                return price > 3000000;
            default:
                return true;
        }
    }

    function matchesStaffProductStockFilter(product = {}, filterValue = 'all') {
        const stock = Number(product.ton_kho || 0);
        switch (filterValue) {
            case 'out-of-stock':
                return stock <= 0;
            case 'low-stock':
                return stock >= 1 && stock <= 10;
            case 'medium-stock':
                return stock >= 11 && stock <= 30;
            case 'high-stock':
                return stock > 30;
            default:
                return true;
        }
    }

    function getFilteredAdminProducts(products = allProducts) {
        const state = getWorkspaceState();
        const searchQuery = normalizeText(state.staffProductSearchQuery || '');
        const brandFilter = normalizeText(state.staffProductBrandFilter || 'all');
        const categoryFilter = normalizeText(state.staffProductCategoryFilter || 'all');

        return [...(Array.isArray(products) ? products : [])]
            .filter(product => {
                if (searchQuery && !getStaffProductSearchTarget(product).includes(searchQuery)) {
                    return false;
                }
                if (brandFilter !== 'all' && normalizeText(product.thuong_hieu || '') !== brandFilter) {
                    return false;
                }
                if (categoryFilter !== 'all' && normalizeText(product.danh_muc || '') !== categoryFilter) {
                    return false;
                }
                if (!matchesStaffProductPriceFilter(product, state.staffProductPriceFilter || 'all')) {
                    return false;
                }
                if (!matchesStaffProductStockFilter(product, state.staffProductStockFilter || 'all')) {
                    return false;
                }
                return true;
            })
            .sort((left, right) => String(left.ten_san_pham || '').localeCompare(String(right.ten_san_pham || ''), 'vi'));
    }

    function syncStaffProductFilterInputs(products = allProducts) {
        const state = getWorkspaceState();
        const searchInput = document.getElementById('staff-product-search-input');
        const brandSelect = document.getElementById('staff-product-brand-filter');
        const categorySelect = document.getElementById('staff-product-category-filter');
        const priceSelect = document.getElementById('staff-product-price-filter');
        const stockSelect = document.getElementById('staff-product-stock-filter');

        if (searchInput) {
            searchInput.value = state.staffProductSearchQuery || '';
        }

        const uniqueBrands = [...new Set((Array.isArray(products) ? products : [])
            .map(product => sanitizeProductText(product.thuong_hieu || '').trim())
            .filter(Boolean))]
            .sort((left, right) => left.localeCompare(right, 'vi'));

        const uniqueCategories = [...new Set((Array.isArray(products) ? products : [])
            .map(product => sanitizeProductText(product.danh_muc || '').trim())
            .filter(Boolean))]
            .sort((left, right) => left.localeCompare(right, 'vi'));

        if (brandSelect) {
            const currentValue = state.staffProductBrandFilter || 'all';
            brandSelect.innerHTML = ['<option value="all">Tất cả thương hiệu</option>']
                .concat(uniqueBrands.map(brand => `<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`))
                .join('');
            brandSelect.value = uniqueBrands.some(brand => brand === currentValue) ? currentValue : 'all';
            state.staffProductBrandFilter = brandSelect.value;
        }

        if (categorySelect) {
            const currentValue = state.staffProductCategoryFilter || 'all';
            categorySelect.innerHTML = ['<option value="all">Tất cả danh mục</option>']
                .concat(uniqueCategories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`))
                .join('');
            categorySelect.value = uniqueCategories.some(category => category === currentValue) ? currentValue : 'all';
            state.staffProductCategoryFilter = categorySelect.value;
        }

        if (priceSelect) {
            priceSelect.value = state.staffProductPriceFilter || 'all';
        }

        if (stockSelect) {
            stockSelect.value = state.staffProductStockFilter || 'all';
        }
    }

    function getStaffOrderSearchTarget(order = {}) {
        return normalizeText([
            order.id,
            order.code,
            order.customer?.name,
            order.customer?.username,
            order.customer?.phone,
            order.address?.recipient,
            order.address?.phone,
            order.voucherCode,
            order.status
        ].filter(Boolean).join(' '));
    }

    function getStaffOrderTimestamp(order = {}) {
        const timestamp = new Date(order.createdAt || order.created_at || 0).getTime();
        return Number.isFinite(timestamp) ? timestamp : 0;
    }

    function filterStaffOrders(orders = []) {
        const state = getWorkspaceState();
        const searchQuery = normalizeText(state.staffOrderSearchQuery || '');
        const statusFilter = normalizeText(state.staffOrderStatusFilter || 'all');
        const startTimestamp = state.staffOrderStartDate
            ? new Date(`${state.staffOrderStartDate}T00:00:00`).getTime()
            : null;
        const endTimestamp = state.staffOrderEndDate
            ? new Date(`${state.staffOrderEndDate}T23:59:59.999`).getTime()
            : null;

        return [...(Array.isArray(orders) ? orders : [])]
            .filter(order => {
                if (searchQuery && !getStaffOrderSearchTarget(order).includes(searchQuery)) {
                    return false;
                }
                if (statusFilter !== 'all' && normalizeText(order.status || '') !== statusFilter) {
                    return false;
                }
                const createdTimestamp = getStaffOrderTimestamp(order);
                if (startTimestamp !== null && createdTimestamp < startTimestamp) {
                    return false;
                }
                if (endTimestamp !== null && createdTimestamp > endTimestamp) {
                    return false;
                }
                return true;
            })
            .sort((left, right) => getStaffOrderTimestamp(right) - getStaffOrderTimestamp(left));
    }

    function getStaffCategorySearchTarget(category = {}) {
        return normalizeText([
            category.id,
            category.sport,
            category.label,
            category.status
        ].filter(Boolean).join(' '));
    }

    function filterStaffCategories(categories = []) {
        const state = getWorkspaceState();
        const searchQuery = normalizeText(state.staffCategorySearchQuery || '');
        const sportFilter = normalizeText(state.staffCategorySportFilter || 'all');
        const labelFilter = normalizeText(state.staffCategoryLabelFilter || 'all');
        const statusFilter = normalizeText(state.staffCategoryStatusFilter || 'all');

        return [...(Array.isArray(categories) ? categories : [])]
            .filter(category => {
                if (searchQuery && !getStaffCategorySearchTarget(category).includes(searchQuery)) {
                    return false;
                }
                if (sportFilter !== 'all' && normalizeText(category.sport || '') !== sportFilter) {
                    return false;
                }
                if (labelFilter !== 'all' && normalizeText(category.label || '') !== labelFilter) {
                    return false;
                }
                if (statusFilter !== 'all' && normalizeText(category.status || '') !== statusFilter) {
                    return false;
                }
                return true;
            })
            .sort((left, right) => {
                const sportDelta = String(left.sport || '').localeCompare(String(right.sport || ''), 'vi');
                if (sportDelta !== 0) {
                    return sportDelta;
                }
                return String(left.label || '').localeCompare(String(right.label || ''), 'vi');
            });
    }

    function getReviewProduct(review = {}) {
        return findProductById(review.productId) || {};
    }

    function getReviewProductTypeLabel(product = {}) {
        const groupLabel = sanitizeProductText(getProductGroupLabel(product) || '').trim();
        if (groupLabel && normalizeText(groupLabel) !== 'khong ro') {
            return groupLabel;
        }

        const typeOptions = getProductTypeOptions(product);
        return typeOptions[0] || '';
    }

    function getStaffReviewSearchTarget(review = {}) {
        const product = getReviewProduct(review);
        return normalizeText([
            review.id,
            review.reviewer,
            review.content,
            review.status,
            review.rating,
            product.id,
            product.sku,
            product.ten_san_pham,
            product.thuong_hieu,
            product.danh_muc,
            getReviewProductTypeLabel(product)
        ].filter(Boolean).join(' '));
    }

    function filterStaffReviews(reviews = []) {
        const state = getWorkspaceState();
        const searchQuery = normalizeText(state.staffReviewSearchQuery || '');
        const categoryFilter = normalizeText(state.staffReviewCategoryFilter || 'all');
        const typeFilter = normalizeText(state.staffReviewTypeFilter || 'all');
        const ratingFilter = String(state.staffReviewRatingFilter || 'all');
        const statusFilter = normalizeText(state.staffReviewStatusFilter || 'all');

        return [...(Array.isArray(reviews) ? reviews : [])]
            .filter(review => {
                const product = getReviewProduct(review);
                const category = normalizeText(product.danh_muc || getCanonicalSportFromProduct(product));
                const type = normalizeText(getReviewProductTypeLabel(product));
                const status = normalizeText(review.status || 'Hiển thị');

                if (searchQuery && !getStaffReviewSearchTarget(review).includes(searchQuery)) {
                    return false;
                }
                if (categoryFilter !== 'all' && category !== categoryFilter) {
                    return false;
                }
                if (typeFilter !== 'all' && type !== typeFilter) {
                    return false;
                }
                if (ratingFilter !== 'all' && String(Number(review.rating || 0)) !== ratingFilter) {
                    return false;
                }
                if (statusFilter !== 'all' && status !== statusFilter) {
                    return false;
                }
                return true;
            })
            .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));
    }

    normalizeAccountRecord = function normalizeAccountRecord(account = {}) {
        const normalizedRole = getCanonicalRole(account.role || account.vai_tro || 'Khách hàng');
        const sanitizedName = sanitizeProductText(account.ho_ten || account.name || account.display_name || '').trim();
        const localOnly = Boolean(account.localOnly);

        return {
            id: String(account.id || generateRecordId('account')),
            ho_ten: sanitizedName && !hasBrokenTextArtifacts(sanitizedName)
                ? sanitizedName
                : getUserDisplayName(account),
            username: String(account.username || account.ten_dang_nhap || '').trim(),
            email: String(account.email || '').trim(),
            sdt: String(account.sdt || account.so_dien_thoai || '').trim(),
            role: normalizedRole,
            status: String(account.status || account.trang_thai || 'Hoạt động').trim() || 'Hoạt động',
            createdAt: normalizeAccountCreatedAt(account.createdAt || account.created_at || account.ngay_tao, localOnly),
            localOnly
        };
    };

    renderUserList = async function renderUserList() {
        if (!userListBody) {
            return;
        }

        if (!isManagerWorkspaceUser()) {
            userListBody.innerHTML = '';
            return;
        }

        await ensureManagerAccountsLoaded();
        syncAccountFilterInputs();

        const allAccounts = getManagedAccounts();
        const accounts = filterManagedAccounts(allAccounts);
        const state = getWorkspaceState();
        const table = userListBody.closest('table');
        const summary = document.getElementById('account-filter-summary');
        const createdCountChip = document.getElementById('account-filter-created-count');

        if (table) {
            const headerRow = table.querySelector('thead tr');
            if (headerRow) {
                headerRow.innerHTML = '<th>ID</th><th>Họ tên</th><th>Username</th><th>Email</th><th>SĐT</th><th>Ngày tạo</th><th>Quyền hạn</th><th>Trạng thái</th><th>Thao tác</th>';
            }
        }

        if (createdCountChip) {
            createdCountChip.textContent = `${accounts.length} tài khoản`;
        }

        if (summary) {
            const searchLabel = state.accountSearchQuery ? `, khớp từ khóa "${state.accountSearchQuery}"` : '';
            const hasDateRange = Boolean(state.accountCreatedStartDate || state.accountCreatedEndDate);
            const dateLabel = hasDateRange
                ? `, tạo từ ${state.accountCreatedStartDate || '--'} đến ${state.accountCreatedEndDate || '--'}`
                : '';
            summary.textContent = `Hiển thị ${accounts.length}/${allAccounts.length} tài khoản${searchLabel}${dateLabel}.`;
        }

        if (!accounts.length) {
            userListBody.innerHTML = '<tr><td colspan="9"><div class="workspace-empty">Không có tài khoản phù hợp với bộ lọc hiện tại.</div></td></tr>';
            return;
        }

        userListBody.innerHTML = accounts.map(account => {
            return `
                <tr>
                    <td>${escapeHtml(getDisplayAccountId(account))}</td>
                    <td>${escapeHtml(account.ho_ten || '')}</td>
                    <td>${escapeHtml(account.username || '')}</td>
                    <td>${escapeHtml(account.email || '')}</td>
                    <td>${escapeHtml(account.sdt || '')}</td>
                    <td class="account-created-cell">${escapeHtml(account.createdAt ? formatDateTimeDisplay(account.createdAt) : '--')}</td>
                    <td><span class="role-badge ${getRoleClass(account.role)}">${escapeHtml(getWorkspaceRoleLabel(account))}</span></td>
                    <td><span class="workspace-chip">${escapeHtml(account.status || 'Hoạt động')}</span></td>
                    <td>
                        <div class="workspace-row-actions account-actions">
                            <button class="cart-text-btn danger" type="button" data-account-action="delete" data-account-id="${escapeHtml(account.id)}">Xóa</button>
                            <button class="secondary-btn text-bold" type="button" data-account-action="edit" data-account-id="${escapeHtml(account.id)}">Sửa</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        repairTextNodes(userListBody);
    };

    saveManagedAccountFromForm = function saveManagedAccountFromForm() {
        const registry = getAccountRegistryStore();
        const selectedRole = document.getElementById('account-role').value;
        const existingAccountId = document.getElementById('account-id').value.trim();
        const existingAccount = getManagedAccounts().find(account => String(account.id) === existingAccountId);
        const nextCreatedAt = document.getElementById('account-created-at').value.trim() || existingAccount?.createdAt || new Date().toISOString();
        const payload = normalizeAccountRecord({
            id: existingAccountId || generateManagedAccountId(selectedRole),
            ho_ten: document.getElementById('account-name').value.trim(),
            username: document.getElementById('account-username').value.trim(),
            email: document.getElementById('account-email').value.trim(),
            sdt: document.getElementById('account-phone').value.trim(),
            role: selectedRole,
            status: document.getElementById('account-status').value,
            createdAt: nextCreatedAt,
            localOnly: true
        });

        if (!payload.ho_ten || !payload.username || !payload.email) {
            const error = document.getElementById('account-form-error');
            if (error) {
                error.textContent = 'Vui lòng nhập đầy đủ họ tên, username và email.';
                error.classList.remove('hidden');
            }
            return;
        }

        const existsInBase = getManagedAccounts().some(account => String(account.id) === payload.id);
        if (existsInBase) {
            registry.updated[payload.id] = payload;
        } else {
            registry.created = [
                ...registry.created.filter(account => String(account.id) !== payload.id),
                payload
            ];
        }

        saveAccountRegistryStore(registry);
        closeAccountForm();
        renderInternalWorkspace();
    };

    function ensureCartAccess(message = 'H\u00e3y \u0111\u0103ng nh\u1eadp \u0111\u1ec3 s\u1eed d\u1ee5ng gi\u1ecf h\u00e0ng.') {
        if (currentUser && !canAccessWorkspace()) {
            return true;
        }

        if (currentUser && canAccessWorkspace()) {
            alert('T\u00e0i kho\u1ea3n qu\u1ea3n tr\u1ecb v\u00e0 nh\u00e2n vi\u00ean ch\u1ec9 c\u00f3 th\u1ec3 xem s\u1ea3n ph\u1ea9m, kh\u00f4ng \u0111\u01b0\u1ee3c th\u00eam v\u00e0o gi\u1ecf h\u00e0ng ho\u1eb7c thanh to\u00e1n.');
            return false;
        }

        loginError.textContent = message;
        loginError.classList.remove('hidden');
        openOverlay(loginOverlay);
        return false;
    }

    function ensureCustomerAccess(message = 'H\u00e3y \u0111\u0103ng nh\u1eadp \u0111\u1ec3 s\u1eed d\u1ee5ng t\u00ednh n\u0103ng t\u00e0i kho\u1ea3n kh\u00e1ch h\u00e0ng.') {
        if (currentUser && !canAccessWorkspace()) {
            return true;
        }

        if (currentUser && canAccessWorkspace()) {
            alert('T\u00ednh n\u0103ng n\u00e0y ch\u1ec9 d\u00e0nh cho t\u00e0i kho\u1ea3n kh\u00e1ch h\u00e0ng.');
            return false;
        }

        loginError.textContent = message;
        loginError.classList.remove('hidden');
        openOverlay(loginOverlay);
        return false;
    }

    function ensureWishlistAccess(message = 'H\u00e3y \u0111\u0103ng nh\u1eadp \u0111\u1ec3 s\u1eed d\u1ee5ng s\u1ea3n ph\u1ea9m y\u00eau th\u00edch.') {
        if (currentUser && !canAccessWorkspace()) {
            return true;
        }

        if (currentUser && canAccessWorkspace()) {
            alert('T\u00e0i kho\u1ea3n qu\u1ea3n tr\u1ecb v\u00e0 nh\u00e2n vi\u00ean kh\u00f4ng \u0111\u01b0\u1ee3c l\u01b0u s\u1ea3n ph\u1ea9m v\u00e0o y\u00eau th\u00edch.');
            return false;
        }

        loginError.textContent = message;
        loginError.classList.remove('hidden');
        openOverlay(loginOverlay);
        return false;
    }

    function getCartItems() {
        if (canAccessWorkspace()) {
            return [];
        }

        const cartStorageKey = getCurrentCartStorageKey();
        if (!cartStorageKey) {
            return [];
        }

        const storedItems = readStorage(cartStorageKey, []);
        if (!Array.isArray(storedItems)) {
            return [];
        }

        const cartMap = new Map();

        storedItems.forEach(rawItem => {
            const productId = String(rawItem?.productId ?? rawItem?.id ?? '').trim();
            if (!productId) {
                return;
            }

            const product = findProductById(productId);
            const sizeOptions = getProductSizeOptions(product);
            const typeOptions = getProductTypeOptions(product);
            const fallbackSize = sizeOptions[0] || 'Tieu chuan';
            const size = String(rawItem?.size || fallbackSize).trim() || fallbackSize;
            const fallbackVariantType = typeOptions.length ? typeOptions[0] : '';
            const variantType = String(rawItem?.variantType || rawItem?.type || fallbackVariantType).trim();
            const lineId = buildCartLineId(productId, size, variantType);
            const quantity = Math.max(1, Math.round(Number(rawItem?.quantity || 1)));
            const selected = normalizeCartSelectionFlag(rawItem?.selected);

            if (cartMap.has(lineId)) {
                const existing = cartMap.get(lineId);
                existing.quantity += quantity;
                existing.selected = normalizeCartSelectionFlag(existing.selected) && selected;
                return;
            }

            cartMap.set(lineId, {
                lineId,
                productId,
                size,
                variantType,
                quantity,
                selected
            });
        });

        return Array.from(cartMap.values());
    }

    function getWishlistIds() {
        if (canAccessWorkspace()) {
            return [];
        }

        const wishlistStorageKey = getCurrentWishlistStorageKey();
        if (!wishlistStorageKey) {
            return [];
        }

        const wishlistIds = readStorage(wishlistStorageKey, []);
        if (!Array.isArray(wishlistIds)) {
            return [];
        }

        return Array.from(new Set(wishlistIds.map(id => String(id || '').trim()).filter(Boolean)));
    }

    function handleCheckout() {
        const cartItems = getHydratedCartItems();
        const selectedItems = cartItems.filter(item => item.selected);
        if (!selectedItems.length) {
            alert('Hãy chọn ít nhất một sản phẩm để thanh toán.');
            return;
        }

        if (!ensureCustomerAccess('Hãy đăng nhập bằng tài khoản khách hàng trước khi thanh toán.')) {
            return;
        }

        openCheckoutView();
    }

    function openCheckoutView() {
        if (!ensureCustomerAccess('Hãy đăng nhập bằng tài khoản khách hàng để tiếp tục thanh toán.')) {
            return;
        }

        currentView = 'checkout';
        ensureCheckoutAddressSelection();
        setTrackedPageContext('CHECKOUT', 'checkout');
        renderCheckoutView();
        syncMainView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function getSearchHistoryStorageKey() {
        return getScopedStorageKey('pbl3_search_history');
    }

    function getRecentSearches() {
        const storageKey = getSearchHistoryStorageKey();
        if (!storageKey) {
            return [];
        }

        const stored = readStorage(storageKey, []);
        if (!Array.isArray(stored)) {
            return [];
        }

        return stored
            .map(item => String(item || '').trim())
            .filter(Boolean)
            .slice(0, 10);
    }

    function saveRecentSearches(queries) {
        const storageKey = getSearchHistoryStorageKey();
        if (!storageKey) {
            return;
        }

        const normalizedQueries = [];
        const seen = new Set();

        (Array.isArray(queries) ? queries : []).forEach(query => {
            const trimmedQuery = String(query || '').trim();
            const normalizedKey = normalizeText(trimmedQuery);
            if (!trimmedQuery || seen.has(normalizedKey)) {
                return;
            }
            seen.add(normalizedKey);
            normalizedQueries.push(trimmedQuery);
        });

        localStorage.setItem(storageKey, JSON.stringify(normalizedQueries.slice(0, 10)));
    }

    function rememberSearchQuery(query) {
        const trimmedQuery = String(query || '').trim();
        if (!trimmedQuery) {
            return;
        }

        saveRecentSearches([
            trimmedQuery,
            ...getRecentSearches()
        ]);
    }

    function renderRecentSearchSuggestions() {
        if (!searchSuggestions) {
            return;
        }

        const recentSearches = getRecentSearches();
        if (!recentSearches.length) {
            searchSuggestions.innerHTML = '';
            searchSuggestions.classList.add('hidden');
            return;
        }

        searchSuggestions.innerHTML = `
            <div class="search-suggestion-section-title">Tìm kiếm gần đây</div>
            ${recentSearches.map(query => `
                <button class="search-suggestion-item recent-search-item" type="button" data-search-suggestion="${escapeHtml(query)}">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>${escapeHtml(query)}</span>
                </button>
            `).join('')}
        `;
        searchSuggestions.classList.remove('hidden');
    }

    function applySearchQuery(nextQuery = searchInput.value) {
        currentQuery = String(nextQuery || '').trim();
        currentView = 'catalog';
        currentCollectionId = '';
        currentCategory = 'all';
        currentMenuItemId = '';
        currentBrand = '';
        currentPriceRange = 'all';
        currentTypeFilter = 'all';
        currentSizeFilter = 'all';
        currentSortOption = 'featured';
        searchInput.value = currentQuery;
        closeSearchSuggestions();
        closeMegaMenu();
        if (currentQuery) {
            rememberSearchQuery(currentQuery);
            trackBehaviorEvent({
                eventType: 'PRODUCT_SEARCH',
                pageType: 'SEARCH_RESULTS',
                pageKey: `search:${normalizeText(currentQuery) || 'empty'}`,
                searchKeyword: currentQuery
            });
        }
        renderCatalog();
    }

    function renderSearchSuggestions(query) {
        if (!searchSuggestions) {
            return;
        }

        const normalizedQuery = String(query || '').trim();
        if (!normalizedQuery) {
            renderRecentSearchSuggestions();
            return;
        }

        const suggestions = getSearchSuggestions(normalizedQuery, allProducts, SEARCH_SUGGESTION_LIMIT);
        if (!suggestions.length) {
            searchSuggestions.innerHTML = '<div class="search-suggestion-empty">Không có gợi ý phù hợp</div>';
            searchSuggestions.classList.remove('hidden');
            return;
        }

        searchSuggestions.innerHTML = suggestions.map(product => `
            <button class="search-suggestion-item" type="button" data-search-suggestion="${escapeHtml(product.ten_san_pham || '')}">
                <img src="${escapeHtml(getProductImageUrl(product))}" alt="${escapeHtml(product.ten_san_pham || 'Sản phẩm')}" loading="lazy">
                <div class="search-suggestion-content">
                    <strong>${escapeHtml(product.ten_san_pham || '')}</strong>
                    <span>${escapeHtml(product.thuong_hieu || 'Không rõ thương hiệu')}</span>
                </div>
                <span class="search-suggestion-price">${formatCurrency(getProductCurrentPrice(product))}</span>
            </button>
        `).join('');
        searchSuggestions.classList.remove('hidden');
    }

    function ensureSportSectionRegistered(sectionConfig) {
        if (!sectionConfig || !sectionConfig.sport || !Array.isArray(sectionConfig.items)) {
            return;
        }

        const existingSection = SPORT_SECTIONS.find(section => normalizeText(section.sport) === normalizeText(sectionConfig.sport));
        if (!existingSection) {
            SPORT_SECTIONS.push(sectionConfig);
            return;
        }

        sectionConfig.items.forEach(item => {
            if (!existingSection.items.some(existingItem => existingItem.id === item.id)) {
                existingSection.items.push(item);
            }
        });
    }

    function getExtendedSportProductsSeed() {
        return [
            {
                id: 'product-140',
                ten_san_pham: 'Nike Pegasus 41',
                sku: 'RUN-001',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'Nike',
                size: '40-44',
                mau: 'Xanh dương / Trắng',
                gia_nhap: 2490000,
                gia_ban: 3490000,
                ton_kho: 12,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Mẫu giày chạy bộ road running thuộc dòng Pegasus 41 của Nike, phù hợp cho chạy hằng ngày với độ đàn hồi cân bằng và cảm giác ổn định.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Pegasus 41.',
                created_at: '2026-04-23 08:00:00',
                updated_at: '2026-04-23 08:00:00',
                is_deleted: 0
            },
            {
                id: 'product-141',
                ten_san_pham: 'Nike Vomero 18',
                sku: 'RUN-002',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'Nike',
                size: '40-44',
                mau: 'Trắng / Xanh navy',
                gia_nhap: 2790000,
                gia_ban: 3790000,
                ton_kho: 9,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Giày road running thiên về êm ái thuộc dòng Vomero 18, phù hợp cho runner cần đệm dày và cảm giác mềm khi chạy quãng đường dài.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Vomero 18.',
                created_at: '2026-04-23 08:01:00',
                updated_at: '2026-04-23 08:01:00',
                is_deleted: 0
            },
            {
                id: 'product-142',
                ten_san_pham: 'ASICS GEL-NIMBUS 27',
                sku: 'RUN-003',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'ASICS',
                size: '40-44',
                mau: 'Trắng / Bạc',
                gia_nhap: 2650000,
                gia_ban: 3650000,
                ton_kho: 8,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Mẫu giày chạy bộ cao cấp GEL-NIMBUS 27 của ASICS nổi bật với đệm êm, phù hợp cho chạy daily training và recovery run.',
                ghi_chu: 'Nguồn tham chiếu: ASICS official - GEL-NIMBUS 27.',
                created_at: '2026-04-23 08:02:00',
                updated_at: '2026-04-23 08:02:00',
                is_deleted: 0
            },
            {
                id: 'product-143',
                ten_san_pham: 'ASICS GEL-KAYANO 31',
                sku: 'RUN-004',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'ASICS',
                size: '40-44',
                mau: 'Đen / Xanh ngọc',
                gia_nhap: 2890000,
                gia_ban: 3990000,
                ton_kho: 7,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'GEL-KAYANO 31 là dòng stability running shoe của ASICS, phù hợp với runner cần hỗ trợ tốt hơn cho những buổi chạy hằng ngày.',
                ghi_chu: 'Nguồn tham chiếu: ASICS official - GEL-KAYANO 31.',
                created_at: '2026-04-23 08:03:00',
                updated_at: '2026-04-23 08:03:00',
                is_deleted: 0
            },
            {
                id: 'product-144',
                ten_san_pham: 'Nike Miler Men\'s Dri-FIT Short-Sleeve Running Top',
                sku: 'RUN-005',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'Nike',
                size: 'M-L',
                mau: 'Xám / Đen',
                gia_nhap: 690000,
                gia_ban: 990000,
                ton_kho: 15,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Áo chạy bộ tay ngắn Nike Miler dùng chất liệu Dri-FIT, thoáng khí và phù hợp cho các buổi chạy hằng ngày trong thời tiết nóng.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Miler Running Top.',
                created_at: '2026-04-23 08:04:00',
                updated_at: '2026-04-23 08:04:00',
                is_deleted: 0
            },
            {
                id: 'product-145',
                ten_san_pham: 'Nike Stride Men\'s Dri-FIT 7\" 2-in-1 Running Shorts',
                sku: 'RUN-006',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'Nike',
                size: 'M-L',
                mau: 'Đen',
                gia_nhap: 790000,
                gia_ban: 1090000,
                ton_kho: 14,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Quần chạy bộ 2 trong 1 Nike Stride dài 7 inch, tối ưu cho vận động linh hoạt và kiểm soát mồ hôi trong các buổi chạy cường độ vừa.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Stride 7 inch 2-in-1 Running Shorts.',
                created_at: '2026-04-23 08:05:00',
                updated_at: '2026-04-23 08:05:00',
                is_deleted: 0
            },
            {
                id: 'product-146',
                ten_san_pham: 'ASICS ROAD PACKABLE JACKET',
                sku: 'RUN-007',
                danh_muc: 'Chạy bộ',
                thuong_hieu: 'ASICS',
                size: 'M-L',
                mau: 'Xanh navy',
                gia_nhap: 1390000,
                gia_ban: 1890000,
                ton_kho: 10,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Áo khoác chạy bộ ROAD PACKABLE JACKET của ASICS có thể gấp gọn, phù hợp cho runner cần lớp ngoài nhẹ khi thời tiết thay đổi.',
                ghi_chu: 'Nguồn tham chiếu: ASICS official - ROAD PACKABLE JACKET.',
                created_at: '2026-04-23 08:06:00',
                updated_at: '2026-04-23 08:06:00',
                is_deleted: 0
            },
            {
                id: 'product-147',
                ten_san_pham: 'Nike Metcon 9',
                sku: 'GYM-001',
                danh_muc: 'Tập gym',
                thuong_hieu: 'Nike',
                size: '40-44',
                mau: 'Đen / Trắng',
                gia_nhap: 3190000,
                gia_ban: 4290000,
                ton_kho: 8,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Nike Metcon 9 là mẫu giày workout chuyên cho tập gym, hỗ trợ các bài sức mạnh, conditioning và bài tập toàn thân trong phòng tập.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Metcon 9.',
                created_at: '2026-04-23 08:07:00',
                updated_at: '2026-04-23 08:07:00',
                is_deleted: 0
            },
            {
                id: 'product-148',
                ten_san_pham: 'Nike Free Metcon 6',
                sku: 'GYM-002',
                danh_muc: 'Tập gym',
                thuong_hieu: 'Nike',
                size: '40-44',
                mau: 'Trắng / Xám',
                gia_nhap: 2590000,
                gia_ban: 3590000,
                ton_kho: 9,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Free Metcon 6 kết hợp độ linh hoạt của Nike Free với sự ổn định cho tập gym, phù hợp cho circuit training và bài tập cường độ cao.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Free Metcon 6.',
                created_at: '2026-04-23 08:08:00',
                updated_at: '2026-04-23 08:08:00',
                is_deleted: 0
            },
            {
                id: 'product-149',
                ten_san_pham: 'Nike Dri-FIT Primary Men\'s Training T-Shirt',
                sku: 'GYM-003',
                danh_muc: 'Tập gym',
                thuong_hieu: 'Nike',
                size: 'M-L',
                mau: 'Xanh rêu',
                gia_nhap: 690000,
                gia_ban: 950000,
                ton_kho: 16,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Áo tập gym Nike Dri-FIT Primary là lựa chọn cơ bản cho các buổi workout nhờ chất vải thấm hút tốt và phom dễ vận động.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Dri-FIT Primary Training T-Shirt.',
                created_at: '2026-04-23 08:09:00',
                updated_at: '2026-04-23 08:09:00',
                is_deleted: 0
            },
            {
                id: 'product-150',
                ten_san_pham: 'Nike Pro Men\'s Dri-FIT Fitness Tights',
                sku: 'GYM-004',
                danh_muc: 'Tập gym',
                thuong_hieu: 'Nike',
                size: 'M-L',
                mau: 'Đen',
                gia_nhap: 790000,
                gia_ban: 1090000,
                ton_kho: 12,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Quần tights Nike Pro Dri-FIT phù hợp cho squat, deadlift và các bài tập cường độ cao, hỗ trợ ôm cơ và thoát mồ hôi.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Pro Fitness Tights.',
                created_at: '2026-04-23 08:10:00',
                updated_at: '2026-04-23 08:10:00',
                is_deleted: 0
            },
            {
                id: 'product-151',
                ten_san_pham: 'Nike Brasilia 9.5 Training Duffel Bag (Medium, 60L)',
                sku: 'GYM-005',
                danh_muc: 'Tập gym',
                thuong_hieu: 'Nike',
                size: '60L',
                mau: 'Đen / Trắng',
                gia_nhap: 790000,
                gia_ban: 1090000,
                ton_kho: 11,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Túi tập Nike Brasilia 9.5 dung tích 60L phù hợp mang giày, quần áo tập và phụ kiện cho lịch tập gym hằng ngày.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Brasilia 9.5 Training Duffel Bag.',
                created_at: '2026-04-23 08:11:00',
                updated_at: '2026-04-23 08:11:00',
                is_deleted: 0
            },
            {
                id: 'product-152',
                ten_san_pham: 'Nike Brasilia 9.5 Training Backpack (Medium, 24L)',
                sku: 'GYM-006',
                danh_muc: 'Tập gym',
                thuong_hieu: 'Nike',
                size: '24L',
                mau: 'Đen / Trắng',
                gia_nhap: 690000,
                gia_ban: 950000,
                ton_kho: 13,
                trang_thai: 'Đang bán',
                hinh_anh_url: '',
                bien_the_json: null,
                mo_ta: 'Balo Nike Brasilia 9.5 Training Backpack thích hợp cho người tập gym cần mang laptop, bình nước và quần áo tập trong một ngày.',
                ghi_chu: 'Nguồn tham chiếu: Nike official - Brasilia 9.5 Training Backpack.',
                created_at: '2026-04-23 08:12:00',
                updated_at: '2026-04-23 08:12:00',
                is_deleted: 0
            }
        ];
    }

    function mergeWithExtendedSportProducts(baseProducts) {
        const list = Array.isArray(baseProducts) ? baseProducts : [];
        const existingKeys = new Set(
            list.map(product => String(product?.sku || product?.id || '').trim()).filter(Boolean)
        );

        return [
            ...list,
            ...getExtendedSportProductsSeed().filter(product => !existingKeys.has(String(product.sku || product.id || '').trim()))
        ];
    }

    ensureSportSectionRegistered({
        sport: 'Chạy bộ',
        icon: 'fa-person-running',
        items: [
            { id: 'running-shoes', label: 'Giày chạy bộ', panels: ['sports'], keywords: ['giay'] },
            { id: 'running-apparel', label: 'Áo chạy bộ', panels: ['sports', 'apparel'], keywords: ['ao ', 'shirt', 'top', 'singlet'] },
            { id: 'running-bottoms', label: 'Quần chạy bộ', panels: ['sports', 'apparel'], keywords: ['short', 'shorts', 'quan '] },
            { id: 'running-accessories', label: 'Áo khoác / phụ kiện', panels: ['accessories'], keywords: ['jacket', 'packable', 'belt', 'vest'] }
        ]
    });

    ensureSportSectionRegistered({
        sport: 'Tập gym',
        icon: 'fa-dumbbell',
        items: [
            { id: 'gym-shoes', label: 'Giày tập gym', panels: ['sports'], keywords: ['giay'] },
            { id: 'gym-apparel', label: 'Áo tập gym', panels: ['sports', 'apparel'], keywords: ['ao ', 'shirt', 'tee', 'tank'] },
            { id: 'gym-bottoms', label: 'Quần tập gym', panels: ['sports', 'apparel'], keywords: ['tights', 'short', 'shorts', 'quan '] },
            { id: 'gym-bags', label: 'Balo / túi tập', panels: ['accessories'], keywords: ['bag', 'duffel', 'backpack', 'balo', 'tui'] }
        ]
    });

    function getCanonicalSportFromSku(sku, fallback = '') {
        const sportMap = {
            FB: 'Bóng đá',
            VB: 'Bóng chuyền',
            BB: 'Bóng rổ',
            TT: 'Bóng bàn',
            BM: 'Cầu lông',
            RUN: 'Chạy bộ',
            GYM: 'Tập gym'
        };

        return sportMap[getSkuPrefix(sku)] || sanitizeProductText(fallback) || 'Khác';
    }

    function getMenuItemIdsForProduct(product) {
        const skuPrefix = getSkuPrefix(product?.sku);
        const skuNumber = getSkuNumber(product?.sku);
        const itemIds = [];

        if (!skuPrefix || !Number.isFinite(skuNumber)) {
            return itemIds;
        }

        if (skuPrefix === 'FB') {
            pushItemId(itemIds, skuNumber === 16 || skuNumber === 27, 'football-ball');
            pushItemId(itemIds, skuNumber === 1 || isSkuBetween(skuNumber, 7, 15), 'football-shoes');
            pushItemId(itemIds, skuNumber === 3 || isSkuBetween(skuNumber, 17, 22) || isSkuBetween(skuNumber, 132, 135), 'football-apparel');
            pushItemId(itemIds, skuNumber === 26, 'football-gloves');
            pushItemId(itemIds, skuNumber === 25, 'football-shinguards');
            pushItemId(itemIds, skuNumber === 28 || skuNumber === 29, 'football-socks');
            pushItemId(itemIds, skuNumber === 30 || skuNumber === 31, 'football-towels');
            pushItemId(itemIds, skuNumber === 23 || skuNumber === 24, 'football-backpacks');
        }

        if (skuPrefix === 'VB') {
            pushItemId(itemIds, skuNumber === 1 || isSkuBetween(skuNumber, 2, 9) || skuNumber === 20 || skuNumber === 22, 'volleyball-ball');
            pushItemId(itemIds, isSkuBetween(skuNumber, 10, 14) || skuNumber === 21, 'volleyball-shoes');
            pushItemId(itemIds, skuNumber === 17 || skuNumber === 18 || isSkuBetween(skuNumber, 129, 130), 'volleyball-apparel');
            pushItemId(itemIds, skuNumber === 15 || skuNumber === 16 || skuNumber === 19, 'volleyball-kneepads');
            pushItemId(itemIds, skuNumber === 23 || skuNumber === 24, 'volleyball-socks');
            pushItemId(itemIds, skuNumber === 25 || skuNumber === 26, 'volleyball-towels');
            pushItemId(itemIds, skuNumber === 27 || skuNumber === 28, 'volleyball-backpacks');
        }

        if (skuPrefix === 'BB') {
            pushItemId(itemIds, skuNumber === 2 || isSkuBetween(skuNumber, 3, 8) || skuNumber === 15 || skuNumber === 16 || skuNumber === 18 || skuNumber === 23, 'basketball-ball');
            pushItemId(itemIds, isSkuBetween(skuNumber, 9, 14), 'basketball-shoes');
            pushItemId(itemIds, skuNumber === 21 || isSkuBetween(skuNumber, 126, 127), 'basketball-apparel');
            pushItemId(itemIds, skuNumber === 20, 'basketball-socks');
            pushItemId(itemIds, skuNumber === 19, 'basketball-arm-sleeves');
            pushItemId(itemIds, skuNumber === 24 || skuNumber === 25, 'basketball-towels');
            pushItemId(itemIds, skuNumber === 22, 'basketball-backpacks');
            pushItemId(itemIds, skuNumber === 17, 'basketball-training-gear');
        }

        if (skuPrefix === 'TT') {
            pushItemId(itemIds, skuNumber === 1 || isSkuBetween(skuNumber, 7, 16) || skuNumber === 27 || isSkuBetween(skuNumber, 130, 131), 'tabletennis-racket');
            pushItemId(itemIds, isSkuBetween(skuNumber, 17, 21), 'tabletennis-rubber');
            pushItemId(itemIds, isSkuBetween(skuNumber, 22, 24), 'tabletennis-ball');
            pushItemId(itemIds, skuNumber === 25 || skuNumber === 26, 'tabletennis-accessories');
            pushItemId(itemIds, skuNumber === 28 || skuNumber === 29, 'tabletennis-apparel');
        }

        if (skuPrefix === 'BM') {
            pushItemId(itemIds, isSkuBetween(skuNumber, 1, 9) || skuNumber === 22 || isSkuBetween(skuNumber, 128, 129), 'badminton-racket');
            pushItemId(itemIds, isSkuBetween(skuNumber, 10, 13), 'badminton-shuttlecock');
            pushItemId(itemIds, isSkuBetween(skuNumber, 14, 17), 'badminton-shoes');
            pushItemId(itemIds, skuNumber === 18 || skuNumber === 19 || skuNumber === 21, 'badminton-strings');
            pushItemId(itemIds, skuNumber === 20, 'badminton-accessories');
            pushItemId(itemIds, skuNumber === 23 || skuNumber === 24, 'badminton-apparel');
        }

        if (skuPrefix === 'RUN') {
            pushItemId(itemIds, isSkuBetween(skuNumber, 1, 4), 'running-shoes');
            pushItemId(itemIds, skuNumber === 5, 'running-apparel');
            pushItemId(itemIds, skuNumber === 6, 'running-bottoms');
            pushItemId(itemIds, skuNumber === 7, 'running-accessories');
        }

        if (skuPrefix === 'GYM') {
            pushItemId(itemIds, skuNumber === 1 || skuNumber === 2, 'gym-shoes');
            pushItemId(itemIds, skuNumber === 3, 'gym-apparel');
            pushItemId(itemIds, skuNumber === 4, 'gym-bottoms');
            pushItemId(itemIds, skuNumber === 5 || skuNumber === 6, 'gym-bags');
        }

        return itemIds;
    }

    async function loadProducts() {
        productContainer.innerHTML = '<p class="loading-text">Đang tải sản phẩm...</p>';

        try {
            const products = await apiRequest('/products', { auth: false });
            allProducts = mergeWithExtendedSportProducts(products).map(enrichProduct);
            invalidateRecommendationCache();
            if (currentView === 'product-detail' && currentDetailProductId) {
                renderProductDetailView();
                syncMainView();
            } else {
                renderCatalog();
            }
            renderAdminProductList();
            if (isManagerWorkspaceUser()) {
                await renderUserList();
            } else if (userListBody) {
                userListBody.innerHTML = '';
            }
            renderInternalWorkspace();
            syncSupportChatVisibility();
        } catch (error) {
            allProducts = getExtendedSportProductsSeed().map(enrichProduct);
            invalidateRecommendationCache();
            renderCatalog();
            renderAdminProductList();
            renderInternalWorkspace();
            syncSupportChatVisibility();
        }
    }

    function getBestSellerRows() {
        const productMap = new Map();

        getOrdersInStatsRange()
            .filter(isRevenueOrder)
            .forEach(order => {
                const orderItems = Array.isArray(order.items) ? order.items : [];
                const grossSubtotal = orderItems.reduce((sum, item) => {
                    const itemGross = Number(item.subtotal || (Number(item.unitPrice || 0) * Number(item.quantity || 0)) || 0);
                    return sum + itemGross;
                }, 0);
                const netOrderRevenue = Number(order.total || grossSubtotal || 0);

                orderItems.forEach(item => {
                    const key = item.sku || item.productId || item.name;
                    if (!productMap.has(key)) {
                        productMap.set(key, {
                            key,
                            name: item.name || 'Sản phẩm',
                            sku: item.sku || '',
                            quantity: 0,
                            revenue: 0
                        });
                    }

                    const current = productMap.get(key);
                    const itemQuantity = Number(item.quantity || 0);
                    const itemGross = Number(item.subtotal || (Number(item.unitPrice || 0) * itemQuantity) || 0);
                    const allocatedRevenue = grossSubtotal > 0
                        ? (netOrderRevenue * itemGross) / grossSubtotal
                        : 0;

                    current.quantity += itemQuantity;
                    current.revenue += allocatedRevenue;
                });
            });

        return Array.from(productMap.values()).sort((left, right) => {
            if (right.quantity !== left.quantity) {
                return right.quantity - left.quantity;
            }
            return right.revenue - left.revenue;
        });
    }

    function syncCommerceAccessUI(scope = null) {
        const workspaceUser = canAccessWorkspace();

        cartLink?.classList.toggle('hidden', workspaceUser);
        wishlistLink?.classList.toggle('hidden', workspaceUser);

        const roots = scope
            ? [scope]
            : (currentView === 'home' ? [homeSaleShowcase, personalizedHomeView] : [document]);
        roots.filter(Boolean).forEach(root => {
            root.querySelectorAll('.wishlist-toggle-btn, .add-to-cart-btn, [data-wishlist-move]').forEach(button => {
                button.classList.toggle('hidden', workspaceUser);
                if ('disabled' in button) {
                    if (workspaceUser) {
                        button.setAttribute('disabled', 'disabled');
                    } else if (!button.classList.contains('disabled')) {
                        button.removeAttribute('disabled');
                    }
                }
            });
        });

        [productDetailWishlistBtn, productDetailAddCartBtn, productDetailBuyNowBtn].forEach(button => {
            if (!button) {
                return;
            }

            button.classList.toggle('hidden', workspaceUser);
            if ('disabled' in button) {
                if (workspaceUser) {
                    button.setAttribute('disabled', 'disabled');
                } else if (!button.classList.contains('disabled')) {
                    button.removeAttribute('disabled');
                }
            }
        });

        if (workspaceUser && ['cart', 'wishlist', 'checkout'].includes(currentView)) {
            currentView = 'home';
            syncMainView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function updateAuthUI() {
        const authenticated = Boolean(currentUser);
        const customerFeaturesVisible = authenticated && !canAccessWorkspace();
        const workspaceLink = adminLink?.querySelector('a');
        const workspaceUser = authenticated && canAccessWorkspace();

        addressBookLinkWrap.classList.toggle('hidden', !customerFeaturesVisible);
        ordersLinkWrap.classList.toggle('hidden', !customerFeaturesVisible);

        if (!authenticated) {
            adminPanel.classList.add('hidden');
            adminLink.classList.add('hidden');
            userDropdown.classList.add('hidden');
            dropName.textContent = 'Khách';
            dropRole.textContent = 'Vai trò';
            updateCartCount();
            updateWishlistCount();
            syncCommerceAccessUI();
            syncSupportChatVisibility();
            return;
        }

        dropName.textContent = getUserDisplayName(currentUser);
        dropRole.textContent = getWorkspaceRoleLabel(currentUser);

        if (workspaceUser) {
            adminLink.classList.remove('hidden');
            if (workspaceLink) {
                workspaceLink.innerHTML = `<i class="fa-solid fa-gauge"></i> ${isManagerWorkspaceUser() ? 'Trang quản lí' : 'Trang nhân viên'}`;
            }
        } else {
            adminLink.classList.add('hidden');
        }

        syncWorkspaceTabs();
        updateCartCount();
        updateWishlistCount();
        adminPanel.classList.toggle('hidden', currentView !== 'workspace' || !workspaceUser);
        syncCommerceAccessUI();
        syncSupportChatVisibility();
        if (currentView === 'promo-hunt') {
            renderPromoHuntView();
            void syncPromoHuntCampaignsFromApi({ render: true });
            syncNavState();
        }
        repairRenderedContent();
    }

    function getCurrentSampleOrderResetVersion() {
        return '2026-04-23-sample-orders-v2';
    }

    function getSampleWorkspaceOrdersSeed() {
        return [
            {
                id: 'sample-order-001',
                code: 'DH-20260423-1001',
                createdAt: '2026-04-22T09:15:00.000Z',
                status: '\u0110\u00e3 giao',
                paymentStatus: PAYMENT_STATUS_PAID,
                paidAt: '2026-04-22T09:17:00.000Z',
                paymentConfirmedBy: 'nhanvien01',
                supportRequest: '',
                supportStatus: '',
                supportNote: '',
                totalItems: 2,
                subtotal: 3160000,
                shipping: 0,
                discount: 0,
                total: 3160000,
                voucherCode: '',
                voucherLabel: '',
                address: {
                    id: 'seed-address-001',
                    recipient: 'Nguy\u1ec5n V\u0103n A',
                    phone: '0901234567',
                    line: '123 L\u00ea L\u1ee3i',
                    ward: 'Ph\u01b0\u1eddng H\u1ea3i Ch\u00e2u',
                    wardCode: '',
                    district: 'Kh\u00f4ng \u00e1p d\u1ee5ng (m\u00f4 h\u00ecnh 2 c\u1ea5p)',
                    city: '\u0110\u00e0 N\u1eb5ng',
                    provinceCode: '',
                    note: '',
                    isDefault: true
                },
                customer: {
                    id: 'user-customer-001',
                    name: 'Nguy\u1ec5n V\u0103n A',
                    username: 'khachhang01',
                    email: 'nguyenvana@email.com',
                    phone: '0901234567'
                },
                accountKey: 'user-customer-001',
                items: [
                    {
                        productId: 'product-010',
                        sku: 'FB-010',
                        name: 'Gi\u00e0y b\u00f3ng \u0111\u00e1 adidas Predator League Turf',
                        image: '',
                        size: '42',
                        quantity: 1,
                        unitPrice: 1980000,
                        subtotal: 1980000
                    },
                    {
                        productId: 'product-109',
                        sku: 'VB-022',
                        name: 'Mikasa V390W',
                        image: '',
                        size: 'S\u1ed1 5',
                        quantity: 1,
                        unitPrice: 1180000,
                        subtotal: 1180000
                    }
                ]
            },
            {
                id: 'sample-order-002',
                code: 'DH-20260423-1002',
                createdAt: '2026-04-22T14:30:00.000Z',
                status: '\u0110\u00e3 x\u00e1c nh\u1eadn',
                paymentStatus: PAYMENT_STATUS_PENDING_COD,
                paidAt: '',
                paymentConfirmedBy: '',
                supportRequest: '',
                supportStatus: '',
                supportNote: '',
                totalItems: 3,
                subtotal: 5390000,
                shipping: 0,
                discount: 0,
                total: 5390000,
                voucherCode: '',
                voucherLabel: '',
                address: {
                    id: 'seed-address-002',
                    recipient: 'Tr\u1ea7n Th\u1ecb B',
                    phone: '0987654321',
                    line: '456 Nguy\u1ec5n V\u0103n Linh',
                    ward: 'Ph\u01b0\u1eddng Thanh Kh\u00ea',
                    wardCode: '',
                    district: 'Kh\u00f4ng \u00e1p d\u1ee5ng (m\u00f4 h\u00ecnh 2 c\u1ea5p)',
                    city: '\u0110\u00e0 N\u1eb5ng',
                    provinceCode: '',
                    note: '',
                    isDefault: true
                },
                customer: {
                    id: 'user-customer-002',
                    name: 'Tr\u1ea7n Th\u1ecb B',
                    username: 'khachhang02',
                    email: 'tranthib@email.com',
                    phone: '0987654321'
                },
                accountKey: 'user-customer-002',
                items: [
                    {
                        productId: 'product-140',
                        sku: 'RUN-001',
                        name: 'Nike Pegasus 41',
                        image: '',
                        size: '42',
                        quantity: 1,
                        unitPrice: 3490000,
                        subtotal: 3490000
                    },
                    {
                        productId: 'product-149',
                        sku: 'GYM-003',
                        name: 'Nike Dri-FIT Primary Men\'s Training T-Shirt',
                        image: '',
                        size: 'L',
                        quantity: 2,
                        unitPrice: 950000,
                        subtotal: 1900000
                    }
                ]
            },
            {
                id: 'sample-order-003',
                code: 'DH-20260423-1003',
                createdAt: '2026-04-23T08:00:00.000Z',
                status: '\u0110\u00e3 h\u1ee7y',
                paymentStatus: PAYMENT_STATUS_CANCELLED,
                paidAt: '',
                paymentConfirmedBy: '',
                supportRequest: '',
                supportStatus: '',
                supportNote: '',
                totalItems: 1,
                subtotal: 2050000,
                shipping: 0,
                discount: 0,
                total: 2050000,
                voucherCode: '',
                voucherLabel: '',
                address: {
                    id: 'seed-address-001',
                    recipient: 'Nguy\u1ec5n V\u0103n A',
                    phone: '0901234567',
                    line: '123 L\u00ea L\u1ee3i',
                    ward: 'Ph\u01b0\u1eddng H\u1ea3i Ch\u00e2u',
                    wardCode: '',
                    district: 'Kh\u00f4ng \u00e1p d\u1ee5ng (m\u00f4 h\u00ecnh 2 c\u1ea5p)',
                    city: '\u0110\u00e0 N\u1eb5ng',
                    provinceCode: '',
                    note: '',
                    isDefault: true
                },
                customer: {
                    id: 'user-customer-001',
                    name: 'Nguy\u1ec5n V\u0103n A',
                    username: 'khachhang01',
                    email: 'nguyenvana@email.com',
                    phone: '0901234567'
                },
                accountKey: 'user-customer-001',
                items: [
                    {
                        productId: 'product-111',
                        sku: 'BM-022',
                        name: 'Yonex Astrox 77 Play',
                        image: '',
                        size: '4U-G5',
                        quantity: 1,
                        unitPrice: 2050000,
                        subtotal: 2050000
                    }
                ]
            }
        ].map(order => normalizeWorkspaceOrder(order));
    }

    function applySampleOrderDataReset() {
        const scopedPrefix = `${ORDER_HISTORY_KEY}_`;
        const removableKeys = [];

        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key) {
                continue;
            }

            if (key === getWorkspaceOrdersStorageKey() || key.startsWith(scopedPrefix)) {
                removableKeys.push(key);
            }
        }

        removableKeys.forEach(key => localStorage.removeItem(key));

        const sampleOrders = getSampleWorkspaceOrdersSeed();
        saveWorkspaceOrders(sampleOrders);

        const groupedOrders = new Map();
        sampleOrders.forEach(order => {
            const accountKey = String(order.accountKey || '').trim();
            if (!accountKey) {
                return;
            }

            if (!groupedOrders.has(accountKey)) {
                groupedOrders.set(accountKey, []);
            }

            groupedOrders.get(accountKey).push(order);
        });

        groupedOrders.forEach((orders, accountKey) => {
            localStorage.setItem(`${ORDER_HISTORY_KEY}_${accountKey}`, JSON.stringify(orders));
        });

        localStorage.setItem(getOrderSeedVersionKey(), getCurrentSampleOrderResetVersion());
    }

    function ensureSampleOrderDataVersion() {
        const currentVersion = String(localStorage.getItem(getOrderSeedVersionKey()) || '').trim();
        if (currentVersion === getCurrentSampleOrderResetVersion()) {
            return;
        }

        applySampleOrderDataReset();
    }

    ensureSampleOrderDataVersion();
    initializeWorkspaceInteractions();
    window.addEventListener('beforeunload', () => {
        flushTrackedPageStay(true);
    });
    syncSupportChatVisibility();

    function repairRenderedContent(root = null) {
        const target = root || document.getElementById('main-content') || document.body;
        repairTextNodes(target);
        if (!root && target !== document.body) {
            if (bodyRepairTimer) {
                window.clearTimeout(bodyRepairTimer);
            }
            bodyRepairTimer = window.setTimeout(() => {
                repairTextNodes(document.body);
                bodyRepairTimer = null;
            }, 450);
        }
        syncCommerceAccessUI(root ? target : null);
    }
});
