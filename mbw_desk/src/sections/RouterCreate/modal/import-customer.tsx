import React from 'react'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;



interface importProps {
  handleFile: () => file 
}
export function ImportCustomer({handleFile}: importProps) {
  const props: UploadProps = {
    name: 'file',
    // multiple: false,
    accept: ".xls,.xlsx",
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      let file = info.file.originFileObj
      handleFile(file)
      
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files,e);
    },
  };
  return (
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Kéo, thả hoặc chọn tệp để tải lên</p>
    <p className="ant-upload-hint">
      Hỗ trợ tệp .xls, .xlsx
    </p>
  </Dragger>
  )
}
