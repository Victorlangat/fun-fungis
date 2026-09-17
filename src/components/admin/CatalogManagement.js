// src/components/admin/CatalogManagement.js
import React, { useState } from 'react'
import { Plus, Edit, Trash2, Package, RefreshCw } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { deleteProduct } from '../../services/products'
import ProductForm from './ProductForm'

const CatalogManagement = () => {
  const { products, loading, error, refetch } = useProducts()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId)
      setDeleteConfirm(null)
      refetch()
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete product')
    }
  }

  const handleSaved = () => {
    refetch()
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,107,0,0.2)',
          borderTopColor: '#FF6B00',
          borderRadius: '50%',
          margin: '0 auto 1rem',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading products...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: '#FF6B00', fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Catalog Management
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            {products.length} products in your store
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={refetch}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            onClick={handleAddNew}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #FF6B00, #FF1744)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: 'rgba(255,23,68,0.08)',
          border: '1px solid rgba(255,23,68,0.2)',
          borderRadius: '12px',
          color: '#FF1744',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(20,20,20,0.5)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Package size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>No products yet</h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
            Add your first candy to get started
          </p>
          <button
            onClick={handleAddNew}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #FF6B00, #FF1744)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            <Plus size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Add First Product
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{
                background: 'rgba(20,20,20,0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/FF6B00/FFFFFF?text=FunFungi'
                  }}
                />
                {!product.inStock && (
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'rgba(255,23,68,0.9)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>
                    OUT OF STOCK
                  </div>
                )}
              </div>

              <div style={{ padding: '1rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                  {product.category}
                </p>
                <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {product.name}
                </h3>
                <p style={{ color: '#FF6B00', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                  KES {product.price}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(product)}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem'
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(product)}
                    style={{
                      padding: '0.6rem 0.8rem',
                      background: 'rgba(255,23,68,0.1)',
                      border: '1px solid rgba(255,23,68,0.2)',
                      borderRadius: '8px',
                      color: '#FF1744',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Form Modal */}
      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setIsFormOpen(false)
            setEditingProduct(null)
          }}
          onSaved={handleSaved}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <Trash2 size={48} color="#FF1744" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Delete Product?</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Are you sure you want to delete <strong style={{ color: 'white' }}>{deleteConfirm.name}</strong>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#FF1744',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogManagement