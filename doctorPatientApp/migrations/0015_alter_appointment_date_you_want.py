# Generated by Django 4.0.6 on 2022-07-23 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctorPatientApp', '0014_alter_appointment_date_you_want'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='date_you_want',
            field=models.DateTimeField(),
        ),
    ]
