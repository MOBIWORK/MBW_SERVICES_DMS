import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

interface importProps {
  handleFile: any,
  removeFile: any,
  files: any
}
export function ImportCustomer({handleFile,files,removeFile}: importProps) {
  const props: UploadProps = {
    name: 'file',
    // multiple: false,
    accept: ".xls,.xlsx",
    fileList: files,
    // action: "",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      let file = info.file.originFileObj
      handleFile(file)
      
    },
    onRemove:removeFile
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
