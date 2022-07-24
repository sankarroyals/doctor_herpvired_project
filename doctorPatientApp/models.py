from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations=True
    
    def create_user(self,email,password=None, **extra_fields):
        
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,password,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('super user must have is_staff true')
        
        return self.create_user(email,password,**extra_fields)




# adding spec and mobile fields into User model

class User(AbstractUser):
    
    username=None
    email=models.EmailField(unique=True)
    image=models.ImageField(upload_to="images/",null=True,blank=True,default="templates/images/noimage.jpg")
    speciality=models.CharField(max_length=100,null=True,blank=True)
    address=models.CharField(max_length=100,null=True,blank=True)
    hospital=models.CharField(max_length=100,null=True,blank=True)
    mobile=models.CharField(max_length=12,null=True,blank=True)
    role=models.CharField(max_length=20)
    
    objects=UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=['']
    
    def __str__(self):
        if self.is_superuser:
            return self.email +"("+" "+ "Admin" + " " +")"
        else:
            return  " "+"("+" "+ self.role + " " +")" +" "+self.email +" "+"------->"+" "+self.first_name
        

# appointment model   
class AppointMent(models.Model):
    patient_name=models.CharField(max_length=50)
    patient_phone=models.CharField(max_length=50)
    patient_email=models.CharField(max_length=50)
    disease=models.CharField(max_length=50)
    doctor_name=models.CharField(max_length=50)
    doctor_email=models.CharField(max_length=50)
    doctor_specialization=models.CharField(max_length=50)
    date_you_want=models.DateTimeField()
    payment_status=models.CharField(max_length=10,default='pending')
    appointment_status=models.CharField(max_length=50,default='pending')
    message=models.CharField(max_length=550,default='')
    patientMessage=models.CharField(max_length=550,default='')


    def __str__(self):
        return "Patient: "+ self.patient_name + " "+"<--------> "+" "+ "Doctor: " + self.doctor_name
    
    
    
# create rating for doctors