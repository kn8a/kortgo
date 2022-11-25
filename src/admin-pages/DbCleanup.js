import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function DbCleanup(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
  }, []);

  return <div>DbCleanup</div>;
}

export default DbCleanup;
