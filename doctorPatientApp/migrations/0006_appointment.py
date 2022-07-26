# Generated by Django 4.0.6 on 2022-07-20 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctorPatientApp', '0005_user_address_user_hospital_user_mobile_user_role_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppointMent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=50)),
                ('patient_phone', models.CharField(max_length=50)),
                ('patient_email', models.CharField(max_length=50)),
                ('disease', models.CharField(max_length=50)),
                ('doctor_name', models.CharField(max_length=50)),
                ('doctor_email', models.CharField(max_length=50)),
                ('doctor_specialization', models.CharField(max_length=50)),
                ('date_you_want', models.DateTimeField()),
                ('payment_status', models.CharField(default='pending', max_length=10)),
                ('appointment_status', models.CharField(default='pending', max_length=50)),
            ],
        ),
    ]
