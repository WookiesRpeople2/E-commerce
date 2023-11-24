import { Heading } from "@/components/customUi/heading";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import prismadb from "@/lib/prismadb";
import { DashboardCards } from "./components/dashboardCards";
import { MonthleyPaymentChart } from "./components/monthleyPaymentChart";

const getPaymentsInDateRange = async (
  params: string,
  startDate: Date,
  endDate: Date
) => {
  return await prismadb.payment.findMany({
    where: {
      storeId: params,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};

export default async function DashboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const today = new Date();

  const startOfWeekDate = startOfWeek(today);
  const endOfWeekDate = endOfWeek(today);

  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);

  const startOfYearDate = startOfYear(today);
  const endOfYearDate = endOfYear(today);

  const paymentsThisWeek = (
    await getPaymentsInDateRange(params.storeId, startOfWeekDate, endOfWeekDate)
  ).length;

  const paymentsThisMonth = await getPaymentsInDateRange(
    params.storeId,
    startOfMonthDate,
    endOfMonthDate
  );

  const paymentsThisYear = await getPaymentsInDateRange(
    params.storeId,
    startOfYearDate,
    endOfYearDate
  );

  const mostBoughtProduct = paymentsThisMonth.reduce(
    (mostBought, payment) => {
      if (!mostBought || payment.quantity > mostBought.quantity) {
        return {
          productName: payment.productName,
          quantity: payment.quantity,
        };
      }
      return mostBought;
    },
    { productName: "", quantity: 0 }
  );

  const paymentsCountByMonth = paymentsThisYear.reduce(
    (acc, payment) => {
      const monthIndex = new Date(payment.createdAt).getMonth();
      acc[monthIndex]++;
      return acc;
    },
    Array.from({ length: 12 }, () => 0)
  );

  return (
    <div className="px-4 space-y-4">
      <Heading
        title="DashBoard"
        discreption="view the analytics of your store"
      />
      <div>
        <DashboardCards
          paymentsThisWeek={paymentsThisWeek}
          paymentsThisMonth={paymentsThisMonth.length}
          paymentsThisYear={paymentsThisYear.length}
          mostBoughtProduct={mostBoughtProduct}
        />
      </div>
      <div className="flex justify-center items-center md:h-96 pb-5">
        <MonthleyPaymentChart paymentsCountByMonth={paymentsCountByMonth} />
      </div>
    </div>
  );
}
