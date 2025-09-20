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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md" key={item.id}>
      <div className="flex justify-between p-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700">
          {item.manager.charAt(0)}
        </div>
        <div className="text-xl text-gray-500 cursor-pointer">⋯</div>
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-medium text-gray-800 m-0">{item.manager}</h3>
        <p className="text-sm text-gray-500 mt-1 mb-4">{type === 'section' ? 'Section Manager' : 'Subsection Manager'}</p>
        
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Department</span>
            <span className="text-sm text-gray-800">{item.name}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Hired Date</span>
            <span className="text-sm text-gray-800">{item.hireDate}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex items-center mb-1 text-sm text-gray-600">
            <span className="mr-2">✉</span>
            <span>{item.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">☎</span>
            <span>{item.phone}</span>
          </div>
        </div>
        
        <div className="flex justify-between border-t border-gray-100 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Total</span>
            <span className="text-base font-medium text-gray-800">{item.complaints.total}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Pending</span>
            <span className="text-base font-medium text-gray-800">{item.complaints.pending}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Resolved</span>
            <span className="text-base font-medium text-gray-800">{item.complaints.resolved}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-medium text-gray-800 m-0">{getStaffCount()} Staff Members</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <button className="py-2 px-5 bg-gray-100 border border-gray-200 rounded text-sm">Filter</button>
        </div>
      </div>

      {userRole === "district" && (
        <>
          <h2 className="text-xl font-medium text-gray-800 mt-8 mb-5">Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
            {filteredData.sections.map(section => renderStaffCard(section, 'section'))}
          </div>
          
          <h2 className="text-xl font-medium text-gray-800 mt-8 mb-5">Sub-Sections</h2>
          {filteredData.sections.map(section => (
            <div key={section.id} className="mb-8">
              <h3 className="text-base text-gray-600 mb-4">{section.name} Sub-Sections</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {section.subSections.map(subSection => renderStaffCard(subSection, 'subsection'))}
              </div>
            </div>
          ))}
        </>
      )}

      {userRole === "section" && (
        <>
          <h2 className="text-xl font-medium text-gray-800 mt-8 mb-5">Sub-Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredData.subSections.map(subSection => renderStaffCard(subSection, 'subsection'))}
          </div>
        </>
      )}
    </div>
  );
};

export default Staff;