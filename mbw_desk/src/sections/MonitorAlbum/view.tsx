import { useEffect, useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import {
  Col,
  Row,
  Select,
  Modal,
  DatePicker,
  DatePickerProps,
  TreeSelect,
  Form,
} from "antd";
import { CardCustom } from "../../components/card/card";
import { UserIcon } from "../../icons/user";
import { PictureIcon } from "../../icons/picture";
import { AxiosService } from "../../services/server";
import DetailModal from "./modal/detail";
import useDebounce from "../../hooks/useDebount";
import dayjs from "dayjs";
import { listSale } from "../../types/listSale";
import { employee } from "../../types/employeeFilter";
import { rsData, rsDataFrappe } from "../../types/response";
import { treeArray } from "../../util";
const dateNow = new Date().toJSON().slice(0, 10);

export default function MonitorAlbum() {
  const [listCustomerGroup, setCustomerGroup] = useState<any[]>([]);
  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataFilterAlbum, setDataFilterAlbum] = useState([]);
  const [album, setAlbum] = useState<string>();
  const [customer_name, setCustomer_name] = useState<string>();
  const [employee, setEmployee] = useState<string>();
  const [creation, setCreation] = useState<any>();
  const [keyS, setKeyS] = useState("");
  const [keyS1, setKeyS1] = useState("");
  const [keyS2, setKeyS2] = useState("");
  const [keyS3, setKeyS3] = useState("");

  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);

  const [keySearch4, setKeySearch4] = useState("");
  let seachbykey = useDebounce(keySearch4);
  const [team_sale, setTeamSale] = useState<string>();
  const [album_name, setAlbumName] = useState<string>();
  const [modal, setModal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });
  let keySearch = useDebounce(keyS, 300);
  let keySearch1 = useDebounce(keyS1, 300);
  let keySearch2 = useDebounce(keyS2, 300);
  let keySearch3 = useDebounce(keyS3, 300);
  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });
  };

  //thêm
  useEffect(() => {
    (async () => {
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_team_sale"
      );
      console.log(
        "tree",
        treeArray({
          data: rsSales.result.map((team_sale: listSale) => ({
            title: team_sale.name,
            value: team_sale.name,
            ...team_sale,
          })),
          keyValue: "value",
          parentField: "parent_sales_person",
        })
      );

      setListSales(
        treeArray({
          data: rsSales.result.map((team_sale: listSale) => ({
            title: team_sale.name,
            value: team_sale.name,
            ...team_sale,
          })),
          keyValue: "value",
          parentField: "parent_sales_person",
        })
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_sale_person",
        {
          params: {
            team_sale: team_sale,
            key_search: seachbykey,
          },
        }
      );
      let { message: results } = rsEmployee;
      setListEmployees(
        results.map((employee_filter: employee) => ({
          value: employee_filter.employee_code,
          label: employee_filter.employee_name || employee_filter.employee_code,
        }))
      );
    })();
  }, [team_sale, seachbykey]);

  useEffect(() => {
    (async () => {
      const rsCustomer = await AxiosService.get(
        "/api/method/mbw_dms.api.selling.customer.list_customer"
      );

      let { result } = rsCustomer;

      setCustomerGroup(
        result.data.map((customer: any) => ({
          label: customer.customer_name,
          value: customer.customer_name,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.table({
        customer_name,
        creation: creation,
        team_sale,
        employee,
        album_name: album,
      });
      const rsAlbum = await AxiosService.get(
        "/api/method/mbw_dms.api.album.list_monitor_album",
        {
          params: {
            customer_name,
            creation: creation,
            team_sale,
            employee,
            album_name: album,
          },
        }
      );
      setDataAlbum(rsAlbum.result);
    })();
  }, [album, customer_name, creation, team_sale, employee]);

  useEffect(() => {
    (async () => {
      const rsAlbum = await AxiosService.get(
        "/api/method/mbw_dms.api.album.list_album"
      );
      setCreation(dateNow);
      setDataFilterAlbum(rsAlbum.result);
    })();
  }, []);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    setCreation(dateString?.format("YYYY-MM-DD"));
  };
  return (
    <>
      <HeaderPage title="Giám sát chụp ảnh khách hàng" />
      <div className="bg-white rounded-md py-7 px-4">
        <Form layout="vertical" className="flex flex-wrap justify-start items-center">
          <Row className="" gutter={[8, 8]}>
            <FormItemCustom label={"Ngày chụp"} className="w-[175px] border-none mr-2">
              <DatePicker
                format={"DD-MM-YYYY"}
                className="!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]"
                defaultValue={dayjs(dateNow)}
                onChange={onChange}
              />
            </FormItemCustom>
            <FormItemCustom label={"Nhóm bán hàng"} className="w-[175px] border-none mr-2">
              <TreeSelect
                showSearch
                treeData={[
                  { label: "Tất cả nhân viên", value: "" },
                  ...listSales,
                ]}
                onChange={(value: string) => {
                  setTeamSale(value);
                }}
              />
            </FormItemCustom>

            <FormItemCustom label={"Nhân viên"} className="w-[175px] border-none mr-2">
              <Select
                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                options={[
                  { label: "Tất cả nhân viên", value: "" },
                  ...listEmployees,
                ]}
                showSearch
                defaultValue={""}
                notFoundContent={null}
                onSearch={setKeySearch4}
                onChange={(value) => {
                  setEmployee(value);
                }}
                allowClear
              />
            </FormItemCustom>

            <FormItemCustom
              label={"Khách hàng"}
              className="w-[175px] border-none mr-2"
              name="customer"
            >
              <Select
                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                defaultValue={""}
                options={[
                  { label: "Tất cả khách hàng", value: "" },
                  ...listCustomerGroup,
                ]}
                showSearch
                notFoundContent={null}
                onSearch={(value: string) => setKeyS1(value)}
                onChange={(value) => {
                  setCustomer_name(value);
                }}
              />
            </FormItemCustom>

            <FormItemCustom label={"Album"} className="w-[175px] border-none mr-2">
              <Select
                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                showSearch
                defaultValue={""}
                notFoundContent={null}
                options={[
                  { label: "Tất cả Album", value: "" },
                  ...dataFilterAlbum.map((album: any) => ({
                    label: album.ten_album,
                    value: album.ten_album,
                  })),
                ]}
                onSearch={(value: string) => setKeyS(value)}
                onChange={(value) => {
                  // console.log(value);

                  setAlbum(value);
                }}
              />
            </FormItemCustom>
          </Row>
        </Form>

        <div className="pt-5">
          <Row gutter={[16, 8]}>
            {dataAlbum.length > 0 &&
              dataAlbum.map((data: any) => (
                <Col
                  key={data?.name}
                  className="flex justify-center items-center px-4 pt-4 rounded-lg"
                  span={4}
                >
                  <CardCustom
                    hoverable
                    // setModal({ open: true, id: data?.name })
                    onClick={() => setModal({ open: true, id: data })}
                    cover={
                      <img
                        className="!object-cover"
                        alt={data?.image_url}
                        src={data?.image_url}
                      />
                    }
                  >
                    <div className="flex items-center h-3">
                      <UserIcon />
                      <p>{data?.employee[0]?.first_name}</p>
                    </div>
                    <div className="flex items-center pt-2 h-5">
                      <PictureIcon />
                      <p>{data?.album_name}</p>
                    </div>
                  </CardCustom>
                </Col>
              ))}
          </Row>

          <Modal
            width={1064}
            title="Hình ảnh khách hàng"
            open={modal.open}
            onCancel={closeModal}
            footer={null}
          >
            <DetailModal data={modal.id} />
          </Modal>
        </div>
      </div>
    </>
  );
}
