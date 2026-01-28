import React from 'react';
import { Container } from 'react-bootstrap';

const MainLayout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        {children}
      </main>
      <footer className="footer mt-auto py-3 bg-card text-center text-muted">
        <Container>
          <small>&copy; 2026 Ramen Shop. All Rights Reserved.</small>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;
