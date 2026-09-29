import React, { useState } from 'react';
import { VisitorProvider } from './context/VisitorContext.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { TopBar } from './components/layout/TopBar.jsx';
import { MobileNav } from './components/layout/MobileNav.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { VisitorsPage } from './pages/VisitorsPage.jsx';
import { VisitorModal } from './components/visitors/VisitorModal.jsx';
import { ConfirmDialog } from './components/common/ConfirmDialog.jsx';
import { ToastContainer } from './components/common/Toast.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <VisitorProvider>
      <div className="app-layout">
        {/* Left Desktop Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />

        {/* Main Content Area */}
        <div className="app-main-area">
          <TopBar currentView={currentView} />

          <main className="app-content">
            {currentView === 'dashboard' ? (
              <DashboardPage onNavigateToVisitors={() => setCurrentView('visitors')} />
            ) : (
              <VisitorsPage />
            )}
          </main>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />

        {/* Slide-over / Modal for Add & Edit */}
        <VisitorModal />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog />

        {/* Global Toast Notifications */}
        <ToastContainer />
      </div>
    </VisitorProvider>
  );
}
