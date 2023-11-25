"use client";
import { DashboardCard } from "@/components/customUi/dashboardCard";
import { CreditCard, ShoppingBasket } from "lucide-react";

type DashboardCardsProps = {
  paymentsThisWeek: number;
  paymentsThisMonth: number;
  paymentsThisYear: number;
  mostBoughtProduct: { productName: string; quantity: number };
};

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  paymentsThisWeek,
  paymentsThisMonth,
  paymentsThisYear,
  mostBoughtProduct,
}) => {
  const cards = [
    {
      title: "Weekly",
      discription: "see the payments made this week",
      icon: <CreditCard className="mr-auto" />,
      value: paymentsThisWeek,
      id: 1,
    },
    {
      title: "Monthley",
      discription: "see the payments made this month",
      icon: <CreditCard className="mr-auto" />,
      value: paymentsThisMonth,
    },
    {
      title: "Yearly",
      discription: "see the payments made this year",
      icon: <CreditCard className="mr-auto" />,
      value: paymentsThisYear,
    },
    {
      title: "Most Bought",
      discription: "most bought product this month",
      icon: <ShoppingBasket className="mr-auto" />,
      value: (
        <div className="flex flex-col">
          <span>Product: {mostBoughtProduct.productName}</span>
          <span>bought: {mostBoughtProduct.quantity}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:justify-start lg:space-x-6 lg:space-y-0">
      {cards.map((card) => (
        <DashboardCard
          title={card.title}
          discription={card.discription}
          className="w-full"
          key={card.title}
        >
          <div className="flex">
            {card.icon}
            {card.value}
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};
