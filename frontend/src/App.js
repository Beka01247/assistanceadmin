import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import UserControl from "./components/UserControl/UserControl";
import ContentControl from "./components/ContentControl/ContentControl";
import CreateNotification from "./components/Notification/CreateNotification";
import CategoryControl from "./components/CategoryControl/CategoryControl";
import IncidentModeration from "./components/IncidentModeration/IncidentModeration";
import ModerationChat from "./components/ModerationChat/ModerationChat";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import UserActivity from "./components/UserActivity/UserActivity";
import StudyCenters from "./components/StudyCenters/StudyCenters";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<UserControl />} />
        <Route
          path="/admin/user-control/activity/:userId"
          element={<UserActivity />}
        />
        <Route path="/admin/content" element={<ContentControl />} />
        <Route path="/admin/study-centers" element={<StudyCenters />} />
        <Route path="/admin/notification" element={<CreateNotification />} />
        <Route path="/admin/category-control" element={<CategoryControl />} />
        <Route path="/admin/moderation-chat" element={<ModerationChat />} />
        <Route
          path="/admin/incident-moderation"
          element={<IncidentModeration />}
        />
        <Route path="/admin/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
