import React, { useState } from 'react';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import BottomNav from '../Navigation/BottomNav';
import ProductCard from '../Product/ProductCard';
import ProductModal from '../Product/ProductModal';
import { useCart } from '../Cart/CartContext';
import CartModal from '../Cart/CartModal'; // We will create this next

const PRODUCTS = {
    Ramen: [
        { id: 1, category: 'Ramen', name: 'Tonkotsu Ramen', price: 1200, description: 'Rich pork broth with chashu.', image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 2, category: 'Ramen', name: 'Miso Ramen', price: 1100, description: 'Fermented soybean paste broth.', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 3, category: 'Ramen', name: 'Shoyu Ramen', price: 1000, description: 'Soy sauce based clear broth.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 4, category: 'Ramen', name: 'Spicy Ramen', price: 1300, description: 'Hot and spicy broth.', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
    'A La Carte': [
        { id: 101, category: 'A La Carte', name: 'Gyoza', price: 500, description: 'Pan-fried dumplings (6pcs).', image: 'https://images.unsplash.com/photo-1626084022415-4ba184b2cbd4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 102, category: 'A La Carte', name: 'Karaage', price: 600, description: 'Japanese fried chicken.', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ],
    Drinks: [
        { id: 201, category: 'Drinks', name: 'Green Tea', price: 300, description: 'Cold green tea.', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 202, category: 'Drinks', name: 'Beer', price: 600, description: 'Draft beer.', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 203, category: 'Drinks', name: 'Cola', price: 300, description: 'Refreshing cola.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    ]
};

const ProductList = ({ category, onProductSelect }) => {
    const products = PRODUCTS[category] || [];
    return (
        <Row className="g-4">
            {products.map((product) => (
                <Col key={product.id} xs={12} md={6} lg={4}>
                    <ProductCard product={product} onSelect={onProductSelect} />
                </Col>
            ))}
        </Row>
    );
};

const MenuPage = () => {
    const [key, setKey] = useState('Ramen');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    const { addToCart } = useCart();

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const handleAddToCart = (product, options) => {
        addToCart(product, options);
    };

    return (
        <div className="pb-5 mb-5">
            <Container className="py-3">
                <Tabs
                    id="menu-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-4 justify-content-center border-bottom-0 custom-tabs"
                >
                    <Tab eventKey="Ramen" title="RAMEN">
                        <ProductList category="Ramen" onProductSelect={handleProductSelect} />
                    </Tab>
                    <Tab eventKey="A La Carte" title="A LA CARTE">
                        <ProductList category="A La Carte" onProductSelect={handleProductSelect} />
                    </Tab>
                    <Tab eventKey="Drinks" title="DRINKS">
                        <ProductList category="Drinks" onProductSelect={handleProductSelect} />
                    </Tab>
                </Tabs>
            </Container>

            <BottomNav
                onCheckout={() => setShowCartModal(true)}
                onOpenCart={() => setShowCartModal(true)}
            />

            <ProductModal
                show={showProductModal}
                onHide={() => setShowProductModal(false)}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
            />

            <CartModal
                show={showCartModal}
                onHide={() => setShowCartModal(false)}
            />
        </div>
    );
};

export default MenuPage;
