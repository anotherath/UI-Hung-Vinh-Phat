export interface Product {
  id: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  brand: string;
  price: string;
  unit: string;
  image: string;
  description: string;
  specs: { [key: string]: string };
  features: string[];
  isExclusive?: boolean;
  isHot?: boolean;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  detailedDesc: string;
  image: string;
  brands: string[];
  productCount: number;
  applications: string[];
  standards: string[];
  faqs: CategoryFaq[];
}

export interface Brand {
  slug: string;
  name: string;
  logoText: string;
  tagline: string;
  image?: string;
  isStrategicPartner?: boolean;
  description: string;
}

export const COMPANY_INFO = {
  name: "CÔNG TY SẢN XUẤT THƯƠNG MẠI VÀ DỊCH VỤ HƯNG VINH PHÁT",
  shortName: "HƯNG VINH PHÁT",
  slogan: "Đồng hành cùng công trình, kiến tạo giá trị bền vững.",
  subSlogan: "Uy tín trong từng sản phẩm — Trách nhiệm trong từng công trình",
  mst: "1001071679",
  foundedDate: "10/09/2015",
  yearsExperience: "10+",
  address: "Thôn Đồng Lạc – Xã Hưng Hà – Tỉnh Hưng Yên",
  phones: ["0889.39.2000", "0914.214.668"],
  phoneRaw: ["0889392000", "0914214668"],
  zaloUrl: "https://zalo.me/0889392000",
  email: "contact@hungvinhphat.vn",
  website: "www.hungvinhphat.vn",
  partner: {
    name: "TẬP ĐOÀN HOA SEN (HOA SEN HOME)",
    role: "Nhà phân phối độc quyền hệ thống Hoa Sen Home",
    desc: "Đối tác chiến lược hàng đầu cung cấp nguồn hàng chính hãng, đồng bộ và uy tín nhất."
  }
};

