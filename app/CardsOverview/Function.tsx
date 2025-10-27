"use client";

import React, { useState } from "react";
import Dropdown from "../components/Dropdown";
import Display from "../components/Display";

export default function Function() {
  const [selected, setSelected] = useState("");
  return (
    <div>
      <Dropdown onChange={setSelected} />
      <Display value={selected} />
    </div>
  );
}
