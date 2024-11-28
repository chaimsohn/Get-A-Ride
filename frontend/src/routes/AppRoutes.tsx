import { Route, Routes } from "react-router-dom";
import NewRide from "../components/NewRideComponent";
import ConfirmRide from "../components/ConfirmRideComponent";
import HistoryRides from "../components/HistoryRidesComponent";

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="" Component={NewRide} />
      <Route path="confirm" Component={ConfirmRide} />
      <Route path="history" Component={HistoryRides} />
    </Routes>
  )
}