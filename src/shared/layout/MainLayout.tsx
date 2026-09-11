import { Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CosmicBackground } from "../components/CosmicBackground";

export function MainLayout() {
  return <><CosmicBackground /><Navbar /><div className="app-shell"><Outlet /></div><Footer /></>;
}
