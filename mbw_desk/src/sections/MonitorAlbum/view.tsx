import { useEffect, useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Col, Row, Select, Modal, DatePicker, DatePickerProps } from "antd";
import { CardCustom } from "../../components/card/card";
import { UserIcon } from "../../icons/user";
import { PictureIcon } from "../../icons/picture";
import { AxiosService } from "../../services/server";
import DetailModal from "./modal/detail";
import useDebounce from "../../hooks/useDebount";
import dayjs from "dayjs";
export default function MonitorAlbum() {
  const [listCustomerGroup, setCustomerGroup] = useState<any[]>([]);
  const [listEmployee, setListEmployee] = useState<any[]>([]);
  const [dataAlbum, setDataAlbum] = useState([]);
  const [dataFilterAlbum, setDataFilterAlbum] = useState([]);
  const [dataPerson, setDataPerson] = useState([]);
  const [album, setAlbum] = useState<string>();
  const [customer_name, setCustomer_name] = useState<string>();
  const [employee, setEmployee] = useState<string>();
  const [team_sale, setPerson] = useState<string>();
  const [creation, setCreation] = useState<any>();
  const [keyS, setKeyS] = useState("");
  const [keyS1, setKeyS1] = useState("");
  const [keyS2, setKeyS2] = useState("");
  const [keyS3, setKeyS3] = useState("");
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

  const dateNow = new Date().toJSON().slice(0, 10);
  // const now = Date.parse(dateNow as string) / 1000;
  // console.log("dateNow", now);

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
      const rsEmployee = await AxiosService.get(
        "/api/method/mbw_dms.api.note.list_email"
      );
      let { result } = rsEmployee;
      setListEmployee(
        result.data.map((employee: any) => ({
          label: employee.first_name,
          value: employee.name,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const rsAlbum = await AxiosService.get(
        "/api/method/mbw_dms.api.album.list_monitor_album"
      );
      setDataFilterAlbum(rsAlbum.result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const rsAlbum = await AxiosService.get(
        "/api/method/mbw_dms.api.album.list_monitor_album",
        {
          params: {
            album,
            customer_name,
            creation,
            team_sale,
            employee,
          },
        }
      );

      const rsPerson = await AxiosService.get(
        "/api/method/mbw_dms.api.selling.customer.list_sale_person"
      );

      if (creation === null || creation === undefined || creation === "") {
        setCreation(dateNow);
      }

      setDataAlbum(rsAlbum.result);
      setDataPerson(rsPerson.result);
    })();
  }, [album, customer_name, creation, team_sale, employee]);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    setCreation(dateString?.format("YYYY-MM-DD"));
  };
  return (
    <>
      <HeaderPage title="Giám sát chụp ảnh khách hàng" />
      <div className="bg-white rounded-md py-7 px-4">
        <div className="flex justify-start items-center">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Ngày chụp"}
          ></FormItemCustom>
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
            label={"Khách hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Album"}
          ></FormItemCustom>
        </div>
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              defaultValue={dayjs(creation)}
              onChange={onChange}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Tất cả nhóm bán hàng", value: "" },
                ...dataPerson.map((person: any) => ({
                  label: person.sales_person_name,
                  value: person.sales_person_name,
                })),
              ]}
              showSearch
              notFoundContent={null}
              onSearch={(value: string) => setKeyS3(value)}
              onChange={(value) => {
                setPerson(value);
              }}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={[
                { label: "Tất cả nhân viên", value: "" },
                ...listEmployee,
              ]}
              showSearch
              defaultValue={""}
              notFoundContent={null}
              onSearch={(value: string) => setKeyS2(value)}
              onChange={(value) => {
                setEmployee(value);
              }}
            />
          </FormItemCustom>

          <FormItemCustom
            className="w-[200px] border-none mr-2"
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

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              showSearch
              defaultValue={""}
              notFoundContent={null}
              options={[
                { label: "Tất cả Album", value: "" },
                ...dataFilterAlbum.map((album: any) => ({
                  label: album.album_name,
                  value: album.name,
                })),
              ]}
              onSearch={(value: string) => setKeyS(value)}
              onChange={(value) => {
                // console.log(value);

                setAlbum(value);
              }}
            />
          </FormItemCustom>
        </div>

        <div className="pt-5">
          <Row gutter={[16, 8]}>
            {dataAlbum.length > 0 &&
              dataAlbum.map((data: any) => (
                <Col
                  key={data?.DMS_ID}
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
