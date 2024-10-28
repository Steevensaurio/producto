# Generated by Django 5.1.2 on 2024-10-27 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0005_profile_rol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='rol',
            field=models.CharField(blank=True, choices=[('admin', 'Administrador'), ('student', 'Estudiante'), ('teacher', 'Profesor'), ('tutor', 'Tutor'), ('parent', 'Padre de Familia')], max_length=100, null=True),
        ),
    ]
