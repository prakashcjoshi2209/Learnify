
import React from 'react';
import Sidebar from "./Sidebar";
import CardTemplateForm from "./CardTemplateForm";
import QuizManagement from "./QuizManagement";
import AdminCoursePage from "./AdminCoursePage";
import NewCaseStudy from "./NewCaseStudy";
import CoursePage from './CoursePage';
const AdminDashboard: React.FC = () => {
  return (
    // <div className="flex h-screen">
    //   <Sidebar />
    //   <main className="flex-1 bg-gray-50">
    //     <Header title="Card Template" />
    //     <div className="p-6">
    //       <CardTemplateForm />
    //     </div>
    //   </main>
    // </div>


    // <div className="flex min-h-screen">
    //   {/* Sidebar */}
    //   <Sidebar />

    //   {/* Quiz Management Section */}
    //   <QuizManagement />
    // </div>


<div className="flex">
  {/* Sidebar */}
  <div className="w-1/5 min-h-screen bg-white">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="w-4/5 p-0"> 
    <AdminCoursePage />
  </div>
</div>


    // <div className="flex">
    //   {/* Sidebar */}
    //   <Sidebar />

    //   {/* Main Content */}
    //   <main className="flex-1 bg-gray-100">
    //     <NewCaseStudy />
    //   </main>
    // </div>

  );
};

export default AdminDashboard;
