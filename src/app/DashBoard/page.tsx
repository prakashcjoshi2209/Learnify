

import ProfileSection from "./ProfileSection";
import DashboardContent from "./DashboardContent";
import { auth } from "../../../auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      {/* Left Side - Dashboard & Offers */}
      <div className="flex-grow p-6 space-y-6 overflow-auto">
        <DashboardContent />
        
      </div>

      {/* Right Side - Profile Section with Proper Spacing */}
      <div className="w-1/16 p-2 bg-gray-100  border-gray-300 ml-1 sticky top-0">
        <ProfileSection session={session} />
      </div>
    </div>
  );
};

export default Page;
