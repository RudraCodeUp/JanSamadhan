import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// API integration functions
const api = {
  // Department APIs
  createDepartment: async (data) => {
    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  },

  getAllDepartments: async () => {
    try {
      const response = await fetch('/api/departments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  // Section APIs
  createSection: async (data) => {
    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating section:', error);
      throw error;
    }
  },

  getAllSectionsOfDepartment: async (departmentId) => {
    try {
      const response = await fetch(`/api/departments/${departmentId}/sections`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw error;
    }
  },

  // Subsection APIs
  createSubSection: async (data) => {
    try {
      const response = await fetch('/api/subsections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating subsection:', error);
      throw error;
    }
  },

  getAllSubSectionsOfSection: async (sectionId) => {
    try {
      const response = await fetch(`/api/sections/${sectionId}/subsections`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching subsections:', error);
      throw error;
    }
  },
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Water Department' },
    { id: 2, name: 'Sanitation' },
    { id: 3, name: 'Roads & Infrastructure' }
  ]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Water Supply', departmentId: 1 },
    { id: 2, name: 'Water Quality', departmentId: 1 }
  ]);
  const [subsections, setSubsections] = useState([
    { id: 1, name: 'Pipeline Maintenance', sectionId: 1, departmentId: 1 },
    { id: 2, name: 'Water Testing', sectionId: 2, departmentId: 1 }
  ]);
  const [openDialog, setOpenDialog] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    emergencyContact: '',
    state_district: '',
    county: '',
    area: '',
    boundary: null,
    departmentId: '',
    sectionId: ''
  });
  const [departmentTypes, setDepartmentTypes] = useState([
    'Water Department',
    'Sanitation',
    'Roads & Infrastructure'
  ]);

  // Mock data for charts
  const complaintData = [
    { name: 'Jan', complaints: 40 },
    { name: 'Feb', complaints: 30 },
    { name: 'Mar', complaints: 45 },
    { name: 'Apr', complaints: 55 },
  ];

  const pieData = [
    { name: 'Resolved', value: 60 },
    { name: 'Pending', value: 30 },
    { name: 'In Progress', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  const handleAddItem = (type) => {
    setOpenDialog(type);
    // Reset form data when opening dialog
    setFormData({
      name: '',
      email: '',
      password: '',
      emergencyContact: '',
      state_district: '',
      county: '',
      area: '',
      boundary: null,
      departmentId: '',
      sectionId: ''
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      const { name, email, password, emergencyContact } = formData;
      if (!name.trim() || !email || !password || !emergencyContact) {
        alert("Please fill in all required fields");
        return;
      }

      let response;
      switch (openDialog) {
        case 'department':
          if (!formData.state_district) {
            alert("Please enter state/district");
            return;
          }
          response = await api.createDepartment(formData);
          if (response.department) {
            setDepartments([...departments, response.department]);
          }
          break;

        case 'section':
          if (!formData.departmentId || !formData.county) {
            alert("Please select a department and enter county");
            return;
          }
          response = await api.createSection(formData);
          if (response.section) {
            setSections([...sections, response.section]);
          }
          break;

        case 'subsection':
          if (!formData.departmentId || !formData.sectionId || !formData.area) {
            alert("Please select department, section and enter area");
            return;
          }
          response = await api.createSubSection(formData);
          if (response.subSection) {
            setSubsections([...subsections, response.subSection]);
          }
          break;

        default:
          break;
      }
      
      // Reset form and close dialog
      setOpenDialog('');
      setFormData({
        name: '',
        email: '',
        password: '',
        emergencyContact: '',
        state_district: '',
        county: '',
        area: '',
        boundary: null,
        departmentId: '',
        sectionId: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Update the handleDelete function to prevent dialog opening
  const handleDelete = (type, id) => {
    switch (type) {
      case 'department':
        setDepartments(departments.filter(dept => dept.id !== id));
        // Delete related sections and subsections
        setSections(sections.filter(section => section.departmentId !== id));
        setSubsections(subsections.filter(subsection => subsection.departmentId !== id));
        break;
      case 'section':
        setSections(sections.filter(section => section.id !== id));
        // Delete only subsections related to this section
        setSubsections(subsections.filter(subsection => subsection.sectionId !== id));
        break;
      case 'subsection':
        // Delete only the specific subsection
        setSubsections(subsections.filter(subsection => subsection.id !== id));
        break;
      default:
        break;
    }
  };

  // Add this with other handler functions
  const handleAddDepartmentType = () => {
    const newType = formData.name.trim();
    if (!newType) return;
    
    if (!departmentTypes.includes(newType)) {
      setDepartmentTypes([...departmentTypes, newType]);
      setOpenDialog('');
      setFormData({
        name: '',
        email: '',
        password: '',
        emergencyContact: '',
        state_district: '',
        county: '',
        area: '',
        boundary: null,
        departmentId: '',
        sectionId: ''
      });
    }
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load departments
        const deptResponse = await api.getAllDepartments();
        if (deptResponse.departments) {
          setDepartments(deptResponse.departments);

          // Load sections for each department
          const sectionsPromises = deptResponse.departments.map(dept =>
            api.getAllSectionsOfDepartment(dept._id)
          );
          const sectionsResponses = await Promise.all(sectionsPromises);
          const allSections = sectionsResponses.flatMap(res => res.sections || []);
          setSections(allSections);

          // Load subsections for each section
          const subsectionsPromises = allSections.map(section =>
            api.getAllSubSectionsOfSection(section._id)
          );
          const subsectionsResponses = await Promise.all(subsectionsPromises);
          const allSubsections = subsectionsResponses.flatMap(res => res.subSections || []);
          setSubsections(allSubsections);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        alert('Failed to load data. Please refresh the page.');
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200 font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Only keep the header with logout button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Analytics</h2>
            <p className="mt-2 text-gray-600">Overview of complaint management system</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Complaint Trends Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Complaint Trends</h3>
            <div className="overflow-hidden">
              <BarChart width={500} height={300} data={complaintData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="complaints" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </div>
          </div>

          {/* Complaint Status Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Complaint Status</h3>
            <div className="overflow-hidden">
              <PieChart width={500} height={300}>
                <Pie
                  data={pieData}
                  cx={250}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Municipal Management</h2>
            {/* Update the "Add New Department Type" button */}
            <button
              onClick={() => handleAddItem('departmentType')}
              className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 hover:shadow-xl"
            >
              <span className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
              <span className="font-medium">Add New Department Type</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Departments Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Departments</h3>
                {/* Update the "Add Department" button */}
                <button
                  onClick={() => handleAddItem('department')}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="font-medium">Add Department</span>
                </button>
              </div>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div key={dept.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition duration-200">
                    <span className="text-gray-700">{dept.name}</span>
                    {/* Department delete button */}
                    <button 
                      onClick={() => handleDelete('department', dept.id)}  // Remove event parameter
                      className="text-red-600 hover:text-red-700 focus:outline-none p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Sections Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Sections</h3>
                {/* Update the "Add Section" button */}
                <button
                  onClick={() => handleAddItem('section')}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="font-medium">Add Section</span>
                </button>
              </div>
              <div className="space-y-3">
                {sections.map((section) => (
                  <div key={section.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition duration-200">
                    <div>
                      <span className="text-gray-700">{section.name}</span>
                      <span className="text-sm text-gray-500 block">
                        {departments.find(d => d.id === section.departmentId)?.name}
                      </span>
                    </div>
                    {/* Section delete button */}
                    <button 
                      onClick={() => handleDelete('section', section.id)}  // Remove event parameter
                      className="text-red-600 hover:text-red-700 focus:outline-none p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Subsections Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Subsections</h3>
                {/* Update the "Add Subsection" button */}
                <button
                  onClick={() => handleAddItem('subsection')}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="font-medium">Add Subsection</span>
                </button>
              </div>
              <div className="space-y-3">
                {subsections.map((subsection) => (
                  <div key={subsection.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition duration-200">
                    <div>
                      <span className="text-gray-700">{subsection.name}</span>
                      <span className="text-sm text-gray-500 block">
                        {sections.find(s => s.id === subsection.sectionId)?.name}
                      </span>
                    </div>
                    {/* Subsection delete button */}
                    <button 
                      onClick={() => handleDelete('subsection', subsection.id)}  // Remove event parameter
                      className="text-red-600 hover:text-red-700 focus:outline-none p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dialog */}
        <Dialog
          open={Boolean(openDialog)}
          onClose={() => setOpenDialog('')}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            className: "rounded-2xl overflow-hidden"
          }}
        >
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-8">
            <DialogTitle className="p-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {openDialog === 'department' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    )}
                    {openDialog === 'section' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    )}
                    {(openDialog === 'subsection' || openDialog === 'departmentType') && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    )}
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {`Add New ${openDialog?.charAt(0).toUpperCase()}${openDialog?.slice(1)}`}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Fill in the information below to create a new {openDialog}
                  </p>
                </div>
              </div>
            </DialogTitle>
          </div>

          <DialogContent className="p-8">
            <div className="space-y-6 max-w-md mx-auto">
              {/* Common Fields */}
              <div className="space-y-4">
                {/* Name Input */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {`${openDialog?.charAt(0).toUpperCase()}${openDialog?.slice(1)} Name`}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                    placeholder={`Enter ${openDialog} name`}
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                    placeholder="Enter password"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                    placeholder="Enter emergency contact"
                  />
                </div>

                {/* Location Fields */}
                {openDialog === 'department' && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      State/District
                    </label>
                    <input
                      type="text"
                      value={formData.state_district}
                      onChange={(e) => setFormData({ ...formData, state_district: e.target.value })}
                      className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                      placeholder="Enter state/district"
                    />
                  </div>
                )}

                {openDialog === 'section' && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      County
                    </label>
                    <input
                      type="text"
                      value={formData.county}
                      onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                      placeholder="Enter county"
                    />
                  </div>
                )}

                {openDialog === 'subsection' && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Area
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                      placeholder="Enter area"
                    />
                  </div>
                )}
              </div>

              {/* Department Type Selection */}
              {openDialog === 'department' && (
                <div className="mb-6"> {/* Added mb-6 for consistent spacing */}
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Department Type
                  </label>
                  <Select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full"
                    displayEmpty
                    sx={{ 
                      height: '48px',
                      backgroundColor: '#F9FAFB',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '0.5rem'
                      }
                    }}
                  >
                    <MenuItem value="" disabled>Select Department Type</MenuItem>
                    {departmentTypes.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}

              {/* Department Selection for Sections */}
              {openDialog === 'section' && (
                <div className="mb-6"> {/* Added mb-6 for consistent spacing */}
                  <FormControl fullWidth>
                    <InputLabel>Select Department</InputLabel>
                    <Select
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                      label="Select Department"
                      sx={{ 
                        height: '48px',
                        backgroundColor: '#F9FAFB',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderRadius: '0.5rem'
                        }
                      }}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              {/* Department and Section Selection for Subsections */}
              {openDialog === 'subsection' && (
                <div className="space-y-6"> {/* Keep space-y-6 for subsection spacing */}
                  <div className="mb-6">
                    <FormControl fullWidth>
                      <InputLabel>Select Department</InputLabel>
                      <Select
                        value={formData.departmentId}
                        onChange={(e) => setFormData({ ...formData, departmentId: e.target.value, sectionId: '' })}
                        label="Select Department"
                        sx={{ 
                          height: '48px',
                          backgroundColor: '#F9FAFB',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderRadius: '0.5rem'
                          }
                        }}
                      >
                        {departments.map((dept) => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {formData.departmentId && (
                    <div className="mb-6">
                      <FormControl fullWidth>
                        <InputLabel>Select Section</InputLabel>
                        <Select
                          value={formData.sectionId}
                          onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                          label="Select Section"
                          sx={{ 
                            height: '48px',
                            backgroundColor: '#F9FAFB',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderRadius: '0.5rem'
                            }
                          }}
                        >
                          {sections
                            .filter(section => section.departmentId === formData.departmentId)
                            .map((section) => (
                              <MenuItem key={section.id} value={section.id}>
                                {section.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>

          <DialogActions className="p-6 bg-gray-50">
            <button
              onClick={() => setOpenDialog('')}
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={openDialog === 'departmentType' ? handleAddDepartmentType : handleSubmit}
              disabled={
                !formData.name || 
                (openDialog === 'section' && !formData.departmentId) ||
                (openDialog === 'subsection' && (!formData.departmentId || !formData.sectionId))
              }
              className={`px-6 py-2.5 text-white bg-gray-700 rounded-lg transition-all duration-200 font-medium
                ${!formData.name ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 hover:shadow-lg'}
              `}
            >
              Add {openDialog?.charAt(0).toUpperCase()}{openDialog?.slice(1)}
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPage;