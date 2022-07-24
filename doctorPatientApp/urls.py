from django.urls import path
from . import views
urlpatterns = [
    
    path('login/',views.logined),
    path('doctor/signup/',views.signup),
    
    path('patient/signup/',views.psignup),
    path('doctors/',views.get_all_doctors),
    path('patients/',views.get_all_patients),
    path('doctor/<int:id>/',views.get_single_doctor),
    path('patient/<int:id>/',views.get_single_patient),
    path('checking/<str:email>/',views.checking),
    
    # appointments
    path('allAppointments/',views.allAppointments),
    path('doctor/<int:id>/appointment/',views.create_appointment),
    path('cancel/<int:id>/',views.cancelAppointment),
    
    # patients gettings there total appointments
    path('ourAppointments/<str:d>/',views.ourAppointments),
    
    # checks by doctors
    path('myTotalPatientsAppointment/<str:d>/',views.totalPatientsAppointment),
    path('changePaymentStatus/<int:id>/',views.changePaymentStatus),
    path('changeAppointmentStatus/<int:id>/',views.changeAppointmentStatus),
    path('AddMessage/<int:id>/',views.AddMessage),
    path('PatientAddMessage/<int:id>/',views.PatientAddMessage),
    path('updateCalender/<int:id>/',views.calender),
    
    
    # search doctors by there specifications
    path('search/<str:d>/',views.search),
    
    
    # Edit profiles
    path('doctorEditProfile/<str:d>/',views.doctorEditProfile), 
    path('patientEditProfile/<str:d>/',views.patientEditProfile),
    
    
    # get login user data
    path('loginUserData/<str:d>/',views.loginUserData),
    
    
    path('logout/',views.logouted)
    
]