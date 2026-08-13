"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  FileText,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Upload,
  Layers,
  Building2,
  Award,
  ChevronLeft,
  ChevronRight,
  Filter,
  Pencil
} from "lucide-react";
import {
  PRODUCT_CATEGORIES,
  BRANDS,
  SAMPLE_PRODUCTS,
  Product,
  ProductCategory,
  Brand
} from "@/data/companyData";

const INITIAL_QUOTES = [
  {
    id: "1",
    customer: "Anh Nguyễn Văn Hùng (Chủ thầu)",
    phone: "0982.145.889",
    items: "35 Tấn Thép Hòa Phát CB400 D16 & D18",
    note: "Giao hàng phân đoạn 2 đợt theo tiến độ đổ dầm sàn tầng 2 công trình KCN Phố Nối A. Yêu cầu cung cấp đầy đủ chứng chỉ CO/CQ xuất xưởng của nhà máy Hòa Phát, xe tải cẩu tự hành hạ hàng lúc 5h sáng để tránh giờ cao điểm cấm tải.",
    status: "Chưa xử lý"
  },
  {
    id: "2",
    customer: "Chị Trần Thị Thanh (Biệt thự vườn)",
    phone: "0912.456.789",
    items: "180m2 Gạch Men Lustra 80x80 & 3 Bộ Thiết Bị Tuslo",
    note: "Chủ nhà yêu cầu kiểm tra kỹ mã lô sản xuất gạch men Lustra để đảm bảo 100% đồng màu vân đá xám, giao kèm 5 bao keo dán gạch chuyên dụng và nẹp nhôm bo góc cao cấp. Xuất hóa đơn VAT điện tử về pháp nhân công ty tại Hà Nội.",
    status: "Đang xử lý"
  },
  {
    id: "3",
    customer: "Công ty CP Đầu Tư Xây Dựng Việt Hưng",
    phone: "0904.888.999",
    items: "1.200m2 Nhôm Kính Hệ Xây Dựng Trường Thành 55",
    note: "Đã thống nhất tiến độ giao hàng và điều khoản thanh toán 3 đợt: Đặt cọc 30% khi ký hợp đồng kinh tế, thanh toán tiếp 40% khi bốc dỡ đủ thanh nhôm định hình tại chân công trình, 30% còn lại quyết toán sau khi nghiệm thu kỹ thuật và bàn giao biên bản.",
    status: "Đã báo giá"
  },
  {
    id: "4",
    customer: "Anh Phạm Quốc Bảo (Nhà ở dân dụng)",
    phone: "0977.333.222",
    items: "5 Tấn Thép Cây D12 + 10 Cuộn Tôn Mạ Kẽm Hoa Sen 0.45mm",
    note: "Yêu cầu bọc màng PE chống trầy xước bề mặt tôn cuộn Hoa Sen, hỗ trợ kỹ thuật cắt thép cây D12 thành đoạn 5.85m tại kho Hưng Vinh Phát để vừa thùng xe ba gác chuyển vào ngõ nhỏ trong khu dân cư.",
    status: "Đã chốt"
  },
  {
    id: "5",
    customer: "Đại lý Vật Liệu Xây Dựng Minh Phát",
    phone: "0936.111.444",
    items: "500m2 Gạch Ốp Tường Lustra + 20 Bộ Bồn Cầu Liền Khối Tuslo",
    note: "Áp dụng chính sách chiết khấu đại lý cấp 1 quý 3/2026. Yêu cầu kiểm tra tem chống hàng giả điện tử và gửi kèm 20 phiếu bảo hành men sứ chính hãng 10 năm của Tuslo cùng catalog sản phẩm để chào thầu dự án trường mầm non.",
    status: "Đã hủy"
  },
  {
    id: "6",
    customer: "Anh Đỗ Hoàng Nam (Nhà thầu xây dựng)",
    phone: "0965.222.888",
    items: "50 Cuộn Tôn Lạnh Mạ Màu Olympic 0.40mm",
    note: "Khách cần báo giá cạnh tranh để đấu thầu công trình mái vòm sân thể thao. Yêu cầu chứng thư chất lượng và hỗ trợ cuộn lại theo kích thước tiêu chuẩn.",
    status: "Đang xử lý"
  },
  {
    id: "7",
    customer: "Công ty Thiết Kế Nội Thất An Phát",
    phone: "0944.555.777",
    items: "350m2 Tấm Nhựa Ốp Lam Sóng Ngân Hoa + Phào Chỉ",
    note: "Công trình chuỗi showroom tại TP Hưng Yên. Giao hàng đúng 8h sáng thứ 2 tuần tới kèm theo 10 tuýp keo dán chuyên dụng.",
    status: "Chưa xử lý"
  }
];

