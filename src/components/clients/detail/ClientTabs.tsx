"use client";

import { useState } from "react";
import { ClientProfile } from "@/types/client";
import { ClientBasicInfo } from "./ClientBasicInfo";
import { ClientActiveLoans } from "./ClientActiveLoans";
import { ClientTimeline } from "./ClientTimeline";

interface ClientTabsProps {
  client: ClientProfile;
}

type TabKey = "info" | "loans" | "history" | "receipts";

export function ClientTabs({ client }: ClientTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("info");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "info", label: "Info" },
    { key: "loans", label: "Loans" },
    { key: "history", label: "History" },
    { key: "receipts", label: "Receipts" },
  ];

  return (
    <>
      <div className="sticky top-[52px] bg-white dark:bg-background z-10 w-full">
        <div className="flex border-b border-primary/10 px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center justify-center pb-3 pt-4 flex-1 transition-all border-b-2 outline-none ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-zinc-500 hover:text-black"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest">{tab.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        {activeTab === "info" && <ClientBasicInfo client={client} />}
        {activeTab === "loans" && <ClientActiveLoans loans={client.loans} />}
        {activeTab === "history" && <ClientTimeline events={client.events} />}
        {activeTab === "receipts" && (
          <div className="flex flex-col items-center justify-center p-10 text-zinc-500">
            <p className="font-semibold">No receipts available yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
