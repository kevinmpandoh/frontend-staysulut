import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import BillingList from "./BillingList";

const TagihanPage = async ({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) => {
  const { bookingId } = await params;

  return (
    <div>
      <Tabs defaultValue="unpaid" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unpaid">Belum Dibayar</TabsTrigger>
          <TabsTrigger value="paid">Sudah Dibayar</TabsTrigger>
        </TabsList>

        <TabsContent value="unpaid">
          <BillingList bookingId={bookingId} status="unpaid" />
        </TabsContent>

        <TabsContent value="paid">
          <BillingList bookingId={bookingId} status="paid" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TagihanPage;
