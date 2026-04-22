import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common1/Button/Button";
import Card from "../components/Card";
import "./Purchases.css";

const NEW_KIT = {
  name: "New Kit",
  price: 49.99,
  currency: "USD",
  description:
    "Soil monitoring hardware with sensors, mounting kit, and quick-start guide.",
};

export default function Purchases() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const estimatedTotal = useMemo(() => quantity * NEW_KIT.price, [quantity]);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: NEW_KIT.currency,
  }).format(estimatedTotal);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(0, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const goToPaymentConfirmation = () => {
    navigate("/purchases/payment-confirmation", {
      state: {
        kitName: NEW_KIT.name,
        quantity,
        unitPrice: NEW_KIT.price,
        currency: NEW_KIT.currency,
      },
    });
  };

  return (
    <div className="purchases-page">
      <h1>Upgrades &amp; add-ons</h1>
      <p className="purchases-subtitle">Extend Small Farmer with extra features.</p>

      <section className="purchases-kit-section" aria-labelledby="new-kit-heading">
        <h2 id="new-kit-heading" className="purchases-section-title">
          {NEW_KIT.name}
        </h2>
        <p className="purchases-section-intro">
          Order hardware kits for another field or backup sensors.
        </p>
        <Card>
          <p className="purchase-card-desc">{NEW_KIT.description}</p>
          <div className="purchase-summary">
            <div className="purchase-summary-row">
              <span>Item</span>
              <strong>{NEW_KIT.name}</strong>
            </div>
            <div className="purchase-summary-row">
              <span>Number of kits</span>
              <div className="purchase-quantity-control">
                <button
                  type="button"
                  className="purchase-quantity-button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 0}
                  aria-label="Decrease kit quantity"
                >
                  -
                </button>
                <strong className="purchase-quantity-value">{quantity}</strong>
                <button
                  type="button"
                  className="purchase-quantity-button"
                  onClick={increaseQuantity}
                  aria-label="Increase kit quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="purchase-summary-row">
              <span>Estimated total</span>
              <strong className="purchase-card-price">{formattedTotal}</strong>
            </div>
          </div>
          <Button
            variant="primary"
            type="button"
            onClick={goToPaymentConfirmation}
            disabled={quantity === 0}
          >
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