export const CORE_VALUES = [
  {
    title: "Chất Lượng Hàng Đầu",
    desc: "Cam kết 100% sản phẩm có nguồn gốc xuất xứ rõ ràng, đầy đủ chứng chỉ CO/CQ và tiêu chuẩn kỹ thuật."
  },
  {
    title: "Đồng Hành Bền Vững",
    desc: "Tư vấn tận tâm, hỗ trợ giải pháp vật liệu tối ưu chi phí cho chủ đầu tư và nhà thầu."
  },
  {
    title: "Giao Hàng Linh Hoạt",
    desc: "Hệ thống kho bãi rộng lớn, đáp ứng tiến độ vận chuyển nhanh chóng cho mọi công trình."
  },
  {
    title: "Đối Tác Chiến Lược Hoa Sen",
    desc: "Nhà phân phối chính thức hệ thống Hoa Sen Home với mức giá và chính sách ưu đãi tốt nhất."
  }
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "sat-thep",
    name: "Sắt & Thép Xây Dựng",
    eyebrow: "VẬT LIỆU KẾT CẤU CHỊU LỰC",
    headline: "Sắt Công Trình & Thép Xây Dựng Chất Lượng Cao",
    description: "Sắt công trình, thép cuộn, thép cây xây dựng chịu lực móng & dầm công trình.",
    detailedDesc: "Hưng Vinh Phát chuyên cung cấp trọn gói sắt công trình, thép thanh vằn CB300/CB400, thép cuộn, thép hộp Hòa Phát, Việt Đức, VAS chính hãng đạt tiêu chuẩn TCVN, JIS, ASTM khắt khe nhất.",
    image: "/images/steel_construction.jpg",
    brands: ["Hòa Phát", "Việt Đức", "VAS"],
    productCount: 124,
    applications: [
      "Thi công dầm, cột, móng nhà dân dụng & biệt thự",
      "Khung kết cấu chịu lực nhà xưởng công nghiệp",
      "Gia công cọc bê tông cốt thép & hạ tầng giao thông"
    ],
    standards: ["TCVN 1651-2:2018", "JIS G3112 (Nhật Bản)", "ASTM A615/A615M (Mỹ)", "Chứng chỉ CO/CQ nhà máy"],
    faqs: [
      {
        question: "Làm thế nào để phân biệt thép Hòa Phát CB300 và CB400?",
        answer: "Thép thanh vằn CB400 có dập nổi ký hiệu mác thép CB4 và logo Hòa Phát trên thân cây thép. Mác CB400 có giới hạn chảy tối thiểu 400 N/mm2, chuyên dùng cho các công trình cao tầng đòi hỏi sức chịu tải lớn hơn."
      },
      {
        question: "Hưng Vinh Phát có hỗ trợ vận chuyển thép đến tận chân công trình không?",
        answer: "Có. Chúng tôi sở hữu đội xe cẩu và xe tải chuyên dụng, giao thép tận chân công trình tại Hưng Yên, Hà Nội và các tỉnh lân cận theo đúng tiến độ đổ bê tông."
      },
      {
        question: "Giá thép xây dựng tính theo kg hay theo cây?",
        answer: "Bảng giá thép được quy đổi chính xác theo kg dựa trên trọng lượng barem chuẩn của nhà máy, hoặc báo giá trực tiếp theo cây / cuộn tùy theo nhu cầu đặt hàng."
      }
    ]
  },
  {
    slug: "ton-nhom",
    name: "Tôn & Nhôm Công Trình",
    eyebrow: "GIẢI PHÁP MÁI & CỬA ĐỊNH HÌNH",
    headline: "Tôn Lợp Mái Hoa Sen & Nhôm Định Hình Trường Thành",
    description: "Tôn lợp mái cao cấp, tôn lạnh, tôn màu và nhôm định hình chất lượng cao.",
    detailedDesc: "Phân phối độc quyền tôn mạ nhôm kẽm phủ màu Hoa Sen Gold chống tản nhiệt bảo hành 20 năm, tôn Olympic, Vitec và thanh nhôm định hình Trường Thành phục vụ thi công cửa và mặt dựng công trình.",
    image: "/images/roofing_aluminum.jpg",
    brands: ["Hoa Sen", "Olympic", "Vitec", "Trường Thành"],
    productCount: 98,
    applications: [
      "Mái lợp chống nóng nhà ở, nhà xưởng & kho bãi",
      "Thi công vách ngăn tôn xốp cách nhiệt kho lạnh",
      "Khung cửa sổ, cửa đi & mặt dựng nhôm kính cao cấp"
    ],
    standards: ["Tiêu chuẩn mạ AZ100 / AZ150", "Bảo hành 20 năm Hoa Sen Gold", "TCVN 7470:2005", "Độ dầy nhôm 1.4 - 2.0mm"],
    faqs: [
      {
        question: "Tôn Hoa Sen Gold khác gì so với tôn lạnh thông thường?",
        answer: "Tôn Hoa Sen Gold sử dụng lớp mạ hợp kim nhôm kẽm AZ100/AZ150 kết hợp hệ sơn phủ cao cấp kháng tia UV, chống bám bẩn và có chính sách bảo hành chống thủng lủng lên đến 20 năm."
      },
      {
        question: "Nhôm Trường Thành do Hưng Vinh Phát phân phối có mấy loại hệ cửa?",
        answer: "Chúng tôi cung cấp đầy đủ nhôm hệ 55, hệ 93 trượt lùa, nhôm mặt dựng hệ 65 và hệ vách ngăn sơn tĩnh điện ánh kim chất lượng cao."
      },
      {
        question: "Có nhận cắt tôn theo chiều dài thực tế công trình không?",
        answer: "Có. Chúng tôi hỗ trợ cán sóng và cắt tôn theo kích thước chiều dài mái thực tế của công trình để giảm thiểu tiêu hao."
      }
    ]
  },
  {
    slug: "gach-men",
    name: "Gạch Men Ốp Lát",
    eyebrow: "HOÀN THIỆN BỀ MẶT SANG TRỌNG",
    headline: "Gạch Men Ốp Lát Porcelain & Cẩm Thạch Cao Cấp",
    description: "Gạch men lát nền, gạch ốp tường cẩm thạch, gạch trang trí vân đá cao cấp.",
    detailedDesc: "Bộ sưu tập gạch Porcelain bóng kính Nano Lustra nhập khẩu Ấn Độ, gạch Lustile nội địa do Hoa Sen phân phối và gạch Viglacera với đa dạng kích thước 60x60, 80x80, 60x120cm cho lát nền và vách sang trọng.",
    image: "/images/ceramic_tiles.jpg",
    brands: ["Lustra", "Lustile", "Viglacera"],
    productCount: 215,
    applications: [
      "Lát nền phòng khách, sảnh biệt thự & căn hộ cao cấp",
      "Ốp tường nhà tắm, phòng bếp & vách trang trí 3D",
      "Lát sân vườn, hành lang & khu vực chịu mật độ đi lại cao"
    ],
    standards: ["Xương gạch Porcelain độ hút nước < 0.5%", "Công nghệ phủ men Nano kháng khuẩn", "Mài cạnh mạ cạnh chuẩn xơ"],
    faqs: [
      {
        question: "Gạch Porcelain Lustra Ấn Độ có bị ố vàng hay trầy xước không?",
        answer: "Gạch Lustra Ấn Độ sử dụng xương gạch Porcelain Granite độ nén cao với lớp phủ men bóng kính Nano siêu cứng chống xước ma sát và kháng ố bẩn tuyệt đối."
      },
      {
        question: "Cách tính số lượng gạch 80x80cm cần mua cho diện tích 100m2?",
        answer: "Mỗi viên gạch 80x80cm có diện tích 0.64m2. Với 100m2 sàn, bạn cần khoảng 157 viên (tương đương 39-40 hộp gạch), cộng thêm 5% hao hụt khi cắt góc."
      },
      {
        question: "Lustile có những dòng gạch kích thước nào?",
        answer: "Lustile cung cấp đa dạng gạch 30x60cm ốp tường, 60x60cm, 80x80cm lát nền và 60x120cm khổ lớn cho sảnh lớn."
      }
    ]
  },
  {
    slug: "thiet-bi-ve-sinh",
    name: "Thiết Bị Vệ Sinh",
    eyebrow: "THIẾT BỊ PHÒNG TẮM HIỆN ĐẠI",
    headline: "Thiết Bị Vệ Sinh & Phòng Tắm Cao Cấp Tuslo, INAX",
    description: "Bồn cầu cao cấp, lavabo, sen vòi, phụ kiện phòng tắm hiện đại, tinh tế.",
    detailedDesc: "Giải pháp thiết bị vệ sinh đồng bộ với bồn cầu 1 khối men sứ AquaCeramic chống bám bẩn, xả xoáy Tornado, sen tắm nhiệt độ Tuslo (độc quyền Hoa Sen Home), INAX, Viglacera và Vinahasa.",
    image: "/images/sanitary_ware.jpg",
    brands: ["Tuslo", "Viglacera", "Inax", "Vinahasa"],
    productCount: 160,
    applications: [
      "Lắp đặt phòng tắm gia đình, nhà phố & biệt thự",
      "Thiết bị vệ sinh chung cư, khách sạn & resort",
      "Công trình công cộng, văn phòng & nhà xưởng"
    ],
    standards: ["Men sứ AquaCeramic nung 1280°C", "Hệ thống xả xoáy Tornado 4.8L/3.0L", "Thân sen vòi đồng mạ Chrome 5 lớp"],
    faqs: [
      {
        question: "Bồn cầu Tuslo do Hoa Sen phân phối được bảo hành bao lâu?",
        answer: "Phần sứ bồn cầu Tuslo được bảo hành 10 năm về men sứ không rạn nứt ố vàng, bộ xả phụ kiện bảo hành 3 năm đổi mới."
      },
      {
        question: "Tâm xả chuẩn của bồn cầu một khối là bao nhiêu mm?",
        answer: "Tâm xả tiêu chuẩn từ tường ra tâm ống thải là 300mm (±10mm), phù hợp với đại đa số thiết kế nhà vệ sinh tại Việt Nam."
      },
      {
        question: "Sen tắm cây Tuslo có sử dụng được cho nguồn nước nóng lạnh không?",
        answer: "Có. Tất cả sen cây Tuslo đều chế tạo từ chất liệu đồng mạ Chrome cao cấp tích hợp chia nước nóng lạnh và bát sen tăng áp massage."
      }
    ]
  },
  {
    slug: "gach-ngoi",
    name: "Gạch Ngói Lợp Mái",
    eyebrow: "GIẢI PHÁP MÁI BIỆT THỰ & NHÀ Ở",
    headline: "Gạch Ngói Tráng Men Lustime & Viglacera",
    description: "Ngói lợp mái nhà dân dụng, ngói biệt thự ceramic & tráng men bền màu.",
    detailedDesc: "Dòng ngói sóng và ngói phẳng tráng men gốm Lustime độc quyền phân phối bởi Hoa Sen Home, giảm 20% tải trọng mái, chống rêu mốc và bền màu vĩnh cửu theo thời gian.",
    image: "/images/roof_tiles.jpg",
    brands: ["Lustime", "Viglacera"],
    productCount: 75,
    applications: [
      "Mái biệt thự tân cổ điển, nhà mái Thái & mái Nhật",
      "Lợp mái nhà phố, nhà vườn & khu nghỉ dưỡng",
      "Trang trí mái cổng & mái hiên công trình"
    ],
    standards: ["Công nghệ tráng men gốm nung cao nhiệt", "Trọng lượng siêu nhẹ ~3.5kg/viên", "Kháng rêu mốc 100%"],
    faqs: [
      {
        question: "Ngói tráng men Lustime có ưu điểm gì so với ngói xi măng màu?",
        answer: "Ngói tráng men Lustime làm từ xương gốm nung cao nhiệt phủ men màu nên bền màu vĩnh cửu, không bong tróc sơn, chống thấm tuyệt đối và nhẹ hơn ngói xi măng khoảng 20%."
      },
      {
        question: "Một m2 mái cần bao nhiêu viên ngói Lustime?",
        answer: "Quy cách lợp chuẩn của ngói Lustime là 10 viên/m2, giúp tiết kiệm mè sắt và thời gian thi công."
      },
      {
        question: "Có phụ kiện ngói úp nóc, ngói rìa đồng bộ không?",
        answer: "Có. Chúng tôi cung cấp trọn bộ ngói lợp, ngói úp nóc, ngói rìa, ngói cuối mái cùng tông màu."
      }
    ]
  },
  {
    slug: "nhua-op",
    name: "Nhựa Ốp Trang Trí",
    eyebrow: "TRANG TRÍ NỘI NGOẠI THẤT",
    headline: "Nhựa Ốp Tường Lam Sóng & Phào Chỉ Ngân Hoa",
    description: "Nhựa ốp tường lam sóng, nhựa giả gỗ trang trí nội ngoại thất và cải tạo nhà.",
    detailedDesc: "Cung cấp tấm nhựa ốp tường Nano giả gỗ 4 sóng, phào chỉ trang trí kháng nước 100%, chống mối mọt thương hiệu Ngân Hoa, Nam Dương, Việt Xô chuyên dùng làm vách TV và cải tạo không gian.",
    image: "/images/plastic_panel.jpg",
    brands: ["Ngân Hoa", "Nam Dương", "Việt Xô"],
    productCount: 88,
    applications: [
      "Ốp vách TV, vách đầu giường phòng ngủ sang trọng",
      "Cải tạo tường ẩm mốc, bong tróc nhà cũ",
      "Trang trí trần nhà, cột & điểm nhấn cửa hàng"
    ],
    standards: ["Nhựa PVC nguyên sinh an toàn sức khỏe", "Phủ film Nano vân gỗ dính chặt", "Chống nước & mối mọt 100%"],
    faqs: [
      {
        question: "Tấm nhựa lam sóng Ngân Hoa có chịu được nước không?",
        answer: "Tấm nhựa PVC nguyên sinh chống nước tuyệt đối 100%, không lo mối mọt hay mục nát ngay cả ở khu vực tường ẩm ướt."
      },
      {
        question: "Thi công tấm nhựa ốp tường có phải chát lại tường cũ ẩm mốc không?",
        answer: "Không cần chát lại. Chỉ cần đi khung xương thạch cao/sắt hộp hoặc dán trực tiếp bằng keo chuyên dụng và con ke inox là hoàn thiện sạch đẹp."
      },
      {
        question: "Tuổi thọ của nhựa ốp tường Nano là bao lâu?",
        answer: "Trong điều kiện nội thất, tấm nhựa ốp tường chất lượng cao có độ bền trên 20 năm mà không bị cong vênh."
      }
    ]
  },
  {
    slug: "go",
    name: "Gỗ Tự Nhiên & Công Nghiệp",
    eyebrow: "VẬT LIỆU NỘI THẤT CAO CẤP",
    headline: "Gỗ Tự Nhiên Nhập Khẩu & Gỗ Công Nghiệp Gia Công",
    description: "Gỗ tự nhiên nhập khẩu và gỗ công nghiệp gia công nội thất, hoàn thiện công trình.",
    detailedDesc: "Cung cấp gỗ sồi trắng (White Oak FAS) Bắc Mỹ nhập khẩu đã qua xử lý sấy tiêu chuẩn KD độ ẩm 8-12% và các chủng loại gỗ công nghiệp phục vụ thi công nội thất và gia công theo quy cách.",
    image: "/images/wood_material.jpg",
    brands: ["Hưng Vinh Phát Wood", "Gỗ Nhập Khẩu"],
    productCount: 92,
    applications: [
      "Đóng tủ bếp, tủ áo, giường & bàn ghế nội thất",
      "Thi công cửa gỗ tự nhiên & khuôn cửa công trình",
      "Gia công gỗ xẻ theo quy cách bản vẽ kỹ thuật"
    ],
    standards: ["Tiêu chuẩn phân hạng FAS Bắc Mỹ", "Sấy lò KD độ ẩm 8-12%", "Xử lý chống mối mọt & nấm mốc"],
    faqs: [
      {
        question: "Gỗ sồi trắng Bắc Mỹ nhập khẩu tại Hưng Vinh Phát có ưu điểm gì?",
        answer: "Gỗ sồi trắng White Oak có tâm gỗ kháng sâu mối tự nhiên, vân gỗ dài sáng đẹp, được sấy lò KD tiêu chuẩn 8-12% chống co ngót nứt nẻ."
      },
      {
        question: "Công ty có bán lẻ gỗ xẻ theo thanh hay chỉ bán theo container/khối?",
        answer: "Chúng tôi bán theo m3, bán lẻ theo kiện hoặc xẻ quy cách theo nhu cầu cụ thể của từng xưởng sản xuất và nhà thầu."
      },
      {
        question: "Hưng Vinh Phát có sẵn các dòng gỗ công nghiệp MDF chống ẩm không?",
        answer: "Có. Chúng tôi phân phối đầy đủ ván MDF lõi xanh chống ẩm phủ Melamine, Veneer, Laminate đáp ứng yêu cầu nội thất hiện đại."
      }
    ]
  }
];

