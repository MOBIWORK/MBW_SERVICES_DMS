/** @format */

import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useDispatch } from "react-redux";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({
  setPromotionListImages,
}: {
  setPromotionListImages: (value: any) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const dispatch = useDispatch();
  // Hàm xử lý preview hình ảnh
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Hàm xử lý khi thay đổi file upload
  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    // Cập nhật fileList và lấy URL của từng ảnh sau khi upload
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        return {
          url: file.url || (file.preview as string),
          name: file.name,
        };
      })
    );

    dispatch(setPromotionListImages(updatedFileList));
  };

  // Ngăn không tải file lên server
  const beforeUpload = () => {
    return false; // Không cho phép upload lên server
  };

  // Nút upload ảnh
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload} // Ngăn POST request
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          className="mr-5"
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => {
              if (!visible) {
                setPreviewImage("");
              }
            },
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImages;
