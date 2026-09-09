import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react'

const ProductPage = () => {
  const { id } = useParams()

  return (
    <div className="shop-page">
      <div className="container">
        <Link to="/shop" className="product-back-link">
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        <div className="product-detail-grid">
          <div className="product-detail-image">??</div>

          <div>
            <div className="product-detail-category">Fruit Chews</div>
            <h1 className="product-detail-name gradient-text">Product {id}</h1>
            
            <div className="product-detail-rating">
              <div className="product-detail-stars">
                <Star size={20} fill="#FFEA00" />
                <span>4.8</span>
              </div>
              <span className="product-detail-divider">|</span>
              <span className="product-detail-stock">In Stock</span>
            </div>

            <p className="product-detail-price gradient-text">KES 450</p>
            <p className="product-detail-description">
              Premium quality candy with amazing flavor. Made with love in Kenya.
            </p>

            <div className="product-detail-actions">
              <button className="btn-primary">
                <ShoppingBag size={20} />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
