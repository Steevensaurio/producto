# Generated by Django 5.1.2 on 2025-01-07 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_alter_opcionnivelestudios_codigo_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='estado_academico',
            field=models.CharField(choices=[('Activo', 'Activo'), ('Inactivo', 'Inactivo'), ('Graduado', 'Graduado'), ('Suspendido', 'Suspendido')], default='AC', max_length=20, verbose_name='Estado Academico'),
        ),
    ]
