import { useEffect, useRef, useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Col, Row, Select, Modal } from "antd";
import { CardCustom } from "../../components/card/card";
import { UserIcon } from "../../icons/user";
import { PictureIcon } from "../../icons/picture";
import { rsDataFrappe } from "../../types/response";
import { AxiosService } from "../../services/server";
import DetailModal from "./modal/detail";
import useDebounce from "../../hooks/useDebount";

export default function MonitorAlbum() {
  const [listCustomerGroup, setCustomerGroup] = useState<any[]>([]);
  const [listEmployee, setListEmployee] = useState<any[]>([]);
  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataFilterAlbum, setDataFilterAlbum] = useState([]);
  const [dataPerson, setDataPerson] = useState([]);
  const [album, setAlbum] = useState<string>()
  const [keyS, setKeyS] = useState("");
  const [modal, setModal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });
  let keySearch = useDebounce(keyS, 300);
  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });
  };

  useEffect(() => {
    (async () => {
      let rsCustomer: rsDataFrappe<any[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: "",
            doctype: "Customer Group",
            ignore_user_permissions: 0,
            reference_doctype: "Customer",
          },
        }
      );

      let { results } = rsCustomer;

      setCustomerGroup(
        results.map((customer_group) => ({
          label: customer_group.value,
          value: customer_group.value,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<any[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: "",
            doctype: "Employee",
            ignore_user_permissions: 0,
            reference_doctype: "",
          },
        }
      );

      let { results } = rsEmployee;

      setListEmployee(
        results.map((employee) => ({
          label: employee.description,
          value: employee.value,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const rsAlbum = await AxiosService.get(
        "/api/method/mbw_dms.api.album.list_album_image"
      );

      setDataFilterAlbum(rsAlbum.result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const rsAlbum = await AxiosService.get(
        "/api/method/mbw_dms.api.album.list_album_image", {
        params: {
          album
        }
      }
      );

      const rsPerson = await AxiosService.get(
        "/api/method/mbw_dms.api.selling.customer.list_sale_person"
      );

      // console.log("=---", rsPerson);

      setDataAlbum(rsAlbum.result);
      setDataPerson(rsPerson.result)
    })();
  }, [album]);

  return (
    <>
      <HeaderPage title="Giám sát chụp ảnh khách hàng" />
      <div className="bg-white rounded-md py-7 px-4">
        <div className="flex justify-start items-center">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Nhóm bán hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Nhân viên"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Loại khách hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Nhóm khách hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Album"}
          ></FormItemCustom>
        </div>
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={dataPerson.map((person: any) => ({
                label: person.sales_person_name,
                value: person.sales_person_name,
              }))}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listEmployee}
            />
          </FormItemCustom>

          <FormItemCustom
            className="w-[200px] border-none mr-2"
            name="customer_type"
          >
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={[
                {
                  label: "Company",
                  value: "Company",
                },
                {
                  label: "Individual",
                  value: "Individual",
                },
              ]}
            />
          </FormItemCustom>

          <FormItemCustom
            className="w-[200px] border-none mr-2"
            name="customer_group"
          >
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listCustomerGroup}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              showSearch
              notFoundContent={null}
              options={dataFilterAlbum.map((album: any) => ({
                label: album.album_name,
                value: album.name,
              }))}
              onSearch={(value: string) => setKeyS(value)}
              onChange={(value) => {
                setAlbum(value)
              }}
            />
          </FormItemCustom>
        </div>

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
                    cover={<img alt={data?.image_url} src={data?.image_url} />}
                  >
                    <div className="flex items-center h-3">
                      <UserIcon />
                      <p>{data?.detail_employee[0].first_name}</p>
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
