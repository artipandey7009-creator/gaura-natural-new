import sys
import os
sys.path.insert(0, '/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime, timezone
import uuid

async def reorganize_catalog():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['test_database']
    
    # Clear existing products
    await db.products.delete_many({})
    print("✓ Cleared existing products")
    
    # Create new organized catalog
    products = [
        # ==================== INCENSE & AROMATICS ====================
        {
            'id': str(uuid.uuid4()),
            'name': 'Sambrani Havan Cups',
            'description': 'Handmade authentic Sambrani Havan Cups, crafted from recycled temple flowers and cow dung. Charcoal-free formula purifies air naturally during Vedic rituals. Perfect for daily pujas, meditation, and spiritual ceremonies. Experience stress relief and air purification with every use.',
            'price': 12.99,
            'category': 'Incense & Aromatics',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Eco-friendly'],
            'benefits': ['Air purification', 'Stress relief', 'Spiritual upliftment', 'Vedic ritual support'],
            'stock': 50,
            'rating': 4.8,
            'reviews_count': 24,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Traditional Dhoop Cone',
            'description': 'Handmade dhoop cones from recycled temple flowers, herbs, and natural resins. Charcoal-free formula burns with rich, earthy fragrance perfect for Vedic rituals and daily ceremonies. Natural air purifier that relieves stress and creates peaceful ambiance.',
            'price': 11.99,
            'category': 'Incense & Aromatics',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Eco-friendly', 'Authentic'],
            'benefits': ['Air purification', 'Stress relief', 'Spiritual ambiance', 'Insect repellent'],
            'stock': 80,
            'rating': 4.7,
            'reviews_count': 33,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Premium Agarbatti Incense Sticks',
            'description': 'Handcrafted premium agarbatti made from recycled temple flowers. Charcoal-free, bamboo-less sticks burn longer and cleaner, offering chemical-free alternatives for air purification and stress relief. Perfect for meditation, yoga, and daily spiritual practice.',
            'price': 8.99,
            'category': 'Incense & Aromatics',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Bamboo-less', 'Long-lasting'],
            'benefits': ['Air purification', 'Stress relief', 'Mosquito repellent', 'Calming effect'],
            'stock': 100,
            'rating': 4.5,
            'reviews_count': 18,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Bamboo-less Incense Sticks',
            'description': 'Revolutionary bamboo-less incense sticks handcrafted from recycled temple flowers. Charcoal-free technology ensures pure, clean burn for enhanced air purification and stress relief. Eco-friendly innovation meeting ancient Vedic tradition.',
            'price': 9.99,
            'category': 'Incense & Aromatics',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Bamboo-less', 'Eco-friendly'],
            'benefits': ['Air purification', 'Stress relief', 'Chemical-free', 'Long-lasting burn'],
            'stock': 90,
            'rating': 4.8,
            'reviews_count': 35,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Jasmine Temple Agarbatti',
            'description': 'Handcrafted jasmine agarbatti made from recycled temple jasmine flowers. Charcoal-free bamboo-less sticks offer sweet, calming fragrance perfect for meditation. Natural air purification combined with stress relief benefits.',
            'price': 9.99,
            'category': 'Incense & Aromatics',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Bamboo-less'],
            'benefits': ['Air purification', 'Stress relief', 'Calming effect', 'Meditation aid'],
            'stock': 75,
            'rating': 4.7,
            'reviews_count': 28,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lotus Temple Incense',
            'description': 'Handcrafted incense made from sacred lotus flowers collected from temples. Charcoal-free formula creates peaceful, meditative atmosphere with delicate floral aroma. Excellent for air purification and stress relief during spiritual practice.',
            'price': 15.99,
            'category': 'Incense & Aromatics',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Eco-friendly', 'Sacred'],
            'benefits': ['Air purification', 'Stress relief', 'Meditation aid', 'Spiritual ambiance'],
            'stock': 40,
            'rating': 4.7,
            'reviews_count': 21,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        
        # ==================== FRAGRANCES ====================
        {
            'id': str(uuid.uuid4()),
            'name': 'Natural Rose Ittar',
            'description': 'Handmade pure rose ittar extracted from recycled temple rose flowers. Traditional Indian perfume capturing fresh rose essence with spiritual notes. Alcohol-free, long-lasting luxury fragrance promoting emotional balance and stress relief.',
            'price': 24.99,
            'category': 'Fragrances',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Pure', 'Luxury', 'Alcohol-free'],
            'benefits': ['Long-lasting fragrance', 'Stress relief', 'Mood enhancement', 'Spiritual connection'],
            'stock': 30,
            'rating': 4.9,
            'reviews_count': 32,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Ittar',
            'description': 'Handmade pure sandalwood attar distilled using traditional methods. Luxury fragrance oil that is alcohol-free and long-lasting. Promotes stress relief, spiritual wellness, and balances doshas. Perfect for special occasions and daily wear.',
            'price': 29.99,
            'category': 'Fragrances',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Pure', 'Luxury', 'Alcohol-free'],
            'benefits': ['Long-lasting fragrance', 'Stress relief', 'Spiritual connection', 'Natural perfume'],
            'stock': 25,
            'rating': 4.9,
            'reviews_count': 42,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose Solid Perfume',
            'description': 'Handmade travel-friendly solid perfume with pure rose essence. Traditional ittar in solid form, crafted with recycled temple roses and natural wax base. Portable luxury offering stress relief and natural fragrance on-the-go.',
            'price': 21.99,
            'category': 'Fragrances',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Luxury', 'Travel-friendly', 'Pure'],
            'benefits': ['Portable luxury', 'Stress relief', 'Long-lasting', 'Natural fragrance'],
            'stock': 35,
            'rating': 4.8,
            'reviews_count': 16,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Car Perfume',
            'description': 'Handmade luxury car perfume with pure sandalwood fragrance. Long-lasting natural aroma crafted with traditional ingredients and modern design. Transforms your daily commute into a stress-relieving, spiritual journey.',
            'price': 15.99,
            'category': 'Fragrances',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Luxury', 'Long-lasting', 'Natural'],
            'benefits': ['Long-lasting fragrance', 'Stress relief while driving', 'Air freshening', 'Natural ingredients'],
            'stock': 50,
            'rating': 4.7,
            'reviews_count': 22,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Essential Oil',
            'description': 'Handmade pure lavender essential oil for aromatherapy and stress relief. Steam-distilled from premium lavender flowers, perfect for diffusers and air purification. Promotes relaxation and natural calmness.',
            'price': 22.99,
            'category': 'Fragrances',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Pure', 'Therapeutic', 'Organic'],
            'benefits': ['Stress relief', 'Air purification', 'Relaxation', 'Sleep aid'],
            'stock': 35,
            'rating': 4.9,
            'reviews_count': 45,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Essential Oil',
            'description': 'Handmade pure sandalwood essential oil distilled from sustainably sourced sandalwood. Perfect for aromatherapy, air purification, meditation, and balancing doshas. Supports spiritual well-being and stress relief.',
            'price': 34.99,
            'category': 'Fragrances',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Pure', 'Therapeutic'],
            'benefits': ['Stress relief', 'Air purification', 'Balances doshas', 'Meditation aid'],
            'stock': 20,
            'rating': 5.0,
            'reviews_count': 15,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        
        # ==================== PERSONAL CARE ====================
        {
            'id': str(uuid.uuid4()),
            'name': 'Herbal Shampoo Bar',
            'description': 'Handmade natural shampoo bar crafted with temple flowers, herbs, and essential oils. Eco-luxury hair care that cleanses, nourishes, and promotes healthy hair growth. Charcoal-free, zero waste packaging with stress-relieving aromatherapy benefits.',
            'price': 17.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Zero waste', 'Natural'],
            'benefits': ['Hair nourishment', 'Stress relief', 'Eco-friendly', 'Long-lasting'],
            'stock': 55,
            'rating': 4.7,
            'reviews_count': 30,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose & Sandalwood Soft Bar Soap',
            'description': 'Handmade luxurious soft bar soap tablet blending rose and sandalwood. Crafted with recycled temple flowers for gentle cleansing and moisturizing. Charcoal-free formula promotes stress relief and natural skin health.',
            'price': 12.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Moisturizing', 'Natural'],
            'benefits': ['Gentle cleansing', 'Stress relief', 'Skin moisturizing', 'Pleasant fragrance'],
            'stock': 70,
            'rating': 4.8,
            'reviews_count': 35,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Body Shower Gel',
            'description': 'Handmade natural body shower gel infused with lavender essential oil and flower extracts. Charcoal-free gentle formula cleanses and relaxes, perfect for stress relief after a long day. Eco-luxury for your daily ritual.',
            'price': 19.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Natural', 'Relaxing'],
            'benefits': ['Deep cleansing', 'Stress relief', 'Relaxation', 'Skin nourishment'],
            'stock': 45,
            'rating': 4.6,
            'reviews_count': 28,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        
        # ==================== UTILITY ====================
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose Temple Candle',
            'description': 'Handmade soy wax candle infused with recycled rose petals and natural rose essential oil. Charcoal-free formula burns cleanly for 40+ hours. Provides air purification, stress relief, and divine floral aroma for peaceful ambiance.',
            'price': 24.99,
            'category': 'Utility',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Eco-friendly', 'Soy wax'],
            'benefits': ['Air purification', 'Stress relief', 'Long-lasting', 'Clean burn'],
            'stock': 55,
            'rating': 4.7,
            'reviews_count': 27,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Meditation Candle',
            'description': 'Handmade premium meditation candle with sandalwood essential oil. Charcoal-free soy wax formula perfect for yoga, meditation, and stress relief. Creates peaceful atmosphere with air purifying properties.',
            'price': 26.99,
            'category': 'Utility',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Eco-friendly', 'Meditation'],
            'benefits': ['Air purification', 'Stress relief', 'Meditation aid', 'Spiritual ambiance'],
            'stock': 48,
            'rating': 4.9,
            'reviews_count': 36,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lavender Sleep Candle',
            'description': 'Handmade calming lavender candle designed to promote restful sleep and stress relief. Charcoal-free soy wax with pure lavender essential oil. Natural air purification for bedroom ambiance.',
            'price': 23.99,
            'category': 'Utility',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Eco-friendly', 'Sleep aid'],
            'benefits': ['Air purification', 'Stress relief', 'Better sleep', 'Relaxation'],
            'stock': 52,
            'rating': 4.8,
            'reviews_count': 41,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Natural Mosquito Repellent Incense',
            'description': 'Handmade mosquito repellent incense from natural herbs, recycled flowers, and essential oils. Charcoal-free formula provides chemical-free protection while purifying air and relieving stress. Safe for family, effective protection.',
            'price': 13.99,
            'category': 'Utility',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Charcoal-free', 'Chemical-free', 'Natural'],
            'benefits': ['Mosquito protection', 'Air purification', 'Stress relief', 'Safe for family'],
            'stock': 65,
            'rating': 4.6,
            'reviews_count': 20,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
    ]
    
    await db.products.insert_many(products)
    
    print(f'\n✓ Successfully created organized catalog with {len(products)} products!')
    
    # Show category breakdown
    categories = ['Incense & Aromatics', 'Fragrances', 'Personal Care', 'Utility']
    print('\n📦 Products by Category:')
    for category in categories:
        count = await db.products.count_documents({'category': category})
        category_products = await db.products.find({'category': category}, {'name': 1, '_id': 0}).to_list(100)
        print(f'\n  {category}: {count} products')
        for product in category_products:
            print(f'    - {product["name"]}')
    
    # Verify key attributes
    handmade_count = await db.products.count_documents({'labels': 'Handmade'})
    charcoal_free_count = await db.products.count_documents({'labels': 'Charcoal-free'})
    air_purification_count = await db.products.count_documents({'benefits': 'Air purification'})
    stress_relief_count = await db.products.count_documents({'benefits': 'Stress relief'})
    
    print(f'\n✨ Key Attributes:')
    print(f'  Handmade: {handmade_count} products')
    print(f'  Charcoal-free: {charcoal_free_count} products')
    print(f'  Air purification: {air_purification_count} products')
    print(f'  Stress relief: {stress_relief_count} products')
    
    client.close()

if __name__ == '__main__':
    asyncio.run(reorganize_catalog())
