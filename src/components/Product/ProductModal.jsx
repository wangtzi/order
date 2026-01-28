import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ProductModal = ({ show, onHide, product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [hardness, setHardness] = useState('Normal');
    const [soup, setSoup] = useState('Normal');

    useEffect(() => {
        if (show) {
            setQuantity(1);
            setHardness('Normal');
            setSoup('Normal');
        }
    }, [show]);

    if (!product) return null;

    const handleAdd = () => {
        onAddToCart(product, {
            quantity,
            hardness: product.category === 'Ramen' ? hardness : null,
            soup: product.category === 'Ramen' ? soup : null,
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered contentClassName="modal-content-custom bg-card text-white">
            <Modal.Header closeButton closeVariant="white" className="border-secondary">
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '200px' }}
                    />
                </div>
                <p>{product.description}</p>
                <h4 className="text-primary-custom mb-3">¥{product.price.toLocaleString()}</h4>

                {product.category === 'Ramen' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Noodle Hardness</Form.Label>
                            <div className="d-flex gap-2">
                                {['Soft', 'Normal', 'Hard', 'Extra Hard'].map((opt) => (
                                    <Button
                                        key={opt}
                                        variant={hardness === opt ? 'primary-custom' : 'outline-secondary'}
                                        size="sm"
                                        onClick={() => setHardness(opt)}
                                    >
                                        {opt}
                                    </Button>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Soup Concentration</Form.Label>
                            <div className="d-flex gap-2">
                                {['Light', 'Normal', 'Thick'].map((opt) => (
                                    <Button
                                        key={opt}
                                        variant={soup === opt ? 'primary-custom' : 'outline-secondary'}
                                        size="sm"
                                        onClick={() => setSoup(opt)}
                                    >
                                        {opt}
                                    </Button>
                                ))}
                            </div>
                        </Form.Group>
                    </>
                )}

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <div className="d-flex align-items-center gap-3">
                        <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                        <span className="fs-4">{quantity}</span>
                        <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
                    </div>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer className="border-secondary">
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary-custom" onClick={handleAdd}>
                    Add to Cart - ¥{(product.price * quantity).toLocaleString()}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;
