import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { FaUtensils } from 'react-icons/fa';

const LandingPage = ({ onStartOrder }) => {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100"
            style={{
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <Container className="text-center">
                <Card className="glass-panel text-white p-5 d-inline-block border-0 rounded-4">
                    <Card.Body>
                        <h1 className="display-3 fw-bold mb-4">Ramen Master</h1>
                        <p className="lead mb-5">Experience the authentic taste of Japan.</p>
                        <Button
                            variant="primary-custom"
                            size="lg"
                            className="px-5 py-3 rounded-pill fw-bold fs-4 d-flex align-items-center gap-2 mx-auto"
                            onClick={onStartOrder}
                        >
                            <FaUtensils />
                            Guest Order
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LandingPage;
