import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common1/Button/Button";
import Card from "../../components/Card";
import "./PaymentConfirmation.css";

export default function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const kitName =
    (location.state as { kitName?: string } | null)?.kitName ?? "Additional kit";

  return (
    <div className="payment-confirmation-page">
      <h1>Payment confirmation</h1>
      <p className="payment-confirmation-lead">
        Review your order before completing payment.
      </p>

      <Card title="Order summary">
        <div className="payment-confirmation-summary">
          <div className="payment-confirmation-row">
            <span>Item</span>
            <strong>{kitName}</strong>
          </div>
          <div className="payment-confirmation-row">
            <span>Estimated total</span>
            <strong className="payment-confirmation-total">—</strong>
          </div>
        </div>
        <p className="payment-confirmation-demo">
          Demo only: connect your payment provider here (card, wallet, etc.).
        </p>
        <div className="payment-confirmation-actions">
          <Button variant="primary" type="button">
            Confirm payment
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/purchases")}
          >
            Back to purchases
          </Button>
        </div>
      </Card>
    </div>
  );
}
