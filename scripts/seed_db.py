import sys
import os
sys.path.insert(0, '/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime, timezone
import uuid
import bcrypt

async def seed_database():
    # Connect to MongoDB
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['test_database']
    
    # Clear existing data
    await db.products.delete_many({})
    await db.users.delete_many({})
    
    # Create admin user
    admin_password = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    admin_user = {
        'id': str(uuid.uuid4()),
        'email': 'admin@gauranaturals.com',
        'password': admin_password,
        'name': 'Admin User',
        'phone': '+918860140036',
        'is_admin': True,
        'wishlist': [],
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(admin_user)
    
    # Create regular user
    user_password = bcrypt.hashpw('user123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    regular_user = {
        'id': str(uuid.uuid4()),
        'email': 'user@example.com',
        'password': user_password,
        'name': 'Demo User',
        'phone': '+919876543210',
        'is_admin': False,
        'wishlist': [],
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(regular_user)
    
    # Sample products
    products = [
        {
            'id': str(uuid.uuid4()),
            'name': 'Sambrani Havan Cups',
            'description': 'Traditional sambrani cups made from natural temple flowers and cow dung. Perfect for daily pujas and meditation. Creates a divine atmosphere with its pure, aromatic fragrance.',
            'price': 12.99,
            'category': 'Sambrani',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade'],
            'benefits': ['Stress relief', 'Air purification', 'Spiritual upliftment'],
            'stock': 50,
            'rating': 4.8,
            'reviews_count': 24,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Bamboo-less Agarbatti',
            'description': 'Premium bamboo-less incense sticks handcrafted from temple flowers. Eco-friendly and completely natural, these sticks burn longer and cleaner than traditional incense.',
            'price': 8.99,
            'category': 'Agarbatti',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Long-lasting'],
            'benefits': ['Air purification', 'Mosquito repellent', 'Calming effect'],
            'stock': 100,
            'rating': 4.5,
            'reviews_count': 18,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Natural Rose Attar',
            'description': 'Pure rose attar extracted from temple rose flowers. A luxurious fragrance oil that captures the essence of fresh roses with notes of spirituality and tradition.',
            'price': 24.99,
            'category': 'Ittar',
            'images': ['https://images.unsplash.com/photo-1666552981195-93f2e2ac1232?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Handmade', 'Luxury'],
            'benefits': ['Long-lasting fragrance', 'Mood enhancement', 'Spiritual connection'],
            'stock': 30,
            'rating': 4.9,
            'reviews_count': 32,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Sandalwood Essential Oil',
            'description': 'Pure sandalwood essential oil distilled from sustainably sourced sandalwood. Perfect for aromatherapy, meditation, and skin care applications.',
            'price': 34.99,
            'category': 'Essential Oils',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Pure', 'Therapeutic'],
            'benefits': ['Relaxation', 'Skin care', 'Meditation aid'],
            'stock': 20,
            'rating': 5.0,
            'reviews_count': 15,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Lotus Temple Incense',
            'description': 'Handcrafted incense made from sacred lotus flowers collected from temples. Creates a peaceful, meditative atmosphere with its delicate floral aroma.',
            'price': 15.99,
            'category': 'Agarbatti',
            'images': ['https://images.unsplash.com/photo-1571498135501-58d46d846dd8?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Sacred'],
            'benefits': ['Meditation', 'Stress relief', 'Spiritual ambiance'],
            'stock': 40,
            'rating': 4.7,
            'reviews_count': 21,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Herbal Dhoop Cones',
            'description': 'Natural dhoop cones made from herbs, resins, and temple flowers. Burns cleanly with a rich, earthy fragrance perfect for daily rituals and ceremonies.',
            'price': 10.99,
            'category': 'Sambrani',
            'images': ['https://images.unsplash.com/photo-1710705012589-f71f6e952fb9?crop=entropy&cs=srgb&fm=jpg&q=85'],
            'labels': ['Eco-friendly', 'Handmade', 'Herbal'],
            'benefits': ['Air purification', 'Insect repellent', 'Aromatic'],
            'stock': 60,
            'rating': 4.6,
            'reviews_count': 19,
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.products.insert_many(products)
    
    print('Database seeded successfully!')
    print(f'Admin: admin@gauranaturals.com / admin123')
    print(f'User: user@example.com / user123')
    print(f'Created {len(products)} products')
    
    client.close()

if __name__ == '__main__':
    asyncio.run(seed_database())
