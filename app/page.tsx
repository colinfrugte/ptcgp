import React from "react";

import TCGCards from "./components/TCGCards";
import TCGSets from "./components/TCGSets";
import Filter from "./filter/page";
import Header from "./header/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-12 pt-10 md:px-8">
        <Header />
        <Filter />
        <TCGSets />
        <TCGCards />
      </div>
    </main>
  );
}
