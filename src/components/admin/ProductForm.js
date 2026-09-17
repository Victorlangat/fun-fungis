// src/components/admin/ProductForm.js
import React, { useState } from 'react'
import { X, Plus, Save } from 'lucide-react'
import { addProduct, updateProduct } from '../../services/products'

const ProductForm = ({ product, onClose, onSaved }) => {
  const isEditing = !!product

  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    description: product?.description || '',
    detailedDescription: product?.detailedDescription || '',
    image: product?.image || '',
    rating: product?.rating || 5.0,
    reviews: product?.reviews || 0,
    inStock: product?.inStock !== undefined ? product.inStock : true,
    badge: product?.badge || '',
    badgeColor: product?.badgeColor || '#FF6B00',
    tags: product?.tags?.join(', ') || '',
    ingredients: product?.ingredients?.join(', ') || '',
    secretIngredients: product?.secretIngredients || '',
    calories: product?.nutrition?.calories || 0,
    sugar: product?.nutrition?.sugar || '',
    fat: product?.nutrition?.fat || ''
  })

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      // Convert to correct types
      const productData = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        detailedDescription: formData.detailedDescription.trim(),
        image: formData.image.trim(),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        inStock: formData.inStock,
        badge: formData.badge.trim(),
        badgeColor: formData.badgeColor,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
        secretIngredients: formData.secretIngredients.trim(),
        nutrition: {
          calories: Number(formData.calories),
          sugar: formData.sugar.trim(),
          fat: formData.fat.trim()
        }
      }

      // Validation
      if (!productData.name) throw new Error('Name is required')
      if (!productData.category) throw new Error('Category is required')
      if (isNaN(productData.price) || productData.price <= 0) throw new Error('Valid price is required')
      if (!productData.image) throw new Error('Image URL is required')

      if (isEditing) {
        await updateProduct(product.id, productData)
      } else {
        await addProduct(productData)
      }

      if (onSaved) onSaved()
      if (onClose) onClose()
    } catch (err) {
      console.error('Save error:', err)
      setError(err.message || 'Failed to save product')
    } finally {
      setIsSaving(false)
    }
  }

  const categories = [
    'Fruit Chews',
    'Sour Candies',
    'Gummies',
    'Hard Candies',
    'Spicy Candies',
    'Creamy Candies'
  ]

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '0.4rem'
  }

  const groupStyle = {
    marginBottom: '1rem'
  }

  return (
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
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#FF6B00', fontSize: '1.5rem', fontWeight: 700 }}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={groupStyle}>
              <label style={labelStyle}>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} style={{ background: '#1A1A1A' }}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={groupStyle}>
              <label style={labelStyle}>Price (KES) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={inputStyle}
              placeholder="https://..."
              required
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Short Description *</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Detailed Description</label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Secret Ingredients (Candyman's Recipe)</label>
            <textarea
              name="secretIngredients"
              value={formData.secretIngredients}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
              placeholder="e.g., Infused with Ghost Pepper extract..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={groupStyle}>
              <label style={labelStyle}>Badge (e.g., "New", "Hot!")</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Badge Color</label>
              <input
                type="color"
                name="badgeColor"
                value={formData.badgeColor}
                onChange={handleChange}
                style={{ ...inputStyle, height: '44px', padding: '0.25rem' }}
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Tropical, Spicy, Fruit"
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Ingredients (comma separated)</label>
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Mango puree, Sugar, Chili extract"
            />
          </div>

          {/* Nutrition */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={groupStyle}>
              <label style={labelStyle}>Calories</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Sugar</label>
              <input
                type="text"
                name="sugar"
                value={formData.sugar}
                onChange={handleChange}
                style={inputStyle}
                placeholder="42g"
              />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Fat</label>
              <input
                type="text"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                style={inputStyle}
                placeholder="0g"
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                style={{ width: '16px', height: '16px', accentColor: '#FF6B00' }}
              />
              In Stock
            </label>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              background: 'rgba(255,23,68,0.08)',
              border: '1px solid rgba(255,23,68,0.2)',
              borderRadius: '10px',
              color: '#FF1744',
              fontSize: '0.85rem',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #FF6B00, #FF1744)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              opacity: isSaving ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                {isEditing ? <Save size={18} /> : <Plus size={18} />}
                {isEditing ? 'Update Product' : 'Add Product'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm