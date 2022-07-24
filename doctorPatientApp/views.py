import email
import os
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from doctorPatientApp import serializers
from doctorPatientApp.models import AppointMent, User
from doctorPatientApp.serializers import AppointmentSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate,login,logout

# Create your views here.



@api_view(['POST'])
def logined(request):
    if request.method=='POST':
        email=request.data['email']
        password=request.data['password']
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            serializer=UserSerializer(user,many=False)
            return Response(serializer.data)
        

     
    
    


# doctor signup
@api_view(['POST'])
def signup(request):
    data=request.data
    if request.method=='POST':
        user=User.objects.create(
            image=request.FILES.get('image'),
            first_name=data['name'],
            speciality=data['speciality'],
            hospital=data['hospital'],
            email=data['email'],
            mobile=data['mobile'],
            address=data['address'],
            role='doctor',
            password=make_password(data['password'])
        )
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    
    
# patient signup
@api_view(['POST'])
def psignup(request):
    data=request.data
    if request.method=='POST':
        user=User.objects.create(
            image=request.FILES.get('image'),
            first_name=data['name'],
            email=data['email'],
            mobile=data['mobile'],
            address=data['address'],
            role='patient',
            password=make_password(data['password'])
        )
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)

#get all doctors
@api_view(['GET'])
def get_all_doctors(request):
    user=User.objects.filter(role__contains="doctor")
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)


# get all patients
@api_view(['GET'])
def get_all_patients(request):
    user=User.objects.filter(role__contains="patient")
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)

# get single doctor
@api_view(['GET'])
def get_single_doctor(request,id):
    user=User.objects.get(pk=id)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


# get single patient
@api_view(['GET'])
def get_single_patient(request,id):
    user=User.objects.get(pk=id)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

# logout
def logouted(request):
    logout(request)
    return HttpResponse("you logged out bro!!")

# check wheater he is doctor or patient

@api_view(['GET'])
def checking(request,email):
    user=User.objects.get(email=email)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data['role'])

# appointment adding by patient
@api_view(['POST'])
def create_appointment(request,id):
    
    doctor=User.objects.get(pk=id)
    serializer=UserSerializer(doctor,many=False)
    
    appointment = AppointMent.objects.create(
        # getting login user first_name or we can pass data from frontend of user who logged in using local storage
        
        patient_name= request.data['patient_name'],           # request.data['name']
        doctor_name= serializer.data['first_name'],
        doctor_email= serializer.data['email'],
        doctor_specialization= serializer.data['speciality'],
        disease= request.data['disease'],
        date_you_want= request.data['date'],
        patient_phone= request.data['mobile'],        # request.data['mobile']       we can pass from react
        patient_email= request.data['email'],         # request.data['email']
        payment_status='pending',
        appointment_status='pending'
    )
    AppointmentSerial=AppointmentSerializer(appointment,many=False)
    return Response(AppointmentSerial.data)
    
 
 
 
# get all appointments irrespective of patient or doctor
@api_view(['GET'])
def allAppointments(request):
    data=AppointMent.objects.all()
    serializer=AppointmentSerializer(data,many=True)
    return Response(serializer.data)


# cancel appointment
@api_view(['GET'])
def cancelAppointment(request,id):
    data=AppointMent.objects.get(pk=id)
    data.delete()
    return Response('data deleted')

# get all appointemnets by patients
@api_view(['GET'])
def ourAppointments(request,d):
    user=AppointMent.objects.filter(patient_email__icontains=d)
    serializer=AppointmentSerializer(user,many=True)
    return Response(serializer.data)


# get individual doctors his/her total appointments
@api_view(['GET'])
def totalPatientsAppointment(request,d):
    user=AppointMent.objects.filter(doctor_email__icontains=d)
    serializer=AppointmentSerializer(user,many=True)
    return Response(serializer.data)



# change pending status by doctors only
@api_view(['GET'])
def changePaymentStatus(request,id):
    data=AppointMent.objects.get(pk=id)
    if data.payment_status == 'pending':
        data.payment_status="accepted"
    else:
        data.payment_status = 'pending'
    data.save()
    serializer=AppointmentSerializer(data,many=False)
    return Response(serializer.data)
   
    
@api_view(['GET'])
def changeAppointmentStatus(request,id):
    data=AppointMent.objects.get(pk=id)
    if data.appointment_status == 'pending':
        data.appointment_status="accepted"
    else:
        data.appointment_status="pending"
    data.save()
    serializer=AppointmentSerializer(data,many=False)
    return Response(serializer.data)



# # change time of patient
@api_view(['POST'])
def AddMessage(request,id):
    data=AppointMent.objects.get(pk=id)
    data.message=request.data['message']
    data.save()
    serializer=AppointmentSerializer(data,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def PatientAddMessage(request,id):
    data=AppointMent.objects.get(pk=id)
    data.patientMessage=request.data['message']
    data.save()
    serializer=AppointmentSerializer(data,many=False)
    return Response(serializer.data)


@api_view(['POST'])
def calender(request,id):
    data=AppointMent.objects.get(pk=id)
    data.date_you_want=request.data['date']
    data.save()
    serializer=AppointmentSerializer(data,many=False)
    return Response(serializer.data)



# search by doctors speciality
@api_view(['GET'])
def search(request,d):
    data=User.objects.filter(speciality__icontains=d)
    serializer=UserSerializer(data,many=True)
    return Response(serializer.data)
    




# edit profile by taking email of user
@api_view(['POST'])
def doctorEditProfile(request,d):
    form=User.objects.get(email=d)
    
    if(len(request.FILES.get('image'))!='null'): 
        if len(form.image)>0:
            os.remove(form.image.path)
        
        form.image = request.FILES.get('image')
        form.first_name= request.data['name']
        form.hospital= request.data['hospital']
        form.speciality= request.data['speciality']
        form.address= request.data['address']
        form.mobile= request.data['mobile']
        
        
        form.save()
    user=UserSerializer(form,many=False)
    return Response(user.data)
     



@api_view(['POST'])
def patientEditProfile(request,d):
    form=User.objects.get(email=d)
    
   
    
    if len(form.image) >0:
            os.remove(form.image.path)
        
    form.image = request.FILES.get('image')
    form.first_name= request.data['name']
    form.address= request.data['address']
    form.mobile= request.data['mobile']
    
    
    form.save()
    user=UserSerializer(form,many=False)
    return Response(user.data)
    


# get login users entire data
def loginUserData(request,d):
    form=User.objects.get(email=d)
    user=UserSerializer(form,many=False)
    return Response(user.data)
    


