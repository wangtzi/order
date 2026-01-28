import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, onSelect }) => {
    return (
        <Card className="product-card h-100" onClick={() => onSelect(product)} role="button">
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <Card.Body>
                <Card.Title className="fw-bold">{product.name}</Card.Title>
                <Card.Text className="text-muted small">
                    {product.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fs-5 fw-bold text-primary-custom">¥{product.price.toLocaleString()}</span>
                    <Button variant="outline-light" size="sm" className="rounded-pill px-3">
                        Add +
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
