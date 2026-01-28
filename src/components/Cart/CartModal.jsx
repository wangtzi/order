import React, { useState } from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from './CartContext';

const CartModal = ({ show, onHide }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

    const handleCheckout = () => {
        // In a real app, this would redirect to payment
        setShowCheckoutSuccess(true);
        setTimeout(() => {
            setShowCheckoutSuccess(false);
            clearCart();
            onHide();
        }, 3000);
    };

    if (showCheckoutSuccess) {
        return (
            <Modal show={true} onHide={() => { }} centered contentClassName="modal-content-custom bg-card text-white text-center">
                <Modal.Body className="p-5">
                    <h2 className="text-success mb-3">Order Placed!</h2>
                    <p>Thank you for your order. The kitchen is preparing your meal.</p>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Modal show={show} onHide={onHide} centered size="lg" contentClassName="modal-content-custom bg-card text-white">
            <Modal.Header closeButton closeVariant="white" className="border-secondary">
                <Modal.Title>Your Order</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {cartItems.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted">Your cart is empty.</p>
                    </div>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item, index) => (
                            <ListGroup.Item key={index} className="bg-transparent text-white border-secondary d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    <div className="fw-bold">{item.name}</div>
                                    <div className="text-muted small">
                                        {item.options.hardness && `Hardness: ${item.options.hardness}, `}
                                        {item.options.soup && `Soup: ${item.options.soup}`}
                                    </div>
                                    <div className="text-primary-custom mt-1">¥{item.price.toLocaleString()}</div>
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    <div className="d-flex align-items-center bg-dark rounded p-1">
                                        <Button
                                            variant="link"
                                            className="text-white p-0 px-2 text-decoration-none"
                                            onClick={() => updateQuantity(index, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <FaMinus size={10} />
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="link"
                                            className="text-white p-0 px-2 text-decoration-none"
                                            onClick={() => updateQuantity(index, item.quantity + 1)}
                                        >
                                            <FaPlus size={10} />
                                        </Button>
                                    </div>
                                    <div className="fw-bold" style={{ minWidth: '80px', textAlign: 'right' }}>
                                        ¥{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(index)}>
                                        <FaTrash />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Modal.Body>
            <Modal.Footer className="border-secondary justify-content-between">
                <div className="fs-4 fw-bold">
                    Total: <span className="text-primary-custom">¥{cartTotal.toLocaleString()}</span>
                </div>
                <div>
                    <Button variant="secondary" onClick={onHide} className="me-2">Keep Ordering</Button>
                    <Button variant="primary-custom" onClick={handleCheckout} disabled={cartItems.length === 0}>
                        Place Order
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;
