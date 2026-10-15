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
| MapLibre GL 4, react-map-gl 7 (entry maplibre), Turf.js | BSD-3-Clause / MIT | frontend mbw_desk – bản đồ; MapLibre là fork BSD của mapbox-gl v1 |
| @maptiler/geocoding-control, @maptiler/sdk | BSD-3-Clause | frontend mbw_desk – chỉ nạp CSS |
| CKEditor 5 v43 | GPL-2.0-or-later | frontend mbw_desk – soạn mô tả khuyến mại; tương thích GPL-3.0 |
| EKGIS bản đồ nền / dữ liệu hành chính / API | THƯƠNG MẠI – dịch vụ EKGIS, cần API key | dịch vụ ngoài gọi qua HTTP lúc chạy, không đóng gói kèm; dùng theo hợp đồng với EKGIS |
| Các gói npm trong node_modules (commit kèm repo) | theo license của từng gói | xem package.json / yarn.lock |

Each component remains under its own license and copyright notice. An omission from this list does not remove or replace the applicable third-party license.
Inventory compiled from source code on 2026-10-13.
