# Generated by Django 4.0.6 on 2022-07-20 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('doctorPatientApp', '0003_user_address_user_hospital_user_mobile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='hospital',
        ),
        migrations.RemoveField(
            model_name='user',
            name='mobile',
        ),
        migrations.RemoveField(
            model_name='user',
            name='speciality',
        ),
    ]
