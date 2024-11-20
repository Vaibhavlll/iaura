import React from 'react';
import { Menu, Plus, List, Edit, PieChart } from 'lucide-react'; // Import PieChart icon

const Sidebar = ({ isMobileMenuOpen, toggleMobileMenu, onAdd, onView, onEdit, onPiechart }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-gray-200"
        onClick={toggleMobileMenu}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed w-64 h-full bg-gray-800 p-6 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-gray-100 mb-8">Expense Tracker</h2>
        <div className="relative">
          <button
            className="w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-between"
            onClick={toggleDropdown}
          >
            Actions
            <span className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {isDropdownOpen && (
            <div className="absolute w-full mt-2 py-2 bg-gray-700 rounded-lg shadow-xl border border-gray-600">
              <button onClick={onAdd} className="w-full px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Add Expense
              </button>
              <button onClick={onView} className="w-full px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center">
                <List className="w-4 h-4 mr-2" /> View Expenses
              </button>
              <button onClick={onEdit} className="w-full px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center">
                <Edit className="w-4 h-4 mr-2" /> Edit Expense
              </button>
              <button onClick={onPiechart} className="w-full px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center">
                <PieChart className="w-4 h-4 mr-2" /> Piechart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
