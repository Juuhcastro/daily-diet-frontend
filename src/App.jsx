import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Home from "./pages/Home";

import MealList from "./pages/Meals/List";
import CreateMeal from "./pages/Meals/Create";
import EditMeal from "./pages/Meals/Edit";
import ViewMeal from "./pages/Meals/View";

import Metrics from "./pages/Metrics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Refeições */}
        <Route path="/meals" element={<MealList />} />
        <Route path="/meals/create" element={<CreateMeal />} />
        <Route path="/meals/:id" element={<ViewMeal />} />
        <Route path="/meals/:id/edit" element={<EditMeal />} />

        {/* Métricas */}
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
