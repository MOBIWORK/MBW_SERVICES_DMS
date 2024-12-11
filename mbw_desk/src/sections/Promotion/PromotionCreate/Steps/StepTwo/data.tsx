/** @format */

import {
  DeleteOutlined,
  DownSquareFilled,
  MinusCircleFilled,
  PlusCircleFilled,
  PlusOutlined,
  SearchOutlined,
  UpSquareFilled,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Col,
  Flex,
  Input,
  InputNumber,
  Row,
  Select,
  TableColumnsType,
} from "antd";
import { MenuProps } from "antd/lib";
import { RowData, Unit } from "./components/type";
import { SelectCommon } from "@/components";
import { DataType } from "./modalChooseItem";
import React, { useContext, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebount";
import PromotionProductHandle from "./components/PromotionProductComponent";
import { PdContext } from ".";
import {
  addPromotionProduct,
  deletePromotionProduct,
  updatePromotionProduct,
  deletePromotionPM,
  addPromotionProductMultiBuy,
  updatePromotionProductMultiBuy,
  addPromotionProductMultiOrder,
  addPromotionProductMultiKM,
  deletePromotionProductMultiKM,
  updatePromotionProductMultiKM,
  deletePromotionProductMultiRow,
  updatePromotionProductMulti_khuyen_mai,
  setPromotionProductMultiBuy,
} from "@/redux/slices/promotion-slice";
import {
  handleDataProductPushP1,
  handleDataProductPushP2,
  handleDataProductPushP3,
  handleDataProductPushP4,
  handleDataProductPushP5,
  handleDataProductPushP6,
  handleDataProductPushP8,
} from "./components/Single";
import styled from "styled-components";
import { renderOption } from "./components/AddPd";
import { rsData } from "@/types/response";
import { AxiosService } from "@/services/server";

import { Greater } from "@/icons/Group";
import TrashIcon from "@/icons/trash";
import useDebounceUpdate from "@/hooks/useDebounceUpdate";
import { usePromotionProductTransform } from "@/hooks/usePromotionTransform";
import { FuncType } from "@/types";

const WrapInputNumber = styled.div`
  & .ant-input-number {
    width: 100%;
  }
`;

export function handleUnit(unit: Unit) {
  return unit
    ? {
        viewData: unit.uom,
        choice_values: unit.uom,
      }
    : {};
}

export function handlePromotion(khuyen_mai: any[]) {
  return khuyen_mai.map((km) => ({
    _id: km.name,
    don_vi_tinh: km.unit.find((unt: any) => unt.uom == km.stock_uom)
      ? handleUnit(km.unit.find((unt: any) => unt.uom == km.stock_uom) as Unit)
      : {},
    don_vi_tinh_other: km?.unit.map((unt: any) => handleUnit(unt)),
    ma_san_pham: km.item_code,
    ten_san_pham: km.item_name,
    so_luong: km.so_luong,
  }));
}

export function handleDataProduct(product: any) {
  return {
    _id: product.name,
    don_vi_tinh: handleUnit(
      product.unit.find((unt: any) => unt.uom == product.stock_uom) as Unit
    ),
    don_vi_tinh_other: product.unit.map((unt: any) => handleUnit(unt)),
    ma_san_pham: product.item_code,
    ten_san_pham: product.item_name,
    so_luong: product?.so_luong || 0,
  };
}

export const handleDataProductMultiKM = (productMultiKM: any) => {
  return productMultiKM?.map((product: any) => {
    return product.map((item: any) => {
      return handleDataProduct(item);
    });
  });
};

export function handleDataProductMultiBuy(productMultiBuy: any) {
  return productMultiBuy?.map((product: any) => handleDataProduct(product));
}

export function handleDataToApi({ products, ptype_value }: any) {
  // const {
  //   promotionData: { ptype_value },
  //   products,
  // } = useSelector((state: any) => state.promotion);
  let product_push;
  switch (ptype_value) {
    case "SP_SL_CKSP": //1.1
      product_push = handleDataProductPushP1(products);
      break;
    case "SP_SL_SP": //1.2
      product_push = handleDataProductPushP2(products);
      break;

    case "SP_SL_TIEN": //1.3
      product_push = handleDataProductPushP3(products);
      break;

    case "SP_ST_CKSP": //1.4
      product_push = handleDataProductPushP4(products);
      break;

    case "SP_ST_SP": //1.5
      product_push = handleDataProductPushP5(products);
      break;

    case "SP_ST_TIEN": //1.6
      product_push = handleDataProductPushP6(products);
      break;

    case "TIEN_SP": //1.8
      product_push = handleDataProductPushP8(products);
      break;

    case "TIEN_CKDH": //1.7
    case "TIEN_TIEN": //1.9

    //========================= CTKM Muti====================== //

    case "MUTI_SP_ST_SP": //2.1
    case "MUTI_SP_ST_CKSP": //2.2
    case "MUTI_SP_ST_TIEN": //2.3
    case "MUTI_SP_SL_SP": //2.4
    case "MUTI_SP_SL_CKSP": //2.5
    case "MUTI_SP_SL_TIEN": //2.6
    case "MUTI_TIEN_SP": //2.7
    case "MUTI_TIEN_CKDH": //2.8
    case "MUTI_TIEN_TIEN": //2.9
      const { transformProducts } = usePromotionProductTransform();
      product_push = transformProducts(products);
      break;
    default:
      product_push = products;
  }
  return product_push;
}

const handleExpand = (setExpandedRows: FuncType, row: string) => {
  setExpandedRows((prev: any) =>
    prev.includes(row)
      ? prev.filter((rowId: any) => rowId !== row)
      : [...prev, row]
  );
};

const handleDelete = (setData: FuncType, key: any) => {
  setData(deletePromotionProduct(key));
};

const handleDeletePM = (setData: FuncType, indexRow: any, index: number) => {
  setData(deletePromotionPM({ indexRow, index }));
};

export const renderMenu = (...rest: any): MenuProps["items"] => [
  {
    label: (
      <span
        onClick={() => {
          rest.handleDeleteMulti(rest.choose);
        }}>
        Xóa ({rest.choose}) Sản phẩm đã chọn
      </span>
    ),
    key: 1,
  },
  {
    label: (
      <span
        className="text-[#FF5630]"
        onClick={() => {
          rest.handleDeleteAll();
        }}>
        Xóa tất cả sản phẩm
      </span>
    ),
    key: 2,
  },
];

export const renderColumnChooseCs = (
  selectPd: DataType[],
  handleChangeInfo: FuncType,
  uqProduct: any,
  promotionType: string
): TableColumnsType<any> => {
  // console.log("uqProduct",uqProduct);
  const listRender = [
    {
      title: "Mã sản phẩm",
      dataIndex: "item_code",
      key: "itemcode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "item_name",
      key: "itemname",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
      width: 190,
      render: (value: Unit[], record: RowData) => {
        return (
          <SelectCommon
            disabled={!selectPd.includes(record.name)}
            onSelect={(stock) => {
              handleChangeInfo((prev: any) => {
                if (prev[record.name]) {
                  prev[record.name]["stock_uom"] = stock;
                } else if (
                  !prev[record.name] &&
                  selectPd.includes(record.name)
                ) {
                  prev[record.name] = { stock_uom: stock };
                }

                return { ...prev };
              });
            }}
            className="w-[180px]"
            value={uqProduct[record.name] && uqProduct[record.name]?.stock_uom}
            options={
              value.map((unit: Unit) => ({
                label: unit.uom,
                value: unit.uom,
              })) || []
            }
          />
        );
      },
    },
  ];
  if (!["SP_ST_CKSP", "SP_ST_SP", "SP_ST_TIEN"].includes(promotionType)) {
    return [
      ...listRender,
      {
        title: "Số lượng",
        dataIndex: "so_luong",
        key: "so_luong",
        width: 130,
        render: (text: number, record: RowData) => (
          <InputNumber
            disabled={!selectPd.includes(record.name)}
            min={0}
            value={uqProduct[record.name] && uqProduct[record.name].so_luong}
            onChange={(e: number | null) => {
              handleChangeInfo((prev: any) => {
                if (prev[record.name]) {
                  prev[record.name]["so_luong"] = e || 0;
                } else if (
                  !prev[record.name] &&
                  selectPd.includes(record.name)
                ) {
                  // prev[record.name] = {"so_luong" :e.target.value}
                  prev = { ...prev, [record.name]: { so_luong: e || 0 } };
                }

                return { ...prev };
              });
            }}
          />
        ),
      },
    ];
  } else return listRender;
};

export const columnChooseCs: TableColumnsType<any> = [
  {
    title: "Mã sản phẩm",
    dataIndex: "item_code",
    key: "itemcode",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "item_name",
    key: "itemname",
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
    key: "unit",
    width: 190,
    render: (value: Unit[], record: RowData) => {
      return (
        <SelectCommon
          className="w-[180px]"
          defaultValue={record.stock_uom}
          options={
            value.map((unit: Unit) => ({ label: unit.uom, value: unit.uom })) ||
            []
          }
        />
      );
    },
  },
  {
    title: "Số lượng",
    dataIndex: "so_luong",
    key: "so_luong",
    width: 130,
    render: (text: number, record: RowData) => (
      <InputNumber min={0} defaultValue={text} />
    ),
  },
];

//render common column

const renderSttColumn = (expanded: boolean) => {
  const {
    handleExpanded: { expandedRows, setExpandedRows },
  } = useContext(PdContext);
  return {
    title: "STT",
    dataIndex: "",
    key: "id",
    width: 60,
    className: "!text-center",
    render: (text: string, record: RowData, index: number) => (
      <>
        {expanded && (
          <Button
            type="link"
            icon={
              expandedRows.includes(record.name) ? (
                <UpSquareFilled size={20} className="" />
              ) : (
                <DownSquareFilled size={20} className="" />
              )
            }
            onClick={() => handleExpand(setExpandedRows, index.toString())}
          />
        )}
        {(index + 1).toString().padStart(2, "0")}
      </>
    ),
  };
};

const renderProductColumn = () => {
  const {
    handleDataPromotion: { setData },
  } = useContext(PdContext);

  return [
    {
      title: "Mã sản phẩm",
      dataIndex: "item_code",
      width: 150,
      key: "item_code",
    },
    {
      title: "Sản phẩm",
      dataIndex: "item_name",
      key: "item_name",
      width: 250,
      render: (_: any) => (
        <div className="max-w-[250px] truncate hover:whitespace-normal">
          {_}
        </div>
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
      width: 150,
      render: (value: any, record: any, indexRow: number) => {
        return (
          <Select
            style={{ width: 120 }}
            value={record?.stock_uom}
            onChange={(value: any) => {
              setData(
                updatePromotionProduct({ indexRow, field: "stock_uom", value })
              );
            }}
            options={value?.map((unit: Unit) => ({
              label: unit?.uom,
              value: unit?.uom,
            }))}
          />
        );
      },
    },
  ];
};

const renderColumnNumber = ({ field, width = 150, lable }: any) => {
  const {
    handleDataPromotion: { setData },
  } = useContext(PdContext);
  const [num, setNum] = useState<{ value: number; indexRow: number }>();
  let NumV = useDebounce(num, 300);
  useEffect(() => {
    NumV &&
      setData(
        updatePromotionProduct({
          indexRow: NumV.indexRow,
          field: field,
          value: NumV.value,
        })
      );
  }, [NumV]);

  return {
    title: lable,
    dataIndex: field,
    key: field,
    width,
    render: (text: number, record: RowData, indexRow: number) => (
      <WrapInputNumber>
        <InputNumber
          min={0}
          value={text}
          onChange={(value: any) => {
            setNum({ indexRow, value });
          }}
        />
      </WrapInputNumber>
    ),
  };
};

const renderColumnNumberMulti = ({
  field,
  width = 150,
  lable,
  totalMoney = undefined,
}: any) => {
  const {
    handleDataPromotion: { setData },
  } = useContext(PdContext);
  const [setDebouncedValue] = useDebounceUpdate((params) => {
    setData(updatePromotionProductMulti_khuyen_mai(params));
  });
  return {
    title: lable,
    dataIndex: field,
    key: field,
    width,
    render: (text: number, record: RowData, indexRow: number) => (
      <WrapInputNumber>
        <InputNumber
          controls={false}
          min={0}
          value={totalMoney ? (text as any)?.amountMin : text}
          onChange={(value: any) => {
            setDebouncedValue({ indexRow, value, field, totalMoney });
          }}
        />
      </WrapInputNumber>
    ),
  };
};

const renderColumnPdPromo = () => {
  const {
    handleExpanded: { expandedRows },
    handleModal: { setModalC },
  } = useContext(PdContext);

  return {
    title: "Sản phẩm khuyến mại",
    key: "khuyen_mai",
    render: (_: any, record: RowData, indexRow: any) => {
      const isExpanded = expandedRows.includes(indexRow.toString());
      return (
        <div>
          {isExpanded ? (
            <>
              <PromotionProductHandle indexRow={indexRow} record={record} />
              <Button
                type="default"
                icon={<PlusOutlined />}
                onClick={setModalC.bind(null, {
                  status: true,
                  product_id: indexRow.toString(),
                })}></Button>
            </>
          ) : (
            <div className="flex items-center">
              <span className="pr-2">
                {record?.khuyen_mai?.length} sản phẩm
              </span>
              <Button
                type="default"
                icon={<PlusOutlined />}
                onClick={setModalC.bind(null, {
                  status: true,
                  product_id: indexRow.toString(),
                })}></Button>
            </div>
          )}
        </div>
      );
    },
  };
};

const renderDelColumn = (addPd: boolean, typeKm: "T" | "SP" = "SP") => {
  const {
    handleDataPromotion: { setData },
    handleAddRow: { setShowAdd },
  } = useContext(PdContext);

  return {
    title: (
      <div
        // type="link"
        className="text-[#22C55E] flex justify-center cursor-pointer"
        // icon={<PlusCircleFilled color="#22C55E" />}
        onClick={() => {
          addPd
            ? setShowAdd(true)
            : setData(
                addPromotionProduct([
                  { khuyen_mai: typeKm == "T" ? 0 : [], yeu_cau: 0 },
                ])
              );
        }}>
        <PlusCircleFilled />
      </div>
    ),
    dataIndex: "nothing",
    key: "nothing",
    width: 100,
    render: (_: any, record: any, indexRow: number) => {
      return (
        <Button
          className="border-0 !w-full"
          icon={<MinusCircleFilled />}
          danger
          type="link"
          onClick={() => handleDelete(setData, indexRow)}></Button>
      );
    },
  };
};

const renderMinMaxColunm = ({ field, lable }: any) => {
  const {
    handleDataPromotion: { setData },
  } = useContext(PdContext);

  const [setDebouncedValue] = useDebounceUpdate((params) => {
    setData(
      addPromotionProductMultiOrder({
        value: params.value,
        indexRow: params.indexRow,
        field: params.field,
      })
    );
  });

  return {
    title: <div className="text-center">{lable}</div>,
    dataIndex: field,
    key: field,
    width: 250,
    render: (_: any, record: any, indexRow: number) => {
      return (
        <Flex vertical gap={16} align="center">
          <div className="flex space-x-4 items-center">
            <div className="mr-[4px]">
              <Greater />
            </div>
            <InputNumber
              className="mb-1 w-[120px]"
              controls={false}
              min={0}
              defaultValue={0}
              value={record?.yeu_cau?.qualityMin}
              onChange={(value) => {
                setDebouncedValue({
                  value,
                  indexRow,
                  field: "qualityMin",
                });
              }}
            />
          </div>
          <div className="space-x-4 flex">
            <div className="mt-1">
              <Less />
            </div>

            <InputNumber
              className="mb-1 w-[120px]"
              controls={false}
              defaultValue={0}
              min={0}
              value={record?.yeu_cau?.qualityMax}
              onChange={(value) => {
                setDebouncedValue({
                  value,
                  indexRow,
                  field: "qualityMax",
                });
              }}
            />
          </div>
        </Flex>
      );
    },
  };
};

const renderProdMulti = () => {
  const [showInputSearch, setShowInputSearch] = useState<boolean>(true);
  const [typeAdd, setTypeAdd] = useState<"V" | "H">("H");
  const {
    handleDataPromotion: { setData },
  } = useContext(PdContext);

  const andButton = () => {
    setShowInputSearch(true);
  };

  const [setDebouncedValue] = useDebounceUpdate((params) => {
    setData(updatePromotionProductMultiKM(params));
  });

  return {
    title: "Sản phẩm khuyến mại",
    dataIndex: "san_pham_khuyen_mai",
    key: "san_pham_khuyen_mai",
    render: (_: any, record: any, indexRow: any) => {
      return (
        <>
          <p className="mb-2">
            ({record?.san_pham_khuyen_mai?.length || 0} nhóm sản phẩm)
          </p>

          {record?.san_pham_khuyen_mai?.map((item: any, index: number) => {
            return (
              <div key={index?.toString()}>
                {index == 0 && (
                  <span className="text-[#637381]  text-xs">
                    ({item?.length} sản phẩm)
                  </span>
                )}
                {index > 0 && (
                  <p className="text-[#C4161C] text-base mt-4">
                    Hoặc{" "}
                    <span className="text-[#637381]  text-xs">
                      ({item?.length} sản phẩm)
                    </span>
                  </p>
                )}
                {item?.map((it: any, id: number) => {
                  const lastIndex = item?.length - 1;
                  return (
                    <Flex
                      key={`${index?.toString()}_${id?.toString()}`}
                      className={`p-2 border-[#DFE3E8] border-[1px] border-solid ${
                        lastIndex !== id ? "border-b-0" : ""
                      }`}
                      justify="space-between">
                      <Flex vertical className="w-[50%] text-sm group">
                        <p className="font-bold  truncate group-hover:whitespace-normal">
                          {it?.item_name}
                        </p>
                        <p className="italic text-gray-500  truncate  group-hover:whitespace-normal ">
                          {it?.item_code}
                        </p>
                      </Flex>
                      <Flex className="w-[300px]" gap={8} align="center">
                        <SelectCommon
                          className="flex-1 h-[30px]"
                          defaultValue={it?.stock_uom}
                          value={it?.stock_uom}
                          onChange={(value) => {
                            setData(
                              updatePromotionProductMultiKM({
                                indexRow,
                                index,
                                id,
                                value,
                                field: "stock_uom",
                              })
                            );
                          }}
                          options={
                            it?.unit?.map((unit: Unit) => ({
                              label: unit.uom,
                              value: unit.uom,
                            })) || []
                          }
                        />

                        <InputNumber
                          width={150}
                          defaultValue={0}
                          min={0}
                          controls={false}
                          value={it?.so_luong}
                          onChange={(value) => {
                            setDebouncedValue({
                              indexRow,
                              index,
                              id,
                              value,
                              field: "so_luong",
                            });
                          }}
                        />

                        <Button
                          className="border-0 "
                          icon={<TrashIcon />}
                          type="link"
                          onClick={() =>
                            setData(
                              deletePromotionProductMultiKM({
                                indexRow,
                                index,
                                id,
                              })
                            )
                          }></Button>
                      </Flex>
                    </Flex>
                  );
                })}
              </div>
            );
          })}

          <Flex gap={8} vertical>
            <Row
              className={`${showInputSearch ? "flex" : "hidden"} gap-4 mt-4`}>
              <InputSearchItem
                indexRow={indexRow}
                product_km={true}
                typeAdd={"V"}
              />
              <Button
                icon={<TrashIcon />}
                onClick={() => setShowInputSearch(false)}></Button>
            </Row>

            <Col className="space-x-4 mt-2">
              <Button type="default" onClick={andButton}>
                Và
              </Button>
              <Button
                type="default"
                onClick={() => {
                  setTypeAdd("H");

                  setData(
                    addPromotionProductMultiKM({
                      prodBuyAdd: [],
                      indexRow,
                      typeAdd,
                    })
                  );
                }}>
                Hoặc
              </Button>
            </Col>
          </Flex>
        </>
      );
    },
  };
};

const InputSearchItem = ({
  indexRow,
  typeAdd,
  product_km = false,
  hidden = false,
}: {
  indexRow: number;
  product_km?: boolean;
  hidden?: boolean;
  typeAdd?: string;
}) => {
  const {
    handleDataPromotion: { setData },
    handleAddRow: { setShowAdd },
    handleModal: { setModalC },
  } = useContext(PdContext);
  const [options, setOption] = React.useState<any[]>([]);
  const [ks, setKs] = React.useState<string>("");
  const keyS = useDebounce(ks, 300);
  useEffect(() => {
    (async () => {
      let rsItems: rsData<{ data: any[] }> = await AxiosService.get(
        "/api/method/mbw_dms.api.selling.product.list_product",
        {
          params: {
            key_search: keyS,
            doctype: "Item",
          },
        }
      );
      setOption(rsItems.result.data);
    })();
  }, [keyS]);
  return (
    <AutoComplete
      className="w-[300px]"
      popupMatchSelectWidth={300}
      allowClear
      options={renderOption(options)}
      onSelect={(value) => {
        const dataOption = options.find((pb: any) => pb.item_code == value);
        const prodBuyAdd = {
          name: dataOption.name,
          so_luong: dataOption.so_luong,
          unit: dataOption.unit,
          stock_uom: dataOption.stock_uom,
          item_code: dataOption.item_code,
          item_name: dataOption.item_name,
          item_group: dataOption.item_group,
          description: dataOption.description,
        };
        if (product_km) {
          setData(
            addPromotionProductMultiKM({ prodBuyAdd, indexRow, typeAdd })
          );
        } else {
          setData(addPromotionProductMultiBuy({ prodBuyAdd, indexRow }));
        }

        setShowAdd(false);
      }}>
      <Input
        value={ks}
        hidden={hidden}
        className="h-[35px]"
        placeholder="Nhập mã, tên sp"
        prefix={<SearchOutlined size={32} />}
        onChange={(e: any) => {
          setModalC.bind(null, { product_id: e.target.value });
          setKs(e.target.value);
        }}
        onBlur={() => {
          setKs("");
        }}
      />
    </AutoComplete>
  );
};

const renderDelColumnMulti = (addPd: boolean, typeKm: "T" | "SP" = "SP") => {
  const {
    handleDataPromotion: { setData },
    handleAddRow: { setShowAdd },
  } = useContext(PdContext);

  return {
    title: (
      <div
        // type="link"
        className="text-[#22C55E] flex justify-center cursor-pointer"
        // icon={<PlusCircleFilled color="#22C55E" />}
        onClick={() => {
          addPd
            ? setShowAdd(true)
            : setData(setPromotionProductMultiBuy({ san_pham_mua: [] }));
        }}>
        <PlusCircleFilled />
      </div>
    ),
    dataIndex: "nothing",
    key: "nothing",
    width: 100,
    render: (_: any, record: any, indexRow: number) => {
      return (
        <Button
          className="border-0 !w-full"
          icon={<MinusCircleFilled />}
          danger
          type="link"
          onClick={() =>
            setData(deletePromotionProductMultiRow(indexRow))
          }></Button>
      );
    },
  };
};

const renderProBuy = () => {
  const [showInputSearch, setShowInputSearch] = useState<boolean>(false);
  const {
    handleDataPromotion: { setData },
  } = useContext(PdContext);

  const [setDebouncedValue] = useDebounceUpdate((params) => {
    setData(updatePromotionProductMultiBuy(params));
  });

  return {
    title: "Sản phẩm mua",
    dataIndex: "product_buy",
    key: "product_buy",
    render: (_: any, record: any, indexRow: any) => {
      return (
        <Flex vertical className="" key={indexRow.toString()}>
          <p>({record?.san_pham_mua?.length || 0} sản phẩm)</p>
          {record?.san_pham_mua?.map((item: any, index: number) => {
            return (
              <Flex
                key={index.toString()}
                className={`my-4 pb-2 border-b-[2px] border-solid border-b-[#DFE3E8] border-t-0 border-x-0`}
                justify="space-between">
                <Flex vertical className="w-[50%] text-sm group ">
                  <p className="font-bold  truncate group-hover:whitespace-normal">
                    {item.item_name}
                  </p>
                  <p className="italic text-gray-500  truncate  group-hover:whitespace-normal ">
                    {item.item_code}
                  </p>
                </Flex>
                <Flex className="w-[300px]" gap={8} align="center">
                  <SelectCommon
                    className="flex-1 h-[30px]"
                    defaultValue={item.stock_uom}
                    value={item.stock_uom}
                    onChange={(value) => {
                      setDebouncedValue({
                        value,
                        indexRow,
                        index,
                        field: "dvt",
                      });
                    }}
                    options={
                      item.unit.map((unit: Unit) => ({
                        label: unit.uom,
                        value: unit.uom,
                      })) || []
                    }
                  />

                  <InputNumber
                    width={150}
                    defaultValue={0}
                    min={0}
                    controls={false}
                    value={item.so_luong}
                    onChange={(value) => {
                      // Update local state trước
                      setDebouncedValue({
                        value,
                        indexRow,
                        index,
                        field: "so_luong",
                      });
                    }}
                  />

                  <Button
                    className="border-0 "
                    icon={<TrashIcon />}
                    danger
                    type="link"
                    onClick={() =>
                      handleDeletePM(setData, indexRow, index)
                    }></Button>
                </Flex>
              </Flex>
            );
          })}

          {showInputSearch ? (
            <Row className="gap-4 ">
              <InputSearchItem indexRow={indexRow} />
              <Button
                icon={<TrashIcon />}
                onClick={() => setShowInputSearch(false)}></Button>
            </Row>
          ) : (
            <Button
              icon={<PlusOutlined />}
              onClick={() => setShowInputSearch(true)}></Button>
          )}
        </Flex>
      );
    },
  };
};

//render column[]
export const renderColumnP1 = (): TableColumnsType<any> => {
  return [
    renderSttColumn(false),
    ...renderProductColumn(),
    renderColumnNumber({ field: "so_luong", lable: "Số lượng" }),
    renderColumnNumber({ field: "qty_min", lable: "Số lượng tối thiểu" }),
    renderColumnNumber({ field: "khuyen_mai", lable: "Tỉ lệ chiết khấu" }),
    renderDelColumn(true, "T"),
  ];
};

export const renderColumnP2 = () => {
  return [
    renderSttColumn(true),
    ...renderProductColumn(),
    renderColumnNumber({ field: "so_luong", lable: "Số lượng" }),
    renderColumnPdPromo(),
    renderDelColumn(true, "SP"),
  ];
};

export const renderColumnP3 = () => {
  return [
    renderSttColumn(false),
    ...renderProductColumn(),
    renderColumnNumber({ field: "so_luong", lable: "Số lượng" }),
    renderColumnNumber({ field: "qty_min", lable: "Số lượng tối thiểu" }),
    renderColumnNumber({ field: "khuyen_mai", lable: "Tiền chiết khấu" }),
    renderDelColumn(true, "T"),
  ];
};

export const renderColumnP4 = () => {
  return [
    renderSttColumn(false),
    ...renderProductColumn(),
    renderColumnNumber({ field: "yeu_cau", lable: "Tổng tiền" }),
    renderColumnNumber({ field: "khuyen_mai", lable: "Tỉ lệ chiết khấu" }),
    renderDelColumn(true, "T"),
  ];
};

export const renderColumnP5 = () => {
  return [
    renderSttColumn(true),
    ...renderProductColumn(),
    renderColumnNumber({ field: "yeu_cau", lable: "Tổng tiền" }),
    renderColumnPdPromo(),
    renderDelColumn(true, "SP"),
  ];
};

export const renderColumnP6 = () => {
  return [
    renderSttColumn(false),
    ...renderProductColumn(),
    renderColumnNumber({ field: "yeu_cau", lable: "Tổng tiền" }),
    renderColumnNumber({ field: "khuyen_mai", lable: "Tiền chiết khấu" }),
    renderDelColumn(true, "T"),
  ];
};

export const renderColumnP7 = () => {
  return [
    renderSttColumn(false),
    renderColumnNumber({ field: "yeu_cau", lable: "Tổng tiền mua" }),
    renderColumnNumber({ field: "khuyen_mai", lable: "Tỉ lệ chiết khấu" }),
    renderDelColumn(false, "T"),
  ];
};

export const renderColumnP8 = () => {
  return [
    renderSttColumn(true),
    renderColumnNumber({ field: "yeu_cau", lable: "Tổng tiền mua" }),
    renderColumnPdPromo(),
    renderDelColumn(false, "SP"),
  ];
};

export const renderColumnP9 = () => {
  return [
    renderSttColumn(false),
    renderColumnNumber({ field: "yeu_cau", lable: "Tổng tiền mua" }),
    renderColumnNumber({ field: "khuyen_mai", lable: "Tiền chiết khấu" }),
    renderDelColumn(false, "T"),
  ];
};

//================Render colunm promotion multi=========================//

export const renderColumnPM1 = (): TableColumnsType<any> => {
  return [
    renderSttColumn(true),
    renderProBuy(),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng tiền" }),
    renderProdMulti(),
    renderDelColumnMulti(true, "T"),
  ];
};

export const renderColumnPM2 = (): TableColumnsType<any> => {
  return [
    renderSttColumn(true),
    renderProBuy(),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng tiền" }),

    renderColumnNumberMulti({
      field: "khuyen_mai",
      lable: "Tỷ lệ chiết khấu(%)",
    }),
    renderDelColumnMulti(true, "T"),
  ];
};

export const renderColumnPM3 = (): TableColumnsType<any> => {
  return [
    renderSttColumn(true),
    renderProBuy(),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng tiền" }),

    renderColumnNumberMulti({
      field: "khuyen_mai",
      lable: "Tiền chiết khấu",
    }),
    renderDelColumnMulti(true, "T"),
  ];
};

export const renderColumnPM4 = () => {
  return [
    renderSttColumn(true),
    renderProBuy(),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng số lượng" }),
    renderProdMulti(),
    renderDelColumnMulti(true, "T"),
  ];
};

export const renderColumnPM5 = () => {
  return [
    renderSttColumn(true),
    renderProBuy(),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng số lượng" }),
    renderColumnNumberMulti({
      field: "khuyen_mai",
      lable: "Tỷ lệ chiết khấu(%)",
    }),
    renderDelColumnMulti(true, "T"),
  ];
};

export const renderColumnPM6 = () => {
  return [
    renderSttColumn(true),
    renderProBuy(),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng số lượng" }),
    renderColumnNumberMulti({ field: "khuyen_mai", lable: "Tiền chiết khấu" }),
    renderDelColumnMulti(true, "T"),
  ];
};
export const renderColumnPM7 = () => {
  return [
    renderSttColumn(true),
    renderColumnNumberMulti({
      field: "yeu_cau",
      lable: "Tổng tiền",
      totalMoney: true,
    }),
    renderProdMulti(),
    renderDelColumnMulti(false, "T"),
  ];
};

export const renderColumnPM8 = () => {
  return [
    renderSttColumn(false),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng số tiền" }),
    // renderColumnNumber({ field: "khuyen_mai", lable: "Tỷ lệ chiết khấu(%)" }),
    renderColumnNumberMulti({
      field: "khuyen_mai",
      lable: "Tỷ lệ chiết khấu(%)",
    }),
    renderDelColumnMulti(false, "T"),
  ];
};

export const renderColumnPM9 = () => {
  return [
    renderSttColumn(false),
    renderMinMaxColunm({ field: "yeu_cau", lable: "Tổng tiền" }),
    renderColumnNumberMulti({
      field: "khuyen_mai",
      lable: "Tiền chiết khấu",
    }),
    renderDelColumnMulti(false, "T"),
  ];
};
