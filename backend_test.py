import requests
import sys
import json
from datetime import datetime
import time

class GauraNaturalsAPITester:
    def __init__(self, base_url="https://eco-aroma-shop.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.user_token = None
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.created_product_id = None
        self.created_order_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, token=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if token:
            headers['Authorization'] = f'Bearer {token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime('%H%M%S')
        user_data = {
            "email": f"testuser_{timestamp}@example.com",
            "password": "testpass123",
            "name": f"Test User {timestamp}",
            "phone": "1234567890"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=user_data
        )
        
        if success and 'token' in response:
            self.user_token = response['token']
            print(f"   User token obtained: {self.user_token[:20]}...")
            return True
        return False

    def test_user_login(self):
        """Test login with existing user"""
        login_data = {
            "email": "user@example.com",
            "password": "user123"
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            self.user_token = response['token']
            print(f"   User token obtained: {self.user_token[:20]}...")
            return True
        return False

    def test_admin_login(self):
        """Test admin login"""
        admin_data = {
            "email": "admin@gauranaturals.com",
            "password": "admin123"
        }
        
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data=admin_data
        )
        
        if success and 'token' in response:
            self.admin_token = response['token']
            print(f"   Admin token obtained: {self.admin_token[:20]}...")
            return True
        return False

    def test_get_current_user(self):
        """Test getting current user info"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "auth/me",
            200,
            token=self.user_token
        )
        return success

    def test_get_products(self):
        """Test getting all products"""
        success, response = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} products")
        return success

    def test_get_categories(self):
        """Test getting product categories"""
        success, response = self.run_test(
            "Get Categories",
            "GET",
            "categories",
            200
        )
        return success

    def test_search_products(self):
        """Test product search"""
        success, response = self.run_test(
            "Search Products",
            "GET",
            "products",
            200,
            params={"search": "natural"}
        )
        return success

    def test_create_product_admin(self):
        """Test creating a product as admin"""
        product_data = {
            "name": "Test Natural Oil",
            "description": "A test natural oil product",
            "price": 29.99,
            "category": "Oils",
            "images": ["https://example.com/test-oil.jpg"],
            "labels": ["Natural", "Organic"],
            "benefits": ["Moisturizing", "Anti-aging"],
            "stock": 100
        }
        
        success, response = self.run_test(
            "Create Product (Admin)",
            "POST",
            "products",
            200,
            data=product_data,
            token=self.admin_token
        )
        
        if success and 'id' in response:
            self.created_product_id = response['id']
            print(f"   Created product ID: {self.created_product_id}")
        return success

    def test_get_single_product(self):
        """Test getting a single product"""
        if not self.created_product_id:
            print("❌ No product ID available for testing")
            return False
            
        success, response = self.run_test(
            "Get Single Product",
            "GET",
            f"products/{self.created_product_id}",
            200
        )
        return success

    def test_add_to_wishlist(self):
        """Test adding product to wishlist"""
        if not self.created_product_id:
            print("❌ No product ID available for wishlist testing")
            return False
            
        success, response = self.run_test(
            "Add to Wishlist",
            "POST",
            f"wishlist/{self.created_product_id}",
            200,
            token=self.user_token
        )
        return success

    def test_get_wishlist(self):
        """Test getting user wishlist"""
        success, response = self.run_test(
            "Get Wishlist",
            "GET",
            "wishlist",
            200,
            token=self.user_token
        )
        return success

    def test_create_review(self):
        """Test creating a product review"""
        if not self.created_product_id:
            print("❌ No product ID available for review testing")
            return False
            
        review_data = {
            "product_id": self.created_product_id,
            "rating": 5,
            "comment": "Great natural product! Highly recommended."
        }
        
        success, response = self.run_test(
            "Create Review",
            "POST",
            "reviews",
            200,
            data=review_data,
            token=self.user_token
        )
        return success

    def test_get_product_reviews(self):
        """Test getting product reviews"""
        if not self.created_product_id:
            print("❌ No product ID available for review testing")
            return False
            
        success, response = self.run_test(
            "Get Product Reviews",
            "GET",
            f"products/{self.created_product_id}/reviews",
            200
        )
        return success

    def test_create_order(self):
        """Test creating an order"""
        if not self.created_product_id:
            print("❌ No product ID available for order testing")
            return False
            
        order_data = {
            "items": [
                {
                    "product_id": self.created_product_id,
                    "product_name": "Test Natural Oil",
                    "quantity": 2,
                    "price": 29.99
                }
            ],
            "shipping_address": {
                "name": "Test User",
                "street": "123 Test St",
                "city": "Test City",
                "state": "TS",
                "zip": "12345",
                "country": "USA"
            }
        }
        
        success, response = self.run_test(
            "Create Order",
            "POST",
            "orders",
            200,
            data=order_data,
            token=self.user_token
        )
        
        if success and 'id' in response:
            self.created_order_id = response['id']
            print(f"   Created order ID: {self.created_order_id}")
        return success

    def test_get_user_orders(self):
        """Test getting user orders"""
        success, response = self.run_test(
            "Get User Orders",
            "GET",
            "orders",
            200,
            token=self.user_token
        )
        return success

    def test_create_checkout_session(self):
        """Test creating Stripe checkout session"""
        if not self.created_order_id:
            print("❌ No order ID available for checkout testing")
            return False
            
        checkout_data = {
            "order_id": self.created_order_id,
            "host_url": "https://eco-aroma-shop.preview.emergentagent.com"
        }
        
        success, response = self.run_test(
            "Create Checkout Session",
            "POST",
            "checkout/create-session",
            200,
            data=checkout_data,
            token=self.user_token
        )
        
        if success and 'url' in response:
            print(f"   Checkout URL created: {response['url'][:50]}...")
        return success

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        newsletter_data = {
            "email": f"newsletter_test_{datetime.now().strftime('%H%M%S')}@example.com"
        }
        
        success, response = self.run_test(
            "Newsletter Subscription",
            "POST",
            "newsletter/subscribe",
            200,
            data=newsletter_data
        )
        return success

    def test_admin_dashboard(self):
        """Test admin dashboard stats"""
        success, response = self.run_test(
            "Admin Dashboard Stats",
            "GET",
            "admin/dashboard",
            200,
            token=self.admin_token
        )
        
        if success:
            print(f"   Dashboard stats: {response}")
        return success

    def test_admin_get_all_orders(self):
        """Test admin getting all orders"""
        success, response = self.run_test(
            "Admin Get All Orders",
            "GET",
            "admin/orders",
            200,
            token=self.admin_token
        )
        return success

    def test_update_product_admin(self):
        """Test updating a product as admin"""
        if not self.created_product_id:
            print("❌ No product ID available for update testing")
            return False
            
        update_data = {
            "name": "Updated Test Natural Oil",
            "description": "An updated test natural oil product",
            "price": 34.99,
            "category": "Oils",
            "images": ["https://example.com/updated-test-oil.jpg"],
            "labels": ["Natural", "Organic", "Premium"],
            "benefits": ["Moisturizing", "Anti-aging", "Nourishing"],
            "stock": 150
        }
        
        success, response = self.run_test(
            "Update Product (Admin)",
            "PUT",
            f"products/{self.created_product_id}",
            200,
            data=update_data,
            token=self.admin_token
        )
        return success

def main():
    print("🧪 Starting Gaura Naturals API Testing...")
    print("=" * 60)
    
    tester = GauraNaturalsAPITester()
    
    # Test sequence
    tests = [
        # Authentication Tests
        ("User Registration", tester.test_user_registration),
        ("User Login (Existing)", tester.test_user_login),
        ("Admin Login", tester.test_admin_login),
        ("Get Current User", tester.test_get_current_user),
        
        # Product Tests
        ("Get All Products", tester.test_get_products),
        ("Get Categories", tester.test_get_categories),
        ("Search Products", tester.test_search_products),
        ("Create Product (Admin)", tester.test_create_product_admin),
        ("Get Single Product", tester.test_get_single_product),
        ("Update Product (Admin)", tester.test_update_product_admin),
        
        # Wishlist Tests
        ("Add to Wishlist", tester.test_add_to_wishlist),
        ("Get Wishlist", tester.test_get_wishlist),
        
        # Review Tests
        ("Create Review", tester.test_create_review),
        ("Get Product Reviews", tester.test_get_product_reviews),
        
        # Order Tests
        ("Create Order", tester.test_create_order),
        ("Get User Orders", tester.test_get_user_orders),
        
        # Payment Tests
        ("Create Checkout Session", tester.test_create_checkout_session),
        
        # Newsletter Tests
        ("Newsletter Subscription", tester.test_newsletter_subscription),
        
        # Admin Tests
        ("Admin Dashboard Stats", tester.test_admin_dashboard),
        ("Admin Get All Orders", tester.test_admin_get_all_orders),
    ]
    
    # Run all tests
    for test_name, test_func in tests:
        try:
            test_func()
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
            tester.tests_run += 1
        
        # Small delay between tests
        time.sleep(0.5)
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 API Testing Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All API tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())