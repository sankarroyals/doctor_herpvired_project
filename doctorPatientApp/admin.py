from django.contrib import admin

from doctorPatientApp.models import AppointMent, User

# Register your models here.

admin.site.register(User)
admin.site.register(AppointMent)