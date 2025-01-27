import ProfileSection from "./ProfileSection";
import DashboardContent from "./DashboardContent";
import { auth } from "../../../auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Dashboard content on the left */}
      <div className="flex-grow p-4">
        <DashboardContent />
      </div>

      {/* Profile section on the right */}
      <div className="w-1/16 p-2 bg-gray-100 border-1 border-gray-300">
        <ProfileSection session = {session}/>
      </div>
    </div>
  );
};

export default Page;
