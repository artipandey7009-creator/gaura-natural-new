import sys
import os
sys.path.insert(0, '/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime, timezone
import uuid

async def add_products():
    # Connect to MongoDB
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['test_database']
    
    # Additional products across all 5 categories
    new_products = [
        # More Agarbatti
        {
            'id': str(uuid.uuid4()),
            'name': 'Jasmine Temple Incense Sticks',
            'description': 'Handcrafted jasmine incense sticks made from recycled temple flowers. These bamboo-less sticks offer a sweet, calming fragrance perfect for meditation and yoga practice.',
            'price': 9.99,
            'category': 'Agarbatti',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Bamboo-less'],
            'benefits': ['Calming effect', 'Meditation aid', 'Natural fragrance'],
            'stock': 75,
            'rating': 4.7,
            'reviews_count': 28,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Mogra Floral Agarbatti',
            'description': 'Traditional mogra (jasmine) incense made from recycled temple offerings. Burns evenly with a long-lasting, authentic floral aroma that purifies your space.',
            'price': 11.99,
            'category': 'Agarbatti',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Long-lasting'],
            'benefits': ['Air purification', 'Spiritual ambiance', 'Mosquito repellent'],
            'stock': 90,
            'rating': 4.8,
            'reviews_count': 35,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        # Ittar (Attars)
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Attar',
            'description': 'Pure sandalwood attar distilled using traditional methods. This luxury fragrance oil is alcohol-free and long-lasting, perfect for special occasions and daily wear.',
            'price': 29.99,
            'category': 'Ittar',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Luxury', 'Alcohol-free'],
            'benefits': ['Long-lasting fragrance', 'Natural perfume', 'Spiritual connection'],
            'stock': 25,
            'rating': 4.9,
            'reviews_count': 42,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lotus Essence Attar',
            'description': 'Rare lotus attar extracted from temple lotus flowers. A divine fragrance that embodies purity and spirituality, crafted by skilled artisans.',
            'price': 32.99,
            'category': 'Ittar',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Luxury', 'Rare'],
            'benefits': ['Divine fragrance', 'Meditation enhancer', 'Natural perfume'],
            'stock': 15,
            'rating': 5.0,
            'reviews_count': 18,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Jasmine Night Attar',
            'description': 'Enchanting jasmine attar captured during night blooms. This precious oil carries the most intense jasmine fragrance, perfect for evening wear.',
            'price': 27.99,
            'category': 'Ittar',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Handmade', 'Night bloom'],
            'benefits': ['Romantic fragrance', 'Stress relief', 'Mood enhancement'],
            'stock': 30,
            'rating': 4.8,
            'reviews_count': 26,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        # Personal Care
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose & Sandalwood Face Pack',
            'description': 'Natural face pack made from recycled rose petals, sandalwood powder, and herbs. Cleanses, brightens, and rejuvenates your skin naturally.',
            'price': 16.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Natural'],
            'benefits': ['Skin brightening', 'Deep cleansing', 'Anti-aging'],
            'stock': 45,
            'rating': 4.6,
            'reviews_count': 31,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Herbal Bath Powder',
            'description': 'Traditional Ubtan bath powder made from temple flowers, herbs, and natural ingredients. Perfect for a luxurious, aromatic bathing experience.',
            'price': 14.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Herbal'],
            'benefits': ['Skin nourishment', 'Natural glow', 'Relaxation'],
            'stock': 50,
            'rating': 4.7,
            'reviews_count': 24,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Natural Hair Oil',
            'description': 'Ayurvedic hair oil infused with temple flowers, hibiscus, and herbs. Promotes hair growth, prevents dandruff, and adds natural shine.',
            'price': 18.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Ayurvedic', 'Natural'],
            'benefits': ['Hair growth', 'Dandruff control', 'Shine enhancer'],
            'stock': 60,
            'rating': 4.8,
            'reviews_count': 38,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Body Lotion',
            'description': 'Natural body lotion with lavender essential oil and flower extracts. Deeply moisturizes while providing a calming, aromatic experience.',
            'price': 19.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Natural', 'Moisturizing', 'Aromatic'],
            'benefits': ['Deep moisturization', 'Calming effect', 'Soft skin'],
            'stock': 40,
            'rating': 4.7,
            'reviews_count': 22,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        # Essential Oils
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Essential Oil',
            'description': 'Pure lavender essential oil for aromatherapy and relaxation. Steam-distilled from premium lavender flowers, perfect for diffusers and topical use.',
            'price': 22.99,
            'category': 'Essential Oils',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Therapeutic', 'Organic'],
            'benefits': ['Relaxation', 'Sleep aid', 'Stress relief'],
            'stock': 35,
            'rating': 4.9,
            'reviews_count': 45,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose Essential Oil',
            'description': 'Precious rose essential oil extracted from temple roses. High-quality therapeutic oil perfect for skin care, aromatherapy, and emotional balance.',
            'price': 39.99,
            'category': 'Essential Oils',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Luxury', 'Therapeutic'],
            'benefits': ['Skin rejuvenation', 'Emotional balance', 'Anti-aging'],
            'stock': 18,
            'rating': 5.0,
            'reviews_count': 29,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Eucalyptus Essential Oil',
            'description': 'Pure eucalyptus essential oil for respiratory health and mental clarity. Steam-distilled from eucalyptus leaves using traditional methods.',
            'price': 19.99,
            'category': 'Essential Oils',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Therapeutic', 'Natural'],
            'benefits': ['Respiratory support', 'Mental clarity', 'Pain relief'],
            'stock': 42,
            'rating': 4.8,
            'reviews_count': 33,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        # Candles
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose Temple Candle',
            'description': 'Hand-poured soy wax candle infused with recycled rose petals and natural rose essential oil. Burns cleanly for 40+ hours with a divine floral aroma.',
            'price': 24.99,
            'category': 'Candles',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Soy wax'],
            'benefits': ['Long-lasting', 'Clean burn', 'Aromatic ambiance'],
            'stock': 55,
            'rating': 4.7,
            'reviews_count': 27,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Meditation Candle',
            'description': 'Premium meditation candle with sandalwood essential oil. Perfect for yoga, meditation, and creating a peaceful atmosphere.',
            'price': 26.99,
            'category': 'Candles',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Meditation'],
            'benefits': ['Meditation aid', 'Spiritual ambiance', 'Stress relief'],
            'stock': 48,
            'rating': 4.9,
            'reviews_count': 36,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Sleep Candle',
            'description': 'Calming lavender candle designed to promote restful sleep. Made with natural soy wax and pure lavender essential oil.',
            'price': 23.99,
            'category': 'Candles',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Sleep aid'],
            'benefits': ['Better sleep', 'Relaxation', 'Stress relief'],
            'stock': 52,
            'rating': 4.8,
            'reviews_count': 41,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Jasmine Night Candle',
            'description': 'Romantic jasmine-scented candle perfect for evening ambiance. Hand-poured with natural ingredients and temple flower extracts.',
            'price': 25.99,
            'category': 'Candles',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Romantic'],
            'benefits': ['Romantic ambiance', 'Mood enhancement', 'Clean burn'],
            'stock': 44,
            'rating': 4.7,
            'reviews_count': 30,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lotus Serenity Candle',
            'description': 'Sacred lotus candle made with recycled temple lotus flowers. Creates a serene, spiritual atmosphere for meditation and prayer.',
            'price': 28.99,
            'category': 'Candles',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Sacred'],
            'benefits': ['Spiritual ambiance', 'Meditation aid', 'Pure fragrance'],
            'stock': 38,
            'rating': 5.0,
            'reviews_count': 25,
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.products.insert_many(new_products)
    
    print(f'Successfully added {len(new_products)} new products!')
    print('\nProducts by category:')
    
    categories = ['Agarbatti', 'Ittar', 'Personal Care', 'Essential Oils', 'Candles']
    for category in categories:
        count = await db.products.count_documents({'category': category})
        print(f'  {category}: {count} products')
    
    client.close()

if __name__ == '__main__':
    asyncio.run(add_products())
