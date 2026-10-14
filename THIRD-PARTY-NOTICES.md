# Third-Party Notices – mbw_dms

Copyright (c) 2023-2026 MOBIWORK VIETNAM DIGITAL TRANSFORMATION SOLUTION COMPANY LIMITED ("MBW Digital").
License of this module: GNU General Public License v3.0 only (GPL-3.0-only) – see license.txt.

## Code derived from ERPNext (GPL-3.0)

setup_wizard.py và các báo cáo có ghi Copyright (c) Frappe Technologies Pvt. Ltd. (phân tích bán hàng, xuất nhập tồn, top doanh thu...) sửa từ ERPNext – GPL-3.0.
Original copyright and license notices in those files are retained; modifications by MBW Digital.

## Third-party components

| Component | License | How it is used |
|---|---|---|
| Frappe Framework | MIT | nền tảng chạy app (cài riêng, không đóng gói kèm) |
| ERPNext | GPL-3.0 | import/override/hook code ERPNext (cài riêng) |
| React, React DOM, React Router, Redux Toolkit, styled-components, Ant Design, @ant-design/charts, Chart.js, react-chartjs-2 | MIT | frontend mbw_desk |
| i18next, react-i18next, dayjs, frappe-react-sdk, exceljs, file-saver, nprogress, classnames, react-icons, react-slick, slick-carousel, Tailwind CSS | MIT | frontend mbw_desk |
| SheetJS xlsx 0.18 | Apache-2.0 | frontend mbw_desk |
| NATS.js | Apache-2.0 | frontend mbw_desk |
| MapLibre GL 4, react-map-gl 7, Turf.js | BSD-3-Clause / MIT | frontend mbw_desk – bản đồ |
| MapTiler SDK, MapTiler geocoding-control | BSD-3-Clause (thư viện); dịch vụ MapTiler theo điều khoản MapTiler, cần API key | frontend mbw_desk – bản đồ |
| CKEditor 5 v43 | GPL-2.0-or-later (hoặc giấy phép thương mại CKSource) | frontend mbw_desk – soạn mô tả khuyến mại |
| ckeditor5-premium-features (SlashCommand) | THƯƠNG MẠI – CKSource, cần license key | frontend mbw_desk – Promotion/discription.tsx |
| Mapbox GL JS v3 | THƯƠNG MẠI – Mapbox Terms of Service, không phải mã nguồn mở | frontend mbw_desk – 1 chỗ import |
| EKGIS bản đồ nền / dữ liệu hành chính | THƯƠNG MẠI – dịch vụ EKGIS, cần API key | tải từ ekgis.vn khi chạy |
| Các gói npm trong node_modules (commit kèm repo) | theo license của từng gói | xem package.json / yarn.lock |

Each component remains under its own license and copyright notice. An omission from this list does not remove or replace the applicable third-party license.
Inventory compiled from source code on 2026-10-13.