export const BRANDS: Brand[] = [
  {
    slug: "hoa-sen-home",
    name: "Hoa Sen Home",
    logoText: "HOA SEN HOME",
    tagline: "Đối tác chiến lược - Phân phối độc quyền",
    image: "/images/roofing_aluminum.jpg",
    isStrategicPartner: true,
    description: "Thương hiệu quốc gia dẫn đầu về tôn, thép ống, nhựa và vật liệu xây dựng hoàn thiện."
  },
  {
    slug: "hoa-phat",
    name: "Thép Hòa Phát",
    logoText: "HÒA PHÁT",
    tagline: "Hòa hợp cùng phát triển",
    image: "/images/steel_construction.jpg",
    description: "Tập đoàn sản xuất thép hàng đầu Việt Nam với chất lượng công trình đạt chuẩn quốc tế."
  },
  {
    slug: "viglacera",
    name: "Viglacera",
    logoText: "VIGLACERA",
    tagline: "Tiên phong công nghệ xanh",
    image: "/images/sanitary_ware.jpg",
    description: "Thương hiệu vật liệu xây dựng và thiết bị vệ sinh hàng đầu tại Việt Nam."
  },
  {
    slug: "inax",
    name: "Thiết bị vệ sinh INAX",
    logoText: "INAX",
    tagline: "Công nghệ Nhật Bản",
    image: "/images/sanitary_ware.jpg",
    description: "Thương hiệu thiết bị vệ sinh cao cấp phong cách Nhật Bản tinh tế."
  },
  {
    slug: "viet-duc",
    name: "Thép Việt Đức",
    logoText: "VIỆT ĐỨC",
    tagline: "Bền vững mọi công trình",
    image: "/images/steel_construction.jpg",
    description: "Thương hiệu thép xây dựng uy tín đáp ứng tiêu chuẩn khắt khe nhất."
  },
  {
    slug: "vas",
    name: "Thép VAS (Nghi Sơn)",
    logoText: "VAS",
    tagline: "Vững vàng tâm thép",
    image: "/images/steel_construction.jpg",
    description: "Tập đoàn thép VAS với công nghệ luyện kim chuẩn châu Âu."
  },
  {
    slug: "truong-thanh",
    name: "Nhôm Trường Thành",
    logoText: "TRƯỜNG THÀNH",
    tagline: "Phân phối độc quyền Hưng Vinh Phát",
    image: "/images/roofing_aluminum.jpg",
    isStrategicPartner: true,
    description: "Sản phẩm nhôm định hình chất lượng vượt trội, phân phối độc quyền bởi Hưng Vinh Phát."
  },
  {
    slug: "olympic",
    name: "Tôn Olympic",
    logoText: "OLYMPIC",
    tagline: "Độ bền vượt thời gian",
    image: "/images/roofing_aluminum.jpg",
    description: "Dòng tôn lợp mái cao cấp kháng thời tiết tối ưu."
  },
  {
    slug: "lustra",
    name: "Gạch Lustra India",
    logoText: "LUSTRA",
    tagline: "Gạch men cao cấp nhập khẩu Ấn Độ",
    image: "/images/ceramic_tiles.jpg",
    description: "Dòng gạch porcelain cẩm thạch nhập khẩu cao cấp trực tiếp từ Ấn Độ."
  },
  {
    slug: "lustile",
    name: "Gạch Lustile",
    logoText: "LUSTILE",
    tagline: "Hoa Sen phân phối độc quyền",
    image: "/images/ceramic_tiles.jpg",
    isStrategicPartner: true,
    description: "Dòng gạch ốp lát nội địa chất lượng cao thuộc hệ thống Hoa Sen."
  },
  {
    slug: "tuslo",
    name: "Thiết bị vệ sinh Tuslo",
    logoText: "TUSLO",
    tagline: "Hoa Sen phân phối độc quyền",
    image: "/images/sanitary_ware.jpg",
    isStrategicPartner: true,
    description: "Thiết bị phòng tắm cao cấp được Hoa Sen phân phối độc quyền."
  },
  {
    slug: "ngan-hoa",
    name: "Nhựa Ngân Hoa",
    logoText: "NGÂN HOA",
    tagline: "Giải pháp trang trí nội thất",
    image: "/images/plastic_panel.jpg",
    description: "Thương hiệu nhựa ốp tường và phào chỉ trang trí hàng đầu."
  }
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Thép Cây Xây Dựng Hòa Phát CB400-V D16 - D32",
    categorySlug: "sat-thep",
    categoryName: "Sắt & Thép Xây Dựng",
    brand: "Hòa Phát",
    price: "15.800",
    unit: "kg",
    image: "/images/steel_construction.jpg",
    description: "Thép thanh vằn Hòa Phát đạt chuẩn TCVN 1651-2:2018, khả năng chịu lực nén móng & dầm công trình tối ưu.",
    specs: {
      "Mác thép": "CB300-V / CB400-V / CB500-V",
      "Đường kính": "Ø10mm - Ø32mm",
      "Tiêu chuẩn": "TCVN 1651-2:2018 / JIS G3112",
      "Xuất xứ": "Chính hãng Hòa Phát"
    },
    features: ["Đạt chuẩn kết cấu chịu lực", "Không cong vênh rỉ sét", "Đầy đủ CO/CQ chứng nhận"],
    isHot: true
  },
  {
    id: "prod-2",
    name: "Tôn Lạnh Mạ Màu Hoa Sen Gold 0.45mm",
    categorySlug: "ton-nhom",
    categoryName: "Tôn & Nhôm Công Trình",
    brand: "Hoa Sen Home",
    price: "118.000",
    unit: "m",
    image: "/images/roofing_aluminum.jpg",
    description: "Tôn mạ nhôm kẽm phủ màu cao cấp chống nóng vượt trội, bảo hành độ bền màu lên tới 20 năm.",
    specs: {
      "Độ dày": "0.40mm - 0.50mm",
      "Khổ rộng": "1070mm / Khổ hiệu dụng 1000mm",
      "Lớp mạ": "AZ100 / AZ150",
      "Bảo hành": "20 năm chính hãng Hoa Sen"
    },
    features: ["Chống nhiệt tản nhiệt cực tốt", "Màu sơn chống phai màu", "Kháng ăn mòn muối biển"],
    isExclusive: true,
    isHot: true
  },
  {
    id: "prod-3",
    name: "Gạch Porcelain Lustra Marble Emerald 80x80cm",
    categorySlug: "gach-men",
    categoryName: "Gạch Men Ốp Lát",
    brand: "Lustra India",
    price: "385.000",
    unit: "m²",
    image: "/images/ceramic_tiles.jpg",
    description: "Gạch Porcelain bóng kính nhập khẩu trực tiếp Ấn Độ, vân đá cẩm thạch xanh ngọc sang trọng cho phòng khách & sảnh.",
    specs: {
      "Kích thước": "800 x 800 mm",
      "Chất liệu": "Porcelain Granite siêu cứng",
      "Bề mặt": "Bóng kính Nano chống bám bẩn",
      "Xuất xứ": "Nhập khẩu Ấn Độ"
    },
    features: ["Chống trầy xước ma sát cao", "Xương gạch mài cạnh siêu nét", "Độ hút nước < 0.5%"],
    isExclusive: true,
    isHot: true
  },
  {
    id: "prod-4",
    name: "Bồn Cầu Một Khối Tuslo Luxury TS-8800",
    categorySlug: "thiet-bi-ve-sinh",
    categoryName: "Thiết Bị Vệ Sinh",
    brand: "Tuslo",
    price: "2.650.000",
    unit: "bộ",
    image: "/images/sanitary_ware.jpg",
    description: "Bồn cầu liền khối Tuslo xả xoáy 360 độ xả sạch mịn, men sứ AquaCeramic kháng khuẩn, nắp êm cao cấp.",
    specs: {
      "Chất liệu": "Sứ cao cấp phủ men AquaCeramic",
      "Hệ thống xả": "Xả xoáy Tornado 4.8L / 3.0L",
      "Tâm xả": "300mm",
      "Phân phối": "Độc quyền Hoa Sen Home"
    },
    features: ["Men sứ chống bám bẩn 100 năm", "Xả cực êm không gây tiếng ồn", "Tiết kiệm nước thông minh"],
    isExclusive: true,
    isHot: true
  },
  {
    id: "prod-5",
    name: "Thanh Nhôm Định Hình Trường Thành Hệ 55 Gold",
    categorySlug: "ton-nhom",
    categoryName: "Tôn & Nhôm Công Trình",
    brand: "Trường Thành",
    price: "175.000",
    unit: "kg",
    image: "/images/roofing_aluminum.jpg",
    description: "Thanh profile nhôm cao cấp sơn tĩnh điện chống oxy hóa, sử dụng cho cửa đi, cửa sổ nhôm kính cao cấp.",
    specs: {
      "Độ dày nhôm": "1.4mm - 2.0mm",
      "Bề mặt": "Sơn tĩnh điện ánh kim / Anode",
      "Phân phối": "Độc quyền Hưng Vinh Phát"
    },
    features: ["Cách âm cách nhiệt tuyệt đối", "Độ bền kết cấu 30 năm", "Phân phối độc quyền Hưng Vinh Phát"],
    isExclusive: true
  },
  {
    id: "prod-6",
    name: "Gạch Ngói Tráng Men Lustime Classic Villa Red",
    categorySlug: "gach-ngoi",
    categoryName: "Gạch Ngói Lợp Mái",
    brand: "Lustime",
    price: "19.500",
    unit: "viên",
    image: "/images/roof_tiles.jpg",
    description: "Ngói sóng tráng men gốm cao cấp siêu nhẹ, chống rêu mốc, độ bền màu vĩnh cửu theo thời gian.",
    specs: {
      "Kích thước": "305 x 400 mm",
      "Trọng lượng": "3.5 kg/viên",
      "Số lượng lợp": "10 viên/m2",
      "Đặc tính": "Tráng men gốm chịu nhiệt"
    },
    features: ["Không xói mòn rêu mốc", "Giảm tải trọng mái 20%", "Độ bền màu vĩnh cửu"],
    isExclusive: true
  },
  {
    id: "prod-7",
    name: "Tấm Nhựa Ốp Tường Lam Sóng Ngân Hoa Deluxe Wood",
    categorySlug: "nhua-op",
    categoryName: "Nhựa Ốp Trang Trí",
    brand: "Ngân Hoa",
    price: "135.000",
    unit: "thanh",
    image: "/images/plastic_panel.jpg",
    description: "Nhựa ốp tường Nano giả gỗ 4 sóng cao cấp chống ẩm mốc, mối mọt, chuyên dùng trang trí vách TV và phòng khách.",
    specs: {
      "Kích thước": "195mm x 2900mm x 15mm",
      "Chất liệu": "Nhựa PVC nguyên sinh + Bột đá",
      "Bề mặt": "Phủ film Nano vân gỗ Walnut"
    },
    features: ["Chống nước 100%", "Chống mối mọt ẩm mốc", "Thi công lắp đặt cực nhanh"],
    isHot: true
  },
  {
    id: "prod-8",
    name: "Gỗ Sồi Trắng Bắc Mỹ Nhập Khẩu (White Oak)",
    categorySlug: "go",
    categoryName: "Gỗ Tự Nhiên & Công Nghiệp",
    brand: "Hưng Vinh Phát Wood",
    price: "18.500.000",
    unit: "m³",
    image: "/images/wood_material.jpg",
    description: "Gỗ sồi trắng (White Oak) nhập khẩu Mỹ được xẻ sấy chuẩn độ ẩm 8-12%, phục vụ đóng nội thất cao cấp.",
    specs: {
      "Chủng loại": "Gỗ Sồi Trắng (White Oak FAS)",
      "Độ ẩm": "8% - 12% tiêu chuẩn KD",
      "Độ dày": "26mm / 38mm / 50mm",
      "Nguồn gốc": "Bắc Mỹ"
    },
    features: ["Vân gỗ sồi tự nhiên cực đẹp", "Chống cong vênh co ngót", "Tư vấn cắt quy cách theo yêu cầu"]
  }
];
