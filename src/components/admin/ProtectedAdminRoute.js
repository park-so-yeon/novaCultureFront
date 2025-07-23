import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/auth/adminSession', { credentials: 'include' })
      .then(res => {
        if (res.status === 401) {
          navigate('/administrator', { replace: true });
        }
      })
      .catch(() => {
        navigate('/administrator', { replace: true });
      });
  }, [navigate]);

  return <>{children}</>;
}
