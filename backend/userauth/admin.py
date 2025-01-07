from django.contrib import admin
from userauth.models import User, Perfiles

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name','date']

admin.site.register(User)
admin.site.register(Perfiles)
