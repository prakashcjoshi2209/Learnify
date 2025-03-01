

// import ProfileSection from "./ProfileSection";
// import DashboardContent from "./DashboardContent";
// import { auth } from "../../../auth";

// const Page = async () => {
//   const session = await auth();
//   return (
//     <div className="flex flex-row w-full h-screen overflow-hidden">
//       {/* Left Side - Dashboard & Offers */}
//       <div className="flex-grow p-6 space-y-6 overflow-auto">
//         <DashboardContent />
        
//       </div>

//       {/* Right Side - Profile Section with Proper Spacing */}
//       <div className="w-1/16 p-2 bg-gray-100  border-gray-300 ml-1 sticky top-0">
//         <ProfileSection session={session} />
//       </div>
//     </div>
//   );
// };

// export default Page;


import ProfileSection from "./ProfileSection";
import DashboardContent from "./DashboardContent";
import { auth } from "../../../auth";

const Page = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      {/* Left Side - Dashboard Content */}
      <div className="flex-grow p-4 sm:p-6 space-y-6 overflow-auto">
        <DashboardContent />
      </div>

      {/* Right Side - Profile Section (Adjusts Based on Screen Size) */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-gray-100 border-l border-gray-300 md:sticky top-0">
        <ProfileSection session={session} />
      </div>
    </div>
  );
};

export default Page;