// Component Phân Trang Chuẩn Cho Từng Bảng
function PaginationControl({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  if (totalItems === 0) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        background: "rgba(0, 0, 0, 0.25)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        flexWrap: "wrap",
        gap: "10px",
        fontSize: "12.5px"
      }}
    >
      <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>
        Hiển thị <strong style={{ color: "#fff" }}>{startIdx} - {endIdx}</strong> trên tổng số <strong style={{ color: "#c6a15b" }}>{totalItems}</strong> mục
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {/* Nút Trang Trước */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "5px 10px",
            background: currentPage <= 1 ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            color: currentPage <= 1 ? "rgba(255, 255, 255, 0.3)" : "#ffffff",
            cursor: currentPage <= 1 ? "not-allowed" : "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.15s"
          }}
        >
          <ChevronLeft size={14} />
          <span>Trước</span>
        </button>

        {/* Các nút số trang */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              style={{
                minWidth: "30px",
                height: "28px",
                padding: "0 6px",
                background: isActive ? "#c6a15b" : "rgba(255, 255, 255, 0.06)",
                color: isActive ? "#0a1714" : "#ffffff",
                border: isActive ? "1px solid #c6a15b" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s"
              }}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Nút Trang Sau */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "5px 10px",
            background: currentPage >= totalPages ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            color: currentPage >= totalPages ? "rgba(255, 255, 255, 0.3)" : "#ffffff",
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.15s"
          }}
        >
          <span>Sau</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // Tab: 'products' | 'categories' | 'brands' | 'quotes'
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "brands" | "quotes">("products");

  // Dữ liệu
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [categoriesList, setCategoriesList] = useState<ProductCategory[]>(PRODUCT_CATEGORIES);
  const [brandsList, setBrandsList] = useState<Brand[]>(BRANDS);
  const [quotes, setQuotes] = useState(INITIAL_QUOTES);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Phân trang cho 4 bảng
  const [pageProducts, setPageProducts] = useState(1);
  const [pageCategories, setPageCategories] = useState(1);
  const [pageBrands, setPageBrands] = useState(1);
  const [pageQuotes, setPageQuotes] = useState(1);

  // Lọc theo trạng thái báo giá (riêng tab 4)
  const [quoteStatusFilter, setQuoteStatusFilter] = useState("all");

  const ITEMS_PER_PAGE_PRODUCTS = 5;
  const ITEMS_PER_PAGE_CATEGORIES = 4;
  const ITEMS_PER_PAGE_BRANDS = 5;
  const ITEMS_PER_PAGE_QUOTES = 4;

  // Form Thêm/Sửa Sản Phẩm (trực tiếp trên trang)
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("sat-thep");
  const [brand, setBrand] = useState("Hòa Phát");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [imagesList, setImagesList] = useState<string[]>([]);

  // Form Thêm/Sửa Ngành Hàng (trực tiếp trên trang)
  const [showAddCatForm, setShowAddCatForm] = useState(false);
  const [editingCatSlug, setEditingCatSlug] = useState<string | null>(null);
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catImage, setCatImage] = useState<string>("");

  // Form Thêm/Sửa Thương Hiệu (trực tiếp trên trang)
  const [showAddBrandForm, setShowAddBrandForm] = useState(false);
  const [editingBrandSlug, setEditingBrandSlug] = useState<string | null>(null);
  const [brandName, setBrandName] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [brandLogo, setBrandLogo] = useState<string>("");

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hvp_admin_auth");
    }
    router.push("/admin");
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id: string, prodName: string) => {
    if (confirm(`Xóa sản phẩm "${prodName}" khỏi danh sách?`)) {
      setProducts(products.filter((p) => p.id !== id));
      showNotification(`Đã xóa: ${prodName}`);
    }
  };

  // Xóa ngành hàng
  const handleDeleteCategory = (catSlugToDelete: string, cName: string) => {
    if (confirm(`Xóa ngành hàng "${cName}"?`)) {
      setCategoriesList(categoriesList.filter((c) => c.slug !== catSlugToDelete));
      showNotification(`Đã xóa ngành hàng: ${cName}`);
    }
  };

  // Xóa thương hiệu
  const handleDeleteBrand = (brandSlugToDelete: string, bName: string) => {
    if (confirm(`Xóa thương hiệu "${bName}" khỏi danh sách đối tác?`)) {
      setBrandsList(brandsList.filter((b) => b.slug !== brandSlugToDelete));
      showNotification(`Đã xóa thương hiệu: ${bName}`);
    }
  };

  // Chọn ảnh cho sản phẩm
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImagesList((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Chọn ảnh cho ngành hàng
  const handleCatImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setCatImage(uploadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Chọn logo cho thương hiệu
  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setBrandLogo(uploadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagesList(imagesList.filter((_, idx) => idx !== indexToRemove));
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const handleStartEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setName(p.name);
    setSlug(p.id);
    setCategory(p.categorySlug);
    setBrand(p.brand);
    setPrice(p.price);
    setUnit(p.unit);
    setDescription(p.description);
    setImagesList(p.image ? [p.image] : []);
    setShowAddForm(true);
  };

  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    setName("");
    setSlug("");
    setPrice("");
    setUnit("");
    setDescription("");
    setImagesList([]);
    setShowAddForm(false);
  };

  // Bắt đầu chỉnh sửa ngành hàng
  const handleStartEditCategory = (c: ProductCategory) => {
    setEditingCatSlug(c.slug);
    setCatName(c.name);
    setCatSlug(c.slug);
    setCatDesc(c.description);
    setCatImage(c.image);
    setShowAddCatForm(true);
  };

  const handleCancelEditCategory = () => {
    setEditingCatSlug(null);
    setCatName("");
    setCatSlug("");
    setCatDesc("");
    setCatImage("");
    setShowAddCatForm(false);
  };

  // Bắt đầu chỉnh sửa thương hiệu
  const handleStartEditBrand = (b: Brand) => {
    setEditingBrandSlug(b.slug);
    setBrandName(b.name);
    setBrandSlug(b.slug);
    setBrandDesc(b.description);
    setBrandLogo(b.image || "");
    setShowAddBrandForm(true);
  };

  const handleCancelEditBrand = () => {
    setEditingBrandSlug(null);
    setBrandName("");
    setBrandSlug("");
    setBrandDesc("");
    setBrandLogo("");
    setShowAddBrandForm(false);
  };

  // Submit Lưu hoặc Cập nhật sản phẩm
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const catObj = categoriesList.find((c) => c.slug === category);
    const mainImg = imagesList.length > 0 ? imagesList[0] : "/images/steel_construction.jpg";
    const finalSlug = slug.trim().toLowerCase().replace(/\s+/g, "-") || `sp-${Date.now()}`;

    if (editingProductId) {
      setProducts(
        products.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                name: name.trim(),
                id: finalSlug,
                categorySlug: category,
                categoryName: catObj ? catObj.name : p.categoryName,
                brand,
                price: price.trim(),
                unit: unit.trim() || p.unit,
                image: mainImg,
                description: description.trim() || p.description
              }
            : p
        )
      );
      handleCancelEditProduct();
      showNotification(`Đã cập nhật sản phẩm: ${name}`);
      return;
    }

    const newP: Product = {
      id: finalSlug,
      name,
      categorySlug: category,
      categoryName: catObj ? catObj.name : "Sản phẩm",
      brand,
      price,
      unit: unit.trim() || "Cái",
      image: mainImg,
      description: description.trim() || "Sản phẩm chất lượng cao phân phối bởi Hưng Vinh Phát.",
      specs: {},
      features: []
    };

    setProducts([newP, ...products]);
    handleCancelEditProduct();
    showNotification(`Đã thêm thành công sản phẩm: ${name}`);
  };

  // Submit Lưu hoặc Cập nhật ngành hàng
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim() || !catSlug.trim()) {
      alert("Vui lòng nhập tên và mã định danh ngành hàng.");
      return;
    }

    const cleanSlug = catSlug.trim().toLowerCase().replace(/\s+/g, "-");

    if (editingCatSlug) {
      setCategoriesList(
        categoriesList.map((c) =>
          c.slug === editingCatSlug
            ? {
                ...c,
                name: catName.trim(),
                slug: cleanSlug,
                eyebrow: catName.trim(),
                headline: catName.trim(),
                description: catDesc.trim() || c.description,
                detailedDesc: catDesc.trim() || c.detailedDesc,
                image: catImage || c.image
              }
            : c
        )
      );
      handleCancelEditCategory();
      showNotification(`Đã cập nhật ngành hàng: ${catName}`);
      return;
    }

    const newCategoryObj: ProductCategory = {
      slug: cleanSlug,
      name: catName.trim(),
      eyebrow: catName.trim(),
      headline: catName.trim(),
      description: catDesc.trim() || "Cung cấp phân phối chính hãng các sản phẩm ngành hàng.",
      detailedDesc: catDesc.trim() || "",
      image: catImage || "/images/steel_construction.jpg",
      brands: [brand],
      productCount: 0,
      applications: ["Công trình dân dụng", "Dự án công nghiệp"],
      standards: ["TCVN / ISO 9001"],
      faqs: []
    };

    setCategoriesList([newCategoryObj, ...categoriesList]);
    handleCancelEditCategory();
    showNotification(`Đã thêm ngành hàng: ${catName}`);
  };

  // Submit Lưu hoặc Cập nhật thương hiệu
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !brandSlug.trim()) {
      alert("Vui lòng nhập tên và mã định danh thương hiệu.");
      return;
    }

    const cleanSlug = brandSlug.trim().toLowerCase().replace(/\s+/g, "-");

    if (editingBrandSlug) {
      setBrandsList(
        brandsList.map((b) =>
          b.slug === editingBrandSlug
            ? {
                ...b,
                name: brandName.trim(),
                slug: cleanSlug,
                logoText: brandName.trim().slice(0, 4).toUpperCase(),
                image: brandLogo || b.image,
                description: brandDesc.trim() || b.description
              }
            : b
        )
      );
      handleCancelEditBrand();
      showNotification(`Đã cập nhật thương hiệu: ${brandName}`);
      return;
    }

    const newBrandObj: Brand = {
      slug: cleanSlug,
      name: brandName.trim(),
      logoText: brandName.trim().slice(0, 4).toUpperCase(),
      tagline: "Đối tác chiến lược",
      image: brandLogo || "/images/logo.png",
      isStrategicPartner: true,
      description: brandDesc.trim() || "Thương hiệu đối tác chất lượng cao của Hưng Vinh Phát."
    };

    setBrandsList([newBrandObj, ...brandsList]);
    handleCancelEditBrand();
    showNotification(`Đã thêm thương hiệu: ${brandName}`);
  };

  // Cập nhật trạng thái yêu cầu báo giá theo lựa chọn
  const handleUpdateQuoteStatus = (id: string, newStatus: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
    showNotification(`Đã cập nhật trạng thái: "${newStatus}"`);
  };

  // Tự động reset trang về 1 khi người dùng tìm kiếm hoặc đổi bộ lọc trạng thái
  useEffect(() => {
    setPageProducts(1);
    setPageCategories(1);
    setPageBrands(1);
    setPageQuotes(1);
  }, [search, quoteStatusFilter]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCategories = categoriesList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBrands = brandsList.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.slug.toLowerCase().includes(search.toLowerCase())
  );

  const filteredQuotes = quotes.filter((q) => {
    const matchStatus = quoteStatusFilter === "all" || q.status === quoteStatusFilter;
    const matchSearch =
      q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.includes(search) ||
      q.items.toLowerCase().includes(search.toLowerCase()) ||
      (q.note && q.note.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  // Phân trang sản phẩm
  const totalProductPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE_PRODUCTS));
  const paginatedProducts = filteredProducts.slice(
    (pageProducts - 1) * ITEMS_PER_PAGE_PRODUCTS,
    pageProducts * ITEMS_PER_PAGE_PRODUCTS
  );

  // Phân trang ngành hàng
  const totalCategoryPages = Math.max(1, Math.ceil(filteredCategories.length / ITEMS_PER_PAGE_CATEGORIES));
  const paginatedCategories = filteredCategories.slice(
    (pageCategories - 1) * ITEMS_PER_PAGE_CATEGORIES,
    pageCategories * ITEMS_PER_PAGE_CATEGORIES
  );

  // Phân trang thương hiệu
  const totalBrandPages = Math.max(1, Math.ceil(filteredBrands.length / ITEMS_PER_PAGE_BRANDS));
  const paginatedBrands = filteredBrands.slice(
    (pageBrands - 1) * ITEMS_PER_PAGE_BRANDS,
    pageBrands * ITEMS_PER_PAGE_BRANDS
  );

  // Phân trang báo giá
  const totalQuotePages = Math.max(1, Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE_QUOTES));
  const paginatedQuotes = filteredQuotes.slice(
    (pageQuotes - 1) * ITEMS_PER_PAGE_QUOTES,
    pageQuotes * ITEMS_PER_PAGE_QUOTES
  );

  return (
    <div style={{ minHeight: "100vh", background: "#081d18", color: "#ffffff", fontFamily: "sans-serif" }}>
      {/* Toast thông báo */}
      {toast && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", background: "#0b3b32", border: "1px solid #c6a15b", color: "#fff", padding: "10px 18px", borderRadius: "8px", zIndex: 9999, display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px" }}>
          <CheckCircle2 size={16} color="#4ade80" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          background: "#071713",
          borderBottom: "1px solid rgba(198, 161, 91, 0.25)",
          padding: "0 28px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#0a1714",
                border: "1px solid rgba(198, 161, 91, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <img src="/images/logo.png" alt="Logo Hưng Vinh Phát" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.2px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>HƯNG VINH PHÁT</span>
                <span style={{ color: "#c6a15b", fontWeight: 600, fontSize: "11px", background: "rgba(198, 161, 91, 0.15)", border: "1px solid rgba(198, 161, 91, 0.3)", padding: "1px 6px", borderRadius: "4px" }}>
                  ADMIN
                </span>
              </div>
              <div style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.5)" }}>
                Hệ thống Quản trị & Điều hành Doanh nghiệp
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.8)",
              textDecoration: "none",
              padding: "7px 12px",
              background: "rgba(255, 255, 255, 0.06)",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <span>Xem Website</span>
            <ExternalLink size={13} />
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#f87171",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              padding: "7px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            <LogOut size={14} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 20px" }}>
        {/* 4 Thẻ đếm nhanh */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "24px" }}>
          <div
            onClick={() => setActiveTab("products")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Tổng sản phẩm</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#38bdf8" }}>{products.length}</div>
          </div>
          <div
            onClick={() => setActiveTab("categories")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Danh mục ngành hàng</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#4ade80" }}>{categoriesList.length}</div>
          </div>
          <div
            onClick={() => setActiveTab("brands")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Thương hiệu đối tác</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#facc15" }}>{brandsList.length}</div>
          </div>
          <div
            onClick={() => setActiveTab("quotes")}
            style={{ background: "rgba(11, 59, 50, 0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px 16px", cursor: "pointer" }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>Yêu cầu báo giá</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#f43f5e" }}>{quotes.length}</div>
          </div>
        </div>

        {/* Tab Chuyển Đổi (4 tab) */}
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px", marginBottom: "22px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setActiveTab("products"); setSearch(""); }}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "products" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "products" ? "#0a1714" : "#fff" }}
          >
            Quản Lý Sản Phẩm ({products.length})
          </button>
          <button
            onClick={() => { setActiveTab("categories"); setSearch(""); }}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "categories" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "categories" ? "#0a1714" : "#fff" }}
          >
            Quản Lý Ngành Hàng ({categoriesList.length})
          </button>
          <button
            onClick={() => { setActiveTab("brands"); setSearch(""); }}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "brands" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "brands" ? "#0a1714" : "#fff" }}
          >
            Quản Lý Thương Hiệu ({brandsList.length})
          </button>
          <button
            onClick={() => { setActiveTab("quotes"); setSearch(""); }}
            style={{ padding: "8px 18px", borderRadius: "6px", border: "none", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", background: activeTab === "quotes" ? "#c6a15b" : "rgba(255,255,255,0.06)", color: activeTab === "quotes" ? "#0a1714" : "#fff" }}
          >
            Yêu Cầu Báo Giá ({quotes.length})
          </button>
        </div>

        {/* TAB 1: SẢN PHẨM */}
        {activeTab === "products" && (
          <div>
            {/* Toolbar: Tiêu đề + Nút Thêm Sản Phẩm + Tìm kiếm */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
                  Danh Sách Sản Phẩm ({filteredProducts.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (showAddForm) handleCancelEditProduct();
                    else setShowAddForm(true);
                  }}
                  style={{
                    padding: "8px 16px",
                    background: showAddForm ? "rgba(255, 255, 255, 0.12)" : "#c6a15b",
                    color: showAddForm ? "#ffffff" : "#0a1714",
                    border: showAddForm ? "1px solid rgba(255, 255, 255, 0.25)" : "none",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {showAddForm ? "Đóng Form" : "+ Thêm Sản Phẩm"}
                </button>
              </div>

              <div style={{ position: "relative", minWidth: "240px" }}>
                <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm tên, thương hiệu, ngành hàng..."
                  style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* FORM THÊM / SỬA SẢN PHẨM */}
            {showAddForm && (
              <div style={{ background: "rgba(11, 59, 50, 0.45)", border: "1px solid rgba(198, 161, 91, 0.35)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {editingProductId ? <Pencil size={18} color="#c6a15b" /> : <Plus size={18} color="#c6a15b" />}
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      {editingProductId ? `Chỉnh Sửa Sản Phẩm: ${name || ""}` : "Thêm Sản Phẩm Mới"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEditProduct}
                    style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}
                    title="Đóng form"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct}>
                  {/* Hàng 1: Tên sản phẩm, Slug, Ngành hàng, Thương hiệu */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Tên sản phẩm <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (!slug) {
                            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                          }
                        }}
                        placeholder="Ví dụ: Thép Thanh Vằn Hòa Phát CB400 D18"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Mã định danh URL (Slug) <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="Ví dụ: thep-thanh-van-hoa-phat-cb400-d18"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Ngành hàng <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }}
                      >
                        {categoriesList.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Thương hiệu <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }}
                      >
                        {brandsList.map((b) => (
                          <option key={b.slug} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Hàng 2: Đơn giá, Đơn vị tính */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Đơn giá (VNĐ) <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ví dụ: 15.800.000"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Đơn vị tính <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder="Tấn / m2 / Bộ / Cây..."
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  {/* Hàng 3: Ảnh sản phẩm (Cho phép chọn nhiều ảnh) */}
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                      Ảnh sản phẩm (Có thể chọn nhiều ảnh) <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
                        <Upload size={14} />
                        <span>Chọn ảnh từ máy tính</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                        />
                      </label>

                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                        {imagesList.length === 0 ? "Chưa chọn ảnh nào (sẽ dùng ảnh mặc định)" : `Đã chọn ${imagesList.length} ảnh`}
                      </span>
                    </div>

                    {/* Danh sách ảnh xem trước (Preview) */}
                    {imagesList.length > 0 && (
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                        {imagesList.map((imgUrl, idx) => (
                          <div key={idx} style={{ position: "relative", width: "64px", height: "64px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
                            <img src={imgUrl} alt={`Ảnh ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              style={{ position: "absolute", top: "2px", right: "2px", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.9)", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}
                              title="Xóa ảnh này"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hàng 4: Mô tả sản phẩm */}
                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                      Mô tả sản phẩm <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Nhập thông tin mô tả quy cách, xuất xứ, ứng dụng công trình..."
                      style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                    />
                  </div>

                  {/* Nút Submit Lưu/Cập nhật */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    {editingProductId && (
                      <button
                        type="button"
                        onClick={handleCancelEditProduct}
                        style={{
                          padding: "10px 20px",
                          background: "rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        Hủy Chỉnh Sửa
                      </button>
                    )}
                    <button
                      type="submit"
                      style={{
                        padding: "10px 24px",
                        background: "linear-gradient(135deg, #c6a15b 0%, #d4b472 100%)",
                        color: "#0a1714",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(198, 161, 91, 0.3)"
                      }}
                    >
                      {editingProductId ? "Cập Nhật Sản Phẩm" : "Lưu Sản Phẩm"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DANH SÁCH SẢN PHẨM HIỆN CÓ */}
            <div style={{ background: "rgba(11, 59, 50, 0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                    <th style={{ padding: "10px 14px" }}>Ảnh & Tên sản phẩm</th>
                    <th style={{ padding: "10px 14px" }}>Ngành hàng</th>
                    <th style={{ padding: "10px 14px" }}>Thương hiệu</th>
                    <th style={{ padding: "10px 14px" }}>Đơn giá</th>
                    <th style={{ padding: "10px 14px", textAlign: "right" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Không tìm thấy sản phẩm nào.</td>
                    </tr>
                  ) : (
                    paginatedProducts.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", background: "#0a1714", flexShrink: 0 }}>
                              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#fff" }}>{p.name}</div>
                              {p.description && (
                                <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", maxWidth: "320px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {p.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.7)" }}>{p.categoryName}</td>
                        <td style={{ padding: "10px 14px", color: "#c6a15b", fontWeight: 600 }}>{p.brand}</td>
                        <td style={{ padding: "10px 14px", color: "#4ade80", fontWeight: 600 }}>{p.price} đ/{p.unit}</td>
                        <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                          <button onClick={() => handleStartEditProduct(p)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: "4px 6px", marginRight: "4px" }} title="Chỉnh sửa sản phẩm">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id, p.name)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px 6px" }} title="Xóa sản phẩm">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Phân trang Sản phẩm */}
              <PaginationControl
                currentPage={pageProducts}
                totalPages={totalProductPages}
                totalItems={filteredProducts.length}
                itemsPerPage={ITEMS_PER_PAGE_PRODUCTS}
                onPageChange={setPageProducts}
              />
            </div>
          </div>
        )}

        {/* TAB 2: QUẢN LÝ NGÀNH HÀNG */}
        {activeTab === "categories" && (
          <div>
            {/* Toolbar: Tiêu đề + Nút Thêm Ngành Hàng + Tìm kiếm */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
                  Danh Sách Ngành Hàng ({filteredCategories.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (showAddCatForm) handleCancelEditCategory();
                    else setShowAddCatForm(true);
                  }}
                  style={{
                    padding: "8px 16px",
                    background: showAddCatForm ? "rgba(255, 255, 255, 0.12)" : "#c6a15b",
                    color: showAddCatForm ? "#ffffff" : "#0a1714",
                    border: showAddCatForm ? "1px solid rgba(255, 255, 255, 0.25)" : "none",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {showAddCatForm ? "Đóng Form" : "+ Thêm Ngành Hàng"}
                </button>
              </div>

              <div style={{ position: "relative", minWidth: "240px" }}>
                <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm ngành hàng, slug..."
                  style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* FORM THÊM / SỬA NGÀNH HÀNG */}
            {showAddCatForm && (
              <div style={{ background: "rgba(11, 59, 50, 0.45)", border: "1px solid rgba(198, 161, 91, 0.35)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {editingCatSlug ? <Pencil size={18} color="#c6a15b" /> : <Layers size={18} color="#c6a15b" />}
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      {editingCatSlug ? `Chỉnh Sửa Ngành Hàng: ${catName || ""}` : "Thêm Ngành Hàng Mới"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEditCategory}
                    style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}
                    title="Đóng form"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddCategory}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Tên ngành hàng <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={catName}
                        onChange={(e) => {
                          setCatName(e.target.value);
                          if (!catSlug) {
                            setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                          }
                        }}
                        placeholder="Ví dụ: Gỗ Tự Nhiên & Công Nghiệp"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Mã định danh URL (Slug) <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={catSlug}
                        onChange={(e) => setCatSlug(e.target.value)}
                        placeholder="Ví dụ: go-cong-nghiep"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                      Ảnh đại diện ngành hàng <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
                        <Upload size={14} />
                        <span>Chọn ảnh đại diện</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCatImageUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                      {catImage ? (
                        <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
                          <img src={catImage} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                          Chưa chọn ảnh nào
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                      Mô tả ngành hàng <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      placeholder="Nhập mô tả ứng dụng, phân phối của ngành hàng..."
                      style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    {editingCatSlug && (
                      <button
                        type="button"
                        onClick={handleCancelEditCategory}
                        style={{
                          padding: "10px 20px",
                          background: "rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        Hủy Chỉnh Sửa
                      </button>
                    )}
                    <button
                      type="submit"
                      style={{
                        padding: "10px 24px",
                        background: "linear-gradient(135deg, #c6a15b 0%, #d4b472 100%)",
                        color: "#0a1714",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(198, 161, 91, 0.3)"
                      }}
                    >
                      {editingCatSlug ? "Cập Nhật Ngành Hàng" : "Lưu Ngành Hàng"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DANH SÁCH NGÀNH HÀNG HIỆN CÓ */}
            <div style={{ background: "rgba(11, 59, 50, 0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                    <th style={{ padding: "10px 14px" }}>Ảnh & Tên ngành hàng</th>
                    <th style={{ padding: "10px 14px" }}>Định danh (Slug)</th>
                    <th style={{ padding: "10px 14px" }}>Mô tả</th>
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>Xem trang</th>
                    <th style={{ padding: "10px 14px", textAlign: "right" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Không tìm thấy ngành hàng nào.</td>
                    </tr>
                  ) : (
                    paginatedCategories.map((c, i) => (
                      <tr key={c.slug} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", background: "#0a1714", flexShrink: 0 }}>
                              <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <span style={{ fontWeight: 600, color: "#fff" }}>{c.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                          {c.slug}
                        </td>
                        <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.7)", maxWidth: "360px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {c.description}
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <Link href={`/category/${c.slug}`} target="_blank" style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}>
                            <span>Xem</span>
                            <ExternalLink size={12} />
                          </Link>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                          <button onClick={() => handleStartEditCategory(c)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: "4px 6px", marginRight: "4px" }} title="Chỉnh sửa ngành hàng">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDeleteCategory(c.slug, c.name)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px 6px" }} title="Xóa ngành hàng">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Phân trang Ngành hàng */}
              <PaginationControl
                currentPage={pageCategories}
                totalPages={totalCategoryPages}
                totalItems={filteredCategories.length}
                itemsPerPage={ITEMS_PER_PAGE_CATEGORIES}
                onPageChange={setPageCategories}
              />
            </div>
          </div>
        )}

        {/* TAB 3: QUẢN LÝ THƯƠNG HIỆU */}
        {activeTab === "brands" && (
          <div>
            {/* Toolbar: Tiêu đề + Nút Thêm Thương Hiệu + Tìm kiếm */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: 0 }}>
                  Danh Sách Thương Hiệu Đối Tác ({filteredBrands.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (showAddBrandForm) handleCancelEditBrand();
                    else setShowAddBrandForm(true);
                  }}
                  style={{
                    padding: "8px 16px",
                    background: showAddBrandForm ? "rgba(255, 255, 255, 0.12)" : "#c6a15b",
                    color: showAddBrandForm ? "#ffffff" : "#0a1714",
                    border: showAddBrandForm ? "1px solid rgba(255, 255, 255, 0.25)" : "none",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {showAddBrandForm ? "Đóng Form" : "+ Thêm Thương Hiệu"}
                </button>
              </div>

              <div style={{ position: "relative", minWidth: "240px" }}>
                <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm thương hiệu, khẩu hiệu, slug..."
                  style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* FORM THÊM / SỬA THƯƠNG HIỆU */}
            {showAddBrandForm && (
              <div style={{ background: "rgba(11, 59, 50, 0.45)", border: "1px solid rgba(198, 161, 91, 0.35)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {editingBrandSlug ? <Pencil size={18} color="#c6a15b" /> : <Building2 size={18} color="#c6a15b" />}
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      {editingBrandSlug ? `Chỉnh Sửa Thương Hiệu: ${brandName || ""}` : "Thêm Thương Hiệu Mới"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEditBrand}
                    style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}
                    title="Đóng form"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddBrand}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Tên thương hiệu <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={brandName}
                        onChange={(e) => {
                          setBrandName(e.target.value);
                          if (!brandSlug) {
                            setBrandSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                          }
                        }}
                        placeholder="Ví dụ: Thép Việt Ý"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                        Mã định danh URL (Slug) <span style={{ color: "#f43f5e" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={brandSlug}
                        onChange={(e) => setBrandSlug(e.target.value)}
                        placeholder="Ví dụ: thep-viet-y"
                        style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                      Logo thương hiệu <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", background: "rgba(198, 161, 91, 0.15)", border: "1px dashed #c6a15b", borderRadius: "6px", color: "#c6a15b", fontSize: "12.5px", cursor: "pointer", fontWeight: 600 }}>
                        <Upload size={14} />
                        <span>Chọn logo thương hiệu</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBrandLogoUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                      {brandLogo ? (
                        <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
                          <img src={brandLogo} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                          Chưa chọn ảnh nào
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.85)", marginBottom: "5px", fontWeight: 500 }}>
                      Mô tả thương hiệu <span style={{ color: "#f43f5e" }}>*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={brandDesc}
                      onChange={(e) => setBrandDesc(e.target.value)}
                      placeholder="Nhập thông tin giới thiệu uy tín, chất lượng thương hiệu..."
                      style={{ width: "100%", padding: "9px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    {editingBrandSlug && (
                      <button
                        type="button"
                        onClick={handleCancelEditBrand}
                        style={{
                          padding: "10px 20px",
                          background: "rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        Hủy Chỉnh Sửa
                      </button>
                    )}
                    <button
                      type="submit"
                      style={{
                        padding: "10px 24px",
                        background: "linear-gradient(135deg, #c6a15b 0%, #d4b472 100%)",
                        color: "#0a1714",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(198, 161, 91, 0.3)"
                      }}
                    >
                      {editingBrandSlug ? "Cập Nhật Thương Hiệu" : "Lưu Thương Hiệu"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DANH SÁCH THƯƠNG HIỆU HIỆN CÓ */}
            <div style={{ background: "rgba(11, 59, 50, 0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                    <th style={{ padding: "10px 14px" }}>Ảnh & Tên thương hiệu</th>
                    <th style={{ padding: "10px 14px" }}>Định danh (Slug)</th>
                    <th style={{ padding: "10px 14px" }}>Mô tả</th>
                    <th style={{ padding: "10px 14px", textAlign: "center" }}>Xem trang</th>
                    <th style={{ padding: "10px 14px", textAlign: "right" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBrands.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Không tìm thấy thương hiệu nào.</td>
                    </tr>
                  ) : (
                    paginatedBrands.map((b, i) => (
                      <tr key={b.slug} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "42px", height: "42px", borderRadius: "6px", overflow: "hidden", background: "#0a1714", border: "1px solid rgba(198, 161, 91, 0.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img src={b.image || "/images/logo.png"} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#fff", fontSize: "13.5px" }}>{b.name}</div>
                              <span style={{ fontSize: "10.5px", color: "#c6a15b", fontWeight: 700 }}>{b.logoText}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                          {b.slug}
                        </td>
                        <td style={{ padding: "10px 14px", color: "rgba(255,255,255,0.7)", maxWidth: "360px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {b.description}
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <Link href={`/brand/${b.slug}`} target="_blank" style={{ color: "#38bdf8", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}>
                            <span>Xem</span>
                            <ExternalLink size={12} />
                          </Link>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right", whiteSpace: "nowrap" }}>
                          <button onClick={() => handleStartEditBrand(b)} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", padding: "4px 6px", marginRight: "4px" }} title="Chỉnh sửa thương hiệu">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => handleDeleteBrand(b.slug, b.name)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: "4px 6px" }} title="Xóa thương hiệu">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Phân trang Thương hiệu */}
              <PaginationControl
                currentPage={pageBrands}
                totalPages={totalBrandPages}
                totalItems={filteredBrands.length}
                itemsPerPage={ITEMS_PER_PAGE_BRANDS}
                onPageChange={setPageBrands}
              />
            </div>
          </div>
        )}

        {/* TAB 4: YÊU CẦU BÁO GIÁ */}
        {activeTab === "quotes" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", gap: "10px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#fff", margin: 0 }}>
                Yêu Cầu Báo Giá Gần Đây ({filteredQuotes.length})
              </h3>
              <div style={{ position: "relative", minWidth: "240px" }}>
                <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm tên khách, SĐT, mặt hàng, ghi chú..."
                  style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Thanh lọc trạng thái (Segmented Filter Bar) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontSize: "12.5px", fontWeight: 600, marginRight: "2px" }}>
                <Filter size={14} color="#c6a15b" />
                <span>Trạng thái:</span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "3px",
                  gap: "3px",
                  flexWrap: "wrap"
                }}
              >
                {[
                  { key: "all", label: "Tất cả", count: quotes.length, activeBg: "#c6a15b", activeColor: "#0a1714", dotColor: "#c6a15b" },
                  { key: "Chưa xử lý", label: "Chưa xử lý", count: quotes.filter(q => q.status === "Chưa xử lý").length, activeBg: "#881337", activeColor: "#ffffff", dotColor: "#f43f5e" },
                  { key: "Đang xử lý", label: "Đang xử lý", count: quotes.filter(q => q.status === "Đang xử lý").length, activeBg: "#78350f", activeColor: "#ffffff", dotColor: "#f59e0b" },
                  { key: "Đã báo giá", label: "Đã báo giá", count: quotes.filter(q => q.status === "Đã báo giá").length, activeBg: "#075985", activeColor: "#ffffff", dotColor: "#38bdf8" },
                  { key: "Đã chốt", label: "Đã chốt", count: quotes.filter(q => q.status === "Đã chốt").length, activeBg: "#14532d", activeColor: "#ffffff", dotColor: "#4ade80" },
                  { key: "Đã hủy", label: "Đã hủy", count: quotes.filter(q => q.status === "Đã hủy").length, activeBg: "#334155", activeColor: "#ffffff", dotColor: "#94a3b8" },
                ].map((item) => {
                  const isSelected = quoteStatusFilter === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setQuoteStatusFilter(item.key)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: isSelected ? 700 : 500,
                        cursor: "pointer",
                        border: "none",
                        background: isSelected ? item.activeBg : "transparent",
                        color: isSelected ? item.activeColor : "rgba(255, 255, 255, 0.7)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: item.dotColor,
                          display: "inline-block"
                        }}
                      />
                      <span>{item.label}</span>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "1px 6px",
                          borderRadius: "10px",
                          background: isSelected ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.1)",
                          color: isSelected ? (item.key === "all" ? "#0a1714" : "#ffffff") : "rgba(255, 255, 255, 0.8)",
                          fontWeight: 700
                        }}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ background: "rgba(11, 59, 50, 0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                    <th style={{ padding: "10px 14px", width: "160px" }}>Khách hàng</th>
                    <th style={{ padding: "10px 14px", width: "120px" }}>Số điện thoại</th>
                    <th style={{ padding: "10px 14px", width: "220px" }}>Mặt hàng yêu cầu</th>
                    <th style={{ padding: "10px 14px" }}>Ghi chú</th>
                    <th style={{ padding: "10px 14px", width: "140px", textAlign: "center" }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Không tìm thấy đơn báo giá nào.</td>
                    </tr>
                  ) : (
                    paginatedQuotes.map((q, i) => (
                      <tr key={q.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                        <td style={{ padding: "14px 14px", fontWeight: 600, color: "#fff", verticalAlign: "top", whiteSpace: "nowrap" }}>
                          {q.customer}
                        </td>
                        <td style={{ padding: "14px 14px", color: "#38bdf8", fontWeight: 600, verticalAlign: "top", whiteSpace: "nowrap" }}>
                          {q.phone}
                        </td>
                        <td style={{ padding: "14px 14px", color: "rgba(255,255,255,0.9)", verticalAlign: "top", fontWeight: 500 }}>
                          {q.items}
                        </td>
                        <td style={{ padding: "14px 14px", verticalAlign: "top" }}>
                          {q.note ? (
                            <div
                              style={{
                                color: "rgba(255,255,255,0.85)",
                                fontSize: "12.5px",
                                lineHeight: "1.6",
                                wordBreak: "break-word"
                              }}
                            >
                              {q.note}
                            </div>
                          ) : (
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "center", verticalAlign: "top" }}>
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                            style={{
                              padding: "6px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              border: "1px solid rgba(255,255,255,0.2)",
                              outline: "none",
                              textAlign: "center",
                              background:
                                q.status === "Chưa xử lý"
                                  ? "#881337"
                                  : q.status === "Đang xử lý"
                                  ? "#78350f"
                                  : q.status === "Đã báo giá"
                                  ? "#075985"
                                  : q.status === "Đã chốt"
                                  ? "#14532d"
                                  : "#334155",
                              color: "#ffffff",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                              whiteSpace: "nowrap"
                            }}
                          >
                            <option value="Chưa xử lý" style={{ background: "#1f1315", color: "#fca5a5" }}>Chưa xử lý</option>
                            <option value="Đang xử lý" style={{ background: "#261a0b", color: "#fde047" }}>Đang xử lý</option>
                            <option value="Đã báo giá" style={{ background: "#0c1e28", color: "#7dd3fc" }}>Đã báo giá</option>
                            <option value="Đã chốt" style={{ background: "#0c2417", color: "#86efac" }}>Đã chốt</option>
                            <option value="Đã hủy" style={{ background: "#1e293b", color: "#cbd5e1" }}>Đã hủy</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Phân trang Báo giá */}
              <PaginationControl
                currentPage={pageQuotes}
                totalPages={totalQuotePages}
                totalItems={filteredQuotes.length}
                itemsPerPage={ITEMS_PER_PAGE_QUOTES}
                onPageChange={setPageQuotes}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
