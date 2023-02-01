import logo from './logo.svg';
import './App.css';
import {parse as parseOFX} from 'ofx-js';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

function App() {

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'file',
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          parseOFX(e.target.result)
      .then(async (res) => {
        const uploadedExtract =
          res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN;

        const accountingNumber =
          res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKACCTFROM?.ACCTID;

        if (uploadedExtract && accountingNumber) {
          const formatedExtract = uploadedExtract.map((item) => {
            return {
              amount: Math.abs(Number(item.TRNAMT)),
              complement: item.MEMO,
              isConciliated: 0,
              type: Number(item.TRNAMT) < 0 ? 1 : 2,
              entryDate: (item.DTPOSTED),
            };
          });
        } else {
        }

      
      })
      .catch((err) => {
        if (err.message.includes("Unexpected close tag")) {
        
        } else {
      
        }
      })
      .finally(() => {
      });
        };
      });
    },
  }

const handler = (file)=>{
  debugger
  var reader = new FileReader();
  reader.readAsText(file.value[0]);
  reader.onload = (e) => {
    parseOFX(e.target.result)
      .then(async (res) => {
        const uploadedExtract =
          res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN;

        const accountingNumber =
          res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKACCTFROM?.ACCTID;

        if (uploadedExtract && accountingNumber) {
          const formatedExtract = uploadedExtract.map((item) => {
            return {
              amount: Math.abs(Number(item.TRNAMT)),
              complement: item.MEMO,
              isConciliated: 0,
              type: Number(item.TRNAMT) < 0 ? 1 : 2,
              entryDate: (item.DTPOSTED),
            };
          });
        } else {
        }

      
      })
      .catch((err) => {
        if (err.message.includes("Unexpected close tag")) {
        
        } else {
      
        }
      })
      .finally(() => {
      });
  };
}
  
  return (
    <div className="App">
      <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </div>
  );
}

export default App;
