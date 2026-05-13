export function normalizeProduct(product) {
  const image = product.image || product.images?.[0]?.url || product.gallery?.[0] || '';
  const category = typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized';

  return {
    ...product,
    id: product.id || product._id,
    category,
    image,
    gallery: product.gallery?.length ? product.gallery : product.images?.map((item) => item.url).filter(Boolean) || [image],
    badge: product.badge || (product.isFeatured ? 'Featured' : 'Active'),
    oldPrice: product.oldPrice || Math.round(product.price * 1.18),
    rating: product.rating || 0,
    stock: product.stock || 0
  };
}

export function normalizeProducts(products = []) {
  return products.map(normalizeProduct);
}
