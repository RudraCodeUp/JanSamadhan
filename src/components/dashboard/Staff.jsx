import React, { useState } from 'react';

// Mock data - replace with actual API calls
const mockStaffData = {
  district: {
    name: "Central District",
    sections: [
      {
        id: 1,
        name: "North Section",
        manager: "Alex Johnson",
        email: "alex.johnson@district.gov",
        phone: "(555) 123-4567",
        hireDate: "03/15/2019",
        complaints: { total: 145, pending: 45, resolved: 100 },
        subSections: [
          { 
            id: 101, 
            name: "North-East Sector", 
            manager: "Sarah Williams",
            email: "sarah.w@district.gov",
            phone: "(555) 234-5678",
            hireDate: "07/22/2020",
            complaints: { total: 78, pending: 23, resolved: 55 } 
          },
          { 
            id: 102, 
            name: "North-West Sector", 
            manager: "Michael Davis",
            email: "m.davis@district.gov",
            phone: "(555) 345-6789",
            hireDate: "11/05/2020",
            complaints: { total: 67, pending: 22, resolved: 45 } 
          }
        ]
      },
      {
        id: 2,
        name: "South Section",
        manager: "Emily Parker",
        email: "emily.p@district.gov",
        phone: "(555) 456-7890",
        hireDate: "05/12/2018",
        complaints: { total: 178, pending: 58, resolved: 120 },
        subSections: [
          { 
            id: 201, 
            name: "South-East Sector", 
            manager: "Daniel Robinson",
            email: "d.robinson@district.gov",
            phone: "(555) 567-8901",
            hireDate: "02/28/2021",
            complaints: { total: 95, pending: 32, resolved: 63 } 
          },
          { 
            id: 202, 
            name: "South-West Sector", 
            manager: "Jessica Miller",
            email: "j.miller@district.gov",
            phone: "(555) 678-9012",
            hireDate: "09/14/2021",
            complaints: { total: 83, pending: 26, resolved: 57 } 
          }
        ]
      },
      {
        id: 3,
        name: "East Section",
        manager: "Robert Wilson",
        email: "r.wilson@district.gov",
        phone: "(555) 789-0123",
        hireDate: "06/07/2019",
        complaints: { total: 132, pending: 42, resolved: 90 },
        subSections: [
          { 
            id: 301, 
            name: "East-Central Sector", 
            manager: "Lisa Thompson",
            email: "l.thompson@district.gov",
            phone: "(555) 890-1234",
            hireDate: "04/03/2022",
            complaints: { total: 72, pending: 24, resolved: 48 } 
          },
          { 
            id: 302, 
            name: "East-Shore Sector", 
            manager: "Kevin Brown",
            email: "k.brown@district.gov",
            phone: "(555) 901-2345",
            hireDate: "08/19/2022",
            complaints: { total: 60, pending: 18, resolved: 42 } 
          }
        ]
      }
    ]
  },
  section: {
    id: 1,
    name: "North Section",
    manager: "Alex Johnson",
    email: "alex.johnson@district.gov",
    phone: "(555) 123-4567",
    hireDate: "03/15/2019",
    complaints: { total: 145, pending: 45, resolved: 100 },
    subSections: [
      { 
        id: 101, 
        name: "North-East Sector", 
        manager: "Sarah Williams",
        email: "sarah.w@district.gov",
        phone: "(555) 234-5678",
        hireDate: "07/22/2020",
        complaints: { total: 78, pending: 23, resolved: 55 } 
      },
      { 
        id: 102, 
        name: "North-West Sector", 
        manager: "Michael Davis",
        email: "m.davis@district.gov",
        phone: "(555) 345-6789",
        hireDate: "11/05/2020",
        complaints: { total: 67, pending: 22, resolved: 45 } 
      }
    ]
  }
};

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Use auth store to get user role or set a default for development
  const userRole = "district"; // Change to: useAuth().user?.role || "district";
  
  const userData = mockStaffData[userRole];

  // Don't render for subsection users
  if (userRole === "subsection") {
    return null;
  }

  const filterData = (data) => {
    if (!searchTerm) return data;
    
    if (userRole === "district") {
      const filteredSections = data.sections.filter(section => 
        section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.manager.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        ...data,
        sections: filteredSections
      };
    } else {
      const filteredSubSections = data.subSections.filter(subSection => 
        subSection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subSection.manager.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        ...data,
        subSections: filteredSubSections
      };
    }
  };

  const filteredData = filterData(userData);

  const getStaffCount = () => {
    if (userRole === "district") {
      return filteredData.sections.length + filteredData.sections.reduce(
        (total, section) => total + section.subSections.length, 0
      );
    } else {
      return filteredData.subSections.length;
    }
  };

  const renderStaffCard = (item, type) => (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform overflow-hidden" key={item.id}>
      <div className="flex justify-between items-center p-6 pb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-xl font-semibold text-indigo-700 shadow-sm">
          {item.manager.charAt(0)}
        </div>
        <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200">
          <span className="text-gray-400 hover:text-gray-600">⋯</span>
        </button>
      </div>
      
      <div className="px-6 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.manager}</h3>
        <p className="text-sm text-indigo-600 font-medium mb-5">{type === 'section' ? 'Section Manager' : 'Subsection Manager'}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Department</span>
            <span className="text-sm text-gray-900 font-medium">{item.name}</span>
          </div>
          
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">Hired Date</span>
            <span className="text-sm text-gray-900 font-medium">{item.hireDate}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mb-5 space-y-2">
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <span className="mr-3 text-indigo-500">✉</span>
            <span className="font-medium">{item.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <span className="mr-3 text-indigo-500">📞</span>
            <span className="font-medium">{item.phone}</span>
          </div>
        </div>
        
        <div className="flex justify-between border-t border-gray-100 pt-4">
          <div className="text-center">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Total</span>
            <span className="text-lg font-semibold text-gray-900">{item.complaints.total}</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Pending</span>
            <span className="text-lg font-semibold text-orange-600">{item.complaints.pending}</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">Resolved</span>
            <span className="text-lg font-semibold text-green-600">{item.complaints.resolved}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getStaffCount()} Staff Members</h1>
            <p className="text-gray-600">Manage your team and track performance</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 py-3 px-4 pl-12 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="py-3 px-6 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
              Filter
            </button>
          </div>
        </div>

        {userRole === "district" && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sections</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.sections.map(section => renderStaffCard(section, 'section'))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Sub-Sections</h2>
              {filteredData.sections.map(section => (
                <div key={section.id} className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    {section.name} Sub-Sections
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {section.subSections.map(subSection => renderStaffCard(subSection, 'subsection'))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {userRole === "section" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Sub-Sections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.subSections.map(subSection => renderStaffCard(subSection, 'subsection'))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;