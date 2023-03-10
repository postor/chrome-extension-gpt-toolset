import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Popup from "./popup/Popup";

// @ts-ignore
let root = createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
