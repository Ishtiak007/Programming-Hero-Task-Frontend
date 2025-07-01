import SalesHistory from "../../../../../../components/modules/JoinOrder/JoinedHistory";
import { getSalesHistory } from "../../../../../../services/JoinApi";

export const dynamic = "force-dynamic";

export default async function SalesHistoryPage() {
  const { data } = await getSalesHistory();
  const salesHistory = data?.result ?? [];
  return (
    <div className="p-4">
      <SalesHistory salesHistory={salesHistory} />
    </div>
  );
}
