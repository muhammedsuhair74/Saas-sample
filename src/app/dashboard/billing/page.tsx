import { PricingCard } from "@/components/PricingCard";
import { getUserSubscriptionPlan } from "@/lib/stripe"; // We'll create this helper next

const BillingPage = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  const plans = [
    {
      title: "Free",
      price: "₹0",
      features: ["Basic features", "Community support"],
      stripePriceId: null,
    },
    {
      title: "Pro",
      price: "₹499/mo",
      features: ["Everything in Free", "Advanced features", "Priority support"],
      stripePriceId: "price_pro_plan_id", // Replace with real Stripe Price ID
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: ["All Pro features", "Dedicated support", "Custom solutions"],
      stripePriceId: null,
    },
  ];

  async function handleSubscribe(priceId: string | null) {
    if (!priceId) return;

    const res = await fetch("/api/stripe/checkout-session", {
      method: "POST",
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  async function handleManageBilling() {
    const res = await fetch("/api/stripe/portal-session");
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.title}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            isCurrent={subscriptionPlan.name === plan.title}
            onClick={() =>
              subscriptionPlan.name === plan.title
                ? handleManageBilling()
                : handleSubscribe(plan.stripePriceId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BillingPage;
