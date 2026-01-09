import sys
import os
sys.path.insert(0, '/app/backend')

from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime, timezone
import uuid

async def update_products():
    # Connect to MongoDB
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['test_database']
    
    # Enhanced product descriptions based on document
    updates = [
        {
            'filter': {'name': 'Sambrani Havan Cups'},
            'update': {
                'description': 'Handmade authentic Sambrani Havan Cups, Made in India. Crafted from recycled temple flowers and cow dung, these cups purify air and relieve stress during Vedic rituals. Perfect for daily pujas, meditation, and spiritual ceremonies.',
                'benefits': ['Air purification', 'Stress relief', 'Spiritual upliftment', 'Vedic ritual support']
            }
        },
        {
            'filter': {'name': 'Bamboo-less Agarbatti'},
            'update': {
                'description': 'Premium bamboo-less incense sticks handcrafted from recycled temple flowers. Leading the charcoal-free incense movement, these eco-friendly sticks burn longer and cleaner, offering chemical-free alternatives for health protection and spiritual well-being.',
                'benefits': ['Charcoal-free', 'Chemical-free alternative', 'Long-lasting burn', 'Air purification', 'Mosquito repellent']
            }
        },
        {
            'filter': {'name': 'Natural Rose Attar'},
            'update': {
                'description': 'Pure rose Ittar extracted from recycled temple rose flowers. This traditional Indian perfume captures the essence of fresh roses with spiritual notes. Blends traditional ingredients with contemporary luxury positioning, offering health protection and spiritual wellness.',
                'benefits': ['Long-lasting natural fragrance', 'Mood enhancement', 'Spiritual connection', 'Chemical-free luxury perfume']
            }
        },
        {
            'filter': {'name': 'Sandalwood Essential Oil'},
            'update': {
                'description': 'Pure sandalwood essential oil distilled from sustainably sourced sandalwood. Perfect for aromatherapy, Vedic rituals, meditation, and balancing doshas. Supports spiritual well-being while purifying spaces.',
                'benefits': ['Balances doshas', 'Meditation aid', 'Skin care', 'Spiritual wellness', 'Space purification']
            }
        },
        {
            'filter': {'category': 'Candles'},
            'update': {
                'labels': ['Eco-friendly', 'Handmade', 'Charcoal-free', 'Natural soy wax']
            }
        }
    ]
    
    for update_item in updates:
        result = await db.products.update_many(
            update_item['filter'],
            {'$set': update_item['update']}
        )
        print(f"Updated {result.modified_count} products matching {update_item['filter']}")
    
    # Add QR code note to product schema (simulate artisan stories feature)
    await db.products.update_many(
        {},
        {'$set': {'artisan_story_available': True}}
    )
    print("Added artisan story feature to all products")
    
    print('\n✓ Products updated with enhanced descriptions and features!')
    
    client.close()

if __name__ == '__main__':
    asyncio.run(update_products())
