import React, { useState } from "react";
import { parse as parseOFX } from "ofx-js";
import { message } from "antd";
import { formatCurrency, formatDate } from "../utils/functionsToFile";

export default function useHandlers() {
  const [extract, setExtract] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeFile = (info) => {
    setLoading(true);

    const reader = new FileReader();

    reader.readAsText(info.file.originFileObj);

    reader.onload = (e) => {
      parseOFX(e.target.result)
        .then((res) => {
          const uploadedExtract =
            res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN;

          const accountingNumber =
            res?.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKACCTFROM?.ACCTID;

          if (uploadedExtract && accountingNumber) {
            const formatedExtract = uploadedExtract.map((item) => {
              const memo = Buffer.from(item.MEMO, "utf-8").toString("utf-8");

              return {
                entryDate: formatDate(item.DTPOSTED),
                type: Number(item.TRNAMT) < 0 ? 1 : 2,
                complement: memo,
                amount: formatCurrency(Math.abs(Number(item.TRNAMT))),
              };
            });

            setExtract(formatedExtract);
          }
        })
        .catch((err) => {
          setHasError(true);
        })
        .finally(() => {
          if (
            hasError &&
            (info.file.status === "done" || info.file.status === "error")
          ) {
            return message.error(`File upload failed.`);
          }

          if (info.file.status === "done") {
            setLoading(false);

            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === "error") {
            setLoading(false);

            message.error(`${info.file.name} file upload failed.`);
          }
        });
    };
  };

  return { extract, onChangeFile, loading };
}
