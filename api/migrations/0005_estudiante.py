# Generated by Django 5.1.2 on 2024-12-04 01:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_delete_curso_alter_perfiles_options_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('cedula', models.CharField(blank=True, max_length=10, null=True)),
                ('estado', models.BooleanField(default=True)),
                ('genero', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino')], default='M', max_length=10)),
                ('fecha_nacimiento', models.DateField()),
                ('lugar_nacimiento', models.CharField(max_length=100)),
                ('discapacidad', models.BooleanField(default=False)),
                ('detalle_discapacidad', models.CharField(blank=True, max_length=100, null=True)),
                ('direccion', models.CharField(blank=True, max_length=100, null=True)),
                ('jornada', models.CharField(choices=[('M', 'Matutina'), ('V', 'Vespertina')], default='M', max_length=10)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='estudiantes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Estudiantes',
                'verbose_name_plural': 'Estudiantes',
                'db_table': 'estudiantes',
            },
        ),
    ]
