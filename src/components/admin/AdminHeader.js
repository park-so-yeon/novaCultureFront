import React from 'react';	

function AdminHeader() {
  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    window.location.href = '/admin/login';
  };

  const userName = sessionStorage.getItem('userName');

  return (
    <header className="admin-header">
      <div className="admin-header-left">

      </div>
      <div className="admin-header-right">
        <span className="admin-username">{userName} 님</span>
        <button className="admin-logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
