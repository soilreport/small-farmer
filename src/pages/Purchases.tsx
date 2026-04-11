import { useNavigate } from "react-router-dom";
import Button from "../components/common1/Button/Button";
import Card from "../components/Card";
import "./Purchases.css";

const ADDITIONAL_KIT = {
  name: "Additional kit",
  description:
    "Extra soil monitoring hardware: sensors, mounting kit, and quick-start guide.",
};

export default function Purchases() {
  const navigate = useNavigate();

  const goToPaymentConfirmation = () => {
    navigate("/purchases/payment-confirmation", {
      state: { kitName: ADDITIONAL_KIT.name },
    });
  };

  return (
    <div className="purchases-page">
      <h1>Upgrades &amp; add-ons</h1>
      <p className="purchases-subtitle">Extend Small Farmer with extra features.</p>

      <section className="purchases-kit-section" aria-labelledby="additional-kit-heading">
        <h2 id="additional-kit-heading" className="purchases-section-title">
          {ADDITIONAL_KIT.name}
        </h2>
        <p className="purchases-section-intro">
          Order an extra hardware kit for another field or backup sensors. Available only here on Purchases.
        </p>
        <Card>
          <p className="purchase-card-desc">{ADDITIONAL_KIT.description}</p>
          <Button variant="primary" type="button" onClick={goToPaymentConfirmation}>
            Buy new kit
          </Button>
        </Card>
      </section>

      <p className="purchases-note">
        This is a demo. In production you would connect to a payment provider.
      </p>
    </div>
  );
}
