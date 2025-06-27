// services/payoutService.ts
import axios from "@/lib/axios";

export const getPayoutInfo = async () => {
  const res = await axios.get("/owner/payout");
  return res.data.data;
};

export const updatePayoutInfo = async (data: any) => {
  const res = await axios.put("/owner/payout", data);
  return res.data;
};

export const getBanks = async () => {
  const res = await axios.get("/owner/banks");
  return res.data.data.beneficiary_banks;
};
export const getAllPayout = async () => {
  const res = await axios.get("/admin/payouts");
  return res.data.data;
};

export const sendPayout = async (payoutId: string) => {
  const res = await axios.post(`/admin/payouts/${payoutId}/send`);
  return res.data;
};
