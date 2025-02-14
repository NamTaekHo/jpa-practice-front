import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import CoffeeList from "./components/CoffeeList";
import Nav from "./components/Nav";
import MemberList from "./components/MemberList";
import OrderList from "./components/OrderList";
import { CoffeeDetailPage } from "./pages/coffeeDetail";
import { CreateCoffeePage } from "./pages/createCoffee/createCoffee";
import { PatchCoffee } from "./pages/patchCoffee";
import { CreateMemberPage } from "./pages/createMember/createMember";
import { PatchMember } from "./pages/patchMember";
import { MemberDetailPage } from "./pages/memberDetail";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/coffees" element={<CoffeeList />} />
        <Route path="/coffees/:id" element={<CoffeeDetailPage />} />
        <Route path="/create/coffee" element={<CreateCoffeePage />} />
        <Route path="/members" element={<MemberList />} />
        <Route path="/create/member" element={<CreateMemberPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/patch/coffee/:id" element={<PatchCoffee />} />
        <Route path="/patch/member/:id" element={<PatchMember />} />
        <Route path="/members/:id" element={<MemberDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
