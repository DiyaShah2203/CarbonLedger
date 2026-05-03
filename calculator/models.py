# calculator/models.py
from django.db import models
from django.contrib.auth.models import User


class EmissionRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emissions')
    electricity_kwh = models.FloatField(default=0)
    fuel_litres = models.FloatField(default=0)
    lpg_cylinders = models.FloatField(default=0)
    travel_km = models.FloatField(default=0)
    waste_kg = models.FloatField(default=0)
    total_emission = models.FloatField(default=0)
    carbon_credits = models.FloatField(default=0)
    estimated_cost = models.FloatField(default=0)
    electricity_emission = models.FloatField(default=0)
    fuel_emission = models.FloatField(default=0)
    lpg_emission = models.FloatField(default=0)
    travel_emission = models.FloatField(default=0)
    waste_emission = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.total_emission} kg"