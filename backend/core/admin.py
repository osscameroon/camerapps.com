from django.contrib import admin
from core.models import App, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(App)
class AppAdmin(admin.ModelAdmin):
    list_dispaly = ('id', 'name', 'website')
