import React from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../Cart/CartContext';

const BottomNav = ({ onCheckout, onOpenCart }) => {
    const { cartCount, cartTotal } = useCart();

    return (
        <div className="fixed-bottom bg-card border-top border-secondary py-3">
            <Container className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center text-white">
                    <Button variant="outline-light" className="me-3 position-relative" onClick={onOpenCart}>
                        <FaShoppingCart size={20} />
                        {cartCount > 0 && (
                            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                {cartCount}
                            </Badge>
                        )}
                    </Button>
                    <div>
                        <div className="small text-muted">Total</div>
                        <div className="fw-bold fs-5">¥{cartTotal.toLocaleString()}</div>
                    </div>
                </div>
                <Button variant="primary-custom" size="lg" onClick={onCheckout} disabled={cartCount === 0}>
                    <FaCreditCard className="me-2" /> Checkout
                </Button>
            </Container>
        </div>
    );
};

export default BottomNav;
