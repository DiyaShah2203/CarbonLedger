# calculator/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class EmissionForm(forms.Form):
    electricity_kwh = forms.FloatField(
        widget=forms.NumberInput(attrs={'class': 'fi', 'placeholder': '0', 'min': '0', 'step': '0.01'})
    )
    fuel_litres = forms.FloatField(
        widget=forms.NumberInput(attrs={'class': 'fi', 'placeholder': '0', 'min': '0', 'step': '0.01'})
    )
    lpg_cylinders = forms.FloatField(
        widget=forms.NumberInput(attrs={'class': 'fi', 'placeholder': '0', 'min': '0', 'step': '0.01'})
    )
    travel_km = forms.FloatField(
        widget=forms.NumberInput(attrs={'class': 'fi', 'placeholder': '0', 'min': '0', 'step': '0.01'})
    )
    waste_kg = forms.FloatField(
        widget=forms.NumberInput(attrs={'class': 'fi', 'placeholder': '0', 'min': '0', 'step': '0.01'})
    )


class RegisterForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'fi', 'placeholder': 'Email'})
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'fi', 'placeholder': 'Username'})
        self.fields['password1'].widget.attrs.update({'class': 'fi', 'placeholder': 'Password'})
        self.fields['password2'].widget.attrs.update({'class': 'fi', 'placeholder': 'Confirm Password'})