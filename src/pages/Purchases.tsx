import { useState } from "react";
import Button from "../components/common1/Button/Button";
import Card from "../components/Card";
import "./Purchases.css";

const UPGRADES = [
  {
    id: "pro",
    name: "Pro plan",
    description: "Unlimited devices, advanced analytics, and priority support.",
    price: "9.99",
    period: "/month",
  },
  {
    id: "export",
    name: "Export pack",
    description: "CSV/Excel export and scheduled reports.",
    price: "4.99",
    period: "/month",
  },
  {
    id: "alerts",
    name: "Smart alerts",
    description: "Custom thresholds and SMS/email notifications.",
    price: "2.99",
    period: "/month",
  },
];

export default function Purchases() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="purchases-page">
      <h1>Upgrades & add-ons</h1>
      <p className="purchases-subtitle">Extend Small Farmer with extra features.</p>
      <div className="purchases-grid">
        {UPGRADES.map((u) => (
          <Card key={u.id} title={u.name}>
            <p className="purchase-card-desc">{u.description}</p>
            <p className="purchase-card-price">${u.price}{u.period}</p>
            <Button
              variant={selected === u.id ? "primary" : "secondary"}
              onClick={() => setSelected(u.id)}
            >
              {selected === u.id ? "Selected" : "Select"}
            </Button>
          </Card>
        ))}
      </div>
      <p className="purchases-note">
        This is a demo. In production you would connect to a payment provider.
      </p>
    </div>
  );
}
