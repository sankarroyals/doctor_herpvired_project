from doctorPatientApp.models import AppointMent, User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
   class Meta:
        model = User
        fields = '__all__'
        
        
class AppointmentSerializer(serializers.ModelSerializer):
   class Meta:
        model = AppointMent
        fields = '__all__'