import sys
import os
sys.path.insert(0, '/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime, timezone
import uuid

async def add_new_products():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['test_database']
    
    # Add new products mentioned in the document
    new_products = [
        {
            'id': str(uuid.uuid4()),
            'name': 'Natural Mosquito Repellent Incense',
            'description': 'Handcrafted mosquito repellent incense made from natural herbs, recycled flowers, and essential oils. Chemical-free protection for your home and family, blending Vedic wisdom with modern eco-luxury.',
            'price': 13.99,
            'category': 'Wellness',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Chemical-free', 'Natural'],
            'benefits': ['Mosquito protection', 'Chemical-free', 'Pleasant aroma', 'Safe for family'],
            'stock': 65,
            'rating': 4.6,
            'reviews_count': 20,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Car Perfume - Sandalwood',
            'description': 'Luxury car perfume with pure sandalwood fragrance. Long-lasting natural aroma for your vehicle, crafted with traditional ingredients and modern design. Transforms your daily commute into a spiritual journey.',
            'price': 15.99,
            'category': 'Car Perfumes',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Luxury', 'Long-lasting', 'Natural'],
            'benefits': ['Long-lasting fragrance', 'Natural ingredients', 'Stress relief while driving'],
            'stock': 50,
            'rating': 4.7,
            'reviews_count': 22,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Rose Solid Perfume',
            'description': 'Travel-friendly solid perfume with pure rose essence. Traditional Ittar in solid form, perfect for on-the-go luxury. Handcrafted with recycled temple roses and natural wax base.',
            'price': 21.99,
            'category': 'Ittar',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Luxury', 'Travel-friendly', 'Handmade', 'Pure'],
            'benefits': ['Portable luxury', 'Long-lasting', 'Natural fragrance', 'TSA-friendly'],
            'stock': 35,
            'rating': 4.8,
            'reviews_count': 16,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Herbal Shampoo Bar',
            'description': 'Natural shampoo bar made with temple flowers, herbs, and essential oils. Eco-luxury hair care that cleanses, nourishes, and promotes healthy hair growth. Zero waste packaging, maximum benefits.',
            'price': 17.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Zero waste', 'Natural'],
            'benefits': ['Hair nourishment', 'Eco-friendly packaging', 'Long-lasting', 'Chemical-free'],
            'stock': 55,
            'rating': 4.7,
            'reviews_count': 30,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Soft Bar Soap - Rose & Sandalwood',
            'description': 'Luxurious soft bar soap tablet blending rose and sandalwood. Handcrafted with recycled temple flowers for gentle cleansing and moisturizing. Traditional ingredients meet modern skincare.',
            'price': 12.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Handmade', 'Moisturizing', 'Natural', 'Luxury'],
            'benefits': ['Gentle cleansing', 'Skin moisturizing', 'Natural ingredients', 'Pleasant fragrance'],
            'stock': 70,
            'rating': 4.8,
            'reviews_count': 35,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Body Shower Gel - Lavender',
            'description': 'Natural body shower gel infused with lavender essential oil and flower extracts. Gentle formula that cleanses and relaxes, perfect for unwinding after a long day. Eco-luxury for your daily ritual.',
            'price': 19.99,
            'category': 'Personal Care',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Natural', 'Relaxing', 'Gentle', 'Eco-luxury'],
            'benefits': ['Deep cleansing', 'Relaxation', 'Skin nourishment', 'Natural fragrance'],
            'stock': 45,
            'rating': 4.6,
            'reviews_count': 28,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Traditional Dhoop Cone',
            'description': 'Authentic dhoop cones made from recycled temple flowers, herbs, and resins. Burns with a rich, earthy fragrance perfect for Vedic rituals and ceremonies. Charcoal-free, chemical-free purity.',
            'price': 11.99,
            'category': 'Sambrani',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Charcoal-free', 'Authentic'],
            'benefits': ['Air purification', 'Spiritual ambiance', 'Insect repellent', 'Vedic ritual support'],
            'stock': 80,
            'rating': 4.7,
            'reviews_count': 33,
            'artisan_story_available': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.products.insert_many(new_products)
    print(f'✓ Successfully added {len(new_products)} new products!')
    
    # Show updated counts
    total = await db.products.count_documents({})
    print(f'\nTotal products in catalog: {total}')
    
    categories = await db.products.distinct('category')
    print('\nProducts by category:')
    for category in sorted(categories):
        count = await db.products.count_documents({'category': category})
        print(f'  {category}: {count} products')
    
    client.close()

if __name__ == '__main__':
    asyncio.run(add_new_products())
