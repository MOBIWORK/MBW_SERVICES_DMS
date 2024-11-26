/** @format */

import { FormItemCustom, TableCustom } from "@/components";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { renderColumnChooseCs } from "./data";
import { TableRowSelection } from "antd/es/table/interface";
import { rsData } from "@/types/response";
import { AxiosService } from "@/services/server";
import useDebounce from "@/hooks/useDebount";
import { RowData } from "./components/type";
import { ContextProm } from "./modalWrapper";
import { SelectSearch } from "@/components/select/select";
import { useSelector } from "react-redux";
import { CTKM_MULTI } from "@/constant";
export type DataType = any;
function ModalChooseItem() {
  const {
    promotionData: { ptype_value: promotionType },
  } = useSelector((state: any) => state.promotion);

  const {
    handleSelect: { selectedRowKeys, setSelectedRowKeys },
    handleProduct: { uqProduct, setUqProduct },
    handleList: { options, setOption },
    handlePromotionType: { setMultiProduct },
  } = useContext(ContextProm);

  React.useEffect(() => {
    if (CTKM_MULTI.includes(promotionType)) {
      setMultiProduct(true);
    } else {
      setMultiProduct(false);
    }
  }, [promotionType]);
  const [filter, setFilter] = React.useState<{
    brand: string;
    suplier: string;
    industry: string;
  }>({ brand: "", suplier: "", industry: "" });

  const [ks, setKs] = React.useState<string>("");
  const keyS = useDebounce(ks);

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      // setSelectedRowKeys(newSelectedRowKeys)
      let upProductArray = options.filter((pd: RowData) =>
        newSelectedRowKeys.includes(pd.name)
      );
      let upProduct: { [key: string]: any } = {};
      upProductArray.forEach((pd: RowData) => {
        upProduct[pd.name] = { stock_uom: pd["stock_uom"], quantity: 0 };
      });

      setUqProduct(upProduct);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const selectB = (value: string) =>
    setFilter((prev) => ({ ...prev, brand: value }));
  const selectS = (value: string) =>
    setFilter((prev) => ({ ...prev, suplier: value }));
  const selectI = (value: string) =>
    setFilter((prev) => ({ ...prev, industry: value }));

  useEffect(() => {
    (async () => {
      let rsItems: rsData<{ data: any[]; [key: string]: any }> =
        await AxiosService.get(
          "/api/method/mbw_dms.api.selling.product.list_product",
          {
            params: {
              key_search: keyS,
              doctype: "Item",
              ...filter,
            },
          }
        );
      setOption(rsItems.result.data);
    })();
  }, [keyS, filter]);
  return (
    <>
      <Form layout="vertical">
        <Row className="items-center justify-between">
          <Col span={12}>
            <Row gutter={10}>
              <Col span={8}>
                <FormItemCustom label="Nhãn hiệu">
                  <SelectSearch
                    placeholder="Chọn nhãn hiệu"
                    option={filter.brand}
                    setOption={selectB}
                    doc={"Brand"}
                    reference={"Item"}
                  />
                </FormItemCustom>
              </Col>
              <Col span={8}>
                <FormItemCustom label="Nhà cung cấp">
                  <SelectSearch
                    placeholder="Chọn nhà cung cấp"
                    option={filter.suplier}
                    setOption={selectS}
                    doc={"Supplier"}
                    reference={"Item"}
                  />
                </FormItemCustom>
              </Col>
              <Col span={8}>
                <FormItemCustom label="Ngành hàng">
                  <SelectSearch
                    placeholder="Chọn ngành hàng"
                    option={filter.industry}
                    setOption={selectI}
                    doc={"Industry Type"}
                    reference={"Item"}
                  />
                </FormItemCustom>
              </Col>
            </Row>
          </Col>
          <Col>
            <Input
              className="h-[35px] w-[268px] bg-[#F4F6F8]"
              placeholder="Search..."
              prefix={<SearchOutlined size={32} />}
              onChange={(e) => {
                setKs(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Form>
      <div className="-mx-6">
        <TableCustom
          bordered
          scroll={{ y: 500 }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={renderColumnChooseCs(
            selectedRowKeys,
            setUqProduct,
            uqProduct,
            promotionType
          )}
          dataSource={options.map((value: DataType) => ({
            key: value.item_code,
            ...value,
          }))}
          pagination={false}
        />
      </div>
    </>
  );
}

export default ModalChooseItem;

export const Header = ({ handleClose }: any) => {
  const {
    handleSelect: { selectedRowKeys, setSelectedRowKeys },
    handleProduct: { uqProduct, setUqProduct },
    handleAddPd,
  } = useContext(ContextProm);

  return (
    <Row className="items-center justify-between">
      <Col span={8}>
        <h2>Danh sách sản phẩm</h2>
      </Col>
      <Col span={14} className=" justify-end">
        <Row gutter={10} className="justify-end items-center">
          <span>Đã chọn {selectedRowKeys.length} sản phẩm</span>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                handleAddPd();
                setSelectedRowKeys([]);
                setUqProduct({});
                handleClose(false);
              }}>
              Hoàn thành
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleClose.bind(null, {
                status: false,
              })}>
              Hủy
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
