# calculator/admin.py
from django.contrib import admin
from .models import EmissionRecord

@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_emission', 'carbon_credits', 'estimated_cost', 'created_at']
    list_filter = ['created_at']