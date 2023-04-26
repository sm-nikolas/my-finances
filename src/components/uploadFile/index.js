import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { parse as parseOFX } from "ofx-js";
import { message } from "antd";

function UploadFile() {
  const handleUpload = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    debugger;

    // Aqui você pode enviar o arquivo a uma API de upload usando uma requisição POST
    fetch("https://your-api-endpoint.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Aqui você pode tratar a resposta da API
        onSuccess(data, file);
        message.success(`${file.name} file uploaded successfully.`);
      })
      .catch((error) => {
        onError(error, file);
        message.error(`${file.name} file upload failed.`);
      });
  };

  const props = {
    name: "file",
    multiple: true,
    action: "https://63e303fc619fce55d411ebb5.mockapi.io",
    onChange(info) {
      let { status } = info.file;

      if (status === "uploading") return;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(info.file.originFileObj);
        reader.onload = (e) => {
          parseOFX(e.target.result)
            .then(async (res) => {
              const uploadedExtract =
                res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST
                  ?.STMTTRN;

              const accountingNumber =
                res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKACCTFROM?.ACCTID;

              if (uploadedExtract && accountingNumber) {
                const formatedExtract = uploadedExtract.map((item) => {
                  return {
                    amount: Math.abs(Number(item.TRNAMT)),
                    complement: item.MEMO,
                    type: Number(item.TRNAMT) < 0 ? 1 : 2,
                    entryDate: item.DTPOSTED,
                  };
                });
              }

              info.file = { ...info.file, status: "done" };
              message.success(`${info.file.name} file uploaded successfully.`);
            })
            .catch((err) => {
              message.error(`${info.file.name} file upload failed.`);
            })
            .finally(() => {});
        };
      });
    },
    // customRequest:handleUpload
  };

  return (
    <Dragger {...props}>
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
  );
}

export default UploadFile;
