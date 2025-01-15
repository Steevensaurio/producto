# Generated by Django 5.1.2 on 2025-01-13 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0042_alter_tutoria_descripcion'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tutoria',
            name='hora',
        ),
        migrations.AddField(
            model_name='tutoria',
            name='hora_fin',
            field=models.TimeField(default='13:00'),
        ),
        migrations.AddField(
            model_name='tutoria',
            name='hora_inicio',
            field=models.TimeField(default='12:00'),
        ),
    ]
