import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import useHandlers from "../../hooks/useHandlers";
import { Collapse, Table } from "antd";
import { columns } from "../../utils/tableItens";
const { Panel } = Collapse;

function UploadFile() {
  const { extract, onChangeFile, loading } = useHandlers();

  return (
    <div>
      <Dragger
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        headers={{ authorization: "authorization-text" }}
        onChange={onChangeFile}
        maxCount={1}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <div>
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="This is panel header 1" key="1">
            <Table columns={columns} dataSource={extract} loading={loading} />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default UploadFile;
