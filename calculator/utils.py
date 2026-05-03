# calculator/utils.py
import random

FACTORS = {
    'electricity': 0.8,
    'fuel': 2.3,
    'lpg': 45.0,
    'travel': 0.2,
    'waste': 1.5,
}
CREDIT_PER_KG = 1000
COST_PER_CREDIT = 800


def calculate_emissions(data):
    ee = data.get('electricity_kwh', 0) * FACTORS['electricity']
    fe = data.get('fuel_litres', 0) * FACTORS['fuel']
    le = data.get('lpg_cylinders', 0) * FACTORS['lpg']
    te = data.get('travel_km', 0) * FACTORS['travel']
    we = data.get('waste_kg', 0) * FACTORS['waste']
    total = ee + fe + le + te + we
    credits = total / CREDIT_PER_KG
    cost = credits * COST_PER_CREDIT
    return {
        'electricity_emission': round(ee, 2),
        'fuel_emission': round(fe, 2),
        'lpg_emission': round(le, 2),
        'travel_emission': round(te, 2),
        'waste_emission': round(we, 2),
        'total_emission': round(total, 2),
        'carbon_credits': round(credits, 4),
        'estimated_cost': round(cost, 2),
    }


def get_emission_score(total):
    if total <= 500: return 90
    elif total <= 1000: return 75
    elif total <= 3000: return 60
    elif total <= 5000: return 45
    elif total <= 10000: return 30
    else: return 15


def get_suggestions(data):
    s = []
    if data.get('electricity_kwh', 0) > 500:
        s.append({'icon': 'fa-bolt', 'title': 'Reduce Energy Consumption', 'text': 'Your electricity usage is high. Consider energy-efficient appliances and LED lighting.', 'saving': 'Up to ₹2,400/month'})
    if data.get('fuel_litres', 0) > 200:
        s.append({'icon': 'fa-gas-pump', 'title': 'Optimize Fuel Usage', 'text': 'Switch to electric or hybrid vehicles to reduce fuel consumption.', 'saving': 'Up to ₹3,600/month'})
    if data.get('travel_km', 0) > 1000:
        s.append({'icon': 'fa-plane', 'title': 'Optimize Employee Travel', 'text': 'Encourage remote meetings and carpooling to cut travel emissions.', 'saving': 'Up to ₹1,800/month'})
    if data.get('waste_kg', 0) > 100:
        s.append({'icon': 'fa-recycle', 'title': 'Implement Waste Reduction', 'text': 'Adopt recycling programs and go paperless to reduce waste emissions.', 'saving': 'Up to ₹1,200/month'})
    if data.get('lpg_cylinders', 0) > 5:
        s.append({'icon': 'fa-fire', 'title': 'Switch to Clean Cooking', 'text': 'Replace LPG with electric or induction cooking for commercial kitchens.', 'saving': 'Up to ₹900/month'})
    s.append({'icon': 'fa-solar-panel', 'title': 'Invest in Renewable Energy', 'text': 'Solar panels can offset up to 70% of your electricity-based emissions.', 'saving': 'Up to ₹5,000/month'})
    s.append({'icon': 'fa-leaf', 'title': 'Carbon Offset Programs', 'text': 'Participate in verified carbon offset and tree planting initiatives.', 'saving': 'Long-term ROI'})
    return s


def generate_fake_insight(total):
    pct = random.randint(5, 18)
    sav = random.randint(800, 5000)
    return {
        'prediction': f"Your emissions may increase by {pct}% next quarter without intervention.",
        'saving': f"Recommended potential savings: ₹{sav:,}/month",
        'rating': 'Moderate Risk' if total > 3000 else 'Low Risk',
        'trend': 'up' if total > 2000 else 'down',
    }