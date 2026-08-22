import { Routes,Route } from "react-router-dom";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import HomePage from "./pages/HomePage";
import FarmerRegisterPage from "./pages/FarmerRegisterPage";
import FarmerLoginPage from "./pages/FarmerLoginPage";
import OfficerLoginPage from "./pages/OfficerLoginPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import FarmerProfilePage from "./pages/FarmerProfilePage";
import SchemesPage from "./pages/SchemesPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import BookmarksPage from "./pages/BookmarksPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminStatePage from "./pages/admin/AdminStatePage";
import AdminDistrictPage from "./pages/admin/AdminDistrictPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App(){
 return <div className="min-h-screen bg-slate-50 text-slate-900"><SiteHeader/><main><Routes>
  <Route path="/" element={<HomePage/>}/><Route path="/register" element={<FarmerRegisterPage/>}/><Route path="/farmer/login" element={<FarmerLoginPage/>}/><Route path="/officer/login" element={<OfficerLoginPage/>}/>
  <Route path="/farmer/dashboard" element={<ProtectedRoute roles={["farmer"]}><FarmerDashboardPage/></ProtectedRoute>}/>
  <Route path="/farmer/profile" element={<ProtectedRoute roles={["farmer"]}><FarmerProfilePage/></ProtectedRoute>}/>
  <Route path="/farmer/schemes" element={<ProtectedRoute roles={["farmer"]}><SchemesPage/></ProtectedRoute>}/>
  <Route path="/farmer/applications" element={<ProtectedRoute roles={["farmer"]}><ApplicationsPage/></ProtectedRoute>}/>
  <Route path="/farmer/bookmarks" element={<ProtectedRoute roles={["farmer"]}><BookmarksPage/></ProtectedRoute>}/>
  <Route path="/admin" element={<ProtectedRoute roles={["district_admin","state_admin","super_admin"]}><AdminDashboardPage/></ProtectedRoute>}/>
  <Route path="/admin/state/:stateId" element={<ProtectedRoute roles={["district_admin","state_admin","super_admin"]}><AdminStatePage/></ProtectedRoute>}/>
  <Route path="/admin/district/:districtId" element={<ProtectedRoute roles={["district_admin","state_admin","super_admin"]}><AdminDistrictPage/></ProtectedRoute>}/>
  <Route path="*" element={<NotFoundPage/>}/>
 </Routes></main><SiteFooter/></div>;
}
