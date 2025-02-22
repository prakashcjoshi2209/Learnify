

import Notification from "../Notification/Notification";
import Footer from "../Footer/page";
const NotificationsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow flex items-start justify-center py-10 px-6">
        <Notification />
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
