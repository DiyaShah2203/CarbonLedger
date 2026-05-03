# calculator/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum
from .forms import EmissionForm, RegisterForm
from .models import EmissionRecord
from .utils import calculate_emissions, get_emission_score, get_suggestions, generate_fake_insight


def landing_page(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'landing.html')


def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, f'Welcome to CarbonLedger, {user.username}!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Registration failed. Please check the form.')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome back, {user.username}!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('landing')


@login_required(login_url='login')
def dashboard_view(request):
    recs = EmissionRecord.objects.filter(user=request.user)
    total_em = recs.aggregate(Sum('total_emission'))['total_emission__sum'] or 0
    total_cr = recs.aggregate(Sum('carbon_credits'))['carbon_credits__sum'] or 0
    total_co = recs.aggregate(Sum('estimated_cost'))['estimated_cost__sum'] or 0
    cnt = recs.count()

    ee = recs.aggregate(Sum('electricity_emission'))['electricity_emission__sum'] or 0
    fe = recs.aggregate(Sum('fuel_emission'))['fuel_emission__sum'] or 0
    le = recs.aggregate(Sum('lpg_emission'))['lpg_emission__sum'] or 0
    te = recs.aggregate(Sum('travel_emission'))['travel_emission__sum'] or 0
    we = recs.aggregate(Sum('waste_emission'))['waste_emission__sum'] or 0

    recent = list(recs[:6])
    m_labels = [r.created_at.strftime('%b %d') for r in reversed(recent)]
    m_data = [float(r.total_emission) for r in reversed(recent)]

    fi = generate_fake_insight(total_em)

    return render(request, 'dashboard.html', {
        'total_emission': round(total_em, 2),
        'total_credits': round(total_cr, 4),
        'total_cost': round(total_co, 2),
        'record_count': cnt,
        'monthly_labels': m_labels,
        'monthly_data': m_data,
        'cat_labels': ['Electricity', 'Fuel', 'LPG', 'Travel', 'Waste'],
        'cat_data': [float(ee), float(fe), float(le), float(te), float(we)],
        'fake_insight': fi,
        'recent_records': recs[:5],
    })


@login_required(login_url='login')
def calculator_input_view(request):
    if request.method == 'POST':
        form = EmissionForm(request.POST)
        if form.is_valid():
            request.session['emission_data'] = form.cleaned_data
            return redirect('result')
        else:
            messages.error(request, 'Please check your input values.')
    else:
        form = EmissionForm()
    return render(request, 'calculator_input.html', {'form': form})


@login_required(login_url='login')
def result_view(request):
    data = request.session.get('emission_data')
    if not data:
        messages.warning(request, 'Please enter emission data first.')
        return redirect('calculator_input')

    results = calculate_emissions(data)
    score = get_emission_score(results['total_emission'])
    suggestions = get_suggestions(data)
    fi = generate_fake_insight(results['total_emission'])

    EmissionRecord.objects.create(user=request.user, **data, **results)
    if 'emission_data' in request.session:
        del request.session['emission_data']

    return render(request, 'result.html', {
        'results': results,
        'score': score,
        'suggestions': suggestions,
        'fake_insight': fi,
        'raw_data': data,
    })


def about_view(request):
    return render(request, 'about.html')