import CryptoJS from "crypto-js";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function generateSignature(data: string, secretKey: string) {
  const hash = CryptoJS.HmacSHA256(data, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
}

const EsewaPaymentForm = ({
  price,
  errorMessage,
}: {
  price: number;
  errorMessage: string | null;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleDonate = () => {
    const confirm = window.confirm(
      "Are you sure you want to donate this amount?"
    );
    if (confirm) {
      formRef.current?.submit();
    }
  };
  const transactionUuid = uuidv4();
  const secretKey = "8gBm/:&EnhH.1/q";
  const signedFieldNames = "total_amount,transaction_uuid,product_code";

  const formData = {
    amount: price,
    tax_amount: 0,
    total_amount: price,
    transaction_uuid: transactionUuid,
    product_code: "EPAYTEST",
    product_service_charge: 0,
    product_delivery_charge: 0,
    success_url: "https://facebook.com",
    failure_url: "http://arunkhatri.com.np",
    signed_field_names: signedFieldNames,
    signature: generateSignature(
      `total_amount=${price},transaction_uuid=${transactionUuid},product_code=EPAYTEST`,
      secretKey
    ),
  };

  return (
    <form
      ref={formRef}
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input type="hidden" name="amount" value={formData.amount} />
      <input type="hidden" name="tax_amount" value={formData.tax_amount} />
      <input type="hidden" name="total_amount" value={formData.total_amount} />
      <input
        type="hidden"
        name="transaction_uuid"
        value={formData.transaction_uuid}
      />
      <input type="hidden" name="product_code" value={formData.product_code} />
      <input
        type="hidden"
        name="product_service_charge"
        value={formData.product_service_charge}
      />
      <input
        type="hidden"
        name="product_delivery_charge"
        value={formData.product_delivery_charge}
      />
      <input type="hidden" name="success_url" value={formData.success_url} />
      <input type="hidden" name="failure_url" value={formData.failure_url} />
      <input
        type="hidden"
        name="signed_field_names"
        value={formData.signed_field_names}
      />
      <input type="hidden" name="signature" value={formData.signature} />
      <button
        className="bg-primary text-white px-3 py-3 rounded hover:scale-105 transition duration-300"
        type="button"
        onClick={handleDonate}
        disabled={!!errorMessage}
      >
        Donate
      </button>
    </form>
  );
};

export default EsewaPaymentForm;
